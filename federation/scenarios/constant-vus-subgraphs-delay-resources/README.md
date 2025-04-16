## Overview for: `federation/constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 30s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1d6165ee-6b54-47b6-8bc8-5d12c6177b00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration          | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :-----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  177   | 5608 total, 0 failed  | avg: 1320ms, p95: 3481ms  | ✅                                                                        |
| grafbase         |  167   | 5276 total, 0 failed  | avg: 1493ms, p95: 3781ms  | ✅                                                                        |
| apollo-router    |  160   | 5036 total, 28 failed | avg: 1594ms, p95: 5420ms  | ❌ 28 failed requests, 28 non-200 responses, 28 unexpected GraphQL errors |
| apollo-server    |   85   | 3076 total, 0 failed  | avg: 5308ms, p95: 33771ms | ✅                                                                        |
| hive-gateway-bun |   85   | 2955 total, 0 failed  | avg: 5350ms, p95: 9737ms  | ✅                                                                        |
| mercurius        |   73   | 2436 total, 0 failed  | avg: 6404ms, p95: 10873ms | ✅                                                                        |
| hive-gateway     |   70   | 2566 total, 0 failed  | avg: 6356ms, p95: 33936ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 16764      ✗ 0    
     data_received..................: 492 MB  16 MB/s
     data_sent......................: 6.7 MB  211 kB/s
     http_req_blocked...............: avg=1.54ms   min=1.51µs  med=3.67µs   max=1.51s  p(90)=19.57µs  p(95)=6.22ms
     http_req_connecting............: avg=1.34ms   min=0s      med=0s       max=1.51s  p(90)=0s       p(95)=5.42ms
     http_req_duration..............: avg=1.32s    min=3.27ms  med=1.09s    max=6.65s  p(90)=2.79s    p(95)=3.48s 
       { expected_response:true }...: avg=1.32s    min=3.27ms  med=1.09s    max=6.65s  p(90)=2.79s    p(95)=3.48s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 5608 
     http_req_receiving.............: avg=496.44ms min=27.87µs med=102.94µs max=6.55s  p(90)=2.02s    p(95)=2.71s 
     http_req_sending...............: avg=24.26ms  min=8.07µs  med=17.6µs   max=4.79s  p(90)=604.83µs p(95)=6.05ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=799.58ms min=3.09ms  med=715.02ms max=5.16s  p(90)=1.54s    p(95)=1.75s 
     http_reqs......................: 5608    177.876203/s
     iteration_duration.............: avg=2.72s    min=20.27ms med=2.28s    max=12.49s p(90)=5.73s    p(95)=7.05s 
     iterations.....................: 5588    177.241837/s
     vus............................: 271     min=271      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b7685648-9195-4e86-261c-20b8d5c63500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c9f65ee7-8c7d-46bc-7887-dad463d40700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/86835890-2ee8-4430-50a1-90b05c879d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 15768      ✗ 0    
     data_received..................: 464 MB  15 MB/s
     data_sent......................: 6.3 MB  199 kB/s
     http_req_blocked...............: avg=3.02ms   min=1.42µs  med=3.49µs   max=3.95s  p(90)=31.72µs  p(95)=9.18ms
     http_req_connecting............: avg=2.88ms   min=0s      med=0s       max=3.95s  p(90)=0s       p(95)=8.84ms
     http_req_duration..............: avg=1.49s    min=3.42ms  med=1.28s    max=6.34s  p(90)=2.95s    p(95)=3.78s 
       { expected_response:true }...: avg=1.49s    min=3.42ms  med=1.28s    max=6.34s  p(90)=2.95s    p(95)=3.78s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 5276 
     http_req_receiving.............: avg=395.31ms min=31.24µs med=86.85µs  max=5.33s  p(90)=1.63s    p(95)=1.99s 
     http_req_sending...............: avg=29.82ms  min=7.74µs  med=16.03µs  max=3.99s  p(90)=891.52µs p(95)=16.9ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=1.06s    min=3.34ms  med=873.36ms max=4.35s  p(90)=2.08s    p(95)=2.89s 
     http_reqs......................: 5276    167.574013/s
     iteration_duration.............: avg=2.88s    min=18.35ms med=2.57s    max=11.37s p(90)=5.44s    p(95)=6.34s 
     iterations.....................: 5256    166.938782/s
     vus............................: 195     min=195      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b0948545-cbd2-4b40-1ebb-3faeeacdd700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/601cb944-44e7-47f2-fdec-dfbf3a31d800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/45681557-887e-490d-101c-a59b0d7fb000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 4988 / ✗ 28
     ✗ no graphql errors
      ↳  99% — ✓ 4988 / ✗ 28
     ✓ valid response structure

     █ setup

     checks.........................: 99.62% ✓ 14964      ✗ 56   
     data_received..................: 439 MB 14 MB/s
     data_sent......................: 6.0 MB 190 kB/s
     http_req_blocked...............: avg=12.64ms  min=1.49µs  med=3.32µs   max=4.03s  p(90)=2.15ms   p(95)=17.42ms
     http_req_connecting............: avg=11.47ms  min=0s      med=0s       max=4.03s  p(90)=831.55µs p(95)=17.09ms
     http_req_duration..............: avg=1.59s    min=6.82ms  med=1.08s    max=10.89s p(90)=4s       p(95)=5.42s  
       { expected_response:true }...: avg=1.59s    min=6.82ms  med=1.08s    max=10.89s p(90)=4.02s    p(95)=5.42s  
     http_req_failed................: 0.55%  ✓ 28         ✗ 5008 
     http_req_receiving.............: avg=686.27ms min=0s      med=105.01µs max=8.01s  p(90)=2.78s    p(95)=4.25s  
     http_req_sending...............: avg=38.95ms  min=8.18µs  med=15.51µs  max=5.97s  p(90)=1.24ms   p(95)=13.57ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=869.24ms min=6.73ms  med=748.65ms max=3.92s  p(90)=1.72s    p(95)=2.21s  
     http_reqs......................: 5036   160.241268/s
     iteration_duration.............: avg=3.03s    min=38.39ms med=2.34s    max=17.07s p(90)=6.35s    p(95)=8.17s  
     iterations.....................: 5016   159.604885/s
     vus............................: 214    min=214      max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1d7ef6dc-3ec8-4f4a-bc08-ec064081e700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3448235b-532f-482f-4ab8-a90711c8d400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0766232f-0d4f-40fe-af14-bbd5414e2100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 9168      ✗ 0    
     data_received..................: 270 MB  7.5 MB/s
     data_sent......................: 3.7 MB  101 kB/s
     http_req_blocked...............: avg=4.5ms    min=1.41µs   med=3.05µs   max=68.37ms p(90)=19.95ms  p(95)=39.13ms 
     http_req_connecting............: avg=4.38ms   min=0s       med=0s       max=61.97ms p(90)=19.54ms  p(95)=38.86ms 
     http_req_duration..............: avg=5.3s     min=10.93ms  med=1.56s    max=35.55s  p(90)=31.95s   p(95)=33.77s  
       { expected_response:true }...: avg=5.3s     min=10.93ms  med=1.56s    max=35.55s  p(90)=31.95s   p(95)=33.77s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 3076 
     http_req_receiving.............: avg=267.68µs min=44.45µs  med=100.36µs max=66.81ms p(90)=221.71µs p(95)=479.86µs
     http_req_sending...............: avg=1.96ms   min=8.86µs   med=15.48µs  max=43.75ms p(90)=9.15ms   p(95)=14.93ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.3s     min=10.83ms  med=1.56s    max=35.55s  p(90)=31.95s   p(95)=33.75s  
     http_reqs......................: 3076    85.408113/s
     iteration_duration.............: avg=5.36s    min=362.72ms med=1.57s    max=35.55s  p(90)=32.03s   p(95)=33.82s  
     iterations.....................: 3056    84.852794/s
     vus............................: 7       min=7       max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/005d35ca-3539-47e8-48b1-70ffee1b9200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3e2bca5f-7f47-4b86-4704-54f09e29cf00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/530d9aab-9648-4f70-515e-a29d0e298100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 8805      ✗ 0    
     data_received..................: 259 MB  7.5 MB/s
     data_sent......................: 3.5 MB  101 kB/s
     http_req_blocked...............: avg=7.58ms  min=2.01µs   med=4.5µs    max=112.85ms p(90)=34.11ms p(95)=56.54ms 
     http_req_connecting............: avg=7.45ms  min=0s       med=0s       max=112.82ms p(90)=33.37ms p(95)=55.76ms 
     http_req_duration..............: avg=5.34s   min=20.05ms  med=4.97s    max=11.29s   p(90)=8.71s   p(95)=9.73s   
       { expected_response:true }...: avg=5.34s   min=20.05ms  med=4.97s    max=11.29s   p(90)=8.71s   p(95)=9.73s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 2955 
     http_req_receiving.............: avg=62.31ms min=40.51µs  med=243.86µs max=3s       p(90)=8.08ms  p(95)=224.04ms
     http_req_sending...............: avg=1.6ms   min=9.89µs   med=25.75µs  max=370.6ms  p(90)=1.6ms   p(95)=5.82ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=5.28s   min=19.83ms  med=4.93s    max=11.29s   p(90)=8.7s    p(95)=9.73s   
     http_reqs......................: 2955    85.169217/s
     iteration_duration.............: avg=5.48s   min=288.22ms med=5.06s    max=11.33s   p(90)=8.78s   p(95)=9.86s   
     iterations.....................: 2935    84.592776/s
     vus............................: 131     min=131     max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ee61e2a3-0f1e-4af0-4cd1-cc9829575e00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dff87a9c-6cd7-4a0c-0a8d-530303d96800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2d159718-0a4b-41f0-c21a-968472a2de00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 7248      ✗ 0    
     data_received..................: 214 MB  6.5 MB/s
     data_sent......................: 2.9 MB  88 kB/s
     http_req_blocked...............: avg=2.85ms   min=1.66µs  med=3.98µs  max=40.93ms  p(90)=15.92ms  p(95)=21.7ms 
     http_req_connecting............: avg=2.78ms   min=0s      med=0s      max=28.26ms  p(90)=15.29ms  p(95)=21.56ms
     http_req_duration..............: avg=6.4s     min=11.15ms med=6.84s   max=13.17s   p(90)=8.06s    p(95)=10.87s 
       { expected_response:true }...: avg=6.4s     min=11.15ms med=6.84s   max=13.17s   p(90)=8.06s    p(95)=10.87s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 2436 
     http_req_receiving.............: avg=16.15ms  min=39.58µs med=99.67µs max=696.07ms p(90)=363.2µs  p(95)=3.17ms 
     http_req_sending...............: avg=233.86µs min=8.84µs  med=23.26µs max=11.14ms  p(90)=847.13µs p(95)=1.36ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=6.38s    min=11.05ms med=6.84s   max=13.17s   p(90)=8.06s    p(95)=10.86s 
     http_reqs......................: 2436    73.895537/s
     iteration_duration.............: avg=6.49s    min=450.4ms med=6.85s   max=13.18s   p(90)=8.07s    p(95)=10.91s 
     iterations.....................: 2416    73.288841/s
     vus............................: 7       min=7       max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a778c273-393f-44c6-ad04-c4e7aae42000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a7458bf1-ea22-473e-132f-4e35357ce800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4f1e545e-9c53-4a13-77da-2189a58d0700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 7638      ✗ 0    
     data_received..................: 225 MB  6.2 MB/s
     data_sent......................: 3.0 MB  83 kB/s
     http_req_blocked...............: avg=12.17ms  min=2.42µs   med=5.08µs   max=183.39ms p(90)=58.57ms  p(95)=91.64ms
     http_req_connecting............: avg=4.82ms   min=0s       med=0s       max=162.33ms p(90)=13.29ms  p(95)=40.98ms
     http_req_duration..............: avg=6.35s    min=17.96ms  med=2.51s    max=35.78s   p(90)=32.04s   p(95)=33.93s 
       { expected_response:true }...: avg=6.35s    min=17.96ms  med=2.51s    max=35.78s   p(90)=32.04s   p(95)=33.93s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 2566 
     http_req_receiving.............: avg=723.41µs min=44.55µs  med=128.22µs max=106.95ms p(90)=878.94µs p(95)=2.74ms 
     http_req_sending...............: avg=1.95ms   min=12.23µs  med=33.49µs  max=102.55ms p(90)=1.85ms   p(95)=10.83ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=6.35s    min=17.84ms  med=2.51s    max=35.78s   p(90)=32s      p(95)=33.93s 
     http_reqs......................: 2566    70.189669/s
     iteration_duration.............: avg=6.44s    min=562.27ms med=2.54s    max=35.79s   p(90)=32.51s   p(95)=34.07s 
     iterations.....................: 2546    69.642595/s
     vus............................: 51      min=51      max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/359082e8-4b3d-410b-1265-9b46f4211d00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/83f56caa-bbb2-4e72-c93c-2028337d3200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/deabd5d3-da4d-42f5-6c0d-a64868493900/public" alt="HTTP Overview" />


  </details>