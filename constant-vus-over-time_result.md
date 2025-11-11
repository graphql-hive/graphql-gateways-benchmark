## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e603c190-94b9-4f65-0b60-7800101ecb00/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :-------------------------- | :----: | :--------------------: | :--------------------: | :---- |
| hive-router                 |  1680  | 101349 total, 0 failed |  avg: 29ms, p95: 50ms  | ✅    |
| grafbase                    |  1473  | 88984 total, 0 failed  |  avg: 33ms, p95: 58ms  | ✅    |
| cosmo                       |  663   | 40075 total, 0 failed  | avg: 75ms, p95: 109ms  | ✅    |
| hive-gateway-router-runtime |  598   | 36376 total, 0 failed  | avg: 82ms, p95: 112ms  | ✅    |
| apollo-router               |  379   | 23040 total, 0 failed  | avg: 130ms, p95: 171ms | ✅    |
| hive-gateway                |  274   | 16810 total, 0 failed  | avg: 178ms, p95: 356ms | ✅    |
| apollo-gateway              |  119   |  7326 total, 0 failed  | avg: 410ms, p95: 483ms | ✅    |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 303747      ✗ 0     
     data_received..................: 8.9 GB  147 MB/s
     data_sent......................: 118 MB  2.0 MB/s
     http_req_blocked...............: avg=5.83µs   min=1.21µs  med=2.53µs  max=11.15ms  p(90)=3.63µs  p(95)=4.27µs   p(99.9)=98.25µs
     http_req_connecting............: avg=2.79µs   min=0s      med=0s      max=11.11ms  p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=29.34ms  min=2.23ms  med=27.08ms max=553.84ms p(90)=44.41ms p(95)=50.36ms  p(99.9)=97.04ms
       { expected_response:true }...: avg=29.34ms  min=2.23ms  med=27.08ms max=553.84ms p(90)=44.41ms p(95)=50.36ms  p(99.9)=97.04ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 101349
     http_req_receiving.............: avg=117.96µs min=24.31µs med=41.99µs max=158.82ms p(90)=108.1µs p(95)=339.89µs p(99.9)=12.12ms
     http_req_sending...............: avg=94.21µs  min=5.01µs  med=10.01µs max=251.52ms p(90)=32.28µs p(95)=124.73µs p(99.9)=14.01ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=29.13ms  min=2.18ms  med=26.91ms max=535.14ms p(90)=44.05ms p(95)=49.94ms  p(99.9)=91.89ms
     http_reqs......................: 101349  1680.443322/s
     iteration_duration.............: avg=29.62ms  min=3.24ms  med=27.33ms max=603.75ms p(90)=44.67ms p(95)=50.61ms  p(99.9)=99.78ms
     iterations.....................: 101249  1678.785246/s
     success_rate...................: 100.00% ✓ 101249      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/962fadaa-5972-4f65-d109-511647646a00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e49b7f11-62be-4eb5-a220-05b2906f4a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 266652      ✗ 0    
     data_received..................: 7.8 GB  130 MB/s
     data_sent......................: 104 MB  1.7 MB/s
     http_req_blocked...............: avg=10.31µs  min=1.27µs  med=3.08µs  max=19.23ms  p(90)=4.39µs   p(95)=5.3µs    p(99.9)=124.07µs
     http_req_connecting............: avg=6.42µs   min=0s      med=0s      max=19.21ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=33.38ms  min=3.06ms  med=30.16ms max=569.18ms p(90)=51.04ms  p(95)=57.79ms  p(99.9)=102.54ms
       { expected_response:true }...: avg=33.38ms  min=3.06ms  med=30.16ms max=569.18ms p(90)=51.04ms  p(95)=57.79ms  p(99.9)=102.54ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 88984
     http_req_receiving.............: avg=162.89µs min=26.13µs med=49.93µs max=317.99ms p(90)=164.53µs p(95)=406.1µs  p(99.9)=16.76ms 
     http_req_sending...............: avg=126.21µs min=5.47µs  med=11.85µs max=422.01ms p(90)=51.88µs  p(95)=144.57µs p(99.9)=17.32ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=33.1ms   min=3ms     med=29.95ms max=551.47ms p(90)=50.56ms  p(95)=57.17ms  p(99.9)=99.83ms 
     http_reqs......................: 88984   1473.546002/s
     iteration_duration.............: avg=33.74ms  min=7.76ms  med=30.46ms max=646.63ms p(90)=51.36ms  p(95)=58.1ms   p(99.9)=103.43ms
     iterations.....................: 88884   1471.890034/s
     success_rate...................: 100.00% ✓ 88884       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cae68aa9-a51b-4fbb-79ca-a4921468de00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/58998971-ba4e-489e-cc33-8fdbc2543c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 119925     ✗ 0    
     data_received..................: 3.5 GB  58 MB/s
     data_sent......................: 47 MB   771 kB/s
     http_req_blocked...............: avg=10.95µs min=1.3µs   med=2.89µs  max=11.3ms   p(90)=4.11µs   p(95)=5.05µs   p(99.9)=2.55ms  
     http_req_connecting............: avg=7.36µs  min=0s      med=0s      max=11.24ms  p(90)=0s       p(95)=0s       p(99.9)=2.51ms  
     http_req_duration..............: avg=74.56ms min=2.88ms  med=73.62ms max=516.4ms  p(90)=100.39ms p(95)=108.66ms p(99.9)=295.73ms
       { expected_response:true }...: avg=74.56ms min=2.88ms  med=73.62ms max=516.4ms  p(90)=100.39ms p(95)=108.66ms p(99.9)=295.73ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 40075
     http_req_receiving.............: avg=177.8µs min=29.43µs med=78.18µs max=35.95ms  p(90)=157µs    p(95)=401.05µs p(99.9)=17.5ms  
     http_req_sending...............: avg=55.66µs min=5.46µs  med=11.19µs max=290.09ms p(90)=29.73µs  p(95)=125.38µs p(99.9)=3.51ms  
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=74.33ms min=2.78ms  med=73.42ms max=515.34ms p(90)=100.18ms p(95)=108.37ms p(99.9)=294.48ms
     http_reqs......................: 40075   663.128346/s
     iteration_duration.............: avg=75.06ms min=5.2ms   med=73.95ms max=549.91ms p(90)=100.7ms  p(95)=108.97ms p(99.9)=317.55ms
     iterations.....................: 39975   661.473628/s
     success_rate...................: 100.00% ✓ 39975      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/85f32af9-4f46-4fd5-d89f-67b819c2cc00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/42e19b2a-94c0-430f-d056-c7f12356f600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 108828     ✗ 0    
     data_received..................: 3.2 GB  53 MB/s
     data_sent......................: 42 MB   696 kB/s
     http_req_blocked...............: avg=13.21µs  min=1.28µs  med=3.1µs   max=12.19ms  p(90)=4.82µs   p(95)=6.13µs   p(99.9)=3.64ms  
     http_req_connecting............: avg=9.04µs   min=0s      med=0s      max=12.15ms  p(90)=0s       p(95)=0s       p(99.9)=3.61ms  
     http_req_duration..............: avg=82.12ms  min=5.37ms  med=79.28ms max=621.79ms p(90)=102.16ms p(95)=112.3ms  p(99.9)=368.74ms
       { expected_response:true }...: avg=82.12ms  min=5.37ms  med=79.28ms max=621.79ms p(90)=102.16ms p(95)=112.3ms  p(99.9)=368.74ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 36376
     http_req_receiving.............: avg=111.28µs min=28.07µs med=55.49µs max=127.4ms  p(90)=114.59µs p(95)=284.07µs p(99.9)=6.09ms  
     http_req_sending...............: avg=93.79µs  min=5.8µs   med=11.87µs max=454.19ms p(90)=33.48µs  p(95)=137.17µs p(99.9)=6.27ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=81.92ms  min=5.31ms  med=79.1ms  max=611.38ms p(90)=101.91ms p(95)=111.94ms p(99.9)=355.98ms
     http_reqs......................: 36376   598.764358/s
     iteration_duration.............: avg=82.71ms  min=15.56ms med=79.61ms max=657.96ms p(90)=102.49ms p(95)=112.66ms p(99.9)=396.64ms
     iterations.....................: 36276   597.118315/s
     success_rate...................: 100.00% ✓ 36276      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7c691f9d-74ed-4d86-b491-215b0eed3400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/91e59709-d19d-40a8-b72f-dbafeb7a6800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 68820      ✗ 0    
     data_received..................: 2.0 GB  33 MB/s
     data_sent......................: 27 MB   441 kB/s
     http_req_blocked...............: avg=29.99µs  min=1.83µs  med=2.86µs   max=16.87ms  p(90)=4.24µs   p(95)=5.07µs   p(99.9)=12.8ms  
     http_req_connecting............: avg=26.25µs  min=0s      med=0s       max=16.61ms  p(90)=0s       p(95)=0s       p(99.9)=12.76ms 
     http_req_duration..............: avg=129.94ms min=5.93ms  med=128.77ms max=569.86ms p(90)=159.88ms p(95)=170.61ms p(99.9)=398.16ms
       { expected_response:true }...: avg=129.94ms min=5.93ms  med=128.77ms max=569.86ms p(90)=159.88ms p(95)=170.61ms p(99.9)=398.16ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 23040
     http_req_receiving.............: avg=80.37µs  min=25.97µs med=53µs     max=79.55ms  p(90)=101.91µs p(95)=126.69µs p(99.9)=1.5ms   
     http_req_sending...............: avg=74.23µs  min=7.39µs  med=11.63µs  max=220.17ms p(90)=20.29µs  p(95)=37.54µs  p(99.9)=3.93ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=129.78ms min=5.87ms  med=128.66ms max=536.5ms  p(90)=159.73ms p(95)=170.48ms p(99.9)=397.83ms
     http_reqs......................: 23040   379.36768/s
     iteration_duration.............: avg=130.82ms min=43.08ms med=129.2ms  max=614.33ms p(90)=160.21ms p(95)=170.98ms p(99.9)=438.59ms
     iterations.....................: 22940   377.721119/s
     success_rate...................: 100.00% ✓ 22940      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3499231f-a5ad-4c82-40f1-0231e944db00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/429dc4da-e266-4e33-894f-c83ef688ab00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 50130      ✗ 0    
     data_received..................: 1.5 GB  24 MB/s
     data_sent......................: 20 MB   320 kB/s
     http_req_blocked...............: avg=22.62µs  min=1.34µs  med=2.92µs   max=11.69ms  p(90)=5.2µs    p(95)=6.74µs   p(99.9)=7.94ms  
     http_req_connecting............: avg=18.46µs  min=0s      med=0s       max=11.64ms  p(90)=0s       p(95)=0s       p(99.9)=7.9ms   
     http_req_duration..............: avg=178.1ms  min=7.54ms  med=163.21ms max=842.83ms p(90)=205.88ms p(95)=356.26ms p(99.9)=613.1ms 
       { expected_response:true }...: avg=178.1ms  min=7.54ms  med=163.21ms max=842.83ms p(90)=205.88ms p(95)=356.26ms p(99.9)=613.1ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 16810
     http_req_receiving.............: avg=121.25µs min=28.49µs med=59.3µs   max=110.41ms p(90)=128.49µs p(95)=280.47µs p(99.9)=5.61ms  
     http_req_sending...............: avg=120.75µs min=6.09µs  med=11.92µs  max=276.13ms p(90)=34.43µs  p(95)=141.82µs p(99.9)=8.72ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=177.86ms min=7.43ms  med=163.06ms max=811.55ms p(90)=205.61ms p(95)=353.92ms p(99.9)=611.68ms
     http_reqs......................: 16810   274.794236/s
     iteration_duration.............: avg=179.61ms min=40.01ms med=163.62ms max=862.68ms p(90)=206.6ms  p(95)=360.46ms p(99.9)=682.16ms
     iterations.....................: 16710   273.159529/s
     success_rate...................: 100.00% ✓ 16710      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/57dc0970-87ba-43b8-fae6-83ad5fafdd00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3d61dd89-da19-4afa-65f3-ff487ec2d800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 21678      ✗ 0   
     data_received..................: 643 MB  11 MB/s
     data_sent......................: 8.5 MB  139 kB/s
     http_req_blocked...............: avg=98.17µs  min=1.42µs  med=2.99µs   max=25.02ms  p(90)=4.37µs   p(95)=5.13µs   p(99.9)=21.19ms 
     http_req_connecting............: avg=94.59µs  min=0s      med=0s       max=24.98ms  p(90)=0s       p(95)=0s       p(99.9)=21.12ms 
     http_req_duration..............: avg=409.92ms min=7.44ms  med=409.26ms max=829.34ms p(90)=464.51ms p(95)=482.69ms p(99.9)=755.79ms
       { expected_response:true }...: avg=409.92ms min=7.44ms  med=409.26ms max=829.34ms p(90)=464.51ms p(95)=482.69ms p(99.9)=755.79ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7326
     http_req_receiving.............: avg=61.06µs  min=31.32µs med=52.27µs  max=1.05ms   p(90)=91.04µs  p(95)=104.05µs p(99.9)=320.71µs
     http_req_sending...............: avg=112.19µs min=6.2µs   med=12.14µs  max=147.28ms p(90)=18.07µs  p(95)=22.2µs   p(99.9)=8.15ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=409.75ms min=7.38ms  med=409.13ms max=821.43ms p(90)=464.3ms  p(95)=482.49ms p(99.9)=755.35ms
     http_reqs......................: 7326    119.85592/s
     iteration_duration.............: avg=416.11ms min=88.73ms med=409.92ms max=880.31ms p(90)=465.11ms p(95)=483.26ms p(99.9)=857.63ms
     iterations.....................: 7226    118.219885/s
     success_rate...................: 100.00% ✓ 7226       ✗ 0   
     vus............................: 29      min=29       max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f2df754d-8ff3-40ba-548a-9e8e250ba100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9f0681b9-60a7-44af-dec1-fba0f0b31f00/public" alt="HTTP Overview" />


  </details>