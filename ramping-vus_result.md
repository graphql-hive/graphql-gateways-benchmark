## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/937f53bb-12bf-4542-50b6-757a0d650700/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |         Duration         | Notes                                    |
| :-------------------------- | :----: | :--------------------: | :----------------------: | :--------------------------------------- |
| hive-router                 |  1754  | 109332 total, 0 failed |  avg: 127ms, p95: 302ms  | ✅                                       |
| grafbase                    |  1505  | 95497 total, 0 failed  |  avg: 146ms, p95: 336ms  | ✅                                       |
| cosmo                       |  694   | 44340 total, 0 failed  |  avg: 317ms, p95: 692ms  | ✅                                       |
| hive-gateway-router-runtime |  602   | 39583 total, 0 failed  |  avg: 355ms, p95: 757ms  | ❌ non-compatible response structure (2) |
| apollo-router               |  379   | 25574 total, 0 failed  | avg: 551ms, p95: 1260ms  | ❌ 25 unexpected GraphQL errors          |
| hive-gateway                |  258   | 17906 total, 0 failed  | avg: 783ms, p95: 1733ms  | ✅                                       |
| apollo-gateway              |  156   | 10722 total, 0 failed  | avg: 1221ms, p95: 2625ms | ✅                                       |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 324996      ✗ 0     
     data_received..................: 9.6 GB  154 MB/s
     data_sent......................: 127 MB  2.0 MB/s
     http_req_blocked...............: avg=509.61µs min=1.22µs  med=2.58µs   max=352.11ms p(90)=3.96µs   p(95)=4.74µs   p(99.9)=176.56ms
     http_req_connecting............: avg=506.28µs min=0s      med=0s       max=352.03ms p(90)=0s       p(95)=0s       p(99.9)=176.48ms
     http_req_duration..............: avg=127.29ms min=1.9ms   med=115.48ms max=435.97ms p(90)=257.95ms p(95)=302.31ms p(99.9)=394.75ms
       { expected_response:true }...: avg=127.29ms min=1.9ms   med=115.48ms max=435.97ms p(90)=257.95ms p(95)=302.31ms p(99.9)=394.75ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 109332
     http_req_receiving.............: avg=554.9µs  min=21.35µs med=43.23µs  max=129.69ms p(90)=125.52µs p(95)=398.61µs p(99.9)=75.15ms 
     http_req_sending...............: avg=467.7µs  min=5.42µs  med=10.46µs  max=224.77ms p(90)=28.73µs  p(95)=128.93µs p(99.9)=68.75ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=126.26ms min=1.86ms  med=114.35ms max=407.61ms p(90)=255.65ms p(95)=299.81ms p(99.9)=391.49ms
     http_reqs......................: 109332  1754.004397/s
     iteration_duration.............: avg=129.33ms min=2.3ms   med=117.29ms max=788.95ms p(90)=260.35ms p(95)=305.15ms p(99.9)=432.98ms
     iterations.....................: 108332  1737.961478/s
     success_rate...................: 100.00% ✓ 108332      ✗ 0     
     vus............................: 76      min=0         max=493 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4cd1f50f-d21b-462f-bde5-8690e8b9ec00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3adcf2d2-5359-459a-b19b-e6d2ae444d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 283491      ✗ 0    
     data_received..................: 8.4 GB  132 MB/s
     data_sent......................: 111 MB  1.8 MB/s
     http_req_blocked...............: avg=708.01µs min=1.15µs  med=2.85µs   max=517.17ms p(90)=4.28µs   p(95)=5.38µs   p(99.9)=224.66ms
     http_req_connecting............: avg=702.46µs min=0s      med=0s       max=517.12ms p(90)=0s       p(95)=0s       p(99.9)=224.56ms
     http_req_duration..............: avg=145.67ms min=2.56ms  med=133.63ms max=474.46ms p(90)=290.67ms p(95)=336.17ms p(99.9)=421.45ms
       { expected_response:true }...: avg=145.67ms min=2.56ms  med=133.63ms max=474.46ms p(90)=290.67ms p(95)=336.17ms p(99.9)=421.45ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 95497
     http_req_receiving.............: avg=650.31µs min=24.63µs med=47.47µs  max=176.69ms p(90)=115.95µs p(95)=436.57µs p(99.9)=87.83ms 
     http_req_sending...............: avg=622.78µs min=5.13µs  med=11.56µs  max=180.66ms p(90)=32.16µs  p(95)=141.76µs p(99.9)=87.44ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=144.4ms  min=2.51ms  med=132.24ms max=433.19ms p(90)=287.59ms p(95)=333.49ms p(99.9)=415.87ms
     http_reqs......................: 95497   1505.291623/s
     iteration_duration.............: avg=148.32ms min=2.79ms  med=135.73ms max=933.64ms p(90)=294.04ms p(95)=339.67ms p(99.9)=517.31ms
     iterations.....................: 94497   1489.528912/s
     success_rate...................: 100.00% ✓ 94497       ✗ 0    
     vus............................: 83      min=0         max=496
     vus_max........................: 500     min=500       max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cf24fb24-82a2-4d8e-bb89-44ee32de3200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1eb773ec-c68d-4516-8ae0-bd25b2be4500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 130020     ✗ 0    
     data_received..................: 3.9 GB  61 MB/s
     data_sent......................: 52 MB   809 kB/s
     http_req_blocked...............: avg=125.32µs min=1.3µs   med=2.86µs   max=140.7ms  p(90)=4.27µs   p(95)=5.92µs   p(99.9)=41.23ms
     http_req_connecting............: avg=121.02µs min=0s      med=0s       max=140.66ms p(90)=0s       p(95)=0s       p(99.9)=41.18ms
     http_req_duration..............: avg=316.67ms min=2.93ms  med=299.56ms max=1.25s    p(90)=618.13ms p(95)=691.56ms p(99.9)=1.04s  
       { expected_response:true }...: avg=316.67ms min=2.93ms  med=299.56ms max=1.25s    p(90)=618.13ms p(95)=691.56ms p(99.9)=1.04s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 44340
     http_req_receiving.............: avg=967.27µs min=27.42µs med=60.24µs  max=256.42ms p(90)=204.75µs p(95)=491.39µs p(99.9)=144.2ms
     http_req_sending...............: avg=187.2µs  min=5.72µs  med=11.23µs  max=122.24ms p(90)=32.02µs  p(95)=133.08µs p(99.9)=41.52ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=315.52ms min=2.82ms  med=298.37ms max=1.25s    p(90)=615.81ms p(95)=688.5ms  p(99.9)=1.04s  
     http_reqs......................: 44340   694.393694/s
     iteration_duration.............: avg=324.52ms min=3.07ms  med=307.77ms max=1.25s    p(90)=620.91ms p(95)=695.14ms p(99.9)=1.04s  
     iterations.....................: 43340   678.733034/s
     success_rate...................: 100.00% ✓ 43340      ✗ 0    
     vus............................: 56      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4942638d-2ca7-472b-6492-387f8e41e300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1caa6d75-d76e-4c33-5f79-845fbf857b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✗ valid response structure
      ↳  99% — ✓ 38581 / ✗ 2

     checks.........................: 99.99% ✓ 115747     ✗ 2    
     data_received..................: 3.5 GB 53 MB/s
     data_sent......................: 46 MB  701 kB/s
     http_req_blocked...............: avg=163.67µs min=1.26µs  med=2.83µs   max=129.75ms p(90)=4.47µs   p(95)=6.21µs   p(99.9)=53.26ms 
     http_req_connecting............: avg=158.23µs min=0s      med=0s       max=129.7ms  p(90)=0s       p(95)=0s       p(99.9)=53.11ms 
     http_req_duration..............: avg=354.87ms min=4.63ms  med=352.11ms max=1.16s    p(90)=661.18ms p(95)=756.56ms p(99.9)=974.02ms
       { expected_response:true }...: avg=354.87ms min=4.63ms  med=352.11ms max=1.16s    p(90)=661.18ms p(95)=756.56ms p(99.9)=974.02ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 39583
     http_req_receiving.............: avg=227.29µs min=26.78µs med=45.29µs  max=110.16ms p(90)=98.04µs  p(95)=388.12µs p(99.9)=37.1ms  
     http_req_sending...............: avg=278.54µs min=5.45µs  med=11.06µs  max=123.18ms p(90)=31.45µs  p(95)=135.07µs p(99.9)=46.49ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=354.37ms min=4.59ms  med=351.43ms max=1.14s    p(90)=660.4ms  p(95)=755.2ms  p(99.9)=973.89ms
     http_reqs......................: 39583  602.037873/s
     iteration_duration.............: avg=364.69ms min=5.39ms  med=363.51ms max=1.2s     p(90)=665.73ms p(95)=760.5ms  p(99.9)=986.89ms
     iterations.....................: 38583  586.828367/s
     success_rate...................: 99.99% ✓ 38581      ✗ 2    
     vus............................: 98     min=0        max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0f43bb23-27a0-49b2-2f58-415901019a00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2d46084d-9198-41c5-b7d0-46391f67dc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 24549 / ✗ 25
     ✓ valid response structure

     checks.........................: 99.96% ✓ 73697      ✗ 25   
     data_received..................: 2.2 GB 33 MB/s
     data_sent......................: 30 MB  443 kB/s
     http_req_blocked...............: avg=98.53µs  min=1.44µs  med=3.12µs   max=207.6ms  p(90)=5.02µs   p(95)=7.42µs   p(99.9)=25.11ms
     http_req_connecting............: avg=91.86µs  min=0s      med=0s       max=207.53ms p(90)=0s       p(95)=0s       p(99.9)=25.03ms
     http_req_duration..............: avg=551.2ms  min=6.25ms  med=509.19ms max=1.92s    p(90)=1.09s    p(95)=1.26s    p(99.9)=1.74s  
       { expected_response:true }...: avg=551.2ms  min=6.25ms  med=509.19ms max=1.92s    p(90)=1.09s    p(95)=1.26s    p(99.9)=1.74s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 25574
     http_req_receiving.............: avg=130.81µs min=31.46µs med=55.85µs  max=80.68ms  p(90)=110.92µs p(95)=235.12µs p(99.9)=10.24ms
     http_req_sending...............: avg=126.18µs min=6.83µs  med=11.99µs  max=119.48ms p(90)=32µs     p(95)=126.76µs p(99.9)=23.32ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=550.94ms min=6.19ms  med=509ms    max=1.92s    p(90)=1.09s    p(95)=1.25s    p(99.9)=1.74s  
     http_reqs......................: 25574  379.835475/s
     iteration_duration.............: avg=574.14ms min=6.78ms  med=534.38ms max=1.92s    p(90)=1.1s     p(95)=1.26s    p(99.9)=1.75s  
     iterations.....................: 24574  364.983067/s
     success_rate...................: 99.89% ✓ 24549      ✗ 25   
     vus............................: 81     min=0        max=495
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/48a1c8eb-4ce9-4333-8458-8db0af076200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bd5a12a2-8a94-4ff3-5381-c8ef530e4300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 50718      ✗ 0    
     data_received..................: 1.6 GB  23 MB/s
     data_sent......................: 21 MB   303 kB/s
     http_req_blocked...............: avg=124.54µs min=1.22µs  med=2.86µs   max=154.07ms p(90)=5.28µs   p(95)=8.19µs   p(99.9)=27.11ms
     http_req_connecting............: avg=118.84µs min=0s      med=0s       max=154.02ms p(90)=0s       p(95)=0s       p(99.9)=27.06ms
     http_req_duration..............: avg=783.08ms min=6.54ms  med=726.19ms max=5s       p(90)=1.52s    p(95)=1.73s    p(99.9)=3.99s  
       { expected_response:true }...: avg=783.08ms min=6.54ms  med=726.19ms max=5s       p(90)=1.52s    p(95)=1.73s    p(99.9)=3.99s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 17906
     http_req_receiving.............: avg=171.18µs min=26.42µs med=47.64µs  max=93.71ms  p(90)=102.89µs p(95)=175.54µs p(99.9)=24.36ms
     http_req_sending...............: avg=242.06µs min=5.59µs  med=11.46µs  max=124.95ms p(90)=33.47µs  p(95)=124.46µs p(99.9)=40.37ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=782.67ms min=6.48ms  med=725.24ms max=5s       p(90)=1.52s    p(95)=1.73s    p(99.9)=3.99s  
     http_reqs......................: 17906   258.870945/s
     iteration_duration.............: avg=829.84ms min=8.27ms  med=791.11ms max=5.04s    p(90)=1.54s    p(95)=1.73s    p(99.9)=4.07s  
     iterations.....................: 16906   244.413727/s
     success_rate...................: 100.00% ✓ 16906      ✗ 0    
     vus............................: 74      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f9ec9c07-f2e7-4b79-39cb-919f53b30d00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b92cc7ef-1731-4566-2ae4-317d8d5cc000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 29166      ✗ 0    
     data_received..................: 942 MB  14 MB/s
     data_sent......................: 13 MB   187 kB/s
     http_req_blocked...............: avg=42.79µs min=1.33µs  med=3.06µs  max=28.17ms p(90)=5.13µs  p(95)=19.78µs  p(99.9)=5.26ms
     http_req_connecting............: avg=35.28µs min=0s      med=0s      max=28.11ms p(90)=0s      p(95)=0s       p(99.9)=5.2ms 
     http_req_duration..............: avg=1.22s   min=7.21ms  med=1.17s   max=15.37s  p(90)=2.25s   p(95)=2.62s    p(99.9)=13.99s
       { expected_response:true }...: avg=1.22s   min=7.21ms  med=1.17s   max=15.37s  p(90)=2.25s   p(95)=2.62s    p(99.9)=13.99s
     http_req_failed................: 0.00%   ✓ 0          ✗ 10722
     http_req_receiving.............: avg=75.82µs min=27.81µs med=51.75µs max=13.7ms  p(90)=99.61µs p(95)=126.82µs p(99.9)=1.51ms
     http_req_sending...............: avg=44.53µs min=5.96µs  med=12.21µs max=20.72ms p(90)=30.06µs p(95)=48.62µs  p(99.9)=7ms   
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=1.22s   min=7.17ms  med=1.17s   max=15.37s  p(90)=2.25s   p(95)=2.62s    p(99.9)=13.99s
     http_reqs......................: 10722   156.835899/s
     iteration_duration.............: avg=1.34s   min=8.43ms  med=1.29s   max=15.38s  p(90)=2.29s   p(95)=2.69s    p(99.9)=14.11s
     iterations.....................: 9722    142.208413/s
     success_rate...................: 100.00% ✓ 9722       ✗ 0    
     vus............................: 93      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ff12e090-fc31-4385-7bd7-f862104dc400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dcc08b2d-e684-49d7-6864-67b22dd8f500/public" alt="HTTP Overview" />


  </details>