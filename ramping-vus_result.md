## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/11c431d7-a48d-444c-9ad7-3c39d8833700/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |         Duration         | Notes                                                                  |
| :-------------------------- | :----: | :--------------------: | :----------------------: | :--------------------------------------------------------------------- |
| hive-router                 |  1883  | 117040 total, 0 failed |  avg: 119ms, p95: 301ms  | ✅                                                                     |
| grafbase                    |  1616  | 102529 total, 0 failed |  avg: 136ms, p95: 324ms  | ✅                                                                     |
| cosmo                       |  674   | 43474 total, 0 failed  |  avg: 323ms, p95: 756ms  | ✅                                                                     |
| hive-gateway-router-runtime |  310   | 20656 total, 0 failed  | avg: 683ms, p95: 1510ms  | ✅                                                                     |
| hive-gateway                |  272   | 18696 total, 0 failed  | avg: 750ms, p95: 1661ms  | ✅                                                                     |
| apollo-router               |  259   | 17239 total, 0 failed  | avg: 816ms, p95: 1947ms  | ❌ 93 unexpected GraphQL errors, non-compatible response structure (4) |
| apollo-gateway              |  160   | 10981 total, 0 failed  | avg: 1194ms, p95: 2534ms | ✅                                                                     |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 348120      ✗ 0     
     data_received..................: 10 GB   165 MB/s
     data_sent......................: 136 MB  2.2 MB/s
     http_req_blocked...............: avg=300.18µs min=942ns   med=2.4µs    max=291.19ms p(90)=3.89µs   p(95)=4.63µs   p(99.9)=121.16ms
     http_req_connecting............: avg=296.23µs min=0s      med=0s       max=291.11ms p(90)=0s       p(95)=0s       p(99.9)=121.08ms
     http_req_duration..............: avg=119.17ms min=1.68ms  med=103.96ms max=459.89ms p(90)=249.11ms p(95)=301.35ms p(99.9)=422.75ms
       { expected_response:true }...: avg=119.17ms min=1.68ms  med=103.96ms max=459.89ms p(90)=249.11ms p(95)=301.35ms p(99.9)=422.75ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 117040
     http_req_receiving.............: avg=410.4µs  min=22.56µs med=41.53µs  max=133.56ms p(90)=127.67µs p(95)=383.94µs p(99.9)=69.88ms 
     http_req_sending...............: avg=315.81µs min=4.06µs  med=8.94µs   max=193.19ms p(90)=22.48µs  p(95)=126.06µs p(99.9)=57.26ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=118.44ms min=1.64ms  med=103.36ms max=455.21ms p(90)=247.46ms p(95)=299.73ms p(99.9)=421.73ms
     http_reqs......................: 117040  1883.903318/s
     iteration_duration.............: avg=120.77ms min=1.89ms  med=105.22ms max=740.35ms p(90)=251.26ms p(95)=303.08ms p(99.9)=428.27ms
     iterations.....................: 116040  1867.807083/s
     success_rate...................: 100.00% ✓ 116040      ✗ 0     
     vus............................: 67      min=0         max=496 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b770e0d7-19a4-446c-1410-fab1261f3100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b2f638ce-f4fe-4bfa-cb24-ffd7a4d34400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 304587      ✗ 0     
     data_received..................: 9.0 GB  142 MB/s
     data_sent......................: 119 MB  1.9 MB/s
     http_req_blocked...............: avg=493.82µs min=981ns  med=2.78µs   max=402.46ms p(90)=4.44µs   p(95)=5.46µs   p(99.9)=170.65ms
     http_req_connecting............: avg=488.51µs min=0s     med=0s       max=402.41ms p(90)=0s       p(95)=0s       p(99.9)=169.64ms
     http_req_duration..............: avg=135.87ms min=2.57ms med=122.48ms max=488.1ms  p(90)=275.04ms p(95)=324.39ms p(99.9)=430.04ms
       { expected_response:true }...: avg=135.87ms min=2.57ms med=122.48ms max=488.1ms  p(90)=275.04ms p(95)=324.39ms p(99.9)=430.04ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 102529
     http_req_receiving.............: avg=560.66µs min=23µs   med=47.33µs  max=138.47ms p(90)=158.44µs p(95)=439.64µs p(99.9)=79.98ms 
     http_req_sending...............: avg=472.68µs min=4.39µs med=10.33µs  max=153.77ms p(90)=26.03µs  p(95)=140.51µs p(99.9)=71.51ms 
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=134.83ms min=2.52ms med=121.44ms max=465.04ms p(90)=272.6ms  p(95)=322.05ms p(99.9)=427.07ms
     http_reqs......................: 102529  1616.042822/s
     iteration_duration.............: avg=138.04ms min=2.85ms med=124.36ms max=803.27ms p(90)=278.1ms  p(95)=327.03ms p(99.9)=459.85ms
     iterations.....................: 101529  1600.28101/s
     success_rate...................: 100.00% ✓ 101529      ✗ 0     
     vus............................: 82      min=0         max=497 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c5c9b2d8-e1f4-4a47-19a9-7224b81b6b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/21e76b4b-efd6-4c92-4edc-355acd248700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 127422     ✗ 0    
     data_received..................: 3.8 GB  59 MB/s
     data_sent......................: 51 MB   785 kB/s
     http_req_blocked...............: avg=131.82µs min=1.36µs med=2.95µs   max=217.43ms p(90)=4.39µs   p(95)=6.26µs   p(99.9)=34.49ms
     http_req_connecting............: avg=126.55µs min=0s     med=0s       max=217.39ms p(90)=0s       p(95)=0s       p(99.9)=34.14ms
     http_req_duration..............: avg=323.08ms min=2.83ms med=292.77ms max=1.37s    p(90)=658.26ms p(95)=756.47ms p(99.9)=1.16s  
       { expected_response:true }...: avg=323.08ms min=2.83ms med=292.77ms max=1.37s    p(90)=658.26ms p(95)=756.47ms p(99.9)=1.16s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 43474
     http_req_receiving.............: avg=492.36µs min=28.4µs med=60.41µs  max=338.17ms p(90)=179.96µs p(95)=477.87µs p(99.9)=71.93ms
     http_req_sending...............: avg=183.67µs min=5.69µs med=11.22µs  max=134.49ms p(90)=31.5µs   p(95)=131.51µs p(99.9)=32.14ms
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=322.4ms  min=2.75ms med=292.19ms max=1.37s    p(90)=656.68ms p(95)=755.46ms p(99.9)=1.16s  
     http_reqs......................: 43474   674.166983/s
     iteration_duration.............: avg=331.25ms min=3ms    med=301.89ms max=1.44s    p(90)=662.72ms p(95)=760.56ms p(99.9)=1.16s  
     iterations.....................: 42474   658.659623/s
     success_rate...................: 100.00% ✓ 42474      ✗ 0    
     vus............................: 88      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b22a31f5-b2bc-4c98-255f-d2a9e456a600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fa8744e5-26f0-40c5-58a5-1e0b3a9b0e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 58968      ✗ 0    
     data_received..................: 1.8 GB  27 MB/s
     data_sent......................: 24 MB   363 kB/s
     http_req_blocked...............: avg=111µs    min=1.4µs   med=3.76µs   max=85.36ms p(90)=6.14µs  p(95)=10.52µs  p(99.9)=28.07ms
     http_req_connecting............: avg=103.51µs min=0s      med=0s       max=85.26ms p(90)=0s      p(95)=0s       p(99.9)=27.81ms
     http_req_duration..............: avg=682.54ms min=4.84ms  med=649.37ms max=2.53s   p(90)=1.37s   p(95)=1.5s     p(99.9)=2.2s   
       { expected_response:true }...: avg=682.54ms min=4.84ms  med=649.37ms max=2.53s   p(90)=1.37s   p(95)=1.5s     p(99.9)=2.2s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 20656
     http_req_receiving.............: avg=150.57µs min=30.58µs med=66.92µs  max=36.03ms p(90)=125.6µs p(95)=278.43µs p(99.9)=14.66ms
     http_req_sending...............: avg=118.82µs min=5.53µs  med=13.72µs  max=49.8ms  p(90)=29.57µs p(95)=109.75µs p(99.9)=20.36ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=682.28ms min=4.77ms  med=649.25ms max=2.53s   p(90)=1.37s   p(95)=1.5s     p(99.9)=2.2s   
     http_reqs......................: 20656   310.859896/s
     iteration_duration.............: avg=717.94ms min=5.84ms  med=686ms    max=2.59s   p(90)=1.38s   p(95)=1.51s    p(99.9)=2.23s  
     iterations.....................: 19656   295.810521/s
     success_rate...................: 100.00% ✓ 19656      ✗ 0    
     vus............................: 89      min=0        max=499
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4fb0b684-0669-484d-a106-97fee27ce700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/872d9e7d-cf3a-4e9b-f674-a9c18b31d900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 53088      ✗ 0    
     data_received..................: 1.6 GB  24 MB/s
     data_sent......................: 22 MB   319 kB/s
     http_req_blocked...............: avg=102.38µs min=1.29µs  med=2.79µs   max=110.49ms p(90)=4.56µs  p(95)=7.41µs   p(99.9)=24.05ms
     http_req_connecting............: avg=96.67µs  min=0s      med=0s       max=110.34ms p(90)=0s      p(95)=0s       p(99.9)=23.99ms
     http_req_duration..............: avg=750.37ms min=6.4ms   med=676.09ms max=4.91s    p(90)=1.46s   p(95)=1.66s    p(99.9)=4.28s  
       { expected_response:true }...: avg=750.37ms min=6.4ms   med=676.09ms max=4.91s    p(90)=1.46s   p(95)=1.66s    p(99.9)=4.28s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 18696
     http_req_receiving.............: avg=144.31µs min=26.85µs med=44.06µs  max=50.98ms  p(90)=86.28µs p(95)=138.81µs p(99.9)=20.23ms
     http_req_sending...............: avg=150.23µs min=5.79µs  med=10.88µs  max=53.19ms  p(90)=28.55µs p(95)=70.73µs  p(99.9)=22.62ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=750.08ms min=6.36ms  med=675.85ms max=4.91s    p(90)=1.46s   p(95)=1.66s    p(99.9)=4.28s  
     http_reqs......................: 18696   272.252199/s
     iteration_duration.............: avg=793.11ms min=7.57ms  med=749.75ms max=4.92s    p(90)=1.47s   p(95)=1.67s    p(99.9)=4.33s  
     iterations.....................: 17696   257.690143/s
     success_rate...................: 100.00% ✓ 17696      ✗ 0    
     vus............................: 101     min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/38f50cc0-34d0-489d-7a95-4fb7fa633600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6b525bb7-610f-4800-a97c-cc393f1eee00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 16146 / ✗ 93
     ✗ valid response structure
      ↳  99% — ✓ 16235 / ✗ 4

     checks.........................: 99.80% ✓ 48620      ✗ 97   
     data_received..................: 1.5 GB 23 MB/s
     data_sent......................: 20 MB  304 kB/s
     http_req_blocked...............: avg=101.91µs min=1.11µs  med=3.31µs   max=108.43ms p(90)=5.29µs   p(95)=9.66µs   p(99.9)=23.65ms
     http_req_connecting............: avg=95.22µs  min=0s      med=0s       max=108.26ms p(90)=0s       p(95)=0s       p(99.9)=23.58ms
     http_req_duration..............: avg=816.25ms min=5.52ms  med=753.53ms max=3.11s    p(90)=1.72s    p(95)=1.94s    p(99.9)=2.86s  
       { expected_response:true }...: avg=816.25ms min=5.52ms  med=753.53ms max=3.11s    p(90)=1.72s    p(95)=1.94s    p(99.9)=2.86s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 17239
     http_req_receiving.............: avg=121.88µs min=26.51µs med=56.9µs   max=69.16ms  p(90)=110.03µs p(95)=167.23µs p(99.9)=7.31ms 
     http_req_sending...............: avg=92.1µs   min=4.99µs  med=12.05µs  max=52.47ms  p(90)=26.22µs  p(95)=100.03µs p(99.9)=17.09ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=816.03ms min=5.46ms  med=753.23ms max=3.11s    p(90)=1.72s    p(95)=1.94s    p(99.9)=2.86s  
     http_reqs......................: 17239  259.420666/s
     iteration_duration.............: avg=867.07ms min=5.88ms  med=808.65ms max=3.11s    p(90)=1.75s    p(95)=1.96s    p(99.9)=2.87s  
     iterations.....................: 16239  244.37219/s
     success_rate...................: 99.42% ✓ 16146      ✗ 93   
     vus............................: 85     min=0        max=498
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5894321b-2d3b-4c19-fab9-59edb74ae500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/495c724d-d13f-49c7-1304-0c1523418500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 29943      ✗ 0    
     data_received..................: 965 MB  14 MB/s
     data_sent......................: 13 MB   191 kB/s
     http_req_blocked...............: avg=29.44µs min=1.11µs  med=3.58µs  max=24.25ms p(90)=5.68µs   p(95)=11.63µs  p(99.9)=3.86ms
     http_req_connecting............: avg=23.54µs min=0s      med=0s      max=24.2ms  p(90)=0s       p(95)=0s       p(99.9)=3.81ms
     http_req_duration..............: avg=1.19s   min=7.12ms  med=1.12s   max=15.16s  p(90)=2.15s    p(95)=2.53s    p(99.9)=13.9s 
       { expected_response:true }...: avg=1.19s   min=7.12ms  med=1.12s   max=15.16s  p(90)=2.15s    p(95)=2.53s    p(99.9)=13.9s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 10981
     http_req_receiving.............: avg=81.42µs min=27.14µs med=61.05µs max=10.44ms p(90)=102.87µs p(95)=126.77µs p(99.9)=1.39ms
     http_req_sending...............: avg=38.57µs min=4.85µs  med=13.28µs max=19.16ms p(90)=26.23µs  p(95)=44.46µs  p(99.9)=5.81ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=1.19s   min=7.06ms  med=1.12s   max=15.16s  p(90)=2.15s    p(95)=2.53s    p(99.9)=13.9s 
     http_reqs......................: 10981   160.611275/s
     iteration_duration.............: avg=1.31s   min=8.32ms  med=1.26s   max=15.17s  p(90)=2.2s     p(95)=2.62s    p(99.9)=13.93s
     iterations.....................: 9981    145.984986/s
     success_rate...................: 100.00% ✓ 9981       ✗ 0    
     vus............................: 86      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/035afd5c-8075-4d34-310d-f04806449d00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4814d1eb-1fe5-4965-8c9c-4381338cc600/public" alt="HTTP Overview" />


  </details>