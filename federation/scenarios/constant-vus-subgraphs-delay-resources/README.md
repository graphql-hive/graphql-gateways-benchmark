## Overview for: `federation/constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/57eb6ee4-6ade-4720-d8c9-84e727791a00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration          | Notes                                                                                                           |
| :--------------- | :----: | :--------------------: | :-----------------------: | :-------------------------------------------------------------------------------------------------------------- |
| cosmo            |  174   | 10668 total, 0 failed  | avg: 1363ms, p95: 3315ms  | ✅                                                                                                               |
| grafbase         |  167   | 10288 total, 0 failed  | avg: 1450ms, p95: 4254ms  | ✅                                                                                                               |
| apollo-router    |  158   | 9781 total, 29 failed  | avg: 1487ms, p95: 3718ms  | ❌ 29 failed requests, 29 non-200 responses, 40 unexpected GraphQL errors, non-compatible response structure (8) |
| apollo-server    |   91   | 5702 total, 253 failed | avg: 5302ms, p95: 43007ms | ❌ 253 failed requests, 253 non-200 responses, 253 unexpected GraphQL errors                                     |
| hive-gateway-bun |   91   |  5922 total, 0 failed  | avg: 5121ms, p95: 8562ms  | ✅                                                                                                               |
| hive-gateway     |   88   | 5655 total, 135 failed | avg: 5383ms, p95: 20449ms | ❌ 135 failed requests, 135 non-200 responses, 135 unexpected GraphQL errors                                     |
| mercurius        |   73   |  4651 total, 0 failed  | avg: 6566ms, p95: 8693ms  | ✅                                                                                                               |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31944      ✗ 0    
     data_received..................: 936 MB  15 MB/s
     data_sent......................: 13 MB   207 kB/s
     http_req_blocked...............: avg=4.03ms   min=1.49µs  med=3.45µs   max=2.51s  p(90)=5.92µs   p(95)=191.05µs
     http_req_connecting............: avg=3.6ms    min=0s      med=0s       max=1.8s   p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.36s    min=3.22ms  med=1.18s    max=9.17s  p(90)=2.71s    p(95)=3.31s   
       { expected_response:true }...: avg=1.36s    min=3.22ms  med=1.18s    max=9.17s  p(90)=2.71s    p(95)=3.31s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10668
     http_req_receiving.............: avg=457.21ms min=34.79µs med=106.73µs max=6.39s  p(90)=1.55s    p(95)=2.5s    
     http_req_sending...............: avg=37.45ms  min=7.96µs  med=15.98µs  max=3.85s  p(90)=205.03µs p(95)=35.17ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=867.84ms min=3.12ms  med=784.54ms max=3.95s  p(90)=1.59s    p(95)=1.78s   
     http_reqs......................: 10668   174.081877/s
     iteration_duration.............: avg=2.81s    min=24.61ms med=2.56s    max=12.84s p(90)=5.33s    p(95)=6.21s   
     iterations.....................: 10648   173.755514/s
     vus............................: 245     min=245      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bcd3fb09-6c14-47b6-7c17-30100d342a00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c616d5a8-aedd-4687-cf93-1f1d85ad2a00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4df6168d-f3b8-495b-8607-0b1d8a4cb400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30804      ✗ 0    
     data_received..................: 904 MB  15 MB/s
     data_sent......................: 12 MB   199 kB/s
     http_req_blocked...............: avg=3.06ms   min=1.57µs  med=3.49µs  max=3.6s   p(90)=5.52µs   p(95)=563.3µs
     http_req_connecting............: avg=2.31ms   min=0s      med=0s      max=2.73s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=1.44s    min=3.27ms  med=1.2s    max=8.23s  p(90)=2.79s    p(95)=4.25s  
       { expected_response:true }...: avg=1.44s    min=3.27ms  med=1.2s    max=8.23s  p(90)=2.79s    p(95)=4.25s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10288
     http_req_receiving.............: avg=350.14ms min=25.66µs med=79.92µs max=7.43s  p(90)=1.46s    p(95)=2.29s  
     http_req_sending...............: avg=35.25ms  min=7.46µs  med=16.35µs max=5.38s  p(90)=386.17µs p(95)=13.37ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=1.06s    min=3.19ms  med=1.02s   max=5.46s  p(90)=1.86s    p(95)=2.12s  
     http_reqs......................: 10288   167.528237/s
     iteration_duration.............: avg=2.92s    min=20.43ms med=2.54s   max=14.18s p(90)=5.62s    p(95)=6.8s   
     iterations.....................: 10268   167.20256/s
     vus............................: 237     min=237      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5cafdeae-de31-4572-8275-9a304a08d600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/edfe8b4a-3d0a-4b44-f50e-3d4405b17e00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d633474c-fd4a-41e3-2796-70b8f51e1100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 9732 / ✗ 29
     ✗ no graphql errors
      ↳  99% — ✓ 9721 / ✗ 40
     ✗ valid response structure
      ↳  99% — ✓ 9725 / ✗ 8

     █ setup

     checks.........................: 99.73% ✓ 29178      ✗ 77   
     data_received..................: 856 MB 14 MB/s
     data_sent......................: 12 MB  188 kB/s
     http_req_blocked...............: avg=11.6ms   min=1.46µs  med=3.53µs   max=4.19s  p(90)=6.63µs   p(95)=17.48ms
     http_req_connecting............: avg=10.26ms  min=0s      med=0s       max=4.19s  p(90)=0s       p(95)=16.44ms
     http_req_duration..............: avg=1.48s    min=6.81ms  med=1.22s    max=11.94s p(90)=3.02s    p(95)=3.71s  
       { expected_response:true }...: avg=1.48s    min=6.81ms  med=1.22s    max=11.94s p(90)=3s       p(95)=3.71s  
     http_req_failed................: 0.29%  ✓ 29         ✗ 9752 
     http_req_receiving.............: avg=517.26ms min=0s      med=98.39µs  max=7.48s  p(90)=1.8s     p(95)=2.52s  
     http_req_sending...............: avg=46.69ms  min=8.29µs  med=16.14µs  max=6.79s  p(90)=325.25µs p(95)=12.01ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=923.35ms min=3.63ms  med=849.03ms max=5.64s  p(90)=1.69s    p(95)=2.07s  
     http_reqs......................: 9781   158.694262/s
     iteration_duration.............: avg=3.08s    min=40.19ms med=2.67s    max=15.31s p(90)=6.05s    p(95)=7.15s  
     iterations.....................: 9761   158.369767/s
     vus............................: 313    min=313      max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/17e3d0f9-28e6-4ffc-c7cc-14caaa1cf500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f575e4f7-9f6f-4f09-943f-949f62d4a200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/05e10911-6df3-42a4-639e-9cdca9203800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  95% — ✓ 5429 / ✗ 253
     ✗ no graphql errors
      ↳  95% — ✓ 5429 / ✗ 253
     ✓ valid response structure

     █ setup

     checks.........................: 96.98% ✓ 16287     ✗ 506  
     data_received..................: 479 MB 7.6 MB/s
     data_sent......................: 6.8 MB 108 kB/s
     http_req_blocked...............: avg=1.4ms    min=1.38µs   med=2.85µs   max=45.54ms p(90)=9.97µs   p(95)=13.15ms 
     http_req_connecting............: avg=1.36ms   min=0s       med=0s       max=45.51ms p(90)=0s       p(95)=12.68ms 
     http_req_duration..............: avg=5.3s     min=10.67ms  med=2.18s    max=1m0s    p(90)=2.85s    p(95)=43s     
       { expected_response:true }...: avg=2.76s    min=10.67ms  med=2.13s    max=59.56s  p(90)=2.7s     p(95)=2.91s   
     http_req_failed................: 4.43%  ✓ 253       ✗ 5449 
     http_req_receiving.............: avg=281.48µs min=0s       med=101.44µs max=71.35ms p(90)=206.71µs p(95)=353.77µs
     http_req_sending...............: avg=227.42µs min=7.75µs   med=14.53µs  max=46.14ms p(90)=55.4µs   p(95)=813.34µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.3s     min=10.6ms   med=2.18s    max=1m0s    p(90)=2.85s    p(95)=43s     
     http_reqs......................: 5702   91.021711/s
     iteration_duration.............: avg=5.33s    min=366.77ms med=2.19s    max=1m0s    p(90)=2.86s    p(95)=43.51s  
     iterations.....................: 5682   90.702449/s
     vus............................: 103    min=103     max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/358d80a0-7148-439f-0c6a-db3905212200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a080ecc5-4b0c-47b9-aeac-8794cc0bdf00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d9e189f1-7114-41f3-0100-8c6c02d98e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17706     ✗ 0    
     data_received..................: 520 MB  8.0 MB/s
     data_sent......................: 7.0 MB  108 kB/s
     http_req_blocked...............: avg=128.14µs min=1.91µs   med=4.01µs   max=24.15ms  p(90)=12.96µs p(95)=327.03µs
     http_req_connecting............: avg=103.33µs min=0s       med=0s       max=21.26ms  p(90)=0s      p(95)=175.4µs 
     http_req_duration..............: avg=5.12s    min=15.35ms  med=4.74s    max=13.33s   p(90)=7.65s   p(95)=8.56s   
       { expected_response:true }...: avg=5.12s    min=15.35ms  med=4.74s    max=13.33s   p(90)=7.65s   p(95)=8.56s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5922 
     http_req_receiving.............: avg=70.22ms  min=40.63µs  med=101.39µs max=3.71s    p(90)=12.8ms  p(95)=318.81ms
     http_req_sending...............: avg=1.79ms   min=9.36µs   med=20.33µs  max=459.41ms p(90)=85.31µs p(95)=311.94µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=5.04s    min=15.15ms  med=4.67s    max=13.33s   p(90)=7.58s   p(95)=8.54s   
     http_reqs......................: 5922    91.173996/s
     iteration_duration.............: avg=5.3s     min=425.15ms med=4.9s     max=13.75s   p(90)=7.76s   p(95)=8.81s   
     iterations.....................: 5902    90.866079/s
     vus............................: 3       min=3       max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b9812dc8-d4ca-403b-0834-3b4734c68900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/08b98e98-cc2f-4d9f-9e38-19b8f7f93700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7ff5b3cc-ebdb-428c-ad98-8202a90caa00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  97% — ✓ 5500 / ✗ 135
     ✗ no graphql errors
      ↳  97% — ✓ 5500 / ✗ 135
     ✓ valid response structure

     █ setup

     checks.........................: 98.38% ✓ 16500     ✗ 270  
     data_received..................: 485 MB 7.6 MB/s
     data_sent......................: 6.7 MB 105 kB/s
     http_req_blocked...............: avg=2.65ms   min=1.84µs   med=4.11µs   max=92.7ms   p(90)=13.3µs   p(95)=27.81ms
     http_req_connecting............: avg=2.58ms   min=0s       med=0s       max=67.02ms  p(90)=0s       p(95)=26.96ms
     http_req_duration..............: avg=5.38s    min=17.12ms  med=3.08s    max=1m0s     p(90)=4.68s    p(95)=20.44s 
       { expected_response:true }...: avg=4.04s    min=17.12ms  med=3.06s    max=59.92s   p(90)=4.25s    p(95)=6.19s  
     http_req_failed................: 2.38%  ✓ 135       ✗ 5520 
     http_req_receiving.............: avg=2.14ms   min=0s       med=101.89µs max=278.26ms p(90)=978.38µs p(95)=3.41ms 
     http_req_sending...............: avg=695.65µs min=9.21µs   med=22.84µs  max=202.31ms p(90)=206.81µs p(95)=1.68ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=5.38s    min=16.99ms  med=3.07s    max=1m0s     p(90)=4.68s    p(95)=20.44s 
     http_reqs......................: 5655   88.094183/s
     iteration_duration.............: avg=5.44s    min=307.98ms med=3.12s    max=1m0s     p(90)=4.76s    p(95)=20.92s 
     iterations.....................: 5635   87.782621/s
     vus............................: 48     min=48      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d016fae7-fb6b-4ad8-7b3e-69ec77952200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/86b65bb7-4d06-4ed1-dfd9-2c1abb393000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fd2617d4-a2b8-41dd-2f7e-9ea356829800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 13893     ✗ 0    
     data_received..................: 408 MB  6.5 MB/s
     data_sent......................: 5.5 MB  88 kB/s
     http_req_blocked...............: avg=4.21ms  min=1.8µs    med=4.4µs    max=98.35ms  p(90)=226.23µs p(95)=38.78ms
     http_req_connecting............: avg=4.12ms  min=0s       med=0s       max=85.34ms  p(90)=167.94µs p(95)=38.59ms
     http_req_duration..............: avg=6.56s   min=12.68ms  med=6.52s    max=12.97s   p(90)=8.01s    p(95)=8.69s  
       { expected_response:true }...: avg=6.56s   min=12.68ms  med=6.52s    max=12.97s   p(90)=8.01s    p(95)=8.69s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 4651 
     http_req_receiving.............: avg=15.45ms min=40.43µs  med=112.01µs max=749.79ms p(90)=371.78µs p(95)=25.07ms
     http_req_sending...............: avg=2.46ms  min=9.3µs    med=26.46µs  max=69.44ms  p(90)=148.82µs p(95)=23.5ms 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=6.54s   min=12.57ms  med=6.52s    max=12.97s   p(90)=8.01s    p(95)=8.69s  
     http_reqs......................: 4651    73.938652/s
     iteration_duration.............: avg=6.63s   min=449.75ms med=6.54s    max=13.02s   p(90)=8.03s    p(95)=8.71s  
     iterations.....................: 4631    73.620705/s
     vus............................: 291     min=291     max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0e6cd9fc-1b6c-435d-e475-629f9d62a700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6e92fd0b-e3c7-4fb1-546e-8b93c52fcc00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/65dfb6e9-de7e-4463-de87-3619145d7300/public" alt="HTTP Overview" />


  </details>