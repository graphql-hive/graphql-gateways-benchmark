## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/04b7a2c3-d46b-4694-29d0-54d481db2700/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :-------------------------- | :----: | :--------------------: | :--------------------: | :---- |
| hotchocolate                |  1754  | 105511 total, 0 failed |  avg: 28ms, p95: 52ms  | ✅    |
| hive-router                 |  1660  | 100115 total, 0 failed |  avg: 30ms, p95: 55ms  | ✅    |
| cosmo                       |  1626  | 98345 total, 0 failed  |  avg: 30ms, p95: 54ms  | ✅    |
| grafbase                    |  1466  | 88498 total, 0 failed  |  avg: 34ms, p95: 60ms  | ✅    |
| hive-gateway-router-runtime |  1353  | 82291 total, 0 failed  |  avg: 36ms, p95: 63ms  | ✅    |
| hive-gateway                |  1301  | 79622 total, 0 failed  |  avg: 37ms, p95: 65ms  | ✅    |
| apollo-router               |  372   | 22651 total, 0 failed  | avg: 132ms, p95: 176ms | ✅    |
| apollo-router-v3            |  312   | 18995 total, 0 failed  | avg: 158ms, p95: 205ms | ✅    |
| apollo-gateway              |  120   |  7366 total, 0 failed  | avg: 409ms, p95: 484ms | ✅    |



<details>
  <summary>Summary for: hotchocolate</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 316233      ✗ 0     
     data_received..................: 9.3 GB  154 MB/s
     data_sent......................: 123 MB  2.0 MB/s
     http_req_blocked...............: avg=3.75µs   min=401ns   med=1.74µs  max=5.28ms   p(90)=3.24µs  p(95)=4.25µs   p(99.9)=93.08µs
     http_req_connecting............: avg=1.21µs   min=0s      med=0s      max=5.24ms   p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=28.25ms  min=1.04ms  med=25.44ms max=384.36ms p(90)=44.92ms p(95)=51.61ms  p(99.9)=89.52ms
       { expected_response:true }...: avg=28.25ms  min=1.04ms  med=25.44ms max=384.36ms p(90)=44.92ms p(95)=51.61ms  p(99.9)=89.52ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 105511
     http_req_receiving.............: avg=131.54µs min=13.26µs med=30.26µs max=107.96ms p(90)=104µs   p(95)=222.47µs p(99.9)=19.76ms
     http_req_sending...............: avg=77.45µs  min=2.32µs  med=6.46µs  max=314.09ms p(90)=18.98µs p(95)=89.02µs  p(99.9)=14.63ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=28.04ms  min=1.01ms  med=25.27ms max=383.7ms  p(90)=44.62ms p(95)=51.23ms  p(99.9)=87.39ms
     http_reqs......................: 105511  1754.594629/s
     iteration_duration.............: avg=28.45ms  min=2.26ms  med=25.61ms max=401.31ms p(90)=45.09ms p(95)=51.77ms  p(99.9)=90.37ms
     iterations.....................: 105411  1752.93168/s
     success_rate...................: 100.00% ✓ 105411      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f07d5ec7-7a51-4293-e8d2-489c919a0b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/563c9a36-8cdb-427e-9fa3-d82d0ae43000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 300045      ✗ 0     
     data_received..................: 8.8 GB  146 MB/s
     data_sent......................: 116 MB  1.9 MB/s
     http_req_blocked...............: avg=5.77µs   min=1.17µs   med=2.69µs  max=10.55ms  p(90)=4.18µs   p(95)=5.37µs   p(99.9)=46.12µs
     http_req_connecting............: avg=2.67µs   min=0s       med=0s      max=10.52ms  p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=29.72ms  min=993.38µs med=28.06ms max=467.1ms  p(90)=48.84ms  p(95)=54.84ms  p(99.9)=90.6ms 
       { expected_response:true }...: avg=29.72ms  min=993.38µs med=28.06ms max=467.1ms  p(90)=48.84ms  p(95)=54.84ms  p(99.9)=90.6ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 100115
     http_req_receiving.............: avg=228.56µs min=26.18µs  med=59.45µs max=58.82ms  p(90)=128.18µs p(95)=279.7µs  p(99.9)=29.45ms
     http_req_sending...............: avg=152.42µs min=5.27µs   med=10.86µs max=421.45ms p(90)=29.42µs  p(95)=110.55µs p(99.9)=26.62ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=29.34ms  min=932.5µs  med=27.77ms max=430.59ms p(90)=48.15ms  p(95)=53.94ms  p(99.9)=82.28ms
     http_reqs......................: 100115  1660.988546/s
     iteration_duration.............: avg=29.99ms  min=1.21ms   med=28.3ms  max=492.42ms p(90)=49.07ms  p(95)=55.07ms  p(99.9)=92.5ms 
     iterations.....................: 100015  1659.329465/s
     success_rate...................: 100.00% ✓ 100015      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9f26d604-9982-429d-a40b-9ea85631a800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9bbd0aac-d89d-4cb4-ab05-74ab4170ff00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 294735      ✗ 0    
     data_received..................: 8.6 GB  143 MB/s
     data_sent......................: 114 MB  1.9 MB/s
     http_req_blocked...............: avg=5.99µs   min=1.2µs    med=2.77µs  max=11.08ms  p(90)=4.13µs   p(95)=5.48µs   p(99.9)=53.5µs 
     http_req_connecting............: avg=2.81µs   min=0s       med=0s      max=11.05ms  p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=30.24ms  min=668.37µs med=29.02ms max=478.46ms p(90)=48.65ms  p(95)=54.27ms  p(99.9)=91.61ms
       { expected_response:true }...: avg=30.24ms  min=668.37µs med=29.02ms max=478.46ms p(90)=48.65ms  p(95)=54.27ms  p(99.9)=91.61ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 98345
     http_req_receiving.............: avg=198.96µs min=24.37µs  med=48.04µs max=254.55ms p(90)=118.69µs p(95)=278.81µs p(99.9)=26.82ms
     http_req_sending...............: avg=151.33µs min=5.27µs   med=11.13µs max=355.35ms p(90)=31.91µs  p(95)=112.37µs p(99.9)=25.54ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=29.89ms  min=608.95µs med=28.78ms max=468.95ms p(90)=48.13ms  p(95)=53.51ms  p(99.9)=83.43ms
     http_reqs......................: 98345   1626.943618/s
     iteration_duration.............: avg=30.53ms  min=935.27µs med=29.27ms max=512.55ms p(90)=48.9ms   p(95)=54.53ms  p(99.9)=93.83ms
     iterations.....................: 98245   1625.289296/s
     success_rate...................: 100.00% ✓ 98245       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6ea3382d-7d25-4ee2-0e1f-3699b3e01600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/66e4a6b1-e448-4a84-80dc-278e747a7500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 265194      ✗ 0    
     data_received..................: 7.8 GB  129 MB/s
     data_sent......................: 103 MB  1.7 MB/s
     http_req_blocked...............: avg=5.47µs   min=662ns   med=2.65µs  max=7.24ms   p(90)=4.52µs  p(95)=5.53µs   p(99.9)=91.04µs 
     http_req_connecting............: avg=2.02µs   min=0s      med=0s      max=7.21ms   p(90)=0s      p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=33.67ms  min=2.77ms  med=30.36ms max=460.52ms p(90)=51.5ms  p(95)=59.89ms  p(99.9)=103.3ms 
       { expected_response:true }...: avg=33.67ms  min=2.77ms  med=30.36ms max=460.52ms p(90)=51.5ms  p(95)=59.89ms  p(99.9)=103.3ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 88498
     http_req_receiving.............: avg=141.78µs min=21.34µs med=50.87µs max=208.33ms p(90)=118.8µs p(95)=284.71µs p(99.9)=18.24ms 
     http_req_sending...............: avg=111µs    min=2.78µs  med=9.79µs  max=214.91ms p(90)=24.83µs p(95)=126.24µs p(99.9)=20.09ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=33.41ms  min=2.7ms   med=30.15ms max=443.64ms p(90)=51.11ms p(95)=59.43ms  p(99.9)=100.81ms
     http_reqs......................: 88498   1466.307593/s
     iteration_duration.............: avg=33.92ms  min=7.55ms  med=30.6ms  max=474.88ms p(90)=51.73ms p(95)=60.11ms  p(99.9)=104ms   
     iterations.....................: 88398   1464.650711/s
     success_rate...................: 100.00% ✓ 88398       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/aa0f4fc9-f06c-4e54-2ec5-d752e90dc300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/04480a7b-9940-482a-ecca-dc74f7539d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 246573      ✗ 0    
     data_received..................: 7.2 GB  119 MB/s
     data_sent......................: 96 MB   1.6 MB/s
     http_req_blocked...............: avg=8.45µs   min=1.21µs  med=3.21µs  max=14.13ms  p(90)=4.88µs   p(95)=6µs      p(99.9)=81.26µs 
     http_req_connecting............: avg=4.71µs   min=0s      med=0s      max=14.09ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=36.15ms  min=2.69ms  med=34.4ms  max=592.46ms p(90)=56.08ms  p(95)=62.6ms   p(99.9)=137.5ms 
       { expected_response:true }...: avg=36.15ms  min=2.69ms  med=34.4ms  max=592.46ms p(90)=56.08ms  p(95)=62.6ms   p(99.9)=137.5ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 82291
     http_req_receiving.............: avg=212.95µs min=30.69µs med=62.83µs max=58.83ms  p(90)=149.29µs p(95)=318.87µs p(99.9)=27.24ms 
     http_req_sending...............: avg=169.1µs  min=5.46µs  med=12.51µs max=339.55ms p(90)=42.59µs  p(95)=139.97µs p(99.9)=26.51ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=35.77ms  min=2.58ms  med=34.1ms  max=584.84ms p(90)=55.55ms  p(95)=61.84ms  p(99.9)=135.96ms
     http_reqs......................: 82291   1353.189126/s
     iteration_duration.............: avg=36.49ms  min=2.95ms  med=34.68ms max=677.82ms p(90)=56.35ms  p(95)=62.88ms  p(99.9)=139.79ms
     iterations.....................: 82191   1351.544731/s
     success_rate...................: 100.00% ✓ 82191       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3fd8d718-6ba5-4f54-3a9e-787a96f0ff00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ab56b58c-73f3-48e2-0950-b887b99c1200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 238566      ✗ 0    
     data_received..................: 7.0 GB  114 MB/s
     data_sent......................: 93 MB   1.5 MB/s
     http_req_blocked...............: avg=6.97µs   min=831ns   med=2.7µs   max=12.13ms  p(90)=4.1µs    p(95)=5.14µs   p(99.9)=87.71µs 
     http_req_connecting............: avg=3.7µs    min=0s      med=0s      max=12.09ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=37.4ms   min=5.08ms  med=33.58ms max=620.96ms p(90)=57.57ms  p(95)=65.49ms  p(99.9)=319.25ms
       { expected_response:true }...: avg=37.4ms   min=5.08ms  med=33.58ms max=620.96ms p(90)=57.57ms  p(95)=65.49ms  p(99.9)=319.25ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 79622
     http_req_receiving.............: avg=172.62µs min=25.01µs med=54.2µs  max=342.13ms p(90)=136.45µs p(95)=281.49µs p(99.9)=23.1ms  
     http_req_sending...............: avg=134.81µs min=4.03µs  med=11.65µs max=530.49ms p(90)=33.36µs  p(95)=124.8µs  p(99.9)=24.21ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=37.1ms   min=5ms     med=33.32ms max=566.86ms p(90)=57.07ms  p(95)=64.83ms  p(99.9)=318.43ms
     http_reqs......................: 79622   1301.918869/s
     iteration_duration.............: avg=37.72ms  min=5.35ms  med=33.85ms max=638.87ms p(90)=57.83ms  p(95)=65.76ms  p(99.9)=320.97ms
     iterations.....................: 79522   1300.283744/s
     success_rate...................: 100.00% ✓ 79522       ✗ 0    
     vus............................: 50      min=0         max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/64cecde0-f60d-4c61-4b30-31b2e3aea500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/54595dc5-31f6-489e-86c1-f9827d919600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 67653      ✗ 0    
     data_received..................: 2.0 GB  33 MB/s
     data_sent......................: 26 MB   433 kB/s
     http_req_blocked...............: avg=10.5µs   min=1.13µs  med=3.04µs   max=6.14ms   p(90)=4.67µs   p(95)=5.4µs    p(99.9)=3.48ms  
     http_req_connecting............: avg=6.92µs   min=0s      med=0s       max=6.11ms   p(90)=0s       p(95)=0s       p(99.9)=3.46ms  
     http_req_duration..............: avg=132.24ms min=5.66ms  med=131.24ms max=552.56ms p(90)=165.47ms p(95)=175.76ms p(99.9)=415.54ms
       { expected_response:true }...: avg=132.24ms min=5.66ms  med=131.24ms max=552.56ms p(90)=165.47ms p(95)=175.76ms p(99.9)=415.54ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 22651
     http_req_receiving.............: avg=74.19µs  min=27.99µs med=52.71µs  max=14.18ms  p(90)=97.15µs  p(95)=118.39µs p(99.9)=1.78ms  
     http_req_sending...............: avg=75.9µs   min=5.06µs  med=11.17µs  max=259.4ms  p(90)=18.75µs  p(95)=24.21µs  p(99.9)=2.13ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=132.09ms min=5.56ms  med=131.13ms max=551.8ms  p(90)=165.35ms p(95)=175.57ms p(99.9)=406.28ms
     http_reqs......................: 22651   372.679338/s
     iteration_duration.............: avg=133.09ms min=40.71ms med=131.59ms max=617.24ms p(90)=165.8ms  p(95)=176.13ms p(99.9)=422.83ms
     iterations.....................: 22551   371.034027/s
     success_rate...................: 100.00% ✓ 22551      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f89cedb2-81c9-410a-e54a-ac6ffaf31300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dd0f560a-62f2-4274-e714-3262c561db00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router-v3</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 56685      ✗ 0    
     data_received..................: 1.7 GB  27 MB/s
     data_sent......................: 22 MB   363 kB/s
     http_req_blocked...............: avg=21.64µs  min=1.58µs  med=2.88µs   max=11.96ms  p(90)=4.29µs   p(95)=5µs      p(99.9)=8.16ms  
     http_req_connecting............: avg=18.04µs  min=0s      med=0s       max=11.92ms  p(90)=0s       p(95)=0s       p(99.9)=8.14ms  
     http_req_duration..............: avg=157.74ms min=6.75ms  med=156.9ms  max=609.42ms p(90)=194.16ms p(95)=205.28ms p(99.9)=445.76ms
       { expected_response:true }...: avg=157.74ms min=6.75ms  med=156.9ms  max=609.42ms p(90)=194.16ms p(95)=205.28ms p(99.9)=445.76ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 18995
     http_req_receiving.............: avg=87.17µs  min=31.86µs med=55.14µs  max=257.91ms p(90)=108.1µs  p(95)=131.12µs p(99.9)=1.31ms  
     http_req_sending...............: avg=90.05µs  min=6.75µs  med=11.78µs  max=355.55ms p(90)=18.35µs  p(95)=28.71µs  p(99.9)=3.03ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=157.57ms min=6.69ms  med=156.78ms max=594.41ms p(90)=194.06ms p(95)=205.14ms p(99.9)=433.88ms
     http_reqs......................: 18995   312.017329/s
     iteration_duration.............: avg=158.92ms min=42.82ms med=157.38ms max=654.69ms p(90)=194.52ms p(95)=205.67ms p(99.9)=479.91ms
     iterations.....................: 18895   310.3747/s
     success_rate...................: 100.00% ✓ 18895      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c6193cc2-35ad-460a-ed7c-b98dc01acb00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e509354c-775d-4a3f-670b-f3966789e000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 21798      ✗ 0   
     data_received..................: 647 MB  11 MB/s
     data_sent......................: 8.6 MB  140 kB/s
     http_req_blocked...............: avg=35.05µs  min=931ns    med=2.33µs   max=9.34ms   p(90)=3.63µs   p(95)=4.31µs   p(99.9)=8.08ms  
     http_req_connecting............: avg=32.36µs  min=0s       med=0s       max=9.31ms   p(90)=0s       p(95)=0s       p(99.9)=8.06ms  
     http_req_duration..............: avg=409.02ms min=6.99ms   med=408.12ms max=669.92ms p(90)=465.58ms p(95)=484.07ms p(99.9)=611.24ms
       { expected_response:true }...: avg=409.02ms min=6.99ms   med=408.12ms max=669.92ms p(90)=465.58ms p(95)=484.07ms p(99.9)=611.24ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7366
     http_req_receiving.............: avg=56.52µs  min=23.88µs  med=49.42µs  max=1.01ms   p(90)=86.74µs  p(95)=101.44µs p(99.9)=454.63µs
     http_req_sending...............: avg=77.65µs  min=3.99µs   med=9.78µs   max=122.34ms p(90)=14.7µs   p(95)=19.35µs  p(99.9)=5.96ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=408.89ms min=6.9ms    med=408.04ms max=668.7ms  p(90)=465.45ms p(95)=483.91ms p(99.9)=610.47ms
     http_reqs......................: 7366    120.41153/s
     iteration_duration.............: avg=414.81ms min=203.59ms med=408.66ms max=689.67ms p(90)=466.39ms p(95)=484.37ms p(99.9)=617.06ms
     iterations.....................: 7266    118.776837/s
     success_rate...................: 100.00% ✓ 7266       ✗ 0   
     vus............................: 42      min=42       max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0e106648-f938-434c-ba4d-b8a7e2220f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3194aba7-e1e7-4930-9add-191f7fd17900/public" alt="HTTP Overview" />


  </details>