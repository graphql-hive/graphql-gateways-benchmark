## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/18686af2-a24f-403d-b3e3-1cfbb083e000/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |       Requests        |        Duration        | Notes |
| :-------------------------- | :----: | :-------------------: | :--------------------: | :---- |
| hive-router                 |  1633  | 98510 total, 0 failed |  avg: 30ms, p95: 52ms  | ✅    |
| grafbase                    |  1568  | 94625 total, 0 failed |  avg: 31ms, p95: 55ms  | ✅    |
| cosmo                       |  650   | 39305 total, 0 failed | avg: 76ms, p95: 112ms  | ✅    |
| hive-gateway-router-runtime |  619   | 37616 total, 0 failed | avg: 79ms, p95: 110ms  | ✅    |
| apollo-router               |  313   | 19100 total, 0 failed | avg: 157ms, p95: 208ms | ✅    |
| hive-gateway                |  291   | 17933 total, 0 failed | avg: 167ms, p95: 279ms | ✅    |
| apollo-gateway              |  118   | 7240 total, 0 failed  | avg: 415ms, p95: 488ms | ✅    |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 295230      ✗ 0    
     data_received..................: 8.6 GB  143 MB/s
     data_sent......................: 115 MB  1.9 MB/s
     http_req_blocked...............: avg=8.74µs   min=1.21µs med=2.52µs  max=20.6ms   p(90)=3.66µs   p(95)=4.36µs   p(99.9)=90.77µs
     http_req_connecting............: avg=5.64µs   min=0s     med=0s      max=20.58ms  p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=30.19ms  min=2.23ms med=27.85ms max=479.5ms  p(90)=45.54ms  p(95)=52.04ms  p(99.9)=95.03ms
       { expected_response:true }...: avg=30.19ms  min=2.23ms med=27.85ms max=479.5ms  p(90)=45.54ms  p(95)=52.04ms  p(99.9)=95.03ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 98510
     http_req_receiving.............: avg=114.44µs min=23.7µs med=43.29µs max=41.16ms  p(90)=102.58µs p(95)=329.02µs p(99.9)=12.13ms
     http_req_sending...............: avg=99.34µs  min=5.24µs med=10.38µs max=342ms    p(90)=30.67µs  p(95)=122.3µs  p(99.9)=13.77ms
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=29.98ms  min=2.15ms med=27.68ms max=473.89ms p(90)=45.2ms   p(95)=51.65ms  p(99.9)=93.33ms
     http_reqs......................: 98510   1633.996982/s
     iteration_duration.............: avg=30.47ms  min=3.61ms med=28.1ms  max=517.37ms p(90)=45.79ms  p(95)=52.28ms  p(99.9)=95.85ms
     iterations.....................: 98410   1632.33827/s
     success_rate...................: 100.00% ✓ 98410       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/97a2acb7-993c-4f47-898e-6f2895e5fe00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5b40d9e0-4060-4b62-9e8e-0f61477fdb00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 283575      ✗ 0    
     data_received..................: 8.3 GB  138 MB/s
     data_sent......................: 110 MB  1.8 MB/s
     http_req_blocked...............: avg=8.1µs    min=1.26µs med=2.93µs  max=19.14ms  p(90)=4.18µs   p(95)=5.13µs   p(99.9)=113.95µs
     http_req_connecting............: avg=4.5µs    min=0s     med=0s      max=19.11ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=31.41ms  min=2.56ms med=28.13ms max=461.55ms p(90)=48.13ms  p(95)=54.94ms  p(99.9)=94.62ms 
       { expected_response:true }...: avg=31.41ms  min=2.56ms med=28.13ms max=461.55ms p(90)=48.13ms  p(95)=54.94ms  p(99.9)=94.62ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 94625
     http_req_receiving.............: avg=147.03µs min=26.4µs med=48.63µs max=63.46ms  p(90)=136.33µs p(95)=385.91µs p(99.9)=16.33ms 
     http_req_sending...............: avg=126.07µs min=5.3µs  med=11.68µs max=309.13ms p(90)=37.62µs  p(95)=138.41µs p(99.9)=17.27ms 
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=31.14ms  min=2.51ms med=27.93ms max=452.53ms p(90)=47.67ms  p(95)=54.44ms  p(99.9)=92.63ms 
     http_reqs......................: 94625   1568.478395/s
     iteration_duration.............: avg=31.72ms  min=7ms    med=28.41ms max=480.81ms p(90)=48.42ms  p(95)=55.24ms  p(99.9)=95.68ms 
     iterations.....................: 94525   1566.820822/s
     success_rate...................: 100.00% ✓ 94525       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8a2d5e3d-518e-4027-3fe2-23da61b74f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e0f2d1de-55e0-4a47-3a9f-3fffad3fed00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 117615     ✗ 0    
     data_received..................: 3.4 GB  57 MB/s
     data_sent......................: 46 MB   757 kB/s
     http_req_blocked...............: avg=22.43µs  min=1.31µs  med=2.99µs  max=22.74ms  p(90)=4.43µs   p(95)=5.49µs   p(99.9)=11.59ms 
     http_req_connecting............: avg=17.85µs  min=0s      med=0s      max=22.7ms   p(90)=0s       p(95)=0s       p(99.9)=11.05ms 
     http_req_duration..............: avg=76.02ms  min=2.85ms  med=74.81ms max=498.85ms p(90)=103.39ms p(95)=111.76ms p(99.9)=298.91ms
       { expected_response:true }...: avg=76.02ms  min=2.85ms  med=74.81ms max=498.85ms p(90)=103.39ms p(95)=111.76ms p(99.9)=298.91ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 39305
     http_req_receiving.............: avg=159.93µs min=29.21µs med=78.76µs max=49.06ms  p(90)=158.8µs  p(95)=404.96µs p(99.9)=14.07ms 
     http_req_sending...............: avg=77.38µs  min=5.79µs  med=11.86µs max=382.23ms p(90)=31.07µs  p(95)=130.14µs p(99.9)=4.18ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=75.78ms  min=2.76ms  med=74.62ms max=498.52ms p(90)=103.17ms p(95)=111.47ms p(99.9)=283.92ms
     http_reqs......................: 39305   650.539852/s
     iteration_duration.............: avg=76.53ms  min=6.64ms  med=75.16ms max=561.43ms p(90)=103.69ms p(95)=112.1ms  p(99.9)=311.89ms
     iterations.....................: 39205   648.884745/s
     success_rate...................: 100.00% ✓ 39205      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1dcb2b48-769b-4477-c98f-3811f297f100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f69f946f-586f-4684-8381-73180e45a600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 112548     ✗ 0    
     data_received..................: 3.3 GB  54 MB/s
     data_sent......................: 44 MB   721 kB/s
     http_req_blocked...............: avg=12.69µs  min=1.24µs  med=2.83µs  max=12.82ms  p(90)=4.43µs   p(95)=5.6µs    p(99.9)=3.44ms  
     http_req_connecting............: avg=8.71µs   min=0s      med=0s      max=12.79ms  p(90)=0s       p(95)=0s       p(99.9)=3.4ms   
     http_req_duration..............: avg=79.41ms  min=5.09ms  med=76.7ms  max=625.46ms p(90)=100.06ms p(95)=110.23ms p(99.9)=357.72ms
       { expected_response:true }...: avg=79.41ms  min=5.09ms  med=76.7ms  max=625.46ms p(90)=100.06ms p(95)=110.23ms p(99.9)=357.72ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 37616
     http_req_receiving.............: avg=108.43µs min=27µs    med=52.16µs max=42.76ms  p(90)=119.66µs p(95)=337.55µs p(99.9)=5.23ms  
     http_req_sending...............: avg=69.14µs  min=5.39µs  med=11.32µs max=93.4ms   p(90)=33.77µs  p(95)=136.01µs p(99.9)=8.02ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=79.23ms  min=5.04ms  med=76.55ms max=625.09ms p(90)=99.79ms  p(95)=109.94ms p(99.9)=357.64ms
     http_reqs......................: 37616   619.676154/s
     iteration_duration.............: avg=79.99ms  min=18.28ms med=77.04ms max=698.78ms p(90)=100.42ms p(95)=110.62ms p(99.9)=400.18ms
     iterations.....................: 37516   618.02878/s
     success_rate...................: 100.00% ✓ 37516      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/633aae88-13cc-4996-b1d7-eaec89650500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f4502377-e1b5-433d-e62e-f539a0c65900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 57000      ✗ 0    
     data_received..................: 1.7 GB  28 MB/s
     data_sent......................: 22 MB   364 kB/s
     http_req_blocked...............: avg=34.74µs  min=2.06µs  med=4.3µs    max=20.69ms  p(90)=6.38µs   p(95)=7.45µs   p(99.9)=12.03ms 
     http_req_connecting............: avg=29.35µs  min=0s      med=0s       max=20.52ms  p(90)=0s       p(95)=0s       p(99.9)=11.99ms 
     http_req_duration..............: avg=156.74ms min=7.38ms  med=155.01ms max=672.61ms p(90)=194.36ms p(95)=207.52ms p(99.9)=494.81ms
       { expected_response:true }...: avg=156.74ms min=7.38ms  med=155.01ms max=672.61ms p(90)=194.36ms p(95)=207.52ms p(99.9)=494.81ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 19100
     http_req_receiving.............: avg=107.75µs min=36.99µs med=78.38µs  max=52.24ms  p(90)=141.08µs p(95)=177.92µs p(99.9)=2.33ms  
     http_req_sending...............: avg=82.08µs  min=8.16µs  med=16.47µs  max=407.16ms p(90)=30.44µs  p(95)=73.71µs  p(99.9)=2.84ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=156.55ms min=7.28ms  med=154.86ms max=651.44ms p(90)=194.22ms p(95)=207.25ms p(99.9)=488.68ms
     http_reqs......................: 19100   313.052308/s
     iteration_duration.............: avg=158.05ms min=68.7ms  med=155.51ms max=756.12ms p(90)=194.89ms p(95)=208.04ms p(99.9)=557.21ms
     iterations.....................: 19000   311.41329/s
     success_rate...................: 100.00% ✓ 19000      ✗ 0    
     vus............................: 24      min=24       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/575349cb-d7e6-491e-76ee-519307b12a00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cf0775d9-15f5-49ba-cf96-8d5d982a2500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 53499      ✗ 0    
     data_received..................: 1.6 GB  26 MB/s
     data_sent......................: 21 MB   339 kB/s
     http_req_blocked...............: avg=50.86µs  min=1.25µs  med=2.81µs   max=24.36ms  p(90)=4.69µs   p(95)=5.86µs   p(99.9)=18.92ms 
     http_req_connecting............: avg=46.93µs  min=0s      med=0s       max=24.29ms  p(90)=0s       p(95)=0s       p(99.9)=18.87ms 
     http_req_duration..............: avg=167.24ms min=7.04ms  med=156.36ms max=1.22s    p(90)=219.49ms p(95)=278.63ms p(99.9)=785.17ms
       { expected_response:true }...: avg=167.24ms min=7.04ms  med=156.36ms max=1.22s    p(90)=219.49ms p(95)=278.63ms p(99.9)=785.17ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 17933
     http_req_receiving.............: avg=101.07µs min=25.8µs  med=50.39µs  max=19.09ms  p(90)=115.35µs p(95)=195.58µs p(99.9)=4.69ms  
     http_req_sending...............: avg=99.21µs  min=5.57µs  med=11.59µs  max=350.64ms p(90)=32.61µs  p(95)=128.93µs p(99.9)=6.15ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=167.03ms min=6.98ms  med=156.14ms max=1.22s    p(90)=219.31ms p(95)=278ms    p(99.9)=785.12ms
     http_reqs......................: 17933   291.809874/s
     iteration_duration.............: avg=168.61ms min=31.57ms med=157.54ms max=1.22s    p(90)=220.08ms p(95)=282.01ms p(99.9)=838.57ms
     iterations.....................: 17833   290.182651/s
     success_rate...................: 100.00% ✓ 17833      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a9450752-7cfa-4699-4dd2-a0b02a484600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b7821d5a-e7cd-4f18-c84b-b2ae5a962d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 21420      ✗ 0   
     data_received..................: 636 MB  10 MB/s
     data_sent......................: 8.4 MB  138 kB/s
     http_req_blocked...............: avg=104.66µs min=1.4µs   med=2.96µs   max=21.12ms  p(90)=4.74µs   p(95)=5.45µs   p(99.9)=19.28ms 
     http_req_connecting............: avg=100.59µs min=0s      med=0s       max=20.87ms  p(90)=0s       p(95)=0s       p(99.9)=19.24ms 
     http_req_duration..............: avg=415.11ms min=7.59ms  med=415.37ms max=861.66ms p(90)=470.29ms p(95)=488.09ms p(99.9)=783.78ms
       { expected_response:true }...: avg=415.11ms min=7.59ms  med=415.37ms max=861.66ms p(90)=470.29ms p(95)=488.09ms p(99.9)=783.78ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7240
     http_req_receiving.............: avg=66.82µs  min=31.35µs med=54.6µs   max=5.1ms    p(90)=101.93µs p(95)=118.05µs p(99.9)=317.56µs
     http_req_sending...............: avg=81.89µs  min=6.48µs  med=12.38µs  max=219.95ms p(90)=20.86µs  p(95)=26.14µs  p(99.9)=4.27ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=414.96ms min=7.54ms  med=415.28ms max=861.33ms p(90)=470.09ms p(95)=487.95ms p(99.9)=783.37ms
     http_reqs......................: 7240    118.375515/s
     iteration_duration.............: avg=421.53ms min=117.7ms med=416.02ms max=910.44ms p(90)=470.99ms p(95)=489.27ms p(99.9)=859.8ms 
     iterations.....................: 7140    116.740494/s
     success_rate...................: 100.00% ✓ 7140       ✗ 0   
     vus............................: 31      min=31       max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8a8ffe62-db82-4b74-71ba-6792f3817200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0d95e600-22f3-4fdf-35e8-00ca5761d900/public" alt="HTTP Overview" />


  </details>