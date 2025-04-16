## Overview for: `federation/ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was trying to reach 2000 concurrent VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9cbb80dd-6368-4f55-8496-6354c6dcda00/public" alt="Comparison" />


| Gateway          | duration(p95)⬇️ |  RPS  |        Requests         |                       Durations                        | Notes                                                                       |
| :--------------- | :-------------: | :---: | :---------------------: | :----------------------------------------------------: | :-------------------------------------------------------------------------- |
| grafbase         |     5942ms      |  163  |  11436 total, 0 failed  |  avg: 2658ms, p95: 5942ms, max: 14375ms, med: 2321ms   | ✅                                                                           |
| apollo-router    |     5952ms      |  167  | 11900 total, 637 failed |  avg: 2780ms, p95: 5952ms, max: 15345ms, med: 2228ms   | ❌ 637 failed requests, 637 non-200 responses, 637 unexpected GraphQL errors |
| cosmo            |     6757ms      |  171  |  12270 total, 0 failed  |  avg: 2777ms, p95: 6757ms, max: 17620ms, med: 2229ms   | ✅                                                                           |
| hive-gateway-bun |     29909ms     |  88   |  7308 total, 0 failed   | avg: 11969ms, p95: 29910ms, max: 40201ms, med: 10512ms | ✅                                                                           |
| mercurius        |     42066ms     |  52   |  4813 total, 0 failed   | avg: 21892ms, p95: 42066ms, max: 43205ms, med: 20781ms | ✅                                                                           |
| hive-gateway     |     53258ms     |  79   |  7213 total, 0 failed   | avg: 13312ms, p95: 53258ms, max: 58889ms, med: 3514ms  | ✅                                                                           |
| apollo-server    |     59999ms     |  84   | 7826 total, 502 failed  | avg: 11924ms, p95: 60000ms, max: 60285ms, med: 2203ms  | ❌ 502 failed requests, 502 non-200 responses, 502 unexpected GraphQL errors |



<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 34248      ✗ 0     
     data_received..................: 1.0 GB  14 MB/s
     data_sent......................: 14 MB   194 kB/s
     http_req_blocked...............: avg=252.06ms min=1.48µs  med=3.84µs  max=10.57s p(90)=838.4ms  p(95)=2.03s   
     http_req_connecting............: avg=246.29ms min=0s      med=0s      max=9.74s  p(90)=790.61ms p(95)=2.02s   
     http_req_duration..............: avg=2.65s    min=3.39ms  med=2.32s   max=14.37s p(90)=5.26s    p(95)=5.94s   
       { expected_response:true }...: avg=2.65s    min=3.39ms  med=2.32s   max=14.37s p(90)=5.26s    p(95)=5.94s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 11436 
     http_req_receiving.............: avg=425.03ms min=32.42µs med=85.94µs max=12.01s p(90)=1.4s     p(95)=2.54s   
     http_req_sending...............: avg=148.95ms min=8.09µs  med=19.18µs max=9.85s  p(90)=235.69ms p(95)=935.28ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.08s    min=3.31ms  med=1.95s   max=7.85s  p(90)=4.31s    p(95)=4.9s    
     http_reqs......................: 11436   163.167873/s
     iteration_duration.............: avg=5.99s    min=9.47ms  med=5.13s   max=25.35s p(90)=12.18s   p(95)=14.56s  
     iterations.....................: 11416   162.882515/s
     vus............................: 4       min=4        max=1933
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b2d3010c-1284-4562-56e1-a0aff1af3c00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c1b791bb-6be3-4cf3-352c-b6f9cf379400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/86ddfbd9-0f89-4680-ada5-f36c59078e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  94% — ✓ 11243 / ✗ 637
     ✗ no graphql errors
      ↳  94% — ✓ 11243 / ✗ 637
     ✓ valid response structure

     █ setup

     checks.........................: 96.36% ✓ 33729      ✗ 1274  
     data_received..................: 988 MB 14 MB/s
     data_sent......................: 14 MB  199 kB/s
     http_req_blocked...............: avg=532.18ms min=1.5µs   med=4.09µs  max=14.11s p(90)=2.38s    p(95)=4.36s
     http_req_connecting............: avg=516.68ms min=0s      med=0s      max=14.11s p(90)=1.99s    p(95)=4.35s
     http_req_duration..............: avg=2.78s    min=6.85ms  med=2.22s   max=15.34s p(90)=5.4s     p(95)=5.95s
       { expected_response:true }...: avg=2.73s    min=6.85ms  med=2.17s   max=15.34s p(90)=5.38s    p(95)=5.92s
     http_req_failed................: 5.35%  ✓ 637        ✗ 11263 
     http_req_receiving.............: avg=261.05ms min=0s      med=81.59µs max=7.05s  p(90)=943.75ms p(95)=1.99s
     http_req_sending...............: avg=203.77ms min=8.15µs  med=22.13µs max=11.81s p(90)=497.83ms p(95)=1.07s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s   
     http_req_waiting...............: avg=2.31s    min=6.72ms  med=1.78s   max=10.85s p(90)=5.03s    p(95)=5.39s
     http_reqs......................: 11900  167.284823/s
     iteration_duration.............: avg=6.17s    min=31.06ms med=5.34s   max=24.8s  p(90)=11.86s   p(95)=14.4s
     iterations.....................: 11880  167.003672/s
     vus............................: 254    min=75       max=1952
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9b811e98-d369-4d0b-c9f8-4b22e4aa4000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/005b0c8b-bcbf-41de-4e47-ac3b8bd9a700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/267c149c-52ee-4d4e-f047-8060dd2b5300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 36750      ✗ 0     
     data_received..................: 1.1 GB  15 MB/s
     data_sent......................: 15 MB   203 kB/s
     http_req_blocked...............: avg=296.69ms min=1.72µs  med=4.47µs   max=11.77s p(90)=785.22ms p(95)=2.25s   
     http_req_connecting............: avg=294.6ms  min=0s      med=0s       max=11.77s p(90)=773.3ms  p(95)=2.23s   
     http_req_duration..............: avg=2.77s    min=3.59ms  med=2.22s    max=17.61s p(90)=5.4s     p(95)=6.75s   
       { expected_response:true }...: avg=2.77s    min=3.59ms  med=2.22s    max=17.61s p(90)=5.4s     p(95)=6.75s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 12270 
     http_req_receiving.............: avg=453.59ms min=35.23µs med=101.01µs max=14.36s p(90)=1.4s     p(95)=3.37s   
     http_req_sending...............: avg=151.08ms min=8.62µs  med=23.76µs  max=9.81s  p(90)=198.81ms p(95)=707.56ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.17s    min=3.36ms  med=1.72s    max=9.18s  p(90)=4.79s    p(95)=5.22s   
     http_reqs......................: 12270   171.093944/s
     iteration_duration.............: avg=6.17s    min=32.33ms med=5.3s     max=41.22s p(90)=12.63s   p(95)=14.85s  
     iterations.....................: 12250   170.815062/s
     vus............................: 1       min=1        max=1936
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3ef59200-fa6d-499d-addb-0c87d687ee00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fc700b21-9d50-4bed-9949-92a0e6f74d00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3f904fb2-a5e4-473e-ac16-8d07bc7ff100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 21864     ✗ 0     
     data_received..................: 642 MB  7.8 MB/s
     data_sent......................: 8.7 MB  106 kB/s
     http_req_blocked...............: avg=4.93ms   min=2µs      med=4.38µs   max=458.26ms p(90)=1.32ms   p(95)=18.72ms
     http_req_connecting............: avg=4.77ms   min=0s       med=0s       max=458.05ms p(90)=1ms      p(95)=18.01ms
     http_req_duration..............: avg=11.96s   min=17.25ms  med=10.51s   max=40.2s    p(90)=25.8s    p(95)=29.9s  
       { expected_response:true }...: avg=11.96s   min=17.25ms  med=10.51s   max=40.2s    p(90)=25.8s    p(95)=29.9s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 7308  
     http_req_receiving.............: avg=108.68ms min=37.26µs  med=287.95µs max=7.72s    p(90)=5.73ms   p(95)=264.4ms
     http_req_sending...............: avg=2.65ms   min=9.12µs   med=27.04µs  max=492.52ms p(90)=240.64µs p(95)=7.04ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=11.85s   min=16.99ms  med=10.35s   max=38.48s   p(90)=25.6s    p(95)=29.89s 
     http_reqs......................: 7308    88.865879/s
     iteration_duration.............: avg=12.1s    min=230.72ms med=10.6s    max=40.97s   p(90)=25.97s   p(95)=30.25s 
     iterations.....................: 7288    88.622678/s
     vus............................: 73      min=59      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b953fdaa-07e1-4d8f-1b61-695c5c752c00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/edaecf3d-bca8-4df3-9732-f2f8bdc0bb00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5cfdb695-2396-4287-95f6-3e067f532300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14331     ✗ 0     
     data_received..................: 423 MB  4.6 MB/s
     data_sent......................: 5.9 MB  64 kB/s
     http_req_blocked...............: avg=202.43µs min=1.88µs   med=5.19µs   max=17.67ms p(90)=473.86µs p(95)=700.2µs 
     http_req_connecting............: avg=171.02µs min=0s       med=0s       max=17.59ms p(90)=398.39µs p(95)=575.26µs
     http_req_duration..............: avg=21.89s   min=13.32ms  med=20.78s   max=43.2s   p(90)=41.21s   p(95)=42.06s  
       { expected_response:true }...: avg=21.89s   min=13.32ms  med=20.78s   max=43.2s   p(90)=41.21s   p(95)=42.06s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 4813  
     http_req_receiving.............: avg=31.73ms  min=38.96µs  med=112.73µs max=1.56s   p(90)=633.35µs p(95)=4.44ms  
     http_req_sending...............: avg=66.21µs  min=9.53µs   med=32.02µs  max=18.36ms p(90)=67.43µs  p(95)=87.78µs 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=21.86s   min=13.22ms  med=20.78s   max=43.2s   p(90)=41.04s   p(95)=42.04s  
     http_reqs......................: 4813    52.553287/s
     iteration_duration.............: avg=21.9s    min=148.77ms med=19.98s   max=43.25s  p(90)=41.35s   p(95)=42.21s  
     iterations.....................: 4746    51.821713/s
     vus............................: 517     min=54      max=1999
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/99a5dc45-aebc-4636-9f14-71489c349400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/51aa335c-2192-4135-568b-cbd114bcb300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/73f3b7cc-2440-4785-52df-65c2549b4700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 21579     ✗ 0     
     data_received..................: 634 MB  7.0 MB/s
     data_sent......................: 8.6 MB  95 kB/s
     http_req_blocked...............: avg=1.13ms   min=1.83µs  med=4.74µs   max=119.27ms p(90)=580.57µs p(95)=3ms    
     http_req_connecting............: avg=1.09ms   min=0s      med=0s       max=119.1ms  p(90)=486.64µs p(95)=2.72ms 
     http_req_duration..............: avg=13.31s   min=15.55ms med=3.51s    max=58.88s   p(90)=47.7s    p(95)=53.25s 
       { expected_response:true }...: avg=13.31s   min=15.55ms med=3.51s    max=58.88s   p(90)=47.7s    p(95)=53.25s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 7213  
     http_req_receiving.............: avg=563.01µs min=45.3µs  med=120.68µs max=90.2ms   p(90)=925.37µs p(95)=2.42ms 
     http_req_sending...............: avg=483.95µs min=9.43µs  med=28.79µs  max=172.18ms p(90)=80.25µs  p(95)=290.2µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=13.31s   min=15.43ms med=3.51s    max=58.88s   p(90)=47.7s    p(95)=53.25s 
     http_reqs......................: 7213    79.701411/s
     iteration_duration.............: avg=13.37s   min=99.22ms med=3.54s    max=58.9s    p(90)=47.76s   p(95)=53.33s 
     iterations.....................: 7193    79.480418/s
     vus............................: 61      min=55      max=1999
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/32022db5-7d2c-46c6-3be6-09747d11bb00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ae3d0e8c-6499-4c9b-9d36-f65d580bc400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7968323f-b304-4706-7140-67285e628900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  93% — ✓ 7304 / ✗ 502
     ✗ no graphql errors
      ↳  93% — ✓ 7304 / ✗ 502
     ✓ valid response structure

     █ setup

     checks.........................: 95.61% ✓ 21912     ✗ 1004  
     data_received..................: 644 MB 6.9 MB/s
     data_sent......................: 9.3 MB 101 kB/s
     http_req_blocked...............: avg=386.91µs min=1.28µs  med=3.1µs    max=59.87ms  p(90)=319.84µs p(95)=507.54µs
     http_req_connecting............: avg=365.28µs min=0s      med=0s       max=59.79ms  p(90)=250.8µs  p(95)=414.33µs
     http_req_duration..............: avg=11.92s   min=10.91ms med=2.2s     max=1m0s     p(90)=55.37s   p(95)=59.99s  
       { expected_response:true }...: avg=8.62s    min=10.91ms med=2.16s    max=59.99s   p(90)=37.81s   p(95)=47.61s  
     http_req_failed................: 6.41%  ✓ 502       ✗ 7324  
     http_req_receiving.............: avg=205.71µs min=0s      med=104.93µs max=113.25ms p(90)=211.35µs p(95)=351.4µs 
     http_req_sending...............: avg=115.93µs min=8.39µs  med=15.32µs  max=35.82ms  p(90)=58.37µs  p(95)=92.43µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=11.92s   min=10.83ms med=2.2s     max=1m0s     p(90)=55.37s   p(95)=59.99s  
     http_reqs......................: 7826   84.31894/s
     iteration_duration.............: avg=11.96s   min=56.48ms med=2.21s    max=1m0s     p(90)=55.41s   p(95)=1m0s    
     iterations.....................: 7806   84.103456/s
     vus............................: 7      min=7       max=1999
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a2098e9e-bdea-41b1-ffd4-5bea280b3400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d8ba3391-a218-43b3-c07a-feb083bfa700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0b6b1be2-f0d8-4887-8162-55932b158300/public" alt="HTTP Overview" />


  </details>