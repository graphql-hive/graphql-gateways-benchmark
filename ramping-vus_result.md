## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/770f1ab7-7a49-4738-42be-16e9a4220000/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |         Duration         | Notes                                                                       |
| :-------------------------- | :----: | :--------------------: | :----------------------: | :-------------------------------------------------------------------------- |
| hive-router                 |  1707  | 106882 total, 0 failed |  avg: 130ms, p95: 315ms  | ✅                                                                          |
| grafbase                    |  1493  | 94452 total, 0 failed  |  avg: 147ms, p95: 342ms  | ✅                                                                          |
| cosmo                       |  684   | 43651 total, 0 failed  |  avg: 322ms, p95: 748ms  | ✅                                                                          |
| hive-gateway-router-runtime |  571   | 37671 total, 0 failed  |  avg: 373ms, p95: 777ms  | ❌ 138 unexpected GraphQL errors                                            |
| apollo-router               |  384   | 25980 total, 0 failed  | avg: 543ms, p95: 1227ms  | ❌ 24980 unexpected GraphQL errors, non-compatible response structure (498) |
| hive-gateway                |  194   | 13381 total, 0 failed  | avg: 1015ms, p95: 2851ms | ❌ 2401 unexpected GraphQL errors, non-compatible response structure (83)   |
| apollo-gateway              |  155   | 10809 total, 0 failed  | avg: 1204ms, p95: 2538ms | ❌ 9809 unexpected GraphQL errors, non-compatible response structure (369)  |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 317646      ✗ 0     
     data_received..................: 9.3 GB  149 MB/s
     data_sent......................: 124 MB  2.0 MB/s
     http_req_blocked...............: avg=500.3µs  min=1.15µs  med=2.47µs   max=431.44ms p(90)=4.1µs    p(95)=5.13µs   p(99.9)=172.77ms
     http_req_connecting............: avg=496.24µs min=0s      med=0s       max=431.37ms p(90)=0s       p(95)=0s       p(99.9)=172.69ms
     http_req_duration..............: avg=130.3ms  min=1.97ms  med=118.82ms max=463.56ms p(90)=265.54ms p(95)=315.1ms  p(99.9)=412.91ms
       { expected_response:true }...: avg=130.3ms  min=1.97ms  med=118.82ms max=463.56ms p(90)=265.54ms p(95)=315.1ms  p(99.9)=412.91ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 106882
     http_req_receiving.............: avg=536.68µs min=24.75µs med=42.77µs  max=141.28ms p(90)=127.87µs p(95)=408.83µs p(99.9)=76.71ms 
     http_req_sending...............: avg=476.98µs min=5.21µs  med=10.3µs   max=185.16ms p(90)=30µs     p(95)=133.61µs p(99.9)=75ms    
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=129.28ms min=1.91ms  med=117.93ms max=454.78ms p(90)=263.27ms p(95)=312.94ms p(99.9)=406.45ms
     http_reqs......................: 106882  1707.849115/s
     iteration_duration.............: avg=132.35ms min=2.15ms  med=120.6ms  max=794.2ms  p(90)=268.18ms p(95)=317.74ms p(99.9)=451.96ms
     iterations.....................: 105882  1691.870287/s
     success_rate...................: 100.00% ✓ 105882      ✗ 0     
     vus............................: 87      min=0         max=500 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8bd0fd10-e91f-4a15-c589-c2fcebc24f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6f6f6250-c22c-4703-1c83-fb7759613f00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 280356      ✗ 0    
     data_received..................: 8.3 GB  131 MB/s
     data_sent......................: 110 MB  1.7 MB/s
     http_req_blocked...............: avg=741.46µs min=1.26µs  med=3.01µs   max=437.52ms p(90)=4.45µs   p(95)=5.48µs   p(99.9)=230.87ms
     http_req_connecting............: avg=735.22µs min=0s      med=0s       max=437.48ms p(90)=0s       p(95)=0s       p(99.9)=230.46ms
     http_req_duration..............: avg=147.27ms min=2.54ms  med=137.4ms  max=474.46ms p(90)=293.95ms p(95)=341.92ms p(99.9)=423.78ms
       { expected_response:true }...: avg=147.27ms min=2.54ms  med=137.4ms  max=474.46ms p(90)=293.95ms p(95)=341.92ms p(99.9)=423.78ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 94452
     http_req_receiving.............: avg=651.98µs min=24.98µs med=49.09µs  max=150.84ms p(90)=129.42µs p(95)=447.48µs p(99.9)=84.86ms 
     http_req_sending...............: avg=656.95µs min=5.28µs  med=11.77µs  max=151.87ms p(90)=33.48µs  p(95)=143.56µs p(99.9)=91.9ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=145.96ms min=2.5ms   med=136ms    max=432.74ms p(90)=291.1ms  p(95)=339.57ms p(99.9)=415.05ms
     http_reqs......................: 94452   1493.934043/s
     iteration_duration.............: avg=149.98ms min=2.74ms  med=139.65ms max=911.88ms p(90)=297.47ms p(95)=345.22ms p(99.9)=548.15ms
     iterations.....................: 93452   1478.117183/s
     success_rate...................: 100.00% ✓ 93452       ✗ 0    
     vus............................: 68      min=0         max=495
     vus_max........................: 500     min=500       max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7233f5cc-d280-471c-9799-42cee9e01b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/39c9d03b-d8e2-4206-e61a-f6d7427d4f00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 127953     ✗ 0    
     data_received..................: 3.8 GB  60 MB/s
     data_sent......................: 51 MB   797 kB/s
     http_req_blocked...............: avg=136.16µs min=1.25µs  med=2.73µs   max=230.24ms p(90)=4.17µs   p(95)=6.08µs   p(99.9)=45.49ms 
     http_req_connecting............: avg=131.24µs min=0s      med=0s       max=230.2ms  p(90)=0s       p(95)=0s       p(99.9)=45.42ms 
     http_req_duration..............: avg=321.58ms min=2.85ms  med=296.47ms max=1.42s    p(90)=641.2ms  p(95)=748.18ms p(99.9)=1.27s   
       { expected_response:true }...: avg=321.58ms min=2.85ms  med=296.47ms max=1.42s    p(90)=641.2ms  p(95)=748.18ms p(99.9)=1.27s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 43651
     http_req_receiving.............: avg=703.8µs  min=26.57µs med=57.96µs  max=190.1ms  p(90)=169.27µs p(95)=475.75µs p(99.9)=103.44ms
     http_req_sending...............: avg=205.49µs min=5.35µs  med=10.79µs  max=147.87ms p(90)=29.16µs  p(95)=127.97µs p(99.9)=47.28ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=320.67ms min=2.74ms  med=295.67ms max=1.42s    p(90)=639.63ms p(95)=745.86ms p(99.9)=1.27s   
     http_reqs......................: 43651   684.448875/s
     iteration_duration.............: avg=329.73ms min=3.04ms  med=304.91ms max=1.42s    p(90)=645.76ms p(95)=754.06ms p(99.9)=1.27s   
     iterations.....................: 42651   668.768847/s
     success_rate...................: 100.00% ✓ 42651      ✗ 0    
     vus............................: 96      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5f16f73b-406f-45ce-12d1-c18a291a6c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c1fef3db-f4d8-4cbc-caef-a9b0fb86eb00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 36533 / ✗ 138
     ✓ valid response structure

     checks.........................: 99.87% ✓ 109875     ✗ 138  
     data_received..................: 3.3 GB 50 MB/s
     data_sent......................: 44 MB  665 kB/s
     http_req_blocked...............: avg=202.58µs min=1.28µs  med=2.95µs   max=281.47ms p(90)=4.96µs   p(95)=7.18µs   p(99.9)=54.02ms
     http_req_connecting............: avg=196.99µs min=0s      med=0s       max=281.4ms  p(90)=0s       p(95)=0s       p(99.9)=53.95ms
     http_req_duration..............: avg=372.99ms min=4.78ms  med=357.3ms  max=1.26s    p(90)=710.11ms p(95)=777.08ms p(99.9)=1.12s  
       { expected_response:true }...: avg=372.99ms min=4.78ms  med=357.3ms  max=1.26s    p(90)=710.11ms p(95)=777.08ms p(99.9)=1.12s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 37671
     http_req_receiving.............: avg=248.86µs min=27.68µs med=47.23µs  max=175.27ms p(90)=106.37µs p(95)=409.9µs  p(99.9)=43.69ms
     http_req_sending...............: avg=316.65µs min=5.78µs  med=11.38µs  max=172.65ms p(90)=33.42µs  p(95)=139.69µs p(99.9)=58.32ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=372.42ms min=4.72ms  med=356.59ms max=1.25s    p(90)=709.51ms p(95)=776.39ms p(99.9)=1.12s  
     http_reqs......................: 37671  571.306644/s
     iteration_duration.............: avg=383.84ms min=5.69ms  med=369.66ms max=1.34s    p(90)=713.32ms p(95)=779.05ms p(99.9)=1.13s  
     iterations.....................: 36671  556.140956/s
     success_rate...................: 99.62% ✓ 36533      ✗ 138  
     vus............................: 60     min=0        max=498
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/48f982c8-259f-4131-142d-7689b9e25300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/59f6a477-3b2a-457c-90cf-35f3daf2a500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  0% — ✓ 0 / ✗ 24980
     ✗ valid response structure
      ↳  98% — ✓ 24482 / ✗ 498

     checks.........................: 66.00% ✓ 49462      ✗ 25478
     data_received..................: 2.7 GB 39 MB/s
     data_sent......................: 30 MB  448 kB/s
     http_req_blocked...............: avg=27.99µs  min=1.39µs  med=3.09µs   max=32.77ms p(90)=4.86µs   p(95)=7.63µs   p(99.9)=4.2ms 
     http_req_connecting............: avg=21.86µs  min=0s      med=0s       max=32.7ms  p(90)=0s       p(95)=0s       p(99.9)=4ms   
     http_req_duration..............: avg=543.32ms min=6.54ms  med=508.31ms max=2.04s   p(90)=1.08s    p(95)=1.22s    p(99.9)=1.79s 
       { expected_response:true }...: avg=543.32ms min=6.54ms  med=508.31ms max=2.04s   p(90)=1.08s    p(95)=1.22s    p(99.9)=1.79s 
     http_req_failed................: 0.00%  ✓ 0          ✗ 25980
     http_req_receiving.............: avg=102.9µs  min=31.03µs med=60.76µs  max=13.46ms p(90)=114.32µs p(95)=186.63µs p(99.9)=3.81ms
     http_req_sending...............: avg=56.88µs  min=6.24µs  med=12.05µs  max=27.26ms p(90)=31.36µs  p(95)=114.7µs  p(99.9)=7.63ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=543.16ms min=6.49ms  med=507.87ms max=2.04s   p(90)=1.07s    p(95)=1.22s    p(99.9)=1.79s 
     http_reqs......................: 25980  384.132505/s
     iteration_duration.............: avg=565.2ms  min=6.78ms  med=532.83ms max=2.04s   p(90)=1.08s    p(95)=1.23s    p(99.9)=1.79s 
     iterations.....................: 24980  369.346804/s
     success_rate...................: 0.00%  ✓ 0          ✗ 24980
     vus............................: 94     min=0        max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a4eed2a0-2ab0-452f-76e3-6d39429a2800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c96ec2fb-349f-42f7-8f45-8694e53dec00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  80% — ✓ 9980 / ✗ 2401
     ✗ valid response structure
      ↳  99% — ✓ 12298 / ✗ 83

     checks.........................: 93.31% ✓ 34659      ✗ 2484 
     data_received..................: 1.2 GB 18 MB/s
     data_sent......................: 16 MB  231 kB/s
     http_req_blocked...............: avg=120.65µs min=1.37µs  med=2.8µs    max=86.34ms  p(90)=4.89µs  p(95)=8.93µs   p(99.9)=30.98ms
     http_req_connecting............: avg=114.83µs min=0s      med=0s       max=86.29ms  p(90)=0s      p(95)=0s       p(99.9)=30.9ms 
     http_req_duration..............: avg=1.01s    min=6.33ms  med=822.71ms max=11.25s   p(90)=2.32s   p(95)=2.85s    p(99.9)=8.82s  
       { expected_response:true }...: avg=1.01s    min=6.33ms  med=822.71ms max=11.25s   p(90)=2.32s   p(95)=2.85s    p(99.9)=8.82s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 13381
     http_req_receiving.............: avg=183.04µs min=28.32µs med=45.91µs  max=129.34ms p(90)=99.67µs p(95)=161.34µs p(99.9)=27.52ms
     http_req_sending...............: avg=203.02µs min=7.12µs  med=11.03µs  max=115.51ms p(90)=31.83µs p(95)=90.43µs  p(99.9)=33.71ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=1.01s    min=6.27ms  med=822.05ms max=11.25s   p(90)=2.32s   p(95)=2.85s    p(99.9)=8.82s  
     http_reqs......................: 13381  194.778948/s
     iteration_duration.............: avg=1.09s    min=8.47ms  med=921.88ms max=11.25s   p(90)=2.42s   p(95)=2.88s    p(99.9)=8.89s  
     iterations.....................: 12381  180.222566/s
     success_rate...................: 80.60% ✓ 9980       ✗ 2401 
     vus............................: 119    min=0        max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/07f8639d-d270-44c4-7bd9-04574ae9fb00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b424af92-c927-445f-c767-c1204882fb00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  0% — ✓ 0 / ✗ 9809
     ✗ valid response structure
      ↳  96% — ✓ 9440 / ✗ 369

     checks.........................: 65.41% ✓ 19249      ✗ 10178
     data_received..................: 950 MB 14 MB/s
     data_sent......................: 13 MB  186 kB/s
     http_req_blocked...............: avg=27.91µs min=1.4µs   med=3.21µs  max=9.73ms  p(90)=5.1µs    p(95)=20.32µs  p(99.9)=2.89ms
     http_req_connecting............: avg=21.49µs min=0s      med=0s      max=9.67ms  p(90)=0s       p(95)=0s       p(99.9)=2.83ms
     http_req_duration..............: avg=1.2s    min=7.49ms  med=1.15s   max=15.37s  p(90)=2.21s    p(95)=2.53s    p(99.9)=13.9s 
       { expected_response:true }...: avg=1.2s    min=7.49ms  med=1.15s   max=15.37s  p(90)=2.21s    p(95)=2.53s    p(99.9)=13.9s 
     http_req_failed................: 0.00%  ✓ 0          ✗ 10809
     http_req_receiving.............: avg=77.86µs min=28.47µs med=54.04µs max=6.66ms  p(90)=102.73µs p(95)=131.76µs p(99.9)=1.78ms
     http_req_sending...............: avg=32.21µs min=6.51µs  med=12.84µs max=12.04ms p(90)=30.52µs  p(95)=45.66µs  p(99.9)=3.89ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=1.2s    min=7.43ms  med=1.15s   max=15.37s  p(90)=2.21s    p(95)=2.53s    p(99.9)=13.9s 
     http_reqs......................: 10809  155.77167/s
     iteration_duration.............: avg=1.32s   min=7.65ms  med=1.27s   max=15.37s  p(90)=2.26s    p(95)=2.58s    p(99.9)=14.03s
     iterations.....................: 9809   141.360376/s
     success_rate...................: 0.00%  ✓ 0          ✗ 9809 
     vus............................: 86     min=0        max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/62c28c5a-ae64-4b34-292e-da26edab2e00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5108052b-f10d-4894-0a73-547240224700/public" alt="HTTP Overview" />


  </details>