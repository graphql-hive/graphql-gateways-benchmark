## Overview for: `federation/constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/24f22898-05e8-4e44-c80f-8643649a2900/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  173   | 10567 total, 0 failed | avg: 878ms, p95: 2464ms  | ✅                                                                        |
| grafbase         |  165   | 10077 total, 0 failed | avg: 804ms, p95: 2348ms  | ✅                                                                        |
| apollo-router    |  153   | 9404 total, 0 failed  | avg: 960ms, p95: 2429ms  | ✅                                                                        |
| hive-gateway-bun |   92   | 5813 total, 0 failed  | avg: 3124ms, p95: 5372ms | ✅                                                                        |
| apollo-server    |   87   | 5485 total, 71 failed | avg: 3311ms, p95: 2959ms | ❌ 71 failed requests, 71 non-200 responses, 71 unexpected GraphQL errors |
| hive-gateway     |   86   | 5435 total, 8 failed  | avg: 3364ms, p95: 5008ms | ❌ 8 failed requests, 8 non-200 responses, 8 unexpected GraphQL errors    |
| mercurius        |   76   | 4760 total, 0 failed  | avg: 3811ms, p95: 4950ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31641      ✗ 0    
     data_received..................: 927 MB  15 MB/s
     data_sent......................: 13 MB   206 kB/s
     http_req_blocked...............: avg=1.57ms   min=2µs     med=4.18µs   max=4.86s  p(90)=6.12µs   p(95)=12.32µs
     http_req_connecting............: avg=952.16µs min=0s      med=0s       max=1.26s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=878.11ms min=3.9ms   med=666.63ms max=6.66s  p(90)=1.88s    p(95)=2.46s  
       { expected_response:true }...: avg=878.11ms min=3.9ms   med=666.63ms max=6.66s  p(90)=1.88s    p(95)=2.46s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10567
     http_req_receiving.............: avg=354.41ms min=33.39µs med=112.89µs max=5.63s  p(90)=1.31s    p(95)=1.94s  
     http_req_sending...............: avg=22.82ms  min=8.86µs  med=21.31µs  max=3.98s  p(90)=153.77µs p(95)=14.96ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=500.87ms min=3.81ms  med=451.85ms max=2.74s  p(90)=947.09ms p(95)=1.07s  
     http_reqs......................: 10567   173.232649/s
     iteration_duration.............: avg=1.71s    min=18.92ms med=1.35s    max=12.06s p(90)=3.6s     p(95)=4.54s  
     iterations.....................: 10547   172.904774/s
     vus............................: 6       min=6        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cc19acb5-64da-4c21-d68c-f42d82183300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9332d842-578e-4a6e-a388-cc084653bc00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/40fe2156-e7ef-48ef-8c23-813464809c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30171      ✗ 0    
     data_received..................: 886 MB  15 MB/s
     data_sent......................: 12 MB   196 kB/s
     http_req_blocked...............: avg=1.51ms   min=1.71µs  med=4.2µs    max=1.41s  p(90)=6.17µs   p(95)=13.39µs
     http_req_connecting............: avg=1.15ms   min=0s      med=0s       max=1.26s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=804.01ms min=3.21ms  med=604.7ms  max=6.76s  p(90)=1.71s    p(95)=2.34s  
       { expected_response:true }...: avg=804.01ms min=3.21ms  med=604.7ms  max=6.76s  p(90)=1.71s    p(95)=2.34s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10077
     http_req_receiving.............: avg=317.08ms min=29.21µs med=106.21µs max=5.7s   p(90)=1.15s    p(95)=1.7s   
     http_req_sending...............: avg=27.29ms  min=8.58µs  med=22.3µs   max=4.03s  p(90)=260.55µs p(95)=41.61ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=459.63ms min=3.12ms  med=408.57ms max=2.65s  p(90)=914.11ms p(95)=1.07s  
     http_reqs......................: 10077   165.305669/s
     iteration_duration.............: avg=1.78s    min=20.8ms  med=1.4s     max=13.56s p(90)=3.82s    p(95)=4.81s  
     iterations.....................: 10057   164.977584/s
     vus............................: 277     min=277      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5c57e595-fa08-4625-da4a-456931c95000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b46acb7f-322e-4951-7d7e-cfbb55485b00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/014ce58c-68c2-42de-1de3-b6178f56f800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 28152      ✗ 0    
     data_received..................: 825 MB  14 MB/s
     data_sent......................: 11 MB   183 kB/s
     http_req_blocked...............: avg=2.46ms   min=1.51µs  med=3.57µs   max=2.32s p(90)=5.56µs   p(95)=12.53µs
     http_req_connecting............: avg=1.7ms    min=0s      med=0s       max=2.32s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=960.05ms min=6.58ms  med=785.04ms max=6.25s p(90)=1.99s    p(95)=2.42s  
       { expected_response:true }...: avg=960.05ms min=6.58ms  med=785.04ms max=6.25s p(90)=1.99s    p(95)=2.42s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 9404 
     http_req_receiving.............: avg=327.7ms  min=34.77µs med=91.95µs  max=6.16s p(90)=1.3s     p(95)=1.69s  
     http_req_sending...............: avg=20.94ms  min=7.67µs  med=17.43µs  max=2.91s p(90)=149.77µs p(95)=17.12ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=611.4ms  min=6.49ms  med=562.65ms max=3.47s p(90)=1.1s     p(95)=1.38s  
     http_reqs......................: 9404    153.982343/s
     iteration_duration.............: avg=1.92s    min=31.42ms med=1.66s    max=9.58s p(90)=3.84s    p(95)=4.66s  
     iterations.....................: 9384    153.654861/s
     vus............................: 37      min=37       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/467ba71a-8fed-41fd-0379-4aebca05ca00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/63909074-1cef-4dac-d7a1-77e7dc19f300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d7fd78e8-29d5-4846-f529-afc80fa2ad00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17379     ✗ 0    
     data_received..................: 510 MB  8.1 MB/s
     data_sent......................: 6.9 MB  110 kB/s
     http_req_blocked...............: avg=695.92µs min=1.72µs   med=3.94µs   max=40.99ms  p(90)=6.01µs  p(95)=1.06ms  
     http_req_connecting............: avg=665.01µs min=0s       med=0s       max=40.96ms  p(90)=0s      p(95)=640.82µs
     http_req_duration..............: avg=3.12s    min=16.25ms  med=2.85s    max=6.76s    p(90)=4.66s   p(95)=5.37s   
       { expected_response:true }...: avg=3.12s    min=16.25ms  med=2.85s    max=6.76s    p(90)=4.66s   p(95)=5.37s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5813 
     http_req_receiving.............: avg=42.6ms   min=38.92µs  med=165.62µs max=1.92s    p(90)=3.76ms  p(95)=139.95ms
     http_req_sending...............: avg=533.25µs min=8.99µs   med=22.38µs  max=150.34ms p(90)=75.53µs p(95)=667.22µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.08s    min=16.1ms   med=2.83s    max=6.76s    p(90)=4.62s   p(95)=5.35s   
     http_reqs......................: 5813    92.221801/s
     iteration_duration.............: avg=3.18s    min=194.15ms med=2.89s    max=6.77s    p(90)=4.74s   p(95)=5.42s   
     iterations.....................: 5793    91.904506/s
     vus............................: 14      min=14      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f2a90cc4-a70f-4d19-e1a8-c072726b4f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c1f96f9e-4a3b-4a29-e49b-aa135823db00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8410615f-c60e-47b7-6c35-696e1bd94a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5394 / ✗ 71
     ✗ no graphql errors
      ↳  98% — ✓ 5394 / ✗ 71
     ✓ valid response structure

     █ setup

     checks.........................: 99.13% ✓ 16182     ✗ 142  
     data_received..................: 476 MB 7.6 MB/s
     data_sent......................: 6.5 MB 104 kB/s
     http_req_blocked...............: avg=438.91µs min=1.58µs   med=3.5µs    max=41.23ms  p(90)=5.54µs   p(95)=1.5ms   
     http_req_connecting............: avg=397.4µs  min=0s       med=0s       max=30.58ms  p(90)=0s       p(95)=699.8µs 
     http_req_duration..............: avg=3.31s    min=10.47ms  med=1.96s    max=1m0s     p(90)=2.5s     p(95)=2.95s   
       { expected_response:true }...: avg=2.56s    min=10.47ms  med=1.95s    max=59.68s   p(90)=2.49s    p(95)=2.77s   
     http_req_failed................: 1.29%  ✓ 71        ✗ 5414 
     http_req_receiving.............: avg=299.97µs min=0s       med=106.92µs max=100.86ms p(90)=231.98µs p(95)=401.16µs
     http_req_sending...............: avg=141.06µs min=9.02µs   med=18.74µs  max=37.32ms  p(90)=40.41µs  p(95)=192.04µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.31s    min=10.33ms  med=1.96s    max=1m0s     p(90)=2.5s     p(95)=2.95s   
     http_reqs......................: 5485   87.820345/s
     iteration_duration.............: avg=3.34s    min=183.42ms med=1.98s    max=1m0s     p(90)=2.52s    p(95)=2.97s   
     iterations.....................: 5465   87.500125/s
     vus............................: 70     min=70      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1f101804-bfbb-415f-c3c2-c00f3d528b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9518e1ce-7f43-439f-7f48-8dae03977e00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0f7435bb-7f5d-4cdf-1952-b5831245c200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 5407 / ✗ 8
     ✗ no graphql errors
      ↳  99% — ✓ 5407 / ✗ 8
     ✓ valid response structure

     █ setup

     checks.........................: 99.90% ✓ 16221     ✗ 16   
     data_received..................: 477 MB 7.6 MB/s
     data_sent......................: 6.5 MB 102 kB/s
     http_req_blocked...............: avg=494.62µs min=1.87µs   med=4.43µs   max=29.84ms  p(90)=6.67µs   p(95)=597.24µs
     http_req_connecting............: avg=461.62µs min=0s       med=0s       max=23.64ms  p(90)=0s       p(95)=340.53µs
     http_req_duration..............: avg=3.36s    min=14.47ms  med=2.37s    max=1m0s     p(90)=3.56s    p(95)=5s      
       { expected_response:true }...: avg=3.28s    min=14.47ms  med=2.37s    max=59.73s   p(90)=3.55s    p(95)=4.93s   
     http_req_failed................: 0.14%  ✓ 8         ✗ 5427 
     http_req_receiving.............: avg=685.12µs min=0s       med=109.09µs max=177.16ms p(90)=453.91µs p(95)=1.16ms  
     http_req_sending...............: avg=284.98µs min=9.94µs   med=25.2µs   max=112.26ms p(90)=80.26µs  p(95)=489.35µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.36s    min=14.35ms  med=2.37s    max=1m0s     p(90)=3.56s    p(95)=5s      
     http_reqs......................: 5435   86.106327/s
     iteration_duration.............: avg=3.4s     min=216.78ms med=2.4s     max=1m0s     p(90)=3.61s    p(95)=5.05s   
     iterations.....................: 5415   85.789468/s
     vus............................: 22     min=22      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1969d4fa-5df5-410b-f694-32fb3ee6af00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/610a9461-8d3a-4dfc-1702-19780408bf00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a8a6dac4-5ee6-4746-7527-0ec046a5fb00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14220     ✗ 0    
     data_received..................: 418 MB  6.7 MB/s
     data_sent......................: 5.7 MB  91 kB/s
     http_req_blocked...............: avg=523.43µs min=1.82µs   med=3.87µs   max=20.51ms  p(90)=5.97µs   p(95)=1.41ms  
     http_req_connecting............: avg=508.54µs min=0s       med=0s       max=19.89ms  p(90)=0s       p(95)=783.01µs
     http_req_duration..............: avg=3.81s    min=10.64ms  med=3.78s    max=8.5s     p(90)=4.42s    p(95)=4.95s   
       { expected_response:true }...: avg=3.81s    min=10.64ms  med=3.78s    max=8.5s     p(90)=4.42s    p(95)=4.95s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4760 
     http_req_receiving.............: avg=8.26ms   min=39.84µs  med=106.21µs max=723.47ms p(90)=349.04µs p(95)=1.18ms  
     http_req_sending...............: avg=177.04µs min=9.74µs   med=22.29µs  max=25.37ms  p(90)=46.04µs  p(95)=378.64µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.8s     min=10.55ms  med=3.78s    max=8.5s     p(90)=4.42s    p(95)=4.95s   
     http_reqs......................: 4760    76.825564/s
     iteration_duration.............: avg=3.85s    min=425.79ms med=3.8s     max=8.51s    p(90)=4.44s    p(95)=4.97s   
     iterations.....................: 4740    76.502768/s
     vus............................: 219     min=219     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/73a43c92-bb96-49d5-b642-f5646b514d00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ca53cebd-35eb-4298-723e-4ca6c2da9300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8df78c41-cd2a-4a1c-ac43-c79f14550900/public" alt="HTTP Overview" />


  </details>