## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fd7afe4c-c29a-4f0a-5e07-b618edf3ca00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests        |         Duration         | Notes                          |
| :--------------- | :----: | :--------------------: | :----------------------: | :----------------------------- |
| hive-router      |  1977  | 123290 total, 0 failed |  avg: 113ms, p95: 274ms  | ✅                              |
| grafbase         |  1553  | 98507 total, 0 failed  |  avg: 141ms, p95: 339ms  | ✅                              |
| cosmo            |  679   | 43331 total, 0 failed  |  avg: 324ms, p95: 737ms  | ✅                              |
| apollo-router    |  370   | 24871 total, 0 failed  | avg: 567ms, p95: 1283ms  | ❌ 14 unexpected GraphQL errors |
| hive-gateway-bun |  284   | 19761 total, 0 failed  | avg: 712ms, p95: 1521ms  | ✅                              |
| hive-gateway     |  250   | 17459 total, 0 failed  | avg: 802ms, p95: 1701ms  | ✅                              |
| apollo-gateway   |  153   | 10540 total, 0 failed  | avg: 1233ms, p95: 2577ms | ✅                              |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 366870     ✗ 0     
     data_received..................: 11 GB   174 MB/s
     data_sent......................: 143 MB  2.3 MB/s
     http_req_blocked...............: avg=377.22µs min=1.09µs  med=2.49µs   max=292.29ms p(90)=3.88µs   p(95)=4.66µs   p(99.9)=139.98ms
     http_req_connecting............: avg=373.04µs min=0s      med=0s       max=292.21ms p(90)=0s       p(95)=0s       p(99.9)=139.83ms
     http_req_duration..............: avg=112.99ms min=1.63ms  med=100.44ms max=418.03ms p(90)=230.67ms p(95)=274.04ms p(99.9)=378.85ms
       { expected_response:true }...: avg=112.99ms min=1.63ms  med=100.44ms max=418.03ms p(90)=230.67ms p(95)=274.04ms p(99.9)=378.85ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 123290
     http_req_receiving.............: avg=468.55µs min=21.98µs med=41.11µs  max=150.56ms p(90)=168.2µs  p(95)=382.81µs p(99.9)=69.39ms 
     http_req_sending...............: avg=335.58µs min=5.23µs  med=10.03µs  max=139.33ms p(90)=29.62µs  p(95)=124.09µs p(99.9)=56.87ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=112.18ms min=1.59ms  med=99.69ms  max=402.84ms p(90)=228.84ms p(95)=272.25ms p(99.9)=375.91ms
     http_reqs......................: 123290  1977.39041/s
     iteration_duration.............: avg=114.54ms min=1.74ms  med=101.74ms max=679.12ms p(90)=232.73ms p(95)=276.16ms p(99.9)=396.21ms
     iterations.....................: 122290  1961.35188/s
     success_rate...................: 100.00% ✓ 122290     ✗ 0     
     vus............................: 74      min=0        max=495 
     vus_max........................: 500     min=500      max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/84665761-8460-4524-b58a-9a4f5cd8dd00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ca1703b5-7761-4ca1-a3b4-4e508fe0c300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 292521      ✗ 0    
     data_received..................: 8.7 GB  137 MB/s
     data_sent......................: 115 MB  1.8 MB/s
     http_req_blocked...............: avg=604.24µs min=1.26µs  med=3.18µs   max=393.03ms p(90)=5.04µs   p(95)=7.2µs    p(99.9)=196.38ms
     http_req_connecting............: avg=596.19µs min=0s      med=0s       max=392.84ms p(90)=0s       p(95)=0s       p(99.9)=195.61ms
     http_req_duration..............: avg=141.3ms  min=2.72ms  med=128.85ms max=502.05ms p(90)=282.22ms p(95)=338.63ms p(99.9)=447.32ms
       { expected_response:true }...: avg=141.3ms  min=2.72ms  med=128.85ms max=502.05ms p(90)=282.22ms p(95)=338.63ms p(99.9)=447.32ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 98507
     http_req_receiving.............: avg=634.96µs min=27.27µs med=50.52µs  max=149.36ms p(90)=252.21µs p(95)=468.33µs p(99.9)=85.87ms 
     http_req_sending...............: avg=514.87µs min=5.81µs  med=12.19µs  max=144.83ms p(90)=37.47µs  p(95)=147.97µs p(99.9)=80.85ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=140.15ms min=2.68ms  med=127.72ms max=476.68ms p(90)=279.32ms p(95)=336.66ms p(99.9)=443.29ms
     http_reqs......................: 98507   1553.835129/s
     iteration_duration.............: avg=143.72ms min=2.88ms  med=130.73ms max=882.19ms p(90)=285.53ms p(95)=342.34ms p(99.9)=497.01ms
     iterations.....................: 97507   1538.061274/s
     success_rate...................: 100.00% ✓ 97507       ✗ 0    
     vus............................: 78      min=0         max=493
     vus_max........................: 500     min=500       max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0f547380-b357-414e-9b61-b66bd36d7f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a2dc1757-3878-4036-4303-05fc3c2c6c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 126993    ✗ 0    
     data_received..................: 3.8 GB  60 MB/s
     data_sent......................: 51 MB   791 kB/s
     http_req_blocked...............: avg=108.1µs  min=1.25µs  med=2.84µs   max=189.95ms p(90)=4.29µs   p(95)=6.51µs   p(99.9)=34.13ms 
     http_req_connecting............: avg=103.32µs min=0s      med=0s       max=189.83ms p(90)=0s       p(95)=0s       p(99.9)=34.06ms 
     http_req_duration..............: avg=324.26ms min=2.86ms  med=303.9ms  max=1.34s    p(90)=639.53ms p(95)=736.97ms p(99.9)=1.14s   
       { expected_response:true }...: avg=324.26ms min=2.86ms  med=303.9ms  max=1.34s    p(90)=639.53ms p(95)=736.97ms p(99.9)=1.14s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 43331
     http_req_receiving.............: avg=830.86µs min=25.75µs med=62.56µs  max=323.57ms p(90)=218.08µs p(95)=507.26µs p(99.9)=144.55ms
     http_req_sending...............: avg=148.81µs min=6.05µs  med=11.54µs  max=114.27ms p(90)=31.95µs  p(95)=133.11µs p(99.9)=26.46ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=323.28ms min=2.78ms  med=303.18ms max=1.34s    p(90)=637.2ms  p(95)=735.12ms p(99.9)=1.14s   
     http_reqs......................: 43331   679.36853/s
     iteration_duration.............: avg=332.39ms min=3.06ms  med=312.36ms max=1.34s    p(90)=643.64ms p(95)=740.41ms p(99.9)=1.14s   
     iterations.....................: 42331   663.68995/s
     success_rate...................: 100.00% ✓ 42331     ✗ 0    
     vus............................: 99      min=0       max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/33af7b8a-bf4a-4790-0895-3c0bf8e69600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/204b577e-6337-44a9-f9b9-2a9370a8c500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 23857 / ✗ 14
     ✓ valid response structure

     checks.........................: 99.98% ✓ 71599      ✗ 14   
     data_received..................: 2.2 GB 33 MB/s
     data_sent......................: 29 MB  432 kB/s
     http_req_blocked...............: avg=115.59µs min=1.67µs  med=3.2µs    max=189.9ms  p(90)=5.06µs   p(95)=7.96µs   p(99.9)=27.54ms
     http_req_connecting............: avg=108.82µs min=0s      med=0s       max=189.81ms p(90)=0s       p(95)=0s       p(99.9)=26.84ms
     http_req_duration..............: avg=566.73ms min=6.16ms  med=532.81ms max=2.15s    p(90)=1.14s    p(95)=1.28s    p(99.9)=1.83s  
       { expected_response:true }...: avg=566.73ms min=6.16ms  med=532.81ms max=2.15s    p(90)=1.14s    p(95)=1.28s    p(99.9)=1.83s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 24871
     http_req_receiving.............: avg=124.9µs  min=31.85µs med=56.98µs  max=69.59ms  p(90)=112.96µs p(95)=194.85µs p(99.9)=8.47ms 
     http_req_sending...............: avg=124.41µs min=6.26µs  med=12.05µs  max=117.66ms p(90)=30.71µs  p(95)=119.47µs p(99.9)=21.7ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=566.48ms min=6.05ms  med=532.73ms max=2.15s    p(90)=1.13s    p(95)=1.28s    p(99.9)=1.83s  
     http_reqs......................: 24871  370.264505/s
     iteration_duration.............: avg=590.96ms min=6.5ms   med=562.03ms max=2.15s    p(90)=1.15s    p(95)=1.29s    p(99.9)=1.83s  
     iterations.....................: 23871  355.377105/s
     success_rate...................: 99.94% ✓ 23857      ✗ 14   
     vus............................: 70     min=0        max=497
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/232e90f7-d957-4750-548a-b7cc06f5a100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/229bfea5-bf8f-4a9b-d02e-923698697b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 56283      ✗ 0    
     data_received..................: 1.7 GB  25 MB/s
     data_sent......................: 23 MB   333 kB/s
     http_req_blocked...............: avg=107.15µs min=1.21µs  med=2.75µs   max=111.18ms p(90)=4.65µs  p(95)=7.42µs   p(99.9)=29.51ms
     http_req_connecting............: avg=102.13µs min=0s      med=0s       max=111.13ms p(90)=0s      p(95)=0s       p(99.9)=29.47ms
     http_req_duration..............: avg=711.62ms min=6.58ms  med=648.16ms max=3.98s    p(90)=1.39s   p(95)=1.52s    p(99.9)=3.33s  
       { expected_response:true }...: avg=711.62ms min=6.58ms  med=648.16ms max=3.98s    p(90)=1.39s   p(95)=1.52s    p(99.9)=3.33s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 19761
     http_req_receiving.............: avg=177.77µs min=24.74µs med=44.42µs  max=103.7ms  p(90)=99.89µs p(95)=330.69µs p(99.9)=24.79ms
     http_req_sending...............: avg=178.98µs min=5.66µs  med=10.98µs  max=105.02ms p(90)=33.44µs p(95)=123.65µs p(99.9)=31.23ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=711.27ms min=6.53ms  med=647.77ms max=3.97s    p(90)=1.39s   p(95)=1.51s    p(99.9)=3.33s  
     http_reqs......................: 19761   284.587004/s
     iteration_duration.............: avg=749.82ms min=8.36ms  med=693.53ms max=4.06s    p(90)=1.41s   p(95)=1.53s    p(99.9)=3.36s  
     iterations.....................: 18761   270.185557/s
     success_rate...................: 100.00% ✓ 18761      ✗ 0    
     vus............................: 81      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3e41ef82-6d7b-4eea-7434-e3901a5d4f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e17998f6-9463-49b9-de96-b5f870087400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 49377      ✗ 0    
     data_received..................: 1.5 GB  22 MB/s
     data_sent......................: 21 MB   294 kB/s
     http_req_blocked...............: avg=106.08µs min=1.26µs  med=2.94µs   max=143.91ms p(90)=5.42µs   p(95)=8.06µs   p(99.9)=29.98ms
     http_req_connecting............: avg=100.66µs min=0s      med=0s       max=143.72ms p(90)=0s       p(95)=0s       p(99.9)=29.93ms
     http_req_duration..............: avg=802.41ms min=6.72ms  med=762.2ms  max=5.54s    p(90)=1.54s    p(95)=1.7s     p(99.9)=4.6s   
       { expected_response:true }...: avg=802.41ms min=6.72ms  med=762.2ms  max=5.54s    p(90)=1.54s    p(95)=1.7s     p(99.9)=4.6s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 17459
     http_req_receiving.............: avg=157.97µs min=26.69µs med=47.78µs  max=107.17ms p(90)=105.94µs p(95)=169.92µs p(99.9)=21.6ms 
     http_req_sending...............: avg=142.38µs min=5.56µs  med=11.57µs  max=75.08ms  p(90)=32.34µs  p(95)=113.92µs p(99.9)=19.68ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=802.11ms min=6.64ms  med=762.07ms max=5.54s    p(90)=1.54s    p(95)=1.7s     p(99.9)=4.6s   
     http_reqs......................: 17459   250.971024/s
     iteration_duration.............: avg=851.41ms min=9.1ms   med=810.08ms max=5.55s    p(90)=1.56s    p(95)=1.71s    p(99.9)=4.63s  
     iterations.....................: 16459   236.596145/s
     success_rate...................: 100.00% ✓ 16459      ✗ 0    
     vus............................: 91      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c417588e-9505-4542-5c67-0f2a3b4da300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2f625e56-0da4-4ead-e740-d5426ba77100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 28620      ✗ 0    
     data_received..................: 926 MB  14 MB/s
     data_sent......................: 13 MB   183 kB/s
     http_req_blocked...............: avg=47.02µs min=1.43µs  med=3.55µs  max=32.91ms p(90)=5.89µs   p(95)=14.57µs p(99.9)=6.43ms
     http_req_connecting............: avg=40.39µs min=0s      med=0s      max=32.86ms p(90)=0s       p(95)=0s      p(99.9)=6.37ms
     http_req_duration..............: avg=1.23s   min=7.59ms  med=1.17s   max=15.89s  p(90)=2.2s     p(95)=2.57s   p(99.9)=14.63s
       { expected_response:true }...: avg=1.23s   min=7.59ms  med=1.17s   max=15.89s  p(90)=2.2s     p(95)=2.57s   p(99.9)=14.63s
     http_req_failed................: 0.00%   ✓ 0          ✗ 10540
     http_req_receiving.............: avg=85.56µs min=27.65µs med=59.01µs max=21.73ms p(90)=111.93µs p(95)=148.2µs p(99.9)=2.04ms
     http_req_sending...............: avg=47.7µs  min=6.33µs  med=13.35µs max=32.68ms p(90)=33.48µs  p(95)=52.87µs p(99.9)=7.57ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s      p(99.9)=0s    
     http_req_waiting...............: avg=1.23s   min=7.54ms  med=1.17s   max=15.89s  p(90)=2.2s     p(95)=2.57s   p(99.9)=14.63s
     http_reqs......................: 10540   153.191092/s
     iteration_duration.............: avg=1.36s   min=8.63ms  med=1.32s   max=15.92s  p(90)=2.25s    p(95)=2.66s   p(99.9)=14.71s
     iterations.....................: 9540    138.656833/s
     success_rate...................: 100.00% ✓ 9540       ✗ 0    
     vus............................: 62      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/149efd14-28b1-43cf-0936-8a3c6c924f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1ec3af99-b7e5-4fc9-bf31-b3835eb38b00/public" alt="HTTP Overview" />


  </details>