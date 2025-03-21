## Overview for: `federation/constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7a3d7667-5a3c-430d-8d7c-ece73bf5d500/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration          | Notes                                                                       |
| :--------------- | :----: | :--------------------: | :-----------------------: | :-------------------------------------------------------------------------- |
| cosmo            |  171   | 10557 total, 0 failed  | avg: 1452ms, p95: 3376ms  | ✅                                                                           |
| grafbase         |  169   | 10423 total, 0 failed  | avg: 1414ms, p95: 3394ms  | ✅                                                                           |
| apollo-router    |  161   |  9955 total, 0 failed  | avg: 1496ms, p95: 3456ms  | ✅                                                                           |
| hive-gateway-bun |   87   |  5721 total, 0 failed  | avg: 5284ms, p95: 8600ms  | ✅                                                                           |
| hive-gateway     |   82   | 5284 total, 152 failed | avg: 5777ms, p95: 28218ms | ❌ 152 failed requests, 152 non-200 responses, 152 unexpected GraphQL errors |
| apollo-server    |   75   | 4848 total, 61 failed  | avg: 6320ms, p95: 15344ms | ❌ 61 failed requests, 61 non-200 responses, 61 unexpected GraphQL errors    |
| mercurius        |   70   |  4427 total, 0 failed  | avg: 6907ms, p95: 9618ms  | ✅                                                                           |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31611      ✗ 0    
     data_received..................: 926 MB  15 MB/s
     data_sent......................: 13 MB   204 kB/s
     http_req_blocked...............: avg=2.45ms  min=1.72µs  med=3.73µs  max=3.04s  p(90)=6.03µs   p(95)=186.01µs
     http_req_connecting............: avg=2.23ms  min=0s      med=0s      max=3.04s  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.45s   min=3.4ms   med=1.28s   max=7.71s  p(90)=2.76s    p(95)=3.37s   
       { expected_response:true }...: avg=1.45s   min=3.4ms   med=1.28s   max=7.71s  p(90)=2.76s    p(95)=3.37s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10557
     http_req_receiving.............: avg=352.8ms min=33.14µs med=89.98µs max=6.38s  p(90)=1.7s     p(95)=2.33s   
     http_req_sending...............: avg=37.99ms min=8.23µs  med=18.66µs max=5.95s  p(90)=163.17µs p(95)=4.81ms  
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.06s   min=3.25ms  med=1.05s   max=3.99s  p(90)=1.71s    p(95)=2.06s   
     http_reqs......................: 10557   171.8075/s
     iteration_duration.............: avg=2.86s   min=25.99ms med=2.53s   max=13.31s p(90)=5.48s    p(95)=6.6s    
     iterations.....................: 10537   171.482015/s
     vus............................: 198     min=198      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fa1cfe79-6433-45f9-fa65-a6ee1e95c200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ce43dd8e-25b2-4f3e-919e-a4d5e47e8700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4378e090-42c3-412c-afdf-3945a56d6a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31209      ✗ 0    
     data_received..................: 916 MB  15 MB/s
     data_sent......................: 12 MB   202 kB/s
     http_req_blocked...............: avg=3.24ms   min=1.45µs  med=3.22µs   max=2.79s  p(90)=4.9µs    p(95)=304.07µs
     http_req_connecting............: avg=2.28ms   min=0s      med=0s       max=1.97s  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.41s    min=3.01ms  med=1.19s    max=9.84s  p(90)=2.75s    p(95)=3.39s   
       { expected_response:true }...: avg=1.41s    min=3.01ms  med=1.19s    max=9.84s  p(90)=2.75s    p(95)=3.39s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10423
     http_req_receiving.............: avg=358.32ms min=31.13µs med=78.5µs   max=7.9s   p(90)=1.44s    p(95)=2.07s   
     http_req_sending...............: avg=46.82ms  min=7.67µs  med=14.31µs  max=3.93s  p(90)=208.44µs p(95)=7.37ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1s       min=2.94ms  med=950.22ms max=4.37s  p(90)=1.86s    p(95)=1.94s   
     http_reqs......................: 10423   169.753769/s
     iteration_duration.............: avg=2.9s     min=20.23ms med=2.46s    max=16.03s p(90)=5.64s    p(95)=6.9s    
     iterations.....................: 10403   169.42804/s
     vus............................: 261     min=261      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e7ae910d-a774-4385-7d17-3da8a67b8e00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/53d3476e-3010-42ef-c474-19e0454f2900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e545a74d-76a6-4f17-68f4-28d7ad85f600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 29805      ✗ 0    
     data_received..................: 874 MB  14 MB/s
     data_sent......................: 12 MB   192 kB/s
     http_req_blocked...............: avg=3.73ms   min=1.46µs  med=3.29µs  max=2.51s  p(90)=5.32µs   p(95)=1.41ms  
     http_req_connecting............: avg=2.98ms   min=0s      med=0s      max=2.51s  p(90)=0s       p(95)=663.95µs
     http_req_duration..............: avg=1.49s    min=6.59ms  med=1.3s    max=8.35s  p(90)=2.74s    p(95)=3.45s   
       { expected_response:true }...: avg=1.49s    min=6.59ms  med=1.3s    max=8.35s  p(90)=2.74s    p(95)=3.45s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 9955 
     http_req_receiving.............: avg=355.11ms min=34.61µs med=78.56µs max=6.91s  p(90)=1.63s    p(95)=2.07s   
     http_req_sending...............: avg=27.67ms  min=7.79µs  med=14.54µs max=6.21s  p(90)=184.68µs p(95)=2.34ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.11s    min=6.51ms  med=1.08s   max=7.34s  p(90)=1.88s    p(95)=2.27s   
     http_reqs......................: 9955    161.386056/s
     iteration_duration.............: avg=3.03s    min=43.38ms med=2.73s   max=15.31s p(90)=5.58s    p(95)=6.44s   
     iterations.....................: 9935    161.061825/s
     vus............................: 284     min=284      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/574e137d-dc5a-4aa8-f62c-a0fe11ccb100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e7ae62a0-dc88-44c3-3513-1b6484cead00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3e850d61-ec23-49a5-3b5a-0e6b85501d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17103     ✗ 0    
     data_received..................: 502 MB  7.7 MB/s
     data_sent......................: 6.8 MB  104 kB/s
     http_req_blocked...............: avg=4.56ms  min=1.88µs   med=4.36µs   max=559.2ms  p(90)=14.49µs  p(95)=30.05ms 
     http_req_connecting............: avg=4.15ms  min=0s       med=0s       max=153.14ms p(90)=0s       p(95)=28.44ms 
     http_req_duration..............: avg=5.28s   min=17.29ms  med=4.94s    max=12.33s   p(90)=7.75s    p(95)=8.59s   
       { expected_response:true }...: avg=5.28s   min=17.29ms  med=4.94s    max=12.33s   p(90)=7.75s    p(95)=8.59s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5721 
     http_req_receiving.............: avg=96.53ms min=41.37µs  med=109.68µs max=4.48s    p(90)=119.67ms p(95)=717.59ms
     http_req_sending...............: avg=3.28ms  min=8.21µs   med=23.42µs  max=1.43s    p(90)=1.54ms   p(95)=11.55ms 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.18s   min=17.08ms  med=4.87s    max=12.32s   p(90)=7.67s    p(95)=8.51s   
     http_reqs......................: 5721    87.943746/s
     iteration_duration.............: avg=5.49s   min=194.71ms med=5.08s    max=12.35s   p(90)=8.07s    p(95)=8.83s   
     iterations.....................: 5701    87.636304/s
     vus............................: 19      min=19      max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4691e32f-d9f3-4c3b-29ae-c16b2ea8d000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4b80b009-28d3-4e95-f3b7-3d73eae65b00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/10bf43cf-c047-4883-e9f7-1d5cda13b600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  97% — ✓ 5112 / ✗ 152
     ✗ no graphql errors
      ↳  97% — ✓ 5112 / ✗ 152
     ✓ valid response structure

     █ setup

     checks.........................: 98.05% ✓ 15336     ✗ 304  
     data_received..................: 451 MB 7.0 MB/s
     data_sent......................: 6.3 MB 98 kB/s
     http_req_blocked...............: avg=1.75ms  min=1.88µs   med=4.08µs   max=73.27ms  p(90)=22.26µs  p(95)=18.43ms
     http_req_connecting............: avg=1.7ms   min=0s       med=0s       max=37.33ms  p(90)=0s       p(95)=18.22ms
     http_req_duration..............: avg=5.77s   min=14.95ms  med=3.09s    max=1m0s     p(90)=5.31s    p(95)=28.21s 
       { expected_response:true }...: avg=4.17s   min=14.95ms  med=3.07s    max=58.59s   p(90)=4.68s    p(95)=6.63s  
     http_req_failed................: 2.87%  ✓ 152       ✗ 5132 
     http_req_receiving.............: avg=1.59ms  min=0s       med=107.22µs max=285.69ms p(90)=851µs    p(95)=3.22ms 
     http_req_sending...............: avg=348.1µs min=9.95µs   med=23.17µs  max=124.42ms p(90)=230.03µs p(95)=1.14ms 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=5.77s   min=14.84ms  med=3.09s    max=1m0s     p(90)=5.3s     p(95)=28.21s 
     http_reqs......................: 5284   82.17181/s
     iteration_duration.............: avg=5.84s   min=500.77ms med=3.13s    max=1m0s     p(90)=5.38s    p(95)=28.3s  
     iterations.....................: 5264   81.860789/s
     vus............................: 54     min=54      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d357c2fb-caac-45ed-8c59-25b232ba2900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/40c3a914-dbfb-4efa-302c-5039f542c500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d9e325d3-acb6-41ff-ff76-0436bf05f200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 4767 / ✗ 61
     ✗ no graphql errors
      ↳  98% — ✓ 4767 / ✗ 61
     ✓ valid response structure

     █ setup

     checks.........................: 99.15% ✓ 14301     ✗ 122  
     data_received..................: 421 MB 6.6 MB/s
     data_sent......................: 5.8 MB 90 kB/s
     http_req_blocked...............: avg=4.41ms   min=1.47µs   med=2.94µs  max=96.18ms  p(90)=1.37ms   p(95)=49.66ms 
     http_req_connecting............: avg=4.33ms   min=0s       med=0s      max=96.14ms  p(90)=1.14ms   p(95)=49.25ms 
     http_req_duration..............: avg=6.32s    min=12.45ms  med=4.16s   max=1m0s     p(90)=12.06s   p(95)=15.34s  
       { expected_response:true }...: avg=5.63s    min=12.45ms  med=4.13s   max=52.32s   p(90)=11.82s   p(95)=14.41s  
     http_req_failed................: 1.25%  ✓ 61        ✗ 4787 
     http_req_receiving.............: avg=632.95µs min=0s       med=102.5µs max=121.14ms p(90)=226.66µs p(95)=501.03µs
     http_req_sending...............: avg=1.27ms   min=8.63µs   med=14.77µs max=57.46ms  p(90)=451.58µs p(95)=8.21ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=6.31s    min=12.31ms  med=4.16s   max=1m0s     p(90)=12.04s   p(95)=15.34s  
     http_reqs......................: 4848   75.599919/s
     iteration_duration.............: avg=6.36s    min=445.97ms med=4.19s   max=1m0s     p(90)=12.18s   p(95)=15.38s  
     iterations.....................: 4828   75.288038/s
     vus............................: 17     min=17      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4f48b180-9eb9-43c5-ea85-fc379c780600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ce3118a7-5134-4d62-8bdf-1bcef2860900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/18553808-245a-46f0-02ee-f0781bbb4a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 13221     ✗ 0    
     data_received..................: 389 MB  6.2 MB/s
     data_sent......................: 5.3 MB  83 kB/s
     http_req_blocked...............: avg=4.4ms  min=1.48µs   med=3.21µs  max=132.7ms  p(90)=10.99ms  p(95)=42.95ms
     http_req_connecting............: avg=4.19ms min=0s       med=0s      max=132.66ms p(90)=9.44ms   p(95)=42.01ms
     http_req_duration..............: avg=6.9s   min=13.87ms  med=6.82s   max=14.16s   p(90)=8.52s    p(95)=9.61s  
       { expected_response:true }...: avg=6.9s   min=13.87ms  med=6.82s   max=14.16s   p(90)=8.52s    p(95)=9.61s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 4427 
     http_req_receiving.............: avg=10.4ms min=38.55µs  med=98.27µs max=1.24s    p(90)=239.42µs p(95)=626.4µs
     http_req_sending...............: avg=2.61ms min=8.44µs   med=17.46µs max=117.37ms p(90)=439.01µs p(95)=10.15ms
     http_req_tls_handshaking.......: avg=0s     min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=6.89s  min=13.8ms   med=6.82s   max=14.16s   p(90)=8.52s    p(95)=9.61s  
     http_reqs......................: 4427    70.189232/s
     iteration_duration.............: avg=6.98s  min=395.94ms med=6.84s   max=14.29s   p(90)=8.54s    p(95)=9.72s  
     iterations.....................: 4407    69.872136/s
     vus............................: 76      min=76      max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a6f769a1-db3f-4e15-a2f1-7d6a66e0e900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ee7160f3-0af2-4066-9341-b6952b2ec800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/302ef428-7b91-4a04-9194-51f438319900/public" alt="HTTP Overview" />


  </details>