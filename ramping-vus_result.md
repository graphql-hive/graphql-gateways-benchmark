## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 2000 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4de24fc4-f4e0-4a77-6412-5d670a499f00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests         |         Duration          | Notes                                                                                 |
| :--------------- | :----: | :---------------------: | :-----------------------: | :------------------------------------------------------------------------------------ |
| hive-router      |  1370  | 95188 total, 142 failed |  avg: 529ms, p95: 1470ms  | ❌ 142 failed requests, 142 non-200 responses, non-compatible response structure (140) |
| cosmo            |  551   |  41806 total, 0 failed  | avg: 1208ms, p95: 3093ms  | ✅                                                                                     |
| grafbase         |  411   |  30504 total, 0 failed  | avg: 1539ms, p95: 4187ms  | ✅                                                                                     |
| apollo-router    |  289   |  25773 total, 0 failed  | avg: 1907ms, p95: 5106ms  | ❌ 238 unexpected GraphQL errors, non-compatible response structure (16)               |
| hive-gateway     |  123   |  12389 total, 0 failed  | avg: 1522ms, p95: 2949ms  | ✅                                                                                     |
| hive-gateway-bun |  123   |  12483 total, 0 failed  | avg: 1518ms, p95: 2956ms  | ✅                                                                                     |
| apollo-gateway   |   84   | 9028 total, 171 failed  | avg: 1140ms, p95: 2754ms  | ❌ 171 failed requests, 171 non-200 responses, non-compatible response structure (171) |
| mercurius        |   65   |  7170 total, 0 failed   | avg: 3835ms, p95: 20860ms | ✅                                                                                     |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 91046 / ✗ 142
     ✓ no graphql errors
     ✗ valid response structure
      ↳  99% — ✓ 91046 / ✗ 140

     checks.........................: 99.89% ✓ 273280      ✗ 282   
     data_received..................: 8.3 GB 120 MB/s
     data_sent......................: 111 MB 1.6 MB/s
     http_req_blocked...............: avg=14.85ms  min=1.19µs  med=2.71µs   max=1.86s    p(90)=4.48µs   p(95)=7.72µs   p(99.9)=1.42s   
     http_req_connecting............: avg=14.79ms  min=0s      med=0s       max=1.86s    p(90)=0s       p(95)=0s       p(99.9)=1.42s   
     http_req_duration..............: avg=529.26ms min=1.36ms  med=462.53ms max=2.15s    p(90)=1.24s    p(95)=1.46s    p(99.9)=1.75s   
       { expected_response:true }...: avg=529.99ms min=1.69ms  med=463.5ms  max=2.15s    p(90)=1.24s    p(95)=1.47s    p(99.9)=1.75s   
     http_req_failed................: 0.14%  ✓ 142         ✗ 95046 
     http_req_receiving.............: avg=870.6µs  min=22.39µs med=43.97µs  max=250.88ms p(90)=175.43µs p(95)=419.2µs  p(99.9)=114.67ms
     http_req_sending...............: avg=2.03ms   min=5.2µs   med=10.61µs  max=1.12s    p(90)=102.81µs p(95)=450.11µs p(99.9)=132.73ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=526.35ms min=0s      med=458.81ms max=1.79s    p(90)=1.23s    p(95)=1.46s    p(99.9)=1.74s   
     http_reqs......................: 95188  1370.443228/s
     iteration_duration.............: avg=568.91ms min=1.81ms  med=495.69ms max=3.62s    p(90)=1.3s     p(95)=1.54s    p(99.9)=2.43s   
     iterations.....................: 91186  1312.825526/s
     success_rate...................: 99.99% ✓ 91044       ✗ 2     
     vus............................: 120    min=0         max=1994
     vus_max........................: 2000   min=2000      max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/402e8867-4818-4cdc-81c0-221f1becb400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4ddff648-4a13-4385-34f9-b613e848b300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 113418     ✗ 0     
     data_received..................: 3.7 GB  48 MB/s
     data_sent......................: 50 MB   653 kB/s
     http_req_blocked...............: avg=16.44ms min=1.35µs  med=2.81µs  max=1.88s    p(90)=5.85µs   p(95)=25.44µs  p(99.9)=1.11s   
     http_req_connecting............: avg=16.41ms min=0s      med=0s      max=1.88s    p(90)=0s       p(95)=0s       p(99.9)=1.1s    
     http_req_duration..............: avg=1.2s    min=2.85ms  med=1.01s   max=4.38s    p(90)=2.78s    p(95)=3.09s    p(99.9)=3.97s   
       { expected_response:true }...: avg=1.2s    min=2.85ms  med=1.01s   max=4.38s    p(90)=2.78s    p(95)=3.09s    p(99.9)=3.97s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 41806 
     http_req_receiving.............: avg=1.49ms  min=28.95µs med=57.58µs max=801.47ms p(90)=150.15µs p(95)=463.28µs p(99.9)=230.67ms
     http_req_sending...............: avg=5.07ms  min=5.93µs  med=11.46µs max=780.34ms p(90)=128.78µs p(95)=19.38ms  p(99.9)=346.61ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=1.2s    min=2.76ms  med=1s      max=4.38s    p(90)=2.77s    p(95)=3.08s    p(99.9)=3.96s   
     http_reqs......................: 41806   551.936208/s
     iteration_duration.............: avg=1.36s   min=3.14ms  med=1.28s   max=5.21s    p(90)=2.88s    p(95)=3.17s    p(99.9)=4.35s   
     iterations.....................: 37806   499.126927/s
     success_rate...................: 100.00% ✓ 37806      ✗ 0     
     vus............................: 217     min=0        max=1999
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fe740ad8-558b-424d-17b2-3fda08414600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/197c0e00-4888-41f6-ac49-d08d24897100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 79429      ✗ 0     
     data_received..................: 2.7 GB  36 MB/s
     data_sent......................: 37 MB   493 kB/s
     http_req_blocked...............: avg=69.43ms min=1.33µs  med=3.45µs  max=5.48s    p(90)=7.75µs   p(95)=245.45ms p(99.9)=3.07s   
     http_req_connecting............: avg=69.1ms  min=0s      med=0s      max=5.48s    p(90)=0s       p(95)=244.65ms p(99.9)=3.07s   
     http_req_duration..............: avg=1.53s   min=2.65ms  med=1.17s   max=6.07s    p(90)=3.84s    p(95)=4.18s    p(99.9)=5.07s   
       { expected_response:true }...: avg=1.53s   min=2.65ms  med=1.17s   max=6.07s    p(90)=3.84s    p(95)=4.18s    p(99.9)=5.07s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 30504 
     http_req_receiving.............: avg=1.93ms  min=26.22µs med=57.27µs max=1.62s    p(90)=170.55µs p(95)=501.14µs p(99.9)=297.44ms
     http_req_sending...............: avg=10.49ms min=6.14µs  med=13.06µs max=940.29ms p(90)=160.71µs p(95)=69.21ms  p(99.9)=397.38ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=1.52s   min=2.6ms   med=1.15s   max=6.07s    p(90)=3.82s    p(95)=4.16s    p(99.9)=4.97s   
     http_reqs......................: 30504   411.040198/s
     iteration_duration.............: avg=1.88s   min=3.07ms  med=1.77s   max=13.22s   p(90)=4.07s    p(95)=4.41s    p(99.9)=9.32s   
     iterations.....................: 26435   356.210583/s
     success_rate...................: 100.00% ✓ 26435      ✗ 0     
     vus............................: 100     min=0        max=2000
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9650d529-9a94-44bf-c74f-ddc1aede8400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/34187850-8975-4341-4d3c-dbd3f7e8f400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  98% — ✓ 21535 / ✗ 238
     ✗ valid response structure
      ↳  99% — ✓ 21757 / ✗ 16

     checks.........................: 99.61% ✓ 65065      ✗ 254   
     data_received..................: 2.3 GB 25 MB/s
     data_sent......................: 31 MB  352 kB/s
     http_req_blocked...............: avg=13.46ms  min=1.27µs  med=3.1µs   max=1.29s    p(90)=7.21µs   p(95)=1.45ms   p(99.9)=1.06s   
     http_req_connecting............: avg=13.43ms  min=0s      med=0s      max=1.29s    p(90)=0s       p(95)=1.39ms   p(99.9)=1.02s   
     http_req_duration..............: avg=1.9s     min=6.15ms  med=1.34s   max=14.22s   p(90)=4.45s    p(95)=5.1s     p(99.9)=12.61s  
       { expected_response:true }...: avg=1.9s     min=6.15ms  med=1.34s   max=14.22s   p(90)=4.45s    p(95)=5.1s     p(99.9)=12.61s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 25773 
     http_req_receiving.............: avg=995.67µs min=29.48µs med=53.42µs max=681.46ms p(90)=104.45µs p(95)=317.55µs p(99.9)=227.21ms
     http_req_sending...............: avg=5.72ms   min=5.82µs  med=11.82µs max=1.07s    p(90)=135.3µs  p(95)=19.06ms  p(99.9)=445.38ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=1.9s     min=6.1ms   med=1.33s   max=14.22s   p(90)=4.44s    p(95)=5.1s     p(99.9)=12.6s   
     http_reqs......................: 25773  289.402995/s
     iteration_duration.............: avg=2.28s    min=6.6ms   med=2.05s   max=14.4s    p(90)=4.6s     p(95)=5.45s    p(99.9)=12.7s   
     iterations.....................: 21773  244.487309/s
     success_rate...................: 98.90% ✓ 21535      ✗ 238   
     vus............................: 104    min=0        max=2000
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d46cd9dd-c412-4cf8-12b6-537fd1284300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c05d687d-30bb-40a8-11d3-034a97ad9d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 25167      ✗ 0     
     data_received..................: 1.1 GB  11 MB/s
     data_sent......................: 17 MB   166 kB/s
     http_req_blocked...............: avg=166.68µs min=1.6µs   med=3.81µs  max=71.59ms p(90)=6.34µs   p(95)=20.34µs  p(99.9)=48.06ms
     http_req_connecting............: avg=158.16µs min=0s      med=0s      max=71.51ms p(90)=0s       p(95)=0s       p(99.9)=48.01ms
     http_req_duration..............: avg=1.52s    min=7.18ms  med=1.11s   max=41.53s  p(90)=2.67s    p(95)=2.94s    p(99.9)=39.09s 
       { expected_response:true }...: avg=1.52s    min=7.18ms  med=1.11s   max=41.53s  p(90)=2.67s    p(95)=2.94s    p(99.9)=39.09s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 12389 
     http_req_receiving.............: avg=119.62µs min=33.11µs med=74.53µs max=20.4ms  p(90)=139.27µs p(95)=228.68µs p(99.9)=4.84ms 
     http_req_sending...............: avg=125.38µs min=7.07µs  med=15.25µs max=51.73ms p(90)=40.98µs  p(95)=100.96µs p(99.9)=25.51ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=1.52s    min=7.11ms  med=1.11s   max=41.53s  p(90)=2.67s    p(95)=2.94s    p(99.9)=39.09s 
     http_reqs......................: 12389   123.820088/s
     iteration_duration.............: avg=2.24s    min=12.77ms med=1.85s   max=41.54s  p(90)=2.82s    p(95)=3.13s    p(99.9)=39.7s  
     iterations.....................: 8389    83.84266/s
     success_rate...................: 100.00% ✓ 8389       ✗ 0     
     vus............................: 403     min=0        max=2000
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5be61e61-a35c-4ba2-83ab-a6ac00f38a00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c2f3eb7a-6d40-4a80-2e49-9cb53e3b0100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 25449      ✗ 0     
     data_received..................: 1.1 GB  11 MB/s
     data_sent......................: 17 MB   166 kB/s
     http_req_blocked...............: avg=157.52µs min=1.4µs   med=3.78µs  max=82.19ms p(90)=6.14µs   p(95)=18.94µs  p(99.9)=33.66ms
     http_req_connecting............: avg=147.27µs min=0s      med=0s      max=82.12ms p(90)=0s       p(95)=0s       p(99.9)=33.23ms
     http_req_duration..............: avg=1.51s    min=7.13ms  med=1.11s   max=41.46s  p(90)=2.64s    p(95)=2.95s    p(99.9)=39.01s 
       { expected_response:true }...: avg=1.51s    min=7.13ms  med=1.11s   max=41.46s  p(90)=2.64s    p(95)=2.95s    p(99.9)=39.01s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 12483 
     http_req_receiving.............: avg=123.74µs min=31.61µs med=73.48µs max=21.42ms p(90)=132.55µs p(95)=210.15µs p(99.9)=4.45ms 
     http_req_sending...............: avg=103.6µs  min=6.79µs  med=15.26µs max=44.18ms p(90)=38.83µs  p(95)=76.72µs  p(99.9)=17.3ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=1.51s    min=7.06ms  med=1.11s   max=41.46s  p(90)=2.64s    p(95)=2.95s    p(99.9)=39.01s 
     http_reqs......................: 12483   123.829155/s
     iteration_duration.............: avg=2.23s    min=15.4ms  med=1.86s   max=41.47s  p(90)=2.81s    p(95)=3.19s    p(99.9)=40.13s 
     iterations.....................: 8483    84.149861/s
     success_rate...................: 100.00% ✓ 8483       ✗ 0     
     vus............................: 349     min=0        max=2000
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/67bb4c46-870b-4b57-ebfe-b898d9b00700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d4168bba-060a-41bb-d172-e4a1e8c8dd00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  96% — ✓ 4857 / ✗ 171
     ✓ no graphql errors
     ✗ valid response structure
      ↳  96% — ✓ 4857 / ✗ 171

     checks.........................: 97.73%  ✓ 14742     ✗ 342   
     data_received..................: 778 MB  7.2 MB/s
     data_sent......................: 11 MB   107 kB/s
     http_req_blocked...............: avg=10.29µs min=0s     med=3.12µs   max=2.37ms  p(90)=5.03µs   p(95)=6.13µs   p(99.9)=682.36µs
     http_req_connecting............: avg=5.61µs  min=0s     med=0s       max=2.33ms  p(90)=0s       p(95)=0s       p(99.9)=589.47µs
     http_req_duration..............: avg=1.13s   min=0s     med=200.12ms max=46.46s  p(90)=2.33s    p(95)=2.75s    p(99.9)=43.51s  
       { expected_response:true }...: avg=1.16s   min=9.17ms med=271.67ms max=46.46s  p(90)=2.35s    p(95)=2.75s    p(99.9)=43.58s  
     http_req_failed................: 1.89%   ✓ 171       ✗ 8857  
     http_req_receiving.............: avg=72.68µs min=0s     med=59.03µs  max=4.66ms  p(90)=105.91µs p(95)=130.84µs p(99.9)=648.36µs
     http_req_sending...............: avg=25.7µs  min=0s     med=12.72µs  max=18.36ms p(90)=21.57µs  p(95)=39.28µs  p(99.9)=1.16ms  
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s       max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=1.13s   min=0s     med=200.02ms max=46.46s  p(90)=2.33s    p(95)=2.75s    p(99.9)=43.5s   
     http_reqs......................: 9028    84.027994/s
     iteration_duration.............: avg=3.05s   min=9.72ms med=1.65s    max=46.47s  p(90)=2.96s    p(95)=16.82s   p(99.9)=44.38s  
     iterations.....................: 5028    46.798045/s
     success_rate...................: 100.00% ✓ 4857      ✗ 0     
     vus............................: 306     min=0       max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4fd3c12a-d976-4379-f164-fb3333deb400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1a8589f9-9b71-43f7-2008-e5072e9a8800/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 9510      ✗ 0     
     data_received..................: 629 MB  5.7 MB/s
     data_sent......................: 11 MB   97 kB/s
     http_req_blocked...............: avg=218.99µs min=1.57µs  med=3.53µs  max=42.24ms p(90)=233.18µs p(95)=318.75µs p(99.9)=25.79ms
     http_req_connecting............: avg=207.42µs min=0s      med=0s      max=42.16ms p(90)=179.54µs p(95)=263.32µs p(99.9)=25.74ms
     http_req_duration..............: avg=3.83s    min=9.34ms  med=16.77ms max=26.85s  p(90)=16.12s   p(95)=20.86s   p(99.9)=26.37s 
       { expected_response:true }...: avg=3.83s    min=9.34ms  med=16.77ms max=26.85s  p(90)=16.12s   p(95)=20.86s   p(99.9)=26.37s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 7170  
     http_req_receiving.............: avg=83.45µs  min=29.32µs med=66.14µs max=4.56ms  p(90)=112.38µs p(95)=140.29µs p(99.9)=1.04ms 
     http_req_sending...............: avg=136.2µs  min=6.81µs  med=14.14µs max=36.88ms p(90)=54.07µs  p(95)=266.93µs p(99.9)=17.44ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=3.83s    min=9.28ms  med=16.68ms max=26.85s  p(90)=16.11s   p(95)=20.86s   p(99.9)=26.37s 
     http_reqs......................: 7170    65.117821/s
     iteration_duration.............: avg=8.66s    min=9.75ms  med=7.01s   max=26.85s  p(90)=21.32s   p(95)=22.71s   p(99.9)=26.53s 
     iterations.....................: 3170    28.789888/s
     success_rate...................: 100.00% ✓ 3170      ✗ 0     
     vus............................: 249     min=0       max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3d8c9b12-23eb-4e90-6d30-04b11f97d300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2da8d2e5-9293-409b-49a7-88c43347c600/public" alt="HTTP Overview" />


  </details>