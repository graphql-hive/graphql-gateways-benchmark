## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2bc0f49d-0a0c-4a7f-a8a7-bad0f12c8f00/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :-------------------------- | :----: | :--------------------: | :--------------------: | :---- |
| hive-router                 |  1709  | 103102 total, 0 failed |  avg: 29ms, p95: 50ms  | ✅    |
| grafbase                    |  1625  | 98205 total, 0 failed  |  avg: 30ms, p95: 52ms  | ✅    |
| hive-gateway-router-runtime |  630   | 38274 total, 0 failed  | avg: 78ms, p95: 105ms  | ✅    |
| cosmo                       |  628   | 38019 total, 0 failed  | avg: 79ms, p95: 118ms  | ✅    |
| apollo-router               |  353   | 21486 total, 0 failed  | avg: 139ms, p95: 183ms | ✅    |
| hive-gateway                |  291   | 17747 total, 0 failed  | avg: 169ms, p95: 316ms | ✅    |
| apollo-gateway              |   91   |  5647 total, 0 failed  | avg: 533ms, p95: 630ms | ✅    |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 309006      ✗ 0     
     data_received..................: 9.0 GB  150 MB/s
     data_sent......................: 120 MB  2.0 MB/s
     http_req_blocked...............: avg=9.05µs   min=1.25µs  med=2.59µs  max=17.42ms  p(90)=3.72µs   p(95)=4.49µs   p(99.9)=108.79µs
     http_req_connecting............: avg=5.84µs   min=0s      med=0s      max=17.28ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=28.87ms  min=2.35ms  med=26.46ms max=508.48ms p(90)=43.5ms   p(95)=49.69ms  p(99.9)=83.38ms 
       { expected_response:true }...: avg=28.87ms  min=2.35ms  med=26.46ms max=508.48ms p(90)=43.5ms   p(95)=49.69ms  p(99.9)=83.38ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 103102
     http_req_receiving.............: avg=114.75µs min=23.54µs med=45.19µs max=126.97ms p(90)=118.97µs p(95)=344.14µs p(99.9)=9.3ms   
     http_req_sending...............: avg=77.05µs  min=5.36µs  med=10.33µs max=44.41ms  p(90)=32.74µs  p(95)=124.48µs p(99.9)=10.23ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=28.68ms  min=2.31ms  med=26.3ms  max=487.09ms p(90)=43.19ms  p(95)=49.37ms  p(99.9)=81.51ms 
     http_reqs......................: 103102  1709.093953/s
     iteration_duration.............: avg=29.11ms  min=5.91ms  med=26.66ms max=575.07ms p(90)=43.7ms   p(95)=49.9ms   p(99.9)=83.99ms 
     iterations.....................: 103002  1707.43628/s
     success_rate...................: 100.00% ✓ 103002      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c3e01258-2b53-45df-4d5d-abf39e5ca000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/93804835-f74b-44c4-ccee-23cb7484b900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 294315      ✗ 0    
     data_received..................: 8.6 GB  143 MB/s
     data_sent......................: 114 MB  1.9 MB/s
     http_req_blocked...............: avg=10.45µs  min=1.33µs  med=3.05µs  max=19.28ms  p(90)=4.24µs   p(95)=5.28µs   p(99.9)=114.5µs
     http_req_connecting............: avg=6.64µs   min=0s      med=0s      max=19.12ms  p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=30.3ms   min=3.06ms  med=27.43ms max=490.14ms p(90)=45.49ms  p(95)=52.11ms  p(99.9)=93.16ms
       { expected_response:true }...: avg=30.3ms   min=3.06ms  med=27.43ms max=490.14ms p(90)=45.49ms  p(95)=52.11ms  p(99.9)=93.16ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 98205
     http_req_receiving.............: avg=143.39µs min=24.98µs med=49.38µs max=258.35ms p(90)=165.37µs p(95)=389.36µs p(99.9)=13.56ms
     http_req_sending...............: avg=102.02µs min=5.44µs  med=11.63µs max=367.57ms p(90)=42.53µs  p(95)=135.63µs p(99.9)=15.65ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=30.05ms  min=3.01ms  med=27.26ms max=468.26ms p(90)=45.03ms  p(95)=51.59ms  p(99.9)=90.56ms
     http_reqs......................: 98205   1625.723332/s
     iteration_duration.............: avg=30.56ms  min=7.05ms  med=27.66ms max=540.59ms p(90)=45.73ms  p(95)=52.34ms  p(99.9)=94.05ms
     iterations.....................: 98105   1624.067894/s
     success_rate...................: 100.00% ✓ 98105       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c7d8f6a8-e79b-4847-eb55-fb0c83ac2700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/06f3d08a-6532-4f22-86df-cce875c3de00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 114522     ✗ 0    
     data_received..................: 3.4 GB  55 MB/s
     data_sent......................: 45 MB   734 kB/s
     http_req_blocked...............: avg=21.08µs  min=1.23µs  med=2.81µs  max=27.92ms  p(90)=4.47µs  p(95)=5.82µs   p(99.9)=8.4ms   
     http_req_connecting............: avg=17.3µs   min=0s      med=0s      max=27.86ms  p(90)=0s      p(95)=0s       p(99.9)=8.37ms  
     http_req_duration..............: avg=78.16ms  min=4.9ms   med=76.37ms max=540.28ms p(90)=96.33ms p(95)=104.54ms p(99.9)=289.55ms
       { expected_response:true }...: avg=78.16ms  min=4.9ms   med=76.37ms max=540.28ms p(90)=96.33ms p(95)=104.54ms p(99.9)=289.55ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 38274
     http_req_receiving.............: avg=113.55µs min=27.52µs med=56.51µs max=173.16ms p(90)=125.7µs p(95)=306.11µs p(99.9)=5.27ms  
     http_req_sending...............: avg=73.15µs  min=5.37µs  med=11.38µs max=207.96ms p(90)=33.46µs p(95)=132.47µs p(99.9)=7.19ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=77.98ms  min=4.85ms  med=76.21ms max=499.13ms p(90)=96.11ms p(95)=104.35ms p(99.9)=279.78ms
     http_reqs......................: 38274   630.998719/s
     iteration_duration.............: avg=78.63ms  min=12.33ms med=76.63ms max=590.2ms  p(90)=96.6ms  p(95)=104.84ms p(99.9)=314.13ms
     iterations.....................: 38174   629.350084/s
     success_rate...................: 100.00% ✓ 38174      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/38a4105d-f9ee-4c52-830a-1c85dd234900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/105a27f3-c9fc-4d6c-0c55-4eb576674c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 113757     ✗ 0    
     data_received..................: 3.3 GB  55 MB/s
     data_sent......................: 44 MB   731 kB/s
     http_req_blocked...............: avg=11.88µs  min=1.28µs  med=2.8µs   max=12.31ms  p(90)=4.15µs   p(95)=5.14µs   p(99.9)=2.98ms  
     http_req_connecting............: avg=8.03µs   min=0s      med=0s      max=12.26ms  p(90)=0s       p(95)=0s       p(99.9)=2.71ms  
     http_req_duration..............: avg=78.65ms  min=3.19ms  med=76.7ms  max=571.92ms p(90)=108.29ms p(95)=118.06ms p(99.9)=331.94ms
       { expected_response:true }...: avg=78.65ms  min=3.19ms  med=76.7ms  max=571.92ms p(90)=108.29ms p(95)=118.06ms p(99.9)=331.94ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 38019
     http_req_receiving.............: avg=220.39µs min=29.82µs med=79.69µs max=93.01ms  p(90)=171.97µs p(95)=420.65µs p(99.9)=24.15ms 
     http_req_sending...............: avg=55.93µs  min=5.75µs  med=11.29µs max=285.67ms p(90)=29.95µs  p(95)=127.22µs p(99.9)=3.77ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=78.37ms  min=3.12ms  med=76.47ms max=549.73ms p(90)=107.97ms p(95)=117.77ms p(99.9)=329.41ms
     http_reqs......................: 38019   628.155559/s
     iteration_duration.............: avg=79.12ms  min=6.84ms  med=76.99ms max=619.98ms p(90)=108.6ms  p(95)=118.41ms p(99.9)=352.9ms 
     iterations.....................: 37919   626.503344/s
     success_rate...................: 100.00% ✓ 37919      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ce1072b2-e7e1-4aed-31b2-7db432f1e500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a121f8be-4be6-4fa8-afce-2f96234df900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 64158      ✗ 0    
     data_received..................: 1.9 GB  31 MB/s
     data_sent......................: 25 MB   411 kB/s
     http_req_blocked...............: avg=16.9µs   min=1.78µs  med=3.16µs   max=11.15ms  p(90)=4.68µs   p(95)=5.56µs   p(99.9)=6.22ms  
     http_req_connecting............: avg=12.79µs  min=0s      med=0s       max=11.11ms  p(90)=0s       p(95)=0s       p(99.9)=6.19ms  
     http_req_duration..............: avg=139.38ms min=6.73ms  med=137.97ms max=666.74ms p(90)=172.53ms p(95)=183.12ms p(99.9)=453.73ms
       { expected_response:true }...: avg=139.38ms min=6.73ms  med=137.97ms max=666.74ms p(90)=172.53ms p(95)=183.12ms p(99.9)=453.73ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 21486
     http_req_receiving.............: avg=91.11µs  min=37.15µs med=56.5µs   max=15.36ms  p(90)=109.1µs  p(95)=152.44µs p(99.9)=2.71ms  
     http_req_sending...............: avg=72.11µs  min=7.43µs  med=11.97µs  max=254.6ms  p(90)=21.4µs   p(95)=41.04µs  p(99.9)=3.64ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=139.22ms min=6.67ms  med=137.83ms max=665.59ms p(90)=172.34ms p(95)=182.94ms p(99.9)=448.94ms
     http_reqs......................: 21486   353.001741/s
     iteration_duration.............: avg=140.36ms min=21.58ms med=138.33ms max=711.05ms p(90)=172.9ms  p(95)=183.44ms p(99.9)=523.05ms
     iterations.....................: 21386   351.358803/s
     success_rate...................: 100.00% ✓ 21386      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/96d1cb93-afad-49d2-21cb-705a78750500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/25274358-cba0-478e-0983-fe4795d54700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 52941      ✗ 0    
     data_received..................: 1.6 GB  26 MB/s
     data_sent......................: 21 MB   339 kB/s
     http_req_blocked...............: avg=44.17µs  min=1.32µs  med=3.03µs   max=19.26ms  p(90)=5.03µs   p(95)=6.52µs   p(99.9)=16ms    
     http_req_connecting............: avg=39.28µs  min=0s      med=0s       max=19.23ms  p(90)=0s       p(95)=0s       p(99.9)=15.94ms 
     http_req_duration..............: avg=168.81ms min=6.56ms  med=155.63ms max=719.98ms p(90)=188.23ms p(95)=316.26ms p(99.9)=513ms   
       { expected_response:true }...: avg=168.81ms min=6.56ms  med=155.63ms max=719.98ms p(90)=188.23ms p(95)=316.26ms p(99.9)=513ms   
     http_req_failed................: 0.00%   ✓ 0          ✗ 17747
     http_req_receiving.............: avg=125.68µs min=26.55µs med=58.89µs  max=257.42ms p(90)=126.92µs p(95)=200.84µs p(99.9)=4.66ms  
     http_req_sending...............: avg=97.18µs  min=5.74µs  med=11.79µs  max=226.94ms p(90)=33.52µs  p(95)=128.45µs p(99.9)=5.83ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=168.59ms min=6.49ms  med=155.51ms max=651.99ms p(90)=187.94ms p(95)=315.89ms p(99.9)=512.93ms
     http_reqs......................: 17747   291.093535/s
     iteration_duration.............: avg=170.16ms min=60.22ms med=156.02ms max=773.6ms  p(90)=188.7ms  p(95)=316.98ms p(99.9)=536.47ms
     iterations.....................: 17647   289.453294/s
     success_rate...................: 100.00% ✓ 17647      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b6c1af69-4716-4def-ca2a-44c0ac3fd900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dea77943-8ea8-451e-664a-26189fca6800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 16641     ✗ 0   
     data_received..................: 496 MB  8.1 MB/s
     data_sent......................: 6.6 MB  107 kB/s
     http_req_blocked...............: avg=93.07µs  min=1.34µs   med=2.89µs   max=17.49ms  p(90)=4.15µs   p(95)=4.95µs   p(99.9)=15.72ms 
     http_req_connecting............: avg=89.55µs  min=0s       med=0s       max=17.45ms  p(90)=0s       p(95)=0s       p(99.9)=15.57ms 
     http_req_duration..............: avg=532.75ms min=9.66ms   med=534.05ms max=981.26ms p(90)=601.78ms p(95)=629.86ms p(99.9)=932.79ms
       { expected_response:true }...: avg=532.75ms min=9.66ms   med=534.05ms max=981.26ms p(90)=601.78ms p(95)=629.86ms p(99.9)=932.79ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5647
     http_req_receiving.............: avg=61.05µs  min=30.29µs  med=51.64µs  max=4.08ms   p(90)=87.2µs   p(95)=101.67µs p(99.9)=790.28µs
     http_req_sending...............: avg=166.06µs min=6.16µs   med=12.03µs  max=255.03ms p(90)=17µs     p(95)=22.1µs   p(99.9)=9.13ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=532.52ms min=9.6ms    med=533.94ms max=979.16ms p(90)=601.4ms  p(95)=629.73ms p(99.9)=929.58ms
     http_reqs......................: 5647    91.844991/s
     iteration_duration.............: avg=542.97ms min=230.23ms med=534.88ms max=1.01s    p(90)=602.72ms p(95)=630.76ms p(99.9)=1s      
     iterations.....................: 5547    90.218552/s
     success_rate...................: 100.00% ✓ 5547      ✗ 0   
     vus............................: 50      min=0       max=50
     vus_max........................: 50      min=50      max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/11f17c0f-2207-49be-4be9-bc64ededdf00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cb5c8488-7f5c-48cb-1b38-78fb77ebd600/public" alt="HTTP Overview" />


  </details>