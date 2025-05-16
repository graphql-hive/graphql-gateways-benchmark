## Overview for: `federation/constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/af2b132d-9b84-4e5c-5584-7b65776cb300/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  176   | 10760 total, 0 failed | avg: 821ms, p95: 2145ms  | ✅                                                                        |
| grafbase         |  170   | 10387 total, 0 failed | avg: 836ms, p95: 2290ms  | ✅                                                                        |
| apollo-router    |  158   | 9642 total, 0 failed  | avg: 955ms, p95: 2575ms  | ✅                                                                        |
| hive-gateway-bun |   93   | 5900 total, 0 failed  | avg: 3059ms, p95: 5013ms | ✅                                                                        |
| hive-gateway     |   88   | 5553 total, 4 failed  | avg: 3285ms, p95: 4662ms | ❌ 4 failed requests, 4 non-200 responses, 4 unexpected GraphQL errors    |
| apollo-server    |   87   | 5495 total, 68 failed | avg: 3314ms, p95: 3214ms | ❌ 68 failed requests, 68 non-200 responses, 68 unexpected GraphQL errors |
| mercurius        |   79   | 4915 total, 0 failed  | avg: 3696ms, p95: 4823ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32220      ✗ 0    
     data_received..................: 944 MB  16 MB/s
     data_sent......................: 13 MB   210 kB/s
     http_req_blocked...............: avg=856.06µs min=1.66µs  med=3.4µs    max=1.36s    p(90)=5.2µs    p(95)=11.14µs
     http_req_connecting............: avg=505.37µs min=0s      med=0s       max=831.66ms p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=821.08ms min=3.13ms  med=665.36ms max=5.96s    p(90)=1.7s     p(95)=2.14s  
       { expected_response:true }...: avg=821.08ms min=3.13ms  med=665.36ms max=5.96s    p(90)=1.7s     p(95)=2.14s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10760
     http_req_receiving.............: avg=284.1ms  min=33.64µs med=92.2µs   max=5.28s    p(90)=1.11s    p(95)=1.61s  
     http_req_sending...............: avg=23.12ms  min=7.91µs  med=15.83µs  max=3.1s     p(90)=119.99µs p(95)=5.77ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=513.85ms min=3.05ms  med=466.43ms max=2.7s     p(90)=944.34ms p(95)=1.1s   
     http_reqs......................: 10760   176.461926/s
     iteration_duration.............: avg=1.67s    min=25.93ms med=1.37s    max=10.07s   p(90)=3.51s    p(95)=4.16s  
     iterations.....................: 10740   176.13393/s
     vus............................: 2       min=2        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2a783001-3e19-44b7-b5bc-17a47db59b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/87d95bd5-1cd5-44ae-d387-964f6c9b5800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d55c5e87-7031-462c-750d-b92f71761100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31101      ✗ 0    
     data_received..................: 913 MB  15 MB/s
     data_sent......................: 12 MB   202 kB/s
     http_req_blocked...............: avg=1.95ms   min=1.36µs  med=3.45µs   max=2.78s p(90)=5.18µs   p(95)=10.41µs
     http_req_connecting............: avg=1.62ms   min=0s      med=0s       max=2.78s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=836.11ms min=3.01ms  med=671.6ms  max=4.66s p(90)=1.78s    p(95)=2.28s  
       { expected_response:true }...: avg=836.11ms min=3.01ms  med=671.6ms  max=4.66s p(90)=1.78s    p(95)=2.28s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10387
     http_req_receiving.............: avg=277.57ms min=31.38µs med=88.31µs  max=4.23s p(90)=1.17s    p(95)=1.63s  
     http_req_sending...............: avg=32.79ms  min=7.87µs  med=17.38µs  max=3.46s p(90)=140.75µs p(95)=44.88ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=525.74ms min=2.94ms  med=453.18ms max=3.35s p(90)=992.83ms p(95)=1.18s  
     http_reqs......................: 10387   170.212373/s
     iteration_duration.............: avg=1.71s    min=17.43ms med=1.48s    max=8.65s p(90)=3.48s    p(95)=4.15s  
     iterations.....................: 10367   169.884632/s
     vus............................: 37      min=37       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c1b1b198-b61c-4fac-21c0-7a44b77fcc00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7e9998d1-4dfe-4d05-5487-49b72d424800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f40ce574-3df9-47b6-95a3-4cb03f5b3200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 28866      ✗ 0    
     data_received..................: 846 MB  14 MB/s
     data_sent......................: 11 MB   189 kB/s
     http_req_blocked...............: avg=1.83ms   min=1.48µs  med=3.23µs   max=1.79s  p(90)=4.98µs   p(95)=11.36µs
     http_req_connecting............: avg=1.54ms   min=0s      med=0s       max=1.79s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=955.17ms min=6.38ms  med=788.5ms  max=6.5s   p(90)=2.01s    p(95)=2.57s  
       { expected_response:true }...: avg=955.17ms min=6.38ms  med=788.5ms  max=6.5s   p(90)=2.01s    p(95)=2.57s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 9642 
     http_req_receiving.............: avg=324.59ms min=34.19µs med=85.25µs  max=4.87s  p(90)=1.31s    p(95)=1.89s  
     http_req_sending...............: avg=25.23ms  min=7.61µs  med=14.87µs  max=3.33s  p(90)=136.94µs p(95)=7.3ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=605.34ms min=6.32ms  med=604.43ms max=2.29s  p(90)=1.06s    p(95)=1.23s  
     http_reqs......................: 9642    158.776609/s
     iteration_duration.............: avg=1.87s    min=33.21ms med=1.59s    max=10.31s p(90)=3.75s    p(95)=4.52s  
     iterations.....................: 9622    158.447265/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6f025e92-9ed0-4b87-dc12-e54aa9995c00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a0de2160-7535-4c2d-88aa-b9844fdab500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1df2fbc5-0902-497c-ac0e-f8fa66d91600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17640     ✗ 0    
     data_received..................: 518 MB  8.2 MB/s
     data_sent......................: 7.0 MB  111 kB/s
     http_req_blocked...............: avg=492.66µs min=1.43µs   med=3.6µs    max=30.26ms  p(90)=5.92µs  p(95)=347.88µs
     http_req_connecting............: avg=467.75µs min=0s       med=0s       max=24.77ms  p(90)=0s      p(95)=142.71µs
     http_req_duration..............: avg=3.05s    min=14.05ms  med=2.8s     max=6.96s    p(90)=4.34s   p(95)=5.01s   
       { expected_response:true }...: avg=3.05s    min=14.05ms  med=2.8s     max=6.96s    p(90)=4.34s   p(95)=5.01s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5900 
     http_req_receiving.............: avg=41.63ms  min=38.13µs  med=147.83µs max=1.83s    p(90)=3.84ms  p(95)=242.75ms
     http_req_sending...............: avg=703.61µs min=9.27µs   med=19.31µs  max=465.59ms p(90)=59.75µs p(95)=478.33µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.01s    min=13.84ms  med=2.78s    max=6.96s    p(90)=4.28s   p(95)=5s      
     http_reqs......................: 5900    93.626406/s
     iteration_duration.............: avg=3.13s    min=204.88ms med=2.84s    max=7.05s    p(90)=4.45s   p(95)=5.1s    
     iterations.....................: 5880    93.309028/s
     vus............................: 6       min=6       max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5d6f163e-c6bb-43af-5d7e-af6446407a00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d582fb05-01e1-4780-307a-ea31db910f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/50c8286b-edbb-4b92-6750-ed7e338baa00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 5529 / ✗ 4
     ✗ no graphql errors
      ↳  99% — ✓ 5529 / ✗ 4
     ✓ valid response structure

     █ setup

     checks.........................: 99.95% ✓ 16587     ✗ 8    
     data_received..................: 487 MB 7.7 MB/s
     data_sent......................: 6.6 MB 105 kB/s
     http_req_blocked...............: avg=817.13µs min=1.74µs  med=3.62µs  max=55.83ms  p(90)=5.59µs   p(95)=1.13ms  
     http_req_connecting............: avg=792.83µs min=0s      med=0s      max=55.57ms  p(90)=0s       p(95)=663.66µs
     http_req_duration..............: avg=3.28s    min=16.35ms med=2.39s   max=1m0s     p(90)=3.34s    p(95)=4.66s   
       { expected_response:true }...: avg=3.24s    min=16.35ms med=2.39s   max=59.94s   p(90)=3.33s    p(95)=4.64s   
     http_req_failed................: 0.07%  ✓ 4         ✗ 5549 
     http_req_receiving.............: avg=894.65µs min=0s      med=96.77µs max=199.39ms p(90)=500.61µs p(95)=1.47ms  
     http_req_sending...............: avg=340.65µs min=8.77µs  med=20.25µs max=119.65ms p(90)=70.71µs  p(95)=511.01µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.28s    min=16.23ms med=2.39s   max=1m0s     p(90)=3.34s    p(95)=4.66s   
     http_reqs......................: 5553   88.073494/s
     iteration_duration.............: avg=3.33s    min=165.3ms med=2.42s   max=1m0s     p(90)=3.38s    p(95)=4.75s   
     iterations.....................: 5533   87.756283/s
     vus............................: 27     min=27      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a4020dde-2ed0-4b10-2345-5529d0952500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/374be856-17b1-4130-2e80-00a6783f9900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/eb8b1790-cec1-4360-4b23-64943b581000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5407 / ✗ 68
     ✗ no graphql errors
      ↳  98% — ✓ 5407 / ✗ 68
     ✓ valid response structure

     █ setup

     checks.........................: 99.16% ✓ 16221     ✗ 136  
     data_received..................: 477 MB 7.6 MB/s
     data_sent......................: 6.5 MB 104 kB/s
     http_req_blocked...............: avg=279.03µs min=1.5µs    med=3.42µs   max=26.26ms p(90)=5.59µs  p(95)=248.44µs
     http_req_connecting............: avg=263.09µs min=0s       med=0s       max=13.95ms p(90)=0s      p(95)=209.1µs 
     http_req_duration..............: avg=3.31s    min=11.06ms  med=1.92s    max=1m0s    p(90)=2.6s    p(95)=3.21s   
       { expected_response:true }...: avg=2.6s     min=11.06ms  med=1.91s    max=59.91s  p(90)=2.55s   p(95)=2.85s   
     http_req_failed................: 1.23%  ✓ 68        ✗ 5427 
     http_req_receiving.............: avg=217.13µs min=0s       med=108.46µs max=54.26ms p(90)=205.8µs p(95)=319.9µs 
     http_req_sending...............: avg=143.59µs min=8.72µs   med=17.98µs  max=35.37ms p(90)=39.36µs p(95)=209.97µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.31s    min=10.97ms  med=1.92s    max=1m0s    p(90)=2.6s    p(95)=3.21s   
     http_reqs......................: 5495   87.862734/s
     iteration_duration.............: avg=3.34s    min=298.92ms med=1.94s    max=1m0s    p(90)=2.62s   p(95)=3.24s   
     iterations.....................: 5475   87.542943/s
     vus............................: 93     min=93      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2b0decd9-8332-4908-47d2-c0db41f50500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/61c999ea-3911-4430-6d9c-4023d0d90300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8049bc2b-402f-4aff-181b-3fee88fe8900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14685     ✗ 0    
     data_received..................: 431 MB  7.0 MB/s
     data_sent......................: 5.8 MB  94 kB/s
     http_req_blocked...............: avg=899.3µs  min=1.41µs   med=3.64µs   max=59.09ms  p(90)=5.64µs   p(95)=1.35ms  
     http_req_connecting............: avg=861.52µs min=0s       med=0s       max=48.45ms  p(90)=0s       p(95)=1.17ms  
     http_req_duration..............: avg=3.69s    min=11.96ms  med=3.66s    max=8.6s     p(90)=4.07s    p(95)=4.82s   
       { expected_response:true }...: avg=3.69s    min=11.96ms  med=3.66s    max=8.6s     p(90)=4.07s    p(95)=4.82s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4915 
     http_req_receiving.............: avg=10.08ms  min=40.77µs  med=104.43µs max=1.08s    p(90)=337.54µs p(95)=1.12ms  
     http_req_sending...............: avg=330.98µs min=9.38µs   med=20.28µs  max=118.33ms p(90)=45.19µs  p(95)=684.08µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.68s    min=11.83ms  med=3.65s    max=8.6s     p(90)=4.07s    p(95)=4.82s   
     http_reqs......................: 4915    79.282525/s
     iteration_duration.............: avg=3.73s    min=144.42ms med=3.69s    max=8.67s    p(90)=4.11s    p(95)=4.85s   
     iterations.....................: 4895    78.95991/s
     vus............................: 11      min=11      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6c938758-9d1e-4e42-1032-c72fdbc9a200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4ef74d9f-7374-4a0d-72ed-11fdf8117100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/114d790f-9a7b-4f75-a517-89fb1cf37a00/public" alt="HTTP Overview" />


  </details>