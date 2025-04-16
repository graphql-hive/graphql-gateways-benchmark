## Overview for: `federation/constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2242d773-552a-40d9-6f57-0b47e9e3d700/public" alt="Comparison" />


| Gateway          | Successful RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :---------------: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |        176        | 10756 total, 0 failed | avg: 883ms, p95: 2323ms  | ✅                                                                        |
| grafbase         |        168        | 10304 total, 0 failed | avg: 895ms, p95: 2251ms  | ✅                                                                        |
| apollo-router    |        162        | 9898 total, 0 failed  | avg: 943ms, p95: 2339ms  | ✅                                                                        |
| apollo-server    |        87         | 5523 total, 69 failed | avg: 3296ms, p95: 3032ms | ❌ 69 failed requests, 69 non-200 responses, 69 unexpected GraphQL errors |
| hive-gateway-bun |        85         | 5405 total, 0 failed  | avg: 3310ms, p95: 5566ms | ✅                                                                        |
| hive-gateway     |        80         | 5085 total, 13 failed | avg: 3599ms, p95: 5104ms | ❌ 13 failed requests, 13 non-200 responses, 13 unexpected GraphQL errors |
| mercurius        |        77         | 4821 total, 0 failed  | avg: 3770ms, p95: 4847ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32208      ✗ 0    
     data_received..................: 944 MB  16 MB/s
     data_sent......................: 13 MB   209 kB/s
     http_req_blocked...............: avg=2.78ms   min=1.69µs  med=4.01µs   max=3.67s p(90)=6.16µs   p(95)=13.09µs
     http_req_connecting............: avg=2.4ms    min=0s      med=0s       max=3.67s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=882.84ms min=3.46ms  med=715.72ms max=5.35s p(90)=1.83s    p(95)=2.32s  
       { expected_response:true }...: avg=882.84ms min=3.46ms  med=715.72ms max=5.35s p(90)=1.83s    p(95)=2.32s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10756
     http_req_receiving.............: avg=279.54ms min=35.63µs med=99.18µs  max=4.75s p(90)=1.08s    p(95)=1.72s  
     http_req_sending...............: avg=27.6ms   min=8.72µs  med=21.29µs  max=3.16s p(90)=140.32µs p(95)=20.21ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=575.69ms min=3.34ms  med=550.79ms max=3.05s p(90)=1.02s    p(95)=1.16s  
     http_reqs......................: 10756   176.403885/s
     iteration_duration.............: avg=1.68s    min=20.97ms med=1.37s    max=9.63s p(90)=3.49s    p(95)=4.24s  
     iterations.....................: 10736   176.075875/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/028ad7d7-303f-4242-b47e-3d71170d6f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3e50f4f4-db30-4344-90ef-8042449ecd00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/947b59d2-7a15-4d6a-69a4-1f8fff01cd00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30852      ✗ 0    
     data_received..................: 906 MB  15 MB/s
     data_sent......................: 12 MB   201 kB/s
     http_req_blocked...............: avg=1.59ms   min=1.29µs  med=3.53µs   max=2.43s p(90)=5.3µs   p(95)=11.47µs
     http_req_connecting............: avg=856.19µs min=0s      med=0s       max=2.43s p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=894.74ms min=3.04ms  med=743.12ms max=5.89s p(90)=1.84s   p(95)=2.25s  
       { expected_response:true }...: avg=894.74ms min=3.04ms  med=743.12ms max=5.89s p(90)=1.84s   p(95)=2.25s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10304
     http_req_receiving.............: avg=311.79ms min=35.78µs med=90.03µs  max=5.67s p(90)=1.26s   p(95)=1.65s  
     http_req_sending...............: avg=16.3ms   min=7.56µs  med=16.53µs  max=2.36s p(90)=86.05µs p(95)=1.05ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=566.63ms min=2.99ms  med=532.23ms max=2.44s p(90)=1.01s   p(95)=1.24s  
     http_reqs......................: 10304   168.974767/s
     iteration_duration.............: avg=1.75s    min=23.65ms med=1.54s    max=9.23s p(90)=3.48s   p(95)=4.21s  
     iterations.....................: 10284   168.646788/s
     vus............................: 17      min=17       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7d9bb5a0-4197-4a49-8941-a72c7356ac00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1ae6e653-909a-4f62-319c-bfed3068b500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/74ab2950-ced5-4d0d-f189-6f9a7bfd8700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 29634      ✗ 0    
     data_received..................: 869 MB  14 MB/s
     data_sent......................: 12 MB   193 kB/s
     http_req_blocked...............: avg=1.75ms   min=1.41µs  med=3.16µs   max=1.66s  p(90)=5.17µs   p(95)=10.99µs
     http_req_connecting............: avg=1.59ms   min=0s      med=0s       max=1.66s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=942.64ms min=6.63ms  med=787.05ms max=5.52s  p(90)=1.87s    p(95)=2.33s  
       { expected_response:true }...: avg=942.64ms min=6.63ms  med=787.05ms max=5.52s  p(90)=1.87s    p(95)=2.33s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 9898 
     http_req_receiving.............: avg=277.46ms min=33.79µs med=84.59µs  max=4.3s   p(90)=1.16s    p(95)=1.65s  
     http_req_sending...............: avg=17.57ms  min=8.04µs  med=14.92µs  max=4.15s  p(90)=112.12µs p(95)=15.71ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=647.61ms min=6.54ms  med=615.65ms max=2.52s  p(90)=1.1s     p(95)=1.24s  
     http_reqs......................: 9898    162.297432/s
     iteration_duration.............: avg=1.82s    min=31.24ms med=1.56s    max=10.88s p(90)=3.52s    p(95)=4.29s  
     iterations.....................: 9878    161.969492/s
     vus............................: 2       min=2        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b3fb35c2-284b-473e-f33c-dc116aa5af00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c9439ec6-b7a2-40cc-f1a4-b6b6e64b3c00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8185f29b-60b9-4489-ef7e-0619de9e5200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5434 / ✗ 69
     ✗ no graphql errors
      ↳  98% — ✓ 5434 / ✗ 69
     ✓ valid response structure

     █ setup

     checks.........................: 99.16% ✓ 16302     ✗ 138  
     data_received..................: 479 MB 7.7 MB/s
     data_sent......................: 6.6 MB 105 kB/s
     http_req_blocked...............: avg=304.17µs min=1.37µs  med=2.95µs  max=13.89ms  p(90)=4.75µs   p(95)=284.73µs
     http_req_connecting............: avg=294.75µs min=0s      med=0s      max=13.37ms  p(90)=0s       p(95)=211.13µs
     http_req_duration..............: avg=3.29s    min=11.44ms med=1.86s   max=1m0s     p(90)=2.61s    p(95)=3.03s   
       { expected_response:true }...: avg=2.57s    min=11.44ms med=1.84s   max=59.88s   p(90)=2.59s    p(95)=2.81s   
     http_req_failed................: 1.24%  ✓ 69        ✗ 5454 
     http_req_receiving.............: avg=649.96µs min=0s      med=103.7µs max=243.72ms p(90)=215.01µs p(95)=390.66µs
     http_req_sending...............: avg=142.41µs min=8.49µs  med=14.67µs max=73.99ms  p(90)=35.65µs  p(95)=183.71µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.29s    min=11.37ms med=1.85s   max=1m0s     p(90)=2.61s    p(95)=3.03s   
     http_reqs......................: 5523   88.387569/s
     iteration_duration.............: avg=3.32s    min=352.6ms med=1.88s   max=1m0s     p(90)=2.63s    p(95)=3.04s   
     iterations.....................: 5503   88.067498/s
     vus............................: 90     min=90      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7a861f1f-b971-4314-957b-104e3bcb0500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/93b0dbe5-32c3-4009-a8ef-cffdbdbe6200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a4b53c82-d44c-49dc-e59f-76c00d64fc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 16155     ✗ 0    
     data_received..................: 474 MB  7.5 MB/s
     data_sent......................: 6.4 MB  102 kB/s
     http_req_blocked...............: avg=1.2ms   min=1.47µs   med=3.9µs   max=82.87ms  p(90)=6.44µs   p(95)=950.4µs 
     http_req_connecting............: avg=1.16ms  min=0s       med=0s      max=82.84ms  p(90)=0s       p(95)=456.01µs
     http_req_duration..............: avg=3.3s    min=15.93ms  med=2.94s   max=7.36s    p(90)=5.15s    p(95)=5.56s   
       { expected_response:true }...: avg=3.3s    min=15.93ms  med=2.94s   max=7.36s    p(90)=5.15s    p(95)=5.56s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5405 
     http_req_receiving.............: avg=55.08ms min=39.17µs  med=103µs   max=1.95s    p(90)=47.5ms   p(95)=453.94ms
     http_req_sending...............: avg=1.84ms  min=9.11µs   med=20.06µs max=798.33ms p(90)=128.87µs p(95)=3.94ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.25s   min=15.69ms  med=2.9s    max=7.36s    p(90)=5.1s     p(95)=5.49s   
     http_reqs......................: 5405    85.551833/s
     iteration_duration.............: avg=3.43s   min=146.48ms med=3.03s   max=7.37s    p(90)=5.34s    p(95)=5.78s   
     iterations.....................: 5385    85.235267/s
     vus............................: 55      min=55      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/88c4d77c-f43c-4b45-0528-002ae1c57200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fd58ba72-d6a7-4607-9a6b-308ed3a9ab00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/db4709da-6f4f-4cdf-01af-8829dc7ecc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 5052 / ✗ 13
     ✗ no graphql errors
      ↳  99% — ✓ 5052 / ✗ 13
     ✓ valid response structure

     █ setup

     checks.........................: 99.82% ✓ 15156     ✗ 26   
     data_received..................: 445 MB 7.0 MB/s
     data_sent......................: 6.0 MB 95 kB/s
     http_req_blocked...............: avg=1.07ms   min=1.46µs   med=3.57µs   max=74.1ms  p(90)=5.54µs   p(95)=1.77ms  
     http_req_connecting............: avg=1.04ms   min=0s       med=0s       max=67.62ms p(90)=0s       p(95)=1.14ms  
     http_req_duration..............: avg=3.59s    min=17.61ms  med=2.52s    max=1m0s    p(90)=3.68s    p(95)=5.1s    
       { expected_response:true }...: avg=3.45s    min=17.61ms  med=2.51s    max=59.85s  p(90)=3.66s    p(95)=5.02s   
     http_req_failed................: 0.25%  ✓ 13        ✗ 5072 
     http_req_receiving.............: avg=369.41µs min=0s       med=105.56µs max=47.35ms p(90)=423.84µs p(95)=1.22ms  
     http_req_sending...............: avg=216.23µs min=8.85µs   med=20.48µs  max=58.11ms p(90)=47.19µs  p(95)=330.44µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.59s    min=17.33ms  med=2.52s    max=1m0s    p(90)=3.68s    p(95)=5.1s    
     http_reqs......................: 5085   80.310172/s
     iteration_duration.............: avg=3.63s    min=585.53ms med=2.54s    max=1m0s    p(90)=3.73s    p(95)=5.13s   
     iterations.....................: 5065   79.994301/s
     vus............................: 43     min=43      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e90eb221-de41-43f6-2f11-155abf97ca00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/59d2a87f-14c5-4b61-eb1b-a8d85f4f1100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0be67878-f4bb-4395-d1e5-24eeb12af900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14403     ✗ 0    
     data_received..................: 423 MB  6.8 MB/s
     data_sent......................: 5.7 MB  92 kB/s
     http_req_blocked...............: avg=564.75µs min=1.72µs   med=3.67µs   max=28.36ms  p(90)=5.59µs   p(95)=3.67ms  
     http_req_connecting............: avg=540.03µs min=0s       med=0s       max=17.49ms  p(90)=0s       p(95)=3.32ms  
     http_req_duration..............: avg=3.76s    min=11.56ms  med=3.76s    max=7.44s    p(90)=4.61s    p(95)=4.84s   
       { expected_response:true }...: avg=3.76s    min=11.56ms  med=3.76s    max=7.44s    p(90)=4.61s    p(95)=4.84s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4821 
     http_req_receiving.............: avg=1.09ms   min=37.51µs  med=104.59µs max=196.83ms p(90)=280.61µs p(95)=653.53µs
     http_req_sending...............: avg=136.6µs  min=8.54µs   med=20.9µs   max=109.98ms p(90)=42.29µs  p(95)=198.92µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.76s    min=11.45ms  med=3.76s    max=7.44s    p(90)=4.61s    p(95)=4.84s   
     http_reqs......................: 4821    77.681115/s
     iteration_duration.............: avg=3.8s     min=469.42ms med=3.77s    max=7.44s    p(90)=4.63s    p(95)=4.86s   
     iterations.....................: 4801    77.358853/s
     vus............................: 59      min=59      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d5701aee-2a40-4ac7-efba-4a26cede5b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/40d36d98-0a05-4e77-0dc8-a1e84f8bdd00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d1ce111d-4425-4b4a-05b7-e3d85611ac00/public" alt="HTTP Overview" />


  </details>