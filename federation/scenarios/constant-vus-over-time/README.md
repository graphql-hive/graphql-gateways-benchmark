## Overview for: `federation/constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c8d128db-623a-4d6e-fc73-884c6bc81200/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  178   | 10904 total, 0 failed | avg: 850ms, p95: 2130ms  | ✅                                                                        |
| grafbase         |  169   | 10290 total, 0 failed | avg: 849ms, p95: 2279ms  | ✅                                                                        |
| apollo-router    |  159   | 9685 total, 0 failed  | avg: 925ms, p95: 2424ms  | ❌ 9 unexpected GraphQL errors, non-compatible response structure (7)     |
| hive-gateway-bun |   94   | 5934 total, 0 failed  | avg: 3030ms, p95: 5025ms | ✅                                                                        |
| apollo-server    |   89   | 5579 total, 59 failed | avg: 3263ms, p95: 2969ms | ❌ 59 failed requests, 59 non-200 responses, 59 unexpected GraphQL errors |
| hive-gateway     |   85   | 5395 total, 11 failed | avg: 3400ms, p95: 4874ms | ❌ 11 failed requests, 11 non-200 responses, 11 unexpected GraphQL errors |
| mercurius        |   81   | 5031 total, 0 failed  | avg: 3622ms, p95: 4616ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32652      ✗ 0    
     data_received..................: 957 MB  16 MB/s
     data_sent......................: 13 MB   213 kB/s
     http_req_blocked...............: avg=825.47µs min=1.61µs  med=3.28µs   max=976.06ms p(90)=5.32µs   p(95)=11.44µs
     http_req_connecting............: avg=480.97µs min=0s      med=0s       max=975.99ms p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=849.51ms min=3.52ms  med=705.14ms max=6.25s    p(90)=1.71s    p(95)=2.13s  
       { expected_response:true }...: avg=849.51ms min=3.52ms  med=705.14ms max=6.25s    p(90)=1.71s    p(95)=2.13s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10904
     http_req_receiving.............: avg=310.01ms min=34.11µs med=97.89µs  max=5.8s     p(90)=1.17s    p(95)=1.65s  
     http_req_sending...............: avg=17.53ms  min=8.12µs  med=15.56µs  max=4.52s    p(90)=118.62µs p(95)=1.57ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=521.96ms min=3.34ms  med=504.31ms max=2.72s    p(90)=930.28ms p(95)=1.04s  
     http_reqs......................: 10904   178.986526/s
     iteration_duration.............: avg=1.64s    min=17.02ms med=1.38s    max=9.76s    p(90)=3.33s    p(95)=4.14s  
     iterations.....................: 10884   178.658231/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f2c26530-5811-4edf-4a71-485788466200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3eb2c36a-57da-4c01-2eaa-e36166731500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/18d7c39c-6255-4ec6-ff46-1a6bbd238900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30810      ✗ 0    
     data_received..................: 904 MB  15 MB/s
     data_sent......................: 12 MB   201 kB/s
     http_req_blocked...............: avg=1.07ms   min=1.52µs  med=3.68µs   max=1.64s p(90)=5.61µs   p(95)=11.04µs
     http_req_connecting............: avg=972.02µs min=0s      med=0s       max=1.64s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=848.51ms min=3.14ms  med=681.76ms max=6.95s p(90)=1.76s    p(95)=2.27s  
       { expected_response:true }...: avg=848.51ms min=3.14ms  med=681.76ms max=6.95s p(90)=1.76s    p(95)=2.27s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10290
     http_req_receiving.............: avg=280.52ms min=33.43µs med=92.17µs  max=5.61s p(90)=1.14s    p(95)=1.73s  
     http_req_sending...............: avg=21.77ms  min=8.33µs  med=17.28µs  max=2.62s p(90)=147.44µs p(95)=15.43ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=546.2ms  min=3.05ms  med=515.75ms max=2.87s p(90)=1.01s    p(95)=1.13s  
     http_reqs......................: 10290   169.028778/s
     iteration_duration.............: avg=1.74s    min=25.15ms med=1.47s    max=9.9s  p(90)=3.48s    p(95)=4.15s  
     iterations.....................: 10270   168.700248/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b2de4276-35e2-414b-90cd-1f3b802e2900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4c1bb645-5d32-43a5-88d0-4aa5c7e24a00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9a5b6127-0f07-42be-5774-4d6679b73c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 9656 / ✗ 9
     ✗ valid response structure
      ↳  99% — ✓ 9658 / ✗ 7

     █ setup

     checks.........................: 99.94% ✓ 28979      ✗ 16   
     data_received..................: 850 MB 14 MB/s
     data_sent......................: 12 MB  189 kB/s
     http_req_blocked...............: avg=704.38µs min=1.53µs  med=3.24µs   max=868.73ms p(90)=5.01µs   p(95)=11.12µs
     http_req_connecting............: avg=457.93µs min=0s      med=0s       max=868.67ms p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=925.22ms min=6.71ms  med=699.08ms max=7.35s    p(90)=2.02s    p(95)=2.42s  
       { expected_response:true }...: avg=925.22ms min=6.71ms  med=699.08ms max=7.35s    p(90)=2.02s    p(95)=2.42s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 9685 
     http_req_receiving.............: avg=394.09ms min=34.39µs med=97.55µs  max=7.28s    p(90)=1.47s    p(95)=1.88s  
     http_req_sending...............: avg=13.52ms  min=8.14µs  med=14.79µs  max=3.05s    p(90)=128.22µs p(95)=1.51ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=517.6ms  min=6.64ms  med=465.85ms max=2.51s    p(90)=984.95ms p(95)=1.18s  
     http_reqs......................: 9685   159.147426/s
     iteration_duration.............: avg=1.85s    min=26.52ms med=1.53s    max=9.64s    p(90)=3.93s    p(95)=4.74s  
     iterations.....................: 9665   158.818779/s
     vus............................: 300    min=300      max=300
     vus_max........................: 300    min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0d63dcb3-381d-4994-ac97-4d454ceb9300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a168f9a2-e747-45ed-0097-d2b15b0b2f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/96df773d-8a79-438a-5ad9-0dc70dcdb700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17742     ✗ 0    
     data_received..................: 521 MB  8.3 MB/s
     data_sent......................: 7.0 MB  112 kB/s
     http_req_blocked...............: avg=460.04µs min=1.72µs   med=4.03µs   max=60.57ms  p(90)=6.35µs  p(95)=297.49µs
     http_req_connecting............: avg=426.96µs min=0s       med=0s       max=26.94ms  p(90)=0s      p(95)=103.25µs
     http_req_duration..............: avg=3.02s    min=18.61ms  med=2.77s    max=7.88s    p(90)=4.53s   p(95)=5.02s   
       { expected_response:true }...: avg=3.02s    min=18.61ms  med=2.77s    max=7.88s    p(90)=4.53s   p(95)=5.02s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5934 
     http_req_receiving.............: avg=47.3ms   min=39.05µs  med=128.31µs max=1.95s    p(90)=4.65ms  p(95)=294.29ms
     http_req_sending...............: avg=1.14ms   min=7.14µs   med=21.3µs   max=668.28ms p(90)=67.08µs p(95)=594.91µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=2.98s    min=18.34ms  med=2.74s    max=7.42s    p(90)=4.5s    p(95)=5.01s   
     http_reqs......................: 5934    94.498186/s
     iteration_duration.............: avg=3.1s     min=203.59ms med=2.82s    max=8.28s    p(90)=4.66s   p(95)=5.11s   
     iterations.....................: 5914    94.179688/s
     vus............................: 140     min=140     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/17640643-f84f-4bb1-6e26-4016e3defd00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/03fbeb3a-d086-4d33-76d1-4ece71d83d00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ae728d05-b00e-40a7-124b-0e3064503400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5500 / ✗ 59
     ✗ no graphql errors
      ↳  98% — ✓ 5500 / ✗ 59
     ✓ valid response structure

     █ setup

     checks.........................: 99.28% ✓ 16500     ✗ 118  
     data_received..................: 485 MB 7.8 MB/s
     data_sent......................: 6.6 MB 106 kB/s
     http_req_blocked...............: avg=1.03ms   min=1.39µs   med=2.94µs   max=69.18ms  p(90)=5.19µs   p(95)=3.56ms  
     http_req_connecting............: avg=1ms      min=0s       med=0s       max=61.32ms  p(90)=0s       p(95)=2.79ms  
     http_req_duration..............: avg=3.26s    min=10.76ms  med=1.99s    max=1m0s     p(90)=2.67s    p(95)=2.96s   
       { expected_response:true }...: avg=2.65s    min=10.76ms  med=1.98s    max=59.5s    p(90)=2.64s    p(95)=2.81s   
     http_req_failed................: 1.05%  ✓ 59        ✗ 5520 
     http_req_receiving.............: avg=441µs    min=0s       med=102.32µs max=168.36ms p(90)=222.99µs p(95)=415.32µs
     http_req_sending...............: avg=968.52µs min=8.36µs   med=14.74µs  max=126.12ms p(90)=36.16µs  p(95)=2ms     
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.26s    min=10.67ms  med=1.99s    max=1m0s     p(90)=2.67s    p(95)=2.96s   
     http_reqs......................: 5579   89.198022/s
     iteration_duration.............: avg=3.29s    min=357.56ms med=2.01s    max=1m0s     p(90)=2.7s     p(95)=3s      
     iterations.....................: 5559   88.878258/s
     vus............................: 84     min=84      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a3b0025a-40da-4825-9194-9e57a3a4f900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f380cdd9-12a4-4cb1-15cb-d134e30cdb00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e3c9cab2-ab6b-4b82-289a-1ddf7d9bf600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 5364 / ✗ 11
     ✗ no graphql errors
      ↳  99% — ✓ 5364 / ✗ 11
     ✓ valid response structure

     █ setup

     checks.........................: 99.86% ✓ 16092     ✗ 22   
     data_received..................: 473 MB 7.5 MB/s
     data_sent......................: 6.4 MB 101 kB/s
     http_req_blocked...............: avg=2.5ms    min=1.46µs  med=3.6µs    max=113.56ms p(90)=5.55µs   p(95)=10.66ms 
     http_req_connecting............: avg=2.43ms   min=0s      med=0s       max=113.52ms p(90)=0s       p(95)=10.27ms 
     http_req_duration..............: avg=3.39s    min=13.99ms med=2.37s    max=1m0s     p(90)=3.44s    p(95)=4.87s   
       { expected_response:true }...: avg=3.28s    min=13.99ms med=2.36s    max=59.55s   p(90)=3.43s    p(95)=4.75s   
     http_req_failed................: 0.20%  ✓ 11        ✗ 5384 
     http_req_receiving.............: avg=307.88µs min=0s      med=101.99µs max=55.44ms  p(90)=396.31µs p(95)=966.55µs
     http_req_sending...............: avg=1.15ms   min=7.73µs  med=19.99µs  max=69.25ms  p(90)=48.65µs  p(95)=2.29ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.39s    min=13.9ms  med=2.37s    max=1m0s     p(90)=3.44s    p(95)=4.87s   
     http_reqs......................: 5395   85.312312/s
     iteration_duration.............: avg=3.43s    min=350.9ms med=2.4s     max=1m0s     p(90)=3.47s    p(95)=4.89s   
     iterations.....................: 5375   84.996047/s
     vus............................: 42     min=42      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ca807c68-7252-4911-247b-a988304d2d00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2b02699b-d0df-41d1-0d1a-cfc7fc4bb500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9ffbdb5d-a9e0-4d1c-41f0-48c089186c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 15033     ✗ 0    
     data_received..................: 442 MB  7.1 MB/s
     data_sent......................: 6.0 MB  96 kB/s
     http_req_blocked...............: avg=625.68µs min=1.62µs   med=3.43µs  max=47.98ms  p(90)=5.1µs    p(95)=3.16ms  
     http_req_connecting............: avg=589.01µs min=0s       med=0s      max=40.98ms  p(90)=0s       p(95)=3.07ms  
     http_req_duration..............: avg=3.62s    min=11.17ms  med=3.59s   max=8.12s    p(90)=4.11s    p(95)=4.61s   
       { expected_response:true }...: avg=3.62s    min=11.17ms  med=3.59s   max=8.12s    p(90)=4.11s    p(95)=4.61s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5031 
     http_req_receiving.............: avg=1.2ms    min=40.28µs  med=98.29µs max=483.07ms p(90)=248.87µs p(95)=572.22µs
     http_req_sending...............: avg=104.14µs min=9.16µs   med=17.28µs max=32.9ms   p(90)=39.44µs  p(95)=270.68µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.62s    min=11.11ms  med=3.59s   max=8.12s    p(90)=4.11s    p(95)=4.61s   
     http_reqs......................: 5031    81.001619/s
     iteration_duration.............: avg=3.66s    min=322.56ms med=3.62s   max=8.17s    p(90)=4.13s    p(95)=4.64s   
     iterations.....................: 5011    80.679609/s
     vus............................: 74      min=74      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d9ab057d-8de7-4505-5b9a-89dc1833d800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c290226f-346f-4e45-eb99-79d440372d00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8c025d3c-b155-423f-5e5d-fdf19fe5e200/public" alt="HTTP Overview" />


  </details>