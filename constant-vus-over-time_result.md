## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cb7978b5-3697-469a-7604-6467978cc300/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :--------------- | :----: | :--------------------: | :--------------------: | :---- |
| hive-router      |  1833  | 110535 total, 0 failed |  avg: 27ms, p95: 48ms  | ✅     |
| cosmo            |  646   | 39059 total, 0 failed  | avg: 77ms, p95: 113ms  | ✅     |
| grafbase         |  559   | 33761 total, 0 failed  | avg: 89ms, p95: 117ms  | ✅     |
| apollo-router    |  366   | 22258 total, 0 failed  | avg: 135ms, p95: 175ms | ✅     |
| hive-gateway     |  297   | 18157 total, 0 failed  | avg: 165ms, p95: 325ms | ✅     |
| hive-gateway-bun |  292   | 17951 total, 0 failed  | avg: 167ms, p95: 327ms | ✅     |
| apollo-gateway   |  115   |  7053 total, 0 failed  | avg: 426ms, p95: 503ms | ✅     |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 331305      ✗ 0     
     data_received..................: 9.7 GB  161 MB/s
     data_sent......................: 129 MB  2.1 MB/s
     http_req_blocked...............: avg=5.77µs   min=1.16µs  med=2.64µs  max=11.29ms  p(90)=3.86µs   p(95)=4.63µs  p(99.9)=56.34µs
     http_req_connecting............: avg=2.64µs   min=0s      med=0s      max=11.26ms  p(90)=0s       p(95)=0s      p(99.9)=0s     
     http_req_duration..............: avg=26.93ms  min=2.17ms  med=24.42ms max=470.59ms p(90)=41.58ms  p(95)=48.16ms p(99.9)=85.38ms
       { expected_response:true }...: avg=26.93ms  min=2.17ms  med=24.42ms max=470.59ms p(90)=41.58ms  p(95)=48.16ms p(99.9)=85.38ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 110535
     http_req_receiving.............: avg=117.54µs min=23.79µs med=43.23µs max=274.51ms p(90)=116.85µs p(95)=346.5µs p(99.9)=12.06ms
     http_req_sending...............: avg=91.36µs  min=5.09µs  med=10.16µs max=325.53ms p(90)=31.71µs  p(95)=126µs   p(99.9)=12.39ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      p(99.9)=0s     
     http_req_waiting...............: avg=26.72ms  min=2.12ms  med=24.26ms max=455.67ms p(90)=41.19ms  p(95)=47.71ms p(99.9)=83.87ms
     http_reqs......................: 110535  1833.65079/s
     iteration_duration.............: avg=27.15ms  min=3.42ms  med=24.61ms max=493.49ms p(90)=41.78ms  p(95)=48.37ms p(99.9)=86.05ms
     iterations.....................: 110435  1831.991903/s
     success_rate...................: 100.00% ✓ 110435      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/78a0279a-9b5b-4de2-d0a0-8f2fd571f000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4af8ba13-49bf-49f2-7c8c-82fee64a7e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 116877     ✗ 0    
     data_received..................: 3.4 GB  57 MB/s
     data_sent......................: 45 MB   752 kB/s
     http_req_blocked...............: avg=10.71µs  min=1.29µs  med=2.95µs  max=11.23ms  p(90)=4.2µs    p(95)=5.06µs   p(99.9)=2.34ms  
     http_req_connecting............: avg=7.07µs   min=0s      med=0s      max=11.19ms  p(90)=0s       p(95)=0s       p(99.9)=2.3ms   
     http_req_duration..............: avg=76.58ms  min=2.74ms  med=75.11ms max=520.42ms p(90)=104.26ms p(95)=113.47ms p(99.9)=302.6ms 
       { expected_response:true }...: avg=76.58ms  min=2.74ms  med=75.11ms max=520.42ms p(90)=104.26ms p(95)=113.47ms p(99.9)=302.6ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 39059
     http_req_receiving.............: avg=178.73µs min=29.46µs med=78.84µs max=192.9ms  p(90)=160.68µs p(95)=400.6µs  p(99.9)=17.18ms 
     http_req_sending...............: avg=54.74µs  min=6.15µs  med=11.7µs  max=326.71ms p(90)=30.28µs  p(95)=125.29µs p(99.9)=2.9ms   
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=76.35ms  min=2.66ms  med=74.9ms  max=511.1ms  p(90)=104.04ms p(95)=113.18ms p(99.9)=296.89ms
     http_reqs......................: 39059   646.200928/s
     iteration_duration.............: avg=77.02ms  min=5.57ms  med=75.39ms max=540.32ms p(90)=104.53ms p(95)=113.72ms p(99.9)=315.8ms 
     iterations.....................: 38959   644.546506/s
     success_rate...................: 100.00% ✓ 38959      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8d5c2d20-7877-4c8e-84fc-8124d11b6800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c54052ea-c689-4b57-3b17-8f4e79519c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 100983     ✗ 0    
     data_received..................: 3.0 GB  49 MB/s
     data_sent......................: 39 MB   651 kB/s
     http_req_blocked...............: avg=13.26µs  min=1.49µs  med=3.44µs  max=10.15ms  p(90)=4.94µs   p(95)=7.01µs   p(99.9)=3.24ms  
     http_req_connecting............: avg=7.14µs   min=0s      med=0s      max=10.11ms  p(90)=0s       p(95)=0s       p(99.9)=2.84ms  
     http_req_duration..............: avg=88.5ms   min=2.49ms  med=87.19ms max=528.18ms p(90)=109.14ms p(95)=116.54ms p(99.9)=322.61ms
       { expected_response:true }...: avg=88.5ms   min=2.49ms  med=87.19ms max=528.18ms p(90)=109.14ms p(95)=116.54ms p(99.9)=322.61ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 33761
     http_req_receiving.............: avg=189.44µs min=32.82µs med=69.4µs  max=37.9ms   p(90)=200.04µs p(95)=461.47µs p(99.9)=11.04ms 
     http_req_sending...............: avg=128.49µs min=6.44µs  med=13.11µs max=418.24ms p(90)=115.54µs p(95)=144.68µs p(99.9)=8.01ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=88.18ms  min=2.43ms  med=86.89ms max=527.08ms p(90)=108.82ms p(95)=116.1ms  p(99.9)=305.87ms
     http_reqs......................: 33761   559.346538/s
     iteration_duration.............: avg=89.14ms  min=16.23ms med=87.56ms max=557.07ms p(90)=109.51ms p(95)=116.92ms p(99.9)=347.61ms
     iterations.....................: 33661   557.689755/s
     success_rate...................: 100.00% ✓ 33661      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1fe93f1f-323b-4f82-a0d8-452298821700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/da6483c5-be1d-448c-3d02-767884784600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 66474      ✗ 0    
     data_received..................: 2.0 GB  32 MB/s
     data_sent......................: 26 MB   426 kB/s
     http_req_blocked...............: avg=17.86µs  min=1.89µs  med=3.1µs    max=11.41ms  p(90)=4.53µs   p(95)=5.3µs    p(99.9)=6.74ms  
     http_req_connecting............: avg=14.08µs  min=0s      med=0s       max=11.38ms  p(90)=0s       p(95)=0s       p(99.9)=6.71ms  
     http_req_duration..............: avg=134.64ms min=6.1ms   med=133.58ms max=585.22ms p(90)=165.3ms  p(95)=174.66ms p(99.9)=417.86ms
       { expected_response:true }...: avg=134.64ms min=6.1ms   med=133.58ms max=585.22ms p(90)=165.3ms  p(95)=174.66ms p(99.9)=417.86ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 22258
     http_req_receiving.............: avg=82.67µs  min=37.24µs med=53.95µs  max=78.39ms  p(90)=101.14µs p(95)=131.37µs p(99.9)=1.36ms  
     http_req_sending...............: avg=67.72µs  min=7.69µs  med=11.95µs  max=351.4ms  p(90)=20.07µs  p(95)=35.75µs  p(99.9)=2.16ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=134.49ms min=6.05ms  med=133.47ms max=574.41ms p(90)=165.18ms p(95)=174.57ms p(99.9)=408.51ms
     http_reqs......................: 22258   366.15086/s
     iteration_duration.............: avg=135.51ms min=42.64ms med=133.91ms max=646.64ms p(90)=165.64ms p(95)=175.01ms p(99.9)=433.51ms
     iterations.....................: 22158   364.505829/s
     success_rate...................: 100.00% ✓ 22158      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/67955611-cfe1-412a-c93b-4f2c6bfdd300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/38b88a28-0afe-48db-4ecf-28036c710000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 54171      ✗ 0    
     data_received..................: 1.6 GB  26 MB/s
     data_sent......................: 21 MB   346 kB/s
     http_req_blocked...............: avg=23.12µs  min=1.22µs  med=2.78µs   max=12.89ms  p(90)=4.76µs   p(95)=5.98µs   p(99.9)=8.57ms  
     http_req_connecting............: avg=19.32µs  min=0s      med=0s       max=12.83ms  p(90)=0s       p(95)=0s       p(99.9)=8.55ms  
     http_req_duration..............: avg=165.05ms min=7.56ms  med=154.09ms max=691.88ms p(90)=187.63ms p(95)=324.98ms p(99.9)=503.12ms
       { expected_response:true }...: avg=165.05ms min=7.56ms  med=154.09ms max=691.88ms p(90)=187.63ms p(95)=324.98ms p(99.9)=503.12ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 18157
     http_req_receiving.............: avg=100.77µs min=26.14µs med=49.58µs  max=25.59ms  p(90)=111.95µs p(95)=189.93µs p(99.9)=4.36ms  
     http_req_sending...............: avg=72.91µs  min=5.66µs  med=11.5µs   max=346.83ms p(90)=32.75µs  p(95)=122.8µs  p(99.9)=4.5ms   
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=164.88ms min=7.47ms  med=153.94ms max=691.6ms  p(90)=187.36ms p(95)=324.74ms p(99.9)=502.85ms
     http_reqs......................: 18157   297.30368/s
     iteration_duration.............: avg=166.33ms min=28.93ms med=154.45ms max=722.67ms p(90)=188.08ms p(95)=326.15ms p(99.9)=542.15ms
     iterations.....................: 18057   295.666274/s
     success_rate...................: 100.00% ✓ 18057      ✗ 0    
     vus............................: 43      min=43       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5f698b8d-6e4a-402f-342a-69e5abab6500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dae8bc09-3e53-4bfe-3f0d-3ead5eb2bf00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 53553      ✗ 0    
     data_received..................: 1.6 GB  26 MB/s
     data_sent......................: 21 MB   341 kB/s
     http_req_blocked...............: avg=23.07µs  min=1.19µs  med=2.95µs   max=13.5ms   p(90)=4.93µs   p(95)=6.45µs   p(99.9)=8.03ms  
     http_req_connecting............: avg=18.9µs   min=0s      med=0s       max=13.41ms  p(90)=0s       p(95)=0s       p(99.9)=8ms     
     http_req_duration..............: avg=166.91ms min=7.89ms  med=154.89ms max=763.81ms p(90)=191.98ms p(95)=326.78ms p(99.9)=544.37ms
       { expected_response:true }...: avg=166.91ms min=7.89ms  med=154.89ms max=763.81ms p(90)=191.98ms p(95)=326.78ms p(99.9)=544.37ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 17951
     http_req_receiving.............: avg=124.75µs min=24.24µs med=51.51µs  max=282.01ms p(90)=118.55µs p(95)=280.74µs p(99.9)=6.31ms  
     http_req_sending...............: avg=71.27µs  min=5.61µs  med=11.72µs  max=181.63ms p(90)=34.32µs  p(95)=129.91µs p(99.9)=5.06ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=166.71ms min=7.82ms  med=154.74ms max=763.08ms p(90)=191.7ms  p(95)=326.65ms p(99.9)=538.52ms
     http_reqs......................: 17951   292.954467/s
     iteration_duration.............: avg=168.21ms min=52.12ms med=155.32ms max=827.32ms p(90)=192.38ms p(95)=327.52ms p(99.9)=635.39ms
     iterations.....................: 17851   291.3225/s
     success_rate...................: 100.00% ✓ 17851      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6a1f1b45-38ea-4f27-e774-3b7af6042d00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/569b9473-ac26-4e51-2936-3eb3d96f3200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 20859      ✗ 0   
     data_received..................: 620 MB  10 MB/s
     data_sent......................: 8.2 MB  134 kB/s
     http_req_blocked...............: avg=49.84µs  min=1.38µs  med=3.58µs   max=12.39ms  p(90)=5.5µs    p(95)=6.23µs   p(99.9)=10.58ms 
     http_req_connecting............: avg=45.64µs  min=0s      med=0s       max=12.36ms  p(90)=0s       p(95)=0s       p(99.9)=10.57ms 
     http_req_duration..............: avg=425.96ms min=7.56ms  med=426.09ms max=867.91ms p(90)=483.3ms  p(95)=503.3ms  p(99.9)=815.18ms
       { expected_response:true }...: avg=425.96ms min=7.56ms  med=426.09ms max=867.91ms p(90)=483.3ms  p(95)=503.3ms  p(99.9)=815.18ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7053
     http_req_receiving.............: avg=71.11µs  min=29.45µs med=59.64µs  max=2.81ms   p(90)=105.7µs  p(95)=124.06µs p(99.9)=363.54µs
     http_req_sending...............: avg=62.96µs  min=6.51µs  med=14.35µs  max=159.85ms p(90)=22.48µs  p(95)=27.27µs  p(99.9)=1.64ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=425.83ms min=7.51ms  med=425.97ms max=866.68ms p(90)=483.23ms p(95)=503.04ms p(99.9)=814.12ms
     http_reqs......................: 7053    115.3228/s
     iteration_duration.............: avg=432.71ms min=76.31ms med=426.73ms max=928.25ms p(90)=483.9ms  p(95)=503.89ms p(99.9)=891.86ms
     iterations.....................: 6953    113.687711/s
     success_rate...................: 100.00% ✓ 6953       ✗ 0   
     vus............................: 33      min=33       max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3bac9045-efb9-4473-7df6-078181c22c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/92003c96-c589-494a-860e-2b762ed48b00/public" alt="HTTP Overview" />


  </details>