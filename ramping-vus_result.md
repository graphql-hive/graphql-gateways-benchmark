## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6e04ab06-20a8-43e0-2009-74094808e500/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |         Duration         | Notes                                                                  |
| :-------------------------- | :----: | :--------------------: | :----------------------: | :--------------------------------------------------------------------- |
| cosmo                       |  1990  | 126290 total, 0 failed |  avg: 110ms, p95: 281ms  | ✅                                                                     |
| hive-router                 |  1867  | 117165 total, 0 failed |  avg: 119ms, p95: 288ms  | ✅                                                                     |
| grafbase                    |  1616  | 103040 total, 0 failed |  avg: 135ms, p95: 315ms  | ✅                                                                     |
| hive-gateway-router-runtime |  585   | 38658 total, 0 failed  |  avg: 363ms, p95: 758ms  | ❌ non-compatible response structure (2)                               |
| apollo-router               |  381   | 25774 total, 0 failed  | avg: 547ms, p95: 1266ms  | ❌ 20 unexpected GraphQL errors, non-compatible response structure (2) |
| hive-gateway                |  278   | 19182 total, 0 failed  | avg: 731ms, p95: 1612ms  | ✅                                                                     |
| apollo-gateway              |  120   |  8536 total, 0 failed  | avg: 1446ms, p95: 2864ms | ✅                                                                     |



<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 375870      ✗ 0     
     data_received..................: 11 GB   175 MB/s
     data_sent......................: 147 MB  2.3 MB/s
     http_req_blocked...............: avg=498.49µs min=1.24µs   med=2.96µs  max=367.68ms p(90)=4.4µs    p(95)=5.34µs   p(99.9)=181.87ms
     http_req_connecting............: avg=494.59µs min=0s       med=0s      max=367.64ms p(90)=0s       p(95)=0s       p(99.9)=181.77ms
     http_req_duration..............: avg=110.21ms min=427.91µs med=95.75ms max=434.13ms p(90)=235.51ms p(95)=281.05ms p(99.9)=374.64ms
       { expected_response:true }...: avg=110.21ms min=427.91µs med=95.75ms max=434.13ms p(90)=235.51ms p(95)=281.05ms p(99.9)=374.64ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 126290
     http_req_receiving.............: avg=564.67µs min=23.4µs   med=46.72µs max=194.43ms p(90)=153.56µs p(95)=437.48µs p(99.9)=76.17ms 
     http_req_sending...............: avg=403.23µs min=5.08µs   med=11.65µs max=132.43ms p(90)=22.64µs  p(95)=134.47µs p(99.9)=66.39ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=109.24ms min=369.34µs med=94.81ms max=387.63ms p(90)=233.19ms p(95)=279.45ms p(99.9)=371.48ms
     http_reqs......................: 126290  1990.039279/s
     iteration_duration.............: avg=111.81ms min=604.05µs med=97.08ms max=732.78ms p(90)=238.11ms p(95)=283.43ms p(99.9)=403.4ms 
     iterations.....................: 125290  1974.281585/s
     success_rate...................: 100.00% ✓ 125290      ✗ 0     
     vus............................: 81      min=0         max=492 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e23ae32d-f242-461e-c719-c73450701f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/12a01c22-1c86-4568-8a8b-4b21cd54fa00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 348495      ✗ 0     
     data_received..................: 10 GB   164 MB/s
     data_sent......................: 136 MB  2.2 MB/s
     http_req_blocked...............: avg=392.7µs  min=1.17µs  med=2.52µs   max=302.92ms p(90)=3.94µs   p(95)=4.66µs   p(99.9)=142.59ms
     http_req_connecting............: avg=388.5µs  min=0s      med=0s       max=302.84ms p(90)=0s       p(95)=0s       p(99.9)=142.55ms
     http_req_duration..............: avg=118.9ms  min=1.75ms  med=106.6ms  max=444.21ms p(90)=242.83ms p(95)=287.59ms p(99.9)=389.29ms
       { expected_response:true }...: avg=118.9ms  min=1.75ms  med=106.6ms  max=444.21ms p(90)=242.83ms p(95)=287.59ms p(99.9)=389.29ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 117165
     http_req_receiving.............: avg=489.2µs  min=23.41µs med=42.79µs  max=124.41ms p(90)=194.12µs p(95)=408.56µs p(99.9)=73.38ms 
     http_req_sending...............: avg=367.29µs min=5.13µs  med=10.34µs  max=121.85ms p(90)=30.9µs   p(95)=130.68µs p(99.9)=66.98ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=118.04ms min=1.7ms   med=105.84ms max=444.16ms p(90)=240.95ms p(95)=285.16ms p(99.9)=386.42ms
     http_reqs......................: 117165  1867.476762/s
     iteration_duration.............: avg=120.58ms min=1.87ms  med=108.09ms max=722.74ms p(90)=245.03ms p(95)=290.23ms p(99.9)=405.46ms
     iterations.....................: 116165  1851.5379/s
     success_rate...................: 100.00% ✓ 116165      ✗ 0     
     vus............................: 52      min=0         max=499 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1247d284-c229-4368-bf5e-58a0a50ca000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/650585e9-d172-4969-dd87-47f9072f4000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 306120      ✗ 0     
     data_received..................: 9.1 GB  142 MB/s
     data_sent......................: 120 MB  1.9 MB/s
     http_req_blocked...............: avg=530.55µs min=1.29µs  med=2.96µs   max=338.24ms p(90)=4.33µs   p(95)=5.46µs   p(99.9)=186.86ms
     http_req_connecting............: avg=526.25µs min=0s      med=0s       max=338.19ms p(90)=0s       p(95)=0s       p(99.9)=186.25ms
     http_req_duration..............: avg=135.14ms min=2.77ms  med=124.98ms max=481.81ms p(90)=268.96ms p(95)=315.43ms p(99.9)=422.17ms
       { expected_response:true }...: avg=135.14ms min=2.77ms  med=124.98ms max=481.81ms p(90)=268.96ms p(95)=315.43ms p(99.9)=422.17ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 103040
     http_req_receiving.............: avg=576.05µs min=24.32µs med=47.36µs  max=258.98ms p(90)=189.61µs p(95)=437.91µs p(99.9)=81.43ms 
     http_req_sending...............: avg=464.88µs min=5.07µs  med=11.49µs  max=143.58ms p(90)=33.24µs  p(95)=138.18µs p(99.9)=78.63ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=134.1ms  min=2.71ms  med=124.06ms max=475.3ms  p(90)=266.59ms p(95)=313.29ms p(99.9)=420.54ms
     http_reqs......................: 103040  1616.773133/s
     iteration_duration.............: avg=137.34ms min=2.96ms  med=126.53ms max=848.92ms p(90)=271.71ms p(95)=318.69ms p(99.9)=473.7ms 
     iterations.....................: 102040  1601.082399/s
     success_rate...................: 100.00% ✓ 102040      ✗ 0     
     vus............................: 95      min=0         max=500 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/23dbdd13-0c1d-4c48-d81f-bb077e086e00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5412ddc4-8fdb-45aa-0bac-e9bf5ef78400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✗ valid response structure
      ↳  99% — ✓ 37656 / ✗ 2

     checks.........................: 99.99% ✓ 112972     ✗ 2    
     data_received..................: 3.4 GB 51 MB/s
     data_sent......................: 45 MB  681 kB/s
     http_req_blocked...............: avg=187.89µs min=1.41µs  med=3.06µs   max=208.65ms p(90)=4.9µs    p(95)=6.97µs   p(99.9)=58.19ms
     http_req_connecting............: avg=182.3µs  min=0s      med=0s       max=208.45ms p(90)=0s       p(95)=0s       p(99.9)=58.12ms
     http_req_duration..............: avg=363.37ms min=4.85ms  med=353.46ms max=1.28s    p(90)=680.17ms p(95)=757.99ms p(99.9)=1.01s  
       { expected_response:true }...: avg=363.37ms min=4.85ms  med=353.46ms max=1.28s    p(90)=680.17ms p(95)=757.99ms p(99.9)=1.01s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 38658
     http_req_receiving.............: avg=301.09µs min=27.56µs med=48.74µs  max=223.05ms p(90)=111.5µs  p(95)=405.25µs p(99.9)=53.98ms
     http_req_sending...............: avg=345.19µs min=5.88µs  med=11.55µs  max=192.03ms p(90)=34.53µs  p(95)=138.87µs p(99.9)=62.59ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=362.72ms min=4.78ms  med=352.79ms max=1.28s    p(90)=678.6ms  p(95)=756.93ms p(99.9)=1.01s  
     http_reqs......................: 38658  585.146057/s
     iteration_duration.............: avg=373.63ms min=5.26ms  med=364.91ms max=1.47s    p(90)=684.19ms p(95)=761.52ms p(99.9)=1.03s  
     iterations.....................: 37658  570.009576/s
     success_rate...................: 99.99% ✓ 37656      ✗ 2    
     vus............................: 65     min=0        max=497
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0653d0f7-7910-4aee-2f79-a7916de55c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3d1e32f2-ef85-4aa8-ee71-d0675e053d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 24754 / ✗ 20
     ✗ valid response structure
      ↳  99% — ✓ 24772 / ✗ 2

     checks.........................: 99.97% ✓ 74300      ✗ 22   
     data_received..................: 2.3 GB 33 MB/s
     data_sent......................: 30 MB  444 kB/s
     http_req_blocked...............: avg=60.91µs  min=1.11µs  med=2.78µs   max=111.29ms p(90)=4.7µs    p(95)=6.91µs   p(99.9)=19.18ms
     http_req_connecting............: avg=55.85µs  min=0s      med=0s       max=111.23ms p(90)=0s       p(95)=0s       p(99.9)=19.1ms 
     http_req_duration..............: avg=547.37ms min=6.56ms  med=509.79ms max=1.95s    p(90)=1.12s    p(95)=1.26s    p(99.9)=1.7s   
       { expected_response:true }...: avg=547.37ms min=6.56ms  med=509.79ms max=1.95s    p(90)=1.12s    p(95)=1.26s    p(99.9)=1.7s   
     http_req_failed................: 0.00%  ✓ 0          ✗ 25774
     http_req_receiving.............: avg=104.08µs min=24.07µs med=49.24µs  max=53.53ms  p(90)=103.73µs p(95)=179.68µs p(99.9)=7.25ms 
     http_req_sending...............: avg=88.76µs  min=5.1µs   med=11.19µs  max=61ms     p(90)=28.96µs  p(95)=114.6µs  p(99.9)=15.62ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=547.18ms min=6.51ms  med=509.54ms max=1.95s    p(90)=1.12s    p(95)=1.26s    p(99.9)=1.7s   
     http_reqs......................: 25774  381.077061/s
     iteration_duration.............: avg=569.75ms min=6.94ms  med=533.14ms max=1.95s    p(90)=1.13s    p(95)=1.27s    p(99.9)=1.71s  
     iterations.....................: 24774  366.291732/s
     success_rate...................: 99.91% ✓ 24754      ✗ 20   
     vus............................: 94     min=0        max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fbd7babd-f868-42d3-6f6a-1fe4aadf5c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d1080e2f-ae12-49b6-ea2a-a9601d5a8e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 54546      ✗ 0    
     data_received..................: 1.7 GB  25 MB/s
     data_sent......................: 23 MB   326 kB/s
     http_req_blocked...............: avg=107.03µs min=1.33µs  med=2.75µs   max=122.52ms p(90)=4.75µs  p(95)=7.71µs   p(99.9)=24.98ms
     http_req_connecting............: avg=101.51µs min=0s      med=0s       max=122.47ms p(90)=0s      p(95)=0s       p(99.9)=24.92ms
     http_req_duration..............: avg=731.42ms min=6.16ms  med=662.27ms max=4.76s    p(90)=1.46s   p(95)=1.61s    p(99.9)=3.76s  
       { expected_response:true }...: avg=731.42ms min=6.16ms  med=662.27ms max=4.76s    p(90)=1.46s   p(95)=1.61s    p(99.9)=3.76s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 19182
     http_req_receiving.............: avg=165.14µs min=27.14µs med=44.77µs  max=84.83ms  p(90)=96.4µs  p(95)=204.96µs p(99.9)=22.53ms
     http_req_sending...............: avg=186.18µs min=5.9µs   med=10.91µs  max=104.65ms p(90)=32.47µs p(95)=123.35µs p(99.9)=29.68ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=731.07ms min=6.11ms  med=662.03ms max=4.76s    p(90)=1.46s   p(95)=1.61s    p(99.9)=3.76s  
     http_reqs......................: 19182   278.536352/s
     iteration_duration.............: avg=771.94ms min=6.28ms  med=723.36ms max=4.78s    p(90)=1.47s   p(95)=1.62s    p(99.9)=3.84s  
     iterations.....................: 18182   264.015637/s
     success_rate...................: 100.00% ✓ 18182      ✗ 0    
     vus............................: 58      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4db029ef-571f-45ef-af88-10b78cf29c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/24a65f07-418c-48df-5c8a-f1a6eb4f7600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 22608      ✗ 0    
     data_received..................: 750 MB  11 MB/s
     data_sent......................: 10 MB   145 kB/s
     http_req_blocked...............: avg=35.62µs min=1.4µs   med=3.34µs  max=19.66ms p(90)=5.55µs   p(95)=19.79µs p(99.9)=5.09ms
     http_req_connecting............: avg=28.94µs min=0s      med=0s      max=19.58ms p(90)=0s       p(95)=0s      p(99.9)=4.89ms
     http_req_duration..............: avg=1.44s   min=9.6ms   med=1.39s   max=19.78s  p(90)=2.51s    p(95)=2.86s   p(99.9)=18.19s
       { expected_response:true }...: avg=1.44s   min=9.6ms   med=1.39s   max=19.78s  p(90)=2.51s    p(95)=2.86s   p(99.9)=18.19s
     http_req_failed................: 0.00%   ✓ 0          ✗ 8536 
     http_req_receiving.............: avg=76.71µs min=27.94µs med=57.53µs max=3.55ms  p(90)=105.84µs p(95)=130µs   p(99.9)=1.43ms
     http_req_sending...............: avg=42.06µs min=5.9µs   med=12.64µs max=13.28ms p(90)=31.81µs  p(95)=52.46µs p(99.9)=7.13ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s      p(99.9)=0s    
     http_req_waiting...............: avg=1.44s   min=9.54ms  med=1.39s   max=19.78s  p(90)=2.51s    p(95)=2.86s   p(99.9)=18.19s
     http_reqs......................: 8536    120.121244/s
     iteration_duration.............: avg=1.63s   min=10.95ms med=1.59s   max=19.79s  p(90)=2.57s    p(95)=2.93s   p(99.9)=18.49s
     iterations.....................: 7536    106.048934/s
     success_rate...................: 100.00% ✓ 7536       ✗ 0    
     vus............................: 85      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3bfd1c82-ed45-431d-f341-e2198a11dd00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6a7e3a84-3134-41f7-915d-096690476900/public" alt="HTTP Overview" />


  </details>