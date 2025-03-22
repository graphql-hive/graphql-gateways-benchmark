## Overview for: `federation/constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1ff8990d-d68f-4d2b-39bf-a2cc432a9500/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  182   | 11097 total, 0 failed | avg: 834ms, p95: 2395ms  | ✅                                                                        |
| grafbase         |  169   | 10356 total, 0 failed | avg: 871ms, p95: 2335ms  | ✅                                                                        |
| apollo-router    |  165   | 10109 total, 0 failed | avg: 899ms, p95: 2603ms  | ✅                                                                        |
| hive-gateway-bun |   87   | 5493 total, 0 failed  | avg: 3251ms, p95: 5444ms | ✅                                                                        |
| apollo-server    |   78   | 4951 total, 84 failed | avg: 3682ms, p95: 4424ms | ❌ 84 failed requests, 84 non-200 responses, 84 unexpected GraphQL errors |
| hive-gateway     |   74   | 4729 total, 30 failed | avg: 3867ms, p95: 5413ms | ❌ 30 failed requests, 30 non-200 responses, 30 unexpected GraphQL errors |
| mercurius        |   69   | 4299 total, 0 failed  | avg: 4228ms, p95: 5447ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 33231      ✗ 0    
     data_received..................: 974 MB  16 MB/s
     data_sent......................: 13 MB   216 kB/s
     http_req_blocked...............: avg=1.53ms   min=1.48µs  med=3.14µs   max=2.08s  p(90)=4.92µs   p(95)=10.91µs 
     http_req_connecting............: avg=815.4µs  min=0s      med=0s       max=2.01s  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=833.73ms min=3.25ms  med=633.09ms max=5.38s  p(90)=1.84s    p(95)=2.39s   
       { expected_response:true }...: avg=833.73ms min=3.25ms  med=633.09ms max=5.38s  p(90)=1.84s    p(95)=2.39s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 11097
     http_req_receiving.............: avg=327.1ms  min=33.5µs  med=88.05µs  max=4.58s  p(90)=1.27s    p(95)=1.87s   
     http_req_sending...............: avg=14.27ms  min=7.97µs  med=14.6µs   max=3.09s  p(90)=65.08µs  p(95)=953.88µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=492.36ms min=3.06ms  med=456.51ms max=2.15s  p(90)=902.87ms p(95)=1.06s   
     http_reqs......................: 11097   182.212366/s
     iteration_duration.............: avg=1.62s    min=20.82ms med=1.32s    max=10.19s p(90)=3.47s    p(95)=4.12s   
     iterations.....................: 11077   181.883966/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e1071be7-8a9f-4bbc-3a3e-0f098b644b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0193694a-6f46-46dc-893b-8f1af14c8e00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c959175d-a7af-4807-2b09-6bcfe9ce1a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31008      ✗ 0    
     data_received..................: 910 MB  15 MB/s
     data_sent......................: 12 MB   202 kB/s
     http_req_blocked...............: avg=1.4ms    min=1.34µs  med=3.28µs   max=2.49s p(90)=4.79µs   p(95)=11.05µs
     http_req_connecting............: avg=1.21ms   min=0s      med=0s       max=2.49s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=871.46ms min=3.12ms  med=702.9ms  max=5.1s  p(90)=1.82s    p(95)=2.33s  
       { expected_response:true }...: avg=871.46ms min=3.12ms  med=702.9ms  max=5.1s  p(90)=1.82s    p(95)=2.33s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10356
     http_req_receiving.............: avg=289.77ms min=31.87µs med=83.01µs  max=4.47s p(90)=1.14s    p(95)=1.85s  
     http_req_sending...............: avg=20.96ms  min=7.46µs  med=14.67µs  max=3.31s p(90)=130.38µs p(95)=15.28ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=560.72ms min=3.05ms  med=507.32ms max=2.71s p(90)=1.08s    p(95)=1.3s   
     http_reqs......................: 10356   169.788341/s
     iteration_duration.............: avg=1.74s    min=22.18ms med=1.43s    max=9.92s p(90)=3.63s    p(95)=4.51s  
     iterations.....................: 10336   169.460438/s
     vus............................: 11      min=11       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b7f02224-2de2-48f5-0456-cecad572aa00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1ee8b7f0-7671-45f9-072a-78bf6329ff00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e2438a0b-be2b-4ed2-8cff-718df3f3dc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30267      ✗ 0    
     data_received..................: 887 MB  15 MB/s
     data_sent......................: 12 MB   197 kB/s
     http_req_blocked...............: avg=1.42ms   min=1.37µs  med=3.02µs   max=2.13s  p(90)=4.7µs    p(95)=10.47µs
     http_req_connecting............: avg=926.42µs min=0s      med=0s       max=1.25s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=898.83ms min=6.31ms  med=721.82ms max=6.1s   p(90)=1.89s    p(95)=2.6s   
       { expected_response:true }...: avg=898.83ms min=6.31ms  med=721.82ms max=6.1s   p(90)=1.89s    p(95)=2.6s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10109
     http_req_receiving.............: avg=301.55ms min=32.65µs med=80.39µs  max=4.98s  p(90)=1.28s    p(95)=1.93s  
     http_req_sending...............: avg=21.19ms  min=7.96µs  med=13.97µs  max=4.04s  p(90)=122.45µs p(95)=11.49ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=576.08ms min=6.21ms  med=528.68ms max=2.53s  p(90)=1.06s    p(95)=1.17s  
     http_reqs......................: 10109   165.556787/s
     iteration_duration.............: avg=1.78s    min=26.08ms med=1.48s    max=11.69s p(90)=3.64s    p(95)=4.44s  
     iterations.....................: 10089   165.229243/s
     vus............................: 48      min=48       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/76334ccd-d4bc-4be9-fca9-44ace2e0c200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/141dd420-90ec-4c66-d827-3e35a30f6500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2683107e-fcf6-4430-bc8e-70b9174c9d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 16419     ✗ 0    
     data_received..................: 482 MB  7.6 MB/s
     data_sent......................: 6.5 MB  103 kB/s
     http_req_blocked...............: avg=437.25µs min=1.39µs  med=3.38µs   max=385.48ms p(90)=5.48µs  p(95)=286.88µs
     http_req_connecting............: avg=323.74µs min=0s      med=0s       max=16.83ms  p(90)=0s      p(95)=179.96µs
     http_req_duration..............: avg=3.25s    min=16.27ms med=3.03s    max=8.77s    p(90)=4.82s   p(95)=5.44s   
       { expected_response:true }...: avg=3.25s    min=16.27ms med=3.03s    max=8.77s    p(90)=4.82s   p(95)=5.44s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5493 
     http_req_receiving.............: avg=50.79ms  min=35.32µs med=104.36µs max=1.91s    p(90)=13.8ms  p(95)=342.55ms
     http_req_sending...............: avg=1.3ms    min=8.85µs  med=15.83µs  max=251.31ms p(90)=129.6µs p(95)=391.88µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.19s    min=16.01ms med=2.99s    max=8.77s    p(90)=4.79s   p(95)=5.4s    
     http_reqs......................: 5493    87.083231/s
     iteration_duration.............: avg=3.37s    min=87.94ms med=3.13s    max=8.8s     p(90)=4.93s   p(95)=5.66s   
     iterations.....................: 5473    86.766161/s
     vus............................: 17      min=17      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/48e5784a-d00d-46ab-b99c-e371b621d200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0591a137-732a-4cb1-443d-468c22b23200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/12f41e41-d437-443f-7ce9-6194902fde00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 4847 / ✗ 84
     ✗ no graphql errors
      ↳  98% — ✓ 4847 / ✗ 84
     ✓ valid response structure

     █ setup

     checks.........................: 98.85% ✓ 14541     ✗ 168  
     data_received..................: 428 MB 6.8 MB/s
     data_sent......................: 5.9 MB 93 kB/s
     http_req_blocked...............: avg=332.07µs min=1.48µs   med=3µs     max=69.42ms p(90)=5.01µs   p(95)=510.68µs
     http_req_connecting............: avg=304.7µs  min=0s       med=0s      max=36.34ms p(90)=0s       p(95)=285.3µs 
     http_req_duration..............: avg=3.68s    min=12.71ms  med=2s      max=1m0s    p(90)=2.84s    p(95)=4.42s   
       { expected_response:true }...: avg=2.7s     min=12.71ms  med=1.99s   max=59.03s  p(90)=2.76s    p(95)=3.08s   
     http_req_failed................: 1.69%  ✓ 84        ✗ 4867 
     http_req_receiving.............: avg=294.73µs min=0s       med=110.6µs max=91.06ms p(90)=197.23µs p(95)=309.86µs
     http_req_sending...............: avg=529.58µs min=8.67µs   med=15.43µs max=29.11ms p(90)=35.55µs  p(95)=359.35µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.68s    min=12.62ms  med=2s      max=1m0s    p(90)=2.84s    p(95)=4.41s   
     http_reqs......................: 4951   78.726395/s
     iteration_duration.............: avg=3.71s    min=138.24ms med=2.02s   max=1m0s    p(90)=2.85s    p(95)=4.7s    
     iterations.....................: 4931   78.408373/s
     vus............................: 123    min=123     max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/31fbdcac-0586-41ac-9a8e-238ab4290f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c1f88b80-101c-4fd6-84c5-3afacb92bb00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/779bb2f9-0212-4628-8761-39e2c3137e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 4679 / ✗ 30
     ✗ no graphql errors
      ↳  99% — ✓ 4679 / ✗ 30
     ✓ valid response structure

     █ setup

     checks.........................: 99.57% ✓ 14037     ✗ 60   
     data_received..................: 413 MB 6.5 MB/s
     data_sent......................: 5.6 MB 89 kB/s
     http_req_blocked...............: avg=467.91µs min=1.6µs    med=3.98µs   max=37.74ms p(90)=5.94µs   p(95)=2.28ms  
     http_req_connecting............: avg=445.25µs min=0s       med=0s       max=18.67ms p(90)=0s       p(95)=2.11ms  
     http_req_duration..............: avg=3.86s    min=15.89ms  med=2.54s    max=1m0s    p(90)=3.69s    p(95)=5.41s   
       { expected_response:true }...: avg=3.5s     min=15.89ms  med=2.53s    max=59.57s  p(90)=3.65s    p(95)=5.03s   
     http_req_failed................: 0.63%  ✓ 30        ✗ 4699 
     http_req_receiving.............: avg=384.16µs min=0s       med=113.35µs max=73.58ms p(90)=458.87µs p(95)=1.24ms  
     http_req_sending...............: avg=174.33µs min=8.86µs   med=22.73µs  max=42.41ms p(90)=49.26µs  p(95)=245.59µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.86s    min=15.78ms  med=2.54s    max=1m0s    p(90)=3.69s    p(95)=5.41s   
     http_reqs......................: 4729   74.825483/s
     iteration_duration.............: avg=3.9s     min=109.58ms med=2.56s    max=1m0s    p(90)=3.72s    p(95)=5.46s   
     iterations.....................: 4709   74.509029/s
     vus............................: 26     min=26      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0480bfc2-2eab-43ff-1f74-22b0128e3d00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/994a2977-14ff-4d7e-5dd2-d7841457aa00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/823fbc06-9973-46e8-684c-83c9980c1400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 12837     ✗ 0    
     data_received..................: 377 MB  6.1 MB/s
     data_sent......................: 5.1 MB  82 kB/s
     http_req_blocked...............: avg=650.02µs min=1.53µs   med=3.76µs   max=23.3ms  p(90)=6.07µs   p(95)=6.28ms  
     http_req_connecting............: avg=636.36µs min=0s       med=0s       max=23.24ms p(90)=0s       p(95)=6.21ms  
     http_req_duration..............: avg=4.22s    min=14.61ms  med=4.2s     max=9.27s   p(90)=5s       p(95)=5.44s   
       { expected_response:true }...: avg=4.22s    min=14.61ms  med=4.2s     max=9.27s   p(90)=5s       p(95)=5.44s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4299 
     http_req_receiving.............: avg=6.78ms   min=39.45µs  med=103.71µs max=911.8ms p(90)=230.05µs p(95)=457.22µs
     http_req_sending...............: avg=96.29µs  min=9.14µs   med=19.59µs  max=53.53ms p(90)=39.75µs  p(95)=211.11µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=4.22s    min=14.51ms  med=4.2s     max=9.27s   p(90)=5s       p(95)=5.44s   
     http_reqs......................: 4299    69.184434/s
     iteration_duration.............: avg=4.27s    min=585.79ms med=4.21s    max=9.29s   p(90)=5.02s    p(95)=5.45s   
     iterations.....................: 4279    68.862572/s
     vus............................: 78      min=78      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5266bcc3-c9a8-46d2-73e6-a370d7ca5f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/79316e89-935b-4d81-718d-f6271f8cca00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/27a15cbd-95c1-4d49-80e5-6657cc263f00/public" alt="HTTP Overview" />


  </details>