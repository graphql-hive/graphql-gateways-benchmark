## Overview for: `federation/constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/830fa72a-e935-454a-19b3-66a38fd02400/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration          | Notes                                                                       |
| :--------------- | :----: | :--------------------: | :-----------------------: | :-------------------------------------------------------------------------- |
| cosmo            |  174   | 10745 total, 0 failed  | avg: 1383ms, p95: 3295ms  | ✅                                                                           |
| grafbase         |  167   | 10316 total, 0 failed  | avg: 1418ms, p95: 3235ms  | ✅                                                                           |
| apollo-router    |  158   | 9740 total, 15 failed  | avg: 1487ms, p95: 3412ms  | ❌ 15 failed requests, 15 non-200 responses, 15 unexpected GraphQL errors    |
| hive-gateway-bun |   88   |  5727 total, 0 failed  | avg: 5340ms, p95: 9045ms  | ✅                                                                           |
| apollo-server    |   87   | 5511 total, 249 failed | avg: 5488ms, p95: 45598ms | ❌ 249 failed requests, 249 non-200 responses, 249 unexpected GraphQL errors |
| hive-gateway     |   82   | 5361 total, 138 failed | avg: 5691ms, p95: 22853ms | ❌ 138 failed requests, 138 non-200 responses, 138 unexpected GraphQL errors |
| mercurius        |   73   |  4642 total, 0 failed  | avg: 6574ms, p95: 8397ms  | ✅                                                                           |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32175      ✗ 0    
     data_received..................: 943 MB  15 MB/s
     data_sent......................: 13 MB   208 kB/s
     http_req_blocked...............: avg=2.82ms   min=1.44µs  med=3.38µs   max=1.61s  p(90)=5.62µs   p(95)=110.5µs
     http_req_connecting............: avg=2.13ms   min=0s      med=0s       max=1.61s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=1.38s    min=3.26ms  med=1.17s    max=7.56s  p(90)=2.76s    p(95)=3.29s  
       { expected_response:true }...: avg=1.38s    min=3.26ms  med=1.17s    max=7.56s  p(90)=2.76s    p(95)=3.29s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10745
     http_req_receiving.............: avg=430.36ms min=32.43µs med=94.68µs  max=6.59s  p(90)=1.71s    p(95)=2.36s  
     http_req_sending...............: avg=32.1ms   min=7.41µs  med=16.03µs  max=5.42s  p(90)=167.24µs p(95)=7.73ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=920.4ms  min=3.14ms  med=869.25ms max=4.43s  p(90)=1.6s     p(95)=1.92s  
     http_reqs......................: 10745   174.775045/s
     iteration_duration.............: avg=2.81s    min=24.75ms med=2.47s    max=12.85s p(90)=5.42s    p(95)=6.45s  
     iterations.....................: 10725   174.44973/s
     vus............................: 251     min=251      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d6ec2b13-590e-4726-539b-2e4edb962000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/846e256a-e478-4da9-040d-9ac21bac3300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/988cfaec-c2b9-4ce0-212f-6581739a4d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30888      ✗ 0    
     data_received..................: 907 MB  15 MB/s
     data_sent......................: 12 MB   199 kB/s
     http_req_blocked...............: avg=2.85ms   min=1.38µs  med=3.53µs  max=2.4s   p(90)=6.02µs   p(95)=167.94µs
     http_req_connecting............: avg=2.35ms   min=0s      med=0s      max=2.4s   p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.41s    min=3.07ms  med=1.25s   max=7.79s  p(90)=2.6s     p(95)=3.23s   
       { expected_response:true }...: avg=1.41s    min=3.07ms  med=1.25s   max=7.79s  p(90)=2.6s     p(95)=3.23s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10316
     http_req_receiving.............: avg=286.54ms min=32.71µs med=83.78µs max=4.87s  p(90)=1.23s    p(95)=1.7s    
     http_req_sending...............: avg=24.66ms  min=7.75µs  med=15.98µs max=4.35s  p(90)=110.07µs p(95)=22.73ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.1s     min=3.01ms  med=1.01s   max=5.61s  p(90)=1.93s    p(95)=2.59s   
     http_reqs......................: 10316   167.965228/s
     iteration_duration.............: avg=2.9s     min=23.84ms med=2.64s   max=10.28s p(90)=5.32s    p(95)=6.26s   
     iterations.....................: 10296   167.639588/s
     vus............................: 207     min=207      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/550d90ee-9884-453b-a017-3ebe9388bf00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/64fd4061-563a-40b4-9b10-f2a646b5e300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fcd0c426-a0b6-4370-f007-c1dbdafe1100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 9705 / ✗ 15
     ✗ no graphql errors
      ↳  99% — ✓ 9705 / ✗ 15
     ✓ valid response structure

     █ setup

     checks.........................: 99.89% ✓ 29115      ✗ 30   
     data_received..................: 853 MB 14 MB/s
     data_sent......................: 12 MB  188 kB/s
     http_req_blocked...............: avg=7.04ms   min=1.36µs  med=3.45µs   max=5.17s  p(90)=5.82µs   p(95)=1.64ms 
     http_req_connecting............: avg=6.2ms    min=0s      med=0s       max=5.17s  p(90)=0s       p(95)=1.05ms 
     http_req_duration..............: avg=1.48s    min=6.82ms  med=1.31s    max=7.19s  p(90)=2.83s    p(95)=3.41s  
       { expected_response:true }...: avg=1.48s    min=6.82ms  med=1.31s    max=7.19s  p(90)=2.82s    p(95)=3.4s   
     http_req_failed................: 0.15%  ✓ 15         ✗ 9725 
     http_req_receiving.............: avg=399.94ms min=0s      med=92.9µs   max=6.55s  p(90)=1.65s    p(95)=2.11s  
     http_req_sending...............: avg=41.78ms  min=8.33µs  med=15.93µs  max=4.38s  p(90)=522.73µs p(95)=24.53ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=1.04s    min=6.75ms  med=947.39ms max=6.08s  p(90)=1.92s    p(95)=2.36s  
     http_reqs......................: 9740   158.23854/s
     iteration_duration.............: avg=3.07s    min=35.65ms med=2.7s     max=12.47s p(90)=5.96s    p(95)=7.03s  
     iterations.....................: 9720   157.913615/s
     vus............................: 282    min=282      max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c6a57bdf-48f9-4d29-0237-12e73fb22f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/88e5f610-fc03-428e-779b-b3679ccab700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6fcf2f15-0edf-48de-7ffa-70bd6be13400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17121     ✗ 0    
     data_received..................: 503 MB  7.7 MB/s
     data_sent......................: 6.8 MB  105 kB/s
     http_req_blocked...............: avg=1.21ms  min=1.92µs   med=4.17µs   max=113.51ms p(90)=13.57µs  p(95)=10.84ms 
     http_req_connecting............: avg=1.09ms  min=0s       med=0s       max=53.78ms  p(90)=0s       p(95)=9.98ms  
     http_req_duration..............: avg=5.33s   min=17.47ms  med=5.03s    max=12.87s   p(90)=7.78s    p(95)=9.04s   
       { expected_response:true }...: avg=5.33s   min=17.47ms  med=5.03s    max=12.87s   p(90)=7.78s    p(95)=9.04s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5727 
     http_req_receiving.............: avg=69.25ms min=41.26µs  med=108.97µs max=3.37s    p(90)=6.37ms   p(95)=325.87ms
     http_req_sending...............: avg=1.07ms  min=9.61µs   med=21.62µs  max=595.14ms p(90)=217.63µs p(95)=758.85µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.26s   min=17.23ms  med=4.94s    max=12.87s   p(90)=7.63s    p(95)=9.02s   
     http_reqs......................: 5727    88.242818/s
     iteration_duration.............: avg=5.47s   min=292.92ms med=5.13s    max=13.77s   p(90)=7.88s    p(95)=9.11s   
     iterations.....................: 5707    87.934654/s
     vus............................: 143     min=143     max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5948c3a3-19e1-43be-3fe2-35f463945000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7927a2ad-8c82-49aa-ada7-3d78d3809800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f279aec6-b5b9-4bfb-d4ac-4fbf80cf8100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  95% — ✓ 5242 / ✗ 249
     ✗ no graphql errors
      ↳  95% — ✓ 5242 / ✗ 249
     ✓ valid response structure

     █ setup

     checks.........................: 96.93% ✓ 15726     ✗ 498  
     data_received..................: 463 MB 7.4 MB/s
     data_sent......................: 6.5 MB 104 kB/s
     http_req_blocked...............: avg=2.3ms    min=1.42µs  med=3.2µs    max=53.31ms p(90)=11.88µs  p(95)=24.66ms 
     http_req_connecting............: avg=2.27ms   min=0s      med=0s       max=52.23ms p(90)=0s       p(95)=24.58ms 
     http_req_duration..............: avg=5.48s    min=11.45ms med=2.3s     max=1m0s    p(90)=3.09s    p(95)=45.59s  
       { expected_response:true }...: avg=2.9s     min=11.45ms med=2.25s    max=59.13s  p(90)=2.91s    p(95)=3.16s   
     http_req_failed................: 4.51%  ✓ 249       ✗ 5262 
     http_req_receiving.............: avg=259.3µs  min=0s      med=105.52µs max=78.15ms p(90)=229.97µs p(95)=421.23µs
     http_req_sending...............: avg=287.33µs min=8.63µs  med=17.51µs  max=60.55ms p(90)=150.06µs p(95)=1.31ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.48s    min=11.33ms med=2.3s     max=1m0s    p(90)=3.09s    p(95)=45.59s  
     http_reqs......................: 5511   87.829058/s
     iteration_duration.............: avg=5.52s    min=65.57ms med=2.32s    max=1m0s    p(90)=3.12s    p(95)=45.94s  
     iterations.....................: 5491   87.510318/s
     vus............................: 120    min=120     max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4d3333b3-ab96-462f-2d3c-e27a09cfcf00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6303b7d1-4136-4044-5d0b-1a3e16065300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f6a7cf96-ed63-4c9a-c42e-8e7d560fd500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  97% — ✓ 5203 / ✗ 138
     ✗ no graphql errors
      ↳  97% — ✓ 5203 / ✗ 138
     ✓ valid response structure

     █ setup

     checks.........................: 98.26% ✓ 15609     ✗ 276  
     data_received..................: 459 MB 7.1 MB/s
     data_sent......................: 6.4 MB 98 kB/s
     http_req_blocked...............: avg=6.84ms min=1.63µs   med=4.38µs   max=180.35ms p(90)=18.94µs  p(95)=59.33ms
     http_req_connecting............: avg=6.59ms min=0s       med=0s       max=172.48ms p(90)=0s       p(95)=51.97ms
     http_req_duration..............: avg=5.69s  min=15.41ms  med=3.22s    max=1m0s     p(90)=5.27s    p(95)=22.85s 
       { expected_response:true }...: avg=4.25s  min=15.41ms  med=3.19s    max=59.95s   p(90)=4.64s    p(95)=6.6s   
     http_req_failed................: 2.57%  ✓ 138       ✗ 5223 
     http_req_receiving.............: avg=1.46ms min=0s       med=105.14µs max=373.2ms  p(90)=737.99µs p(95)=2.77ms 
     http_req_sending...............: avg=2.25ms min=8.76µs   med=25.15µs  max=140.46ms p(90)=760.27µs p(95)=17.18ms
     http_req_tls_handshaking.......: avg=0s     min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=5.68s  min=15.26ms  med=3.22s    max=1m0s     p(90)=5.26s    p(95)=22.82s 
     http_reqs......................: 5361   82.695239/s
     iteration_duration.............: avg=5.77s  min=535.09ms med=3.27s    max=1m0s     p(90)=5.34s    p(95)=23.17s 
     iterations.....................: 5341   82.386732/s
     vus............................: 81     min=81      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/889bfc5e-284f-419b-fc1c-7d21a0c61d00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/300e63d5-138b-47b9-6763-b1a0aa962f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6724255a-6d1e-4041-60c6-77dfcbbd4400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 13866     ✗ 0    
     data_received..................: 407 MB  6.5 MB/s
     data_sent......................: 5.5 MB  87 kB/s
     http_req_blocked...............: avg=2.66ms   min=1.61µs   med=4.09µs   max=50.98ms p(90)=8.87ms   p(95)=26.95ms 
     http_req_connecting............: avg=2.6ms    min=0s       med=0s       max=44.66ms p(90)=8.38ms   p(95)=25.62ms 
     http_req_duration..............: avg=6.57s    min=11.13ms  med=6.5s     max=11.24s  p(90)=8.16s    p(95)=8.39s   
       { expected_response:true }...: avg=6.57s    min=11.13ms  med=6.5s     max=11.24s  p(90)=8.16s    p(95)=8.39s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4642 
     http_req_receiving.............: avg=10.08ms  min=40.62µs  med=105.73µs max=853.3ms p(90)=303.54µs p(95)=802.49µs
     http_req_sending...............: avg=197.35µs min=9.74µs   med=22.43µs  max=15.51ms p(90)=316.43µs p(95)=1.14ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=6.56s    min=11.03ms  med=6.5s     max=11.24s  p(90)=8.16s    p(95)=8.39s   
     http_reqs......................: 4642    73.637425/s
     iteration_duration.............: avg=6.64s    min=447.36ms med=6.51s    max=11.26s  p(90)=8.19s    p(95)=8.4s    
     iterations.....................: 4622    73.320159/s
     vus............................: 24      min=24      max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8f33a5bc-b737-478b-c1df-dbd61cd2ca00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/117fcbd3-8b4a-4541-3e2e-b9eb77a92e00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e77a4322-ffc0-4e1a-cd38-686674624c00/public" alt="HTTP Overview" />


  </details>