## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5bf83efa-9ca2-4e96-065e-d6ceea48d100/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |        Duration        | Notes                          |
| :-------------------------- | :----: | :--------------------: | :--------------------: | :----------------------------- |
| hive-router                 |  1753  | 105671 total, 0 failed |  avg: 28ms, p95: 50ms  | ✅                             |
| grafbase                    |  1483  | 89603 total, 0 failed  |  avg: 33ms, p95: 58ms  | ✅                             |
| cosmo                       |  683   | 41310 total, 0 failed  | avg: 72ms, p95: 106ms  | ✅                             |
| hive-gateway-router-runtime |  628   | 38195 total, 0 failed  | avg: 78ms, p95: 109ms  | ✅                             |
| apollo-router               |  363   | 22151 total, 0 failed  | avg: 135ms, p95: 178ms | ❌ 1 unexpected GraphQL errors |
| hive-gateway                |  294   | 18036 total, 0 failed  | avg: 166ms, p95: 328ms | ✅                             |
| apollo-gateway              |  118   |  7260 total, 0 failed  | avg: 414ms, p95: 489ms | ✅                             |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 316713      ✗ 0     
     data_received..................: 9.3 GB  154 MB/s
     data_sent......................: 123 MB  2.0 MB/s
     http_req_blocked...............: avg=5.35µs   min=1.19µs  med=2.57µs  max=9.86ms   p(90)=3.75µs   p(95)=4.45µs   p(99.9)=49.83µs
     http_req_connecting............: avg=2.32µs   min=0s      med=0s      max=9.82ms   p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=28.14ms  min=1.95ms  med=25.52ms max=434.19ms p(90)=43.93ms  p(95)=50.4ms   p(99.9)=88.72ms
       { expected_response:true }...: avg=28.14ms  min=1.95ms  med=25.52ms max=434.19ms p(90)=43.93ms  p(95)=50.4ms   p(99.9)=88.72ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 105671
     http_req_receiving.............: avg=122.21µs min=23.85µs med=43.23µs max=44.01ms  p(90)=111.52µs p(95)=344.25µs p(99.9)=13.57ms
     http_req_sending...............: avg=110.43µs min=5.2µs   med=10.24µs max=408.96ms p(90)=31.98µs  p(95)=127.49µs p(99.9)=15.44ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=27.9ms   min=1.9ms   med=25.35ms max=433.44ms p(90)=43.51ms  p(95)=49.94ms  p(99.9)=86.9ms 
     http_reqs......................: 105671  1753.67453/s
     iteration_duration.............: avg=28.4ms   min=3.83ms  med=25.76ms max=457.17ms p(90)=44.19ms  p(95)=50.66ms  p(99.9)=89.44ms
     iterations.....................: 105571  1752.014969/s
     success_rate...................: 100.00% ✓ 105571      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/069a5069-747d-4298-8640-29aadbb29000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/17d49e4b-8745-41e3-3107-3e34f6592800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 268509      ✗ 0    
     data_received..................: 7.9 GB  130 MB/s
     data_sent......................: 104 MB  1.7 MB/s
     http_req_blocked...............: avg=12.13µs  min=1.37µs  med=3.22µs  max=23.05ms  p(90)=4.76µs   p(95)=5.77µs   p(99.9)=127.58µs
     http_req_connecting............: avg=8.12µs   min=0s      med=0s      max=22.99ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=33.15ms  min=2.91ms  med=29.69ms max=564.8ms  p(90)=51.08ms  p(95)=58.04ms  p(99.9)=100.95ms
       { expected_response:true }...: avg=33.15ms  min=2.91ms  med=29.69ms max=564.8ms  p(90)=51.08ms  p(95)=58.04ms  p(99.9)=100.95ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 89603
     http_req_receiving.............: avg=166.94µs min=27.22µs med=51.05µs max=347.38ms p(90)=167.52µs p(95)=423.51µs p(99.9)=17.75ms 
     http_req_sending...............: avg=129.27µs min=5.84µs  med=12.25µs max=399.46ms p(90)=45.19µs  p(95)=152.07µs p(99.9)=19.53ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=32.85ms  min=2.86ms  med=29.48ms max=532.14ms p(90)=50.6ms   p(95)=57.52ms  p(99.9)=95.2ms  
     http_reqs......................: 89603   1483.390698/s
     iteration_duration.............: avg=33.5ms   min=7.73ms  med=29.97ms max=638.23ms p(90)=51.38ms  p(95)=58.35ms  p(99.9)=103.79ms
     iterations.....................: 89503   1481.735184/s
     success_rate...................: 100.00% ✓ 89503       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2ce6623f-0a03-43e3-11d1-44d018051400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/631eab20-cb54-4f00-57c4-aefb6db34e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 123630     ✗ 0    
     data_received..................: 3.6 GB  60 MB/s
     data_sent......................: 48 MB   795 kB/s
     http_req_blocked...............: avg=10.08µs  min=1.32µs  med=2.88µs  max=10.37ms  p(90)=4.03µs   p(95)=4.87µs   p(99.9)=2.15ms  
     http_req_connecting............: avg=6.41µs   min=0s      med=0s      max=10.34ms  p(90)=0s       p(95)=0s       p(99.9)=2.01ms  
     http_req_duration..............: avg=72.37ms  min=2.76ms  med=71.24ms max=503.65ms p(90)=97.96ms  p(95)=106.14ms p(99.9)=277.29ms
       { expected_response:true }...: avg=72.37ms  min=2.76ms  med=71.24ms max=503.65ms p(90)=97.96ms  p(95)=106.14ms p(99.9)=277.29ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 41310
     http_req_receiving.............: avg=172.55µs min=28.26µs med=70.69µs max=152.6ms  p(90)=147.21µs p(95)=393.1µs  p(99.9)=17.86ms 
     http_req_sending...............: avg=70.87µs  min=5.33µs  med=11.38µs max=222.95ms p(90)=30.3µs   p(95)=126.91µs p(99.9)=4.09ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=72.13ms  min=2.65ms  med=71.04ms max=502.58ms p(90)=97.75ms  p(95)=105.84ms p(99.9)=274.18ms
     http_reqs......................: 41310   683.225313/s
     iteration_duration.............: avg=72.85ms  min=6.06ms  med=71.56ms max=534.08ms p(90)=98.29ms  p(95)=106.46ms p(99.9)=291.93ms
     iterations.....................: 41210   681.571415/s
     success_rate...................: 100.00% ✓ 41210      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f9c3da02-1396-4681-f9b8-0e7cfa1bb400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8a582107-51a8-4a37-626d-7c10d03e9200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 114285     ✗ 0    
     data_received..................: 3.4 GB  55 MB/s
     data_sent......................: 44 MB   731 kB/s
     http_req_blocked...............: avg=10.88µs  min=1.19µs  med=2.73µs  max=10.73ms  p(90)=4.29µs   p(95)=5.49µs   p(99.9)=2.65ms  
     http_req_connecting............: avg=6.86µs   min=0s      med=0s      max=10.69ms  p(90)=0s       p(95)=0s       p(99.9)=2.12ms  
     http_req_duration..............: avg=78.21ms  min=5.07ms  med=75.59ms max=631.74ms p(90)=98.61ms  p(95)=108.52ms p(99.9)=361.83ms
       { expected_response:true }...: avg=78.21ms  min=5.07ms  med=75.59ms max=631.74ms p(90)=98.61ms  p(95)=108.52ms p(99.9)=361.83ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 38195
     http_req_receiving.............: avg=110.02µs min=27.38µs med=49.93µs max=163.43ms p(90)=114.98µs p(95)=295.88µs p(99.9)=5.53ms  
     http_req_sending...............: avg=79.53µs  min=5.3µs   med=11.04µs max=465.13ms p(90)=31.8µs   p(95)=130.48µs p(99.9)=5.91ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=78.02ms  min=5.02ms  med=75.42ms max=630.87ms p(90)=98.37ms  p(95)=108.18ms p(99.9)=354.11ms
     http_reqs......................: 38195   628.933527/s
     iteration_duration.............: avg=78.78ms  min=19.68ms med=75.91ms max=679.13ms p(90)=98.95ms  p(95)=108.93ms p(99.9)=386.52ms
     iterations.....................: 38095   627.286889/s
     success_rate...................: 100.00% ✓ 38095      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4fafe8b3-657c-4461-bb67-c89e05a01f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/57d85747-78ab-4b34-d57a-e7e63307ad00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 22050 / ✗ 1
     ✓ valid response structure

     checks.........................: 99.99% ✓ 66152      ✗ 1    
     data_received..................: 1.9 GB 32 MB/s
     data_sent......................: 26 MB  423 kB/s
     http_req_blocked...............: avg=15.87µs  min=1.81µs  med=2.9µs    max=10.84ms  p(90)=4.46µs   p(95)=5.25µs   p(99.9)=5.84ms  
     http_req_connecting............: avg=12.08µs  min=0s      med=0s       max=10.8ms   p(90)=0s       p(95)=0s       p(99.9)=5.82ms  
     http_req_duration..............: avg=135.16ms min=6.45ms  med=134.27ms max=644.81ms p(90)=167.4ms  p(95)=177.69ms p(99.9)=446.08ms
       { expected_response:true }...: avg=135.16ms min=6.45ms  med=134.27ms max=644.81ms p(90)=167.4ms  p(95)=177.69ms p(99.9)=446.08ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 22151
     http_req_receiving.............: avg=100.99µs min=35.32µs med=55.24µs  max=138.14ms p(90)=112.49µs p(95)=154.6µs  p(99.9)=2.71ms  
     http_req_sending...............: avg=52.77µs  min=7.37µs  med=11.7µs   max=311.51ms p(90)=21.42µs  p(95)=69.92µs  p(99.9)=2.17ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=135.01ms min=6.4ms   med=134.16ms max=610.8ms  p(90)=167.21ms p(95)=177.5ms  p(99.9)=445.08ms
     http_reqs......................: 22151  363.84232/s
     iteration_duration.............: avg=136.17ms min=36.2ms  med=134.67ms max=697.32ms p(90)=167.79ms p(95)=178.07ms p(99.9)=493.9ms 
     iterations.....................: 22051  362.199765/s
     success_rate...................: 99.99% ✓ 22050      ✗ 1    
     vus............................: 50     min=50       max=50 
     vus_max........................: 50     min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1287dfa0-c040-4f93-cc0a-75e8fa3d6100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2ed4cffa-d6d3-4598-73b3-b940b4df6200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 53808      ✗ 0    
     data_received..................: 1.6 GB  26 MB/s
     data_sent......................: 21 MB   343 kB/s
     http_req_blocked...............: avg=25.08µs  min=1.26µs  med=2.76µs   max=14.56ms  p(90)=4.61µs   p(95)=5.94µs   p(99.9)=8.59ms  
     http_req_connecting............: avg=20.7µs   min=0s      med=0s       max=14.53ms  p(90)=0s       p(95)=0s       p(99.9)=8.55ms  
     http_req_duration..............: avg=166.23ms min=6.94ms  med=151.17ms max=701.76ms p(90)=191.95ms p(95)=328.4ms  p(99.9)=625.32ms
       { expected_response:true }...: avg=166.23ms min=6.94ms  med=151.17ms max=701.76ms p(90)=191.95ms p(95)=328.4ms  p(99.9)=625.32ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 18036
     http_req_receiving.............: avg=124.84µs min=27.38µs med=50.96µs  max=282.62ms p(90)=122.35µs p(95)=326.19µs p(99.9)=6.33ms  
     http_req_sending...............: avg=151.98µs min=5.65µs  med=11.36µs  max=475.38ms p(90)=34.37µs  p(95)=136.63µs p(99.9)=5.64ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=165.95ms min=6.85ms  med=151.03ms max=697.23ms p(90)=191.67ms p(95)=327.64ms p(99.9)=624.59ms
     http_reqs......................: 18036   294.651991/s
     iteration_duration.............: avg=167.57ms min=48.82ms med=151.6ms  max=756.02ms p(90)=192.71ms p(95)=330.36ms p(99.9)=671.97ms
     iterations.....................: 17936   293.018303/s
     success_rate...................: 100.00% ✓ 17936      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/afec291e-0d31-41c3-fe15-a0d9f41cbb00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/27e9c327-b64d-4995-1d3a-a22069a12b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 21480      ✗ 0   
     data_received..................: 638 MB  10 MB/s
     data_sent......................: 8.4 MB  138 kB/s
     http_req_blocked...............: avg=61.64µs  min=1.29µs   med=2.93µs   max=14.6ms   p(90)=4.63µs   p(95)=5.32µs   p(99.9)=12.27ms 
     http_req_connecting............: avg=58.14µs  min=0s       med=0s       max=14.57ms  p(90)=0s       p(95)=0s       p(99.9)=12.23ms 
     http_req_duration..............: avg=413.99ms min=7.55ms   med=414.09ms max=829.35ms p(90)=469.27ms p(95)=488.98ms p(99.9)=739.09ms
       { expected_response:true }...: avg=413.99ms min=7.55ms   med=414.09ms max=829.35ms p(90)=469.27ms p(95)=488.98ms p(99.9)=739.09ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7260
     http_req_receiving.............: avg=83.08µs  min=28.22µs  med=52.66µs  max=67.32ms  p(90)=98.89µs  p(95)=113.13µs p(99.9)=710.38µs
     http_req_sending...............: avg=132.77µs min=5.84µs   med=12.21µs  max=182.22ms p(90)=20.47µs  p(95)=24.3µs   p(99.9)=9.29ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=413.78ms min=7.44ms   med=414ms    max=801.49ms p(90)=469.02ms p(95)=488.55ms p(99.9)=732.78ms
     http_reqs......................: 7260    118.681645/s
     iteration_duration.............: avg=420.2ms  min=144.71ms med=414.7ms  max=845.62ms p(90)=470.35ms p(95)=489.58ms p(99.9)=768.73ms
     iterations.....................: 7160    117.046911/s
     success_rate...................: 100.00% ✓ 7160       ✗ 0   
     vus............................: 39      min=39       max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/aba1a9a1-3db3-447b-e9f4-342442b6db00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bfb09c03-12e7-472f-80d1-257d9d8d0100/public" alt="HTTP Overview" />


  </details>