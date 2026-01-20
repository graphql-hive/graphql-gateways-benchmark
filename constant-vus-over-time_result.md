## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d5636581-837f-4844-7294-ff1af41cc400/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :-------------------------- | :----: | :--------------------: | :--------------------: | :---- |
| hive-router                 |  1750  | 105494 total, 0 failed |  avg: 28ms, p95: 49ms  | ✅    |
| grafbase                    |  1524  | 92086 total, 0 failed  |  avg: 32ms, p95: 56ms  | ✅    |
| hive-gateway-router-runtime |  636   | 38575 total, 0 failed  | avg: 78ms, p95: 101ms  | ✅    |
| cosmo                       |  627   | 37965 total, 0 failed  | avg: 79ms, p95: 116ms  | ✅    |
| apollo-router               |  373   | 22688 total, 0 failed  | avg: 132ms, p95: 172ms | ✅    |
| hive-gateway                |  289   | 17652 total, 0 failed  | avg: 170ms, p95: 237ms | ✅    |
| apollo-gateway              |  126   |  7760 total, 0 failed  | avg: 387ms, p95: 457ms | ✅    |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 316182      ✗ 0     
     data_received..................: 9.3 GB  154 MB/s
     data_sent......................: 123 MB  2.0 MB/s
     http_req_blocked...............: avg=5.63µs   min=1.22µs  med=2.51µs  max=10.73ms  p(90)=3.66µs   p(95)=4.38µs   p(99.9)=105.8µs
     http_req_connecting............: avg=2.58µs   min=0s      med=0s      max=10.7ms   p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=28.23ms  min=2.09ms  med=25.92ms max=457.89ms p(90)=42.54ms  p(95)=48.99ms  p(99.9)=82.97ms
       { expected_response:true }...: avg=28.23ms  min=2.09ms  med=25.92ms max=457.89ms p(90)=42.54ms  p(95)=48.99ms  p(99.9)=82.97ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 105494
     http_req_receiving.............: avg=111.22µs min=23.93µs med=43.09µs max=40.65ms  p(90)=117.61µs p(95)=348.32µs p(99.9)=10.65ms
     http_req_sending...............: avg=83.49µs  min=5.19µs  med=9.92µs  max=246.2ms  p(90)=31.82µs  p(95)=126.3µs  p(99.9)=10.94ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=28.04ms  min=2.05ms  med=25.78ms max=457.19ms p(90)=42.18ms  p(95)=48.67ms  p(99.9)=81.13ms
     http_reqs......................: 105494  1750.616341/s
     iteration_duration.............: avg=28.45ms  min=4.05ms  med=26.12ms max=471.75ms p(90)=42.74ms  p(95)=49.2ms   p(99.9)=84.35ms
     iterations.....................: 105394  1748.956894/s
     success_rate...................: 100.00% ✓ 105394      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e268fcdc-bb63-46cd-dc0c-fab7741d6200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/47178c45-942b-4c9e-6633-f2d2e51f6f00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 275958      ✗ 0    
     data_received..................: 8.1 GB  134 MB/s
     data_sent......................: 107 MB  1.8 MB/s
     http_req_blocked...............: avg=7.14µs   min=1.25µs  med=2.94µs  max=11.06ms  p(90)=4.22µs   p(95)=5.36µs   p(99.9)=125.59µs
     http_req_connecting............: avg=3.22µs   min=0s      med=0s      max=11.03ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=32.33ms  min=3.13ms  med=29.28ms max=486.59ms p(90)=48.93ms  p(95)=56.36ms  p(99.9)=97.95ms 
       { expected_response:true }...: avg=32.33ms  min=3.13ms  med=29.28ms max=486.59ms p(90)=48.93ms  p(95)=56.36ms  p(99.9)=97.95ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 92086
     http_req_receiving.............: avg=150.83µs min=25.78µs med=50.28µs max=46.07ms  p(90)=170.84µs p(95)=403.14µs p(99.9)=15.71ms 
     http_req_sending...............: avg=112.36µs min=5.26µs  med=11.59µs max=460.18ms p(90)=45.1µs   p(95)=139.07µs p(99.9)=13.3ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=32.06ms  min=3.08ms  med=29.1ms  max=484.62ms p(90)=48.45ms  p(95)=55.85ms  p(99.9)=94.88ms 
     http_reqs......................: 92086   1524.691545/s
     iteration_duration.............: avg=32.6ms   min=7.9ms   med=29.53ms max=510.78ms p(90)=49.19ms  p(95)=56.59ms  p(99.9)=98.77ms 
     iterations.....................: 91986   1523.035819/s
     success_rate...................: 100.00% ✓ 91986       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/941b0e13-d767-416d-dc78-a9a71c566f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b1dc0d3a-ae68-4663-af3d-64be8fcef200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 115425     ✗ 0    
     data_received..................: 3.4 GB  56 MB/s
     data_sent......................: 45 MB   740 kB/s
     http_req_blocked...............: avg=11.74µs min=1.25µs  med=2.66µs  max=12.77ms  p(90)=4.07µs   p(95)=5.12µs   p(99.9)=3.16ms  
     http_req_connecting............: avg=8.28µs  min=0s      med=0s      max=12.74ms  p(90)=0s       p(95)=0s       p(99.9)=3.13ms  
     http_req_duration..............: avg=77.54ms min=4.94ms  med=75.23ms max=548.3ms  p(90)=94.21ms  p(95)=100.83ms p(99.9)=310.35ms
       { expected_response:true }...: avg=77.54ms min=4.94ms  med=75.23ms max=548.3ms  p(90)=94.21ms  p(95)=100.83ms p(99.9)=310.35ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 38575
     http_req_receiving.............: avg=98.72µs min=26.31µs med=46.47µs max=150.02ms p(90)=102.08µs p(95)=254.92µs p(99.9)=4.92ms  
     http_req_sending...............: avg=56.46µs min=5.18µs  med=10.58µs max=283.46ms p(90)=30.84µs  p(95)=125.93µs p(99.9)=3.98ms  
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=77.39ms min=4.89ms  med=75.11ms max=547.18ms p(90)=94.01ms  p(95)=100.63ms p(99.9)=305.44ms
     http_reqs......................: 38575   636.071421/s
     iteration_duration.............: avg=78ms    min=15.17ms med=75.49ms max=566.09ms p(90)=94.45ms  p(95)=101.12ms p(99.9)=331.45ms
     iterations.....................: 38475   634.4225/s
     success_rate...................: 100.00% ✓ 38475      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a6399a98-b9a5-4538-f362-62657f626700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ee870392-089a-48fe-e1d2-e8b462ca3a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 113595     ✗ 0    
     data_received..................: 3.3 GB  55 MB/s
     data_sent......................: 44 MB   730 kB/s
     http_req_blocked...............: avg=18.64µs  min=1.47µs  med=3.01µs  max=20.67ms  p(90)=4.68µs   p(95)=5.85µs   p(99.9)=6.94ms  
     http_req_connecting............: avg=14.29µs  min=0s      med=0s      max=20.54ms  p(90)=0s       p(95)=0s       p(99.9)=6.67ms  
     http_req_duration..............: avg=78.8ms   min=3.1ms   med=77.57ms max=504.11ms p(90)=107.4ms  p(95)=116.26ms p(99.9)=294.25ms
       { expected_response:true }...: avg=78.8ms   min=3.1ms   med=77.57ms max=504.11ms p(90)=107.4ms  p(95)=116.26ms p(99.9)=294.25ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 37965
     http_req_receiving.............: avg=204.39µs min=33.39µs med=82.98µs max=138.49ms p(90)=169.73µs p(95)=410.04µs p(99.9)=17.46ms 
     http_req_sending...............: avg=56.52µs  min=6.66µs  med=11.77µs max=232.11ms p(90)=30.96µs  p(95)=129.38µs p(99.9)=2.7ms   
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=78.53ms  min=3ms     med=77.3ms  max=489.15ms p(90)=107.1ms  p(95)=115.95ms p(99.9)=290.78ms
     http_reqs......................: 37965   627.818252/s
     iteration_duration.............: avg=79.27ms  min=5.12ms  med=77.87ms max=538.1ms  p(90)=107.69ms p(95)=116.52ms p(99.9)=297.55ms
     iterations.....................: 37865   626.164575/s
     success_rate...................: 100.00% ✓ 37865      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dbbf85df-2cd8-41f8-4be8-fddbb00fd100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d01fda30-22a9-46bf-dc4b-5856d44c5d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 67764      ✗ 0    
     data_received..................: 2.0 GB  33 MB/s
     data_sent......................: 26 MB   434 kB/s
     http_req_blocked...............: avg=14.94µs  min=1.78µs  med=2.99µs   max=10.02ms  p(90)=4.3µs    p(95)=5.15µs   p(99.9)=5.62ms  
     http_req_connecting............: avg=11.05µs  min=0s      med=0s       max=9.98ms   p(90)=0s       p(95)=0s       p(99.9)=5.38ms  
     http_req_duration..............: avg=132.09ms min=6.01ms  med=131.05ms max=610.29ms p(90)=162.83ms p(95)=172.37ms p(99.9)=424.87ms
       { expected_response:true }...: avg=132.09ms min=6.01ms  med=131.05ms max=610.29ms p(90)=162.83ms p(95)=172.37ms p(99.9)=424.87ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 22688
     http_req_receiving.............: avg=84.72µs  min=35.49µs med=54.67µs  max=164.02ms p(90)=104.18µs p(95)=131.78µs p(99.9)=1.23ms  
     http_req_sending...............: avg=79.98µs  min=7.35µs  med=11.65µs  max=413.6ms  p(90)=19.66µs  p(95)=35.81µs  p(99.9)=1.73ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=131.93ms min=5.96ms  med=130.93ms max=590.92ms p(90)=162.72ms p(95)=172.23ms p(99.9)=418.3ms 
     http_reqs......................: 22688   373.292208/s
     iteration_duration.............: avg=132.93ms min=27.44ms med=131.37ms max=644.45ms p(90)=163.12ms p(95)=172.72ms p(99.9)=446.26ms
     iterations.....................: 22588   371.646879/s
     success_rate...................: 100.00% ✓ 22588      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f33b03b9-5fed-4e83-0fa4-4e1b6c80b700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5473e355-ac5f-47c8-defc-df0a4b6c4a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 52656      ✗ 0    
     data_received..................: 1.6 GB  25 MB/s
     data_sent......................: 21 MB   337 kB/s
     http_req_blocked...............: avg=22.16µs  min=1.24µs  med=2.82µs   max=11.25ms  p(90)=4.77µs   p(95)=6µs      p(99.9)=8.23ms  
     http_req_connecting............: avg=17.99µs  min=0s      med=0s       max=11.21ms  p(90)=0s       p(95)=0s       p(99.9)=8.2ms   
     http_req_duration..............: avg=169.78ms min=6.81ms  med=155.53ms max=702.77ms p(90)=187.86ms p(95)=237.22ms p(99.9)=677.39ms
       { expected_response:true }...: avg=169.78ms min=6.81ms  med=155.53ms max=702.77ms p(90)=187.86ms p(95)=237.22ms p(99.9)=677.39ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 17652
     http_req_receiving.............: avg=105.63µs min=28.02µs med=53.51µs  max=24.43ms  p(90)=121.74µs p(95)=286.8µs  p(99.9)=4.2ms   
     http_req_sending...............: avg=105.41µs min=5.55µs  med=11.23µs  max=277.74ms p(90)=33.06µs  p(95)=135.54µs p(99.9)=5.61ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=169.57ms min=6.75ms  med=155.38ms max=702.63ms p(90)=187.67ms p(95)=236.98ms p(99.9)=677.32ms
     http_reqs......................: 17652   289.450853/s
     iteration_duration.............: avg=171.09ms min=49.84ms med=155.92ms max=703.16ms p(90)=188.33ms p(95)=238.69ms p(99.9)=678.3ms 
     iterations.....................: 17552   287.81109/s
     success_rate...................: 100.00% ✓ 17552      ✗ 0    
     vus............................: 7       min=7        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/622a7c36-5c0e-4a49-626c-8fefe69fcd00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b351b047-6a1c-4fef-a76b-5216987b5700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 22980      ✗ 0   
     data_received..................: 682 MB  11 MB/s
     data_sent......................: 9.0 MB  148 kB/s
     http_req_blocked...............: avg=45.54µs  min=1.41µs  med=3.18µs   max=12.5ms   p(90)=4.97µs   p(95)=5.63µs   p(99.9)=10.61ms 
     http_req_connecting............: avg=41.84µs  min=0s      med=0s       max=12.46ms  p(90)=0s       p(95)=0s       p(99.9)=10.57ms 
     http_req_duration..............: avg=387.2ms  min=7.06ms  med=385.73ms max=875.78ms p(90)=439.33ms p(95)=456.9ms  p(99.9)=783.09ms
       { expected_response:true }...: avg=387.2ms  min=7.06ms  med=385.73ms max=875.78ms p(90)=439.33ms p(95)=456.9ms  p(99.9)=783.09ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7760
     http_req_receiving.............: avg=81.71µs  min=31.71µs med=55.34µs  max=115.64ms p(90)=98.69µs  p(95)=115.05µs p(99.9)=415.96µs
     http_req_sending...............: avg=41.51µs  min=6.47µs  med=13µs     max=123.8ms  p(90)=20.6µs   p(95)=25.17µs  p(99.9)=1.47ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=387.07ms min=7.01ms  med=385.65ms max=849.68ms p(90)=439.2ms  p(95)=456.81ms p(99.9)=778.03ms
     http_reqs......................: 7760    126.987676/s
     iteration_duration.............: avg=392.82ms min=30.49ms med=386.36ms max=918.94ms p(90)=440.15ms p(95)=457.36ms p(99.9)=870.05ms
     iterations.....................: 7660    125.351237/s
     success_rate...................: 100.00% ✓ 7660       ✗ 0   
     vus............................: 29      min=29       max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e4332626-19d2-49c4-dd88-5cf36e7f7100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/50d7831f-c36b-4173-e7cd-54f87eaa9b00/public" alt="HTTP Overview" />


  </details>