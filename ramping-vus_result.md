## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d3a0457e-9a7b-4344-e8f6-8aec97c5ea00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration         | Notes                                                                 |
| :--------------- | :----: | :--------------------: | :----------------------: | :-------------------------------------------------------------------- |
| hive-router      |  1903  | 118585 total, 0 failed |  avg: 118ms, p95: 289ms  | ✅                                                                     |
| cosmo            |  648   | 41498 total, 0 failed  |  avg: 339ms, p95: 745ms  | ✅                                                                     |
| grafbase         |  483   | 30739 total, 0 failed  | avg: 457ms, p95: 1018ms  | ✅                                                                     |
| apollo-router    |  370   | 25046 total, 0 failed  | avg: 563ms, p95: 1261ms  | ❌ 25 unexpected GraphQL errors, non-compatible response structure (1) |
| hive-gateway     |  147   | 10340 total, 0 failed  | avg: 1278ms, p95: 2508ms | ✅                                                                     |
| hive-gateway-bun |  138   |  9786 total, 0 failed  | avg: 1339ms, p95: 2619ms | ✅                                                                     |
| mercurius        |   83   |  6088 total, 0 failed  | avg: 2243ms, p95: 5639ms | ✅                                                                     |
| apollo-gateway   |   81   |  5840 total, 0 failed  | avg: 1548ms, p95: 2935ms | ✅                                                                     |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 352755      ✗ 0     
     data_received..................: 10 GB   167 MB/s
     data_sent......................: 138 MB  2.2 MB/s
     http_req_blocked...............: avg=366.66µs min=1.15µs  med=2.49µs   max=342.84ms p(90)=3.86µs   p(95)=4.68µs   p(99.9)=135.8ms 
     http_req_connecting............: avg=363.27µs min=0s      med=0s       max=342.77ms p(90)=0s       p(95)=0s       p(99.9)=135.69ms
     http_req_duration..............: avg=117.56ms min=1.84ms  med=104.39ms max=518.92ms p(90)=240.54ms p(95)=288.79ms p(99.9)=413.6ms 
       { expected_response:true }...: avg=117.56ms min=1.84ms  med=104.39ms max=518.92ms p(90)=240.54ms p(95)=288.79ms p(99.9)=413.6ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 118585
     http_req_receiving.............: avg=454.97µs min=23.38µs med=41.66µs  max=148.17ms p(90)=178µs    p(95)=390.76µs p(99.9)=69.51ms 
     http_req_sending...............: avg=344.62µs min=5.17µs  med=10.08µs  max=145.24ms p(90)=30.07µs  p(95)=126.73µs p(99.9)=64.16ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=116.76ms min=1.78ms  med=103.67ms max=518.88ms p(90)=238.91ms p(95)=287.29ms p(99.9)=412.27ms
     http_reqs......................: 118585  1903.106315/s
     iteration_duration.............: avg=119.17ms min=1.99ms  med=105.83ms max=733.19ms p(90)=242.65ms p(95)=290.9ms  p(99.9)=421.56ms
     iterations.....................: 117585  1887.057857/s
     success_rate...................: 100.00% ✓ 117585      ✗ 0     
     vus............................: 77      min=0         max=493 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8e2e2e07-ae27-4732-92e2-1ba368571400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cfeea8ce-a6a9-441b-2c7a-82128c58c500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 121494     ✗ 0    
     data_received..................: 3.6 GB  57 MB/s
     data_sent......................: 48 MB   755 kB/s
     http_req_blocked...............: avg=113.17µs min=1.12µs med=2.9µs    max=124.98ms p(90)=4.75µs   p(95)=7.22µs   p(99.9)=37.39ms
     http_req_connecting............: avg=108.24µs min=0s     med=0s       max=124.9ms  p(90)=0s       p(95)=0s       p(99.9)=37.27ms
     http_req_duration..............: avg=338.6ms  min=2.66ms med=321.06ms max=1.38s    p(90)=662.63ms p(95)=744.98ms p(99.9)=1.06s  
       { expected_response:true }...: avg=338.6ms  min=2.66ms med=321.06ms max=1.38s    p(90)=662.63ms p(95)=744.98ms p(99.9)=1.06s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 41498
     http_req_receiving.............: avg=541.57µs min=27.7µs med=64.78µs  max=167.13ms p(90)=189.23µs p(95)=513.4µs  p(99.9)=77.62ms
     http_req_sending...............: avg=144.29µs min=5.77µs med=11.62µs  max=77.52ms  p(90)=31.3µs   p(95)=130.65µs p(99.9)=26.32ms
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=337.92ms min=2.6ms  med=320.45ms max=1.38s    p(90)=661.38ms p(95)=743.3ms  p(99.9)=1.06s  
     http_reqs......................: 41498   648.199196/s
     iteration_duration.............: avg=347.48ms min=2.84ms med=329.95ms max=1.38s    p(90)=665.92ms p(95)=748.57ms p(99.9)=1.06s  
     iterations.....................: 40498   632.579186/s
     success_rate...................: 100.00% ✓ 40498      ✗ 0    
     vus............................: 64      min=0        max=497
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/19eef350-9d9d-4b6a-6820-20c9f65a5d00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8a8be848-371a-4dfe-5faf-0dea011f5700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 89217      ✗ 0    
     data_received..................: 2.7 GB  43 MB/s
     data_sent......................: 36 MB   564 kB/s
     http_req_blocked...............: avg=453.28µs min=1.17µs  med=3.45µs   max=266.74ms p(90)=5.65µs   p(95)=9.98µs   p(99.9)=121.26ms
     http_req_connecting............: avg=440.59µs min=0s      med=0s       max=266.67ms p(90)=0s       p(95)=0s       p(99.9)=119.95ms
     http_req_duration..............: avg=457.32ms min=2.71ms  med=429.43ms max=1.81s    p(90)=908.17ms p(95)=1.01s    p(99.9)=1.47s   
       { expected_response:true }...: avg=457.32ms min=2.71ms  med=429.43ms max=1.81s    p(90)=908.17ms p(95)=1.01s    p(99.9)=1.47s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 30739
     http_req_receiving.............: avg=385.39µs min=25.94µs med=57.74µs  max=156.23ms p(90)=248.98µs p(95)=518.79µs p(99.9)=69.02ms 
     http_req_sending...............: avg=471.44µs min=5.43µs  med=12.92µs  max=181.37ms p(90)=118.01µs p(95)=153.34µs p(99.9)=83.01ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=456.46ms min=2.66ms  med=428.82ms max=1.75s    p(90)=906.83ms p(95)=1.01s    p(99.9)=1.46s   
     http_reqs......................: 30739   483.981939/s
     iteration_duration.............: avg=474.28ms min=2.9ms   med=449.3ms  max=1.81s    p(90)=917.07ms p(95)=1.02s    p(99.9)=1.48s   
     iterations.....................: 29739   468.237056/s
     success_rate...................: 100.00% ✓ 29739      ✗ 0    
     vus............................: 86      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ae1c8f62-1aba-4cd5-ca64-9d499e6c5200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a1ba2327-dfb9-4a97-9483-66dacdf21600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 24021 / ✗ 25
     ✗ valid response structure
      ↳  99% — ✓ 24045 / ✗ 1

     checks.........................: 99.96% ✓ 72112      ✗ 26   
     data_received..................: 2.2 GB 33 MB/s
     data_sent......................: 29 MB  433 kB/s
     http_req_blocked...............: avg=135.01µs min=1.65µs  med=3.1µs    max=210.78ms p(90)=5.37µs   p(95)=8.48µs   p(99.9)=37.27ms
     http_req_connecting............: avg=128.12µs min=0s      med=0s       max=210.7ms  p(90)=0s       p(95)=0s       p(99.9)=36.47ms
     http_req_duration..............: avg=562.96ms min=6.23ms  med=519.19ms max=2.07s    p(90)=1.12s    p(95)=1.26s    p(99.9)=1.83s  
       { expected_response:true }...: avg=562.96ms min=6.23ms  med=519.19ms max=2.07s    p(90)=1.12s    p(95)=1.26s    p(99.9)=1.83s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 25046
     http_req_receiving.............: avg=158.14µs min=33.77µs med=58.5µs   max=130.14ms p(90)=127.83µs p(95)=317.46µs p(99.9)=14.43ms
     http_req_sending...............: avg=138.53µs min=7.27µs  med=12.34µs  max=138.58ms p(90)=34.4µs   p(95)=128.8µs  p(99.9)=19.66ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=562.66ms min=6.14ms  med=518.87ms max=2.07s    p(90)=1.12s    p(95)=1.26s    p(99.9)=1.82s  
     http_reqs......................: 25046  370.881397/s
     iteration_duration.............: avg=586.9ms  min=6.58ms  med=547.42ms max=2.07s    p(90)=1.12s    p(95)=1.26s    p(99.9)=1.84s  
     iterations.....................: 24046  356.073388/s
     success_rate...................: 99.89% ✓ 24021      ✗ 25   
     vus............................: 91     min=0        max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b1a76091-39a0-4735-648f-4b8dabdc3d00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a707539e-38a6-4d5a-a86c-b82e29c07b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 28020      ✗ 0    
     data_received..................: 908 MB  13 MB/s
     data_sent......................: 12 MB   176 kB/s
     http_req_blocked...............: avg=91.4µs  min=1.66µs  med=3.54µs  max=75.83ms p(90)=5.37µs   p(95)=24.22µs  p(99.9)=20.77ms
     http_req_connecting............: avg=82.53µs min=0s      med=0s      max=75.76ms p(90)=0s       p(95)=0s       p(99.9)=20.68ms
     http_req_duration..............: avg=1.27s   min=7.46ms  med=1.27s   max=14.22s  p(90)=2.3s     p(95)=2.5s     p(99.9)=12.65s 
       { expected_response:true }...: avg=1.27s   min=7.46ms  med=1.27s   max=14.22s  p(90)=2.3s     p(95)=2.5s     p(99.9)=12.65s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 10340
     http_req_receiving.............: avg=99.49µs min=30.93µs med=56.6µs  max=47.74ms p(90)=107.76µs p(95)=160.02µs p(99.9)=3.68ms 
     http_req_sending...............: avg=65.15µs min=6.9µs   med=13.26µs max=44.09ms p(90)=35.41µs  p(95)=63.88µs  p(99.9)=11.74ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=1.27s   min=7.38ms  med=1.27s   max=14.22s  p(90)=2.3s     p(95)=2.5s     p(99.9)=12.65s 
     http_reqs......................: 10340   147.310542/s
     iteration_duration.............: avg=1.41s   min=8.09ms  med=1.42s   max=14.23s  p(90)=2.34s    p(95)=2.53s    p(99.9)=12.78s 
     iterations.....................: 9340    133.063875/s
     success_rate...................: 100.00% ✓ 9340       ✗ 0    
     vus............................: 88      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e501bf19-0e08-4068-a7d4-3c9617b05800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6246683e-55fa-407b-ae78-cbae6fb7b400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 26358     ✗ 0    
     data_received..................: 859 MB  12 MB/s
     data_sent......................: 12 MB   166 kB/s
     http_req_blocked...............: avg=77.29µs  min=1.48µs  med=3.99µs  max=41.14ms p(90)=6.42µs   p(95)=24.91µs  p(99.9)=18.04ms
     http_req_connecting............: avg=69.38µs  min=0s      med=0s      max=41.01ms p(90)=0s       p(95)=0s       p(99.9)=17.98ms
     http_req_duration..............: avg=1.33s    min=7.5ms   med=1.33s   max=14.74s  p(90)=2.39s    p(95)=2.61s    p(99.9)=13.68s 
       { expected_response:true }...: avg=1.33s    min=7.5ms   med=1.33s   max=14.74s  p(90)=2.39s    p(95)=2.61s    p(99.9)=13.68s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 9786 
     http_req_receiving.............: avg=114.99µs min=30.71µs med=74.1µs  max=22.32ms p(90)=131.57µs p(95)=186.86µs p(99.9)=4.32ms 
     http_req_sending...............: avg=79.26µs  min=6.58µs  med=15.07µs max=20.61ms p(90)=40.36µs  p(95)=70.19µs  p(99.9)=15.13ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=1.33s    min=7.44ms  med=1.33s   max=14.74s  p(90)=2.39s    p(95)=2.61s    p(99.9)=13.68s 
     http_reqs......................: 9786    138.7416/s
     iteration_duration.............: avg=1.49s    min=8.95ms  med=1.51s   max=14.76s  p(90)=2.42s    p(95)=2.65s    p(99.9)=13.76s 
     iterations.....................: 8786    124.56404/s
     success_rate...................: 100.00% ✓ 8786      ✗ 0    
     vus............................: 101     min=0       max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a2c3bd22-dd63-4646-1c00-d99ff58e4a00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cb794930-3ac7-42bd-c517-62929885d400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 15264     ✗ 0    
     data_received..................: 534 MB  7.4 MB/s
     data_sent......................: 7.5 MB  103 kB/s
     http_req_blocked...............: avg=29.99µs min=1.43µs  med=3.19µs  max=7.31ms  p(90)=5.93µs  p(95)=211.53µs p(99.9)=2.08ms  
     http_req_connecting............: avg=22.12µs min=0s      med=0s      max=7.25ms  p(90)=0s      p(95)=163.67µs p(99.9)=1.6ms   
     http_req_duration..............: avg=2.24s   min=9.34ms  med=1.96s   max=5.75s   p(90)=4.95s   p(95)=5.63s    p(99.9)=5.74s   
       { expected_response:true }...: avg=2.24s   min=9.34ms  med=1.96s   max=5.75s   p(90)=4.95s   p(95)=5.63s    p(99.9)=5.74s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 6088 
     http_req_receiving.............: avg=65.96µs min=27.73µs med=53.94µs max=3.03ms  p(90)=92µs    p(95)=108.19µs p(99.9)=616.56µs
     http_req_sending...............: avg=30.06µs min=6.07µs  med=12.4µs  max=12.06ms p(90)=35.03µs p(95)=46.49µs  p(99.9)=3.19ms  
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=2.24s   min=9.29ms  med=1.96s   max=5.75s   p(90)=4.95s   p(95)=5.63s    p(99.9)=5.74s   
     http_reqs......................: 6088    83.943311/s
     iteration_duration.............: avg=2.68s   min=9.78ms  med=2.57s   max=5.76s   p(90)=5.06s   p(95)=5.66s    p(99.9)=5.75s   
     iterations.....................: 5088    70.154988/s
     success_rate...................: 100.00% ✓ 5088      ✗ 0    
     vus............................: 112     min=0       max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/81c775cf-8858-431a-1d84-33d24f912b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8ccb6984-815a-4b5e-769b-fb4c08947200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 14520     ✗ 0    
     data_received..................: 513 MB  7.2 MB/s
     data_sent......................: 7.3 MB  102 kB/s
     http_req_blocked...............: avg=17.56µs min=1.42µs  med=3.32µs  max=11.63ms p(90)=5.52µs   p(95)=7.49µs   p(99.9)=1.12ms
     http_req_connecting............: avg=12.08µs min=0s      med=0s      max=11.55ms p(90)=0s       p(95)=0s       p(99.9)=1.05ms
     http_req_duration..............: avg=1.54s   min=9.29ms  med=1.39s   max=33.69s  p(90)=2.48s    p(95)=2.93s    p(99.9)=31.52s
       { expected_response:true }...: avg=1.54s   min=9.29ms  med=1.39s   max=33.69s  p(90)=2.48s    p(95)=2.93s    p(99.9)=31.52s
     http_req_failed................: 0.00%   ✓ 0         ✗ 5840 
     http_req_receiving.............: avg=77.07µs min=28.76µs med=65.54µs max=3.14ms  p(90)=111.89µs p(95)=129.83µs p(99.9)=1.08ms
     http_req_sending...............: avg=24.63µs min=6.3µs   med=14.16µs max=5.78ms  p(90)=24.59µs  p(95)=43.28µs  p(99.9)=2.17ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=1.54s   min=9.19ms  med=1.39s   max=33.69s  p(90)=2.48s    p(95)=2.93s    p(99.9)=31.52s
     http_reqs......................: 5840    81.428242/s
     iteration_duration.............: avg=1.86s   min=9.63ms  med=1.61s   max=33.7s   p(90)=2.67s    p(95)=3.01s    p(99.9)=31.79s
     iterations.....................: 4840    67.48505/s
     success_rate...................: 100.00% ✓ 4840      ✗ 0    
     vus............................: 130     min=0       max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/37e17ec7-97ec-4702-2f6c-408cfb6fce00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c5072da3-793e-45ee-f921-1daa6a95ae00/public" alt="HTTP Overview" />


  </details>