## Overview for: `federation/constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/025115b1-7e00-47ed-c4b6-e2551c354000/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration          | Notes                                                                                                           |
| :--------------- | :----: | :--------------------: | :-----------------------: | :-------------------------------------------------------------------------------------------------------------- |
| cosmo            |  171   | 10558 total, 0 failed  | avg: 1311ms, p95: 2665ms  | ✅                                                                                                               |
| grafbase         |  169   | 10418 total, 0 failed  | avg: 1289ms, p95: 2971ms  | ✅                                                                                                               |
| apollo-router    |  160   | 9904 total, 22 failed  | avg: 1524ms, p95: 4079ms  | ❌ 22 failed requests, 22 non-200 responses, 30 unexpected GraphQL errors, non-compatible response structure (6) |
| apollo-server    |   91   | 5773 total, 246 failed | avg: 5236ms, p95: 37839ms | ❌ 246 failed requests, 246 non-200 responses, 246 unexpected GraphQL errors                                     |
| hive-gateway-bun |   90   |  5891 total, 0 failed  | avg: 5166ms, p95: 8699ms  | ✅                                                                                                               |
| hive-gateway     |   86   | 5555 total, 140 failed | avg: 5488ms, p95: 24356ms | ❌ 140 failed requests, 140 non-200 responses, 140 unexpected GraphQL errors                                     |
| mercurius        |   74   |  4701 total, 0 failed  | avg: 6508ms, p95: 9033ms  | ✅                                                                                                               |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31614      ✗ 0    
     data_received..................: 927 MB  15 MB/s
     data_sent......................: 13 MB   204 kB/s
     http_req_blocked...............: avg=2.78ms   min=1.75µs  med=3.98µs   max=2.78s  p(90)=6.53µs   p(95)=170.37µs
     http_req_connecting............: avg=2.4ms    min=0s      med=0s       max=2.78s  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.31s    min=3.4ms   med=1.23s    max=8.11s  p(90)=2.26s    p(95)=2.66s   
       { expected_response:true }...: avg=1.31s    min=3.4ms   med=1.23s    max=8.11s  p(90)=2.26s    p(95)=2.66s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10558
     http_req_receiving.............: avg=286.21ms min=32.16µs med=107.34µs max=8.01s  p(90)=1.16s    p(95)=1.44s   
     http_req_sending...............: avg=36.99ms  min=8.4µs   med=19.91µs  max=4.38s  p(90)=307.33µs p(95)=27.72ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=987.6ms  min=3.29ms  med=972.71ms max=3.82s  p(90)=1.71s    p(95)=1.95s   
     http_reqs......................: 10558   171.90821/s
     iteration_duration.............: avg=2.83s    min=25.8ms  med=2.55s    max=13.32s p(90)=5.23s    p(95)=6.21s   
     iterations.....................: 10538   171.582565/s
     vus............................: 260     min=260      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/360d499b-b26d-4951-3391-1e7b08f45800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7ac1428b-49b7-4166-f394-52be16939300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/07f73381-931b-4dfa-a42f-c4e5d5b75a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31194      ✗ 0    
     data_received..................: 916 MB  15 MB/s
     data_sent......................: 12 MB   201 kB/s
     http_req_blocked...............: avg=3.87ms   min=1.42µs  med=3.39µs   max=2.96s  p(90)=5.5µs    p(95)=163.85µs
     http_req_connecting............: avg=3.27ms   min=0s      med=0s       max=2.96s  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.28s    min=3.06ms  med=1.07s    max=5.97s  p(90)=2.53s    p(95)=2.97s   
       { expected_response:true }...: avg=1.28s    min=3.06ms  med=1.07s    max=5.97s  p(90)=2.53s    p(95)=2.97s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10418
     http_req_receiving.............: avg=368.87ms min=32.48µs med=83.86µs  max=4.71s  p(90)=1.43s    p(95)=2s      
     http_req_sending...............: avg=37.48ms  min=7.96µs  med=15.3µs   max=4.47s  p(90)=245.38µs p(95)=29.44ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=882.27ms min=2.99ms  med=818.89ms max=3.36s  p(90)=1.59s    p(95)=1.92s   
     http_reqs......................: 10418   169.562451/s
     iteration_duration.............: avg=2.86s    min=35.43ms med=2.5s     max=12.48s p(90)=5.54s    p(95)=6.51s   
     iterations.....................: 10398   169.236933/s
     vus............................: 222     min=222      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f4489df8-3c30-4fc1-57b0-8870c66f7200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d5d6d4d5-082c-4ff6-93db-2f15b6c40900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/24bc7f01-0a75-42fd-29f0-c87733bded00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 9862 / ✗ 22
     ✗ no graphql errors
      ↳  99% — ✓ 9854 / ✗ 30
     ✗ valid response structure
      ↳  99% — ✓ 9856 / ✗ 6

     █ setup

     checks.........................: 99.80% ✓ 29572      ✗ 58   
     data_received..................: 867 MB 14 MB/s
     data_sent......................: 12 MB  191 kB/s
     http_req_blocked...............: avg=12.04ms  min=1.42µs  med=3.27µs   max=5.43s  p(90)=5.6µs    p(95)=5.67ms 
     http_req_connecting............: avg=11.16ms  min=0s      med=0s       max=5.43s  p(90)=0s       p(95)=5.04ms 
     http_req_duration..............: avg=1.52s    min=6.71ms  med=1.26s    max=9.11s  p(90)=3.26s    p(95)=4.07s  
       { expected_response:true }...: avg=1.52s    min=6.71ms  med=1.26s    max=9.11s  p(90)=3.26s    p(95)=4.07s  
     http_req_failed................: 0.22%  ✓ 22         ✗ 9882 
     http_req_receiving.............: avg=508.71ms min=0s      med=85.57µs  max=7s     p(90)=1.86s    p(95)=3.23s  
     http_req_sending...............: avg=41.01ms  min=7.86µs  med=14.98µs  max=6.18s  p(90)=731.91µs p(95)=32.36ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=974.27ms min=6.65ms  med=918.86ms max=5.46s  p(90)=1.8s     p(95)=2.09s  
     http_reqs......................: 9904   160.489229/s
     iteration_duration.............: avg=3.04s    min=23.54ms med=2.67s    max=15.72s p(90)=6.1s     p(95)=7.3s   
     iterations.....................: 9884   160.165139/s
     vus............................: 301    min=301      max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/105625d5-15e1-45c9-360d-66631987f900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/54b88183-5fd5-4396-17d1-19c416fcc300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/01ec6ced-9a3d-473b-355e-9f1064f8ad00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  95% — ✓ 5507 / ✗ 246
     ✗ no graphql errors
      ↳  95% — ✓ 5507 / ✗ 246
     ✓ valid response structure

     █ setup

     checks.........................: 97.10% ✓ 16521     ✗ 492  
     data_received..................: 486 MB 7.7 MB/s
     data_sent......................: 6.9 MB 109 kB/s
     http_req_blocked...............: avg=3.99ms   min=1.42µs   med=2.84µs   max=113.06ms p(90)=9.55µs   p(95)=48.7ms 
     http_req_connecting............: avg=3.89ms   min=0s       med=0s       max=110.44ms p(90)=0s       p(95)=47.68ms
     http_req_duration..............: avg=5.23s    min=10.94ms  med=2.24s    max=1m0s     p(90)=3.07s    p(95)=37.83s 
       { expected_response:true }...: avg=2.79s    min=10.94ms  med=2.22s    max=59.81s   p(90)=2.79s    p(95)=3.15s  
     http_req_failed................: 4.26%  ✓ 246       ✗ 5527 
     http_req_receiving.............: avg=283.49µs min=0s       med=100.74µs max=63.36ms  p(90)=216.46µs p(95)=457.2µs
     http_req_sending...............: avg=576.27µs min=8.25µs   med=14.29µs  max=88.55ms  p(90)=108.76µs p(95)=1.61ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=5.23s    min=10.87ms  med=2.24s    max=1m0s     p(90)=3.07s    p(95)=37.83s 
     http_reqs......................: 5773   91.695624/s
     iteration_duration.............: avg=5.27s    min=135.34ms med=2.26s    max=1m0s     p(90)=3.08s    p(95)=38.28s 
     iterations.....................: 5753   91.377953/s
     vus............................: 109    min=109     max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a82cbb6d-599c-4a68-d7f9-0c17e3e3f500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8b0c86bf-79b0-483e-3475-7b956e83f100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/199c023a-c22e-4983-d11b-ee00c26b2900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17613     ✗ 0    
     data_received..................: 517 MB  8.0 MB/s
     data_sent......................: 7.0 MB  108 kB/s
     http_req_blocked...............: avg=4.09ms   min=1.91µs   med=4.49µs   max=119.29ms p(90)=14.65µs  p(95)=26.55ms 
     http_req_connecting............: avg=3.97ms   min=0s       med=0s       max=118.94ms p(90)=0s       p(95)=24.53ms 
     http_req_duration..............: avg=5.16s    min=14.6ms   med=4.78s    max=11.78s   p(90)=7.7s     p(95)=8.69s   
       { expected_response:true }...: avg=5.16s    min=14.6ms   med=4.78s    max=11.78s   p(90)=7.7s     p(95)=8.69s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5891 
     http_req_receiving.............: avg=116.06ms min=40.68µs  med=125.36µs max=3.91s    p(90)=306.52ms p(95)=869.42ms
     http_req_sending...............: avg=3.41ms   min=9.55µs   med=24.05µs  max=1.3s     p(90)=2.2ms    p(95)=18.61ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.04s    min=14.37ms  med=4.71s    max=11.7s    p(90)=7.55s    p(95)=8.58s   
     http_reqs......................: 5891    90.976784/s
     iteration_duration.............: avg=5.33s    min=309.47ms med=4.88s    max=11.84s   p(90)=7.82s    p(95)=8.95s   
     iterations.....................: 5871    90.667917/s
     vus............................: 194     min=194     max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/67d21bb9-e02a-49a1-40d3-ec96752cde00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/024d42e4-4e05-4b63-47ab-2b155d126500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e05b07bc-60ea-4257-aa90-8a3b97ff2100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  97% — ✓ 5395 / ✗ 140
     ✗ no graphql errors
      ↳  97% — ✓ 5395 / ✗ 140
     ✓ valid response structure

     █ setup

     checks.........................: 98.29% ✓ 16185     ✗ 280  
     data_received..................: 476 MB 7.4 MB/s
     data_sent......................: 6.6 MB 103 kB/s
     http_req_blocked...............: avg=1.51ms   min=1.92µs   med=4.21µs   max=39.49ms  p(90)=14.93µs  p(95)=11.54ms
     http_req_connecting............: avg=1.46ms   min=0s       med=0s       max=35.01ms  p(90)=0s       p(95)=10.84ms
     http_req_duration..............: avg=5.48s    min=13.76ms  med=2.99s    max=1m0s     p(90)=5.05s    p(95)=24.35s 
       { expected_response:true }...: avg=4.07s    min=13.76ms  med=2.96s    max=59.64s   p(90)=4.52s    p(95)=6.29s  
     http_req_failed................: 2.52%  ✓ 140       ✗ 5415 
     http_req_receiving.............: avg=1.2ms    min=0s       med=103.93µs max=242.27ms p(90)=707.31µs p(95)=2.75ms 
     http_req_sending...............: avg=444.67µs min=9.73µs   med=24.91µs  max=108.77ms p(90)=189.35µs p(95)=1.18ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=5.48s    min=13.62ms  med=2.99s    max=1m0s     p(90)=5.05s    p(95)=24.35s 
     http_reqs......................: 5555   86.363693/s
     iteration_duration.............: avg=5.56s    min=216.41ms med=3.05s    max=1m0s     p(90)=5.07s    p(95)=24.42s 
     iterations.....................: 5535   86.052753/s
     vus............................: 71     min=71      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/559e13ce-9311-4571-71e8-84fa918b9b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/62fa2da5-f01a-4fdc-44df-f30accb9ec00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a990fc3a-da01-46e5-8f0f-d554b73b2200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14043     ✗ 0    
     data_received..................: 413 MB  6.6 MB/s
     data_sent......................: 5.6 MB  89 kB/s
     http_req_blocked...............: avg=1.86ms   min=1.95µs   med=4.36µs   max=55.25ms p(90)=757.87µs p(95)=20.63ms 
     http_req_connecting............: avg=1.83ms   min=0s       med=0s       max=37.54ms p(90)=431.92µs p(95)=20.26ms 
     http_req_duration..............: avg=6.5s     min=10.88ms  med=6.46s    max=13.92s  p(90)=7.78s    p(95)=9.03s   
       { expected_response:true }...: avg=6.5s     min=10.88ms  med=6.46s    max=13.92s  p(90)=7.78s    p(95)=9.03s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4701 
     http_req_receiving.............: avg=7.08ms   min=39.75µs  med=107.53µs max=1.36s   p(90)=259.23µs p(95)=611.53µs
     http_req_sending...............: avg=200.54µs min=9.6µs    med=25.04µs  max=25.24ms p(90)=140.63µs p(95)=1.08ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=6.5s     min=10.79ms  med=6.46s    max=13.92s  p(90)=7.78s    p(95)=9.03s   
     http_reqs......................: 4701    74.727144/s
     iteration_duration.............: avg=6.58s    min=420.01ms med=6.48s    max=13.93s  p(90)=7.81s    p(95)=9.07s   
     iterations.....................: 4681    74.409224/s
     vus............................: 325     min=325     max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2e301d08-89cb-4c0f-625c-c3176b88e800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/20f04594-39da-4c2c-89ea-161b08e4c900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ad5c7549-7c6a-4e35-2895-5ef19b67f500/public" alt="HTTP Overview" />


  </details>