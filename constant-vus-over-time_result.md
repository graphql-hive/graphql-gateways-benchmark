## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/34aea6cc-2934-4ccb-3a49-d32ba090ac00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :--------------- | :----: | :--------------------: | :--------------------: | :---- |
| hive-router      |  1833  | 110452 total, 0 failed |  avg: 27ms, p95: 49ms  | ✅     |
| grafbase         |  1619  | 97671 total, 0 failed  |  avg: 30ms, p95: 54ms  | ✅     |
| cosmo            |  689   | 41718 total, 0 failed  | avg: 72ms, p95: 105ms  | ✅     |
| apollo-router    |  361   | 21986 total, 0 failed  | avg: 136ms, p95: 178ms | ✅     |
| hive-gateway-bun |  299   | 18384 total, 0 failed  | avg: 163ms, p95: 326ms | ✅     |
| hive-gateway     |  287   | 17589 total, 0 failed  | avg: 170ms, p95: 308ms | ✅     |
| apollo-gateway   |  116   |  7143 total, 0 failed  | avg: 421ms, p95: 496ms | ✅     |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 331056      ✗ 0     
     data_received..................: 9.7 GB  161 MB/s
     data_sent......................: 129 MB  2.1 MB/s
     http_req_blocked...............: avg=5.58µs   min=1.16µs  med=2.56µs  max=10.96ms  p(90)=3.74µs   p(95)=4.41µs   p(99.9)=91.82µs
     http_req_connecting............: avg=2.54µs   min=0s      med=0s      max=10.92ms  p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=26.95ms  min=1.88ms  med=24.21ms max=447.16ms p(90)=42.31ms  p(95)=48.97ms  p(99.9)=91.98ms
       { expected_response:true }...: avg=26.95ms  min=1.88ms  med=24.21ms max=447.16ms p(90)=42.31ms  p(95)=48.97ms  p(99.9)=91.98ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 110452
     http_req_receiving.............: avg=120.11µs min=23.63µs med=44.92µs max=132.28ms p(90)=114.34µs p(95)=348.04µs p(99.9)=13.08ms
     http_req_sending...............: avg=81.69µs  min=5.27µs  med=10.3µs  max=304.81ms p(90)=30.52µs  p(95)=126.78µs p(99.9)=11.79ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=26.75ms  min=1.84ms  med=24.07ms max=434.05ms p(90)=41.94ms  p(95)=48.55ms  p(99.9)=89.36ms
     http_reqs......................: 110452  1833.569583/s
     iteration_duration.............: avg=27.17ms  min=4.39ms  med=24.41ms max=464.14ms p(90)=42.52ms  p(95)=49.16ms  p(99.9)=93.6ms 
     iterations.....................: 110352  1831.909523/s
     success_rate...................: 100.00% ✓ 110352      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b15e857f-7a64-4246-bbd8-00ea5f827d00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ef5fc3f1-a158-42ab-4abe-b29c2370f600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 292713      ✗ 0    
     data_received..................: 8.6 GB  142 MB/s
     data_sent......................: 114 MB  1.9 MB/s
     http_req_blocked...............: avg=6.65µs   min=1.16µs  med=3.17µs  max=10.64ms  p(90)=4.59µs   p(95)=5.9µs    p(99.9)=119.49µs
     http_req_connecting............: avg=2.72µs   min=0s      med=0s      max=10.6ms   p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=30.48ms  min=2.55ms  med=27.23ms max=465.25ms p(90)=46.81ms  p(95)=53.7ms   p(99.9)=99.38ms 
       { expected_response:true }...: avg=30.48ms  min=2.55ms  med=27.23ms max=465.25ms p(90)=46.81ms  p(95)=53.7ms   p(99.9)=99.38ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 97671
     http_req_receiving.............: avg=151.87µs min=27.06µs med=51.2µs  max=58.49ms  p(90)=164.09µs p(95)=408.77µs p(99.9)=16.1ms  
     http_req_sending...............: avg=113.16µs min=5.74µs  med=12.11µs max=432.48ms p(90)=41.5µs   p(95)=142.55µs p(99.9)=14.36ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=30.21ms  min=2.5ms   med=27.05ms max=464.02ms p(90)=46.29ms  p(95)=53.18ms  p(99.9)=95.39ms 
     http_reqs......................: 97671   1619.120078/s
     iteration_duration.............: avg=30.73ms  min=8.13ms  med=27.46ms max=480.11ms p(90)=47.05ms  p(95)=53.95ms  p(99.9)=100.95ms
     iterations.....................: 97571   1617.462349/s
     success_rate...................: 100.00% ✓ 97571       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/68c46fe1-3caf-4962-5709-1f7a52810900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/21c5c661-3d3d-40dc-53d1-60a805004100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 124854     ✗ 0    
     data_received..................: 3.7 GB  61 MB/s
     data_sent......................: 49 MB   802 kB/s
     http_req_blocked...............: avg=12.09µs  min=1.27µs  med=2.79µs  max=13.68ms  p(90)=3.88µs   p(95)=4.56µs   p(99.9)=2.84ms  
     http_req_connecting............: avg=8.58µs   min=0s      med=0s      max=13.62ms  p(90)=0s       p(95)=0s       p(99.9)=2.6ms   
     http_req_duration..............: avg=71.68ms  min=2.88ms  med=70.31ms max=543.77ms p(90)=97.14ms  p(95)=105.37ms p(99.9)=322.12ms
       { expected_response:true }...: avg=71.68ms  min=2.88ms  med=70.31ms max=543.77ms p(90)=97.14ms  p(95)=105.37ms p(99.9)=322.12ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 41718
     http_req_receiving.............: avg=166.35µs min=29.12µs med=68.55µs max=33.5ms   p(90)=150.07µs p(95)=370.21µs p(99.9)=15.62ms 
     http_req_sending...............: avg=56.82µs  min=5.94µs  med=11.4µs  max=282.36ms p(90)=29.7µs   p(95)=117.96µs p(99.9)=2.57ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=71.46ms  min=2.83ms  med=70.11ms max=542.67ms p(90)=96.88ms  p(95)=105.14ms p(99.9)=314.94ms
     http_reqs......................: 41718   689.539726/s
     iteration_duration.............: avg=72.1ms   min=6.86ms  med=70.58ms max=573.57ms p(90)=97.39ms  p(95)=105.63ms p(99.9)=331.61ms
     iterations.....................: 41618   687.886867/s
     success_rate...................: 100.00% ✓ 41618      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/78bf0579-11d1-4fef-dc27-75d0eca81b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/255c1773-f692-44a3-6db5-454204c0b700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 65658      ✗ 0    
     data_received..................: 1.9 GB  32 MB/s
     data_sent......................: 26 MB   420 kB/s
     http_req_blocked...............: avg=34.63µs  min=1.85µs  med=3µs      max=19.17ms  p(90)=4.72µs   p(95)=5.56µs   p(99.9)=14.51ms 
     http_req_connecting............: avg=30.71µs  min=0s      med=0s       max=19.01ms  p(90)=0s       p(95)=0s       p(99.9)=14.47ms 
     http_req_duration..............: avg=136.28ms min=6.08ms  med=135.4ms  max=576.1ms  p(90)=167.47ms p(95)=178.18ms p(99.9)=416.86ms
       { expected_response:true }...: avg=136.28ms min=6.08ms  med=135.4ms  max=576.1ms  p(90)=167.47ms p(95)=178.18ms p(99.9)=416.86ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 21986
     http_req_receiving.............: avg=90.9µs   min=37.67µs med=56.94µs  max=136.72ms p(90)=111.8µs  p(95)=146.68µs p(99.9)=2.05ms  
     http_req_sending...............: avg=51.73µs  min=7.7µs   med=12.1µs   max=315.93ms p(90)=21.63µs  p(95)=40.75µs  p(99.9)=3.04ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=136.13ms min=5.99ms  med=135.28ms max=556.87ms p(90)=167.35ms p(95)=177.92ms p(99.9)=406.83ms
     http_reqs......................: 21986   361.473795/s
     iteration_duration.............: avg=137.2ms  min=23.88ms med=135.77ms max=616.99ms p(90)=167.77ms p(95)=178.53ms p(99.9)=436.83ms
     iterations.....................: 21886   359.829686/s
     success_rate...................: 100.00% ✓ 21886      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f8fc65cc-347f-4616-38c5-d42734566400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7837bf35-4ccc-4f99-e6eb-cb75bbde8900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 54852      ✗ 0    
     data_received..................: 1.6 GB  26 MB/s
     data_sent......................: 21 MB   349 kB/s
     http_req_blocked...............: avg=44.62µs  min=1.14µs  med=2.8µs    max=22.86ms  p(90)=4.54µs   p(95)=5.56µs   p(99.9)=17.87ms 
     http_req_connecting............: avg=40.63µs  min=0s      med=0s       max=22.8ms   p(90)=0s       p(95)=0s       p(99.9)=17.84ms 
     http_req_duration..............: avg=162.99ms min=9.81ms  med=160.69ms max=760.23ms p(90)=232.64ms p(95)=325.94ms p(99.9)=588.97ms
       { expected_response:true }...: avg=162.99ms min=9.81ms  med=160.69ms max=760.23ms p(90)=232.64ms p(95)=325.94ms p(99.9)=588.97ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 18384
     http_req_receiving.............: avg=93.77µs  min=26.43µs med=45.52µs  max=28.65ms  p(90)=102.05µs p(95)=175.84µs p(99.9)=3.71ms  
     http_req_sending...............: avg=77.05µs  min=5.57µs  med=11.29µs  max=226.93ms p(90)=31.98µs  p(95)=114.21µs p(99.9)=8.39ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=162.81ms min=9.75ms  med=160.45ms max=760.04ms p(90)=232.51ms p(95)=325.78ms p(99.9)=562.51ms
     http_reqs......................: 18384   299.943911/s
     iteration_duration.............: avg=164.28ms min=48.69ms med=162.15ms max=812.86ms p(90)=233.28ms p(95)=326.72ms p(99.9)=644.74ms
     iterations.....................: 18284   298.312363/s
     success_rate...................: 100.00% ✓ 18284      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3ed88ff3-dbf6-4dae-facb-c3387beea900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c8076029-310d-4d43-2ac8-83986db0aa00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 52467      ✗ 0    
     data_received..................: 1.5 GB  25 MB/s
     data_sent......................: 21 MB   334 kB/s
     http_req_blocked...............: avg=39.76µs  min=1.26µs  med=2.83µs   max=21.29ms  p(90)=4.87µs   p(95)=6.54µs   p(99.9)=14.57ms 
     http_req_connecting............: avg=35.12µs  min=0s      med=0s       max=21.25ms  p(90)=0s       p(95)=0s       p(99.9)=14.19ms 
     http_req_duration..............: avg=170.33ms min=6.93ms  med=158.78ms max=672.76ms p(90)=201.34ms p(95)=307.65ms p(99.9)=526.96ms
       { expected_response:true }...: avg=170.33ms min=6.93ms  med=158.78ms max=672.76ms p(90)=201.34ms p(95)=307.65ms p(99.9)=526.96ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 17589
     http_req_receiving.............: avg=100.46µs min=26.9µs  med=54.06µs  max=20.51ms  p(90)=118.66µs p(95)=190.51µs p(99.9)=4.07ms  
     http_req_sending...............: avg=51.68µs  min=5.81µs  med=11.59µs  max=104.52ms p(90)=33.21µs  p(95)=122.16µs p(99.9)=3.46ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=170.18ms min=6.88ms  med=158.64ms max=672.3ms  p(90)=201.18ms p(95)=307.49ms p(99.9)=526.82ms
     http_reqs......................: 17589   287.444609/s
     iteration_duration.............: avg=171.68ms min=31.53ms med=159.18ms max=719.63ms p(90)=202.14ms p(95)=308.27ms p(99.9)=558.79ms
     iterations.....................: 17489   285.810379/s
     success_rate...................: 100.00% ✓ 17489      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a40d2454-3d24-49b4-54cc-1dd371bc4b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/20141e57-6819-4ac5-6345-3821b45ce800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 21129      ✗ 0   
     data_received..................: 627 MB  10 MB/s
     data_sent......................: 8.3 MB  136 kB/s
     http_req_blocked...............: avg=48.76µs  min=1.37µs  med=3.44µs   max=12.8ms   p(90)=5.45µs   p(95)=6.23µs   p(99.9)=10.94ms 
     http_req_connecting............: avg=43.99µs  min=0s      med=0s       max=12.76ms  p(90)=0s       p(95)=0s       p(99.9)=10.91ms 
     http_req_duration..............: avg=420.78ms min=7.53ms  med=419.79ms max=855.96ms p(90)=478.15ms p(95)=495.66ms p(99.9)=738.45ms
       { expected_response:true }...: avg=420.78ms min=7.53ms  med=419.79ms max=855.96ms p(90)=478.15ms p(95)=495.66ms p(99.9)=738.45ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7143
     http_req_receiving.............: avg=74.53µs  min=32.09µs med=60.63µs  max=21.55ms  p(90)=107.97µs p(95)=127.16µs p(99.9)=609.65µs
     http_req_sending...............: avg=64.03µs  min=6.51µs  med=13.74µs  max=173.98ms p(90)=22.58µs  p(95)=27.77µs  p(99.9)=1.67ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=420.65ms min=7.48ms  med=419.69ms max=855.09ms p(90)=478.08ms p(95)=495.59ms p(99.9)=737.6ms 
     http_reqs......................: 7143    116.715122/s
     iteration_duration.............: avg=427.35ms min=33.93ms med=420.33ms max=907.75ms p(90)=479.06ms p(95)=496.31ms p(99.9)=888.9ms 
     iterations.....................: 7043    115.081143/s
     success_rate...................: 100.00% ✓ 7043       ✗ 0   
     vus............................: 42      min=42       max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bcc53f1c-9e63-49be-60ee-65492fa7df00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/97fa240b-6986-4c46-5c03-0ac39561b800/public" alt="HTTP Overview" />


  </details>