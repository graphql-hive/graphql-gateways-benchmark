## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f1049279-85e7-425a-a9f4-f9c45f692e00/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |         Duration         | Notes                                    |
| :-------------------------- | :----: | :--------------------: | :----------------------: | :--------------------------------------- |
| hive-router                 |  1774  | 110685 total, 0 failed |  avg: 126ms, p95: 303ms  | ✅                                       |
| grafbase                    |  1480  | 93871 total, 0 failed  |  avg: 148ms, p95: 349ms  | ✅                                       |
| cosmo                       |  684   | 43762 total, 0 failed  |  avg: 321ms, p95: 703ms  | ✅                                       |
| hive-gateway-router-runtime |  603   | 39756 total, 0 failed  |  avg: 353ms, p95: 719ms  | ❌ non-compatible response structure (3) |
| apollo-router               |  395   | 26524 total, 0 failed  | avg: 531ms, p95: 1193ms  | ❌ 22 unexpected GraphQL errors          |
| hive-gateway                |  264   | 18160 total, 0 failed  | avg: 772ms, p95: 1704ms  | ✅                                       |
| apollo-gateway              |  155   | 10702 total, 0 failed  | avg: 1218ms, p95: 2566ms | ✅                                       |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 329055      ✗ 0     
     data_received..................: 9.7 GB  156 MB/s
     data_sent......................: 129 MB  2.1 MB/s
     http_req_blocked...............: avg=493.69µs min=1.19µs  med=2.48µs   max=356.19ms p(90)=3.9µs    p(95)=4.7µs    p(99.9)=176.66ms
     http_req_connecting............: avg=489.02µs min=0s      med=0s       max=339.23ms p(90)=0s       p(95)=0s       p(99.9)=176.62ms
     http_req_duration..............: avg=125.79ms min=1.93ms  med=113.78ms max=450.19ms p(90)=255.84ms p(95)=302.6ms  p(99.9)=402.79ms
       { expected_response:true }...: avg=125.79ms min=1.93ms  med=113.78ms max=450.19ms p(90)=255.84ms p(95)=302.6ms  p(99.9)=402.79ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 110685
     http_req_receiving.............: avg=538.02µs min=23.23µs med=42.31µs  max=143.92ms p(90)=117.55µs p(95)=392.69µs p(99.9)=75.35ms 
     http_req_sending...............: avg=453.94µs min=5.2µs   med=10.19µs  max=172.68ms p(90)=27.1µs   p(95)=128.41µs p(99.9)=72.92ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=124.79ms min=1.77ms  med=112.94ms max=433.57ms p(90)=253.66ms p(95)=300.74ms p(99.9)=399.75ms
     http_reqs......................: 110685  1774.7843/s
     iteration_duration.............: avg=127.73ms min=2.06ms  med=115.39ms max=799.13ms p(90)=258.33ms p(95)=305.07ms p(99.9)=432.64ms
     iterations.....................: 109685  1758.749749/s
     success_rate...................: 100.00% ✓ 109685      ✗ 0     
     vus............................: 76      min=0         max=494 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/488817be-ef0b-497f-842b-ea0081e1fa00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/84632b70-8436-4d01-8ba6-7fa7a122bf00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 278613      ✗ 0    
     data_received..................: 8.3 GB  130 MB/s
     data_sent......................: 109 MB  1.7 MB/s
     http_req_blocked...............: avg=733.18µs min=1.24µs  med=3.01µs   max=419.79ms p(90)=4.62µs   p(95)=5.86µs   p(99.9)=233.65ms
     http_req_connecting............: avg=726.38µs min=0s      med=0s       max=419.73ms p(90)=0s       p(95)=0s       p(99.9)=231.33ms
     http_req_duration..............: avg=148.2ms  min=2.58ms  med=137.27ms max=498.22ms p(90)=296.28ms p(95)=349.18ms p(99.9)=444.62ms
       { expected_response:true }...: avg=148.2ms  min=2.58ms  med=137.27ms max=498.22ms p(90)=296.28ms p(95)=349.18ms p(99.9)=444.62ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 93871
     http_req_receiving.............: avg=653.16µs min=26.02µs med=48.42µs  max=141.82ms p(90)=113.26µs p(95)=449.49µs p(99.9)=90.31ms 
     http_req_sending...............: avg=623.13µs min=5.29µs  med=11.94µs  max=191.39ms p(90)=31.4µs   p(95)=144.63µs p(99.9)=89.05ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=146.92ms min=2.53ms  med=136.13ms max=459.35ms p(90)=293.44ms p(95)=346.69ms p(99.9)=438.02ms
     http_reqs......................: 93871   1480.790035/s
     iteration_duration.............: avg=150.95ms min=2.87ms  med=139.33ms max=910.69ms p(90)=300.04ms p(95)=352.93ms p(99.9)=550.92ms
     iterations.....................: 92871   1465.015301/s
     success_rate...................: 100.00% ✓ 92871       ✗ 0    
     vus............................: 75      min=0         max=493
     vus_max........................: 500     min=500       max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f3adc987-9183-4e62-3a04-852bad655c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/653ba799-8eb7-485c-1bd0-19cddd6a2800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 128286     ✗ 0    
     data_received..................: 3.8 GB  60 MB/s
     data_sent......................: 51 MB   797 kB/s
     http_req_blocked...............: avg=124.83µs min=1.3µs   med=2.83µs   max=197.26ms p(90)=4.45µs   p(95)=6.41µs   p(99.9)=40.14ms 
     http_req_connecting............: avg=120.36µs min=0s      med=0s       max=197.2ms  p(90)=0s       p(95)=0s       p(99.9)=40.09ms 
     http_req_duration..............: avg=320.87ms min=2.92ms  med=306.66ms max=1.14s    p(90)=625.73ms p(95)=702.78ms p(99.9)=981.3ms 
       { expected_response:true }...: avg=320.87ms min=2.92ms  med=306.66ms max=1.14s    p(90)=625.73ms p(95)=702.78ms p(99.9)=981.3ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 43762
     http_req_receiving.............: avg=801.06µs min=28.76µs med=61.43µs  max=168.35ms p(90)=189.41µs p(95)=496.77µs p(99.9)=141.05ms
     http_req_sending...............: avg=179.91µs min=5.82µs  med=11.3µs   max=132.17ms p(90)=32.54µs  p(95)=132.58µs p(99.9)=32.9ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=319.89ms min=2.81ms  med=305.93ms max=1.14s    p(90)=623.08ms p(95)=698.93ms p(99.9)=980.02ms
     http_reqs......................: 43762   684.621523/s
     iteration_duration.............: avg=328.94ms min=3.18ms  med=314.99ms max=1.3s     p(90)=629.51ms p(95)=705.89ms p(99.9)=985.32ms
     iterations.....................: 42762   668.977322/s
     success_rate...................: 100.00% ✓ 42762      ✗ 0    
     vus............................: 62      min=0        max=499
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1a749817-d52b-4197-d30e-f4c5f0bd6800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cca1ab4e-431c-4040-d591-98141c074900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✗ valid response structure
      ↳  99% — ✓ 38753 / ✗ 3

     checks.........................: 99.99% ✓ 116265     ✗ 3    
     data_received..................: 3.5 GB 53 MB/s
     data_sent......................: 46 MB  702 kB/s
     http_req_blocked...............: avg=159.39µs min=1.33µs  med=2.88µs   max=174.22ms p(90)=4.56µs   p(95)=6.28µs   p(99.9)=49.34ms
     http_req_connecting............: avg=154.25µs min=0s      med=0s       max=174.14ms p(90)=0s       p(95)=0s       p(99.9)=49.19ms
     http_req_duration..............: avg=353.32ms min=4.81ms  med=350.09ms max=1.12s    p(90)=671.97ms p(95)=719.1ms  p(99.9)=1s     
       { expected_response:true }...: avg=353.32ms min=4.81ms  med=350.09ms max=1.12s    p(90)=671.97ms p(95)=719.1ms  p(99.9)=1s     
     http_req_failed................: 0.00%  ✓ 0          ✗ 39756
     http_req_receiving.............: avg=231.03µs min=26.14µs med=45.36µs  max=121.01ms p(90)=95.74µs  p(95)=380.82µs p(99.9)=36.62ms
     http_req_sending...............: avg=272.78µs min=5.67µs  med=11.02µs  max=133.69ms p(90)=29.17µs  p(95)=134.22µs p(99.9)=49.46ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=352.82ms min=4.76ms  med=349.56ms max=1.12s    p(90)=671.37ms p(95)=718.44ms p(99.9)=997.2ms
     http_reqs......................: 39756  603.019298/s
     iteration_duration.............: avg=363.04ms min=5.31ms  med=360.54ms max=1.23s    p(90)=675.17ms p(95)=722.29ms p(99.9)=1.03s  
     iterations.....................: 38756  587.851291/s
     success_rate...................: 99.99% ✓ 38753      ✗ 3    
     vus............................: 59     min=0        max=498
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/749ccb9e-35f8-4b99-de32-508ec6a1ae00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cecb2887-99a6-48e4-c278-9323ca763800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 25502 / ✗ 22
     ✓ valid response structure

     checks.........................: 99.97% ✓ 76550      ✗ 22   
     data_received..................: 2.3 GB 35 MB/s
     data_sent......................: 31 MB  461 kB/s
     http_req_blocked...............: avg=81.02µs  min=1.34µs  med=2.97µs   max=149.8ms  p(90)=4.81µs   p(95)=6.89µs   p(99.9)=19.8ms 
     http_req_connecting............: avg=75.67µs  min=0s      med=0s       max=149.73ms p(90)=0s       p(95)=0s       p(99.9)=19.75ms
     http_req_duration..............: avg=531.18ms min=6.19ms  med=489.91ms max=1.89s    p(90)=1.07s    p(95)=1.19s    p(99.9)=1.75s  
       { expected_response:true }...: avg=531.18ms min=6.19ms  med=489.91ms max=1.89s    p(90)=1.07s    p(95)=1.19s    p(99.9)=1.75s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 26524
     http_req_receiving.............: avg=114.13µs min=30.49µs med=53.34µs  max=97.39ms  p(90)=103.96µs p(95)=177.44µs p(99.9)=8.07ms 
     http_req_sending...............: avg=97.3µs   min=5.93µs  med=11.74µs  max=71.53ms  p(90)=30.7µs   p(95)=121.75µs p(99.9)=14.05ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=530.97ms min=6.15ms  med=489.75ms max=1.89s    p(90)=1.07s    p(95)=1.19s    p(99.9)=1.75s  
     http_reqs......................: 26524  395.063992/s
     iteration_duration.............: avg=552.44ms min=6.57ms  med=508.51ms max=1.89s    p(90)=1.07s    p(95)=1.19s    p(99.9)=1.75s  
     iterations.....................: 25524  380.169406/s
     success_rate...................: 99.91% ✓ 25502      ✗ 22   
     vus............................: 73     min=0        max=495
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/86737ce7-8e01-4f2f-c0cb-fc3f6c995200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/15a30b88-f43c-48fc-9883-c18738c68b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 51480      ✗ 0    
     data_received..................: 1.6 GB  23 MB/s
     data_sent......................: 21 MB   310 kB/s
     http_req_blocked...............: avg=132.08µs min=1.37µs  med=2.85µs   max=97.54ms  p(90)=5.14µs  p(95)=8.3µs    p(99.9)=36.22ms
     http_req_connecting............: avg=125.86µs min=0s      med=0s       max=97.49ms  p(90)=0s      p(95)=0s       p(99.9)=36.18ms
     http_req_duration..............: avg=772.12ms min=6.39ms  med=702.17ms max=5.2s     p(90)=1.53s   p(95)=1.7s     p(99.9)=4.07s  
       { expected_response:true }...: avg=772.12ms min=6.39ms  med=702.17ms max=5.2s     p(90)=1.53s   p(95)=1.7s     p(99.9)=4.07s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 18160
     http_req_receiving.............: avg=194.08µs min=27.47µs med=47.08µs  max=226.65ms p(90)=98.75µs p(95)=176.46µs p(99.9)=25.69ms
     http_req_sending...............: avg=212.81µs min=5.8µs   med=11.35µs  max=254.28ms p(90)=32.34µs p(95)=128.5µs  p(99.9)=29.84ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=771.72ms min=6.32ms  med=702.04ms max=5.18s    p(90)=1.53s   p(95)=1.7s     p(99.9)=4.07s  
     http_reqs......................: 18160   264.254723/s
     iteration_duration.............: avg=817.56ms min=8.09ms  med=749.14ms max=5.21s    p(90)=1.55s   p(95)=1.71s    p(99.9)=4.13s  
     iterations.....................: 17160   249.703252/s
     success_rate...................: 100.00% ✓ 17160      ✗ 0    
     vus............................: 107     min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/37e4bbdd-5ad1-4b54-e30c-6914a7583c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/319d2f2b-b307-4d88-f1b3-9298b1bdb300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 29106      ✗ 0    
     data_received..................: 940 MB  14 MB/s
     data_sent......................: 13 MB   186 kB/s
     http_req_blocked...............: avg=29.44µs min=1.28µs  med=3.12µs  max=20.15ms p(90)=5.05µs  p(95)=11.54µs  p(99.9)=3.29ms
     http_req_connecting............: avg=23.6µs  min=0s      med=0s      max=20.09ms p(90)=0s      p(95)=0s       p(99.9)=3.22ms
     http_req_duration..............: avg=1.21s   min=7.55ms  med=1.16s   max=15.59s  p(90)=2.17s   p(95)=2.56s    p(99.9)=14.46s
       { expected_response:true }...: avg=1.21s   min=7.55ms  med=1.16s   max=15.59s  p(90)=2.17s   p(95)=2.56s    p(99.9)=14.46s
     http_req_failed................: 0.00%   ✓ 0          ✗ 10702
     http_req_receiving.............: avg=77.41µs min=27.32µs med=52.33µs max=11.03ms p(90)=99.77µs p(95)=126.83µs p(99.9)=2.82ms
     http_req_sending...............: avg=39.47µs min=5.98µs  med=12.5µs  max=23.07ms p(90)=31.08µs p(95)=51.55µs  p(99.9)=5.14ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=1.21s   min=7.5ms   med=1.16s   max=15.59s  p(90)=2.17s   p(95)=2.56s    p(99.9)=14.46s
     http_reqs......................: 10702   155.816272/s
     iteration_duration.............: avg=1.34s   min=7.92ms  med=1.3s    max=15.6s   p(90)=2.22s   p(95)=2.65s    p(99.9)=14.57s
     iterations.....................: 9702    141.256725/s
     success_rate...................: 100.00% ✓ 9702       ✗ 0    
     vus............................: 108     min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b9f74731-7d45-43a6-7d3c-56d7c9ffce00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4e3edfd8-9f32-4a54-50b6-639c01c6ab00/public" alt="HTTP Overview" />


  </details>