## Overview for: `federation/constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2c241657-f56f-4044-6c28-37f63db5b600/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration          | Notes                                                                                                           |
| :--------------- | :----: | :--------------------: | :-----------------------: | :-------------------------------------------------------------------------------------------------------------- |
| cosmo            |  174   | 10739 total, 0 failed  | avg: 1292ms, p95: 2891ms  | ✅                                                                                                               |
| grafbase         |  167   | 10280 total, 0 failed  | avg: 1456ms, p95: 3507ms  | ✅                                                                                                               |
| apollo-router    |  158   | 9722 total, 14 failed  | avg: 1363ms, p95: 3432ms  | ❌ 14 failed requests, 14 non-200 responses, 16 unexpected GraphQL errors, non-compatible response structure (2) |
| hive-gateway-bun |   91   |  5935 total, 0 failed  | avg: 5118ms, p95: 8376ms  | ✅                                                                                                               |
| apollo-server    |   89   | 5625 total, 194 failed | avg: 5395ms, p95: 8340ms  | ❌ 194 failed requests, 194 non-200 responses, 194 unexpected GraphQL errors                                     |
| hive-gateway     |   89   | 5735 total, 123 failed | avg: 5304ms, p95: 18643ms | ❌ 123 failed requests, 123 non-200 responses, 123 unexpected GraphQL errors                                     |
| mercurius        |   76   |  4800 total, 0 failed  | avg: 6356ms, p95: 8422ms  | ✅                                                                                                               |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32157      ✗ 0    
     data_received..................: 943 MB  15 MB/s
     data_sent......................: 13 MB   207 kB/s
     http_req_blocked...............: avg=2.63ms   min=1.48µs  med=3.58µs   max=2.22s  p(90)=5.9µs    p(95)=172.26µs
     http_req_connecting............: avg=2.26ms   min=0s      med=0s       max=1.55s  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.29s    min=3.33ms  med=1.1s     max=7.54s  p(90)=2.25s    p(95)=2.89s   
       { expected_response:true }...: avg=1.29s    min=3.33ms  med=1.1s     max=7.54s  p(90)=2.25s    p(95)=2.89s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10739
     http_req_receiving.............: avg=271.08ms min=32.87µs med=83.56µs  max=6.94s  p(90)=1.04s    p(95)=1.82s   
     http_req_sending...............: avg=27.56ms  min=8.26µs  med=16.61µs  max=4.86s  p(90)=338.82µs p(95)=11.49ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=993.61ms min=3.15ms  med=953.27ms max=4.12s  p(90)=1.64s    p(95)=1.83s   
     http_reqs......................: 10739   174.150832/s
     iteration_duration.............: avg=2.81s    min=41.43ms med=2.44s    max=13.15s p(90)=5.24s    p(95)=6.36s   
     iterations.....................: 10719   173.826499/s
     vus............................: 326     min=326      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e21d43c6-3498-4ce1-f89a-6a12ab344200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0f18af5b-cfb1-4118-ebda-62e0c7e35600/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c89a2a70-367d-464d-9a3d-aeee0dcfd100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30780      ✗ 0    
     data_received..................: 903 MB  15 MB/s
     data_sent......................: 12 MB   198 kB/s
     http_req_blocked...............: avg=2.88ms   min=1.49µs  med=3.66µs  max=3.94s p(90)=5.96µs   p(95)=248.12µs
     http_req_connecting............: avg=1.74ms   min=0s      med=0s      max=2.43s p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.45s    min=3.11ms  med=1.25s   max=7.95s p(90)=2.93s    p(95)=3.5s    
       { expected_response:true }...: avg=1.45s    min=3.11ms  med=1.25s   max=7.95s p(90)=2.93s    p(95)=3.5s    
     http_req_failed................: 0.00%   ✓ 0          ✗ 10280
     http_req_receiving.............: avg=338.48ms min=33.01µs med=88.23µs max=5.72s p(90)=1.25s    p(95)=1.97s   
     http_req_sending...............: avg=29.06ms  min=7.54µs  med=17.29µs max=5.51s p(90)=182.97µs p(95)=6.52ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s    p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.08s    min=3.04ms  med=1.01s   max=5.14s p(90)=1.97s    p(95)=2.44s   
     http_reqs......................: 10280   167.075394/s
     iteration_duration.............: avg=2.91s    min=26.2ms  med=2.5s    max=18.6s p(90)=5.63s    p(95)=6.85s   
     iterations.....................: 10260   166.750345/s
     vus............................: 239     min=239      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d00f4f8c-cd44-46d7-c89d-5c4b77c6cc00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2c585f18-3141-45d9-1091-bdd5e340c500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6d6d9e95-5712-476d-ba3e-a7d17a105600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 9688 / ✗ 14
     ✗ no graphql errors
      ↳  99% — ✓ 9686 / ✗ 16
     ✗ valid response structure
      ↳  99% — ✓ 9687 / ✗ 2

     █ setup

     checks.........................: 99.89% ✓ 29061     ✗ 32   
     data_received..................: 852 MB 14 MB/s
     data_sent......................: 12 MB  188 kB/s
     http_req_blocked...............: avg=8.6ms    min=1.62µs  med=3.76µs   max=3.7s   p(90)=6.29µs   p(95)=12.9ms 
     http_req_connecting............: avg=7.5ms    min=0s      med=0s       max=3.7s   p(90)=0s       p(95)=11.12ms
     http_req_duration..............: avg=1.36s    min=7.05ms  med=1.13s    max=7.43s  p(90)=2.68s    p(95)=3.43s  
       { expected_response:true }...: avg=1.36s    min=7.05ms  med=1.13s    max=7.43s  p(90)=2.68s    p(95)=3.43s  
     http_req_failed................: 0.14%  ✓ 14        ✗ 9708 
     http_req_receiving.............: avg=344.27ms min=0s      med=88.36µs  max=6.77s  p(90)=1.45s    p(95)=2.06s  
     http_req_sending...............: avg=37.64ms  min=7.65µs  med=17.87µs  max=5.16s  p(90)=322.23µs p(95)=20.54ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=981.39ms min=6.97ms  med=886.14ms max=4.3s   p(90)=1.71s    p(95)=2.13s  
     http_reqs......................: 9722   158.16236/s
     iteration_duration.............: avg=3.06s    min=44.68ms med=2.74s    max=14.93s p(90)=5.8s     p(95)=6.79s  
     iterations.....................: 9702   157.83699/s
     vus............................: 168    min=168     max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/11af5145-7c2a-4143-d5db-06cdbc6fe300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4222f6c8-b6f3-40c2-5678-6b25d2b7b800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ae0177d9-b083-45d7-b8a6-6f5acf7cf600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17745     ✗ 0    
     data_received..................: 521 MB  8.0 MB/s
     data_sent......................: 7.0 MB  109 kB/s
     http_req_blocked...............: avg=1.17ms  min=1.78µs   med=4.22µs   max=307.07ms p(90)=12.11µs  p(95)=10.12ms 
     http_req_connecting............: avg=1.08ms  min=0s       med=0s       max=49.93ms  p(90)=0s       p(95)=9.83ms  
     http_req_duration..............: avg=5.11s   min=14.96ms  med=4.71s    max=11.15s   p(90)=7.72s    p(95)=8.37s   
       { expected_response:true }...: avg=5.11s   min=14.96ms  med=4.71s    max=11.15s   p(90)=7.72s    p(95)=8.37s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5935 
     http_req_receiving.............: avg=83.22ms min=41.49µs  med=108.35µs max=3.06s    p(90)=15.98ms  p(95)=575.44ms
     http_req_sending...............: avg=2.01ms  min=9.31µs   med=22.65µs  max=690.55ms p(90)=347.33µs p(95)=3.07ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.03s   min=14.71ms  med=4.67s    max=11.09s   p(90)=7.7s     p(95)=8.33s   
     http_reqs......................: 5935    91.46241/s
     iteration_duration.............: avg=5.29s   min=299.06ms med=4.83s    max=11.21s   p(90)=7.99s    p(95)=8.62s   
     iterations.....................: 5915    91.154197/s
     vus............................: 181     min=181     max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2aff7f03-3ded-4764-577d-4c3cd64b2200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/06c61a87-f0f2-425c-e3a3-cf3e4d2fb400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c1729e1a-1c1b-4c16-5f35-cd28d2a00600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  96% — ✓ 5411 / ✗ 194
     ✗ no graphql errors
      ↳  96% — ✓ 5411 / ✗ 194
     ✓ valid response structure

     █ setup

     checks.........................: 97.66% ✓ 16233     ✗ 388  
     data_received..................: 477 MB 7.6 MB/s
     data_sent......................: 6.7 MB 106 kB/s
     http_req_blocked...............: avg=4.28ms   min=1.44µs   med=2.95µs  max=108.89ms p(90)=11.56µs  p(95)=40.97ms 
     http_req_connecting............: avg=4.18ms   min=0s       med=0s      max=98.62ms  p(90)=0s       p(95)=40.43ms 
     http_req_duration..............: avg=5.39s    min=10.82ms  med=3.01s   max=1m0s     p(90)=3.65s    p(95)=8.33s   
       { expected_response:true }...: avg=3.44s    min=10.82ms  med=2.99s   max=59.48s   p(90)=3.45s    p(95)=4.15s   
     http_req_failed................: 3.44%  ✓ 194       ✗ 5431 
     http_req_receiving.............: avg=443.64µs min=0s       med=98.06µs max=184ms    p(90)=240.5µs  p(95)=535.19µs
     http_req_sending...............: avg=1.36ms   min=8.69µs   med=15.15µs max=41.76ms  p(90)=135.51µs p(95)=18.04ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.39s    min=10.74ms  med=3.01s   max=1m0s     p(90)=3.65s    p(95)=8.32s   
     http_reqs......................: 5625   89.119332/s
     iteration_duration.............: avg=5.44s    min=368.39ms med=3.03s   max=1m0s     p(90)=3.69s    p(95)=8.83s   
     iterations.....................: 5605   88.802464/s
     vus............................: 25     min=25      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4a2285a0-7254-4501-7a29-76bfdad8a700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fe80f98f-eb09-46aa-e4b9-1e6428feb300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/db8a8613-fed5-42d3-10f0-d9a715f10800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  97% — ✓ 5592 / ✗ 123
     ✗ no graphql errors
      ↳  97% — ✓ 5592 / ✗ 123
     ✓ valid response structure

     █ setup

     checks.........................: 98.55% ✓ 16776     ✗ 246  
     data_received..................: 493 MB 7.7 MB/s
     data_sent......................: 6.8 MB 106 kB/s
     http_req_blocked...............: avg=2.91ms  min=1.85µs   med=3.95µs  max=82.35ms  p(90)=12.81µs  p(95)=32.35ms
     http_req_connecting............: avg=2.85ms  min=0s       med=0s      max=82.32ms  p(90)=0s       p(95)=32.05ms
     http_req_duration..............: avg=5.3s    min=13.89ms  med=3.08s   max=1m0s     p(90)=4.92s    p(95)=18.64s 
       { expected_response:true }...: avg=4.1s    min=13.89ms  med=3.04s   max=59.85s   p(90)=4.53s    p(95)=6.22s  
     http_req_failed................: 2.14%  ✓ 123       ✗ 5612 
     http_req_receiving.............: avg=1.8ms   min=0s       med=87.36µs max=312.25ms p(90)=645.64µs p(95)=3.05ms 
     http_req_sending...............: avg=777.9µs min=8.21µs   med=20.71µs max=132.7ms  p(90)=428.38µs p(95)=3.16ms 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=5.3s    min=13.7ms   med=3.07s   max=1m0s     p(90)=4.92s    p(95)=18.63s 
     http_reqs......................: 5735   89.402296/s
     iteration_duration.............: avg=5.38s   min=351.04ms med=3.15s   max=1m0s     p(90)=5.03s    p(95)=18.78s 
     iterations.....................: 5715   89.090518/s
     vus............................: 43     min=43      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d8dbe4dc-fcd5-4a78-649f-899ecb9ecb00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/49c7d618-c682-4550-993a-d2febe199a00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/814d572d-6b9e-4fc9-16b2-efaf0a357200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14340     ✗ 0    
     data_received..................: 421 MB  6.7 MB/s
     data_sent......................: 5.7 MB  91 kB/s
     http_req_blocked...............: avg=4.51ms  min=1.72µs   med=3.67µs  max=95.86ms p(90)=9.07ms   p(95)=40.93ms 
     http_req_connecting............: avg=4.4ms   min=0s       med=0s      max=91.66ms p(90)=8.66ms   p(95)=40.24ms 
     http_req_duration..............: avg=6.35s   min=11.42ms  med=6.3s    max=10.83s  p(90)=7.63s    p(95)=8.42s   
       { expected_response:true }...: avg=6.35s   min=11.42ms  med=6.3s    max=10.83s  p(90)=7.63s    p(95)=8.42s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4800 
     http_req_receiving.............: avg=15.87ms min=37.74µs  med=98.68µs max=1.22s   p(90)=263.16µs p(95)=727.03µs
     http_req_sending...............: avg=1.73ms  min=9.13µs   med=21.36µs max=42.69ms p(90)=201.97µs p(95)=22.46ms 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=6.33s   min=11.35ms  med=6.3s    max=10.83s  p(90)=7.63s    p(95)=8.42s   
     http_reqs......................: 4800    76.38269/s
     iteration_duration.............: avg=6.41s   min=438.97ms med=6.32s   max=10.85s  p(90)=7.65s    p(95)=8.44s   
     iterations.....................: 4780    76.064429/s
     vus............................: 271     min=271     max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1acb33cc-d9b3-496c-2251-a04dafa15200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f86b866e-5a51-44fe-9ab8-4df081cfa400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1d51f6ba-ff10-48ea-8619-8815f7c4a600/public" alt="HTTP Overview" />


  </details>