## Overview for: `federation/constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bbf7d1a4-7cc7-4bbb-957b-22d7f2cda100/public" alt="Comparison" />


| Gateway       | RPS ⬇️ |        Requests        |         Duration          | Notes                                                                       |
| :------------ | :----: | :--------------------: | :-----------------------: | :-------------------------------------------------------------------------- |
| cosmo         |  179   | 10997 total, 0 failed  | avg: 1311ms, p95: 3713ms  | ✅                                                                           |
| apollo-router |  162   | 10022 total, 0 failed  | avg: 1341ms, p95: 3553ms  | ✅                                                                           |
| hive-gateway  |   90   | 5878 total, 72 failed  | avg: 5217ms, p95: 16956ms | ❌ 72 failed requests, 72 non-200 responses, 72 unexpected GraphQL errors    |
| apollo-server |   79   | 5249 total, 280 failed | avg: 5795ms, p95: 59980ms | ❌ 280 failed requests, 280 non-200 responses, 280 unexpected GraphQL errors |
| mercurius     |   65   |  4133 total, 0 failed  | avg: 7392ms, p95: 11168ms | ✅                                                                           |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32931      ✗ 0    
     data_received..................: 965 MB  16 MB/s
     data_sent......................: 13 MB   213 kB/s
     http_req_blocked...............: avg=4.55ms   min=1.35µs  med=3.16µs   max=3.93s  p(90)=5.1µs   p(95)=37.15µs
     http_req_connecting............: avg=3.74ms   min=0s      med=0s       max=3.93s  p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=1.31s    min=3.43ms  med=1.07s    max=8.09s  p(90)=2.62s   p(95)=3.71s  
       { expected_response:true }...: avg=1.31s    min=3.43ms  med=1.07s    max=8.09s  p(90)=2.62s   p(95)=3.71s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10997
     http_req_receiving.............: avg=499.71ms min=34.13µs med=99.16µs  max=7.16s  p(90)=1.74s   p(95)=2.87s  
     http_req_sending...............: avg=27.59ms  min=7.84µs  med=14.21µs  max=4.59s  p(90)=282.5µs p(95)=52.48ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=784.15ms min=3.34ms  med=758.44ms max=3.3s   p(90)=1.4s    p(95)=1.68s  
     http_reqs......................: 10997   179.245807/s
     iteration_duration.............: avg=2.72s    min=19.16ms med=2.25s    max=17.18s p(90)=5.6s    p(95)=6.71s  
     iterations.....................: 10977   178.919816/s
     vus............................: 166     min=166      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/caeefc7e-42ea-4b03-1033-ec47c6898b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2de1152e-6485-4bdb-7060-55014b49ed00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4ee2ca6a-4bac-42a5-c7ca-ae05fe8f8e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30006      ✗ 0    
     data_received..................: 879 MB  14 MB/s
     data_sent......................: 12 MB   193 kB/s
     http_req_blocked...............: avg=4.17ms   min=1.55µs  med=3.78µs   max=4.18s  p(90)=6.57µs   p(95)=3.04ms 
     http_req_connecting............: avg=3.58ms   min=0s      med=0s       max=3.44s  p(90)=0s       p(95)=1.89ms 
     http_req_duration..............: avg=1.34s    min=6.71ms  med=1.15s    max=8.87s  p(90)=2.85s    p(95)=3.55s  
       { expected_response:true }...: avg=1.34s    min=6.71ms  med=1.15s    max=8.87s  p(90)=2.85s    p(95)=3.55s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10022
     http_req_receiving.............: avg=523.41ms min=32.18µs med=158.89µs max=8.37s  p(90)=1.86s    p(95)=2.63s  
     http_req_sending...............: avg=46.19ms  min=8.22µs  med=18.42µs  max=4.49s  p(90)=455.87µs p(95)=26.31ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=771.75ms min=6.62ms  med=652.77ms max=3.79s  p(90)=1.59s    p(95)=1.91s  
     http_reqs......................: 10022   162.791204/s
     iteration_duration.............: avg=2.97s    min=33.44ms med=2.53s    max=15.65s p(90)=6.02s    p(95)=7.34s  
     iterations.....................: 10002   162.466336/s
     vus............................: 272     min=272      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5fac7ca9-fd67-4aa4-3d5a-58e95dd7d100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/397fc4b1-4934-4d49-bc50-408881ef4000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c4ff99e0-08a1-4c5d-7d0c-17dd5dcac900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5786 / ✗ 72
     ✗ no graphql errors
      ↳  98% — ✓ 5786 / ✗ 72
     ✓ valid response structure

     █ setup

     checks.........................: 99.17% ✓ 17358     ✗ 144  
     data_received..................: 510 MB 7.9 MB/s
     data_sent......................: 7.0 MB 108 kB/s
     http_req_blocked...............: avg=5.04ms min=1.95µs   med=4.53µs  max=162.32ms p(90)=13.44µs p(95)=60.38ms
     http_req_connecting............: avg=4.88ms min=0s       med=0s      max=143.01ms p(90)=0s      p(95)=59.18ms
     http_req_duration..............: avg=5.21s  min=12.85ms  med=3.22s   max=1m0s     p(90)=5.05s   p(95)=16.95s 
       { expected_response:true }...: avg=4.53s  min=12.85ms  med=3.21s   max=1m0s     p(90)=4.82s   p(95)=8.59s  
     http_req_failed................: 1.22%  ✓ 72        ✗ 5806 
     http_req_receiving.............: avg=6.73ms min=0s       med=95.18µs max=475.67ms p(90)=3.74ms  p(95)=14.79ms
     http_req_sending...............: avg=2.79ms min=9.72µs   med=23.76µs max=317.71ms p(90)=314µs   p(95)=25.4ms 
     http_req_tls_handshaking.......: avg=0s     min=0s       med=0s      max=0s       p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=5.2s   min=12.72ms  med=3.22s   max=1m0s     p(90)=5s      p(95)=16.91s 
     http_reqs......................: 5878   90.922974/s
     iteration_duration.............: avg=5.3s   min=157.74ms med=3.3s    max=1m0s     p(90)=5.17s   p(95)=17.3s  
     iterations.....................: 5858   90.613607/s
     vus............................: 111    min=111     max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4589dd15-d1fe-4fc4-8bab-9b79ea3ce900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f01d572b-eac0-4f0a-fba2-490fa20a9f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b7f2b065-8b9b-4cad-77fb-3232907cbf00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  94% — ✓ 4949 / ✗ 280
     ✗ no graphql errors
      ↳  94% — ✓ 4949 / ✗ 280
     ✓ valid response structure

     █ setup

     checks.........................: 96.36% ✓ 14847     ✗ 560  
     data_received..................: 437 MB 6.6 MB/s
     data_sent......................: 6.2 MB 95 kB/s
     http_req_blocked...............: avg=2.33ms   min=1.32µs   med=2.83µs   max=59.09ms p(90)=190.9µs  p(95)=16.3ms  
     http_req_connecting............: avg=2.28ms   min=0s       med=0s       max=55.78ms p(90)=126.91µs p(95)=14.05ms 
     http_req_duration..............: avg=5.79s    min=12.69ms  med=2.09s    max=1m0s    p(90)=3.37s    p(95)=59.97s  
       { expected_response:true }...: avg=2.74s    min=12.69ms  med=2.06s    max=59.79s  p(90)=2.64s    p(95)=3.32s   
     http_req_failed................: 5.33%  ✓ 280       ✗ 4969 
     http_req_receiving.............: avg=159.6µs  min=0s       med=102.12µs max=26.19ms p(90)=169.14µs p(95)=199.88µs
     http_req_sending...............: avg=194.13µs min=8.05µs   med=14.35µs  max=53.99ms p(90)=96.92µs  p(95)=1.09ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.79s    min=12.59ms  med=2.09s    max=1m0s    p(90)=3.37s    p(95)=59.97s  
     http_reqs......................: 5249   79.703946/s
     iteration_duration.............: avg=5.83s    min=421.83ms med=2.11s    max=1m0s    p(90)=3.44s    p(95)=1m0s    
     iterations.....................: 5229   79.400254/s
     vus............................: 33     min=33      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/98430e97-0b08-49b6-3a46-d3b20dd3f000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/76880a67-140a-4324-693d-a73f15907f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0ca35873-d09a-43da-556c-620651acf700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 12339     ✗ 0    
     data_received..................: 363 MB  5.7 MB/s
     data_sent......................: 4.9 MB  78 kB/s
     http_req_blocked...............: avg=2.83ms   min=1.49µs   med=4.58µs  max=57.19ms  p(90)=1.88ms   p(95)=37.5ms  
     http_req_connecting............: avg=2.78ms   min=0s       med=0s      max=57.16ms  p(90)=1.49ms   p(95)=37.22ms 
     http_req_duration..............: avg=7.39s    min=15.71ms  med=7.28s   max=16.16s   p(90)=9.1s     p(95)=11.16s  
       { expected_response:true }...: avg=7.39s    min=15.71ms  med=7.28s   max=16.16s   p(90)=9.1s     p(95)=11.16s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 4133 
     http_req_receiving.............: avg=4.8ms    min=40.87µs  med=114.5µs max=428.72ms p(90)=200.67µs p(95)=387.97µs
     http_req_sending...............: avg=143.93µs min=9µs      med=27.05µs max=9.87ms   p(90)=261.29µs p(95)=1.02ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=7.38s    min=15.55ms  med=7.28s   max=16.16s   p(90)=9.09s    p(95)=11.16s  
     http_reqs......................: 4133    65.375733/s
     iteration_duration.............: avg=7.45s    min=604.54ms med=7.29s   max=16.17s   p(90)=9.11s    p(95)=11.27s  
     iterations.....................: 4113    65.059373/s
     vus............................: 93      min=93      max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f07b68e6-e5fc-4339-0e67-b4c38a6a7f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/87a12956-3656-4792-9235-1330d98b0000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b49d8b7c-6147-44d8-b403-91ab8cb0fa00/public" alt="HTTP Overview" />


  </details>