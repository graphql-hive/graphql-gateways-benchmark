## Overview for: `federation/ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was trying to reach 2000 concurrent VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/69dd1672-3cda-4329-9286-f189b85e8300/public" alt="Comparison" />


| Gateway          | duration(p95)⬇️ |  RPS  |        Requests        |                       Durations                        | Notes                                                                                                        |
| :--------------- | :-------------: | :---: | :--------------------: | :----------------------------------------------------: | :----------------------------------------------------------------------------------------------------------- |
| grafbase         |     4221ms      |  166  | 11696 total, 0 failed  |   avg: 2092ms, p95: 4221ms, max: 9183ms, med: 2009ms   | ✅                                                                                                            |
| cosmo            |     5987ms      |  176  | 12407 total, 0 failed  |  avg: 2656ms, p95: 5987ms, max: 14682ms, med: 1955ms   | ✅                                                                                                            |
| apollo-router    |     6472ms      |  158  | 11137 total, 1 failed  |  avg: 2765ms, p95: 6473ms, max: 17664ms, med: 2236ms   | ❌ 1 failed requests, 1 non-200 responses, 2 unexpected GraphQL errors, non-compatible response structure (2) |
| hive-gateway-bun |     28964ms     |  89   |  7381 total, 0 failed  | avg: 11869ms, p95: 28964ms, max: 39094ms, med: 10029ms | ✅                                                                                                            |
| mercurius        |     39621ms     |  53   |  4892 total, 0 failed  | avg: 21911ms, p95: 39621ms, max: 41436ms, med: 22385ms | ✅                                                                                                            |
| hive-gateway     |     54361ms     |  75   |  6889 total, 4 failed  | avg: 14014ms, p95: 54361ms, max: 60314ms, med: 3639ms  | ❌ 4 failed requests, 4 non-200 responses, 4 unexpected GraphQL errors                                        |
| apollo-server    |     60000ms     |  75   | 6984 total, 571 failed | avg: 13355ms, p95: 60000ms, max: 60277ms, med: 2400ms  | ❌ 571 failed requests, 571 non-200 responses, 571 unexpected GraphQL errors                                  |



<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 35028      ✗ 0     
     data_received..................: 1.0 GB  15 MB/s
     data_sent......................: 14 MB   198 kB/s
     http_req_blocked...............: avg=257.85ms min=1.5µs   med=3.72µs  max=8.49s  p(90)=1.07s    p(95)=1.93s   
     http_req_connecting............: avg=255.83ms min=0s      med=0s      max=8.49s  p(90)=1.07s    p(95)=1.93s   
     http_req_duration..............: avg=2.09s    min=3.71ms  med=2s      max=9.18s  p(90)=3.71s    p(95)=4.22s   
       { expected_response:true }...: avg=2.09s    min=3.71ms  med=2s      max=9.18s  p(90)=3.71s    p(95)=4.22s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 11696 
     http_req_receiving.............: avg=140.21ms min=31.63µs med=73.81µs max=6.52s  p(90)=568.06ms p(95)=783.75ms
     http_req_sending...............: avg=112.92ms min=8.3µs   med=17.09µs max=7.13s  p(90)=296.84ms p(95)=722.55ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.83s    min=3.57ms  med=1.75s   max=8.71s  p(90)=3.32s    p(95)=3.74s   
     http_reqs......................: 11696   166.800668/s
     iteration_duration.............: avg=5.87s    min=21.6ms  med=5.01s   max=26.84s p(90)=11.86s   p(95)=13.8s   
     iterations.....................: 11676   166.515441/s
     vus............................: 6       min=6        max=1911
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/39ebfc0a-ad96-4784-ba42-ef55cc544700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fc85e3a6-e4be-4f4e-d59b-fafd21a3f500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a96e9eda-cbc2-49aa-7ec8-ac7f0a8aa800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 37161      ✗ 0     
     data_received..................: 1.1 GB  16 MB/s
     data_sent......................: 15 MB   209 kB/s
     http_req_blocked...............: avg=322.82ms min=1.53µs  med=3.39µs  max=14.36s p(90)=862.67ms p(95)=2.06s  
     http_req_connecting............: avg=298.85ms min=0s      med=0s      max=14.36s p(90)=849.31ms p(95)=2.04s  
     http_req_duration..............: avg=2.65s    min=3.05ms  med=1.95s   max=14.68s p(90)=5.38s    p(95)=5.98s  
       { expected_response:true }...: avg=2.65s    min=3.05ms  med=1.95s   max=14.68s p(90)=5.38s    p(95)=5.98s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 12407 
     http_req_receiving.............: avg=210.94ms min=33.45µs med=77.84µs max=10.28s p(90)=748.47ms p(95)=1.24s  
     http_req_sending...............: avg=117.36ms min=8.34µs  med=15.25µs max=10.58s p(90)=220.31ms p(95)=688.7ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=2.32s    min=2.97ms  med=1.54s   max=10.65s p(90)=5.15s    p(95)=5.65s  
     http_reqs......................: 12407   176.138445/s
     iteration_duration.............: avg=5.97s    min=24.01ms med=5.19s   max=26.68s p(90)=11.49s   p(95)=13.95s 
     iterations.....................: 12387   175.854511/s
     vus............................: 214     min=69       max=1959
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/da3d73f2-e2a8-41f7-b9f6-b4ee2f760e00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e3e219ee-99c2-44ef-0497-2ed72bdd8000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/57021827-4795-438c-2f0d-955c94d0cb00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 11116 / ✗ 1
     ✗ no graphql errors
      ↳  99% — ✓ 11115 / ✗ 2
     ✗ valid response structure
      ↳  99% — ✓ 11115 / ✗ 2

     █ setup

     checks.........................: 99.98% ✓ 33346      ✗ 5     
     data_received..................: 977 MB 14 MB/s
     data_sent......................: 13 MB  188 kB/s
     http_req_blocked...............: avg=299.1ms  min=1.25µs  med=3.69µs  max=10.5s  p(90)=829.03ms p(95)=1.77s  
     http_req_connecting............: avg=272.58ms min=0s      med=0s      max=9.78s  p(90)=815.07ms p(95)=1.71s  
     http_req_duration..............: avg=2.76s    min=6.53ms  med=2.23s   max=17.66s p(90)=5.65s    p(95)=6.47s  
       { expected_response:true }...: avg=2.76s    min=6.53ms  med=2.23s   max=17.66s p(90)=5.65s    p(95)=6.47s  
     http_req_failed................: 0.00%  ✓ 1          ✗ 11136 
     http_req_receiving.............: avg=370.32ms min=27.33µs med=79.7µs  max=12.22s p(90)=1.31s    p(95)=2.83s  
     http_req_sending...............: avg=156.66ms min=7.94µs  med=17.75µs max=8.01s  p(90)=346.86ms p(95)=862.4ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=2.23s    min=6.45ms  med=1.78s   max=13.41s p(90)=5.09s    p(95)=5.68s  
     http_reqs......................: 11137  158.749453/s
     iteration_duration.............: avg=6.3s     min=12.73ms med=5.6s    max=27s    p(90)=12.34s   p(95)=14.8s  
     iterations.....................: 11117  158.464368/s
     vus............................: 5      min=5        max=1952
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/11c18c2a-8f6c-446a-5b1e-9e677dcb9400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/05ef0787-de39-4031-c489-14f4de4a5500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9762b7a3-862a-49ad-bc84-e11740353d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 22083     ✗ 0     
     data_received..................: 648 MB  7.9 MB/s
     data_sent......................: 8.8 MB  106 kB/s
     http_req_blocked...............: avg=20.73ms  min=1.71µs   med=4.18µs   max=813.06ms p(90)=35.4ms  p(95)=155.45ms
     http_req_connecting............: avg=20.48ms  min=0s       med=0s       max=813ms    p(90)=34.25ms p(95)=154.28ms
     http_req_duration..............: avg=11.86s   min=16.18ms  med=10.02s   max=39.09s   p(90)=24.14s  p(95)=28.96s  
       { expected_response:true }...: avg=11.86s   min=16.18ms  med=10.02s   max=39.09s   p(90)=24.14s  p(95)=28.96s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 7381  
     http_req_receiving.............: avg=118.56ms min=40.5µs   med=102.07µs max=8.68s    p(90)=3.89ms  p(95)=152.09ms
     http_req_sending...............: avg=11.05ms  min=9.1µs    med=24.1µs   max=655.48ms p(90)=19.9ms  p(95)=76.41ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=11.73s   min=15.93ms  med=9.88s    max=39.08s   p(90)=24.09s  p(95)=28.86s  
     http_reqs......................: 7381    89.625625/s
     iteration_duration.............: avg=12.14s   min=247.52ms med=10.25s   max=40.2s    p(90)=24.57s  p(95)=29.35s  
     iterations.....................: 7361    89.38277/s
     vus............................: 51      min=51      max=1999
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4160ddfe-81dd-40c4-d186-f2567194cc00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ebe425e7-e877-41b2-2f5b-8f696ecd7f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3d7c0be9-c42e-45f0-a702-22f289ff8900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14613     ✗ 0     
     data_received..................: 429 MB  4.7 MB/s
     data_sent......................: 5.8 MB  64 kB/s
     http_req_blocked...............: avg=231.16µs min=1.56µs   med=4.57µs   max=9.69ms  p(90)=551.78µs p(95)=823.09µs
     http_req_connecting............: avg=195.18µs min=0s       med=0s       max=9.51ms  p(90)=472.6µs  p(95)=695.51µs
     http_req_duration..............: avg=21.91s   min=12.88ms  med=22.38s   max=41.43s  p(90)=38.42s   p(95)=39.62s  
       { expected_response:true }...: avg=21.91s   min=12.88ms  med=22.38s   max=41.43s  p(90)=38.42s   p(95)=39.62s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 4892  
     http_req_receiving.............: avg=25.37ms  min=31.77µs  med=108.43µs max=1.15s   p(90)=533.59µs p(95)=15.8ms  
     http_req_sending...............: avg=58.18µs  min=8.87µs   med=28.82µs  max=14.91ms p(90)=71.95µs  p(95)=102.9µs 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=21.88s   min=12.79ms  med=22.38s   max=41.43s  p(90)=38.42s   p(95)=39.57s  
     http_reqs......................: 4892    53.908115/s
     iteration_duration.............: avg=22.14s   min=228.55ms med=22.47s   max=41.44s  p(90)=38.54s   p(95)=39.85s  
     iterations.....................: 4869    53.654664/s
     vus............................: 253     min=54      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/13736d22-80a8-48ae-24e2-d3414d253000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d2e10ae6-3778-4bd8-27e0-121948a2d500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bc05508f-150a-4b7e-586d-cc47d023aa00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 6865 / ✗ 4
     ✗ no graphql errors
      ↳  99% — ✓ 6865 / ✗ 4
     ✓ valid response structure

     █ setup

     checks.........................: 99.96% ✓ 20592     ✗ 8     
     data_received..................: 605 MB 6.7 MB/s
     data_sent......................: 8.2 MB 90 kB/s
     http_req_blocked...............: avg=2.64ms   min=2.01µs   med=5.12µs   max=252.3ms  p(90)=1.57ms   p(95)=10.92ms
     http_req_connecting............: avg=2.58ms   min=0s       med=0s       max=252.23ms p(90)=1.35ms   p(95)=10.76ms
     http_req_duration..............: avg=14.01s   min=16.41ms  med=3.63s    max=1m0s     p(90)=48.41s   p(95)=54.36s 
       { expected_response:true }...: avg=13.98s   min=16.41ms  med=3.63s    max=1m0s     p(90)=48.33s   p(95)=54.33s 
     http_req_failed................: 0.05%  ✓ 4         ✗ 6885  
     http_req_receiving.............: avg=905.05µs min=0s       med=128.99µs max=253.21ms p(90)=1.01ms   p(95)=2.71ms 
     http_req_sending...............: avg=1.15ms   min=10.27µs  med=31.78µs  max=276ms    p(90)=155.21µs p(95)=1.71ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=14.01s   min=16.27ms  med=3.63s    max=1m0s     p(90)=48.41s   p(95)=54.32s 
     http_reqs......................: 6889   75.97584/s
     iteration_duration.............: avg=14.08s   min=215.91ms med=3.68s    max=1m0s     p(90)=48.48s   p(95)=54.51s 
     iterations.....................: 6866   75.722183/s
     vus............................: 97     min=54      max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c18cde47-1810-40de-a531-c9851f3ea100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bc7b2ee8-3123-487c-2f28-2bdee5ce4100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5279c3df-8cb4-4718-2673-58198f445200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  91% — ✓ 6393 / ✗ 571
     ✗ no graphql errors
      ↳  91% — ✓ 6393 / ✗ 571
     ✓ valid response structure

     █ setup

     checks.........................: 94.38% ✓ 19179     ✗ 1142  
     data_received..................: 564 MB 6.1 MB/s
     data_sent......................: 8.4 MB 90 kB/s
     http_req_blocked...............: avg=553.18µs min=1.66µs  med=4.39µs   max=136.41ms p(90)=433.82µs p(95)=794.51µs
     http_req_connecting............: avg=513.37µs min=0s      med=0s       max=136.32ms p(90)=350.61µs p(95)=595.14µs
     http_req_duration..............: avg=13.35s   min=13.38ms med=2.4s     max=1m0s     p(90)=57.94s   p(95)=1m0s    
       { expected_response:true }...: avg=9.2s     min=13.38ms med=2.29s    max=59.98s   p(90)=39.01s   p(95)=46.55s  
     http_req_failed................: 8.17%  ✓ 571       ✗ 6413  
     http_req_receiving.............: avg=394.78µs min=0s      med=114.87µs max=342.46ms p(90)=213.77µs p(95)=315.34µs
     http_req_sending...............: avg=235.17µs min=8.46µs  med=24.11µs  max=39.84ms  p(90)=69.73µs  p(95)=128.42µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=13.35s   min=13.27ms med=2.4s     max=1m0s     p(90)=57.94s   p(95)=59.99s  
     http_reqs......................: 6984   75.248879/s
     iteration_duration.............: avg=13.4s    min=75.64ms med=2.41s    max=1m0s     p(90)=58.01s   p(95)=1m0s    
     iterations.....................: 6964   75.03339/s
     vus............................: 5      min=5       max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bcfc64e5-585d-4a07-aa8c-a3fdca8b4100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/49f25ee9-e6ed-4ea6-d84f-6e2da22dca00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9c97b610-26b5-40f3-1eaa-cb9c29069e00/public" alt="HTTP Overview" />


  </details>