## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d3f176dd-061e-43c9-ba45-a1d5641b5d00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |        Duration        | Notes                         |
| :--------------- | :----: | :--------------------: | :--------------------: | :---------------------------- |
| hive-router      |  1913  | 115256 total, 0 failed |  avg: 26ms, p95: 49ms  | ✅                             |
| cosmo            |  701   | 42394 total, 0 failed  | avg: 70ms, p95: 108ms  | ✅                             |
| grafbase         |  517   | 31250 total, 0 failed  | avg: 96ms, p95: 130ms  | ✅                             |
| apollo-router    |  414   | 25215 total, 0 failed  | avg: 119ms, p95: 159ms | ❌ 1 unexpected GraphQL errors |
| hive-gateway-bun |  159   |  9786 total, 0 failed  | avg: 307ms, p95: 420ms | ✅                             |
| hive-gateway     |  158   |  9732 total, 0 failed  | avg: 308ms, p95: 583ms | ✅                             |
| mercurius        |   90   |  5582 total, 0 failed  | avg: 538ms, p95: 619ms | ✅                             |
| apollo-gateway   |   86   |  5321 total, 0 failed  | avg: 566ms, p95: 672ms | ✅                             |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 345468      ✗ 0     
     data_received..................: 10 GB   168 MB/s
     data_sent......................: 134 MB  2.2 MB/s
     http_req_blocked...............: avg=5.27µs   min=1.17µs  med=2.63µs  max=9.6ms    p(90)=3.96µs   p(95)=4.73µs   p(99.9)=92.12µs
     http_req_connecting............: avg=2.1µs    min=0s      med=0s      max=9.57ms   p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=25.81ms  min=1.91ms  med=22.71ms max=430.5ms  p(90)=41.91ms  p(95)=48.76ms  p(99.9)=84.84ms
       { expected_response:true }...: avg=25.81ms  min=1.91ms  med=22.71ms max=430.5ms  p(90)=41.91ms  p(95)=48.76ms  p(99.9)=84.84ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 115256
     http_req_receiving.............: avg=131.85µs min=23.97µs med=44.41µs max=155.99ms p(90)=136.92µs p(95)=370.38µs p(99.9)=14.27ms
     http_req_sending...............: avg=91.77µs  min=5.49µs  med=10.74µs max=228.75ms p(90)=32.48µs  p(95)=131.34µs p(99.9)=12.86ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=25.59ms  min=1.87ms  med=22.52ms max=429.47ms p(90)=41.48ms  p(95)=48.27ms  p(99.9)=82.22ms
     http_reqs......................: 115256  1913.101723/s
     iteration_duration.............: avg=26.04ms  min=3.97ms  med=22.92ms max=473.3ms  p(90)=42.13ms  p(95)=48.97ms  p(99.9)=85.32ms
     iterations.....................: 115156  1911.441851/s
     success_rate...................: 100.00% ✓ 115156      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2467c883-5fed-426e-7294-54bfaadcf700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d545b394-79e8-4b0f-2b14-03273189de00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 126882     ✗ 0    
     data_received..................: 3.7 GB  62 MB/s
     data_sent......................: 49 MB   816 kB/s
     http_req_blocked...............: avg=10.96µs  min=1.27µs  med=3.04µs  max=10.83ms  p(90)=4.4µs   p(95)=5.46µs   p(99.9)=2.05ms  
     http_req_connecting............: avg=6.24µs   min=0s      med=0s      max=10.8ms   p(90)=0s      p(95)=0s       p(99.9)=1.4ms   
     http_req_duration..............: avg=70.47ms  min=3.04ms  med=68.47ms max=513.95ms p(90)=97.71ms p(95)=107.86ms p(99.9)=275.11ms
       { expected_response:true }...: avg=70.47ms  min=3.04ms  med=68.47ms max=513.95ms p(90)=97.71ms p(95)=107.86ms p(99.9)=275.11ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 42394
     http_req_receiving.............: avg=265.36µs min=30.83µs med=74.17µs max=170.45ms p(90)=237.6µs p(95)=507.75µs p(99.9)=22.1ms  
     http_req_sending...............: avg=73.62µs  min=5.75µs  med=11.82µs max=389.3ms  p(90)=33.49µs p(95)=126.39µs p(99.9)=4.83ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=70.13ms  min=2.93ms  med=68.14ms max=493.38ms p(90)=97.34ms p(95)=107.46ms p(99.9)=262.69ms
     http_reqs......................: 42394   701.574554/s
     iteration_duration.............: avg=70.93ms  min=8.86ms  med=68.77ms max=558.41ms p(90)=98.02ms p(95)=108.21ms p(99.9)=308.68ms
     iterations.....................: 42294   699.919663/s
     success_rate...................: 100.00% ✓ 42294      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c9866760-a295-45ad-68bb-34643487a300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/07b2299e-6a11-4fe6-19e5-d7a190c45700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 93450      ✗ 0    
     data_received..................: 2.7 GB  46 MB/s
     data_sent......................: 36 MB   602 kB/s
     http_req_blocked...............: avg=15.22µs  min=1.56µs  med=3.53µs  max=10.58ms  p(90)=5.54µs   p(95)=8.42µs   p(99.9)=3.93ms  
     http_req_connecting............: avg=8.14µs   min=0s      med=0s      max=10.54ms  p(90)=0s       p(95)=0s       p(99.9)=3.47ms  
     http_req_duration..............: avg=95.6ms   min=2.8ms   med=93.35ms max=559.6ms  p(90)=119.74ms p(95)=129.87ms p(99.9)=358.53ms
       { expected_response:true }...: avg=95.6ms   min=2.8ms   med=93.35ms max=559.6ms  p(90)=119.74ms p(95)=129.87ms p(99.9)=358.53ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 31250
     http_req_receiving.............: avg=221.7µs  min=33.1µs  med=72.89µs max=40.14ms  p(90)=246.58µs p(95)=529.94µs p(99.9)=11.82ms 
     http_req_sending...............: avg=112.94µs min=6.42µs  med=13.7µs  max=238.7ms  p(90)=119.03µs p(95)=147.11µs p(99.9)=8.79ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=95.26ms  min=2.74ms  med=93.02ms max=557.97ms p(90)=119.38ms p(95)=129.41ms p(99.9)=343.43ms
     http_reqs......................: 31250   517.483713/s
     iteration_duration.............: avg=96.32ms  min=22.75ms med=93.76ms max=589.92ms p(90)=120.16ms p(95)=130.44ms p(99.9)=381.3ms 
     iterations.....................: 31150   515.827765/s
     success_rate...................: 100.00% ✓ 31150      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/59289cde-6a86-4c75-d360-495094e92b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/17de8058-7a0a-4b6a-53c8-1670d7232d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 25114 / ✗ 1
     ✓ valid response structure

     checks.........................: 99.99% ✓ 75344      ✗ 1    
     data_received..................: 2.2 GB 36 MB/s
     data_sent......................: 29 MB  482 kB/s
     http_req_blocked...............: avg=28.57µs  min=1.66µs  med=3.34µs   max=20.95ms  p(90)=5.29µs   p(95)=6.28µs   p(99.9)=12.46ms 
     http_req_connecting............: avg=23.25µs  min=0s      med=0s       max=20.93ms  p(90)=0s       p(95)=0s       p(99.9)=12.43ms 
     http_req_duration..............: avg=118.73ms min=6.24ms  med=116.76ms max=534.27ms p(90)=147.97ms p(95)=158.89ms p(99.9)=374.73ms
       { expected_response:true }...: avg=118.73ms min=6.24ms  med=116.76ms max=534.27ms p(90)=147.97ms p(95)=158.89ms p(99.9)=374.73ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 25215
     http_req_receiving.............: avg=128.77µs min=31.14µs med=65.69µs  max=36.16ms  p(90)=148.45µs p(95)=294.92µs p(99.9)=6.9ms   
     http_req_sending...............: avg=105.71µs min=7.53µs  med=12.91µs  max=325.7ms  p(90)=33.43µs  p(95)=125.29µs p(99.9)=6.9ms   
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=118.5ms  min=6.17ms  med=116.59ms max=533.96ms p(90)=147.71ms p(95)=158.56ms p(99.9)=373.61ms
     http_reqs......................: 25215  414.211292/s
     iteration_duration.............: avg=119.55ms min=22.33ms med=117.19ms max=576.63ms p(90)=148.33ms p(95)=159.43ms p(99.9)=399.42ms
     iterations.....................: 25115  412.568574/s
     success_rate...................: 99.99% ✓ 25114      ✗ 1    
     vus............................: 50     min=50       max=50 
     vus_max........................: 50     min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1445df12-da06-4b2e-02cf-ef0c25c99a00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/63e80b17-207b-4cea-bc3a-f7a5cea6f800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 29058      ✗ 0   
     data_received..................: 859 MB  14 MB/s
     data_sent......................: 11 MB   186 kB/s
     http_req_blocked...............: avg=39.71µs  min=1.59µs  med=4.27µs   max=12.8ms   p(90)=6.15µs   p(95)=7.61µs   p(99.9)=9.72ms  
     http_req_connecting............: avg=32.78µs  min=0s      med=0s       max=12.75ms  p(90)=0s       p(95)=0s       p(99.9)=9.69ms  
     http_req_duration..............: avg=306.63ms min=7.47ms  med=301.58ms max=765.88ms p(90)=390.17ms p(95)=420.16ms p(99.9)=643.93ms
       { expected_response:true }...: avg=306.63ms min=7.47ms  med=301.58ms max=765.88ms p(90)=390.17ms p(95)=420.16ms p(99.9)=643.93ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 9786
     http_req_receiving.............: avg=155.55µs min=32.88µs med=89.64µs  max=115.89ms p(90)=160.91µs p(95)=220.98µs p(99.9)=4.98ms  
     http_req_sending...............: avg=124.96µs min=7.32µs  med=18µs     max=310.08ms p(90)=38.03µs  p(95)=65.8µs   p(99.9)=7.25ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=306.35ms min=7.39ms  med=301.37ms max=733.08ms p(90)=389.81ms p(95)=419.68ms p(99.9)=643.31ms
     http_reqs......................: 9786    159.704304/s
     iteration_duration.............: avg=310.4ms  min=45.95ms med=302.61ms max=829.85ms p(90)=391.02ms p(95)=421.34ms p(99.9)=709.39ms
     iterations.....................: 9686    158.072337/s
     success_rate...................: 100.00% ✓ 9686       ✗ 0   
     vus............................: 50      min=0        max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/aafd2b37-5178-4519-9fbe-8e623d28b800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0de470cf-e165-40e8-cacf-3b47bb09cc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 28896      ✗ 0   
     data_received..................: 855 MB  14 MB/s
     data_sent......................: 11 MB   184 kB/s
     http_req_blocked...............: avg=47.36µs  min=1.5µs   med=4.17µs   max=15.67ms  p(90)=5.92µs   p(95)=7.04µs   p(99.9)=12.29ms 
     http_req_connecting............: avg=41.59µs  min=0s      med=0s       max=15.64ms  p(90)=0s       p(95)=0s       p(99.9)=12.26ms 
     http_req_duration..............: avg=308.49ms min=7.89ms  med=360.27ms max=831.59ms p(90)=542.65ms p(95)=582.98ms p(99.9)=749.4ms 
       { expected_response:true }...: avg=308.49ms min=7.89ms  med=360.27ms max=831.59ms p(90)=542.65ms p(95)=582.98ms p(99.9)=749.4ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 9732
     http_req_receiving.............: avg=134.61µs min=31.49µs med=81.97µs  max=153ms    p(90)=139.5µs  p(95)=185.73µs p(99.9)=3.54ms  
     http_req_sending...............: avg=73.9µs   min=6.96µs  med=16.75µs  max=252.92ms p(90)=35.17µs  p(95)=48.34µs  p(99.9)=5.18ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=308.28ms min=7.83ms  med=360.08ms max=804.95ms p(90)=542.56ms p(95)=582.89ms p(99.9)=744.79ms
     http_reqs......................: 9732    158.53702/s
     iteration_duration.............: avg=312.14ms min=10.19ms med=362.54ms max=883.6ms  p(90)=543.34ms p(95)=584.34ms p(99.9)=767.28ms
     iterations.....................: 9632    156.907992/s
     success_rate...................: 100.00% ✓ 9632       ✗ 0   
     vus............................: 50      min=0        max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fadacb12-c472-4ee2-d342-65873f391400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b67b971b-f8d5-420b-e49e-fc6677042c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 16446     ✗ 0   
     data_received..................: 490 MB  8.0 MB/s
     data_sent......................: 6.5 MB  106 kB/s
     http_req_blocked...............: avg=46.77µs  min=1.55µs  med=3.56µs   max=9.85ms   p(90)=5.62µs   p(95)=6.33µs   p(99.9)=8.58ms
     http_req_connecting............: avg=42.58µs  min=0s      med=0s       max=9.8ms    p(90)=0s       p(95)=0s       p(99.9)=8.56ms
     http_req_duration..............: avg=537.76ms min=10.19ms med=538.25ms max=1.07s    p(90)=600.18ms p(95)=619.11ms p(99.9)=1.02s 
       { expected_response:true }...: avg=537.76ms min=10.19ms med=538.25ms max=1.07s    p(90)=600.18ms p(95)=619.11ms p(99.9)=1.02s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 5582
     http_req_receiving.............: avg=108.39µs min=30.1µs  med=67.88µs  max=157.19ms p(90)=111.17µs p(95)=130.7µs  p(99.9)=2.06ms
     http_req_sending...............: avg=131.38µs min=6.85µs  med=14.29µs  max=379.66ms p(90)=22.68µs  p(95)=35.84µs  p(99.9)=6.03ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=537.52ms min=10.12ms med=538.11ms max=1.05s    p(90)=599.95ms p(95)=618.98ms p(99.9)=1.01s 
     http_reqs......................: 5582    90.914527/s
     iteration_duration.............: avg=547.83ms min=62ms    med=539.19ms max=1.12s    p(90)=601.03ms p(95)=619.95ms p(99.9)=1.06s 
     iterations.....................: 5482    89.285818/s
     success_rate...................: 100.00% ✓ 5482      ✗ 0   
     vus............................: 50      min=0       max=50
     vus_max........................: 50      min=50      max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/073ca38d-a967-4b28-fe15-1ff5ff21be00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8292d2bc-b36c-432b-9144-87a5a40bad00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 15663     ✗ 0   
     data_received..................: 467 MB  7.6 MB/s
     data_sent......................: 6.2 MB  101 kB/s
     http_req_blocked...............: avg=45.59µs  min=1.42µs   med=3.07µs  max=8.75ms   p(90)=4.85µs   p(95)=5.54µs   p(99.9)=7.8ms   
     http_req_connecting............: avg=41.48µs  min=0s       med=0s      max=8.71ms   p(90)=0s       p(95)=0s       p(99.9)=7.78ms  
     http_req_duration..............: avg=565.69ms min=9.41ms   med=568ms   max=964.35ms p(90)=646.37ms p(95)=672.39ms p(99.9)=896.04ms
       { expected_response:true }...: avg=565.69ms min=9.41ms   med=568ms   max=964.35ms p(90)=646.37ms p(95)=672.39ms p(99.9)=896.04ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5321
     http_req_receiving.............: avg=71.37µs  min=30.82µs  med=58.12µs max=16.49ms  p(90)=102.3µs  p(95)=117.42µs p(99.9)=581.93µs
     http_req_sending...............: avg=114.68µs min=6.24µs   med=12.38µs max=164.48ms p(90)=20.56µs  p(95)=27.24µs  p(99.9)=4.48ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=565.5ms  min=9.36ms   med=567.9ms max=963.48ms p(90)=646.19ms p(95)=672.25ms p(99.9)=895.22ms
     http_reqs......................: 5321    86.563444/s
     iteration_duration.............: avg=576.88ms min=316.01ms med=569.2ms max=980.9ms  p(90)=647.5ms  p(95)=673.32ms p(99.9)=909.24ms
     iterations.....................: 5221    84.936618/s
     success_rate...................: 100.00% ✓ 5221      ✗ 0   
     vus............................: 50      min=0       max=50
     vus_max........................: 50      min=50      max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/886bff0e-e461-4108-edd8-81b56e46fb00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/671cea4c-6795-4612-e189-c4f7970cbb00/public" alt="HTTP Overview" />


  </details>