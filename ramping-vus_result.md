## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a5a531ed-9c72-4f00-78cd-179ec653b800/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |         Duration         | Notes                                    |
| :-------------------------- | :----: | :--------------------: | :----------------------: | :--------------------------------------- |
| hive-router                 |  1924  | 120524 total, 0 failed |  avg: 116ms, p95: 286ms  | ✅                                       |
| grafbase                    |  1641  | 104102 total, 0 failed |  avg: 134ms, p95: 317ms  | ✅                                       |
| cosmo                       |  680   | 43511 total, 0 failed  |  avg: 323ms, p95: 717ms  | ✅                                       |
| hive-gateway-router-runtime |  594   | 39115 total, 0 failed  |  avg: 359ms, p95: 733ms  | ❌ non-compatible response structure (1) |
| apollo-router               |  390   | 26234 total, 0 failed  | avg: 537ms, p95: 1218ms  | ❌ 15 unexpected GraphQL errors          |
| hive-gateway                |  259   | 18127 total, 0 failed  | avg: 774ms, p95: 1691ms  | ✅                                       |
| apollo-gateway              |  154   | 10663 total, 0 failed  | avg: 1219ms, p95: 2644ms | ✅                                       |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 358572      ✗ 0     
     data_received..................: 11 GB   169 MB/s
     data_sent......................: 140 MB  2.2 MB/s
     http_req_blocked...............: avg=342.82µs min=1.18µs  med=2.47µs   max=296.12ms p(90)=3.72µs   p(95)=4.32µs   p(99.9)=127.6ms 
     http_req_connecting............: avg=337.86µs min=0s      med=0s       max=295.96ms p(90)=0s       p(95)=0s       p(99.9)=127.54ms
     http_req_duration..............: avg=115.65ms min=1.93ms  med=102.11ms max=424.22ms p(90)=237.43ms p(95)=286.47ms p(99.9)=387.92ms
       { expected_response:true }...: avg=115.65ms min=1.93ms  med=102.11ms max=424.22ms p(90)=237.43ms p(95)=286.47ms p(99.9)=387.92ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 120524
     http_req_receiving.............: avg=437.84µs min=22.93µs med=41.66µs  max=127ms    p(90)=152.97µs p(95)=386.53µs p(99.9)=67.6ms  
     http_req_sending...............: avg=336.13µs min=5.09µs  med=9.82µs   max=155.89ms p(90)=26.99µs  p(95)=125.9µs  p(99.9)=60.16ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=114.87ms min=1.86ms  med=101.44ms max=416.86ms p(90)=235.73ms p(95)=284.64ms p(99.9)=386.17ms
     http_reqs......................: 120524  1924.115527/s
     iteration_duration.............: avg=117.21ms min=2.12ms  med=103.31ms max=701.95ms p(90)=239.34ms p(95)=288.55ms p(99.9)=402.16ms
     iterations.....................: 119524  1908.150943/s
     success_rate...................: 100.00% ✓ 119524      ✗ 0     
     vus............................: 90      min=0         max=500 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/73ca74a8-3d7c-4f2f-c535-4f2b92d66700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/126d6173-e125-410f-bbb2-73fb92b6e900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 309306      ✗ 0     
     data_received..................: 9.1 GB  144 MB/s
     data_sent......................: 121 MB  1.9 MB/s
     http_req_blocked...............: avg=533.59µs min=1.24µs  med=2.81µs   max=352.86ms p(90)=4.09µs   p(95)=4.82µs   p(99.9)=181.54ms
     http_req_connecting............: avg=528.99µs min=0s      med=0s       max=351.96ms p(90)=0s       p(95)=0s       p(99.9)=181.51ms
     http_req_duration..............: avg=133.78ms min=2.62ms  med=125.55ms max=482.48ms p(90)=267ms    p(95)=317.24ms p(99.9)=426.08ms
       { expected_response:true }...: avg=133.78ms min=2.62ms  med=125.55ms max=482.48ms p(90)=267ms    p(95)=317.24ms p(99.9)=426.08ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 104102
     http_req_receiving.............: avg=567µs    min=24.22µs med=47.35µs  max=133.28ms p(90)=169.97µs p(95)=431.38µs p(99.9)=82.27ms 
     http_req_sending...............: avg=465.53µs min=4.98µs  med=11.32µs  max=155.75ms p(90)=32.01µs  p(95)=137.94µs p(99.9)=74.94ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=132.74ms min=2.58ms  med=124.71ms max=482.43ms p(90)=264.95ms p(95)=315.29ms p(99.9)=420.09ms
     http_reqs......................: 104102  1641.372346/s
     iteration_duration.............: avg=135.92ms min=2.79ms  med=126.93ms max=820.22ms p(90)=269.69ms p(95)=320.37ms p(99.9)=467.63ms
     iterations.....................: 103102  1625.605384/s
     success_rate...................: 100.00% ✓ 103102      ✗ 0     
     vus............................: 84      min=0         max=498 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f0181f92-8c5f-4fee-5a79-32e959f32700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9e45ad50-a43c-4086-66a1-a009ff618e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 127533     ✗ 0    
     data_received..................: 3.8 GB  60 MB/s
     data_sent......................: 51 MB   793 kB/s
     http_req_blocked...............: avg=88.4µs   min=1.27µs  med=2.94µs   max=161.41ms p(90)=4.54µs   p(95)=6.66µs   p(99.9)=24.57ms 
     http_req_connecting............: avg=83.1µs   min=0s      med=0s       max=161.2ms  p(90)=0s       p(95)=0s       p(99.9)=24.51ms 
     http_req_duration..............: avg=322.77ms min=2.93ms  med=305.89ms max=1.16s    p(90)=633.28ms p(95)=716.55ms p(99.9)=977.86ms
       { expected_response:true }...: avg=322.77ms min=2.93ms  med=305.89ms max=1.16s    p(90)=633.28ms p(95)=716.55ms p(99.9)=977.86ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 43511
     http_req_receiving.............: avg=639.56µs min=28.34µs med=64.61µs  max=192.92ms p(90)=227.56µs p(95)=526.15µs p(99.9)=77.7ms  
     http_req_sending...............: avg=127.17µs min=5.73µs  med=11.24µs  max=85.75ms  p(90)=30.06µs  p(95)=133.41µs p(99.9)=28.42ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=322ms    min=2.84ms  med=305.14ms max=1.16s    p(90)=632.5ms  p(95)=715.52ms p(99.9)=975.54ms
     http_reqs......................: 43511   680.585028/s
     iteration_duration.............: avg=330.8ms  min=3.15ms  med=314.71ms max=1.16s    p(90)=636.71ms p(95)=720.27ms p(99.9)=981.04ms
     iterations.....................: 42511   664.943351/s
     success_rate...................: 100.00% ✓ 42511      ✗ 0    
     vus............................: 59      min=0        max=498
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6f1eb9f6-8e25-4672-558d-b22c425a4000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ac165cce-2b1f-4f28-b691-aa7700dc8600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✗ valid response structure
      ↳  99% — ✓ 38114 / ✗ 1

     checks.........................: 99.99% ✓ 114344     ✗ 1    
     data_received..................: 3.4 GB 52 MB/s
     data_sent......................: 46 MB  692 kB/s
     http_req_blocked...............: avg=139.47µs min=1.26µs  med=2.73µs   max=164.33ms p(90)=4.39µs   p(95)=6.38µs   p(99.9)=40.22ms
     http_req_connecting............: avg=134.81µs min=0s      med=0s       max=164.15ms p(90)=0s       p(95)=0s       p(99.9)=40.14ms
     http_req_duration..............: avg=359.18ms min=4.77ms  med=348.51ms max=1.15s    p(90)=692.4ms  p(95)=733.36ms p(99.9)=1.02s  
       { expected_response:true }...: avg=359.18ms min=4.77ms  med=348.51ms max=1.15s    p(90)=692.4ms  p(95)=733.36ms p(99.9)=1.02s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 39115
     http_req_receiving.............: avg=203.9µs  min=26.81µs med=45.52µs  max=286.31ms p(90)=93.77µs  p(95)=316.11µs p(99.9)=28.12ms
     http_req_sending...............: avg=247.97µs min=5.71µs  med=10.81µs  max=284.72ms p(90)=28.16µs  p(95)=126.67µs p(99.9)=47.61ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=358.73ms min=4.72ms  med=348.15ms max=1.15s    p(90)=691.83ms p(95)=732.39ms p(99.9)=1.02s  
     http_reqs......................: 39115  594.271535/s
     iteration_duration.............: avg=369.11ms min=5.46ms  med=357.69ms max=1.16s    p(90)=695.24ms p(95)=736.61ms p(99.9)=1.03s  
     iterations.....................: 38115  579.078603/s
     success_rate...................: 99.99% ✓ 38114      ✗ 1    
     vus............................: 56     min=0        max=499
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bf5c0403-aa3a-44b9-a91d-8d7a23328000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/033c5202-7b49-4199-4a07-604cf555bd00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 25219 / ✗ 15
     ✓ valid response structure

     checks.........................: 99.98% ✓ 75686      ✗ 15   
     data_received..................: 2.3 GB 34 MB/s
     data_sent......................: 31 MB  455 kB/s
     http_req_blocked...............: avg=102.83µs min=1.41µs  med=3.14µs   max=128.43ms p(90)=4.94µs   p(95)=7.19µs   p(99.9)=28.14ms
     http_req_connecting............: avg=94.71µs  min=0s      med=0s       max=128.25ms p(90)=0s       p(95)=0s       p(99.9)=27.18ms
     http_req_duration..............: avg=537.34ms min=6.29ms  med=504.19ms max=1.86s    p(90)=1.08s    p(95)=1.21s    p(99.9)=1.7s   
       { expected_response:true }...: avg=537.34ms min=6.29ms  med=504.19ms max=1.86s    p(90)=1.08s    p(95)=1.21s    p(99.9)=1.7s   
     http_req_failed................: 0.00%  ✓ 0          ✗ 26234
     http_req_receiving.............: avg=127.6µs  min=30.15µs med=54.99µs  max=72.88ms  p(90)=108.17µs p(95)=233.79µs p(99.9)=10.99ms
     http_req_sending...............: avg=113.04µs min=6.43µs  med=11.97µs  max=91.62ms  p(90)=32.21µs  p(95)=123.76µs p(99.9)=20.04ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=537.1ms  min=6.24ms  med=503.98ms max=1.86s    p(90)=1.08s    p(95)=1.21s    p(99.9)=1.7s   
     http_reqs......................: 26234  390.471698/s
     iteration_duration.............: avg=559.05ms min=6.63ms  med=526.56ms max=1.86s    p(90)=1.09s    p(95)=1.22s    p(99.9)=1.71s  
     iterations.....................: 25233  375.572629/s
     success_rate...................: 99.94% ✓ 25218      ✗ 15   
     vus............................: 72     min=0        max=498
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5773a1d0-2960-4013-420e-45e569dd4800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/814595e0-f37d-4188-7c3a-5e5b60629a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 51381      ✗ 0    
     data_received..................: 1.6 GB  23 MB/s
     data_sent......................: 21 MB   304 kB/s
     http_req_blocked...............: avg=99.92µs  min=1.42µs  med=2.88µs   max=76.52ms p(90)=5.02µs  p(95)=7.68µs   p(99.9)=23.35ms
     http_req_connecting............: avg=90.5µs   min=0s      med=0s       max=76.44ms p(90)=0s      p(95)=0s       p(99.9)=22.85ms
     http_req_duration..............: avg=773.84ms min=6.74ms  med=729.45ms max=4.95s   p(90)=1.49s   p(95)=1.69s    p(99.9)=3.92s  
       { expected_response:true }...: avg=773.84ms min=6.74ms  med=729.45ms max=4.95s   p(90)=1.49s   p(95)=1.69s    p(99.9)=3.92s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 18127
     http_req_receiving.............: avg=151.98µs min=27.31µs med=47.64µs  max=83.56ms p(90)=99.95µs p(95)=173.56µs p(99.9)=20.47ms
     http_req_sending...............: avg=146.64µs min=5.79µs  med=11.3µs   max=65.76ms p(90)=31.58µs p(95)=107.2µs  p(99.9)=27.71ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=773.54ms min=6.68ms  med=729.33ms max=4.94s   p(90)=1.49s   p(95)=1.69s    p(99.9)=3.91s  
     http_reqs......................: 18127   259.762293/s
     iteration_duration.............: avg=819.26ms min=7.99ms  med=794.41ms max=4.97s   p(90)=1.5s    p(95)=1.69s    p(99.9)=3.97s  
     iterations.....................: 17127   245.432162/s
     success_rate...................: 100.00% ✓ 17127      ✗ 0    
     vus............................: 57      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c17c1d2b-d0f7-40fb-f20d-ca98aaa6a300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9e2562b3-5f53-45e7-6f59-8b7504910c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 28989      ✗ 0    
     data_received..................: 937 MB  14 MB/s
     data_sent......................: 13 MB   185 kB/s
     http_req_blocked...............: avg=51.56µs  min=1.45µs  med=4.65µs  max=25.87ms p(90)=7.07µs   p(95)=19.8µs   p(99.9)=10.25ms
     http_req_connecting............: avg=43.1µs   min=0s      med=0s      max=25.81ms p(90)=0s       p(95)=0s       p(99.9)=10.16ms
     http_req_duration..............: avg=1.21s    min=7.58ms  med=1.13s   max=15.64s  p(90)=2.23s    p(95)=2.64s    p(99.9)=13.98s 
       { expected_response:true }...: avg=1.21s    min=7.58ms  med=1.13s   max=15.64s  p(90)=2.23s    p(95)=2.64s    p(99.9)=13.98s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 10663
     http_req_receiving.............: avg=107.52µs min=31.32µs med=88.08µs max=4.14ms  p(90)=144.07µs p(95)=181.72µs p(99.9)=2.02ms 
     http_req_sending...............: avg=53.58µs  min=6.31µs  med=18.37µs max=13.34ms p(90)=41.07µs  p(95)=66.47µs  p(99.9)=5.96ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=1.21s    min=7.48ms  med=1.13s   max=15.64s  p(90)=2.23s    p(95)=2.64s    p(99.9)=13.98s 
     http_reqs......................: 10663   154.166089/s
     iteration_duration.............: avg=1.34s    min=9.79ms  med=1.31s   max=15.65s  p(90)=2.3s     p(95)=2.69s    p(99.9)=14.1s  
     iterations.....................: 9663    139.708048/s
     success_rate...................: 100.00% ✓ 9663       ✗ 0    
     vus............................: 85      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ac7de1be-82a4-4944-58b0-9b1a66815f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f0e52b4e-e699-412e-b710-4fc6f0a29300/public" alt="HTTP Overview" />


  </details>