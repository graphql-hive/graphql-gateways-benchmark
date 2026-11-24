## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ee477e98-24bb-4bdf-cdc2-d7e5360af400/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |         Duration         | Notes |
| :-------------------------- | :----: | :--------------------: | :----------------------: | :---- |
| hive-gateway-router-runtime |  1758  | 114745 total, 0 failed |  avg: 121ms, p95: 259ms  | ✅    |
| cosmo                       |  1715  | 110086 total, 0 failed |  avg: 126ms, p95: 295ms  | ✅    |
| grafbase                    |  1581  | 100372 total, 0 failed |  avg: 139ms, p95: 305ms  | ✅    |
| hive-router                 |  1541  | 96614 total, 0 failed  |  avg: 144ms, p95: 337ms  | ✅    |
| hive-gateway                |  1138  | 79668 total, 0 failed  |  avg: 175ms, p95: 379ms  | ✅    |
| hotchocolate                |  1016  | 63583 total, 0 failed  |  avg: 219ms, p95: 502ms  | ✅    |
| apollo-router               |  660   | 42184 total, 0 failed  |  avg: 333ms, p95: 768ms  | ✅    |
| apollo-router-v3            |  332   | 22603 total, 0 failed  | avg: 624ms, p95: 1426ms  | ✅    |
| apollo-gateway              |  116   |  8354 total, 0 failed  | avg: 1476ms, p95: 2763ms | ✅    |



<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 341235      ✗ 0     
     data_received..................: 10 GB   154 MB/s
     data_sent......................: 134 MB  2.0 MB/s
     http_req_blocked...............: avg=515.45µs min=661ns   med=2.21µs   max=345.22ms p(90)=3.4µs    p(95)=4.23µs   p(99.9)=166.65ms
     http_req_connecting............: avg=510.42µs min=0s      med=0s       max=345.16ms p(90)=0s       p(95)=0s       p(99.9)=166.11ms
     http_req_duration..............: avg=121.11ms min=1.77ms  med=116.88ms max=423.36ms p(90)=223.54ms p(95)=259.42ms p(99.9)=357.87ms
       { expected_response:true }...: avg=121.11ms min=1.77ms  med=116.88ms max=423.36ms p(90)=223.54ms p(95)=259.42ms p(99.9)=357.87ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 114745
     http_req_receiving.............: avg=551.93µs min=20.92µs med=50.09µs  max=241.16ms p(90)=107.23µs p(95)=293.1µs  p(99.9)=70.19ms 
     http_req_sending...............: avg=436.7µs  min=3.43µs  med=9.5µs    max=185.22ms p(90)=16.75µs  p(95)=82.51µs  p(99.9)=67.93ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=120.12ms min=1.72ms  med=115.85ms max=371.63ms p(90)=221.74ms p(95)=257.55ms p(99.9)=355.52ms
     http_reqs......................: 114745  1758.208467/s
     iteration_duration.............: avg=123.13ms min=1.95ms  med=118.43ms max=745.86ms p(90)=226.37ms p(95)=262.14ms p(99.9)=389.07ms
     iterations.....................: 113745  1742.885722/s
     success_rate...................: 100.00% ✓ 113745      ✗ 0     
     vus............................: 70      min=0         max=495 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f6f2776c-4d87-4b11-5598-a18785c2c400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ec91646b-ca2b-4f87-a1d1-9c42f5b0c100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 327258      ✗ 0     
     data_received..................: 9.7 GB  151 MB/s
     data_sent......................: 128 MB  2.0 MB/s
     http_req_blocked...............: avg=615.79µs min=1.07µs   med=2.81µs   max=399.66ms p(90)=4.64µs   p(95)=5.64µs   p(99.9)=194.91ms
     http_req_connecting............: avg=609.69µs min=0s       med=0s       max=399.6ms  p(90)=0s       p(95)=0s       p(99.9)=193.69ms
     http_req_duration..............: avg=126.26ms min=447.72µs med=117.61ms max=445.31ms p(90)=249.72ms p(95)=294.62ms p(99.9)=406.58ms
       { expected_response:true }...: avg=126.26ms min=447.72µs med=117.61ms max=445.31ms p(90)=249.72ms p(95)=294.62ms p(99.9)=406.58ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 110086
     http_req_receiving.............: avg=611.22µs min=23.89µs  med=50.55µs  max=131.1ms  p(90)=108.47µs p(95)=372.9µs  p(99.9)=80.43ms 
     http_req_sending...............: avg=496.02µs min=4.37µs   med=10.33µs  max=141.59ms p(90)=20.63µs  p(95)=108.71µs p(99.9)=77.98ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=125.16ms min=388.15µs med=116.59ms max=427.35ms p(90)=247.73ms p(95)=292.7ms  p(99.9)=401.07ms
     http_reqs......................: 110086  1715.298234/s
     iteration_duration.............: avg=128.44ms min=648.34µs med=118.95ms max=824.31ms p(90)=252.45ms p(95)=297.45ms p(99.9)=443.79ms
     iterations.....................: 109086  1699.716796/s
     success_rate...................: 100.00% ✓ 109086      ✗ 0     
     vus............................: 69      min=0         max=496 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c9ae7230-598f-4048-fcd6-96445d79c200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2200878e-150a-4652-1e57-ddc8a5f4b100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 298116      ✗ 0     
     data_received..................: 8.8 GB  139 MB/s
     data_sent......................: 117 MB  1.8 MB/s
     http_req_blocked...............: avg=604.87µs min=655ns   med=2.45µs   max=350.5ms  p(90)=4.37µs   p(95)=5.19µs   p(99.9)=195.14ms
     http_req_connecting............: avg=596.84µs min=0s      med=0s       max=350.02ms p(90)=0s       p(95)=0s       p(99.9)=194.23ms
     http_req_duration..............: avg=138.68ms min=2.68ms  med=132.72ms max=474.2ms  p(90)=262.24ms p(95)=304.76ms p(99.9)=415.56ms
       { expected_response:true }...: avg=138.68ms min=2.68ms  med=132.72ms max=474.2ms  p(90)=262.24ms p(95)=304.76ms p(99.9)=415.56ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 100372
     http_req_receiving.............: avg=620.09µs min=20.88µs med=50.05µs  max=163.36ms p(90)=112.37µs p(95)=372.11µs p(99.9)=81.21ms 
     http_req_sending...............: avg=543.8µs  min=2.49µs  med=9.48µs   max=176.46ms p(90)=20.49µs  p(95)=115.76µs p(99.9)=82.71ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=137.51ms min=2.62ms  med=131.59ms max=474.15ms p(90)=260.01ms p(95)=302.46ms p(99.9)=411.18ms
     http_reqs......................: 100372  1581.537715/s
     iteration_duration.............: avg=140.98ms min=2.99ms  med=134.41ms max=788.11ms p(90)=264.7ms  p(95)=307.44ms p(99.9)=458.28ms
     iterations.....................: 99372   1565.780953/s
     success_rate...................: 100.00% ✓ 99372       ✗ 0     
     vus............................: 81      min=0         max=492 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/534f0372-6845-40f0-c8b3-c186e0eab500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/14268565-6b5d-4f6c-498c-08da2877b500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 286842      ✗ 0    
     data_received..................: 8.5 GB  135 MB/s
     data_sent......................: 112 MB  1.8 MB/s
     http_req_blocked...............: avg=819.8µs  min=1.31µs   med=3.01µs   max=429.89ms p(90)=4.96µs   p(95)=6.57µs   p(99.9)=239.51ms
     http_req_connecting............: avg=810.09µs min=0s       med=0s       max=429.85ms p(90)=0s       p(95)=0s       p(99.9)=238.85ms
     http_req_duration..............: avg=143.94ms min=480.75µs med=134.47ms max=524.87ms p(90)=284.36ms p(95)=336.75ms p(99.9)=447.97ms
       { expected_response:true }...: avg=143.94ms min=480.75µs med=134.47ms max=524.87ms p(90)=284.36ms p(95)=336.75ms p(99.9)=447.97ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 96614
     http_req_receiving.............: avg=740.24µs min=28.35µs  med=67.78µs  max=157.12ms p(90)=139.58µs p(95)=410.56µs p(99.9)=90.96ms 
     http_req_sending...............: avg=619.19µs min=5.58µs   med=11.89µs  max=151.38ms p(90)=24.12µs  p(95)=122.11µs p(99.9)=86.4ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=142.58ms min=424.47µs med=132.9ms  max=458.8ms  p(90)=281.95ms p(95)=334.33ms p(99.9)=445.03ms
     http_reqs......................: 96614   1541.003504/s
     iteration_duration.............: avg=146.57ms min=689.04µs med=136.39ms max=940.82ms p(90)=288ms    p(95)=340.3ms  p(99.9)=531.68ms
     iterations.....................: 95614   1525.053398/s
     success_rate...................: 100.00% ✓ 95614       ✗ 0    
     vus............................: 92      min=0         max=500
     vus_max........................: 500     min=500       max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1902223f-e8d4-4957-cab0-1930ce8b8800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/83497406-45f4-4285-bac3-a7ffcb73f500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 236004      ✗ 0    
     data_received..................: 7.0 GB  100 MB/s
     data_sent......................: 93 MB   1.3 MB/s
     http_req_blocked...............: avg=900.81µs min=1.23µs  med=3.18µs   max=556.54ms p(90)=4.85µs   p(95)=6.13µs   p(99.9)=243.29ms
     http_req_connecting............: avg=887.32µs min=0s      med=0s       max=417.58ms p(90)=0s       p(95)=0s       p(99.9)=242.71ms
     http_req_duration..............: avg=174.66ms min=5.84ms  med=159.27ms max=721.34ms p(90)=318.99ms p(95)=379.13ms p(99.9)=662.51ms
       { expected_response:true }...: avg=174.66ms min=5.84ms  med=159.27ms max=721.34ms p(90)=318.99ms p(95)=379.13ms p(99.9)=662.51ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 79668
     http_req_receiving.............: avg=799.54µs min=27.87µs med=61.72µs  max=146.95ms p(90)=149.37µs p(95)=419.99µs p(99.9)=93.03ms 
     http_req_sending...............: avg=764.47µs min=5.42µs  med=12.23µs  max=157.59ms p(90)=38.93µs  p(95)=131.51µs p(99.9)=92.95ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=173.09ms min=5.78ms  med=157.64ms max=721.27ms p(90)=316.01ms p(95)=376.46ms p(99.9)=660.22ms
     http_reqs......................: 79668   1138.511229/s
     iteration_duration.............: avg=178.23ms min=6.06ms  med=161.82ms max=1.33s    p(90)=323.61ms p(95)=384.29ms p(99.9)=688.47ms
     iterations.....................: 78668   1124.220533/s
     success_rate...................: 100.00% ✓ 78668       ✗ 0    
     vus............................: 60      min=0         max=498
     vus_max........................: 500     min=500       max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1be43279-6a0c-41cc-5a16-582d08241a00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d493da5b-5114-4899-fd4b-fed1ad8f1800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hotchocolate</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 187748      ✗ 0    
     data_received..................: 5.6 GB  89 MB/s
     data_sent......................: 74 MB   1.2 MB/s
     http_req_blocked...............: avg=1.09ms   min=1.32µs  med=3.23µs   max=528.53ms p(90)=4.83µs   p(95)=6.12µs   p(99.9)=266.39ms
     http_req_connecting............: avg=1.09ms   min=0s      med=0s       max=528.48ms p(90)=0s       p(95)=0s       p(99.9)=266.33ms
     http_req_duration..............: avg=218.78ms min=1.86ms  med=207.79ms max=778.27ms p(90)=416.59ms p(95)=502.17ms p(99.9)=682.85ms
       { expected_response:true }...: avg=218.78ms min=1.86ms  med=207.79ms max=778.27ms p(90)=416.59ms p(95)=502.17ms p(99.9)=682.85ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 63583
     http_req_receiving.............: avg=960.36µs min=27.62µs med=59.65µs  max=293.53ms p(90)=145.14µs p(95)=434.92µs p(99.9)=125.38ms
     http_req_sending...............: avg=1.11ms   min=5.54µs  med=12.32µs  max=248.37ms p(90)=36.47µs  p(95)=140.64µs p(99.9)=127.16ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=216.7ms  min=1.75ms  med=205.69ms max=723.45ms p(90)=412.38ms p(95)=497.88ms p(99.9)=679.54ms
     http_reqs......................: 63583   1016.329133/s
     iteration_duration.............: avg=224.29ms min=2.08ms  med=211.55ms max=1.28s    p(90)=423.95ms p(95)=510.04ms p(99.9)=788.35ms
     iterations.....................: 62582   1000.328858/s
     success_rate...................: 100.00% ✓ 62582       ✗ 0    
     vus............................: 88      min=0         max=499
     vus_max........................: 500     min=500       max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3976f057-7710-4937-365b-decc2bea4200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a7d18deb-93d6-480c-40e6-188ce1fb7500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 123552     ✗ 0    
     data_received..................: 3.7 GB  58 MB/s
     data_sent......................: 49 MB   769 kB/s
     http_req_blocked...............: avg=33.63µs  min=551ns  med=1.68µs   max=51.41ms p(90)=3.18µs   p(95)=4.37µs   p(99.9)=8.02ms 
     http_req_connecting............: avg=29.62µs  min=0s     med=0s       max=51.36ms p(90)=0s       p(95)=0s       p(99.9)=7.58ms 
     http_req_duration..............: avg=333.49ms min=3.16ms med=306.15ms max=1.38s   p(90)=685.03ms p(95)=767.9ms  p(99.9)=1.07s  
       { expected_response:true }...: avg=333.49ms min=3.16ms med=306.15ms max=1.38s   p(90)=685.03ms p(95)=767.9ms  p(99.9)=1.07s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 42184
     http_req_receiving.............: avg=67.01µs  min=12.6µs med=30.27µs  max=80.19ms p(90)=65.69µs  p(95)=116.62µs p(99.9)=4.27ms 
     http_req_sending...............: avg=62.25µs  min=2.63µs med=6.85µs   max=90.47ms p(90)=15.44µs  p(95)=43.6µs   p(99.9)=10.39ms
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=333.36ms min=3.13ms med=306.07ms max=1.38s   p(90)=684.9ms  p(95)=767.76ms p(99.9)=1.07s  
     http_reqs......................: 42184   660.081917/s
     iteration_duration.............: avg=341.77ms min=3.4ms  med=315.45ms max=1.38s   p(90)=688.14ms p(95)=770.42ms p(99.9)=1.07s  
     iterations.....................: 41184   644.434233/s
     success_rate...................: 100.00% ✓ 41184      ✗ 0    
     vus............................: 52      min=0        max=499
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6def90ea-8796-4c37-e8b7-4caa50339b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a0bc8423-a521-4fd6-17d3-c0bc416daf00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router-v3</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 64809      ✗ 0    
     data_received..................: 2.0 GB  29 MB/s
     data_sent......................: 26 MB   388 kB/s
     http_req_blocked...............: avg=164.21µs min=1.5µs   med=3.12µs   max=172.93ms p(90)=4.98µs   p(95)=7.22µs  p(99.9)=38.06ms
     http_req_connecting............: avg=159.09µs min=0s      med=0s       max=172.82ms p(90)=0s       p(95)=0s      p(99.9)=38ms   
     http_req_duration..............: avg=623.9ms  min=6.68ms  med=591.4ms  max=2.26s    p(90)=1.26s    p(95)=1.42s   p(99.9)=2.06s  
       { expected_response:true }...: avg=623.9ms  min=6.68ms  med=591.4ms  max=2.26s    p(90)=1.26s    p(95)=1.42s   p(99.9)=2.06s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 22603
     http_req_receiving.............: avg=137.43µs min=29.87µs med=58.39µs  max=134.41ms p(90)=118.59µs p(95)=154.9µs p(99.9)=15.64ms
     http_req_sending...............: avg=159.52µs min=6.31µs  med=12.22µs  max=138.37ms p(90)=23.31µs  p(95)=69.55µs p(99.9)=30.11ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      p(99.9)=0s     
     http_req_waiting...............: avg=623.61ms min=6.64ms  med=591.01ms max=2.26s    p(90)=1.26s    p(95)=1.42s   p(99.9)=2.06s  
     http_reqs......................: 22603   332.529125/s
     iteration_duration.............: avg=653.33ms min=7.29ms  med=624.5ms  max=2.26s    p(90)=1.27s    p(95)=1.43s   p(99.9)=2.06s  
     iterations.....................: 21603   317.8174/s
     success_rate...................: 100.00% ✓ 21603      ✗ 0    
     vus............................: 65      min=0        max=497
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/17279847-4f03-4ab5-25e8-2ec6f0d68300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ff14798a-2249-4d95-2287-823dc210ff00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 22062      ✗ 0    
     data_received..................: 734 MB  10 MB/s
     data_sent......................: 10 MB   141 kB/s
     http_req_blocked...............: avg=45.9µs   min=1.13µs  med=4.84µs  max=37.64ms p(90)=7.23µs   p(95)=15.41µs  p(99.9)=7.7ms 
     http_req_connecting............: avg=34.81µs  min=0s      med=0s      max=34.38ms p(90)=0s       p(95)=0s       p(99.9)=7.63ms
     http_req_duration..............: avg=1.47s    min=9.72ms  med=1.48s   max=20.09s  p(90)=2.51s    p(95)=2.76s    p(99.9)=18.84s
       { expected_response:true }...: avg=1.47s    min=9.72ms  med=1.48s   max=20.09s  p(90)=2.51s    p(95)=2.76s    p(99.9)=18.84s
     http_req_failed................: 0.00%   ✓ 0          ✗ 8354 
     http_req_receiving.............: avg=118.98µs min=32.33µs med=95.67µs max=16.72ms p(90)=146.63µs p(95)=170.63µs p(99.9)=3.13ms
     http_req_sending...............: avg=54.93µs  min=4.8µs   med=18.91µs max=24.12ms p(90)=30.66µs  p(95)=49.17µs  p(99.9)=9.23ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=1.47s    min=9.59ms  med=1.48s   max=20.09s  p(90)=2.51s    p(95)=2.76s    p(99.9)=18.84s
     http_reqs......................: 8354    116.526448/s
     iteration_duration.............: avg=1.67s    min=11.51ms med=1.67s   max=20.1s   p(90)=2.53s    p(95)=2.82s    p(99.9)=18.92s
     iterations.....................: 7354    102.577867/s
     success_rate...................: 100.00% ✓ 7354       ✗ 0    
     vus............................: 118     min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/13046f7e-5381-4ffb-f4be-444d69950600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/194ebe66-a1c4-4c4d-403e-0e81feb20000/public" alt="HTTP Overview" />


  </details>