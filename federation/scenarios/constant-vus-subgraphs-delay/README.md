## Overview for: `federation/constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9d17d313-87e1-4825-5125-6c352c6f1000/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  181   | 11036 total, 0 failed | avg: 871ms, p95: 2191ms  | ✅                                                                        |
| grafbase         |  170   | 10406 total, 0 failed | avg: 882ms, p95: 2440ms  | ✅                                                                        |
| apollo-router    |  163   | 9972 total, 0 failed  | avg: 977ms, p95: 2467ms  | ✅                                                                        |
| apollo-server    |   85   | 5370 total, 73 failed | avg: 3392ms, p95: 3376ms | ❌ 73 failed requests, 73 non-200 responses, 73 unexpected GraphQL errors |
| hive-gateway-bun |   82   | 5185 total, 0 failed  | avg: 3458ms, p95: 5924ms | ✅                                                                        |
| hive-gateway     |   77   | 4907 total, 19 failed | avg: 3726ms, p95: 5489ms | ❌ 19 failed requests, 19 non-200 responses, 19 unexpected GraphQL errors |
| mercurius        |   75   | 4698 total, 0 failed  | avg: 3860ms, p95: 4942ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 33048      ✗ 0    
     data_received..................: 969 MB  16 MB/s
     data_sent......................: 13 MB   215 kB/s
     http_req_blocked...............: avg=1.22ms   min=1.61µs  med=3.35µs   max=2.82s p(90)=5.36µs p(95)=10.64µs
     http_req_connecting............: avg=712.27µs min=0s      med=0s       max=1.69s p(90)=0s     p(95)=0s     
     http_req_duration..............: avg=870.98ms min=3.34ms  med=732.98ms max=5.06s p(90)=1.77s  p(95)=2.19s  
       { expected_response:true }...: avg=870.98ms min=3.34ms  med=732.98ms max=5.06s p(90)=1.77s  p(95)=2.19s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 11036
     http_req_receiving.............: avg=284.2ms  min=33.54µs med=89.33µs  max=4.47s p(90)=1.16s  p(95)=1.64s  
     http_req_sending...............: avg=19.69ms  min=8.06µs  med=15.57µs  max=3.22s p(90)=86.8µs p(95)=3.59ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s     p(95)=0s     
     http_req_waiting...............: avg=567.08ms min=3.26ms  med=546.28ms max=2.85s p(90)=1.01s  p(95)=1.12s  
     http_reqs......................: 11036   181.239537/s
     iteration_duration.............: avg=1.63s    min=20.18ms med=1.36s    max=8.61s p(90)=3.31s  p(95)=4s     
     iterations.....................: 11016   180.911085/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dc2978f1-16f2-44da-8c14-c6ff7992ca00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/781c03cd-9a04-4040-3294-90944b9f0900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/506f3850-53b1-4c05-073f-c8ee58f91b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31158      ✗ 0    
     data_received..................: 914 MB  15 MB/s
     data_sent......................: 12 MB   203 kB/s
     http_req_blocked...............: avg=1.2ms    min=1.54µs  med=3.49µs   max=2.08s  p(90)=5.28µs   p(95)=10.81µs
     http_req_connecting............: avg=672.78µs min=0s      med=0s       max=1.18s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=881.92ms min=3.22ms  med=693.26ms max=6.68s  p(90)=1.93s    p(95)=2.43s  
       { expected_response:true }...: avg=881.92ms min=3.22ms  med=693.26ms max=6.68s  p(90)=1.93s    p(95)=2.43s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10406
     http_req_receiving.............: avg=318.45ms min=33.92µs med=88.96µs  max=6.25s  p(90)=1.3s     p(95)=1.94s  
     http_req_sending...............: avg=19.43ms  min=7.57µs  med=16.29µs  max=3.21s  p(90)=129.46µs p(95)=11.89ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=544.03ms min=3.01ms  med=516.23ms max=2.57s  p(90)=998.73ms p(95)=1.18s  
     http_reqs......................: 10406   170.96353/s
     iteration_duration.............: avg=1.72s    min=19.56ms med=1.45s    max=10.53s p(90)=3.57s    p(95)=4.25s  
     iterations.....................: 10386   170.634943/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6f4e4c84-af74-4cea-1736-67fee8ea4500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/92e01779-8b76-438a-317b-de62ce19b300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b7c648a1-7925-4cee-3987-fae332eaca00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 29856      ✗ 0    
     data_received..................: 875 MB  14 MB/s
     data_sent......................: 12 MB   194 kB/s
     http_req_blocked...............: avg=1.93ms   min=1.49µs  med=3.26µs   max=2.12s p(90)=5.2µs    p(95)=11.1µs 
     http_req_connecting............: avg=1.36ms   min=0s      med=0s       max=2.12s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=976.87ms min=7.24ms  med=827.99ms max=5.56s p(90)=2s       p(95)=2.46s  
       { expected_response:true }...: avg=976.87ms min=7.24ms  med=827.99ms max=5.56s p(90)=2s       p(95)=2.46s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 9972 
     http_req_receiving.............: avg=284.29ms min=33.13µs med=83.71µs  max=5.11s p(90)=1.24s    p(95)=1.85s  
     http_req_sending...............: avg=28.76ms  min=7.65µs  med=15.2µs   max=2.91s p(90)=142.74µs p(95)=20.16ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=663.81ms min=6.99ms  med=636.26ms max=3.13s p(90)=1.11s    p(95)=1.29s  
     http_reqs......................: 9972    163.382342/s
     iteration_duration.............: avg=1.81s    min=32.38ms med=1.55s    max=8.38s p(90)=3.52s    p(95)=4.23s  
     iterations.....................: 9952    163.05466/s
     vus............................: 34      min=34       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/887fdb29-8e99-4572-71b9-359565aef000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6aeba3f3-c120-4fc7-665a-1714c96a1200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b4f3d4b8-f759-4345-179f-648811b5dd00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5277 / ✗ 73
     ✗ no graphql errors
      ↳  98% — ✓ 5277 / ✗ 73
     ✓ valid response structure

     █ setup

     checks.........................: 99.08% ✓ 15831     ✗ 146  
     data_received..................: 466 MB 7.4 MB/s
     data_sent......................: 6.4 MB 102 kB/s
     http_req_blocked...............: avg=183.15µs min=1.48µs   med=3.35µs   max=12.96ms  p(90)=5.44µs   p(95)=264.01µs
     http_req_connecting............: avg=174.08µs min=0s       med=0s       max=12.15ms  p(90)=0s       p(95)=189.9µs 
     http_req_duration..............: avg=3.39s    min=11.11ms  med=1.98s    max=1m0s     p(90)=2.67s    p(95)=3.37s   
       { expected_response:true }...: avg=2.61s    min=11.11ms  med=1.97s    max=59.75s   p(90)=2.62s    p(95)=3s      
     http_req_failed................: 1.35%  ✓ 73        ✗ 5297 
     http_req_receiving.............: avg=288.86µs min=0s       med=107.72µs max=302.69ms p(90)=208.39µs p(95)=342.87µs
     http_req_sending...............: avg=150.84µs min=8.67µs   med=18.59µs  max=55.5ms   p(90)=38.89µs  p(95)=187.86µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.39s    min=11.01ms  med=1.98s    max=1m0s     p(90)=2.67s    p(95)=3.37s   
     http_reqs......................: 5370   85.861949/s
     iteration_duration.............: avg=3.42s    min=231.91ms med=2.01s    max=1m0s     p(90)=2.69s    p(95)=3.41s   
     iterations.....................: 5350   85.542165/s
     vus............................: 98     min=98      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9a07a502-2417-48e9-59cf-61e835640700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8dda7d0d-4b70-4319-a475-5ea582635f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a5e6ed3b-4dba-44f8-f8bc-b18737f31900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 15495     ✗ 0    
     data_received..................: 455 MB  7.2 MB/s
     data_sent......................: 6.2 MB  98 kB/s
     http_req_blocked...............: avg=2.25ms  min=1.52µs   med=4.39µs   max=76.27ms  p(90)=6.91µs   p(95)=20.38ms 
     http_req_connecting............: avg=2.2ms   min=0s       med=0s       max=74.4ms   p(90)=0s       p(95)=20.17ms 
     http_req_duration..............: avg=3.45s   min=17.51ms  med=3.13s    max=7.6s     p(90)=5.13s    p(95)=5.92s   
       { expected_response:true }...: avg=3.45s   min=17.51ms  med=3.13s    max=7.6s     p(90)=5.13s    p(95)=5.92s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5185 
     http_req_receiving.............: avg=56.97ms min=41.5µs   med=149.72µs max=1.98s    p(90)=48.27ms  p(95)=425.71ms
     http_req_sending...............: avg=1.8ms   min=8.04µs   med=24.36µs  max=745.92ms p(90)=154.47µs p(95)=7.01ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.39s   min=17.36ms  med=3.11s    max=7.6s     p(90)=5.11s    p(95)=5.88s   
     http_reqs......................: 5185    82.472121/s
     iteration_duration.............: avg=3.55s   min=304.38ms med=3.19s    max=7.66s    p(90)=5.24s    p(95)=6s      
     iterations.....................: 5165    82.154003/s
     vus............................: 168     min=168     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a681e3ca-274e-4c65-3f53-4fb1da489b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3bfe2dcc-cad5-4480-24ca-b14ad4774600/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e3a449a0-5e1f-4190-ef15-fa6137567b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 4868 / ✗ 19
     ✗ no graphql errors
      ↳  99% — ✓ 4868 / ✗ 19
     ✓ valid response structure

     █ setup

     checks.........................: 99.74% ✓ 14604     ✗ 38   
     data_received..................: 429 MB 6.8 MB/s
     data_sent......................: 5.8 MB 92 kB/s
     http_req_blocked...............: avg=849.92µs min=1.53µs   med=4.03µs   max=40.8ms   p(90)=6.29µs   p(95)=951.16µs
     http_req_connecting............: avg=811.9µs  min=0s       med=0s       max=38.29ms  p(90)=0s       p(95)=517.78µs
     http_req_duration..............: avg=3.72s    min=15.01ms  med=2.55s    max=1m0s     p(90)=3.62s    p(95)=5.48s   
       { expected_response:true }...: avg=3.5s     min=15.01ms  med=2.54s    max=59.51s   p(90)=3.57s    p(95)=5.29s   
     http_req_failed................: 0.38%  ✓ 19        ✗ 4888 
     http_req_receiving.............: avg=856.56µs min=0s       med=109.49µs max=176.99ms p(90)=469.02µs p(95)=1.39ms  
     http_req_sending...............: avg=457.02µs min=8.66µs   med=22.74µs  max=109.02ms p(90)=59.95µs  p(95)=262.34µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.72s    min=14.9ms   med=2.54s    max=1m0s     p(90)=3.61s    p(95)=5.48s   
     http_reqs......................: 4907   77.728414/s
     iteration_duration.............: avg=3.76s    min=208.29ms med=2.57s    max=1m0s     p(90)=3.65s    p(95)=5.51s   
     iterations.....................: 4887   77.411608/s
     vus............................: 40     min=40      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e1cb94c0-9563-4b9f-3c8c-de605541cf00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e3d03308-bd71-4212-09a9-f26d5c053200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9b80458e-e3f9-407e-8b34-80a80910cc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14034     ✗ 0    
     data_received..................: 412 MB  6.7 MB/s
     data_sent......................: 5.6 MB  90 kB/s
     http_req_blocked...............: avg=1.12ms  min=1.75µs   med=4.12µs   max=68.63ms  p(90)=6.34µs   p(95)=5.07ms  
     http_req_connecting............: avg=1.07ms  min=0s       med=0s       max=64.67ms  p(90)=0s       p(95)=4.64ms  
     http_req_duration..............: avg=3.85s   min=11.66ms  med=3.85s    max=8.16s    p(90)=4.67s    p(95)=4.94s   
       { expected_response:true }...: avg=3.85s   min=11.66ms  med=3.85s    max=8.16s    p(90)=4.67s    p(95)=4.94s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4698 
     http_req_receiving.............: avg=6.94ms  min=41.4µs   med=108.25µs max=829.46ms p(90)=297.74µs p(95)=708.37µs
     http_req_sending...............: avg=795.2µs min=9.81µs   med=23.08µs  max=64.12ms  p(90)=46.58µs  p(95)=1.84ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.85s   min=11.56ms  med=3.85s    max=8.16s    p(90)=4.67s    p(95)=4.94s   
     http_reqs......................: 4698    75.873186/s
     iteration_duration.............: avg=3.9s    min=471.52ms med=3.87s    max=8.25s    p(90)=4.68s    p(95)=4.96s   
     iterations.....................: 4678    75.550184/s
     vus............................: 229     min=229     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ddf4dc42-0792-43c0-86d4-f19f91f63000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/671e084c-61ae-4246-5af1-421e401a4c00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ac8dd00d-fa36-459f-04ba-0efd27b5ce00/public" alt="HTTP Overview" />


  </details>