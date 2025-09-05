## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/33842847-597f-4090-222f-f2acee967e00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration         | Notes                          |
| :--------------- | :----: | :--------------------: | :----------------------: | :----------------------------- |
| hive-router      |  1867  | 116333 total, 0 failed |  avg: 120ms, p95: 291ms  | ✅                              |
| cosmo            |  673   | 42981 total, 0 failed  |  avg: 327ms, p95: 745ms  | ✅                              |
| grafbase         |  512   | 32550 total, 0 failed  |  avg: 432ms, p95: 956ms  | ✅                              |
| apollo-router    |  373   | 25068 total, 0 failed  | avg: 563ms, p95: 1291ms  | ❌ 20 unexpected GraphQL errors |
| hive-gateway-bun |  261   | 18252 total, 0 failed  | avg: 768ms, p95: 1634ms  | ✅                              |
| hive-gateway     |  259   | 18185 total, 0 failed  | avg: 772ms, p95: 1706ms  | ✅                              |
| apollo-gateway   |  152   | 10454 total, 0 failed  | avg: 1239ms, p95: 2640ms | ✅                              |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 345999     ✗ 0     
     data_received..................: 10 GB   164 MB/s
     data_sent......................: 135 MB  2.2 MB/s
     http_req_blocked...............: avg=400.74µs min=1.15µs  med=2.63µs   max=451.16ms p(90)=4.21µs   p(95)=5.33µs   p(99.9)=146.62ms
     http_req_connecting............: avg=396.15µs min=0s      med=0s       max=451.11ms p(90)=0s       p(95)=0s       p(99.9)=146.45ms
     http_req_duration..............: avg=119.77ms min=1.9ms   med=107.82ms max=430.83ms p(90)=246.55ms p(95)=291.38ms p(99.9)=376.13ms
       { expected_response:true }...: avg=119.77ms min=1.9ms   med=107.82ms max=430.83ms p(90)=246.55ms p(95)=291.38ms p(99.9)=376.13ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 116333
     http_req_receiving.............: avg=486.19µs min=24.42µs med=43.46µs  max=147.3ms  p(90)=199.95µs p(95)=412.29µs p(99.9)=73.49ms 
     http_req_sending...............: avg=373.39µs min=5.24µs  med=10.41µs  max=130.67ms p(90)=31.46µs  p(95)=133.81µs p(99.9)=69.08ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=118.91ms min=1.85ms  med=107.04ms max=405.42ms p(90)=244.44ms p(95)=289.66ms p(99.9)=373.16ms
     http_reqs......................: 116333  1867.40058/s
     iteration_duration.............: avg=121.47ms min=2.1ms   med=109.23ms max=822.78ms p(90)=248.68ms p(95)=293.59ms p(99.9)=400.77ms
     iterations.....................: 115333  1851.34838/s
     success_rate...................: 100.00% ✓ 115333     ✗ 0     
     vus............................: 74      min=0        max=494 
     vus_max........................: 500     min=500      max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4012e514-ce7e-4dd5-d168-8095a46ef000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5a0c5498-4edc-4e00-8b92-92e4ee652100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 125943     ✗ 0    
     data_received..................: 3.8 GB  59 MB/s
     data_sent......................: 50 MB   784 kB/s
     http_req_blocked...............: avg=117.98µs min=1.27µs  med=2.96µs   max=155.33ms p(90)=4.49µs   p(95)=6.36µs   p(99.9)=31.93ms
     http_req_connecting............: avg=112.72µs min=0s      med=0s       max=154.72ms p(90)=0s       p(95)=0s       p(99.9)=31.87ms
     http_req_duration..............: avg=326.79ms min=2.86ms  med=301.56ms max=1.45s    p(90)=657.18ms p(95)=745.27ms p(99.9)=1.06s  
       { expected_response:true }...: avg=326.79ms min=2.86ms  med=301.56ms max=1.45s    p(90)=657.18ms p(95)=745.27ms p(99.9)=1.06s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 42981
     http_req_receiving.............: avg=712.26µs min=27.43µs med=66.06µs  max=257.09ms p(90)=261.65µs p(95)=539.72µs p(99.9)=85.06ms
     http_req_sending...............: avg=160.03µs min=5.23µs  med=11.6µs   max=113.49ms p(90)=32.3µs   p(95)=136.08µs p(99.9)=31.14ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=325.92ms min=2.79ms  med=300.23ms max=1.38s    p(90)=655.85ms p(95)=744.05ms p(99.9)=1.06s  
     http_reqs......................: 42981   673.65676/s
     iteration_duration.............: avg=335.08ms min=3.12ms  med=310.19ms max=1.45s    p(90)=660.87ms p(95)=747.8ms  p(99.9)=1.06s  
     iterations.....................: 41981   657.983398/s
     success_rate...................: 100.00% ✓ 41981      ✗ 0    
     vus............................: 96      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/17b2d6f5-6e41-42bb-776d-eeb94e6c7f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/311362f7-55a1-498e-1186-33d601f0d700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 94650      ✗ 0    
     data_received..................: 2.9 GB  45 MB/s
     data_sent......................: 38 MB   597 kB/s
     http_req_blocked...............: avg=373.57µs min=1.35µs med=3.23µs   max=284.26ms p(90)=4.79µs   p(95)=9.02µs   p(99.9)=105.46ms
     http_req_connecting............: avg=366.36µs min=0s     med=0s       max=284.17ms p(90)=0s       p(95)=0s       p(99.9)=105.3ms 
     http_req_duration..............: avg=431.63ms min=2.59ms med=413.57ms max=1.42s    p(90)=859.2ms  p(95)=956.12ms p(99.9)=1.27s   
       { expected_response:true }...: avg=431.63ms min=2.59ms med=413.57ms max=1.42s    p(90)=859.2ms  p(95)=956.12ms p(99.9)=1.27s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 32550
     http_req_receiving.............: avg=315.03µs min=27.6µs med=53.93µs  max=264.56ms p(90)=166.6µs  p(95)=476.9µs  p(99.9)=41.24ms 
     http_req_sending...............: avg=396.18µs min=6.38µs med=12.52µs  max=241.04ms p(90)=41.55µs  p(95)=142.16µs p(99.9)=79.21ms 
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=430.92ms min=2.55ms med=413.02ms max=1.42s    p(90)=858.17ms p(95)=955.22ms p(99.9)=1.27s   
     http_reqs......................: 32550   512.624352/s
     iteration_duration.............: avg=446.65ms min=3.25ms med=432.2ms  max=1.42s    p(90)=865.58ms p(95)=962.47ms p(99.9)=1.28s   
     iterations.....................: 31550   496.875524/s
     success_rate...................: 100.00% ✓ 31550      ✗ 0    
     vus............................: 82      min=0        max=499
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/464e4a5e-d6f3-4d6c-cf86-c935f82ea500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dd037714-1638-420c-7597-f55b981c5c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 24048 / ✗ 20
     ✓ valid response structure

     checks.........................: 99.97% ✓ 72184      ✗ 20   
     data_received..................: 2.2 GB 33 MB/s
     data_sent......................: 29 MB  435 kB/s
     http_req_blocked...............: avg=82.08µs  min=1.45µs  med=3.14µs   max=118.86ms p(90)=4.99µs  p(95)=7.88µs  p(99.9)=21.08ms
     http_req_connecting............: avg=75.76µs  min=0s      med=0s       max=118.81ms p(90)=0s      p(95)=0s      p(99.9)=21.03ms
     http_req_duration..............: avg=562.61ms min=6.17ms  med=518.18ms max=2.08s    p(90)=1.15s   p(95)=1.29s   p(99.9)=1.77s  
       { expected_response:true }...: avg=562.61ms min=6.17ms  med=518.18ms max=2.08s    p(90)=1.15s   p(95)=1.29s   p(99.9)=1.77s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 25068
     http_req_receiving.............: avg=107.35µs min=29.98µs med=55.9µs   max=94.73ms  p(90)=108.9µs p(95)=183.4µs p(99.9)=6.07ms 
     http_req_sending...............: avg=101.33µs min=6.7µs   med=11.94µs  max=90.34ms  p(90)=30.31µs p(95)=117.6µs p(99.9)=15.59ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s      p(99.9)=0s     
     http_req_waiting...............: avg=562.4ms  min=6.11ms  med=517.97ms max=2.08s    p(90)=1.15s   p(95)=1.29s   p(99.9)=1.77s  
     http_reqs......................: 25068  373.246907/s
     iteration_duration.............: avg=586.37ms min=6.45ms  med=544.33ms max=2.08s    p(90)=1.16s   p(95)=1.3s    p(99.9)=1.79s  
     iterations.....................: 24068  358.35753/s
     success_rate...................: 99.91% ✓ 24048      ✗ 20   
     vus............................: 73     min=0        max=496
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bb065fe4-c42c-4630-95b9-c7f2e7f59900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f1db4e20-4f67-4995-20e2-f80a8fec9700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 51756      ✗ 0    
     data_received..................: 1.6 GB  23 MB/s
     data_sent......................: 21 MB   307 kB/s
     http_req_blocked...............: avg=103.83µs min=1.32µs  med=2.89µs   max=108.64ms p(90)=5.1µs   p(95)=7.87µs   p(99.9)=28.23ms
     http_req_connecting............: avg=98.4µs   min=0s      med=0s       max=108.57ms p(90)=0s      p(95)=0s       p(99.9)=28.18ms
     http_req_duration..............: avg=767.93ms min=6.71ms  med=697.4ms  max=4.92s    p(90)=1.53s   p(95)=1.63s    p(99.9)=4.07s  
       { expected_response:true }...: avg=767.93ms min=6.71ms  med=697.4ms  max=4.92s    p(90)=1.53s   p(95)=1.63s    p(99.9)=4.07s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 18252
     http_req_receiving.............: avg=148.04µs min=26.05µs med=45.33µs  max=69.55ms  p(90)=96.31µs p(95)=157.86µs p(99.9)=21.35ms
     http_req_sending...............: avg=173.05µs min=5.94µs  med=11.13µs  max=80.11ms  p(90)=31.03µs p(95)=95.41µs  p(99.9)=29.84ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=767.61ms min=6.63ms  med=696.97ms max=4.92s    p(90)=1.53s   p(95)=1.63s    p(99.9)=4.07s  
     http_reqs......................: 18252   261.818829/s
     iteration_duration.............: avg=812.66ms min=8.75ms  med=735.55ms max=4.94s    p(90)=1.54s   p(95)=1.64s    p(99.9)=4.11s  
     iterations.....................: 17252   247.474164/s
     success_rate...................: 100.00% ✓ 17252      ✗ 0    
     vus............................: 98      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/96d1346a-7151-419f-caee-4b8666d37000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/86a6692c-b6c7-4251-35e5-8086c76ad700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 51555      ✗ 0    
     data_received..................: 1.6 GB  23 MB/s
     data_sent......................: 21 MB   304 kB/s
     http_req_blocked...............: avg=140.22µs min=1.25µs  med=2.79µs   max=191.91ms p(90)=5.15µs   p(95)=8.52µs   p(99.9)=30.33ms
     http_req_connecting............: avg=130.35µs min=0s      med=0s       max=191.77ms p(90)=0s       p(95)=0s       p(99.9)=29.99ms
     http_req_duration..............: avg=772.29ms min=7.01ms  med=714.02ms max=4.8s     p(90)=1.5s     p(95)=1.7s     p(99.9)=3.95s  
       { expected_response:true }...: avg=772.29ms min=7.01ms  med=714.02ms max=4.8s     p(90)=1.5s     p(95)=1.7s     p(99.9)=3.95s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 18185
     http_req_receiving.............: avg=209.21µs min=25.42µs med=47.1µs   max=128.21ms p(90)=110.17µs p(95)=329.22µs p(99.9)=31.61ms
     http_req_sending...............: avg=189.65µs min=5.78µs  med=11.25µs  max=126.91ms p(90)=34.83µs  p(95)=128.94µs p(99.9)=28.13ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=771.89ms min=6.96ms  med=713.73ms max=4.8s     p(90)=1.5s     p(95)=1.7s     p(99.9)=3.95s  
     http_reqs......................: 18185   259.266937/s
     iteration_duration.............: avg=817.5ms  min=8.3ms   med=761.76ms max=4.81s    p(90)=1.51s    p(95)=1.71s    p(99.9)=4.02s  
     iterations.....................: 17185   245.00975/s
     success_rate...................: 100.00% ✓ 17185      ✗ 0    
     vus............................: 77      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f256e777-dbaf-4eaf-4569-5a4f1edd2800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/44bf82b8-0fce-4788-2bed-14af5e7ac700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 28362      ✗ 0    
     data_received..................: 918 MB  13 MB/s
     data_sent......................: 13 MB   182 kB/s
     http_req_blocked...............: avg=37.64µs min=1.39µs  med=3.74µs  max=26.16ms p(90)=6.22µs  p(95)=20.6µs   p(99.9)=4.58ms
     http_req_connecting............: avg=30.46µs min=0s      med=0s      max=26.09ms p(90)=0s      p(95)=0s       p(99.9)=4.48ms
     http_req_duration..............: avg=1.23s   min=7.44ms  med=1.19s   max=16.58s  p(90)=2.25s   p(95)=2.63s    p(99.9)=14.62s
       { expected_response:true }...: avg=1.23s   min=7.44ms  med=1.19s   max=16.58s  p(90)=2.25s   p(95)=2.63s    p(99.9)=14.62s
     http_req_failed................: 0.00%   ✓ 0          ✗ 10454
     http_req_receiving.............: avg=89.58µs min=29.73µs med=64.11µs max=34.49ms p(90)=116µs   p(95)=148.37µs p(99.9)=2.12ms
     http_req_sending...............: avg=40.35µs min=6.04µs  med=14.41µs max=30.7ms  p(90)=34.45µs p(95)=55.51µs  p(99.9)=4.87ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=1.23s   min=7.35ms  med=1.19s   max=16.58s  p(90)=2.25s   p(95)=2.63s    p(99.9)=14.62s
     http_reqs......................: 10454   152.358745/s
     iteration_duration.............: avg=1.36s   min=8.18ms  med=1.33s   max=16.58s  p(90)=2.3s    p(95)=2.71s    p(99.9)=14.73s
     iterations.....................: 9454    137.78454/s
     success_rate...................: 100.00% ✓ 9454       ✗ 0    
     vus............................: 103     min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a5073fdd-eb4a-4663-3d80-9d7dc99ab600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2b504706-db46-48ff-7a2d-2efc2197c500/public" alt="HTTP Overview" />


  </details>