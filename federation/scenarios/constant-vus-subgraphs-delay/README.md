## Overview for: `federation/constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ba8bb985-8ded-4d21-c317-296d229bb900/public" alt="Comparison" />


| Gateway       | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :------------ | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo         |  185   | 11291 total, 0 failed | avg: 795ms, p95: 2104ms  | ✅                                                                        |
| apollo-router |  169   | 10358 total, 0 failed | avg: 925ms, p95: 2501ms  | ✅                                                                        |
| hive-gateway  |   83   | 5254 total, 0 failed  | avg: 3472ms, p95: 5186ms | ✅                                                                        |
| apollo-server |   76   | 4806 total, 88 failed | avg: 3787ms, p95: 5526ms | ❌ 88 failed requests, 88 non-200 responses, 88 unexpected GraphQL errors |
| mercurius     |   70   | 4412 total, 0 failed  | avg: 4145ms, p95: 5058ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 33813      ✗ 0    
     data_received..................: 991 MB  16 MB/s
     data_sent......................: 13 MB   220 kB/s
     http_req_blocked...............: avg=1.5ms    min=1.32µs  med=2.98µs   max=2.44s p(90)=4.4µs    p(95)=9.38µs
     http_req_connecting............: avg=1.28ms   min=0s      med=0s       max=2.44s p(90)=0s       p(95)=0s    
     http_req_duration..............: avg=794.67ms min=3.9ms   med=677.33ms max=4.79s p(90)=1.7s     p(95)=2.1s  
       { expected_response:true }...: avg=794.67ms min=3.9ms   med=677.33ms max=4.79s p(90)=1.7s     p(95)=2.1s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 11291
     http_req_receiving.............: avg=235.02ms min=32.63µs med=77.59µs  max=4s    p(90)=989.19ms p(95)=1.45s 
     http_req_sending...............: avg=17.64ms  min=7.6µs   med=13.44µs  max=2.49s p(90)=71.5µs   p(95)=9.36ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=542ms    min=3.78ms  med=498.88ms max=2.68s p(90)=986.98ms p(95)=1.13s 
     http_reqs......................: 11291   185.334153/s
     iteration_duration.............: avg=1.58s    min=16.88ms med=1.25s    max=9.28s p(90)=3.39s    p(95)=4.18s 
     iterations.....................: 11271   185.005866/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cb9e9736-f244-422e-f1ea-00f198639200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/df563d96-6c89-4527-820b-30733d654300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/937655b8-6dac-4551-aecd-33507e6f7000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31014      ✗ 0    
     data_received..................: 909 MB  15 MB/s
     data_sent......................: 12 MB   201 kB/s
     http_req_blocked...............: avg=1.65ms   min=1.3µs   med=3.17µs   max=2.08s p(90)=5.22µs  p(95)=10.02µs
     http_req_connecting............: avg=1.28ms   min=0s      med=0s       max=2.08s p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=925.41ms min=5.76ms  med=744.14ms max=6.21s p(90)=1.93s   p(95)=2.5s   
       { expected_response:true }...: avg=925.41ms min=5.76ms  med=744.14ms max=6.21s p(90)=1.93s   p(95)=2.5s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10358
     http_req_receiving.............: avg=318.78ms min=32.49µs med=80.96µs  max=5.04s p(90)=1.31s   p(95)=1.93s  
     http_req_sending...............: avg=20.8ms   min=7.78µs  med=14.96µs  max=4.09s p(90)=96.73µs p(95)=11.31ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=585.82ms min=5.67ms  med=547.68ms max=2.1s  p(90)=1.06s   p(95)=1.23s  
     http_reqs......................: 10358   169.46836/s
     iteration_duration.............: avg=1.73s    min=23.79ms med=1.41s    max=9.86s p(90)=3.65s   p(95)=4.47s  
     iterations.....................: 10338   169.141138/s
     vus............................: 97      min=97       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/039fef52-7aa4-4541-891f-18e3ba616c00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/203bb548-b939-4661-9dd5-abd738417100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ead8c4fb-31c8-497d-ed76-33f4aa7d1f00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 15702     ✗ 0    
     data_received..................: 461 MB  7.3 MB/s
     data_sent......................: 6.2 MB  99 kB/s
     http_req_blocked...............: avg=589.78µs min=1.39µs   med=4.31µs   max=46.47ms p(90)=6.74µs p(95)=2.42ms  
     http_req_connecting............: avg=567.43µs min=0s       med=0s       max=39.01ms p(90)=0s     p(95)=2.08ms  
     http_req_duration..............: avg=3.47s    min=12.08ms  med=2.93s    max=36.93s  p(90)=3.85s  p(95)=5.18s   
       { expected_response:true }...: avg=3.47s    min=12.08ms  med=2.93s    max=36.93s  p(90)=3.85s  p(95)=5.18s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5254 
     http_req_receiving.............: avg=4.99ms   min=37.57µs  med=107.87µs max=621.5ms p(90)=3.61ms p(95)=14.45ms 
     http_req_sending...............: avg=334.24µs min=8.2µs    med=22.42µs  max=85.36ms p(90)=72.1µs p(95)=387.87µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s     p(95)=0s      
     http_req_waiting...............: avg=3.46s    min=11.99ms  med=2.93s    max=36.93s  p(90)=3.82s  p(95)=5.16s   
     http_reqs......................: 5254    83.54999/s
     iteration_duration.............: avg=3.53s    min=108.65ms med=2.98s    max=36.95s  p(90)=3.92s  p(95)=5.28s   
     iterations.....................: 5234    83.231947/s
     vus............................: 193     min=193     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9ecd2fb7-6f86-4469-92ed-13e08ab4d500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ad377904-5e52-4017-c4b5-da3900810d00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c09abfae-f1a7-446e-9540-13e7960a6c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 4698 / ✗ 88
     ✗ no graphql errors
      ↳  98% — ✓ 4698 / ✗ 88
     ✓ valid response structure

     █ setup

     checks.........................: 98.76% ✓ 14094     ✗ 176  
     data_received..................: 415 MB 6.6 MB/s
     data_sent......................: 5.7 MB 91 kB/s
     http_req_blocked...............: avg=338.03µs min=1.42µs   med=3.98µs   max=24.41ms p(90)=6.65µs   p(95)=619.07µs
     http_req_connecting............: avg=328.87µs min=0s       med=0s       max=24.35ms p(90)=0s       p(95)=577.11µs
     http_req_duration..............: avg=3.78s    min=13.14ms  med=2.11s    max=1m0s    p(90)=2.7s     p(95)=5.52s   
       { expected_response:true }...: avg=2.73s    min=13.14ms  med=2.1s     max=59.17s  p(90)=2.66s    p(95)=3.02s   
     http_req_failed................: 1.83%  ✓ 88        ✗ 4718 
     http_req_receiving.............: avg=174.35µs min=0s       med=113.89µs max=25.45ms p(90)=178.19µs p(95)=215.38µs
     http_req_sending...............: avg=135.83µs min=8.79µs   med=21.47µs  max=44.99ms p(90)=45.15µs  p(95)=287.92µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.78s    min=12.99ms  med=2.11s    max=1m0s    p(90)=2.7s     p(95)=5.52s   
     http_reqs......................: 4806   76.697205/s
     iteration_duration.............: avg=3.81s    min=237.04ms med=2.13s    max=1m0s    p(90)=2.72s    p(95)=5.62s   
     iterations.....................: 4786   76.378032/s
     vus............................: 91     min=91      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/752136bd-104b-4c87-7881-675f1b603b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/75cd404f-5eb9-4385-e26b-ba5c784a3400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/eaa34ab6-cd9b-4db1-18e6-562dab96db00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 13176     ✗ 0    
     data_received..................: 387 MB  6.2 MB/s
     data_sent......................: 5.2 MB  84 kB/s
     http_req_blocked...............: avg=1.28ms   min=1.46µs   med=3.26µs  max=36.36ms  p(90)=5.17µs   p(95)=7.49ms  
     http_req_connecting............: avg=1.26ms   min=0s       med=0s      max=36.24ms  p(90)=0s       p(95)=6.84ms  
     http_req_duration..............: avg=4.14s    min=14.42ms  med=4.12s   max=9.68s    p(90)=4.9s     p(95)=5.05s   
       { expected_response:true }...: avg=4.14s    min=14.42ms  med=4.12s   max=9.68s    p(90)=4.9s     p(95)=5.05s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4412 
     http_req_receiving.............: avg=359.49µs min=35.61µs  med=99.41µs max=147.96ms p(90)=164.61µs p(95)=219.39µs
     http_req_sending...............: avg=274.13µs min=8.22µs   med=17.53µs max=14.87ms  p(90)=36.47µs  p(95)=798.01µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=4.14s    min=14.35ms  med=4.12s   max=9.67s    p(90)=4.9s     p(95)=5.05s   
     http_reqs......................: 4412    70.613327/s
     iteration_duration.............: avg=4.18s    min=355.47ms med=4.13s   max=9.72s    p(90)=4.91s    p(95)=5.07s   
     iterations.....................: 4392    70.29323/s
     vus............................: 129     min=129     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e5476a7b-2681-4f94-e7b3-2ff3a0a4d700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b6b4409f-93a2-4ebd-31ea-dae547fa4a00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6a64abeb-36c6-4ea2-9e82-35c8776f8c00/public" alt="HTTP Overview" />


  </details>