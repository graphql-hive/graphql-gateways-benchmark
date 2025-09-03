## Overview for: `constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/055ea5c4-56ff-49d8-f8c8-c5071acb2300/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration          | Notes                                                                           |
| :--------------- | :----: | :--------------------: | :-----------------------: | :------------------------------------------------------------------------------ |
| hive-router      |  2048  | 128142 total, 2 failed |  avg: 233ms, p95: 365ms   | ❌ 2 failed requests, 2 non-200 responses, non-compatible response structure (1) |
| cosmo            |  660   | 42498 total, 0 failed  |  avg: 705ms, p95: 970ms   | ✅                                                                               |
| grafbase         |  439   | 28315 total, 0 failed  | avg: 1062ms, p95: 1446ms  | ✅                                                                               |
| apollo-router    |  371   | 25424 total, 0 failed  | avg: 1191ms, p95: 1711ms  | ❌ 110 unexpected GraphQL errors, non-compatible response structure (1)          |
| hive-gateway     |  139   | 10111 total, 0 failed  | avg: 3024ms, p95: 4321ms  | ✅                                                                               |
| hive-gateway-bun |  134   |  9872 total, 1 failed  | avg: 3074ms, p95: 4403ms  | ❌ 1 failed requests, 1 non-200 responses                                        |
| apollo-gateway   |   80   |  6022 total, 0 failed  | avg: 5147ms, p95: 15282ms | ✅                                                                               |
| mercurius        |   80   |  5937 total, 0 failed  | avg: 5075ms, p95: 8197ms  | ✅                                                                               |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 127140 / ✗ 2
     ✓ no graphql errors
     ✗ valid response structure
      ↳  99% — ✓ 127141 / ✗ 1

     checks.........................: 99.99% ✓ 381423      ✗ 3     
     data_received..................: 11 GB  180 MB/s
     data_sent......................: 149 MB 2.4 MB/s
     http_req_blocked...............: avg=515.27µs min=1.1µs   med=2.33µs   max=3.02s    p(90)=3.72µs   p(95)=4.49µs   p(99.9)=149.36ms
     http_req_connecting............: avg=510.98µs min=0s      med=0s       max=3.02s    p(90)=0s       p(95)=0s       p(99.9)=149.01ms
     http_req_duration..............: avg=232.85ms min=1.91ms  med=190.39ms max=4.46s    p(90)=341.36ms p(95)=365.18ms p(99.9)=3.54s   
       { expected_response:true }...: avg=232.85ms min=1.91ms  med=190.39ms max=4.46s    p(90)=341.35ms p(95)=365.18ms p(99.9)=3.54s   
     http_req_failed................: 0.00%  ✓ 2           ✗ 128140
     http_req_receiving.............: avg=618.49µs min=25.67µs med=45.27µs  max=953.21ms p(90)=290.47µs p(95)=413.16µs p(99.9)=76.14ms 
     http_req_sending...............: avg=826.85µs min=5.22µs  med=9.98µs   max=1.16s    p(90)=100.16µs p(95)=133.31µs p(99.9)=102.96ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=231.41ms min=0s      med=189.65ms max=3.71s    p(90)=340.19ms p(95)=364.06ms p(99.9)=3.4s    
     http_reqs......................: 128142 2048.975161/s
     iteration_duration.............: avg=235.89ms min=13.7ms  med=191.3ms  max=4.9s     p(90)=341.87ms p(95)=365.63ms p(99.9)=3.76s   
     iterations.....................: 127142 2032.985281/s
     success_rate...................: 99.99% ✓ 127140      ✗ 1     
     vus............................: 500    min=0         max=500 
     vus_max........................: 500    min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/54412a01-d478-4b17-1db0-335043a64e00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/faf6748f-4166-4bb4-1cd0-3f683c8d5e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 124494     ✗ 0    
     data_received..................: 3.7 GB  58 MB/s
     data_sent......................: 49 MB   768 kB/s
     http_req_blocked...............: avg=760.56µs min=1.25µs  med=2.9µs    max=128.28ms p(90)=4.33µs   p(95)=5.63µs   p(99.9)=92.49ms 
     http_req_connecting............: avg=754.25µs min=0s      med=0s       max=128.25ms p(90)=0s       p(95)=0s       p(99.9)=92.46ms 
     http_req_duration..............: avg=705.25ms min=2.85ms  med=667.25ms max=5.14s    p(90)=888.33ms p(95)=969.64ms p(99.9)=4.82s   
       { expected_response:true }...: avg=705.25ms min=2.85ms  med=667.25ms max=5.14s    p(90)=888.33ms p(95)=969.64ms p(99.9)=4.82s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 42498
     http_req_receiving.............: avg=1.84ms   min=29.79µs med=68.07µs  max=1.03s    p(90)=197.29µs p(95)=532.85µs p(99.9)=184.89ms
     http_req_sending...............: avg=482.4µs  min=5.92µs  med=11.28µs  max=1.18s    p(90)=29.9µs   p(95)=132.45µs p(99.9)=32.49ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=702.92ms min=2.79ms  med=665.56ms max=5.09s    p(90)=885.39ms p(95)=964.84ms p(99.9)=4.8s    
     http_reqs......................: 42498   660.154627/s
     iteration_duration.............: avg=724.6ms  min=83.89ms med=671.81ms max=5.42s    p(90)=892.2ms  p(95)=973.92ms p(99.9)=5.02s   
     iterations.....................: 41498   644.620846/s
     success_rate...................: 100.00% ✓ 41498      ✗ 0    
     vus............................: 500     min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/44be8a37-97a1-4b1e-c32f-6780605de500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3820ff41-28f1-473e-5c7a-916f7a99d100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 81945      ✗ 0    
     data_received..................: 2.5 GB  39 MB/s
     data_sent......................: 33 MB   511 kB/s
     http_req_blocked...............: avg=1.33ms   min=1.4µs    med=3.39µs  max=3.25s p(90)=5.63µs   p(95)=10.47µs  p(99.9)=104.7ms 
     http_req_connecting............: avg=1.32ms   min=0s       med=0s      max=3.25s p(90)=0s       p(95)=0s       p(99.9)=104.66ms
     http_req_duration..............: avg=1.06s    min=2.74ms   med=1.02s   max=5.64s p(90)=1.31s    p(95)=1.44s    p(99.9)=5.34s   
       { expected_response:true }...: avg=1.06s    min=2.74ms   med=1.02s   max=5.64s p(90)=1.31s    p(95)=1.44s    p(99.9)=5.34s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 28315
     http_req_receiving.............: avg=436.81µs min=24.38µs  med=67.3µs  max=1.18s p(90)=188.39µs p(95)=519.97µs p(99.9)=38.63ms 
     http_req_sending...............: avg=957.95µs min=6.12µs   med=13.27µs max=1.18s p(90)=116.25µs p(95)=159.29µs p(99.9)=74.45ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s    p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=1.06s    min=2.7ms    med=1.02s   max=5.61s p(90)=1.31s    p(95)=1.44s    p(99.9)=5.3s    
     http_reqs......................: 28315   439.565538/s
     iteration_duration.............: avg=1.1s     min=235.85ms med=1.03s   max=5.97s p(90)=1.32s    p(95)=1.45s    p(99.9)=5.7s    
     iterations.....................: 27315   424.041415/s
     success_rate...................: 100.00% ✓ 27315      ✗ 0    
     vus............................: 483     min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/321512dd-8f63-4819-d2a9-bfb31173f100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ac0c6d17-6968-43cc-f73e-8f6c665ec000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 24314 / ✗ 110
     ✗ valid response structure
      ↳  99% — ✓ 24423 / ✗ 1

     checks.........................: 99.84% ✓ 73161      ✗ 111  
     data_received..................: 2.2 GB 33 MB/s
     data_sent......................: 30 MB  432 kB/s
     http_req_blocked...............: avg=1.13ms   min=1.4µs    med=2.88µs  max=121.05ms p(90)=4.53µs   p(95)=7.14µs   p(99.9)=92.58ms
     http_req_connecting............: avg=1.12ms   min=0s       med=0s      max=121.01ms p(90)=0s       p(95)=0s       p(99.9)=92.55ms
     http_req_duration..............: avg=1.19s    min=6.18ms   med=1.15s   max=5.8s     p(90)=1.53s    p(95)=1.71s    p(99.9)=5.51s  
       { expected_response:true }...: avg=1.19s    min=6.18ms   med=1.15s   max=5.8s     p(90)=1.53s    p(95)=1.71s    p(99.9)=5.51s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 25424
     http_req_receiving.............: avg=279.62µs min=27.35µs  med=55.23µs max=1.19s    p(90)=122.41µs p(95)=233.46µs p(99.9)=11.1ms 
     http_req_sending...............: avg=781.73µs min=5.93µs   med=11.55µs max=1.28s    p(90)=31.39µs  p(95)=127.63µs p(99.9)=24.25ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=1.19s    min=6.13ms   med=1.15s   max=5.69s    p(90)=1.53s    p(95)=1.7s     p(99.9)=5.5s   
     http_reqs......................: 25424  371.766802/s
     iteration_duration.............: avg=1.24s    min=128.82ms med=1.16s   max=6.32s    p(90)=1.54s    p(95)=1.72s    p(99.9)=5.76s  
     iterations.....................: 24424  357.144131/s
     success_rate...................: 99.54% ✓ 24314      ✗ 110  
     vus............................: 466    min=0        max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f0335f55-2ff6-487d-ad1b-8448abedd200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a94b285c-c932-4dae-9e85-39375fb1b300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 27333      ✗ 0    
     data_received..................: 888 MB  12 MB/s
     data_sent......................: 12 MB   162 kB/s
     http_req_blocked...............: avg=3.52ms   min=1.47µs  med=3.93µs  max=123.07ms p(90)=6.62µs   p(95)=144.45µs p(99.9)=119.64ms
     http_req_connecting............: avg=3.5ms    min=0s      med=0s      max=123.03ms p(90)=0s       p(95)=0s       p(99.9)=119.59ms
     http_req_duration..............: avg=3.02s    min=7.08ms  med=3.22s   max=8.28s    p(90)=3.86s    p(95)=4.32s    p(99.9)=8.16s   
       { expected_response:true }...: avg=3.02s    min=7.08ms  med=3.22s   max=8.28s    p(90)=3.86s    p(95)=4.32s    p(99.9)=8.16s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10111
     http_req_receiving.............: avg=505.02µs min=33.01µs med=76.09µs max=1.19s    p(90)=142.41µs p(95)=190.32µs p(99.9)=27.11ms 
     http_req_sending...............: avg=1.66ms   min=6.56µs  med=15.33µs max=1.71s    p(90)=43.48µs  p(95)=1.66ms   p(99.9)=516.54ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=3.02s    min=7.03ms  med=3.22s   max=8.25s    p(90)=3.86s    p(95)=4.31s    p(99.9)=8.15s   
     http_reqs......................: 10111   139.346594/s
     iteration_duration.............: avg=3.38s    min=48.29ms med=3.28s   max=8.59s    p(90)=3.93s    p(95)=4.65s    p(99.9)=8.55s   
     iterations.....................: 9111    125.564912/s
     success_rate...................: 100.00% ✓ 9111       ✗ 0    
     vus............................: 246     min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/465c23dc-f7dc-4ddd-9d93-e459d8f48600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7bc108c1-4008-4ac6-f769-ecd25cf36500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 8871 / ✗ 1
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 99.99% ✓ 26615      ✗ 1    
     data_received..................: 867 MB 12 MB/s
     data_sent......................: 12 MB  156 kB/s
     http_req_blocked...............: avg=3.88ms  min=1.52µs   med=4.44µs  max=4.34s    p(90)=7.35µs   p(95)=21.67ms  p(99.9)=115.3ms 
     http_req_connecting............: avg=3.42ms  min=0s       med=0s      max=140.42ms p(90)=0s       p(95)=20.94ms  p(99.9)=114.89ms
     http_req_duration..............: avg=3.07s   min=7.72ms   med=3.31s   max=8.54s    p(90)=3.9s     p(95)=4.4s     p(99.9)=8.43s   
       { expected_response:true }...: avg=3.07s   min=7.72ms   med=3.31s   max=8.54s    p(90)=3.9s     p(95)=4.4s     p(99.9)=8.43s   
     http_req_failed................: 0.01%  ✓ 1          ✗ 9871 
     http_req_receiving.............: avg=695.7µs min=0s       med=90.05µs max=1.56s    p(90)=162.73µs p(95)=213.32µs p(99.9)=48.97ms 
     http_req_sending...............: avg=1.64ms  min=7.78µs   med=18.17µs max=1.81s    p(90)=46.21µs  p(95)=1.84ms   p(99.9)=211.73ms
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=3.07s   min=7.65ms   med=3.3s    max=8.52s    p(90)=3.9s     p(95)=4.35s    p(99.9)=8.42s   
     http_reqs......................: 9872   134.063189/s
     iteration_duration.............: avg=3.45s   min=259.23ms med=3.36s   max=9s       p(90)=3.97s    p(95)=4.96s    p(99.9)=8.94s   
     iterations.....................: 8872   120.483044/s
     success_rate...................: 99.98% ✓ 8871       ✗ 1    
     vus............................: 242    min=0        max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a611e3a4-0a5e-4525-a77d-f200f69baf00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1dd1f41f-fb4a-4432-e5eb-ed4b84bed800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 15066     ✗ 0    
     data_received..................: 529 MB  7.0 MB/s
     data_sent......................: 7.0 MB  93 kB/s
     http_req_blocked...............: avg=9.07ms   min=1.28µs  med=3.13µs  max=234.24ms p(90)=6.75µs   p(95)=86.26ms  p(99.9)=195.37ms
     http_req_connecting............: avg=9.03ms   min=0s      med=0s      max=234.14ms p(90)=0s       p(95)=86.03ms  p(99.9)=195.23ms
     http_req_duration..............: avg=5.14s    min=9.16ms  med=2.35s   max=27.04s   p(90)=13.47s   p(95)=15.28s   p(99.9)=27.01s  
       { expected_response:true }...: avg=5.14s    min=9.16ms  med=2.35s   max=27.04s   p(90)=13.47s   p(95)=15.28s   p(99.9)=27.01s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 6022 
     http_req_receiving.............: avg=932.16µs min=26.9µs  med=59.27µs max=1.14s    p(90)=109.51µs p(95)=128.75µs p(99.9)=178.3ms 
     http_req_sending...............: avg=4.53ms   min=5.91µs  med=12.35µs max=1.3s     p(90)=68.04µs  p(95)=12.85ms  p(99.9)=1.01s   
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=5.14s    min=9.11ms  med=2.35s   max=27.04s   p(90)=13.47s   p(95)=15.28s   p(99.9)=27.01s  
     http_reqs......................: 6022    80.171737/s
     iteration_duration.............: avg=6.18s    min=89.54ms med=3.04s   max=27.04s   p(90)=13.63s   p(95)=19.55s   p(99.9)=27.01s  
     iterations.....................: 5022    66.858596/s
     success_rate...................: 100.00% ✓ 5022      ✗ 0    
     vus............................: 91      min=0       max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2e8fb090-3271-465a-62ed-5f82c48b2600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1c616063-f3b2-4b47-1fe9-ffa347a3ec00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 14811     ✗ 0    
     data_received..................: 521 MB  7.0 MB/s
     data_sent......................: 6.9 MB  93 kB/s
     http_req_blocked...............: avg=4.61ms   min=1.17µs  med=3.65µs  max=107.6ms  p(90)=7.55µs   p(95)=42.34ms  p(99.9)=96.49ms 
     http_req_connecting............: avg=4.58ms   min=0s      med=0s      max=107.57ms p(90)=0s       p(95)=42.15ms  p(99.9)=96.28ms 
     http_req_duration..............: avg=5.07s    min=9.54ms  med=5.96s   max=11.19s   p(90)=7.31s    p(95)=8.19s    p(99.9)=11.12s  
       { expected_response:true }...: avg=5.07s    min=9.54ms  med=5.96s   max=11.19s   p(90)=7.31s    p(95)=8.19s    p(99.9)=11.12s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 5937 
     http_req_receiving.............: avg=659.88µs min=25.14µs med=74.06µs max=1.03s    p(90)=125.14µs p(95)=148.83µs p(99.9)=145.55ms
     http_req_sending...............: avg=3.93ms   min=5.78µs  med=14.84µs max=1.29s    p(90)=57.24µs  p(95)=1.73ms   p(99.9)=1.1s    
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=5.07s    min=9.49ms  med=5.96s   max=11.14s   p(90)=7.31s    p(95)=8.18s    p(99.9)=11.1s   
     http_reqs......................: 5937    80.106717/s
     iteration_duration.............: avg=6.12s    min=1.1s    med=6.21s   max=11.32s   p(90)=7.92s    p(95)=8.56s    p(99.9)=11.32s  
     iterations.....................: 4937    66.613923/s
     success_rate...................: 100.00% ✓ 4937      ✗ 0    
     vus............................: 159     min=0       max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a25a3a0b-d9f6-4cfd-c0e6-e81ea7e84b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b755e376-3d80-4ce8-d954-87cadbfc4700/public" alt="HTTP Overview" />


  </details>