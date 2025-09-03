## Overview for: `constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a1b18e91-1e42-4196-b7b9-813305243400/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration         | Notes                          |
| :--------------- | :----: | :--------------------: | :----------------------: | :----------------------------- |
| hive-router      |  2120  | 130684 total, 0 failed |  avg: 137ms, p95: 226ms  | ✅                              |
| cosmo            |  701   | 43928 total, 0 failed  |  avg: 410ms, p95: 573ms  | ✅                              |
| grafbase         |  462   | 28938 total, 0 failed  |  avg: 622ms, p95: 806ms  | ✅                              |
| apollo-router    |  380   | 24720 total, 0 failed  |  avg: 728ms, p95: 986ms  | ❌ 10 unexpected GraphQL errors |
| hive-gateway     |  143   |  9745 total, 0 failed  | avg: 1861ms, p95: 2427ms | ✅                              |
| hive-gateway-bun |  130   |  8932 total, 0 failed  | avg: 2031ms, p95: 2657ms | ✅                              |
| mercurius        |   87   |  5914 total, 0 failed  | avg: 3051ms, p95: 4326ms | ✅                              |
| apollo-gateway   |   82   |  5691 total, 0 failed  | avg: 3249ms, p95: 6116ms | ✅                              |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 390252      ✗ 0     
     data_received..................: 12 GB   186 MB/s
     data_sent......................: 152 MB  2.5 MB/s
     http_req_blocked...............: avg=111.47µs min=1.14µs  med=2.53µs   max=162.22ms p(90)=3.89µs   p(95)=4.63µs   p(99.9)=46.05ms
     http_req_connecting............: avg=108.16µs min=0s      med=0s       max=162.19ms p(90)=0s       p(95)=0s       p(99.9)=46.04ms
     http_req_duration..............: avg=137.27ms min=1.96ms  med=116.77ms max=2.63s    p(90)=209.94ms p(95)=226.15ms p(99.9)=1.99s  
       { expected_response:true }...: avg=137.27ms min=1.96ms  med=116.77ms max=2.63s    p(90)=209.94ms p(95)=226.15ms p(99.9)=1.99s  
     http_req_failed................: 0.00%   ✓ 0           ✗ 130684
     http_req_receiving.............: avg=547µs    min=24.26µs med=44.11µs  max=1s       p(90)=270.16µs p(95)=404.55µs p(99.9)=69.62ms
     http_req_sending...............: avg=303.28µs min=5.45µs  med=10µs     max=2.31s    p(90)=93.79µs  p(95)=130.89µs p(99.9)=65.64ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=136.42ms min=1.91ms  med=116.08ms max=2.51s    p(90)=208.93ms p(95)=224.94ms p(99.9)=1.93s  
     http_reqs......................: 130684  2120.639226/s
     iteration_duration.............: avg=138.4ms  min=11.45ms med=117.25ms max=2.8s     p(90)=210.26ms p(95)=226.47ms p(99.9)=2.1s   
     iterations.....................: 130084  2110.902889/s
     success_rate...................: 100.00% ✓ 130084      ✗ 0     
     vus............................: 300     min=0         max=300 
     vus_max........................: 300     min=300       max=300 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0057a250-991c-4608-6929-3d56c9594900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/087dea5c-5dcf-4f1e-b160-36cc6b2d3600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 129984     ✗ 0    
     data_received..................: 3.9 GB  62 MB/s
     data_sent......................: 51 MB   816 kB/s
     http_req_blocked...............: avg=277.57µs min=1.34µs  med=2.73µs   max=77.45ms  p(90)=3.9µs    p(95)=5.02µs   p(99.9)=59.03ms
     http_req_connecting............: avg=272.63µs min=0s      med=0s       max=77.4ms   p(90)=0s       p(95)=0s       p(99.9)=59ms   
     http_req_duration..............: avg=409.73ms min=2.91ms  med=392.96ms max=3.11s    p(90)=522.22ms p(95)=572.59ms p(99.9)=2.62s  
       { expected_response:true }...: avg=409.73ms min=2.91ms  med=392.96ms max=3.11s    p(90)=522.22ms p(95)=572.59ms p(99.9)=2.62s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 43928
     http_req_receiving.............: avg=903.76µs min=31.19µs med=71.81µs  max=785.96ms p(90)=216.19µs p(95)=488.32µs p(99.9)=86.31ms
     http_req_sending...............: avg=300.14µs min=6.37µs  med=11.12µs  max=1.11s    p(90)=29.28µs  p(95)=124.34µs p(99.9)=13.41ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=408.53ms min=2.82ms  med=392.1ms  max=3.05s    p(90)=520.68ms p(95)=571.45ms p(99.9)=2.61s  
     http_reqs......................: 43928   701.169767/s
     iteration_duration.............: avg=416.49ms min=73.73ms med=394.68ms max=3.24s    p(90)=523.62ms p(95)=574.31ms p(99.9)=2.77s  
     iterations.....................: 43328   691.592689/s
     success_rate...................: 100.00% ✓ 43328      ✗ 0    
     vus............................: 300     min=0        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f7772b87-e038-4da6-c95b-45476ad05700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7ced1ea0-b04c-4ceb-8565-8f60d167eb00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 85014      ✗ 0    
     data_received..................: 2.5 GB  41 MB/s
     data_sent......................: 34 MB   538 kB/s
     http_req_blocked...............: avg=598.09µs min=1.34µs   med=3.36µs   max=112.66ms p(90)=5.31µs   p(95)=9.16µs   p(99.9)=95.06ms
     http_req_connecting............: avg=587.19µs min=0s       med=0s       max=112.64ms p(90)=0s       p(95)=0s       p(99.9)=95.04ms
     http_req_duration..............: avg=622.19ms min=2.8ms    med=607.53ms max=3.18s    p(90)=744.74ms p(95)=805.72ms p(99.9)=2.94s  
       { expected_response:true }...: avg=622.19ms min=2.8ms    med=607.53ms max=3.18s    p(90)=744.74ms p(95)=805.72ms p(99.9)=2.94s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 28938
     http_req_receiving.............: avg=337.5µs  min=26.24µs  med=69.8µs   max=702.22ms p(90)=240.46µs p(95)=517.94µs p(99.9)=32.36ms
     http_req_sending...............: avg=522.12µs min=6.78µs   med=13.42µs  max=1.08s    p(90)=120.83µs p(95)=155.04µs p(99.9)=38.66ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=621.33ms min=2.72ms   med=607.12ms max=3.16s    p(90)=744.27ms p(95)=804.56ms p(99.9)=2.9s   
     http_reqs......................: 28938   462.940242/s
     iteration_duration.............: avg=637.1ms  min=125.21ms med=610.37ms max=3.6s     p(90)=747ms    p(95)=808.16ms p(99.9)=3.1s   
     iterations.....................: 28338   453.341647/s
     success_rate...................: 100.00% ✓ 28338      ✗ 0    
     vus............................: 300     min=0        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9e92cced-4238-444f-d6af-9e305c604800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ce034381-b0d6-4fe5-84dc-11c47d450f00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 24110 / ✗ 10
     ✓ valid response structure

     checks.........................: 99.98% ✓ 72350      ✗ 10   
     data_received..................: 2.2 GB 33 MB/s
     data_sent......................: 29 MB  443 kB/s
     http_req_blocked...............: avg=465.73µs min=1.41µs  med=3.07µs   max=62.11ms p(90)=4.93µs   p(95)=6.36µs   p(99.9)=56.23ms
     http_req_connecting............: avg=459.37µs min=0s      med=0s       max=62.08ms p(90)=0s       p(95)=0s       p(99.9)=56.21ms
     http_req_duration..............: avg=727.81ms min=6.23ms  med=713.56ms max=3.58s   p(90)=920.91ms p(95)=986.1ms  p(99.9)=3.36s  
       { expected_response:true }...: avg=727.81ms min=6.23ms  med=713.56ms max=3.58s   p(90)=920.91ms p(95)=986.1ms  p(99.9)=3.36s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 24720
     http_req_receiving.............: avg=222.15µs min=33.74µs med=59.77µs  max=1.04s   p(90)=121.3µs  p(95)=190.19µs p(99.9)=8.28ms 
     http_req_sending...............: avg=489µs    min=6.13µs  med=12.33µs  max=1.17s   p(90)=30.77µs  p(95)=119.15µs p(99.9)=14.42ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=727.1ms  min=6.17ms  med=713.29ms max=3.53s   p(90)=920.69ms p(95)=985.76ms p(99.9)=3.33s  
     http_reqs......................: 24720  380.938841/s
     iteration_duration.............: avg=748.43ms min=84.11ms med=718.17ms max=3.77s   p(90)=924.26ms p(95)=990.77ms p(99.9)=3.61s  
     iterations.....................: 24120  371.692753/s
     success_rate...................: 99.95% ✓ 24110      ✗ 10   
     vus............................: 33     min=0        max=300
     vus_max........................: 300    min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ffa5c2cb-df4d-4121-4ad0-1181654d0000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e24379f6-f1ba-4470-c557-95f7b05aed00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 27435      ✗ 0    
     data_received..................: 856 MB  13 MB/s
     data_sent......................: 11 MB   167 kB/s
     http_req_blocked...............: avg=1.38ms   min=1.58µs   med=3.86µs  max=80.65ms  p(90)=5.99µs   p(95)=21.36µs  p(99.9)=77.36ms 
     http_req_connecting............: avg=1.37ms   min=0s       med=0s      max=80.6ms   p(90)=0s       p(95)=0s       p(99.9)=77.33ms 
     http_req_duration..............: avg=1.86s    min=7.9ms    med=1.94s   max=4.96s    p(90)=2.26s    p(95)=2.42s    p(99.9)=4.68s   
       { expected_response:true }...: avg=1.86s    min=7.9ms    med=1.94s   max=4.96s    p(90)=2.26s    p(95)=2.42s    p(99.9)=4.68s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 9745 
     http_req_receiving.............: avg=308.37µs min=32.59µs  med=79.56µs max=807.67ms p(90)=149.66µs p(95)=201.56µs p(99.9)=4.98ms  
     http_req_sending...............: avg=1.08ms   min=7.16µs   med=15.8µs  max=1.29s    p(90)=39.73µs  p(95)=136µs    p(99.9)=270.23ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=1.85s    min=7.84ms   med=1.94s   max=4.8s     p(90)=2.26s    p(95)=2.41s    p(99.9)=4.66s   
     http_reqs......................: 9745    143.233117/s
     iteration_duration.............: avg=1.99s    min=240.41ms med=1.96s   max=5.23s    p(90)=2.28s    p(95)=2.46s    p(99.9)=5.18s   
     iterations.....................: 9145    134.414249/s
     success_rate...................: 100.00% ✓ 9145       ✗ 0    
     vus............................: 36      min=0        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c38563c4-4361-4852-2e56-03c8bc064600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c41b984a-7b90-4dde-79ad-28fd56b7f900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 24996      ✗ 0    
     data_received..................: 784 MB  12 MB/s
     data_sent......................: 10 MB   152 kB/s
     http_req_blocked...............: avg=1.58ms   min=1.49µs   med=4.51µs  max=93.35ms p(90)=7.01µs   p(95)=25.67µs  p(99.9)=75.9ms  
     http_req_connecting............: avg=1.56ms   min=0s       med=0s      max=93.31ms p(90)=0s       p(95)=0s       p(99.9)=75.86ms 
     http_req_duration..............: avg=2.03s    min=7.92ms   med=2.13s   max=5.19s   p(90)=2.48s    p(95)=2.65s    p(99.9)=5.06s   
       { expected_response:true }...: avg=2.03s    min=7.92ms   med=2.13s   max=5.19s   p(90)=2.48s    p(95)=2.65s    p(99.9)=5.06s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 8932 
     http_req_receiving.............: avg=417.38µs min=33.56µs  med=87.21µs max=1.21s   p(90)=161.33µs p(95)=218.38µs p(99.9)=9.51ms  
     http_req_sending...............: avg=1.23ms   min=7.55µs   med=17.47µs max=1.75s   p(90)=44.25µs  p(95)=165.75µs p(99.9)=324.04ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=2.02s    min=7.84ms   med=2.13s   max=5.18s   p(90)=2.48s    p(95)=2.65s    p(99.9)=5.05s   
     http_reqs......................: 8932    130.725738/s
     iteration_duration.............: avg=2.19s    min=217.96ms med=2.15s   max=5.52s   p(90)=2.51s    p(95)=2.68s    p(99.9)=5.46s   
     iterations.....................: 8332    121.944341/s
     success_rate...................: 100.00% ✓ 8332       ✗ 0    
     vus............................: 114     min=0        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bd6d0f9a-14b9-4e37-5b38-b3edb529e200/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e20b0f4b-772d-4d3b-ef94-97b3b502b300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 15942     ✗ 0    
     data_received..................: 519 MB  7.6 MB/s
     data_sent......................: 6.9 MB  101 kB/s
     http_req_blocked...............: avg=4.84ms   min=1.21µs   med=3.28µs  max=182.03ms p(90)=5.57µs   p(95)=10.18ms  p(99.9)=124.15ms
     http_req_connecting............: avg=4.81ms   min=0s       med=0s      max=182ms    p(90)=0s       p(95)=10.16ms  p(99.9)=123.24ms
     http_req_duration..............: avg=3.05s    min=9.37ms   med=3.35s   max=6.23s    p(90)=3.71s    p(95)=4.32s    p(99.9)=6.16s   
       { expected_response:true }...: avg=3.05s    min=9.37ms   med=3.35s   max=6.23s    p(90)=3.71s    p(95)=4.32s    p(99.9)=6.16s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5914 
     http_req_receiving.............: avg=356.23µs min=26.25µs  med=65.48µs max=745.48ms p(90)=113.96µs p(95)=134.98µs p(99.9)=4.84ms  
     http_req_sending...............: avg=4.15ms   min=5.4µs    med=13.25µs max=1.2s     p(90)=28.93µs  p(95)=6.17ms   p(99.9)=1.1s    
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=3.04s    min=9.32ms   med=3.35s   max=6.14s    p(90)=3.7s     p(95)=4.28s    p(99.9)=6.06s   
     http_reqs......................: 5914    87.098753/s
     iteration_duration.............: avg=3.4s     min=117.67ms med=3.37s   max=6.39s    p(90)=3.73s    p(95)=4.4s     p(99.9)=6.38s   
     iterations.....................: 5314    78.26222/s
     success_rate...................: 100.00% ✓ 5314      ✗ 0    
     vus............................: 7       min=0       max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a59b1329-8485-493d-bd70-9ee956181400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a1ccd44d-ca24-4f96-5321-a826233cf300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 15273     ✗ 0    
     data_received..................: 500 MB  7.2 MB/s
     data_sent......................: 6.6 MB  96 kB/s
     http_req_blocked...............: avg=1.85ms   min=1.29µs  med=2.97µs  max=59.86ms  p(90)=5.11µs   p(95)=16.3ms   p(99.9)=57.36ms
     http_req_connecting............: avg=1.84ms   min=0s      med=0s      max=59.84ms  p(90)=0s       p(95)=15.97ms  p(99.9)=57.34ms
     http_req_duration..............: avg=3.24s    min=8.63ms  med=3.1s    max=8.84s    p(90)=5.22s    p(95)=6.11s    p(99.9)=8.78s  
       { expected_response:true }...: avg=3.24s    min=8.63ms  med=3.1s    max=8.84s    p(90)=5.22s    p(95)=6.11s    p(99.9)=8.78s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 5691 
     http_req_receiving.............: avg=323.72µs min=25.88µs med=54.53µs max=745.86ms p(90)=107.44µs p(95)=128.92µs p(99.9)=3.59ms 
     http_req_sending...............: avg=1.62ms   min=6.05µs  med=11.96µs max=886.85ms p(90)=26.58µs  p(95)=1.27ms   p(99.9)=439.2ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=3.24s    min=8.57ms  med=3.1s    max=8.83s    p(90)=5.22s    p(95)=6.11s    p(99.9)=8.77s  
     http_reqs......................: 5691    82.214839/s
     iteration_duration.............: avg=3.63s    min=60.8ms  med=3.25s   max=8.93s    p(90)=5.28s    p(95)=6.2s     p(99.9)=8.86s  
     iterations.....................: 5091    73.546959/s
     success_rate...................: 100.00% ✓ 5091      ✗ 0    
     vus............................: 73      min=0       max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f8d80213-d2cd-44f8-8be7-3559c46af900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9225c473-30ff-4af8-1695-a702ab426300/public" alt="HTTP Overview" />


  </details>