## Overview for: `federation/constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/58228843-2f54-4e1f-c23c-908041af4100/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                                                        |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------------------------------------------- |
| cosmo            |  180   | 11031 total, 0 failed | avg: 832ms, p95: 2055ms  | ✅                                                                                                            |
| grafbase         |  170   | 10392 total, 0 failed | avg: 835ms, p95: 2229ms  | ✅                                                                                                            |
| apollo-router    |  162   | 9932 total, 1 failed  | avg: 873ms, p95: 2425ms  | ❌ 1 failed requests, 1 non-200 responses, 6 unexpected GraphQL errors, non-compatible response structure (3) |
| hive-gateway-bun |   93   | 5907 total, 0 failed  | avg: 3075ms, p95: 5131ms | ✅                                                                                                            |
| apollo-server    |   86   | 5379 total, 63 failed | avg: 3382ms, p95: 3051ms | ❌ 63 failed requests, 63 non-200 responses, 63 unexpected GraphQL errors                                     |
| hive-gateway     |   81   | 5129 total, 20 failed | avg: 3571ms, p95: 4983ms | ❌ 20 failed requests, 20 non-200 responses, 20 unexpected GraphQL errors                                     |
| mercurius        |   80   | 4984 total, 0 failed  | avg: 3635ms, p95: 4655ms | ✅                                                                                                            |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 33033      ✗ 0    
     data_received..................: 968 MB  16 MB/s
     data_sent......................: 13 MB   215 kB/s
     http_req_blocked...............: avg=1.52ms   min=1.16µs  med=3.06µs   max=3.02s  p(90)=4.41µs   p(95)=9.98µs
     http_req_connecting............: avg=1.41ms   min=0s      med=0s       max=3.02s  p(90)=0s       p(95)=0s    
     http_req_duration..............: avg=831.57ms min=3.38ms  med=716.46ms max=5.03s  p(90)=1.59s    p(95)=2.05s 
       { expected_response:true }...: avg=831.57ms min=3.38ms  med=716.46ms max=5.03s  p(90)=1.59s    p(95)=2.05s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 11031
     http_req_receiving.............: avg=237.73ms min=30.98µs med=81.72µs  max=4.74s  p(90)=970.06ms p(95)=1.42s 
     http_req_sending...............: avg=15.44ms  min=7.45µs  med=13.85µs  max=3.88s  p(90)=80.62µs  p(95)=1.18ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=578.39ms min=3.29ms  med=565.48ms max=2.28s  p(90)=981.3ms  p(95)=1.11s 
     http_reqs......................: 11031   180.986828/s
     iteration_duration.............: avg=1.64s    min=22.02ms med=1.4s     max=10.27s p(90)=3.21s    p(95)=3.85s 
     iterations.....................: 11011   180.658686/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f5351cd7-7a97-41a4-bf73-208b1a1e2900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/075abb4f-3f86-4a4e-ee01-5e17b0f36500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7a1b1102-31e8-4fbe-a447-b06fa88e6c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31116      ✗ 0    
     data_received..................: 913 MB  15 MB/s
     data_sent......................: 12 MB   203 kB/s
     http_req_blocked...............: avg=1.3ms    min=1.4µs   med=3.24µs   max=2.7s  p(90)=4.86µs   p(95)=10.54µs
     http_req_connecting............: avg=1.04ms   min=0s      med=0s       max=2.7s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=834.63ms min=3.07ms  med=697.38ms max=5.04s p(90)=1.79s    p(95)=2.22s  
       { expected_response:true }...: avg=834.63ms min=3.07ms  med=697.38ms max=5.04s p(90)=1.79s    p(95)=2.22s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10392
     http_req_receiving.............: avg=261.08ms min=31.79µs med=82.9µs   max=4.33s p(90)=1.08s    p(95)=1.58s  
     http_req_sending...............: avg=23.24ms  min=7.82µs  med=14.89µs  max=3.27s p(90)=128.28µs p(95)=14.27ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=550.31ms min=2.99ms  med=530.14ms max=2.47s p(90)=1s       p(95)=1.2s   
     http_reqs......................: 10392   170.61899/s
     iteration_duration.............: avg=1.74s    min=18.82ms med=1.47s    max=9.82s p(90)=3.54s    p(95)=4.3s   
     iterations.....................: 10372   170.290624/s
     vus............................: 284     min=284      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8bbdf00e-399e-4296-0983-bd68bb2bc600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2899b9e8-8923-44e2-ed34-fbf5de5eb300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/47bdba78-5aef-427e-fddf-1708c9dd1e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 9911 / ✗ 1
     ✗ no graphql errors
      ↳  99% — ✓ 9906 / ✗ 6
     ✗ valid response structure
      ↳  99% — ✓ 9908 / ✗ 3

     █ setup

     checks.........................: 99.96% ✓ 29725      ✗ 10   
     data_received..................: 871 MB 14 MB/s
     data_sent......................: 12 MB  193 kB/s
     http_req_blocked...............: avg=1.44ms   min=1.48µs  med=3.21µs   max=2.88s  p(90)=5.04µs   p(95)=11.01µs
     http_req_connecting............: avg=1.01ms   min=0s      med=0s       max=1.13s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=873.49ms min=7.25ms  med=653.4ms  max=5.48s  p(90)=1.93s    p(95)=2.42s  
       { expected_response:true }...: avg=873.42ms min=7.25ms  med=653.27ms max=5.48s  p(90)=1.93s    p(95)=2.42s  
     http_req_failed................: 0.01%  ✓ 1          ✗ 9931 
     http_req_receiving.............: avg=355.06ms min=0s      med=97.62µs  max=4.98s  p(90)=1.29s    p(95)=1.91s  
     http_req_sending...............: avg=19.51ms  min=8.28µs  med=15.4µs   max=4.18s  p(90)=143.84µs p(95)=11.7ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=498.91ms min=7.17ms  med=442.94ms max=2.53s  p(90)=934.05ms p(95)=1.15s  
     http_reqs......................: 9932   162.927685/s
     iteration_duration.............: avg=1.8s     min=23.84ms med=1.44s    max=12.18s p(90)=3.85s    p(95)=4.7s   
     iterations.....................: 9912   162.599599/s
     vus............................: 300    min=300      max=300
     vus_max........................: 300    min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4210b873-2cfd-483a-7bac-80e8eeee1100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/123b5839-613c-4229-9975-756a8733a100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/27b6feb7-e291-4f82-d643-7f630a0fc600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17661     ✗ 0    
     data_received..................: 519 MB  8.2 MB/s
     data_sent......................: 7.0 MB  111 kB/s
     http_req_blocked...............: avg=2.76ms   min=1.51µs   med=3.56µs  max=136.25ms p(90)=5.84µs  p(95)=1.25ms  
     http_req_connecting............: avg=2.68ms   min=0s       med=0s      max=136.21ms p(90)=0s      p(95)=111.6µs 
     http_req_duration..............: avg=3.07s    min=14.19ms  med=2.85s   max=6.91s    p(90)=4.13s   p(95)=5.13s   
       { expected_response:true }...: avg=3.07s    min=14.19ms  med=2.85s   max=6.91s    p(90)=4.13s   p(95)=5.13s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5907 
     http_req_receiving.............: avg=38.28ms  min=38.68µs  med=226.2µs max=1.74s    p(90)=3.42ms  p(95)=101.64ms
     http_req_sending...............: avg=804.21µs min=9.06µs   med=19.26µs max=206.24ms p(90)=69.72µs p(95)=763.66µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.03s    min=14.01ms  med=2.83s   max=6.79s    p(90)=3.87s   p(95)=5.09s   
     http_reqs......................: 5907    93.864498/s
     iteration_duration.............: avg=3.12s    min=170.65ms med=2.88s   max=7.03s    p(90)=4.21s   p(95)=5.15s   
     iterations.....................: 5887    93.546691/s
     vus............................: 159     min=159     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cabe1833-60e5-4915-37d2-22cbab760600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/81a2d6c0-8727-4070-ef91-de36cf1d6400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fe3829a9-7b9b-4f63-502f-87716991bf00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5296 / ✗ 63
     ✗ no graphql errors
      ↳  98% — ✓ 5296 / ✗ 63
     ✓ valid response structure

     █ setup

     checks.........................: 99.21% ✓ 15888     ✗ 126  
     data_received..................: 467 MB 7.5 MB/s
     data_sent......................: 6.4 MB 102 kB/s
     http_req_blocked...............: avg=903.15µs min=1.42µs   med=3.49µs  max=69.44ms p(90)=5.87µs   p(95)=445.32µs
     http_req_connecting............: avg=875.94µs min=0s       med=0s      max=52.89ms p(90)=0s       p(95)=364.42µs
     http_req_duration..............: avg=3.38s    min=11.51ms  med=2.13s   max=1m0s    p(90)=2.68s    p(95)=3.05s   
       { expected_response:true }...: avg=2.71s    min=11.51ms  med=2.12s   max=59.28s  p(90)=2.67s    p(95)=2.84s   
     http_req_failed................: 1.17%  ✓ 63        ✗ 5316 
     http_req_receiving.............: avg=237.78µs min=0s       med=105µs   max=34.47ms p(90)=228.73µs p(95)=417.47µs
     http_req_sending...............: avg=493.3µs  min=8.56µs   med=17.57µs max=43.27ms p(90)=41.58µs  p(95)=829.99µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.38s    min=11.43ms  med=2.12s   max=1m0s    p(90)=2.68s    p(95)=3.05s   
     http_reqs......................: 5379   86.057803/s
     iteration_duration.............: avg=3.41s    min=370.49ms med=2.14s   max=1m0s    p(90)=2.71s    p(95)=3.06s   
     iterations.....................: 5359   85.737826/s
     vus............................: 91     min=91      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cbe4f3fb-101c-4d8b-ef43-a86ac3cacd00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6698cfed-9471-4ded-da30-5f877e1b4100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2abf9be1-c86d-4573-50f8-64b9ce73cd00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 5089 / ✗ 20
     ✗ no graphql errors
      ↳  99% — ✓ 5089 / ✗ 20
     ✓ valid response structure

     █ setup

     checks.........................: 99.73% ✓ 15267     ✗ 40   
     data_received..................: 449 MB 7.1 MB/s
     data_sent......................: 6.1 MB 96 kB/s
     http_req_blocked...............: avg=591.9µs  min=1.61µs  med=4.4µs    max=37.5ms   p(90)=6.48µs   p(95)=1.7ms   
     http_req_connecting............: avg=558.54µs min=0s      med=0s       max=23.95ms  p(90)=0s       p(95)=1.21ms  
     http_req_duration..............: avg=3.57s    min=13.39ms med=2.48s    max=1m0s     p(90)=3.46s    p(95)=4.98s   
       { expected_response:true }...: avg=3.34s    min=13.39ms med=2.47s    max=58.98s   p(90)=3.43s    p(95)=4.89s   
     http_req_failed................: 0.38%  ✓ 20        ✗ 5109 
     http_req_receiving.............: avg=563.17µs min=0s      med=119.91µs max=143.75ms p(90)=528.71µs p(95)=1.41ms  
     http_req_sending...............: avg=173.27µs min=9.97µs  med=25.94µs  max=35.86ms  p(90)=65.82µs  p(95)=510.99µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.57s    min=13.24ms med=2.48s    max=1m0s     p(90)=3.46s    p(95)=4.98s   
     http_reqs......................: 5129   81.062137/s
     iteration_duration.............: avg=3.6s     min=81.07ms med=2.5s     max=1m0s     p(90)=3.5s     p(95)=5s      
     iterations.....................: 5109   80.746043/s
     vus............................: 53     min=53      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7fffd2e9-217f-445f-9a2f-2a539f1b9800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/065c0907-910d-497b-49f9-fe797ceee700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/941f5d30-4bad-4bbd-55aa-057799ad9d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14892     ✗ 0    
     data_received..................: 438 MB  7.1 MB/s
     data_sent......................: 5.9 MB  96 kB/s
     http_req_blocked...............: avg=1.84ms  min=1.5µs    med=3.62µs   max=59ms     p(90)=5.52µs   p(95)=11.53ms 
     http_req_connecting............: avg=1.81ms  min=0s       med=0s       max=58.14ms  p(90)=0s       p(95)=11.14ms 
     http_req_duration..............: avg=3.63s   min=10.98ms  med=3.6s     max=7.26s    p(90)=4.35s    p(95)=4.65s   
       { expected_response:true }...: avg=3.63s   min=10.98ms  med=3.6s     max=7.26s    p(90)=4.35s    p(95)=4.65s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4984 
     http_req_receiving.............: avg=6.79ms  min=37.96µs  med=100.39µs max=788.12ms p(90)=258.64µs p(95)=664.29µs
     http_req_sending...............: avg=717.9µs min=9.2µs    med=20.22µs  max=94.52ms  p(90)=39.79µs  p(95)=2.58ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.62s   min=10.91ms  med=3.6s     max=7.26s    p(90)=4.35s    p(95)=4.65s   
     http_reqs......................: 4984    80.596055/s
     iteration_duration.............: avg=3.67s   min=447.47ms med=3.62s    max=7.29s    p(90)=4.37s    p(95)=4.67s   
     iterations.....................: 4964    80.272636/s
     vus............................: 223     min=223     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cbffb1dd-0443-4563-e2c4-628bb8fc8800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f7d5f5a3-1ca6-46b6-c1fb-c4d8dbb6dd00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7e667cd5-7d84-4114-e8de-5eeb8d0b9500/public" alt="HTTP Overview" />


  </details>