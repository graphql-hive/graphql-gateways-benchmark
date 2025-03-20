#/bin/sh
set -e

if [ ! -n "$1" ]; then
  echo "gateway dir is missing, please run as: ./run.sh <gateway_dir>"
  exit 1
fi

export BASE_DIR=$( realpath ./ )

export LOCAL_ENV_OVERRIDE=""

if [[ -z "${CI}" ]]; then
    export LOCAL_ENV_OVERRIDE="-f ../../subgraphs/docker-compose.subgraphs.local.yaml"
fi

export OUT_DIR="../../gateways/$1"
export COMPOSE_FLAGS="-f ../../../docker-compose.metrics.yaml -f ../../subgraphs/docker-compose.subgraphs.yaml $LOCAL_ENV_OVERRIDE -f $OUT_DIR/docker-compose.yaml"

on_error(){
    cd $BASE_DIR
    docker inspect gateway
    docker inspect accounts
    docker compose $COMPOSE_FLAGS ps -a
    docker compose $COMPOSE_FLAGS logs
}
 
trap 'on_error' ERR

docker compose $COMPOSE_FLAGS up -d --wait --force-recreate --build

if [[ -z "${CI}" ]]; then
    trap "docker compose $COMPOSE_FLAGS down && exit 0" INT
fi

export K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write
export K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true
export START_TIME="$(date +%s)"

k6 --out=experimental-prometheus-rw --out json=$OUT_DIR/k6_metrics.json run -e SUMMARY_PATH="$OUT_DIR" benchmark.k6.js

sleep 2

export END_TIME="$(date +%s)"

docker logs gateway > $OUT_DIR/gateway_log.txt

rm -rf $OUT_DIR/overview.png || echo ""
npx --quiet capture-website-cli "http://localhost:3000/d/01npcT44k/k6?orgId=1&from=${START_TIME}000&to=${END_TIME}000&kiosk" --output $OUT_DIR/overview.png --width 1200 --height 850

rm -rf $OUT_DIR/http.png || echo ""
npx --quiet capture-website-cli "http://localhost:3000/d-solo/01npcT44k/k6?orgId=1&from=${START_TIME}000&to=${END_TIME}000&panelId=41" --output $OUT_DIR/http.png --width 1200 --height 850

rm -rf $OUT_DIR/containers.png || echo ""
npx --quiet capture-website-cli "http://localhost:3000/d/pMEd7m0Mz/cadvisor-exporter?orgId=1&var-host=All&var-container=accounts&var-container=inventory&var-container=products&var-container=reviews&from=${START_TIME}000&to=${END_TIME}000&kiosk" --output $OUT_DIR/containers.png --width 1200 --height 850

if [[ -z "${CI}" ]]; then
    echo "Done, you can find some stats in Grafana: http://localhost:3000/d/01npcT44k/k6?orgId=1&from=${START_TIME}000&to=${END_TIME}000"
    echo "You can close this and terminate all running services by using Ctrl+C"
    while true; do sleep 10; done
fi
