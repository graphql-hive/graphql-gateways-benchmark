## Overview for: `federation/ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was trying to reach 2000 concurrent VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2563cc85-9021-452d-0791-a878ab8e7100/public" alt="Comparison" />


| Gateway          | duration(p95)⬇️ | Successful RPS |        Requests         |                       Durations                        | Notes                                                                                                              |
| :--------------- | :-------------: | :------------: | :---------------------: | :----------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------- |
| apollo-router    |     6463ms      |      155       | 11448 total, 518 failed |  avg: 2738ms, p95: 6463ms, max: 22126ms, med: 2552ms   | ❌ 518 failed requests, 518 non-200 responses, 520 unexpected GraphQL errors, non-compatible response structure (3) |
| grafbase         |     7506ms      |      166       |  11690 total, 0 failed  |  avg: 3252ms, p95: 7506ms, max: 14963ms, med: 2937ms   | ✅                                                                                                                  |
| cosmo            |     10942ms     |      175       |  12323 total, 0 failed  |  avg: 2760ms, p95: 10942ms, max: 20059ms, med: 1930ms  | ✅                                                                                                                  |
| hive-gateway-bun |     29504ms     |       85       |  7050 total, 0 failed   | avg: 12182ms, p95: 29504ms, max: 36030ms, med: 10733ms | ✅                                                                                                                  |
| mercurius        |     40437ms     |       55       |  5016 total, 0 failed   | avg: 21529ms, p95: 40437ms, max: 41800ms, med: 20197ms | ✅                                                                                                                  |
| hive-gateway     |     54130ms     |       77       |  7010 total, 0 failed   | avg: 13754ms, p95: 54130ms, max: 59528ms, med: 3635ms  | ✅                                                                                                                  |
| apollo-server    |     59999ms     |       75       | 7517 total, 529 failed  | avg: 12284ms, p95: 60000ms, max: 60028ms, med: 2240ms  | ❌ 529 failed requests, 529 non-200 responses, 529 unexpected GraphQL errors                                        |



<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  95% — ✓ 10910 / ✗ 518
     ✗ no graphql errors
      ↳  95% — ✓ 10908 / ✗ 520
     ✗ valid response structure
      ↳  99% — ✓ 10908 / ✗ 3

     █ setup

     checks.........................: 96.91% ✓ 32726      ✗ 1041  
     data_received..................: 959 MB 14 MB/s
     data_sent......................: 14 MB  194 kB/s
     http_req_blocked...............: avg=645.34ms min=1.7µs  med=4.26µs  max=12.01s p(90)=2.75s    p(95)=5.16s   
     http_req_connecting............: avg=500.73ms min=0s     med=0s      max=8.96s  p(90)=2.14s    p(95)=3.35s   
     http_req_duration..............: avg=2.73s    min=6.96ms med=2.55s   max=22.12s p(90)=5.6s     p(95)=6.46s   
       { expected_response:true }...: avg=2.73s    min=6.96ms med=2.55s   max=22.12s p(90)=5.66s    p(95)=6.46s   
     http_req_failed................: 4.52%  ✓ 518        ✗ 10930 
     http_req_receiving.............: avg=392.79ms min=0s     med=88.14µs max=8.62s  p(90)=1.12s    p(95)=2.33s   
     http_req_sending...............: avg=146ms    min=7.37µs med=22.88µs max=16.27s p(90)=314.56ms p(95)=757.67ms
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.19s    min=6.86ms med=2.05s   max=10.5s  p(90)=4.13s    p(95)=4.86s   
     http_reqs......................: 11448  163.07624/s
     iteration_duration.............: avg=6.24s    min=8.98ms med=5.18s   max=33.63s p(90)=12.92s   p(95)=15.7s   
     iterations.....................: 11428  162.791341/s
     vus............................: 6      min=6        max=1928
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/84f5010b-a574-42e3-566e-9ce909626900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/39ebd48d-3340-4021-b370-8414e40e2700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4c9bcfc8-2f61-410d-616c-1189a7708100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 35010      ✗ 0     
     data_received..................: 1.0 GB  15 MB/s
     data_sent......................: 14 MB   198 kB/s
     http_req_blocked...............: avg=427.77ms min=1.6µs   med=3.86µs  max=13.97s p(90)=1.68s    p(95)=3.91s   
     http_req_connecting............: avg=424.96ms min=0s      med=0s      max=10.76s p(90)=1.67s    p(95)=3.91s   
     http_req_duration..............: avg=3.25s    min=3.51ms  med=2.93s   max=14.96s p(90)=5.68s    p(95)=7.5s    
       { expected_response:true }...: avg=3.25s    min=3.51ms  med=2.93s   max=14.96s p(90)=5.68s    p(95)=7.5s    
     http_req_failed................: 0.00%   ✓ 0          ✗ 11690 
     http_req_receiving.............: avg=136.44ms min=29.69µs med=78.33µs max=7.7s   p(90)=235.6ms  p(95)=926.48ms
     http_req_sending...............: avg=164.69ms min=7.86µs  med=19.15µs max=9.4s   p(90)=392.66ms p(95)=777.7ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.95s    min=3.43ms  med=2.59s   max=10.94s p(90)=5.34s    p(95)=5.87s   
     http_reqs......................: 11690   166.764715/s
     iteration_duration.............: avg=6.18s    min=9.24ms  med=5.17s   max=28.53s p(90)=11.73s   p(95)=14.52s  
     iterations.....................: 11670   166.479403/s
     vus............................: 179     min=66       max=1946
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/84177f33-8adb-47ef-6b69-edc90e41c400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8323801c-dfc9-46d1-f106-521b60449b00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/78bb33b7-ef63-4280-9b17-640feefb4500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 36909      ✗ 0     
     data_received..................: 1.1 GB  15 MB/s
     data_sent......................: 15 MB   209 kB/s
     http_req_blocked...............: avg=327.71ms min=1.68µs  med=3.73µs  max=17.11s p(90)=844.84ms p(95)=1.89s   
     http_req_connecting............: avg=320.32ms min=0s      med=0s      max=17.05s p(90)=842.98ms p(95)=1.89s   
     http_req_duration..............: avg=2.76s    min=3.38ms  med=1.93s   max=20.05s p(90)=5.77s    p(95)=10.94s  
       { expected_response:true }...: avg=2.76s    min=3.38ms  med=1.93s   max=20.05s p(90)=5.77s    p(95)=10.94s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 12323 
     http_req_receiving.............: avg=866.24ms min=33.39µs med=88.62µs max=17.42s p(90)=2.31s    p(95)=8.22s   
     http_req_sending...............: avg=206.63ms min=8.05µs  med=17.72µs max=13.48s p(90)=362.9ms  p(95)=804.37ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.68s    min=3.15ms  med=1.5s    max=12.73s p(90)=3.27s    p(95)=3.93s   
     http_reqs......................: 12323   175.668787/s
     iteration_duration.............: avg=5.78s    min=9.12ms  med=4.37s   max=30.7s  p(90)=13.62s   p(95)=16.5s   
     iterations.....................: 12303   175.38368/s
     vus............................: 90      min=71       max=1986
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cd101644-19fe-41bc-7699-ccd5a2238400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b8264205-6a3e-4a65-7843-3f90f1cb9000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/317aba2a-0ac1-4f8d-2562-9c8f615ab000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 21090     ✗ 0     
     data_received..................: 619 MB  7.5 MB/s
     data_sent......................: 8.4 MB  102 kB/s
     http_req_blocked...............: avg=14ms     min=1.95µs   med=5.01µs   max=764.09ms p(90)=19.91ms p(95)=98.82ms 
     http_req_connecting............: avg=13.8ms   min=0s       med=0s       max=557.93ms p(90)=19.57ms p(95)=98.43ms 
     http_req_duration..............: avg=12.18s   min=16.46ms  med=10.73s   max=36.03s   p(90)=26.14s  p(95)=29.5s   
       { expected_response:true }...: avg=12.18s   min=16.46ms  med=10.73s   max=36.03s   p(90)=26.14s  p(95)=29.5s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 7050  
     http_req_receiving.............: avg=109.64ms min=41.06µs  med=142.89µs max=7.69s    p(90)=21.42ms p(95)=508.69ms
     http_req_sending...............: avg=9.35ms   min=9.62µs   med=30.54µs  max=1.23s    p(90)=13.3ms  p(95)=48.4ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=12.06s   min=16.26ms  med=10.65s   max=36s      p(90)=26.03s  p(95)=29.46s  
     http_reqs......................: 7050    85.704/s
     iteration_duration.............: avg=12.46s   min=102.94ms med=10.92s   max=38.06s   p(90)=26.65s  p(95)=30.02s  
     iterations.....................: 7030    85.460868/s
     vus............................: 69      min=53      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ceb5a0fb-8edc-4e81-00f2-cb723a205200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/12d42256-4602-4044-9a18-1eb8814b0300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dd60fe73-f5c1-49e0-ce17-e5a2f418d000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14988     ✗ 0     
     data_received..................: 440 MB  4.8 MB/s
     data_sent......................: 6.0 MB  66 kB/s
     http_req_blocked...............: avg=269.74µs min=1.66µs   med=4.55µs   max=12.52ms p(90)=597.41µs p(95)=982.66µs
     http_req_connecting............: avg=231.8µs  min=0s       med=0s       max=12.44ms p(90)=508.04µs p(95)=846µs   
     http_req_duration..............: avg=21.52s   min=12.35ms  med=20.19s   max=41.79s  p(90)=39.85s   p(95)=40.43s  
       { expected_response:true }...: avg=21.52s   min=12.35ms  med=20.19s   max=41.79s  p(90)=39.85s   p(95)=40.43s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 5016  
     http_req_receiving.............: avg=140.99ms min=38.1µs   med=120.12µs max=2.56s   p(90)=416.64ms p(95)=1.1s    
     http_req_sending...............: avg=67.13µs  min=8.68µs   med=28.91µs  max=18.09ms p(90)=76.12µs  p(95)=101.78µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=21.38s   min=12.25ms  med=20.19s   max=41.41s  p(90)=39.76s   p(95)=40.41s  
     http_reqs......................: 5016    55.167103/s
     iteration_duration.............: avg=21.77s   min=293.73ms med=20.25s   max=43.37s  p(90)=40.18s   p(95)=40.83s  
     iterations.....................: 4996    54.947139/s
     vus............................: 87      min=57      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/eb16592b-bdde-4e2f-6d75-97e881bccc00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6d0bf886-fa62-431b-2793-91dbafd9b300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/05c9b29f-2e28-41a1-22b5-51226b2a3800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 20970     ✗ 0     
     data_received..................: 616 MB  6.8 MB/s
     data_sent......................: 8.3 MB  92 kB/s
     http_req_blocked...............: avg=2.23ms   min=1.91µs  med=4.47µs   max=180.19ms p(90)=1.24ms   p(95)=9.37ms
     http_req_connecting............: avg=2.19ms   min=0s      med=0s       max=180.11ms p(90)=1ms      p(95)=9.19ms
     http_req_duration..............: avg=13.75s   min=15.68ms med=3.63s    max=59.52s   p(90)=48s      p(95)=54.13s
       { expected_response:true }...: avg=13.75s   min=15.68ms med=3.63s    max=59.52s   p(90)=48s      p(95)=54.13s
     http_req_failed................: 0.00%   ✓ 0         ✗ 7010  
     http_req_receiving.............: avg=562.2µs  min=43.63µs med=117.91µs max=84.29ms  p(90)=891.49µs p(95)=2.58ms
     http_req_sending...............: avg=864.45µs min=10.57µs med=28.31µs  max=121.4ms  p(90)=150.01µs p(95)=2.21ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=13.75s   min=15.57ms med=3.63s    max=59.52s   p(90)=48s      p(95)=54.12s
     http_reqs......................: 7010    77.715875/s
     iteration_duration.............: avg=13.82s   min=96.87ms med=3.67s    max=59.59s   p(90)=48.03s   p(95)=54.18s
     iterations.....................: 6990    77.494146/s
     vus............................: 43      min=43      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f8c4c632-0cf4-4953-478d-2434b4f3a600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/930797eb-2703-46e8-c520-76c4a1446e00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6ce74571-522b-4d91-37ae-ee9829a81e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  92% — ✓ 6968 / ✗ 529
     ✗ no graphql errors
      ↳  92% — ✓ 6968 / ✗ 529
     ✓ valid response structure

     █ setup

     checks.........................: 95.18% ✓ 20904     ✗ 1058  
     data_received..................: 614 MB 6.6 MB/s
     data_sent......................: 9.0 MB 97 kB/s
     http_req_blocked...............: avg=602.43µs min=1.44µs  med=3.63µs   max=98.6ms  p(90)=426.53µs p(95)=825.46µs
     http_req_connecting............: avg=561.23µs min=0s      med=0s       max=98.05ms p(90)=352.46µs p(95)=715.92µs
     http_req_duration..............: avg=12.28s   min=10.46ms med=2.24s    max=1m0s    p(90)=56.42s   p(95)=59.99s  
       { expected_response:true }...: avg=8.67s    min=10.46ms med=2.16s    max=59.98s  p(90)=37.57s   p(95)=47.59s  
     http_req_failed................: 7.03%  ✓ 529       ✗ 6988  
     http_req_receiving.............: avg=306.24µs min=0s      med=110.11µs max=283.5ms p(90)=238.36µs p(95)=413.99µs
     http_req_sending...............: avg=297.71µs min=8.76µs  med=19.22µs  max=88.16ms p(90)=71.05µs  p(95)=142.65µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=12.28s   min=10.36ms med=2.23s    max=1m0s    p(90)=56.42s   p(95)=59.99s  
     http_reqs......................: 7517   81.108159/s
     iteration_duration.............: avg=12.33s   min=57.59ms med=2.26s    max=1m0s    p(90)=56.47s   p(95)=1m0s    
     iterations.....................: 7497   80.89236/s
     vus............................: 84     min=62      max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c4c84927-c9b8-4603-ca85-15c6df0e9b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9feecc67-07db-4363-7d7c-586918419f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8a895828-92f8-4465-9bfc-ba49b616e500/public" alt="HTTP Overview" />


  </details>