## Overview for: `federation/constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/92fdcf22-2bf8-4413-4ad2-11c8f2174000/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  177   | 10794 total, 0 failed | avg: 878ms, p95: 2156ms  | ✅                                                                        |
| grafbase         |  169   | 10363 total, 0 failed | avg: 852ms, p95: 2115ms  | ✅                                                                        |
| apollo-router    |  159   | 9767 total, 0 failed  | avg: 922ms, p95: 2355ms  | ❌ 4 unexpected GraphQL errors, non-compatible response structure (3)     |
| hive-gateway-bun |   92   | 5810 total, 0 failed  | avg: 3120ms, p95: 5413ms | ✅                                                                        |
| apollo-server    |   86   | 5428 total, 70 failed | avg: 3345ms, p95: 3014ms | ❌ 70 failed requests, 70 non-200 responses, 70 unexpected GraphQL errors |
| hive-gateway     |   84   | 5316 total, 12 failed | avg: 3440ms, p95: 4826ms | ❌ 12 failed requests, 12 non-200 responses, 12 unexpected GraphQL errors |
| mercurius        |   80   | 4992 total, 0 failed  | avg: 3633ms, p95: 4797ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32322      ✗ 0    
     data_received..................: 947 MB  16 MB/s
     data_sent......................: 13 MB   210 kB/s
     http_req_blocked...............: avg=1.83ms   min=1.73µs  med=3.4µs    max=2.22s p(90)=5.36µs  p(95)=11.35µs 
     http_req_connecting............: avg=1.56ms   min=0s      med=0s       max=2.22s p(90)=0s      p(95)=0s      
     http_req_duration..............: avg=877.58ms min=3.63ms  med=726.71ms max=4.73s p(90)=1.78s   p(95)=2.15s   
       { expected_response:true }...: avg=877.58ms min=3.63ms  med=726.71ms max=4.73s p(90)=1.78s   p(95)=2.15s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10794
     http_req_receiving.............: avg=271.67ms min=33.3µs  med=90.77µs  max=3.82s p(90)=1.13s   p(95)=1.58s   
     http_req_sending...............: avg=15.58ms  min=8.01µs  med=16.38µs  max=3.41s p(90)=61.22µs p(95)=947.34µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=590.32ms min=3.47ms  med=567.28ms max=2.9s  p(90)=1.02s   p(95)=1.18s   
     http_reqs......................: 10794   177.124174/s
     iteration_duration.............: avg=1.67s    min=23.42ms med=1.41s    max=7.62s p(90)=3.33s   p(95)=4.04s   
     iterations.....................: 10774   176.795984/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2ac42c87-45dc-4223-bbfc-982f7256f200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cc137d7e-701d-4a69-0d7e-b333cd783f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ae8f30a8-3968-49d0-e13a-e33fd1167e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31029      ✗ 0    
     data_received..................: 911 MB  15 MB/s
     data_sent......................: 12 MB   202 kB/s
     http_req_blocked...............: avg=925.2µs  min=1.41µs  med=3.21µs   max=1.62s  p(90)=4.62µs   p(95)=10.08µs
     http_req_connecting............: avg=527.02µs min=0s      med=0s       max=1.35s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=851.75ms min=3.21ms  med=728.53ms max=5.41s  p(90)=1.75s    p(95)=2.11s  
       { expected_response:true }...: avg=851.75ms min=3.21ms  med=728.53ms max=5.41s  p(90)=1.75s    p(95)=2.11s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10363
     http_req_receiving.............: avg=268.88ms min=33.34µs med=88.88µs  max=4.18s  p(90)=1.02s    p(95)=1.46s  
     http_req_sending...............: avg=23.42ms  min=7.69µs  med=14.67µs  max=4.09s  p(90)=127.07µs p(95)=15ms   
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=559.44ms min=3.14ms  med=502.53ms max=3.32s  p(90)=1.01s    p(95)=1.28s  
     http_reqs......................: 10363   169.952008/s
     iteration_duration.............: avg=1.73s    min=24.32ms med=1.5s     max=10.71s p(90)=3.42s    p(95)=4.17s  
     iterations.....................: 10343   169.62401/s
     vus............................: 0       min=0        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/eef7eff9-04b4-4fe8-b3f8-00fe0f82f700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/40d72331-c5d5-4eab-a5fe-7af7b90e9200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/848350d1-4091-41f2-d593-2303c85b4e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 9743 / ✗ 4
     ✗ valid response structure
      ↳  99% — ✓ 9744 / ✗ 3

     █ setup

     checks.........................: 99.97% ✓ 29234      ✗ 7    
     data_received..................: 857 MB 14 MB/s
     data_sent......................: 12 MB  190 kB/s
     http_req_blocked...............: avg=740.91µs min=1.46µs  med=3.25µs   max=1.02s p(90)=4.96µs   p(95)=11.41µs
     http_req_connecting............: avg=622.03µs min=0s      med=0s       max=1.02s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=922.46ms min=6.63ms  med=728.03ms max=6.46s p(90)=1.9s     p(95)=2.35s  
       { expected_response:true }...: avg=922.46ms min=6.63ms  med=728.03ms max=6.46s p(90)=1.9s     p(95)=2.35s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 9767 
     http_req_receiving.............: avg=336.64ms min=34.13µs med=88.53µs  max=4.92s p(90)=1.27s    p(95)=1.81s  
     http_req_sending...............: avg=21.42ms  min=7.65µs  med=15.19µs  max=3.22s p(90)=138.33µs p(95)=11.33ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=564.39ms min=6.56ms  med=496.24ms max=2.3s  p(90)=1.08s    p(95)=1.3s   
     http_reqs......................: 9767   159.793645/s
     iteration_duration.............: avg=1.84s    min=27.66ms med=1.51s    max=10.1s p(90)=3.9s     p(95)=4.73s  
     iterations.....................: 9747   159.466433/s
     vus............................: 60     min=60       max=300
     vus_max........................: 300    min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/64b28850-b2ae-4acf-41b7-d17d07ee3d00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ba93780b-d187-43a1-5227-47db0e8f9f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8cbd5b2c-3955-409b-2b8e-a50fc8612800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17370     ✗ 0    
     data_received..................: 510 MB  8.1 MB/s
     data_sent......................: 6.9 MB  110 kB/s
     http_req_blocked...............: avg=344µs    min=1.46µs  med=3.65µs   max=92.78ms p(90)=5.75µs  p(95)=231.2µs 
     http_req_connecting............: avg=300.83µs min=0s      med=0s       max=17.37ms p(90)=0s      p(95)=110.24µs
     http_req_duration..............: avg=3.11s    min=14.45ms med=2.85s    max=6.97s   p(90)=4.3s    p(95)=5.41s   
       { expected_response:true }...: avg=3.11s    min=14.45ms med=2.85s    max=6.97s   p(90)=4.3s    p(95)=5.41s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5810 
     http_req_receiving.............: avg=37.22ms  min=40.66µs med=182.57µs max=1.93s   p(90)=3.51ms  p(95)=91.65ms 
     http_req_sending...............: avg=573.48µs min=8.84µs  med=18.93µs  max=294.9ms p(90)=69.67µs p(95)=608.27µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.08s    min=14.23ms med=2.84s    max=6.97s   p(90)=4.21s   p(95)=5.38s   
     http_reqs......................: 5810    92.494553/s
     iteration_duration.............: avg=3.17s    min=432.2ms med=2.88s    max=7.04s   p(90)=4.37s   p(95)=5.45s   
     iterations.....................: 5790    92.176156/s
     vus............................: 144     min=144     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8ca516d9-e705-4ad8-6510-11ba7d4a9b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ee54454f-e69b-4644-eaab-47692748f700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8365badf-9731-45ca-dfb8-44d79453b200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5338 / ✗ 70
     ✗ no graphql errors
      ↳  98% — ✓ 5338 / ✗ 70
     ✓ valid response structure

     █ setup

     checks.........................: 99.13% ✓ 16014     ✗ 140  
     data_received..................: 471 MB 7.5 MB/s
     data_sent......................: 6.4 MB 103 kB/s
     http_req_blocked...............: avg=1.28ms   min=1.43µs   med=2.95µs   max=66.52ms p(90)=4.91µs  p(95)=507.41µs
     http_req_connecting............: avg=1.25ms   min=0s       med=0s       max=66.48ms p(90)=0s      p(95)=254.74µs
     http_req_duration..............: avg=3.34s    min=10.95ms  med=2s       max=1m0s    p(90)=2.51s   p(95)=3.01s   
       { expected_response:true }...: avg=2.6s     min=10.95ms  med=1.99s    max=58.95s  p(90)=2.49s   p(95)=2.71s   
     http_req_failed................: 1.28%  ✓ 70        ✗ 5358 
     http_req_receiving.............: avg=269.91µs min=0s       med=103.08µs max=66ms    p(90)=217.6µs p(95)=376.3µs 
     http_req_sending...............: avg=360.42µs min=8.63µs   med=14.87µs  max=39.68ms p(90)=34.43µs p(95)=261.57µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.34s    min=10.87ms  med=2s       max=1m0s    p(90)=2.51s   p(95)=3.01s   
     http_reqs......................: 5428   86.934898/s
     iteration_duration.............: avg=3.37s    min=321.84ms med=2.02s    max=1m0s    p(90)=2.53s   p(95)=3.05s   
     iterations.....................: 5408   86.614578/s
     vus............................: 67     min=67      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ff52594e-5681-4a0e-db77-2bb2007aa500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c3d78c4c-b514-4773-63a1-280aadd2be00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d4456361-6c55-45bd-c1b6-f91969b61000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 5284 / ✗ 12
     ✗ no graphql errors
      ↳  99% — ✓ 5284 / ✗ 12
     ✓ valid response structure

     █ setup

     checks.........................: 99.84% ✓ 15852     ✗ 24   
     data_received..................: 466 MB 7.4 MB/s
     data_sent......................: 6.3 MB 100 kB/s
     http_req_blocked...............: avg=449.98µs min=1.8µs    med=3.91µs   max=22.62ms  p(90)=5.79µs   p(95)=941.21µs
     http_req_connecting............: avg=426µs    min=0s       med=0s       max=22.58ms  p(90)=0s       p(95)=648.84µs
     http_req_duration..............: avg=3.43s    min=13.48ms  med=2.35s    max=1m0s     p(90)=3.48s    p(95)=4.82s   
       { expected_response:true }...: avg=3.31s    min=13.48ms  med=2.35s    max=59.29s   p(90)=3.47s    p(95)=4.76s   
     http_req_failed................: 0.22%  ✓ 12        ✗ 5304 
     http_req_receiving.............: avg=733.92µs min=0s       med=114.77µs max=180.58ms p(90)=525.24µs p(95)=1.52ms  
     http_req_sending...............: avg=187.49µs min=9.26µs   med=23.03µs  max=63.56ms  p(90)=48.08µs  p(95)=227.46µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.43s    min=13.4ms   med=2.35s    max=1m0s     p(90)=3.48s    p(95)=4.82s   
     http_reqs......................: 5316   84.385247/s
     iteration_duration.............: avg=3.47s    min=267.97ms med=2.38s    max=1m0s     p(90)=3.51s    p(95)=4.86s   
     iterations.....................: 5296   84.06777/s
     vus............................: 13     min=13      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/249fff84-f21e-4003-1cd0-948043a5c800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/da526e14-c7f4-4a76-e634-42c7f27c3f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/82207f46-6a31-425a-5c94-96ba5fe0c100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14916     ✗ 0    
     data_received..................: 438 MB  7.1 MB/s
     data_sent......................: 5.9 MB  96 kB/s
     http_req_blocked...............: avg=47.5µs  min=1.72µs   med=3.51µs  max=10.21ms  p(90)=5.52µs   p(95)=123.18µs
     http_req_connecting............: avg=39.83µs min=0s       med=0s      max=10.18ms  p(90)=0s       p(95)=89.33µs 
     http_req_duration..............: avg=3.63s   min=10.83ms  med=3.61s   max=8.49s    p(90)=4.03s    p(95)=4.79s   
       { expected_response:true }...: avg=3.63s   min=10.83ms  med=3.61s   max=8.49s    p(90)=4.03s    p(95)=4.79s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4992 
     http_req_receiving.............: avg=6.51ms  min=40.33µs  med=99.28µs max=863.04ms p(90)=262.62µs p(95)=701.48µs
     http_req_sending...............: avg=68.03µs min=8.55µs   med=18.73µs max=27.45ms  p(90)=34.81µs  p(95)=51.94µs 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.62s   min=10.73ms  med=3.6s    max=8.49s    p(90)=4.03s    p(95)=4.79s   
     http_reqs......................: 4992    80.716524/s
     iteration_duration.............: avg=3.67s   min=183.53ms med=3.63s   max=8.5s     p(90)=4.05s    p(95)=4.81s   
     iterations.....................: 4972    80.393141/s
     vus............................: 219     min=219     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/53b57e39-00ad-4cb9-5982-dbb10c11e800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/17c92b63-a96f-4dd9-9b9d-75af9f0ae000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/613d3f67-4579-450d-335c-a61816e59c00/public" alt="HTTP Overview" />


  </details>