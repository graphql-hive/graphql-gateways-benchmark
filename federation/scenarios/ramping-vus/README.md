## Overview for: `federation/ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was trying to reach 2000 concurrent VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4d334be7-b31a-4b81-75e2-5882d0463800/public" alt="Comparison" />


| Gateway          | duration(p95)⬇️ |  RPS  |        Requests         |                       Durations                        | Notes                                                                                                              |
| :--------------- | :-------------: | :---: | :---------------------: | :----------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------- |
| grafbase         |     5488ms      |  169  |  11849 total, 0 failed  |  avg: 2364ms, p95: 5488ms, max: 10638ms, med: 2246ms   | ✅                                                                                                                  |
| cosmo            |     6441ms      |  179  |  12731 total, 0 failed  |  avg: 2577ms, p95: 6442ms, max: 15749ms, med: 2366ms   | ✅                                                                                                                  |
| apollo-router    |     6934ms      |  154  | 11171 total, 632 failed |  avg: 2818ms, p95: 6935ms, max: 18738ms, med: 2323ms   | ❌ 632 failed requests, 632 non-200 responses, 648 unexpected GraphQL errors, non-compatible response structure (7) |
| hive-gateway-bun |     27357ms     |  94   |  7644 total, 0 failed   | avg: 11206ms, p95: 27357ms, max: 35661ms, med: 9827ms  | ✅                                                                                                                  |
| mercurius        |     45118ms     |  38   | 3647 total, 206 failed  | avg: 17722ms, p95: 45118ms, max: 54247ms, med: 14049ms | ❌ 206 failed requests, 195 non-200 responses, 195 unexpected GraphQL errors                                        |
| hive-gateway     |     52801ms     |  81   |  7302 total, 0 failed   | avg: 13054ms, p95: 52801ms, max: 58719ms, med: 3447ms  | ✅                                                                                                                  |
| apollo-server    |     59999ms     |  83   | 7735 total, 511 failed  | avg: 11766ms, p95: 60000ms, max: 60097ms, med: 2216ms  | ❌ 511 failed requests, 511 non-200 responses, 511 unexpected GraphQL errors                                        |



<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 35487      ✗ 0     
     data_received..................: 1.0 GB  15 MB/s
     data_sent......................: 14 MB   201 kB/s
     http_req_blocked...............: avg=304.58ms min=1.41µs  med=3.68µs  max=10.08s p(90)=903.75ms p(95)=2.57s   
     http_req_connecting............: avg=300.81ms min=0s      med=0s      max=9.82s  p(90)=876.61ms p(95)=2.56s   
     http_req_duration..............: avg=2.36s    min=2.93ms  med=2.24s   max=10.63s p(90)=4.51s    p(95)=5.48s   
       { expected_response:true }...: avg=2.36s    min=2.93ms  med=2.24s   max=10.63s p(90)=4.51s    p(95)=5.48s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 11849 
     http_req_receiving.............: avg=204.41ms min=28.16µs med=77.84µs max=7.45s  p(90)=1.09s    p(95)=1.44s   
     http_req_sending...............: avg=137.16ms min=7.87µs  med=18.05µs max=10.23s p(90)=372.41ms p(95)=898.36ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.02s    min=2.87ms  med=1.84s   max=8.95s  p(90)=3.82s    p(95)=4.6s    
     http_reqs......................: 11849   169.008509/s
     iteration_duration.............: avg=5.96s    min=11.28ms med=4.91s   max=28.22s p(90)=12.85s   p(95)=15.12s  
     iterations.....................: 11829   168.723238/s
     vus............................: 4       min=4        max=1969
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fbdd389d-3f5c-4955-e6e0-ba5775601100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ac95c79e-fa4a-448f-f747-56428d34cd00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b38e99ad-51d8-4c70-26cd-5a523ae09c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 38133      ✗ 0     
     data_received..................: 1.1 GB  16 MB/s
     data_sent......................: 15 MB   213 kB/s
     http_req_blocked...............: avg=270.99ms min=1.53µs  med=3.39µs  max=10.37s p(90)=576.99ms p(95)=2.37s   
     http_req_connecting............: avg=267.65ms min=0s      med=0s      max=10.37s p(90)=513.32ms p(95)=2.36s   
     http_req_duration..............: avg=2.57s    min=3.57ms  med=2.36s   max=15.74s p(90)=5.03s    p(95)=6.44s   
       { expected_response:true }...: avg=2.57s    min=3.57ms  med=2.36s   max=15.74s p(90)=5.03s    p(95)=6.44s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 12731 
     http_req_receiving.............: avg=461.22ms min=32.97µs med=90.58µs max=11.39s p(90)=1.35s    p(95)=2.7s    
     http_req_sending...............: avg=129.25ms min=7.76µs  med=15.74µs max=8.37s  p(90)=274.79ms p(95)=784.08ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.98s    min=3.41ms  med=1.82s   max=10.07s p(90)=4.19s    p(95)=4.94s   
     http_reqs......................: 12731   179.289648/s
     iteration_duration.............: avg=5.78s    min=29.29ms med=4.94s   max=37.39s p(90)=11.8s    p(95)=14.16s  
     iterations.....................: 12711   179.00799/s
     vus............................: 5       min=5        max=1982
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e0462d0f-8a9b-4e65-5456-44ca5cd56b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/28bf3066-a0b2-44c4-5d73-968e10e81500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0014d5bc-d06b-4e0b-0b23-cb0ac7296a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  94% — ✓ 10519 / ✗ 632
     ✗ no graphql errors
      ↳  94% — ✓ 10503 / ✗ 648
     ✗ valid response structure
      ↳  99% — ✓ 10512 / ✗ 7

     █ setup

     checks.........................: 96.07% ✓ 31534      ✗ 1287  
     data_received..................: 925 MB 13 MB/s
     data_sent......................: 13 MB  184 kB/s
     http_req_blocked...............: avg=559.45ms min=1.89µs  med=5.22µs   max=13.03s p(90)=2.27s    p(95)=3.66s 
     http_req_connecting............: avg=532.88ms min=0s      med=0s       max=10.43s p(90)=2.21s    p(95)=3.55s 
     http_req_duration..............: avg=2.81s    min=7.49ms  med=2.32s    max=18.73s p(90)=5.84s    p(95)=6.93s 
       { expected_response:true }...: avg=2.81s    min=7.49ms  med=2.3s     max=18.73s p(90)=5.85s    p(95)=6.97s 
     http_req_failed................: 5.65%  ✓ 632        ✗ 10539 
     http_req_receiving.............: avg=679.09ms min=0s      med=106.63µs max=13.81s p(90)=3.04s    p(95)=4.11s 
     http_req_sending...............: avg=231.32ms min=8.72µs  med=28.99µs  max=11.04s p(90)=438.82ms p(95)=1.06s 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=1.9s     min=7.36ms  med=1.79s    max=14.46s p(90)=3.59s    p(95)=4.05s 
     http_reqs......................: 11171  154.61074/s
     iteration_duration.............: avg=6.61s    min=40.95ms med=6.02s    max=35.41s p(90)=12.69s   p(95)=15.11s
     iterations.....................: 11151  154.333933/s
     vus............................: 430    min=61       max=2000
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e8144225-fb7a-4b04-8c29-41d5dbff7a00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0a29dbfe-340d-4069-6b1d-9778e089d600/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/901421af-450d-4bd3-f43f-d54bc203e700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 22872     ✗ 0     
     data_received..................: 671 MB  8.3 MB/s
     data_sent......................: 9.1 MB  112 kB/s
     http_req_blocked...............: avg=14.93ms  min=1.83µs   med=4.29µs   max=926.4ms  p(90)=24.14ms p(95)=102.87ms
     http_req_connecting............: avg=14.77ms  min=0s       med=0s       max=926.33ms p(90)=23.69ms p(95)=102.35ms
     http_req_duration..............: avg=11.2s    min=15.4ms   med=9.82s    max=35.66s   p(90)=24.06s  p(95)=27.35s  
       { expected_response:true }...: avg=11.2s    min=15.4ms   med=9.82s    max=35.66s   p(90)=24.06s  p(95)=27.35s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 7644  
     http_req_receiving.............: avg=114.07ms min=40.75µs  med=107.49µs max=8.09s    p(90)=4.49ms  p(95)=150.7ms 
     http_req_sending...............: avg=9.62ms   min=8.5µs    med=24.86µs  max=1.11s    p(90)=11.91ms p(95)=40.52ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=11.08s   min=15.2ms   med=9.7s     max=35.5s    p(90)=24.04s  p(95)=27.29s  
     http_reqs......................: 7644    94.500341/s
     iteration_duration.............: avg=11.52s   min=198.09ms med=10s      max=38.17s   p(90)=24.78s  p(95)=28.42s  
     iterations.....................: 7624    94.253087/s
     vus............................: 105     min=57      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d0c7e4b5-73f4-437f-61f1-b2249d5f0000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/613c5ac0-2734-4a67-b05e-8eb4b1e8a100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7970bafa-9238-47d1-4fc0-8ab9f15cec00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  94% — ✓ 3421 / ✗ 195
     ✗ no graphql errors
      ↳  94% — ✓ 3421 / ✗ 195
     ✓ valid response structure

     █ setup

     checks.........................: 96.33% ✓ 10263     ✗ 390   
     data_received..................: 302 MB 3.2 MB/s
     data_sent......................: 5.8 MB 62 kB/s
     http_req_blocked...............: avg=306.25µs min=1.94µs   med=5.04µs   max=13.58ms p(90)=610.18µs p(95)=1.03ms  
     http_req_connecting............: avg=268.01µs min=0s       med=0s       max=13.52ms p(90)=532.03µs p(95)=864µs   
     http_req_duration..............: avg=17.72s   min=12.32ms  med=14.04s   max=54.24s  p(90)=44.04s   p(95)=45.11s  
       { expected_response:true }...: avg=16.17s   min=12.32ms  med=12.85s   max=45.65s  p(90)=34.99s   p(95)=44.77s  
     http_req_failed................: 5.64%  ✓ 206       ✗ 3441  
     http_req_receiving.............: avg=229.41µs min=0s       med=117.53µs max=47.19ms p(90)=297.4µs  p(95)=519.94µs
     http_req_sending...............: avg=82.4µs   min=9.25µs   med=31.16µs  max=16.96ms p(90)=81.24µs  p(95)=130.7µs 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=17.72s   min=11.91ms  med=14.04s   max=54.24s  p(90)=44.04s   p(95)=45.11s  
     http_reqs......................: 3647   38.42684/s
     iteration_duration.............: avg=17.77s   min=430.04ms med=14.08s   max=54.26s  p(90)=44.2s    p(95)=45.14s  
     iterations.....................: 3616   38.100207/s
     vus............................: 212    min=60      max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/78ea3efe-b110-45f4-cbb8-6ee7b99a7700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/377e525e-782b-4527-1c95-0b83bc85c100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/20b0eed6-4485-4cc8-0f09-e60263b25400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 21846     ✗ 0     
     data_received..................: 641 MB  7.1 MB/s
     data_sent......................: 8.7 MB  96 kB/s
     http_req_blocked...............: avg=2.76ms   min=1.81µs  med=5.17µs   max=225.88ms p(90)=1.83ms   p(95)=10.83ms
     http_req_connecting............: avg=2.7ms    min=0s      med=0s       max=225.74ms p(90)=1.62ms   p(95)=10.59ms
     http_req_duration..............: avg=13.05s   min=16.42ms med=3.44s    max=58.71s   p(90)=47.08s   p(95)=52.8s  
       { expected_response:true }...: avg=13.05s   min=16.42ms med=3.44s    max=58.71s   p(90)=47.08s   p(95)=52.8s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 7302  
     http_req_receiving.............: avg=998.29µs min=39.61µs med=121.45µs max=289.4ms  p(90)=921.65µs p(95)=2.74ms 
     http_req_sending...............: avg=1.11ms   min=9.05µs  med=31.51µs  max=148.78ms p(90)=199.83µs p(95)=2.8ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=13.05s   min=16.16ms med=3.44s    max=58.71s   p(90)=47.08s   p(95)=52.8s  
     http_reqs......................: 7302    81.107607/s
     iteration_duration.............: avg=13.13s   min=62.27ms med=3.49s    max=58.79s   p(90)=47.14s   p(95)=52.83s 
     iterations.....................: 7282    80.885455/s
     vus............................: 28      min=28      max=1999
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d9e0edb1-a2ad-4208-a8d2-d34490f0b100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e7917e79-ac5c-4fa9-65a0-b3e1803a4300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8b01d6e0-b04b-4aac-e27e-f9a4c145e900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  93% — ✓ 7204 / ✗ 511
     ✗ no graphql errors
      ↳  93% — ✓ 7204 / ✗ 511
     ✓ valid response structure

     █ setup

     checks.........................: 95.48% ✓ 21612     ✗ 1022  
     data_received..................: 635 MB 6.9 MB/s
     data_sent......................: 9.3 MB 100 kB/s
     http_req_blocked...............: avg=497.21µs min=1.49µs  med=3.31µs   max=97.47ms  p(90)=412.01µs p(95)=721.74µs
     http_req_connecting............: avg=472.13µs min=0s      med=0s       max=97.32ms  p(90)=335.24µs p(95)=609.74µs
     http_req_duration..............: avg=11.76s   min=10.72ms med=2.21s    max=1m0s     p(90)=55.56s   p(95)=59.99s  
       { expected_response:true }...: avg=8.35s    min=10.72ms med=2.14s    max=59.96s   p(90)=36.2s    p(95)=46.27s  
     http_req_failed................: 6.60%  ✓ 511       ✗ 7224  
     http_req_receiving.............: avg=186.76µs min=0s      med=105.99µs max=103.27ms p(90)=228.15µs p(95)=382.7µs 
     http_req_sending...............: avg=203.72µs min=8.14µs  med=15.92µs  max=46.01ms  p(90)=69.16µs  p(95)=133.23µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=11.76s   min=10.64ms med=2.21s    max=1m0s     p(90)=55.56s   p(95)=59.99s  
     http_reqs......................: 7735   83.463835/s
     iteration_duration.............: avg=11.8s    min=56.48ms med=2.23s    max=1m0s     p(90)=55.61s   p(95)=1m0s    
     iterations.....................: 7715   83.248027/s
     vus............................: 101    min=62      max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/051ecae5-df00-4b3d-8f27-1c9a01bbc900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cc642c0d-bed4-4af3-dbe7-3926f76ec100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/175a33b6-7b4d-4d6b-1c2f-a3c82e2f9100/public" alt="HTTP Overview" />


  </details>