## Overview for: `federation/ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was trying to reach 2000 concurrent VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4f51dd13-fbe7-4e03-ea91-1420743b8300/public" alt="Comparison" />


| Gateway          | duration(p95)⬇️ |  RPS  |        Requests         |                       Durations                        | Notes                                                                       |
| :--------------- | :-------------: | :---: | :---------------------: | :----------------------------------------------------: | :-------------------------------------------------------------------------- |
| cosmo            |     5788ms      |  175  |  12325 total, 0 failed  |  avg: 2390ms, p95: 5789ms, max: 12995ms, med: 1981ms   | ✅                                                                           |
| grafbase         |     6250ms      |  164  |  11520 total, 0 failed  |  avg: 2882ms, p95: 6251ms, max: 11175ms, med: 2472ms   | ✅                                                                           |
| apollo-router    |     7642ms      |  159  | 11240 total, 458 failed |  avg: 2744ms, p95: 7642ms, max: 21141ms, med: 2148ms   | ❌ 458 failed requests, 458 non-200 responses, 458 unexpected GraphQL errors |
| hive-gateway-bun |     26692ms     |  91   |  7498 total, 0 failed   | avg: 11534ms, p95: 26692ms, max: 32923ms, med: 9838ms  | ✅                                                                           |
| mercurius        |     43930ms     |  49   |  4602 total, 0 failed   | avg: 23115ms, p95: 43931ms, max: 47440ms, med: 21658ms | ✅                                                                           |
| hive-gateway     |     49197ms     |  95   |  8099 total, 0 failed   | avg: 11069ms, p95: 49198ms, max: 57323ms, med: 3163ms  | ✅                                                                           |
| apollo-server    |     59999ms     |  85   | 7901 total, 502 failed  | avg: 11820ms, p95: 60000ms, max: 60387ms, med: 2199ms  | ❌ 502 failed requests, 502 non-200 responses, 502 unexpected GraphQL errors |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 36915      ✗ 0     
     data_received..................: 1.1 GB  15 MB/s
     data_sent......................: 15 MB   209 kB/s
     http_req_blocked...............: avg=223.77ms min=1.5µs   med=3.37µs  max=10.54s p(90)=829.69ms p(95)=1.82s   
     http_req_connecting............: avg=221.66ms min=0s      med=0s      max=10.54s p(90)=821.35ms p(95)=1.82s   
     http_req_duration..............: avg=2.39s    min=3.13ms  med=1.98s   max=12.99s p(90)=4.95s    p(95)=5.78s   
       { expected_response:true }...: avg=2.39s    min=3.13ms  med=1.98s   max=12.99s p(90)=4.95s    p(95)=5.78s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 12325 
     http_req_receiving.............: avg=232.98ms min=32.38µs med=76.64µs max=10.14s p(90)=730.97ms p(95)=1.78s   
     http_req_sending...............: avg=126.36ms min=8.47µs  med=15.22µs max=8.13s  p(90)=201.93ms p(95)=696.45ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.03s    min=3.06ms  med=1.7s    max=11.55s p(90)=4.22s    p(95)=5.2s    
     http_reqs......................: 12325   175.801142/s
     iteration_duration.............: avg=5.53s    min=8.91ms  med=4.57s   max=29.87s p(90)=11.65s   p(95)=14.66s  
     iterations.....................: 12305   175.515866/s
     vus............................: 6       min=6        max=1867
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/91c1daf2-b890-49c6-a165-9c39d261d200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5f646efb-8cfb-4095-a8fc-c335e6bddf00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a6823c22-26e7-4535-771b-ddf7a23b2600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 34500      ✗ 0     
     data_received..................: 1.0 GB  14 MB/s
     data_sent......................: 14 MB   195 kB/s
     http_req_blocked...............: avg=346.52ms min=1.45µs  med=3.8µs   max=10.52s p(90)=1.42s    p(95)=2.61s 
     http_req_connecting............: avg=343.88ms min=0s      med=0s      max=10.52s p(90)=1.42s    p(95)=2.61s 
     http_req_duration..............: avg=2.88s    min=3.27ms  med=2.47s   max=11.17s p(90)=5.71s    p(95)=6.25s 
       { expected_response:true }...: avg=2.88s    min=3.27ms  med=2.47s   max=11.17s p(90)=5.71s    p(95)=6.25s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 11520 
     http_req_receiving.............: avg=191.39ms min=30.83µs med=76.01µs max=10.21s p(90)=370.9ms  p(95)=1.42s 
     http_req_sending...............: avg=150.64ms min=7.86µs  med=18.87µs max=6.54s  p(90)=459.16ms p(95)=1.05s 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=2.54s    min=3.02ms  med=2.16s   max=10.63s p(90)=5.42s    p(95)=5.88s 
     http_reqs......................: 11520   164.372721/s
     iteration_duration.............: avg=6.14s    min=14.64ms med=5.27s   max=26.44s p(90)=12.1s    p(95)=14.29s
     iterations.....................: 11500   164.087352/s
     vus............................: 8       min=8        max=1966
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5a560df3-4553-40f0-b1ff-5eeed113c200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f588965c-0d28-4e77-6e39-77789b8da500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/45f5a128-e825-4e02-7d06-1af5e364fb00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  95% — ✓ 10762 / ✗ 458
     ✗ no graphql errors
      ↳  95% — ✓ 10762 / ✗ 458
     ✓ valid response structure

     █ setup

     checks.........................: 97.24% ✓ 32286      ✗ 916   
     data_received..................: 946 MB 14 MB/s
     data_sent......................: 13 MB  190 kB/s
     http_req_blocked...............: avg=557.95ms min=1.48µs med=3.9µs   max=12.35s p(90)=2.72s    p(95)=3.45s 
     http_req_connecting............: avg=534.71ms min=0s     med=0s      max=10.15s p(90)=2.67s    p(95)=3.42s 
     http_req_duration..............: avg=2.74s    min=6.49ms med=2.14s   max=21.14s p(90)=6.4s     p(95)=7.64s 
       { expected_response:true }...: avg=2.74s    min=6.49ms med=2.12s   max=21.14s p(90)=6.45s    p(95)=7.66s 
     http_req_failed................: 4.07%  ✓ 458        ✗ 10782 
     http_req_receiving.............: avg=830.23ms min=0s     med=90.41µs max=11.66s p(90)=3.72s    p(95)=5.33s 
     http_req_sending...............: avg=279.84ms min=7.84µs med=20.28µs max=12.82s p(90)=542.21ms p(95)=1.16s 
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s      max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=1.63s    min=6.41ms med=1.36s   max=9.69s  p(90)=3.42s    p(95)=3.86s 
     http_reqs......................: 11240  159.914216/s
     iteration_duration.............: avg=6.29s    min=27.1ms med=5.49s   max=26.57s p(90)=12.82s   p(95)=14.65s
     iterations.....................: 11220  159.629671/s
     vus............................: 138    min=74       max=1969
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/10ea2930-9dac-418b-5600-a365fa8cb000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7b3411e4-092e-40b8-1cd3-ba7f79d02800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5a342346-6b6f-4226-3ac2-8939206e9900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 22434     ✗ 0     
     data_received..................: 658 MB  8.1 MB/s
     data_sent......................: 8.9 MB  109 kB/s
     http_req_blocked...............: avg=28ms     min=1.72µs  med=4.32µs  max=2.19s  p(90)=36.08ms p(95)=169.88ms
     http_req_connecting............: avg=27.78ms  min=0s      med=0s      max=2.19s  p(90)=34.75ms p(95)=167.87ms
     http_req_duration..............: avg=11.53s   min=16.31ms med=9.83s   max=32.92s p(90)=23.96s  p(95)=26.69s  
       { expected_response:true }...: avg=11.53s   min=16.31ms med=9.83s   max=32.92s p(90)=23.96s  p(95)=26.69s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 7498  
     http_req_receiving.............: avg=118.62ms min=35.94µs med=104.5µs max=7.79s  p(90)=6.57ms  p(95)=434.95ms
     http_req_sending...............: avg=19.34ms  min=8.49µs  med=26.5µs  max=1.56s  p(90)=24.73ms p(95)=96.35ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=11.39s   min=16.18ms med=9.73s   max=32.92s p(90)=23.85s  p(95)=26.61s  
     http_reqs......................: 7498    91.801266/s
     iteration_duration.............: avg=11.84s   min=86.81ms med=10.17s  max=34.64s p(90)=24.66s  p(95)=27.36s  
     iterations.....................: 7478    91.556397/s
     vus............................: 178     min=59      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/767957a1-f406-4fb4-65d4-34fb6b440600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c4e03b5c-552e-4a10-c8a8-53753b304f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3d277f18-5544-4c5e-be89-e4e52204a200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 13702     ✗ 0     
     data_received..................: 405 MB  4.4 MB/s
     data_sent......................: 5.7 MB  61 kB/s
     http_req_blocked...............: avg=311.43µs min=2.28µs   med=5.68µs   max=14.34ms p(90)=682.69µs p(95)=1.14ms  
     http_req_connecting............: avg=268.01µs min=0s       med=0s       max=14.2ms  p(90)=587.13µs p(95)=971.69µs
     http_req_duration..............: avg=23.11s   min=12.8ms   med=21.65s   max=47.43s  p(90)=42.13s   p(95)=43.93s  
       { expected_response:true }...: avg=23.11s   min=12.8ms   med=21.65s   max=47.43s  p(90)=42.13s   p(95)=43.93s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 4602  
     http_req_receiving.............: avg=33.35ms  min=37.78µs  med=123.42µs max=2.88s   p(90)=454µs    p(95)=1.46ms  
     http_req_sending...............: avg=76.65µs  min=10.41µs  med=36.69µs  max=14.18ms p(90)=88.15µs  p(95)=133.82µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=23.08s   min=12.68ms  med=21.65s   max=44.96s  p(90)=42.13s   p(95)=43.41s  
     http_reqs......................: 4602    49.756057/s
     iteration_duration.............: avg=23.18s   min=369.21ms med=21.64s   max=47.97s  p(90)=42.28s   p(95)=43.98s  
     iterations.....................: 4538    49.0641/s
     vus............................: 19      min=19      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ec32b685-f456-40fd-ca4d-9cd3360dc600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7d7d9439-b8a9-4064-de30-9edd92e8ac00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/de4a9ccb-9bb0-42de-853a-a40e2c2d7400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 24237     ✗ 0     
     data_received..................: 711 MB  8.4 MB/s
     data_sent......................: 9.6 MB  113 kB/s
     http_req_blocked...............: avg=9.92ms min=1.78µs  med=4.25µs  max=774.8ms  p(90)=26.04ms p(95)=71.8ms 
     http_req_connecting............: avg=9.74ms min=0s      med=0s      max=323.94ms p(90)=25.2ms  p(95)=71.42ms
     http_req_duration..............: avg=11.06s min=11.88ms med=3.16s   max=57.32s   p(90)=41.85s  p(95)=49.19s 
       { expected_response:true }...: avg=11.06s min=11.88ms med=3.16s   max=57.32s   p(90)=41.85s  p(95)=49.19s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 8099  
     http_req_receiving.............: avg=8.32ms min=39.91µs med=92.06µs max=939.28ms p(90)=1.55ms  p(95)=8.6ms  
     http_req_sending...............: avg=5.97ms min=9.03µs  med=24.14µs max=820.43ms p(90)=12.12ms p(95)=28.25ms
     http_req_tls_handshaking.......: avg=0s     min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=11.05s min=11.78ms med=3.15s   max=57.26s   p(90)=41.84s  p(95)=49.17s 
     http_reqs......................: 8099    95.507498/s
     iteration_duration.............: avg=11.21s min=98.86ms med=3.28s   max=58.34s   p(90)=41.94s  p(95)=49.43s 
     iterations.....................: 8079    95.271648/s
     vus............................: 11      min=11      max=1999
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0b0559d6-ea59-43cd-47a1-e64dd398fe00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/755c771c-8c81-4abb-376c-06d143bade00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/277ed792-66b0-4c13-8fd6-4c4c58b02c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  93% — ✓ 7379 / ✗ 502
     ✗ no graphql errors
      ↳  93% — ✓ 7379 / ✗ 502
     ✓ valid response structure

     █ setup

     checks.........................: 95.66% ✓ 22137     ✗ 1004  
     data_received..................: 650 MB 7.0 MB/s
     data_sent......................: 9.4 MB 102 kB/s
     http_req_blocked...............: avg=571.68µs min=1.37µs  med=3.3µs    max=135.33ms p(90)=442.75µs p(95)=744.02µs
     http_req_connecting............: avg=547.18µs min=0s      med=0s       max=135.12ms p(90)=366.98µs p(95)=621.36µs
     http_req_duration..............: avg=11.82s   min=11.93ms med=2.19s    max=1m0s     p(90)=55.52s   p(95)=59.99s  
       { expected_response:true }...: avg=8.55s    min=11.93ms med=2.13s    max=59.99s   p(90)=36.69s   p(95)=47.17s  
     http_req_failed................: 6.35%  ✓ 502       ✗ 7399  
     http_req_receiving.............: avg=211.39µs min=0s      med=103.11µs max=245.09ms p(90)=222.23µs p(95)=347.53µs
     http_req_sending...............: avg=207.21µs min=7.88µs  med=16.29µs  max=38.18ms  p(90)=65.77µs  p(95)=120.92µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=11.81s   min=11.85ms med=2.19s    max=1m0s     p(90)=55.52s   p(95)=59.99s  
     http_reqs......................: 7901   85.243834/s
     iteration_duration.............: avg=11.86s   min=49.33ms med=2.21s    max=1m0s     p(90)=55.57s   p(95)=1m0s    
     iterations.....................: 7881   85.028055/s
     vus............................: 50     min=50      max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7d2f2d11-f262-4a24-7f0d-05118c45ea00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/37070130-f7b2-4f75-95fa-5be608826700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f6fdb8fa-1ed6-4d3a-ae10-9ab255592000/public" alt="HTTP Overview" />


  </details>