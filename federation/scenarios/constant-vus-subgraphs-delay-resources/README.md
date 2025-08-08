## Overview for: `federation/constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ef6d24ac-d34f-401e-1c18-d8cf4b45e100/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration          | Notes                                                                                                           |
| :--------------- | :----: | :--------------------: | :-----------------------: | :-------------------------------------------------------------------------------------------------------------- |
| cosmo            |  169   | 10443 total, 0 failed  | avg: 1351ms, p95: 3166ms  | ✅                                                                                                               |
| grafbase         |  161   |  9960 total, 0 failed  | avg: 1440ms, p95: 3385ms  | ✅                                                                                                               |
| apollo-router    |  159   | 9777 total, 19 failed  | avg: 1378ms, p95: 3156ms  | ❌ 19 failed requests, 19 non-200 responses, 20 unexpected GraphQL errors, non-compatible response structure (1) |
| hive-gateway     |   96   | 6186 total, 108 failed | avg: 4884ms, p95: 13580ms | ❌ 108 failed requests, 108 non-200 responses, 108 unexpected GraphQL errors                                     |
| hive-gateway-bun |   93   |  5954 total, 0 failed  | avg: 5085ms, p95: 8722ms  | ✅                                                                                                               |
| apollo-server    |   92   | 5804 total, 208 failed | avg: 5230ms, p95: 14436ms | ❌ 208 failed requests, 208 non-200 responses, 208 unexpected GraphQL errors                                     |
| mercurius        |   77   |  4881 total, 0 failed  | avg: 6258ms, p95: 7667ms  | ✅                                                                                                               |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31269      ✗ 0    
     data_received..................: 917 MB  15 MB/s
     data_sent......................: 12 MB   202 kB/s
     http_req_blocked...............: avg=2.65ms   min=1.61µs  med=3.96µs   max=2.25s  p(90)=6.63µs   p(95)=292.03µs
     http_req_connecting............: avg=2.42ms   min=0s      med=0s       max=2.25s  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.35s    min=3.34ms  med=1.17s    max=6.87s  p(90)=2.62s    p(95)=3.16s   
       { expected_response:true }...: avg=1.35s    min=3.34ms  med=1.17s    max=6.87s  p(90)=2.62s    p(95)=3.16s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10443
     http_req_receiving.............: avg=350.5ms  min=33.58µs med=100.17µs max=6.63s  p(90)=1.49s    p(95)=2.3s    
     http_req_sending...............: avg=32.06ms  min=7.48µs  med=19.85µs  max=3.65s  p(90)=186.02µs p(95)=7.31ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=968.58ms min=3.23ms  med=949.14ms max=4.18s  p(90)=1.64s    p(95)=1.95s   
     http_reqs......................: 10443   169.862779/s
     iteration_duration.............: avg=2.87s    min=29.17ms med=2.59s    max=12.07s p(90)=5.28s    p(95)=6.23s   
     iterations.....................: 10423   169.537464/s
     vus............................: 248     min=248      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/519d4c98-9d22-4201-23d0-73e0a18e9300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/eb0b99bb-2091-4283-ae3e-8c32af5c7000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/712b16e0-27cf-4ac1-a04c-6fd194148e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 29820      ✗ 0    
     data_received..................: 875 MB  14 MB/s
     data_sent......................: 12 MB   192 kB/s
     http_req_blocked...............: avg=3.31ms   min=1.88µs  med=4.16µs   max=3.37s  p(90)=6.61µs   p(95)=143.52µs
     http_req_connecting............: avg=2.72ms   min=0s      med=0s       max=3.37s  p(90)=0s       p(95)=91.8µs  
     http_req_duration..............: avg=1.44s    min=3.51ms  med=1.26s    max=8.5s   p(90)=2.81s    p(95)=3.38s   
       { expected_response:true }...: avg=1.44s    min=3.51ms  med=1.26s    max=8.5s   p(90)=2.81s    p(95)=3.38s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 9960 
     http_req_receiving.............: avg=429.47ms min=33.26µs med=104.1µs  max=7.36s  p(90)=1.81s    p(95)=2.23s   
     http_req_sending...............: avg=40.03ms  min=8.2µs   med=21.22µs  max=6.02s  p(90)=373.67µs p(95)=19.65ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=970.71ms min=3.4ms   med=919.51ms max=5.73s  p(90)=1.76s    p(95)=2.16s   
     http_reqs......................: 9960    161.779998/s
     iteration_duration.............: avg=3.02s    min=25.14ms med=2.75s    max=15.13s p(90)=5.68s    p(95)=6.77s   
     iterations.....................: 9940    161.455139/s
     vus............................: 309     min=309      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4453b47c-f9b3-4195-1327-c7582ba30900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e62e90d5-097d-496f-73ee-3531f0e61800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9b802d54-4149-4464-b923-3a8e00de7900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 9738 / ✗ 19
     ✗ no graphql errors
      ↳  99% — ✓ 9737 / ✗ 20
     ✗ valid response structure
      ↳  99% — ✓ 9737 / ✗ 1

     █ setup

     checks.........................: 99.86% ✓ 29212      ✗ 40   
     data_received..................: 856 MB 14 MB/s
     data_sent......................: 12 MB  189 kB/s
     http_req_blocked...............: avg=8.77ms   min=1.43µs  med=3.36µs   max=3.63s  p(90)=5.68µs   p(95)=3.77ms 
     http_req_connecting............: avg=8.1ms    min=0s      med=0s       max=3.63s  p(90)=0s       p(95)=3.26ms 
     http_req_duration..............: avg=1.37s    min=6.69ms  med=1.23s    max=6.95s  p(90)=2.57s    p(95)=3.15s  
       { expected_response:true }...: avg=1.37s    min=6.69ms  med=1.23s    max=6.95s  p(90)=2.57s    p(95)=3.15s  
     http_req_failed................: 0.19%  ✓ 19         ✗ 9758 
     http_req_receiving.............: avg=317.64ms min=0s      med=82.69µs  max=4.26s  p(90)=1.3s     p(95)=1.95s  
     http_req_sending...............: avg=33.19ms  min=7.74µs  med=15.49µs  max=4.58s  p(90)=389.36µs p(95)=18.49ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=1.02s    min=6.62ms  med=969.16ms max=4.39s  p(90)=1.84s    p(95)=2.13s  
     http_reqs......................: 9777   159.173867/s
     iteration_duration.............: avg=3.07s    min=32.78ms med=2.79s    max=13.76s p(90)=5.74s    p(95)=6.69s  
     iterations.....................: 9757   158.848259/s
     vus............................: 259    min=259      max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dd0c0986-0e2f-4606-20b8-dd3a7b96b500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3061474f-2691-405d-5476-24602f3f9000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/353bf08e-80bd-4209-eeec-6b3d06e8c600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 6058 / ✗ 108
     ✗ no graphql errors
      ↳  98% — ✓ 6058 / ✗ 108
     ✓ valid response structure

     █ setup

     checks.........................: 98.82% ✓ 18174     ✗ 216  
     data_received..................: 534 MB 8.4 MB/s
     data_sent......................: 7.3 MB 115 kB/s
     http_req_blocked...............: avg=2.02ms min=1.79µs   med=3.7µs   max=165.04ms p(90)=11.46µs  p(95)=20.52ms
     http_req_connecting............: avg=1.94ms min=0s       med=0s      max=52.91ms  p(90)=0s       p(95)=20.14ms
     http_req_duration..............: avg=4.88s  min=11.97ms  med=2.87s   max=1m0s     p(90)=4.52s    p(95)=13.57s 
       { expected_response:true }...: avg=3.9s   min=11.97ms  med=2.85s   max=59.42s   p(90)=4.25s    p(95)=5.63s  
     http_req_failed................: 1.74%  ✓ 108       ✗ 6078 
     http_req_receiving.............: avg=6.35ms min=0s       med=80.9µs  max=495.82ms p(90)=885.12µs p(95)=8.02ms 
     http_req_sending...............: avg=1.16ms min=8.92µs   med=18.81µs max=269.9ms  p(90)=543.52µs p(95)=5.68ms 
     http_req_tls_handshaking.......: avg=0s     min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=4.87s  min=11.87ms  med=2.87s   max=1m0s     p(90)=4.51s    p(95)=13.57s 
     http_reqs......................: 6186   96.807416/s
     iteration_duration.............: avg=4.98s  min=311.02ms med=2.95s   max=1m0s     p(90)=4.66s    p(95)=14.02s 
     iterations.....................: 6166   96.494428/s
     vus............................: 118    min=118     max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f4a751b9-8d2f-4a35-f68d-23d1a3848b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d804bb93-3b5a-48c3-2cd1-959eef077a00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/83a016d3-9cad-4aca-8bc2-d7017b0b5200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17802     ✗ 0    
     data_received..................: 523 MB  8.2 MB/s
     data_sent......................: 7.1 MB  111 kB/s
     http_req_blocked...............: avg=3.06ms  min=1.76µs   med=3.81µs  max=184.53ms p(90)=12.5µs   p(95)=35.84ms 
     http_req_connecting............: avg=2.94ms  min=0s       med=0s      max=83.21ms  p(90)=0s       p(95)=35.4ms  
     http_req_duration..............: avg=5.08s   min=13.84ms  med=4.56s   max=11.94s   p(90)=7.9s     p(95)=8.72s   
       { expected_response:true }...: avg=5.08s   min=13.84ms  med=4.56s   max=11.94s   p(90)=7.9s     p(95)=8.72s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5954 
     http_req_receiving.............: avg=84.62ms min=37.25µs  med=99.94µs max=3.2s     p(90)=35.11ms  p(95)=566.34ms
     http_req_sending...............: avg=1.18ms  min=9.3µs    med=19.61µs max=375.95ms p(90)=322.32µs p(95)=2.84ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=4.99s   min=13.63ms  med=4.51s   max=11.94s   p(90)=7.84s    p(95)=8.66s   
     http_reqs......................: 5954    93.062638/s
     iteration_duration.............: avg=5.21s   min=443.86ms med=4.67s   max=11.95s   p(90)=8s       p(95)=8.82s   
     iterations.....................: 5934    92.750033/s
     vus............................: 14      min=14      max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/16410d39-66fc-4da7-26fa-eea05bb27c00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2893c086-1d3b-42e3-a3a9-8814c136a300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/87d510c9-153f-462e-6994-0046772e0300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  96% — ✓ 5576 / ✗ 208
     ✗ no graphql errors
      ↳  96% — ✓ 5576 / ✗ 208
     ✓ valid response structure

     █ setup

     checks.........................: 97.57% ✓ 16728     ✗ 416  
     data_received..................: 492 MB 7.8 MB/s
     data_sent......................: 6.9 MB 109 kB/s
     http_req_blocked...............: avg=2.31ms   min=1.41µs  med=2.94µs  max=63.49ms  p(90)=10.34µs p(95)=25.41ms 
     http_req_connecting............: avg=2.05ms   min=0s      med=0s      max=53.52ms  p(90)=0s      p(95)=20.51ms 
     http_req_duration..............: avg=5.23s    min=11.94ms med=2.68s   max=1m0s     p(90)=3.53s   p(95)=14.43s  
       { expected_response:true }...: avg=3.19s    min=11.94ms med=2.67s   max=59.57s   p(90)=3.24s   p(95)=3.83s   
     http_req_failed................: 3.58%  ✓ 208       ✗ 5596 
     http_req_receiving.............: avg=380.53µs min=0s      med=92.98µs max=201.84ms p(90)=211.9µs p(95)=333.25µs
     http_req_sending...............: avg=419.21µs min=8.67µs  med=14.64µs max=83.95ms  p(90)=91.54µs p(95)=1.31ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=5.22s    min=11.76ms med=2.68s   max=1m0s     p(90)=3.53s   p(95)=14.43s  
     http_reqs......................: 5804   92.022825/s
     iteration_duration.............: avg=5.27s    min=407ms   med=2.71s   max=1m0s     p(90)=3.56s   p(95)=15.15s  
     iterations.....................: 5784   91.705723/s
     vus............................: 23     min=23      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/760350e1-8670-4f9d-bca9-66ec1aa7de00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c6d763d9-90cc-435e-3762-021227bcb700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/62089554-0fbc-413a-32b5-5edf435c9300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14583     ✗ 0    
     data_received..................: 428 MB  6.8 MB/s
     data_sent......................: 5.8 MB  92 kB/s
     http_req_blocked...............: avg=1.54ms   min=1.59µs   med=3.53µs  max=39.83ms  p(90)=148.71µs p(95)=16.57ms 
     http_req_connecting............: avg=1.51ms   min=0s       med=0s      max=39.81ms  p(90)=106.35µs p(95)=16.33ms 
     http_req_duration..............: avg=6.25s    min=12.11ms  med=6.17s   max=11.79s   p(90)=7.32s    p(95)=7.66s   
       { expected_response:true }...: avg=6.25s    min=12.11ms  med=6.17s   max=11.79s   p(90)=7.32s    p(95)=7.66s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4881 
     http_req_receiving.............: avg=9.17ms   min=36.44µs  med=94.13µs max=1.15s    p(90)=286.52µs p(95)=751.61µs
     http_req_sending...............: avg=261.81µs min=8.94µs   med=19.25µs max=184.19ms p(90)=153.49µs p(95)=1.24ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=6.24s    min=12.02ms  med=6.17s   max=11.79s   p(90)=7.32s    p(95)=7.66s   
     http_reqs......................: 4881    77.60583/s
     iteration_duration.............: avg=6.31s    min=471.29ms med=6.19s   max=11.8s    p(90)=7.35s    p(95)=7.69s   
     iterations.....................: 4861    77.287838/s
     vus............................: 195     min=195     max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5b8ebb59-2eee-479f-1508-8f4277c62700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5e4526bc-3028-491c-c88e-cbebf28a8400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6437f738-4a5e-4d59-3cf0-fb9713e0d700/public" alt="HTTP Overview" />


  </details>