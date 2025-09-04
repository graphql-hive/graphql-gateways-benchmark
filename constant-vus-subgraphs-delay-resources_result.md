## Overview for: `constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/75074581-03e6-4909-37f9-fa09d8c06700/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :--------------- | :----: | :--------------------: | :--------------------: | :---- |
| hive-router      |  1967  | 118530 total, 0 failed |  avg: 25ms, p95: 47ms  | ✅     |
| cosmo            |  699   | 42284 total, 0 failed  | avg: 71ms, p95: 109ms  | ✅     |
| grafbase         |  538   | 32492 total, 0 failed  | avg: 92ms, p95: 123ms  | ✅     |
| apollo-router    |  443   | 26967 total, 0 failed  | avg: 111ms, p95: 149ms | ✅     |
| hive-gateway     |  162   |  9956 total, 0 failed  | avg: 301ms, p95: 408ms | ✅     |
| hive-gateway-bun |  156   |  9606 total, 0 failed  | avg: 312ms, p95: 420ms | ✅     |
| mercurius        |   97   |  5940 total, 0 failed  | avg: 505ms, p95: 576ms | ✅     |
| apollo-gateway   |   84   |  5202 total, 0 failed  | avg: 579ms, p95: 690ms | ✅     |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 355290      ✗ 0     
     data_received..................: 10 GB   173 MB/s
     data_sent......................: 138 MB  2.3 MB/s
     http_req_blocked...............: avg=5.23µs   min=1.15µs  med=2.57µs  max=10.53ms  p(90)=3.75µs   p(95)=4.39µs   p(99.9)=77.73µs
     http_req_connecting............: avg=2.18µs   min=0s      med=0s      max=10.5ms   p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=25.1ms   min=1.95ms  med=22.15ms max=422.36ms p(90)=40.26ms  p(95)=46.6ms   p(99.9)=89.37ms
       { expected_response:true }...: avg=25.1ms   min=1.95ms  med=22.15ms max=422.36ms p(90)=40.26ms  p(95)=46.6ms   p(99.9)=89.37ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 118530
     http_req_receiving.............: avg=125.73µs min=22.69µs med=42.98µs max=106.29ms p(90)=120.09µs p(95)=342.07µs p(99.9)=14.78ms
     http_req_sending...............: avg=85.85µs  min=4.91µs  med=10.31µs max=281.29ms p(90)=31.68µs  p(95)=122.3µs  p(99.9)=13.06ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=24.89ms  min=1.89ms  med=21.99ms max=408.22ms p(90)=39.87ms  p(95)=46.13ms  p(99.9)=86.52ms
     http_reqs......................: 118530  1967.575293/s
     iteration_duration.............: avg=25.32ms  min=4.86ms  med=22.35ms max=438.58ms p(90)=40.47ms  p(95)=46.81ms  p(99.9)=89.99ms
     iterations.....................: 118430  1965.915313/s
     success_rate...................: 100.00% ✓ 118430      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/465f8de8-c0c5-4797-9ea3-4ba400d01d00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1b1641b7-75ee-43f0-88cc-8fb98f91cc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 126552     ✗ 0    
     data_received..................: 3.7 GB  61 MB/s
     data_sent......................: 49 MB   814 kB/s
     http_req_blocked...............: avg=11.96µs  min=1.3µs   med=3.15µs  max=12.27ms  p(90)=4.61µs   p(95)=5.74µs   p(99.9)=2.86ms  
     http_req_connecting............: avg=7.18µs   min=0s      med=0s      max=12.2ms   p(90)=0s       p(95)=0s       p(99.9)=1.98ms  
     http_req_duration..............: avg=70.64ms  min=2.88ms  med=68.54ms max=530.52ms p(90)=98.53ms  p(95)=109.02ms p(99.9)=286.21ms
       { expected_response:true }...: avg=70.64ms  min=2.88ms  med=68.54ms max=530.52ms p(90)=98.53ms  p(95)=109.02ms p(99.9)=286.21ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 42284
     http_req_receiving.............: avg=254.02µs min=30.69µs med=74.39µs max=127.31ms p(90)=265.24µs p(95)=522.8µs  p(99.9)=19.7ms  
     http_req_sending...............: avg=62.06µs  min=6.3µs   med=12.1µs  max=141.37ms p(90)=36.44µs  p(95)=132.19µs p(99.9)=5.52ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=70.32ms  min=2.82ms  med=68.22ms max=514.19ms p(90)=98.15ms  p(95)=108.56ms p(99.9)=285.14ms
     http_reqs......................: 42284   699.891213/s
     iteration_duration.............: avg=71.11ms  min=8.33ms  med=68.84ms max=567.27ms p(90)=98.88ms  p(95)=109.37ms p(99.9)=311.44ms
     iterations.....................: 42184   698.235998/s
     success_rate...................: 100.00% ✓ 42184      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bf35dc0d-eb40-4157-a9a3-07345a395700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c284bffe-2ba2-455e-81fc-c92ed6ef9b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 97176      ✗ 0    
     data_received..................: 2.9 GB  47 MB/s
     data_sent......................: 38 MB   626 kB/s
     http_req_blocked...............: avg=14.26µs  min=1.27µs  med=3.27µs  max=10.24ms  p(90)=4.86µs   p(95)=6.98µs   p(99.9)=3.39ms  
     http_req_connecting............: avg=7.67µs   min=0s      med=0s      max=10.21ms  p(90)=0s       p(95)=0s       p(99.9)=3.14ms  
     http_req_duration..............: avg=91.98ms  min=2.71ms  med=90.05ms max=575.18ms p(90)=114.38ms p(95)=123.32ms p(99.9)=365.61ms
       { expected_response:true }...: avg=91.98ms  min=2.71ms  med=90.05ms max=575.18ms p(90)=114.38ms p(95)=123.32ms p(99.9)=365.61ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 32492
     http_req_receiving.............: avg=205.31µs min=25.74µs med=67.93µs max=192.25ms p(90)=198.12µs p(95)=456.42µs p(99.9)=12.3ms  
     http_req_sending...............: avg=112.49µs min=5.9µs   med=12.73µs max=283.42ms p(90)=110.27µs p(95)=136.09µs p(99.9)=7.03ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=91.66ms  min=2.66ms  med=89.78ms max=544.01ms p(90)=114.02ms p(95)=122.87ms p(99.9)=356.15ms
     http_reqs......................: 32492   538.040514/s
     iteration_duration.............: avg=92.64ms  min=27.48ms med=90.43ms max=622.27ms p(90)=114.73ms p(95)=123.77ms p(99.9)=381.49ms
     iterations.....................: 32392   536.384597/s
     success_rate...................: 100.00% ✓ 32392      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/23e46ac1-0975-4998-999d-13f18a820400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3f816002-58a5-4e71-76fc-2d83d3dd6e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 80601      ✗ 0    
     data_received..................: 2.4 GB  39 MB/s
     data_sent......................: 31 MB   516 kB/s
     http_req_blocked...............: avg=13.38µs  min=1.59µs  med=3.03µs   max=9.46ms   p(90)=4.28µs   p(95)=5.06µs   p(99.9)=4.5ms   
     http_req_connecting............: avg=8.82µs   min=0s      med=0s       max=9.43ms   p(90)=0s       p(95)=0s       p(99.9)=4.27ms  
     http_req_duration..............: avg=110.99ms min=5.98ms  med=109.28ms max=532.59ms p(90)=138.41ms p(95)=148.67ms p(99.9)=368.51ms
       { expected_response:true }...: avg=110.99ms min=5.98ms  med=109.28ms max=532.59ms p(90)=138.41ms p(95)=148.67ms p(99.9)=368.51ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 26967
     http_req_receiving.............: avg=121.28µs min=32.53µs med=54.8µs   max=267.23ms p(90)=125.36µs p(95)=261.59µs p(99.9)=4.76ms  
     http_req_sending...............: avg=86.26µs  min=6.94µs  med=11.71µs  max=362.31ms p(90)=29.93µs  p(95)=118.49µs p(99.9)=5.03ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=110.79ms min=5.93ms  med=109.12ms max=512.27ms p(90)=138.23ms p(95)=148.49ms p(99.9)=361.46ms
     http_reqs......................: 26967   443.72473/s
     iteration_duration.............: avg=111.71ms min=38.8ms  med=109.64ms max=578.02ms p(90)=138.72ms p(95)=149.01ms p(99.9)=379.87ms
     iterations.....................: 26867   442.079294/s
     success_rate...................: 100.00% ✓ 26867      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ecba8301-2586-40a1-be13-3a55e61e6500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/28efa665-f9e8-4895-fbdd-a78cb3d9c100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 29568      ✗ 0   
     data_received..................: 874 MB  14 MB/s
     data_sent......................: 12 MB   189 kB/s
     http_req_blocked...............: avg=38.53µs  min=1.71µs  med=4.07µs   max=12.86ms  p(90)=5.67µs   p(95)=6.89µs   p(99.9)=9.98ms  
     http_req_connecting............: avg=32.43µs  min=0s      med=0s       max=12.83ms  p(90)=0s       p(95)=0s       p(99.9)=9.91ms  
     http_req_duration..............: avg=301.29ms min=7.55ms  med=295.73ms max=1.09s    p(90)=380.76ms p(95)=408.48ms p(99.9)=939.06ms
       { expected_response:true }...: avg=301.29ms min=7.55ms  med=295.73ms max=1.09s    p(90)=380.76ms p(95)=408.48ms p(99.9)=939.06ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 9956
     http_req_receiving.............: avg=139.98µs min=34.21µs med=82.66µs  max=226.24ms p(90)=143.67µs p(95)=189.94µs p(99.9)=3.71ms  
     http_req_sending...............: avg=81.1µs   min=7.08µs  med=16.16µs  max=229.25ms p(90)=36.34µs  p(95)=55.92µs  p(99.9)=3.29ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=301.07ms min=7.45ms  med=295.6ms  max=1.09s    p(90)=380.55ms p(95)=408.24ms p(99.9)=937.98ms
     http_reqs......................: 9956    162.437806/s
     iteration_duration.............: avg=304.97ms min=74.22ms med=296.87ms max=1.15s    p(90)=381.84ms p(95)=409.26ms p(99.9)=1.02s   
     iterations.....................: 9856    160.806249/s
     success_rate...................: 100.00% ✓ 9856       ✗ 0   
     vus............................: 50      min=0        max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c60928b0-adf4-4eb8-fed2-73e0a37f0100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2fa2256d-0eac-4dee-38f4-ad5c00667600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 28518      ✗ 0   
     data_received..................: 844 MB  14 MB/s
     data_sent......................: 11 MB   182 kB/s
     http_req_blocked...............: avg=41.22µs  min=1.61µs  med=4.44µs   max=12.43ms  p(90)=6.31µs   p(95)=7.84µs   p(99.9)=10.14ms 
     http_req_connecting............: avg=33.49µs  min=0s      med=0s       max=12.39ms  p(90)=0s       p(95)=0s       p(99.9)=10.12ms 
     http_req_duration..............: avg=312.34ms min=7.88ms  med=307.14ms max=878.45ms p(90)=390.18ms p(95)=420.37ms p(99.9)=774.68ms
       { expected_response:true }...: avg=312.34ms min=7.88ms  med=307.14ms max=878.45ms p(90)=390.18ms p(95)=420.37ms p(99.9)=774.68ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 9606
     http_req_receiving.............: avg=136.73µs min=32.51µs med=86.12µs  max=152.22ms p(90)=153.37µs p(95)=199.37µs p(99.9)=3.54ms  
     http_req_sending...............: avg=103.88µs min=7.5µs   med=17.32µs  max=282.01ms p(90)=38.23µs  p(95)=68.17µs  p(99.9)=3.06ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=312.1ms  min=7.74ms  med=306.95ms max=878.22ms p(90)=389.93ms p(95)=420ms    p(99.9)=773.74ms
     http_reqs......................: 9606    156.716522/s
     iteration_duration.............: avg=316.29ms min=39.47ms med=308.12ms max=914.49ms p(90)=391.27ms p(95)=421.29ms p(99.9)=864.25ms
     iterations.....................: 9506    155.085078/s
     success_rate...................: 100.00% ✓ 9506       ✗ 0   
     vus............................: 50      min=0        max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/99e11100-d78c-42bc-9f99-b34745aff400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2936f1b4-2567-4814-fc5f-914d34991d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 17520     ✗ 0   
     data_received..................: 521 MB  8.5 MB/s
     data_sent......................: 6.9 MB  113 kB/s
     http_req_blocked...............: avg=51.28µs  min=1.34µs  med=2.95µs   max=11.34ms  p(90)=4.33µs   p(95)=4.94µs   p(99.9)=9.93ms  
     http_req_connecting............: avg=46.7µs   min=0s      med=0s       max=11.3ms   p(90)=0s       p(95)=0s       p(99.9)=9.91ms  
     http_req_duration..............: avg=505.14ms min=9.31ms  med=502.79ms max=980.52ms p(90)=559.2ms  p(95)=575.94ms p(99.9)=900.56ms
       { expected_response:true }...: avg=505.14ms min=9.31ms  med=502.79ms max=980.52ms p(90)=559.2ms  p(95)=575.94ms p(99.9)=900.56ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5940
     http_req_receiving.............: avg=118.21µs min=27.94µs med=51.69µs  max=314.63ms p(90)=91.22µs  p(95)=106.74µs p(99.9)=1.49ms  
     http_req_sending...............: avg=179.02µs min=6.3µs   med=11.85µs  max=381.01ms p(90)=17.78µs  p(95)=28.46µs  p(99.9)=5ms     
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=504.84ms min=9.26ms  med=502.69ms max=968.81ms p(90)=559.06ms p(95)=575.41ms p(99.9)=886.17ms
     http_reqs......................: 5940    97.000181/s
     iteration_duration.............: avg=514.23ms min=33.08ms med=503.47ms max=1.01s    p(90)=559.72ms p(95)=577.78ms p(99.9)=989.13ms
     iterations.....................: 5840    95.367181/s
     success_rate...................: 100.00% ✓ 5840      ✗ 0   
     vus............................: 50      min=0       max=50
     vus_max........................: 50      min=50      max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cc1bb5ab-014b-4046-1f0a-445bbad71600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fe698b0e-dabe-4a4c-91cc-7e69621c5600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 15306     ✗ 0   
     data_received..................: 457 MB  7.4 MB/s
     data_sent......................: 6.0 MB  98 kB/s
     http_req_blocked...............: avg=127.75µs min=1.42µs   med=3.21µs   max=17.72ms  p(90)=5.29µs   p(95)=6.12µs   p(99.9)=16.54ms 
     http_req_connecting............: avg=123.6µs  min=0s       med=0s       max=17.59ms  p(90)=0s       p(95)=0s       p(99.9)=16.5ms  
     http_req_duration..............: avg=578.64ms min=9.53ms   med=579.75ms max=895.68ms p(90)=666.12ms p(95)=689.56ms p(99.9)=824.27ms
       { expected_response:true }...: avg=578.64ms min=9.53ms   med=579.75ms max=895.68ms p(90)=666.12ms p(95)=689.56ms p(99.9)=824.27ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5202
     http_req_receiving.............: avg=103.3µs  min=29.5µs   med=64.45µs  max=151.57ms p(90)=111.58µs p(95)=130.45µs p(99.9)=356.66µs
     http_req_sending...............: avg=125.37µs min=6.71µs   med=13.35µs  max=126.88ms p(90)=22.5µs   p(95)=29.83µs  p(99.9)=9.6ms   
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=578.42ms min=9.44ms   med=579.64ms max=895.53ms p(90)=665.8ms  p(95)=689.3ms  p(99.9)=824.05ms
     http_reqs......................: 5202    84.561731/s
     iteration_duration.............: avg=590.25ms min=252.54ms med=581.18ms max=895.96ms p(90)=667.25ms p(95)=690.88ms p(99.9)=850.02ms
     iterations.....................: 5102    82.936169/s
     success_rate...................: 100.00% ✓ 5102      ✗ 0   
     vus............................: 50      min=0       max=50
     vus_max........................: 50      min=50      max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bec2d11a-e33e-4ba5-d133-164fc8856900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f3a8f1d0-b7f6-4587-6311-2693dc0f8b00/public" alt="HTTP Overview" />


  </details>