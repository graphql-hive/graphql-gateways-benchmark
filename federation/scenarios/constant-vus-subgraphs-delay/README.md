## Overview for: `federation/constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8bb7a0d9-141d-457e-72ef-ec6f3010ea00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  178   | 10872 total, 0 failed | avg: 803ms, p95: 2042ms  | ✅                                                                        |
| grafbase         |  169   | 10313 total, 0 failed | avg: 883ms, p95: 2388ms  | ✅                                                                        |
| apollo-router    |  157   | 9621 total, 0 failed  | avg: 908ms, p95: 2225ms  | ✅                                                                        |
| hive-gateway     |   96   | 6042 total, 0 failed  | avg: 2993ms, p95: 4288ms | ✅                                                                        |
| hive-gateway-bun |   93   | 5872 total, 0 failed  | avg: 3054ms, p95: 5242ms | ✅                                                                        |
| apollo-server    |   88   | 5523 total, 65 failed | avg: 3293ms, p95: 2999ms | ❌ 65 failed requests, 65 non-200 responses, 65 unexpected GraphQL errors |
| mercurius        |   80   | 4990 total, 0 failed  | avg: 3634ms, p95: 4849ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32556      ✗ 0    
     data_received..................: 954 MB  16 MB/s
     data_sent......................: 13 MB   212 kB/s
     http_req_blocked...............: avg=1.7ms    min=1.39µs  med=3.13µs   max=1.34s p(90)=4.87µs   p(95)=10.46µs
     http_req_connecting............: avg=1.34ms   min=0s      med=0s       max=1.34s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=803.03ms min=3.2ms   med=671.87ms max=4.76s p(90)=1.73s    p(95)=2.04s  
       { expected_response:true }...: avg=803.03ms min=3.2ms   med=671.87ms max=4.76s p(90)=1.73s    p(95)=2.04s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10872
     http_req_receiving.............: avg=285.09ms min=33.57µs med=96.71µs  max=3.4s  p(90)=1.08s    p(95)=1.55s  
     http_req_sending...............: avg=24.27ms  min=8.07µs  med=15.04µs  max=4.42s p(90)=135.39µs p(95)=10.86ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=493.66ms min=3.03ms  med=437.36ms max=2.49s p(90)=938.53ms p(95)=1.08s  
     http_reqs......................: 10872   178.293825/s
     iteration_duration.............: avg=1.64s    min=22.41ms med=1.37s    max=9.3s  p(90)=3.35s    p(95)=4.1s   
     iterations.....................: 10852   177.965838/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ff73da74-0c94-4f75-cad0-561f95802100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/913ad101-0eec-4284-41b0-492e65ce4d00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c3359783-e3d9-43ff-4f92-6135f8f30900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30879      ✗ 0    
     data_received..................: 906 MB  15 MB/s
     data_sent......................: 12 MB   201 kB/s
     http_req_blocked...............: avg=2.58ms   min=1.4µs   med=3.45µs   max=2.4s  p(90)=5.13µs   p(95)=11.18µs
     http_req_connecting............: avg=2.14ms   min=0s      med=0s       max=2.4s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=882.56ms min=3.17ms  med=743.53ms max=6.96s p(90)=1.84s    p(95)=2.38s  
       { expected_response:true }...: avg=882.56ms min=3.17ms  med=743.53ms max=6.96s p(90)=1.84s    p(95)=2.38s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10313
     http_req_receiving.............: avg=300.12ms min=32.1µs  med=86.1µs   max=6.61s p(90)=1.14s    p(95)=1.9s   
     http_req_sending...............: avg=17.2ms   min=7.56µs  med=15.86µs  max=3.5s  p(90)=111.49µs p(95)=1.63ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=565.23ms min=3.11ms  med=537.03ms max=2.39s p(90)=1.01s    p(95)=1.22s  
     http_reqs......................: 10313   169.216819/s
     iteration_duration.............: avg=1.75s    min=20.94ms med=1.51s    max=8.57s p(90)=3.54s    p(95)=4.28s  
     iterations.....................: 10293   168.888657/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b2ff044d-f69b-4446-f511-54fc46dc2900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fafe32fc-0b25-457e-fa56-a9ee5710ad00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6979d8b4-c60c-4324-7248-6f1f38f6a600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 28803      ✗ 0    
     data_received..................: 844 MB  14 MB/s
     data_sent......................: 11 MB   187 kB/s
     http_req_blocked...............: avg=3.23ms   min=1.5µs   med=3.27µs   max=2.43s p(90)=5.11µs   p(95)=11.25µs
     http_req_connecting............: avg=2.77ms   min=0s      med=0s       max=2.32s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=907.68ms min=6.64ms  med=771.54ms max=6.06s p(90)=1.78s    p(95)=2.22s  
       { expected_response:true }...: avg=907.68ms min=6.64ms  med=771.54ms max=6.06s p(90)=1.78s    p(95)=2.22s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 9621 
     http_req_receiving.............: avg=260.01ms min=35.32µs med=82.61µs  max=5.33s p(90)=1.16s    p(95)=1.4s   
     http_req_sending...............: avg=19.07ms  min=7.67µs  med=14.99µs  max=2.9s  p(90)=136.41µs p(95)=14.59ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=628.58ms min=6.55ms  med=602.46ms max=2.82s p(90)=1.12s    p(95)=1.29s  
     http_reqs......................: 9621    157.632839/s
     iteration_duration.............: avg=1.87s    min=28.01ms med=1.6s     max=9.66s p(90)=3.72s    p(95)=4.43s  
     iterations.....................: 9601    157.305154/s
     vus............................: 40      min=40       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/095c8aa9-f882-4fc1-4312-9b645e9c2300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d7b29173-89ce-4d6d-20f6-b83920a46500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1c67c89d-869e-4b41-5a05-4f4610743200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 18066     ✗ 0    
     data_received..................: 531 MB  8.5 MB/s
     data_sent......................: 7.2 MB  114 kB/s
     http_req_blocked...............: avg=1.23ms   min=1.6µs    med=3.54µs  max=73.51ms  p(90)=5.53µs   p(95)=143.02µs
     http_req_connecting............: avg=1.17ms   min=0s       med=0s      max=73.48ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=2.99s    min=11.78ms  med=2.25s   max=53.37s   p(90)=3.36s    p(95)=4.28s   
       { expected_response:true }...: avg=2.99s    min=11.78ms  med=2.25s   max=53.37s   p(90)=3.36s    p(95)=4.28s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 6042 
     http_req_receiving.............: avg=1.03ms   min=39.26µs  med=85.05µs max=181.89ms p(90)=482.85µs p(95)=1.88ms  
     http_req_sending...............: avg=861.11µs min=8.44µs   med=18.2µs  max=129.32ms p(90)=56.86µs  p(95)=1.96ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.99s    min=11.7ms   med=2.25s   max=53.37s   p(90)=3.36s    p(95)=4.28s   
     http_reqs......................: 6042    96.397677/s
     iteration_duration.............: avg=3.05s    min=360.42ms med=2.31s   max=53.41s   p(90)=3.41s    p(95)=4.36s   
     iterations.....................: 6022    96.078585/s
     vus............................: 119     min=119     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d9b84243-bf7c-47b1-b37f-33468fb8b000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2123c3f9-2f5d-4aa0-fa2b-5bf2ff3bb200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9831a2a9-b414-41a7-5ef4-118a2fbdea00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17556     ✗ 0    
     data_received..................: 515 MB  8.2 MB/s
     data_sent......................: 7.0 MB  111 kB/s
     http_req_blocked...............: avg=380.81µs min=1.68µs   med=3.56µs   max=186.01ms p(90)=5.74µs  p(95)=326.88µs
     http_req_connecting............: avg=314.04µs min=0s       med=0s       max=23.33ms  p(90)=0s      p(95)=159.15µs
     http_req_duration..............: avg=3.05s    min=14.66ms  med=2.77s    max=7.9s     p(90)=4.53s   p(95)=5.24s   
       { expected_response:true }...: avg=3.05s    min=14.66ms  med=2.77s    max=7.9s     p(90)=4.53s   p(95)=5.24s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5872 
     http_req_receiving.............: avg=45.29ms  min=36.98µs  med=117.55µs max=1.77s    p(90)=8.18ms  p(95)=326.45ms
     http_req_sending...............: avg=847.94µs min=9.82µs   med=19.13µs  max=562.07ms p(90)=79.98µs p(95)=1.23ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3s       min=14.53ms  med=2.75s    max=7.9s     p(90)=4.51s   p(95)=5.16s   
     http_reqs......................: 5872    93.804692/s
     iteration_duration.............: avg=3.13s    min=234.44ms med=2.83s    max=7.99s    p(90)=4.58s   p(95)=5.37s   
     iterations.....................: 5852    93.485194/s
     vus............................: 121     min=121     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3fa12a62-fa10-4a57-0f26-997e7f864b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e431ada4-e6d7-4a34-ae42-b47f2eb20f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/232a5790-45d2-414e-f8e8-0fb4d3b68d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5438 / ✗ 65
     ✗ no graphql errors
      ↳  98% — ✓ 5438 / ✗ 65
     ✓ valid response structure

     █ setup

     checks.........................: 99.20% ✓ 16314     ✗ 130  
     data_received..................: 479 MB 7.7 MB/s
     data_sent......................: 6.6 MB 105 kB/s
     http_req_blocked...............: avg=425.18µs min=1.62µs   med=3.25µs   max=29.37ms  p(90)=5.48µs  p(95)=590.52µs
     http_req_connecting............: avg=407.08µs min=0s       med=0s       max=17.36ms  p(90)=0s      p(95)=353.59µs
     http_req_duration..............: avg=3.29s    min=10.42ms  med=2s       max=1m0s     p(90)=2.62s   p(95)=2.99s   
       { expected_response:true }...: avg=2.61s    min=10.42ms  med=1.99s    max=59.41s   p(90)=2.59s   p(95)=2.83s   
     http_req_failed................: 1.17%  ✓ 65        ✗ 5458 
     http_req_receiving.............: avg=355.78µs min=0s       med=100.12µs max=149.39ms p(90)=229.4µs p(95)=398.41µs
     http_req_sending...............: avg=199.8µs  min=8.63µs   med=16.82µs  max=56.22ms  p(90)=39.99µs p(95)=240.79µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.29s    min=10.34ms  med=2s       max=1m0s     p(90)=2.62s   p(95)=2.99s   
     http_reqs......................: 5523   88.270966/s
     iteration_duration.............: avg=3.32s    min=320.95ms med=2.03s    max=1m0s     p(90)=2.64s   p(95)=3.01s   
     iterations.....................: 5503   87.951318/s
     vus............................: 98     min=98      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e21dd7ef-8cde-4a05-9ce1-30dc69055e00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a11b0630-7194-4f6e-c235-5336c1e62900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/10e7819a-a707-4932-4949-8a676b774c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14910     ✗ 0    
     data_received..................: 438 MB  7.1 MB/s
     data_sent......................: 5.9 MB  96 kB/s
     http_req_blocked...............: avg=1.65ms  min=1.62µs   med=3.65µs  max=72.88ms  p(90)=5.69µs  p(95)=12.77ms 
     http_req_connecting............: avg=1.59ms  min=0s       med=0s      max=72.78ms  p(90)=0s      p(95)=11.82ms 
     http_req_duration..............: avg=3.63s   min=11.58ms  med=3.6s    max=6.52s    p(90)=4.22s   p(95)=4.84s   
       { expected_response:true }...: avg=3.63s   min=11.58ms  med=3.6s    max=6.52s    p(90)=4.22s   p(95)=4.84s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4990 
     http_req_receiving.............: avg=1.17ms  min=39.81µs  med=99.62µs max=494.96ms p(90)=255.3µs p(95)=517.06µs
     http_req_sending...............: avg=566.6µs min=8.84µs   med=19.78µs max=23.6ms   p(90)=41.86µs p(95)=1.39ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.63s   min=11.51ms  med=3.6s    max=6.52s    p(90)=4.21s   p(95)=4.84s   
     http_reqs......................: 4990    80.659644/s
     iteration_duration.............: avg=3.67s   min=421.66ms med=3.62s   max=6.56s    p(90)=4.25s   p(95)=4.87s   
     iterations.....................: 4970    80.336359/s
     vus............................: 233     min=233     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4fe829fc-e990-478a-3f98-894cd9dc8f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/462b20ca-4613-4d9f-c4d1-3d9e12f03c00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1b7ba75e-902d-47ce-e063-4e0b5ee76200/public" alt="HTTP Overview" />


  </details>