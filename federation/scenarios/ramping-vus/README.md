## Overview for: `federation/ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was trying to reach 2000 concurrent VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ceb85dd7-ab4d-432e-8f6c-c38a787bf600/public" alt="Comparison" />


| Gateway          | duration(p95)⬇️ |  RPS  |        Requests         |                       Durations                        | Notes                                                                                                               |
| :--------------- | :-------------: | :---: | :---------------------: | :----------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------ |
| cosmo            |     5095ms      |  172  |  12061 total, 0 failed  |  avg: 2268ms, p95: 5096ms, max: 13918ms, med: 2015ms   | ✅                                                                                                                   |
| apollo-router    |     5400ms      |  165  | 11704 total, 603 failed |  avg: 2225ms, p95: 5401ms, max: 13198ms, med: 1942ms   | ❌ 603 failed requests, 603 non-200 responses, 626 unexpected GraphQL errors, non-compatible response structure (13) |
| grafbase         |     7885ms      |  165  |  12104 total, 0 failed  |  avg: 3175ms, p95: 7885ms, max: 19909ms, med: 2695ms   | ✅                                                                                                                   |
| hive-gateway-bun |     28943ms     |  89   |  7360 total, 0 failed   | avg: 12030ms, p95: 28944ms, max: 43432ms, med: 10400ms | ✅                                                                                                                   |
| mercurius        |     40763ms     |  55   |  5013 total, 0 failed   | avg: 21518ms, p95: 40763ms, max: 41625ms, med: 20971ms | ✅                                                                                                                   |
| hive-gateway     |     51785ms     |  84   |  7438 total, 0 failed   | avg: 12516ms, p95: 51785ms, max: 58323ms, med: 3386ms  | ✅                                                                                                                   |
| apollo-server    |     59999ms     |  81   | 7589 total, 518 failed  | avg: 12332ms, p95: 60000ms, max: 60304ms, med: 2232ms  | ❌ 518 failed requests, 518 non-200 responses, 518 unexpected GraphQL errors                                         |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 36123      ✗ 0     
     data_received..................: 1.1 GB  15 MB/s
     data_sent......................: 14 MB   204 kB/s
     http_req_blocked...............: avg=319.19ms min=1.58µs  med=4.01µs  max=11.75s p(90)=1.19s    p(95)=2.09s   
     http_req_connecting............: avg=310.85ms min=0s      med=0s      max=11.07s p(90)=1.15s    p(95)=2.09s   
     http_req_duration..............: avg=2.26s    min=3.26ms  med=2.01s   max=13.91s p(90)=4.31s    p(95)=5.09s   
       { expected_response:true }...: avg=2.26s    min=3.26ms  med=2.01s   max=13.91s p(90)=4.31s    p(95)=5.09s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 12061 
     http_req_receiving.............: avg=295.53ms min=33.98µs med=82.11µs max=9.57s  p(90)=715.5ms  p(95)=2.02s   
     http_req_sending...............: avg=127.1ms  min=8.85µs  med=19.2µs  max=10.96s p(90)=279.54ms p(95)=783.97ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.84s    min=3.15ms  med=1.75s   max=9.61s  p(90)=3.79s    p(95)=4.35s   
     http_reqs......................: 12061   172.027552/s
     iteration_duration.............: avg=5.71s    min=21.21ms med=4.67s   max=29.75s p(90)=12.24s   p(95)=14.57s  
     iterations.....................: 12041   171.74229/s
     vus............................: 5       min=5        max=1985
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9321ee97-dcfa-4737-2988-34214d7dbb00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f974d84e-3868-4b15-84a2-987620359800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/71ae83a4-cd3f-4130-c289-ec4580f7e500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  94% — ✓ 11081 / ✗ 603
     ✗ no graphql errors
      ↳  94% — ✓ 11058 / ✗ 626
     ✗ valid response structure
      ↳  99% — ✓ 11068 / ✗ 13

     █ setup

     checks.........................: 96.39% ✓ 33207      ✗ 1242  
     data_received..................: 974 MB 14 MB/s
     data_sent......................: 14 MB  197 kB/s
     http_req_blocked...............: avg=446.55ms min=1.45µs  med=3.71µs  max=9.54s  p(90)=1.78s    p(95)=3.11s   
     http_req_connecting............: avg=422.99ms min=0s      med=0s      max=7.78s  p(90)=1.77s    p(95)=2.98s   
     http_req_duration..............: avg=2.22s    min=6.83ms  med=1.94s   max=13.19s p(90)=4.44s    p(95)=5.4s    
       { expected_response:true }...: avg=2.22s    min=6.83ms  med=1.93s   max=13.19s p(90)=4.45s    p(95)=5.43s   
     http_req_failed................: 5.15%  ✓ 603        ✗ 11101 
     http_req_receiving.............: avg=150.02ms min=0s      med=73.44µs max=9.66s  p(90)=140.4ms  p(95)=773.12ms
     http_req_sending...............: avg=137.32ms min=8.28µs  med=17.99µs max=6.29s  p(90)=390.81ms p(95)=803.61ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.93s    min=6.76ms  med=1.75s   max=8.73s  p(90)=3.58s    p(95)=4.69s   
     http_reqs......................: 11704  165.680355/s
     iteration_duration.............: avg=6.21s    min=22.48ms med=5.64s   max=24.93s p(90)=11.98s   p(95)=13.7s   
     iterations.....................: 11684  165.397237/s
     vus............................: 2      min=2        max=1979
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d9a3203e-cfb6-4f24-521c-a276b1aa6400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/732d8c43-9df4-4b9e-5297-4c507a02fe00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9f577f47-d053-4ea6-d0c5-7298c6b6a500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 36252      ✗ 0     
     data_received..................: 1.1 GB  15 MB/s
     data_sent......................: 14 MB   197 kB/s
     http_req_blocked...............: avg=284.58ms min=1.58µs  med=3.59µs  max=12.65s p(90)=739.63ms p(95)=2.37s   
     http_req_connecting............: avg=281.21ms min=0s      med=0s      max=12.65s p(90)=726.16ms p(95)=2.36s   
     http_req_duration..............: avg=3.17s    min=3.64ms  med=2.69s   max=19.9s  p(90)=6.34s    p(95)=7.88s   
       { expected_response:true }...: avg=3.17s    min=3.64ms  med=2.69s   max=19.9s  p(90)=6.34s    p(95)=7.88s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 12104 
     http_req_receiving.............: avg=538.62ms min=32.51µs med=84.19µs max=17.03s p(90)=1.59s    p(95)=3.27s   
     http_req_sending...............: avg=180.42ms min=8.52µs  med=15.96µs max=17s    p(90)=293.99ms p(95)=843.98ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.45s    min=3.58ms  med=1.8s    max=10.05s p(90)=5.64s    p(95)=6.26s   
     http_reqs......................: 12104   165.865273/s
     iteration_duration.............: avg=6.01s    min=24.83ms med=5.28s   max=26.7s  p(90)=12.02s   p(95)=14.51s  
     iterations.....................: 12084   165.591206/s
     vus............................: 135     min=70       max=1998
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3c7f941d-6d84-401b-e2ca-c79a76fbc000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0735632c-3b1b-4935-094c-d1376b2c6600/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/16855fa2-aa29-4373-79bd-a614e04fd800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 22020     ✗ 0     
     data_received..................: 646 MB  7.8 MB/s
     data_sent......................: 8.7 MB  106 kB/s
     http_req_blocked...............: avg=10.79ms  min=1.79µs   med=4.93µs   max=650.89ms p(90)=15.91ms  p(95)=75.95ms
     http_req_connecting............: avg=10.34ms  min=0s       med=0s       max=612.81ms p(90)=15.07ms  p(95)=75.67ms
     http_req_duration..............: avg=12.02s   min=20.08ms  med=10.4s    max=43.43s   p(90)=25.54s   p(95)=28.94s 
       { expected_response:true }...: avg=12.02s   min=20.08ms  med=10.4s    max=43.43s   p(90)=25.54s   p(95)=28.94s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 7360  
     http_req_receiving.............: avg=219.56ms min=41.5µs   med=197.82µs max=7.79s    p(90)=123.46ms p(95)=1.86s  
     http_req_sending...............: avg=6.99ms   min=8.78µs   med=30.08µs  max=1.11s    p(90)=10.18ms  p(95)=32.5ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=11.8s    min=19.13ms  med=10.33s   max=40.65s   p(90)=25.52s   p(95)=28.83s 
     http_reqs......................: 7360    89.012119/s
     iteration_duration.............: avg=12.35s   min=243.31ms med=10.49s   max=43.84s   p(90)=26.03s   p(95)=29.45s 
     iterations.....................: 7340    88.770238/s
     vus............................: 45      min=0       max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6aa837ea-baa2-479f-81b4-c9e1db66c900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/03149f69-822f-464f-e063-78fc41dcb900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7433520c-dbb6-4dbc-24de-b1a3b48a4c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14979     ✗ 0     
     data_received..................: 440 MB  4.8 MB/s
     data_sent......................: 6.0 MB  66 kB/s
     http_req_blocked...............: avg=264.54µs min=1.82µs   med=4.81µs   max=20.39ms p(90)=580.74µs p(95)=927.68µs
     http_req_connecting............: avg=230.69µs min=0s       med=0s       max=20.33ms p(90)=506.37µs p(95)=815.89µs
     http_req_duration..............: avg=21.51s   min=14.51ms  med=20.97s   max=41.62s  p(90)=39.29s   p(95)=40.76s  
       { expected_response:true }...: avg=21.51s   min=14.51ms  med=20.97s   max=41.62s  p(90)=39.29s   p(95)=40.76s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 5013  
     http_req_receiving.............: avg=15.05ms  min=33.41µs  med=109.28µs max=1.8s    p(90)=451.36µs p(95)=1.68ms  
     http_req_sending...............: avg=70.01µs  min=7.8µs    med=29.37µs  max=34.46ms p(90)=73.41µs  p(95)=111.12µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=21.5s    min=14.33ms  med=20.97s   max=41.62s  p(90)=39.22s   p(95)=40.76s  
     http_reqs......................: 5013    55.072673/s
     iteration_duration.............: avg=21.76s   min=116.81ms med=21.01s   max=41.63s  p(90)=39.84s   p(95)=40.83s  
     iterations.....................: 4993    54.852953/s
     vus............................: 187     min=57      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/51d6489c-c5c4-4fef-7f80-d8ba1aedef00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9d760684-910a-4b22-427f-41e8ccc50000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5d0c4d3a-285e-412b-1f52-76c52cddd000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 22254     ✗ 0     
     data_received..................: 653 MB  7.4 MB/s
     data_sent......................: 8.8 MB  100 kB/s
     http_req_blocked...............: avg=3.09ms   min=1.93µs  med=4.78µs   max=279.88ms p(90)=2.45ms   p(95)=18.64ms
     http_req_connecting............: avg=3.03ms   min=0s      med=0s       max=279.81ms p(90)=2.13ms   p(95)=18.01ms
     http_req_duration..............: avg=12.51s   min=14.12ms med=3.38s    max=58.32s   p(90)=44.92s   p(95)=51.78s 
       { expected_response:true }...: avg=12.51s   min=14.12ms med=3.38s    max=58.32s   p(90)=44.92s   p(95)=51.78s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 7438  
     http_req_receiving.............: avg=847.35µs min=40.26µs med=110.93µs max=213.78ms p(90)=809.25µs p(95)=2.67ms 
     http_req_sending...............: avg=1.24ms   min=8.76µs  med=29.19µs  max=168.97ms p(90)=234.3µs  p(95)=4.32ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=12.51s   min=13.99ms med=3.38s    max=58.31s   p(90)=44.92s   p(95)=51.78s 
     http_reqs......................: 7438    84.150526/s
     iteration_duration.............: avg=12.6s    min=72.01ms med=3.42s    max=58.79s   p(90)=44.96s   p(95)=51.84s 
     iterations.....................: 7418    83.924254/s
     vus............................: 48      min=48      max=1999
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ea2e8e51-09fe-4a9e-85c3-411e29c33700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ea0c4f51-d3a4-467d-2190-29340cfbcf00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d1aa07d8-c558-463c-4901-e1e21c9c9800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  93% — ✓ 7051 / ✗ 518
     ✗ no graphql errors
      ↳  93% — ✓ 7051 / ✗ 518
     ✓ valid response structure

     █ setup

     checks.........................: 95.33% ✓ 21153     ✗ 1036  
     data_received..................: 622 MB 6.7 MB/s
     data_sent......................: 9.0 MB 98 kB/s
     http_req_blocked...............: avg=1.06ms   min=1.56µs  med=3.88µs   max=275.43ms p(90)=434.51µs p(95)=888.23µs
     http_req_connecting............: avg=1.03ms   min=0s      med=0s       max=275.37ms p(90)=361.1µs  p(95)=764.94µs
     http_req_duration..............: avg=12.33s   min=11.02ms med=2.23s    max=1m0s     p(90)=56.06s   p(95)=59.99s  
       { expected_response:true }...: avg=8.84s    min=11.02ms med=2.17s    max=59.98s   p(90)=38.17s   p(95)=49.88s  
     http_req_failed................: 6.82%  ✓ 518       ✗ 7071  
     http_req_receiving.............: avg=329.17µs min=0s      med=109.56µs max=241.86ms p(90)=242.09µs p(95)=394.37µs
     http_req_sending...............: avg=400.68µs min=8.73µs  med=20.61µs  max=119.57ms p(90)=73.13µs  p(95)=150.02µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=12.33s   min=10.9ms  med=2.23s    max=1m0s     p(90)=56.06s   p(95)=59.99s  
     http_reqs......................: 7589   81.87944/s
     iteration_duration.............: avg=12.38s   min=58.87ms med=2.25s    max=1m0s     p(90)=56.11s   p(95)=1m0s    
     iterations.....................: 7569   81.663655/s
     vus............................: 53     min=53      max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9a458b66-189e-49d1-1972-1ba7fe47ef00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8eae860d-1033-4095-409a-b80330240b00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8b4dbc9f-a41a-4b31-376a-acd3397a6600/public" alt="HTTP Overview" />


  </details>