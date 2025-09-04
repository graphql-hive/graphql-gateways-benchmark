## Overview for: `constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/17402406-e76d-47a0-9b5a-67d53afa5100/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :--------------- | :----: | :--------------------: | :--------------------: | :---- |
| hive-router      |  1895  | 114189 total, 0 failed |  avg: 26ms, p95: 49ms  | ✅     |
| cosmo            |  702   | 42436 total, 0 failed  | avg: 70ms, p95: 109ms  | ✅     |
| grafbase         |  542   | 32739 total, 0 failed  | avg: 91ms, p95: 124ms  | ✅     |
| apollo-router    |  416   | 25354 total, 0 failed  | avg: 118ms, p95: 159ms | ✅     |
| hive-gateway-bun |  156   |  9610 total, 0 failed  | avg: 312ms, p95: 420ms | ✅     |
| hive-gateway     |  150   |  9248 total, 0 failed  | avg: 324ms, p95: 462ms | ✅     |
| mercurius        |   93   |  5728 total, 0 failed  | avg: 524ms, p95: 625ms | ✅     |
| apollo-gateway   |   86   |  5341 total, 0 failed  | avg: 564ms, p95: 675ms | ✅     |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 342267      ✗ 0     
     data_received..................: 10 GB   166 MB/s
     data_sent......................: 133 MB  2.2 MB/s
     http_req_blocked...............: avg=5.39µs  min=1.16µs  med=2.73µs  max=9.8ms    p(90)=4.1µs    p(95)=4.92µs   p(99.9)=106.2µs
     http_req_connecting............: avg=2.13µs  min=0s      med=0s      max=9.76ms   p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=26.06ms min=1.88ms  med=22.98ms max=412.11ms p(90)=42.27ms  p(95)=48.79ms  p(99.9)=85.98ms
       { expected_response:true }...: avg=26.06ms min=1.88ms  med=22.98ms max=412.11ms p(90)=42.27ms  p(95)=48.79ms  p(99.9)=85.98ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 114189
     http_req_receiving.............: avg=138.8µs min=25.25µs med=44.77µs max=368.96ms p(90)=145.14µs p(95)=376.04µs p(99.9)=15.04ms
     http_req_sending...............: avg=91.75µs min=5.44µs  med=10.82µs max=284.32ms p(90)=33.08µs  p(95)=132.36µs p(99.9)=13.17ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=25.83ms min=1.84ms  med=22.8ms  max=405.53ms p(90)=41.86ms  p(95)=48.35ms  p(99.9)=84.56ms
     http_reqs......................: 114189  1895.227885/s
     iteration_duration.............: avg=26.28ms min=5.01ms  med=23.19ms max=453.81ms p(90)=42.47ms  p(95)=49.01ms  p(99.9)=86.43ms
     iterations.....................: 114089  1893.568156/s
     success_rate...................: 100.00% ✓ 114089      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6f683fff-3b5f-4405-2a9b-4cabd77e3c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7086f119-6f6e-4fe6-84e4-6130283b2b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 127008     ✗ 0    
     data_received..................: 3.7 GB  62 MB/s
     data_sent......................: 49 MB   817 kB/s
     http_req_blocked...............: avg=10.48µs  min=1.29µs  med=2.9µs   max=11.03ms  p(90)=4.24µs   p(95)=5.2µs    p(99.9)=1.96ms  
     http_req_connecting............: avg=6.33µs   min=0s      med=0s      max=10.98ms  p(90)=0s       p(95)=0s       p(99.9)=1.44ms  
     http_req_duration..............: avg=70.42ms  min=2.95ms  med=68.39ms max=498.75ms p(90)=98.03ms  p(95)=108.84ms p(99.9)=278.22ms
       { expected_response:true }...: avg=70.42ms  min=2.95ms  med=68.39ms max=498.75ms p(90)=98.03ms  p(95)=108.84ms p(99.9)=278.22ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 42436
     http_req_receiving.............: avg=248.88µs min=26.45µs med=71.54µs max=177ms    p(90)=227.27µs p(95)=509.32µs p(99.9)=19.39ms 
     http_req_sending...............: avg=73.3µs   min=5.86µs  med=11.64µs max=368.37ms p(90)=33.61µs  p(95)=125.76µs p(99.9)=4.62ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=70.1ms   min=2.87ms  med=68.06ms max=487.29ms p(90)=97.66ms  p(95)=108.49ms p(99.9)=263.16ms
     http_reqs......................: 42436   702.072334/s
     iteration_duration.............: avg=70.87ms  min=6.42ms  med=68.72ms max=523.06ms p(90)=98.35ms  p(95)=109.21ms p(99.9)=293.99ms
     iterations.....................: 42336   700.417908/s
     success_rate...................: 100.00% ✓ 42336      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dfa86831-93a2-4b23-9008-7f83ce547c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cc85333b-00f2-4dc6-2764-8ac2d39f7d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 97917      ✗ 0    
     data_received..................: 2.9 GB  48 MB/s
     data_sent......................: 38 MB   631 kB/s
     http_req_blocked...............: avg=15.9µs   min=1.31µs  med=3.39µs  max=11.92ms  p(90)=4.77µs   p(95)=6.51µs   p(99.9)=4.19ms  
     http_req_connecting............: avg=9.86µs   min=0s      med=0s      max=11.89ms  p(90)=0s       p(95)=0s       p(99.9)=4.17ms  
     http_req_duration..............: avg=91.3ms   min=2.75ms  med=89.16ms max=527.15ms p(90)=114.15ms p(95)=123.88ms p(99.9)=332.23ms
       { expected_response:true }...: avg=91.3ms   min=2.75ms  med=89.16ms max=527.15ms p(90)=114.15ms p(95)=123.88ms p(99.9)=332.23ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 32739
     http_req_receiving.............: avg=210.31µs min=28.78µs med=67.62µs max=102.92ms p(90)=203.79µs p(95)=470.31µs p(99.9)=13.89ms 
     http_req_sending...............: avg=125.39µs min=5.68µs  med=12.74µs max=385.7ms  p(90)=115µs    p(95)=139.02µs p(99.9)=9.94ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=90.96ms  min=2.71ms  med=88.86ms max=518.14ms p(90)=113.82ms p(95)=123.34ms p(99.9)=321.65ms
     http_reqs......................: 32739   542.154092/s
     iteration_duration.............: avg=91.93ms  min=26.56ms med=89.55ms max=554.27ms p(90)=114.59ms p(95)=124.33ms p(99.9)=343.77ms
     iterations.....................: 32639   540.498103/s
     success_rate...................: 100.00% ✓ 32639      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c7640176-5ff0-4484-8dda-d7f63395a900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b52536fe-b677-4c8b-3249-921840ec7700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 75762      ✗ 0    
     data_received..................: 2.2 GB  37 MB/s
     data_sent......................: 30 MB   485 kB/s
     http_req_blocked...............: avg=15.94µs  min=1.74µs  med=3.16µs   max=10.84ms  p(90)=4.86µs   p(95)=5.76µs   p(99.9)=5.55ms  
     http_req_connecting............: avg=11.17µs  min=0s      med=0s       max=10.8ms   p(90)=0s       p(95)=0s       p(99.9)=5.53ms  
     http_req_duration..............: avg=118.08ms min=6.4ms   med=115.81ms max=584.72ms p(90)=147.53ms p(95)=158.81ms p(99.9)=418.48ms
       { expected_response:true }...: avg=118.08ms min=6.4ms   med=115.81ms max=584.72ms p(90)=147.53ms p(95)=158.81ms p(99.9)=418.48ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 25354
     http_req_receiving.............: avg=114.34µs min=31.87µs med=61.2µs   max=22.98ms  p(90)=133.01µs p(95)=234.12µs p(99.9)=4.47ms  
     http_req_sending...............: avg=79.86µs  min=7.16µs  med=12.26µs  max=437.88ms p(90)=31.32µs  p(95)=119.79µs p(99.9)=4.21ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=117.89ms min=6.32ms  med=115.65ms max=583.54ms p(90)=147.4ms  p(95)=158.63ms p(99.9)=402.9ms 
     http_reqs......................: 25354   416.616879/s
     iteration_duration.............: avg=118.86ms min=20.04ms med=116.19ms max=618.45ms p(90)=147.93ms p(95)=159.3ms  p(99.9)=430.55ms
     iterations.....................: 25254   414.973679/s
     success_rate...................: 100.00% ✓ 25254      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d1a010e4-c2e9-4577-48b0-390da8744200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9124899f-70eb-4d3c-5193-743293117200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 28530      ✗ 0   
     data_received..................: 844 MB  14 MB/s
     data_sent......................: 11 MB   182 kB/s
     http_req_blocked...............: avg=76.17µs  min=1.28µs  med=4.55µs   max=18.57ms  p(90)=6.45µs   p(95)=7.78µs   p(99.9)=16.5ms  
     http_req_connecting............: avg=67.69µs  min=0s      med=0s       max=18.37ms  p(90)=0s       p(95)=0s       p(99.9)=16.46ms 
     http_req_duration..............: avg=312.24ms min=7.73ms  med=306.75ms max=787.05ms p(90)=391.46ms p(95)=420.34ms p(99.9)=650.45ms
       { expected_response:true }...: avg=312.24ms min=7.73ms  med=306.75ms max=787.05ms p(90)=391.46ms p(95)=420.34ms p(99.9)=650.45ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 9610
     http_req_receiving.............: avg=129.18µs min=35.09µs med=92.64µs  max=7.24ms   p(90)=161.57µs p(95)=208.36µs p(99.9)=3.97ms  
     http_req_sending...............: avg=135.68µs min=6.55µs  med=18.72µs  max=305.45ms p(90)=39.08µs  p(95)=74.91µs  p(99.9)=6.09ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=311.98ms min=7.65ms  med=306.57ms max=780.45ms p(90)=391.17ms p(95)=420.08ms p(99.9)=649.61ms
     http_reqs......................: 9610    156.792731/s
     iteration_duration.............: avg=316.15ms min=56.64ms med=307.81ms max=835.72ms p(90)=392.23ms p(95)=421.55ms p(99.9)=782.09ms
     iterations.....................: 9510    155.161172/s
     success_rate...................: 100.00% ✓ 9510       ✗ 0   
     vus............................: 50      min=0        max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/09993fdd-9cc8-4dde-bc3b-fbef8039da00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/471ee826-fe1b-4e2d-e78f-d5ae1acd4c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 27444      ✗ 0   
     data_received..................: 812 MB  13 MB/s
     data_sent......................: 11 MB   176 kB/s
     http_req_blocked...............: avg=44.98µs  min=1.71µs  med=4.65µs   max=13.66ms  p(90)=6.4µs    p(95)=7.79µs   p(99.9)=10.2ms 
     http_req_connecting............: avg=37.39µs  min=0s      med=0s       max=13.62ms  p(90)=0s       p(95)=0s       p(99.9)=10.17ms
     http_req_duration..............: avg=324.46ms min=7.67ms  med=315.97ms max=1.2s     p(90)=428.02ms p(95)=461.84ms p(99.9)=1.03s  
       { expected_response:true }...: avg=324.46ms min=7.67ms  med=315.97ms max=1.2s     p(90)=428.02ms p(95)=461.84ms p(99.9)=1.03s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 9248
     http_req_receiving.............: avg=131.58µs min=36.8µs  med=92.12µs  max=13.13ms  p(90)=161.62µs p(95)=204.75µs p(99.9)=4.73ms 
     http_req_sending...............: avg=88.67µs  min=7.29µs  med=19.24µs  max=200.28ms p(90)=40.23µs  p(95)=68.55µs  p(99.9)=4.83ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=324.24ms min=7.55ms  med=315.83ms max=1.2s     p(90)=427.6ms  p(95)=461.33ms p(99.9)=1.03s  
     http_reqs......................: 9248    150.965644/s
     iteration_duration.............: avg=328.75ms min=63.66ms med=317.42ms max=1.23s    p(90)=428.95ms p(95)=463.43ms p(99.9)=1.06s  
     iterations.....................: 9148    149.33323/s
     success_rate...................: 100.00% ✓ 9148       ✗ 0   
     vus............................: 50      min=0        max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0de8f8c9-9ed2-4e47-9947-a1aad3ea9900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/39b7af25-206a-43bf-024f-263619d5a300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 16884     ✗ 0   
     data_received..................: 503 MB  8.2 MB/s
     data_sent......................: 6.7 MB  109 kB/s
     http_req_blocked...............: avg=44.88µs  min=1.36µs  med=3.18µs   max=9.77ms   p(90)=5.04µs   p(95)=5.79µs   p(99.9)=8.61ms  
     http_req_connecting............: avg=40.93µs  min=0s      med=0s       max=9.74ms   p(90)=0s       p(95)=0s       p(99.9)=8.59ms  
     http_req_duration..............: avg=523.95ms min=9.85ms  med=519.9ms  max=981.35ms p(90)=582.71ms p(95)=625.31ms p(99.9)=900.56ms
       { expected_response:true }...: avg=523.95ms min=9.85ms  med=519.9ms  max=981.35ms p(90)=582.71ms p(95)=625.31ms p(99.9)=900.56ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5728
     http_req_receiving.............: avg=78.71µs  min=28.76µs med=68.08µs  max=4.46ms   p(90)=111.46µs p(95)=130.67µs p(99.9)=1.85ms  
     http_req_sending...............: avg=208.54µs min=6.12µs  med=13.84µs  max=363.99ms p(90)=21.47µs  p(95)=33.66µs  p(99.9)=5.33ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=523.66ms min=9.77ms  med=519.79ms max=979.96ms p(90)=582.57ms p(95)=624.97ms p(99.9)=899.27ms
     http_reqs......................: 5728    93.358897/s
     iteration_duration.............: avg=533.56ms min=44.44ms med=520.63ms max=1.01s    p(90)=583.63ms p(95)=626.18ms p(99.9)=958.53ms
     iterations.....................: 5628    91.729027/s
     success_rate...................: 100.00% ✓ 5628      ✗ 0   
     vus............................: 50      min=0       max=50
     vus_max........................: 50      min=50      max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d093e1e2-0af9-4840-31de-32734a25ac00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fa51c432-7668-4cd1-c637-956e13067200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 15723     ✗ 0   
     data_received..................: 469 MB  7.6 MB/s
     data_sent......................: 6.2 MB  101 kB/s
     http_req_blocked...............: avg=62.73µs  min=1.42µs   med=2.96µs   max=12.67ms  p(90)=4.78µs   p(95)=5.47µs   p(99.9)=10.99ms 
     http_req_connecting............: avg=59.06µs  min=0s       med=0s       max=12.62ms  p(90)=0s       p(95)=0s       p(99.9)=10.96ms 
     http_req_duration..............: avg=564.42ms min=9.36ms   med=566.64ms max=1.01s    p(90)=645.1ms  p(95)=674.51ms p(99.9)=939.25ms
       { expected_response:true }...: avg=564.42ms min=9.36ms   med=566.64ms max=1.01s    p(90)=645.1ms  p(95)=674.51ms p(99.9)=939.25ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5341
     http_req_receiving.............: avg=92.41µs  min=32.97µs  med=58.01µs  max=124.04ms p(90)=103.26µs p(95)=120.4µs  p(99.9)=332.49µs
     http_req_sending...............: avg=141.97µs min=6.59µs   med=12.5µs   max=126.55ms p(90)=20.47µs  p(95)=24.58µs  p(99.9)=47.41ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=564.19ms min=9.26ms   med=566.54ms max=1.01s    p(90)=644.96ms p(95)=673.78ms p(99.9)=927.97ms
     http_reqs......................: 5341    86.729572/s
     iteration_duration.............: avg=575.49ms min=349.48ms med=567.67ms max=1.05s    p(90)=646.01ms p(95)=675.44ms p(99.9)=963.33ms
     iterations.....................: 5241    85.105727/s
     success_rate...................: 100.00% ✓ 5241      ✗ 0   
     vus............................: 50      min=0       max=50
     vus_max........................: 50      min=50      max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5c19f278-41bc-4909-e771-e4cefb337700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0e53e563-0729-4b82-7075-4b1871432b00/public" alt="HTTP Overview" />


  </details>