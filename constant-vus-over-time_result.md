## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/95a54454-c34e-4d93-d91a-98b62d2df700/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |       Requests        |        Duration        | Notes                                                                      |
| :-------------------------- | :----: | :-------------------: | :--------------------: | :------------------------------------------------------------------------- |
| hive-router                 |  1603  | 96711 total, 0 failed |  avg: 31ms, p95: 53ms  | ✅                                                                         |
| grafbase                    |  1530  | 92455 total, 0 failed |  avg: 32ms, p95: 57ms  | ✅                                                                         |
| cosmo                       |  639   | 38649 total, 0 failed | avg: 77ms, p95: 114ms  | ✅                                                                         |
| hive-gateway-router-runtime |  610   | 37046 total, 0 failed | avg: 81ms, p95: 107ms  | ❌ 4 unexpected GraphQL errors                                             |
| apollo-router               |  353   | 21515 total, 0 failed | avg: 139ms, p95: 184ms | ❌ 21415 unexpected GraphQL errors, non-compatible response structure (50) |
| hive-gateway                |  244   | 14950 total, 0 failed | avg: 200ms, p95: 456ms | ❌ 1121 unexpected GraphQL errors                                          |
| apollo-gateway              |  119   | 7306 total, 0 failed  | avg: 412ms, p95: 485ms | ❌ 7206 unexpected GraphQL errors, non-compatible response structure (50)  |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 289833      ✗ 0    
     data_received..................: 8.5 GB  140 MB/s
     data_sent......................: 113 MB  1.9 MB/s
     http_req_blocked...............: avg=10.02µs  min=1.22µs  med=2.68µs  max=21.79ms  p(90)=3.93µs   p(95)=4.73µs   p(99.9)=106.54µs
     http_req_connecting............: avg=6.77µs   min=0s      med=0s      max=21.76ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=30.75ms  min=2.2ms   med=28.38ms max=563.1ms  p(90)=46.45ms  p(95)=52.85ms  p(99.9)=93.79ms 
       { expected_response:true }...: avg=30.75ms  min=2.2ms   med=28.38ms max=563.1ms  p(90)=46.45ms  p(95)=52.85ms  p(99.9)=93.79ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 96711
     http_req_receiving.............: avg=123.21µs min=24.94µs med=45.02µs max=86.73ms  p(90)=114.69µs p(95)=355.74µs p(99.9)=12.76ms 
     http_req_sending...............: avg=104.57µs min=5.17µs  med=10.46µs max=265.19ms p(90)=33.12µs  p(95)=131.74µs p(99.9)=14.52ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=30.52ms  min=2.15ms  med=28.19ms max=554.91ms p(90)=46.1ms   p(95)=52.44ms  p(99.9)=91.31ms 
     http_reqs......................: 96711   1603.317542/s
     iteration_duration.............: avg=31.04ms  min=4.93ms  med=28.63ms max=606.37ms p(90)=46.71ms  p(95)=53.11ms  p(99.9)=95.83ms 
     iterations.....................: 96611   1601.659698/s
     success_rate...................: 100.00% ✓ 96611       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/74351a63-ae37-4555-441c-69b10271b100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/545d2953-f512-46ae-29d0-afa7eb21d100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 277065      ✗ 0    
     data_received..................: 8.1 GB  134 MB/s
     data_sent......................: 108 MB  1.8 MB/s
     http_req_blocked...............: avg=7.52µs   min=1.26µs med=3.16µs  max=12.8ms   p(90)=4.49µs   p(95)=5.46µs   p(99.9)=124.84µs
     http_req_connecting............: avg=3.61µs   min=0s     med=0s      max=12.77ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=32.14ms  min=2.89ms med=28.72ms max=510.42ms p(90)=49.86ms  p(95)=56.74ms  p(99.9)=93.14ms 
       { expected_response:true }...: avg=32.14ms  min=2.89ms med=28.72ms max=510.42ms p(90)=49.86ms  p(95)=56.74ms  p(99.9)=93.14ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 92455
     http_req_receiving.............: avg=169.16µs min=25.9µs med=50.78µs max=249.7ms  p(90)=165.52µs p(95)=415.32µs p(99.9)=18.67ms 
     http_req_sending...............: avg=130.18µs min=5.77µs med=12.02µs max=376.63ms p(90)=44.22µs  p(95)=146.35µs p(99.9)=18.34ms 
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=31.84ms  min=2.8ms  med=28.51ms max=481.19ms p(90)=49.33ms  p(95)=56.14ms  p(99.9)=88.42ms 
     http_reqs......................: 92455   1530.899453/s
     iteration_duration.............: avg=32.47ms  min=7.34ms med=29.01ms max=558.85ms p(90)=50.17ms  p(95)=57.04ms  p(99.9)=95.34ms 
     iterations.....................: 92355   1529.243621/s
     success_rate...................: 100.00% ✓ 92355       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/aa1b24b2-cd1e-40f9-e364-2f18321e7000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ab6320a3-6ac2-46a5-a9ff-5ee78678f500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 115647     ✗ 0    
     data_received..................: 3.4 GB  56 MB/s
     data_sent......................: 45 MB   743 kB/s
     http_req_blocked...............: avg=21.42µs  min=1.44µs  med=3µs     max=18.89ms  p(90)=4.51µs   p(95)=5.58µs   p(99.9)=10.12ms 
     http_req_connecting............: avg=17.54µs  min=0s      med=0s      max=18.85ms  p(90)=0s       p(95)=0s       p(99.9)=10.05ms 
     http_req_duration..............: avg=77.35ms  min=2.92ms  med=76.11ms max=523.47ms p(90)=105.39ms p(95)=114.17ms p(99.9)=305.74ms
       { expected_response:true }...: avg=77.35ms  min=2.92ms  med=76.11ms max=523.47ms p(90)=105.39ms p(95)=114.17ms p(99.9)=305.74ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 38649
     http_req_receiving.............: avg=190.08µs min=33.96µs med=77.31µs max=201.54ms p(90)=159.83µs p(95)=413.99µs p(99.9)=16.9ms  
     http_req_sending...............: avg=74.33µs  min=6.45µs  med=11.51µs max=309.31ms p(90)=31.78µs  p(95)=130.33µs p(99.9)=3.55ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=77.09ms  min=2.83ms  med=75.87ms max=501.66ms p(90)=105.05ms p(95)=113.91ms p(99.9)=301.64ms
     http_reqs......................: 38649   639.142072/s
     iteration_duration.............: avg=77.87ms  min=6.59ms  med=76.47ms max=558.77ms p(90)=105.7ms  p(95)=114.51ms p(99.9)=321.4ms 
     iterations.....................: 38549   637.488363/s
     success_rate...................: 100.00% ✓ 38549      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/64fc9c45-458d-448b-0479-d2e698ea4100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1e6c6e2f-442b-469f-546b-bcb038ac1b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 36942 / ✗ 4
     ✓ valid response structure

     checks.........................: 99.99% ✓ 110834     ✗ 4    
     data_received..................: 3.2 GB 54 MB/s
     data_sent......................: 43 MB  711 kB/s
     http_req_blocked...............: avg=12.25µs min=1.25µs  med=2.83µs  max=12.07ms  p(90)=4.32µs   p(95)=5.45µs   p(99.9)=3.13ms  
     http_req_connecting............: avg=8.47µs  min=0s      med=0s      max=12.04ms  p(90)=0s       p(95)=0s       p(99.9)=3.1ms   
     http_req_duration..............: avg=80.72ms min=5.04ms  med=78.62ms max=493.61ms p(90)=98.46ms  p(95)=106.68ms p(99.9)=305.31ms
       { expected_response:true }...: avg=80.72ms min=5.04ms  med=78.62ms max=493.61ms p(90)=98.46ms  p(95)=106.68ms p(99.9)=305.31ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 37046
     http_req_receiving.............: avg=98.24µs min=27.1µs  med=51.14µs max=19.99ms  p(90)=110.53µs p(95)=259.84µs p(99.9)=4.41ms  
     http_req_sending...............: avg=80.23µs min=5.44µs  med=11.31µs max=275.76ms p(90)=32.06µs  p(95)=131.29µs p(99.9)=5.22ms  
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=80.54ms min=4.98ms  med=78.47ms max=492.54ms p(90)=98.27ms  p(95)=106.45ms p(99.9)=302.68ms
     http_reqs......................: 37046  610.87979/s
     iteration_duration.............: avg=81.23ms min=21.74ms med=78.94ms max=559.86ms p(90)=98.76ms  p(95)=107.08ms p(99.9)=323.69ms
     iterations.....................: 36946  609.230814/s
     success_rate...................: 99.98% ✓ 36942      ✗ 4    
     vus............................: 50     min=50       max=50 
     vus_max........................: 50     min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/db83b24b-2391-4dc1-3fa2-f0860dd85800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/081c8396-2080-4c66-2af1-b7586262b900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  0% — ✓ 0 / ✗ 21415
     ✗ valid response structure
      ↳  99% — ✓ 21365 / ✗ 50

     checks.........................: 66.58% ✓ 42780      ✗ 21465
     data_received..................: 2.2 GB 36 MB/s
     data_sent......................: 25 MB  412 kB/s
     http_req_blocked...............: avg=14.24µs  min=1.84µs  med=3.13µs   max=9.11ms   p(90)=4.56µs   p(95)=5.46µs   p(99.9)=4.92ms  
     http_req_connecting............: avg=10.23µs  min=0s      med=0s       max=9.07ms   p(90)=0s       p(95)=0s       p(99.9)=4.9ms   
     http_req_duration..............: avg=139.25ms min=6.12ms  med=139.02ms max=270.08ms p(90)=173.09ms p(95)=183.82ms p(99.9)=237.66ms
       { expected_response:true }...: avg=139.25ms min=6.12ms  med=139.02ms max=270.08ms p(90)=173.09ms p(95)=183.82ms p(99.9)=237.66ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 21515
     http_req_receiving.............: avg=88.34µs  min=37.79µs med=57.73µs  max=45.6ms   p(90)=112.6µs  p(95)=146.74µs p(99.9)=1.84ms  
     http_req_sending...............: avg=37.64µs  min=7.47µs  med=12.15µs  max=37.91ms  p(90)=20.88µs  p(95)=50.98µs  p(99.9)=1.95ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=139.13ms min=6.05ms  med=138.93ms max=270.01ms p(90)=172.94ms p(95)=183.71ms p(99.9)=236.32ms
     http_reqs......................: 21515  353.919661/s
     iteration_duration.............: avg=140.19ms min=48.89ms med=139.48ms max=270.37ms p(90)=173.46ms p(95)=184.24ms p(99.9)=240.07ms
     iterations.....................: 21415  352.274671/s
     success_rate...................: 0.00%  ✓ 0          ✗ 21415
     vus............................: 50     min=50       max=50 
     vus_max........................: 50     min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bded6855-c8d4-438d-b774-d64c8d36f200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a35f6d49-cf0c-44ed-c656-07fe4d894d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  92% — ✓ 13729 / ✗ 1121
     ✓ valid response structure

     checks.........................: 97.48% ✓ 43429      ✗ 1121 
     data_received..................: 1.3 GB 22 MB/s
     data_sent......................: 17 MB  284 kB/s
     http_req_blocked...............: avg=27.17µs  min=1.25µs  med=2.83µs   max=13.27ms  p(90)=4.79µs   p(95)=6.3µs    p(99.9)=8.97ms  
     http_req_connecting............: avg=22.71µs  min=0s      med=0s       max=13.24ms  p(90)=0s       p(95)=0s       p(99.9)=8.91ms  
     http_req_duration..............: avg=200.4ms  min=6.57ms  med=155.83ms max=1.06s    p(90)=379.18ms p(95)=456.44ms p(99.9)=969.57ms
       { expected_response:true }...: avg=200.4ms  min=6.57ms  med=155.83ms max=1.06s    p(90)=379.18ms p(95)=456.44ms p(99.9)=969.57ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 14950
     http_req_receiving.............: avg=101.61µs min=27.42µs med=57.87µs  max=14.38ms  p(90)=120.29µs p(95)=195.2µs  p(99.9)=5.02ms  
     http_req_sending...............: avg=107.59µs min=5.51µs  med=11.48µs  max=368.55ms p(90)=33.33µs  p(95)=128.61µs p(99.9)=4.07ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=200.19ms min=6.5ms   med=155.67ms max=1.06s    p(90)=378.9ms  p(95)=456.14ms p(99.9)=969.46ms
     http_reqs......................: 14950  244.365968/s
     iteration_duration.............: avg=202.19ms min=25.86ms med=156.36ms max=1.06s    p(90)=380.95ms p(95)=457.4ms  p(99.9)=969.88ms
     iterations.....................: 14850  242.731413/s
     success_rate...................: 92.45% ✓ 13729      ✗ 1121 
     vus............................: 50     min=0        max=50 
     vus_max........................: 50     min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f8b6c2c9-cb9b-40bf-5995-ae1765298c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/61d518ee-a5b7-443f-fae7-6d36c593d200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  0% — ✓ 0 / ✗ 7206
     ✗ valid response structure
      ↳  99% — ✓ 7156 / ✗ 50

     checks.........................: 66.43% ✓ 14362      ✗ 7256
     data_received..................: 642 MB 11 MB/s
     data_sent......................: 8.5 MB 139 kB/s
     http_req_blocked...............: avg=49.75µs  min=1.42µs   med=3.11µs   max=13.02ms  p(90)=4.8µs    p(95)=5.54µs   p(99.9)=11.19ms 
     http_req_connecting............: avg=46.03µs  min=0s       med=0s       max=12.99ms  p(90)=0s       p(95)=0s       p(99.9)=11.17ms 
     http_req_duration..............: avg=411.78ms min=7.23ms   med=412.29ms max=636.74ms p(90)=466.67ms p(95)=484.78ms p(99.9)=570.47ms
       { expected_response:true }...: avg=411.78ms min=7.23ms   med=412.29ms max=636.74ms p(90)=466.67ms p(95)=484.78ms p(99.9)=570.47ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 7306
     http_req_receiving.............: avg=64.22µs  min=31.01µs  med=53.71µs  max=4.95ms   p(90)=93.51µs  p(95)=107.18µs p(99.9)=646.33µs
     http_req_sending...............: avg=22.74µs  min=6.38µs   med=12.29µs  max=4.03ms   p(90)=19.52µs  p(95)=23.59µs  p(99.9)=1.22ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=411.69ms min=7.15ms   med=412.2ms  max=636.66ms p(90)=466.61ms p(95)=484.66ms p(99.9)=570.38ms
     http_reqs......................: 7306   119.454133/s
     iteration_duration.............: avg=417.67ms min=265.54ms med=412.93ms max=636.92ms p(90)=467.49ms p(95)=485.41ms p(99.9)=571.35ms
     iterations.....................: 7206   117.819119/s
     success_rate...................: 0.00%  ✓ 0          ✗ 7206
     vus............................: 43     min=43       max=50
     vus_max........................: 50     min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1e47030f-dcbd-43d8-1006-50d8f40b0000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3da2a5df-271d-4c1b-a2f4-ba7275015800/public" alt="HTTP Overview" />


  </details>