## Overview for: `federation/ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was trying to reach 2000 concurrent VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ff729dbe-d61d-4650-7378-f04d02d99700/public" alt="Comparison" />


| Gateway          | duration(p95)⬇️ |  RPS  |        Requests         |                       Durations                        | Notes                                                                                                              |
| :--------------- | :-------------: | :---: | :---------------------: | :----------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------- |
| cosmo            |     5255ms      |  175  |  12336 total, 0 failed  |  avg: 2460ms, p95: 5255ms, max: 10888ms, med: 2270ms   | ✅                                                                                                                  |
| grafbase         |     6605ms      |  157  |  11315 total, 0 failed  |  avg: 2875ms, p95: 6606ms, max: 12606ms, med: 2506ms   | ✅                                                                                                                  |
| apollo-router    |     13418ms     |  160  | 12877 total, 381 failed |  avg: 3435ms, p95: 13418ms, max: 27087ms, med: 2301ms  | ❌ 381 failed requests, 381 non-200 responses, 382 unexpected GraphQL errors, non-compatible response structure (1) |
| hive-gateway-bun |     24595ms     |  91   |  7363 total, 0 failed   | avg: 11307ms, p95: 24595ms, max: 33434ms, med: 9249ms  | ✅                                                                                                                  |
| mercurius        |     42215ms     |  53   |  4896 total, 0 failed   | avg: 21742ms, p95: 42215ms, max: 43072ms, med: 20027ms | ✅                                                                                                                  |
| hive-gateway     |     51561ms     |  85   |  7544 total, 0 failed   | avg: 12296ms, p95: 51561ms, max: 58106ms, med: 3374ms  | ✅                                                                                                                  |
| apollo-server    |     59999ms     |  82   | 7676 total, 504 failed  | avg: 11947ms, p95: 60000ms, max: 60112ms, med: 2188ms  | ❌ 504 failed requests, 504 non-200 responses, 504 unexpected GraphQL errors                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 36948      ✗ 0     
     data_received..................: 1.1 GB  15 MB/s
     data_sent......................: 15 MB   209 kB/s
     http_req_blocked...............: avg=254.97ms min=1.47µs  med=3.6µs   max=8s     p(90)=673.66ms p(95)=2.07s   
     http_req_connecting............: avg=251.78ms min=0s      med=0s      max=8s     p(90)=642.86ms p(95)=2.06s   
     http_req_duration..............: avg=2.46s    min=3.16ms  med=2.26s   max=10.88s p(90)=4.62s    p(95)=5.25s   
       { expected_response:true }...: avg=2.46s    min=3.16ms  med=2.26s   max=10.88s p(90)=4.62s    p(95)=5.25s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 12336 
     http_req_receiving.............: avg=109.29ms min=32.96µs med=76.88µs max=7.09s  p(90)=245.82ms p(95)=676.04ms
     http_req_sending...............: avg=129.34ms min=7.62µs  med=17.62µs max=6.9s   p(90)=298.96ms p(95)=931.43ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.22s    min=2.99ms  med=1.92s   max=10.88s p(90)=4.41s    p(95)=5.01s   
     http_reqs......................: 12336   175.989356/s
     iteration_duration.............: avg=5.57s    min=9.09ms  med=4.93s   max=29.17s p(90)=11.15s   p(95)=12.7s   
     iterations.....................: 12316   175.70403/s
     vus............................: 4       min=4        max=1926
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e0a3e7b0-4681-498a-dc5e-81b45e2f4000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/138fe921-60cb-4aa6-d67e-3c5bf8307e00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/586e3152-cf3e-4deb-04d8-50d8fec9e100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 33885      ✗ 0     
     data_received..................: 994 MB  14 MB/s
     data_sent......................: 13 MB   187 kB/s
     http_req_blocked...............: avg=270.72ms min=1.7µs   med=4.73µs  max=10.92s p(90)=881.66ms p(95)=2.22s   
     http_req_connecting............: avg=267.82ms min=0s      med=0s      max=10.92s p(90)=867.01ms p(95)=2.22s   
     http_req_duration..............: avg=2.87s    min=3.3ms   med=2.5s    max=12.6s  p(90)=5.57s    p(95)=6.6s    
       { expected_response:true }...: avg=2.87s    min=3.3ms   med=2.5s    max=12.6s  p(90)=5.57s    p(95)=6.6s    
     http_req_failed................: 0.00%   ✓ 0          ✗ 11315 
     http_req_receiving.............: avg=421.51ms min=32.69µs med=96.14µs max=9.76s  p(90)=1.45s    p(95)=3.04s   
     http_req_sending...............: avg=140.46ms min=8.58µs  med=25.68µs max=6.37s  p(90)=265.41ms p(95)=831.91ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.31s    min=3.17ms  med=2s      max=10.43s p(90)=4.69s    p(95)=5.26s   
     http_reqs......................: 11315   157.883844/s
     iteration_duration.............: avg=6.43s    min=24.18ms med=5.49s   max=31.54s p(90)=13.32s   p(95)=15.73s  
     iterations.....................: 11295   157.604774/s
     vus............................: 377     min=71       max=1780
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ccce5b67-8e79-4c19-41fe-0e96c9846800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/67121b14-0d17-41eb-4439-6404201cd800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f9c9661a-5517-4933-e475-c75932d4a200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  97% — ✓ 12476 / ✗ 381
     ✗ no graphql errors
      ↳  97% — ✓ 12475 / ✗ 382
     ✗ valid response structure
      ↳  99% — ✓ 12475 / ✗ 1

     █ setup

     checks.........................: 97.99% ✓ 37426      ✗ 764   
     data_received..................: 1.1 GB 14 MB/s
     data_sent......................: 15 MB  191 kB/s
     http_req_blocked...............: avg=641.88ms min=1.6µs   med=4.15µs  max=21.98s p(90)=2.04s    p(95)=3.8s  
     http_req_connecting............: avg=620.14ms min=0s      med=0s      max=21.98s p(90)=2s       p(95)=3.79s 
     http_req_duration..............: avg=3.43s    min=0s      med=2.3s    max=27.08s p(90)=6.64s    p(95)=13.41s
       { expected_response:true }...: avg=3.4s     min=6.52ms  med=2.29s   max=27.08s p(90)=6.46s    p(95)=13.35s
     http_req_failed................: 2.95%  ✓ 381        ✗ 12496 
     http_req_receiving.............: avg=994.18ms min=0s      med=88.47µs max=24.84s p(90)=2.45s    p(95)=8.85s 
     http_req_sending...............: avg=349.64ms min=0s      med=22.68µs max=20.79s p(90)=516.77ms p(95)=1.07s 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=2.09s    min=0s      med=1.62s   max=20.69s p(90)=4.23s    p(95)=5.15s 
     http_reqs......................: 12877  160.556988/s
     iteration_duration.............: avg=7.22s    min=74.59ms med=5.33s   max=38.35s p(90)=17.48s   p(95)=21.07s
     iterations.....................: 12857  160.307618/s
     vus............................: 209    min=69       max=1927
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4275fdc0-6eae-486d-0818-9a6a90d43a00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e30b2e3a-3002-42ed-361f-13b4c73a7600/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/71be3149-0558-4952-410f-f847c4414c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 22029     ✗ 0     
     data_received..................: 646 MB  8.0 MB/s
     data_sent......................: 8.7 MB  109 kB/s
     http_req_blocked...............: avg=36.08ms  min=1.49µs   med=4.61µs   max=1.85s  p(90)=55.39ms  p(95)=239.76ms
     http_req_connecting............: avg=35.52ms  min=0s       med=0s       max=1.85s  p(90)=54.07ms  p(95)=236.46ms
     http_req_duration..............: avg=11.3s    min=15.56ms  med=9.24s    max=33.43s p(90)=22.28s   p(95)=24.59s  
       { expected_response:true }...: avg=11.3s    min=15.56ms  med=9.24s    max=33.43s p(90)=22.28s   p(95)=24.59s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 7363  
     http_req_receiving.............: avg=261.89ms min=36.2µs   med=120.75µs max=7.78s  p(90)=596.94ms p(95)=1.62s   
     http_req_sending...............: avg=27.41ms  min=9.79µs   med=28.55µs  max=3.68s  p(90)=36.19ms  p(95)=121.81ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=11.01s   min=15.42ms  med=8.92s    max=31.94s p(90)=21.7s    p(95)=24.44s  
     http_reqs......................: 7363    91.547735/s
     iteration_duration.............: avg=11.96s   min=142.49ms med=9.99s    max=36.65s p(90)=23.86s   p(95)=26.31s  
     iterations.....................: 7343    91.299066/s
     vus............................: 298     min=59      max=1979
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/79dcdc77-f671-4064-3dfd-c88723858900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fb6214b5-712d-4bef-7cf4-4864d861cb00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0cb73fad-0f7e-450c-ad5d-ad0646afcc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14588     ✗ 0     
     data_received..................: 430 MB  4.7 MB/s
     data_sent......................: 6.0 MB  65 kB/s
     http_req_blocked...............: avg=271.78µs min=1.7µs    med=4.59µs   max=31.24ms p(90)=605.78µs p(95)=1.03ms  
     http_req_connecting............: avg=236.75µs min=0s       med=0s       max=31.02ms p(90)=524.72µs p(95)=880.51µs
     http_req_duration..............: avg=21.74s   min=10.88ms  med=20.02s   max=43.07s  p(90)=41.12s   p(95)=42.21s  
       { expected_response:true }...: avg=21.74s   min=10.88ms  med=20.02s   max=43.07s  p(90)=41.12s   p(95)=42.21s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 4896  
     http_req_receiving.............: avg=27.04ms  min=38.07µs  med=108.89µs max=2.39s   p(90)=539.23µs p(95)=2.14ms  
     http_req_sending...............: avg=64.71µs  min=8.54µs   med=28.75µs  max=18.5ms  p(90)=73.18µs  p(95)=106.34µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=21.71s   min=10.76ms  med=20.02s   max=43.07s  p(90)=40.72s   p(95)=42.2s   
     http_reqs......................: 4896    53.18749/s
     iteration_duration.............: avg=21.84s   min=222.77ms med=19.99s   max=45.03s  p(90)=41.64s   p(95)=42.35s  
     iterations.....................: 4836    52.535682/s
     vus............................: 271     min=59      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cf1db2d3-025f-431f-37bd-11ae66a99f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f4738c77-c5ed-43d9-8401-8d43d83b0b00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a226516c-a027-40fc-3daf-8e3bac606a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 22572     ✗ 0     
     data_received..................: 663 MB  7.5 MB/s
     data_sent......................: 9.0 MB  101 kB/s
     http_req_blocked...............: avg=4.32ms min=1.59µs   med=4.67µs   max=249.86ms p(90)=5.87ms   p(95)=31.04ms
     http_req_connecting............: avg=4.24ms min=0s       med=0s       max=249.79ms p(90)=5.57ms   p(95)=30.77ms
     http_req_duration..............: avg=12.29s min=13.81ms  med=3.37s    max=58.1s    p(90)=44.82s   p(95)=51.56s 
       { expected_response:true }...: avg=12.29s min=13.81ms  med=3.37s    max=58.1s    p(90)=44.82s   p(95)=51.56s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 7544  
     http_req_receiving.............: avg=1.79ms min=42.37µs  med=104.63µs max=464.71ms p(90)=917.44µs p(95)=2.91ms 
     http_req_sending...............: avg=1.7ms  min=8.74µs   med=27.68µs  max=162.15ms p(90)=710.63µs p(95)=12.14ms
     http_req_tls_handshaking.......: avg=0s     min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=12.29s min=13.7ms   med=3.37s    max=58.1s    p(90)=44.82s   p(95)=51.56s 
     http_reqs......................: 7544    85.421201/s
     iteration_duration.............: avg=12.38s min=128.41ms med=3.43s    max=58.15s   p(90)=44.91s   p(95)=51.63s 
     iterations.....................: 7524    85.19474/s
     vus............................: 52      min=52      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/90afdffa-d747-441a-0df6-e1af76f54200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/47fd2c7d-fe08-4651-7f26-55019be24600/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d08250d8-4c2a-4f95-37ba-b7c316e2b700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  93% — ✓ 7152 / ✗ 504
     ✗ no graphql errors
      ↳  93% — ✓ 7152 / ✗ 504
     ✓ valid response structure

     █ setup

     checks.........................: 95.51% ✓ 21456     ✗ 1008  
     data_received..................: 630 MB 6.8 MB/s
     data_sent......................: 9.2 MB 99 kB/s
     http_req_blocked...............: avg=585µs    min=1.39µs  med=3.44µs   max=100.62ms p(90)=429.75µs p(95)=816.06µs
     http_req_connecting............: avg=556.56µs min=0s      med=0s       max=100.55ms p(90)=356.8µs  p(95)=712.42µs
     http_req_duration..............: avg=11.94s   min=10.99ms med=2.18s    max=1m0s     p(90)=55.63s   p(95)=59.99s  
       { expected_response:true }...: avg=8.58s    min=10.99ms med=2.11s    max=59.99s   p(90)=37.34s   p(95)=47.86s  
     http_req_failed................: 6.56%  ✓ 504       ✗ 7172  
     http_req_receiving.............: avg=218.11µs min=0s      med=106.47µs max=195.2ms  p(90)=231.81µs p(95)=367.6µs 
     http_req_sending...............: avg=252.54µs min=8.32µs  med=17.96µs  max=60.01ms  p(90)=69.72µs  p(95)=145.26µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=11.94s   min=10.9ms  med=2.18s    max=1m0s     p(90)=55.63s   p(95)=59.99s  
     http_reqs......................: 7676   82.82067/s
     iteration_duration.............: avg=11.99s   min=61.11ms med=2.2s     max=1m0s     p(90)=55.66s   p(95)=1m0s    
     iterations.....................: 7656   82.604879/s
     vus............................: 78     min=62      max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e7c649ad-8adc-417a-b846-c58f843d7300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fbda6a84-0001-45c1-c2a5-6ace27770400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7761d0ae-dc5e-4325-b2b6-d36fa9eeaa00/public" alt="HTTP Overview" />


  </details>