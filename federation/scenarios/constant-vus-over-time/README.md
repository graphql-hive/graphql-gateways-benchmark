## Overview for: `federation/constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b82c1ce3-bc40-43dc-1d22-16c85f531400/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  179   | 10927 total, 0 failed | avg: 831ms, p95: 2356ms  | ✅                                                                        |
| grafbase         |  165   | 10081 total, 0 failed | avg: 908ms, p95: 2453ms  | ✅                                                                        |
| apollo-router    |  157   | 9581 total, 0 failed  | avg: 1016ms, p95: 2620ms | ✅                                                                        |
| hive-gateway     |   94   | 5946 total, 0 failed  | avg: 3050ms, p95: 4199ms | ✅                                                                        |
| hive-gateway-bun |   94   | 5930 total, 0 failed  | avg: 3026ms, p95: 5098ms | ✅                                                                        |
| apollo-server    |   89   | 5614 total, 66 failed | avg: 3237ms, p95: 3069ms | ❌ 66 failed requests, 66 non-200 responses, 66 unexpected GraphQL errors |
| mercurius        |   79   | 4911 total, 0 failed  | avg: 3697ms, p95: 4784ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32721      ✗ 0    
     data_received..................: 959 MB  16 MB/s
     data_sent......................: 13 MB   213 kB/s
     http_req_blocked...............: avg=2.2ms    min=1.52µs  med=3.11µs   max=2.24s p(90)=4.84µs   p(95)=10.81µs
     http_req_connecting............: avg=1.81ms   min=0s      med=0s       max=2.24s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=831.06ms min=3.38ms  med=690.29ms max=5.68s p(90)=1.77s    p(95)=2.35s  
       { expected_response:true }...: avg=831.06ms min=3.38ms  med=690.29ms max=5.68s p(90)=1.77s    p(95)=2.35s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10927
     http_req_receiving.............: avg=312.56ms min=31.98µs med=88.8µs   max=5.34s p(90)=1.25s    p(95)=1.81s  
     http_req_sending...............: avg=22.09ms  min=7.65µs  med=14.27µs  max=3.46s p(90)=127.58µs p(95)=12.22ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=496.39ms min=3.2ms   med=451.19ms max=3.04s p(90)=945.52ms p(95)=1.11s  
     http_reqs......................: 10927   179.298695/s
     iteration_duration.............: avg=1.65s    min=17.87ms med=1.4s     max=8.98s p(90)=3.42s    p(95)=4.11s  
     iterations.....................: 10907   178.97052/s
     vus............................: 221     min=221      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4147e94c-9ce5-4a3e-cfb0-a9eb1564a500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c981ebb8-0581-4f28-ca0c-0549461abb00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/afaa7d78-4355-4c00-7800-603792438200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30183      ✗ 0    
     data_received..................: 886 MB  15 MB/s
     data_sent......................: 12 MB   197 kB/s
     http_req_blocked...............: avg=2.63ms   min=1.61µs  med=3.78µs   max=2.89s  p(90)=5.51µs   p(95)=11.66µs
     http_req_connecting............: avg=2ms      min=0s      med=0s       max=1.55s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=908.12ms min=3.16ms  med=742.09ms max=5.49s  p(90)=1.95s    p(95)=2.45s  
       { expected_response:true }...: avg=908.12ms min=3.16ms  med=742.09ms max=5.49s  p(90)=1.95s    p(95)=2.45s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10081
     http_req_receiving.............: avg=317.43ms min=31.6µs  med=95.35µs  max=5.25s  p(90)=1.29s    p(95)=1.86s  
     http_req_sending...............: avg=27.68ms  min=8.56µs  med=18.65µs  max=2.72s  p(90)=200.08µs p(95)=29.49ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=563ms    min=3.09ms  med=538.76ms max=2.53s  p(90)=1.03s    p(95)=1.24s  
     http_reqs......................: 10081   165.729423/s
     iteration_duration.............: avg=1.79s    min=18.85ms med=1.51s    max=12.32s p(90)=3.65s    p(95)=4.29s  
     iterations.....................: 10061   165.400627/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/35ae4d71-8a31-408f-f3e5-4f27118f0b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/757d7cb9-9cf9-4eb2-876d-2c40a2200100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9179eaea-dd10-463b-60cd-6c962c794700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 28683      ✗ 0    
     data_received..................: 841 MB  14 MB/s
     data_sent......................: 11 MB   187 kB/s
     http_req_blocked...............: avg=2.84ms   min=1.44µs  med=3.26µs   max=2.44s p(90)=5.11µs   p(95)=11.14µs
     http_req_connecting............: avg=2.7ms    min=0s      med=0s       max=2.44s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=1.01s    min=6.63ms  med=797.22ms max=6.55s p(90)=2.1s     p(95)=2.62s  
       { expected_response:true }...: avg=1.01s    min=6.63ms  med=797.22ms max=6.55s p(90)=2.1s     p(95)=2.62s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 9581 
     http_req_receiving.............: avg=386.62ms min=33.64µs med=93.57µs  max=5.73s p(90)=1.49s    p(95)=1.95s  
     http_req_sending...............: avg=20.26ms  min=7.72µs  med=15.48µs  max=4.06s p(90)=143.99µs p(95)=16.9ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=608.65ms min=6.57ms  med=596.36ms max=2.69s p(90)=1.04s    p(95)=1.17s  
     http_reqs......................: 9581    157.208866/s
     iteration_duration.............: avg=1.89s    min=21.58ms med=1.62s    max=9.2s  p(90)=3.66s    p(95)=4.39s  
     iterations.....................: 9561    156.880698/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f7b749b0-a8a2-41dc-7c86-b5df22206f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dfd94227-19c8-4987-596e-922a04fc7a00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1786d5cd-7417-42ea-3ed9-91bea0f3dc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17778     ✗ 0    
     data_received..................: 522 MB  8.3 MB/s
     data_sent......................: 7.1 MB  113 kB/s
     http_req_blocked...............: avg=468.77µs min=1.57µs  med=3.72µs  max=29.65ms  p(90)=5.6µs    p(95)=294.12µs
     http_req_connecting............: avg=442.1µs  min=0s      med=0s      max=25.03ms  p(90)=0s       p(95)=122.95µs
     http_req_duration..............: avg=3.04s    min=13.05ms med=2.21s   max=57.29s   p(90)=3.29s    p(95)=4.19s   
       { expected_response:true }...: avg=3.04s    min=13.05ms med=2.21s   max=57.29s   p(90)=3.29s    p(95)=4.19s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5946 
     http_req_receiving.............: avg=1.54ms   min=40.47µs med=89.92µs max=455.79ms p(90)=499.11µs p(95)=1.95ms  
     http_req_sending...............: avg=468.51µs min=9.65µs  med=19.73µs max=160.72ms p(90)=91.77µs  p(95)=507.69µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.04s    min=12.96ms med=2.21s   max=57.29s   p(90)=3.29s    p(95)=4.19s   
     http_reqs......................: 5946    94.803653/s
     iteration_duration.............: avg=3.1s     min=97.7ms  med=2.26s   max=57.35s   p(90)=3.37s    p(95)=4.26s   
     iterations.....................: 5926    94.484771/s
     vus............................: 120     min=120     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b80bc737-6511-4fb2-d944-e55b6181e300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d7c896b1-a9e3-4786-f5ad-2a31ba24f600/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4ee7bd37-4bde-46fd-4d4b-7af44252f600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17730     ✗ 0    
     data_received..................: 521 MB  8.3 MB/s
     data_sent......................: 7.0 MB  112 kB/s
     http_req_blocked...............: avg=384.57µs min=1.68µs   med=3.56µs   max=44.88ms  p(90)=5.7µs    p(95)=439.63µs
     http_req_connecting............: avg=346.02µs min=0s       med=0s       max=29.42ms  p(90)=0s       p(95)=123.02µs
     http_req_duration..............: avg=3.02s    min=17.13ms  med=2.78s    max=6.83s    p(90)=4.45s    p(95)=5.09s   
       { expected_response:true }...: avg=3.02s    min=17.13ms  med=2.78s    max=6.83s    p(90)=4.45s    p(95)=5.09s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5930 
     http_req_receiving.............: avg=43.47ms  min=39µs     med=120.47µs max=1.81s    p(90)=9.45ms   p(95)=283.22ms
     http_req_sending...............: avg=887.03µs min=9.08µs   med=18.49µs  max=202.14ms p(90)=122.94µs p(95)=929.55µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.98s    min=17.02ms  med=2.76s    max=6.83s    p(90)=4.4s     p(95)=5.08s   
     http_reqs......................: 5930    94.698906/s
     iteration_duration.............: avg=3.1s     min=184.32ms med=2.83s    max=6.84s    p(90)=4.63s    p(95)=5.12s   
     iterations.....................: 5910    94.379517/s
     vus............................: 109     min=109     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6932ca5e-6e34-4085-878a-9d52ccbc1f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8c3c1ffe-1a34-492b-d33b-bcd378e80800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ff9b73d8-1034-4e11-93c9-5847fbf58300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5528 / ✗ 66
     ✗ no graphql errors
      ↳  98% — ✓ 5528 / ✗ 66
     ✓ valid response structure

     █ setup

     checks.........................: 99.21% ✓ 16584     ✗ 132  
     data_received..................: 487 MB 7.8 MB/s
     data_sent......................: 6.7 MB 107 kB/s
     http_req_blocked...............: avg=1.23ms   min=1.5µs   med=3.36µs   max=90.87ms p(90)=5.43µs   p(95)=910.45µs
     http_req_connecting............: avg=1.17ms   min=0s      med=0s       max=58.51ms p(90)=0s       p(95)=651.21µs
     http_req_duration..............: avg=3.23s    min=11.58ms med=1.88s    max=1m0s    p(90)=2.56s    p(95)=3.06s   
       { expected_response:true }...: avg=2.56s    min=11.58ms med=1.87s    max=59.53s  p(90)=2.53s    p(95)=2.76s   
     http_req_failed................: 1.17%  ✓ 66        ✗ 5548 
     http_req_receiving.............: avg=211.23µs min=0s      med=104.06µs max=59.55ms p(90)=209.56µs p(95)=307.01µs
     http_req_sending...............: avg=415.78µs min=9.1µs   med=17.15µs  max=44.08ms p(90)=38.09µs  p(95)=367.54µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.23s    min=11.46ms med=1.88s    max=1m0s    p(90)=2.56s    p(95)=3.06s   
     http_reqs......................: 5614   89.861583/s
     iteration_duration.............: avg=3.26s    min=289.4ms med=1.9s     max=1m0s    p(90)=2.59s    p(95)=3.08s   
     iterations.....................: 5594   89.541449/s
     vus............................: 74     min=74      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/490cae95-446c-48a2-7544-30c25782a700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f41bdcc9-81fd-4142-99cc-453a554f7100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/23f4aeb9-cd63-4322-0729-b8b616ef8a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14673     ✗ 0    
     data_received..................: 431 MB  7.0 MB/s
     data_sent......................: 5.8 MB  94 kB/s
     http_req_blocked...............: avg=1.59ms   min=1.7µs    med=3.74µs   max=83.45ms  p(90)=5.78µs   p(95)=4.38ms  
     http_req_connecting............: avg=1.52ms   min=0s       med=0s       max=66.12ms  p(90)=0s       p(95)=3.94ms  
     http_req_duration..............: avg=3.69s    min=13.49ms  med=3.66s    max=7.62s    p(90)=4.39s    p(95)=4.78s   
       { expected_response:true }...: avg=3.69s    min=13.49ms  med=3.66s    max=7.62s    p(90)=4.39s    p(95)=4.78s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4911 
     http_req_receiving.............: avg=3.56ms   min=40.05µs  med=104.53µs max=421.39ms p(90)=289.04µs p(95)=727.14µs
     http_req_sending...............: avg=544.39µs min=9.03µs   med=20.94µs  max=39.08ms  p(90)=45.74µs  p(95)=1.13ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.69s    min=13.4ms   med=3.66s    max=7.62s    p(90)=4.39s    p(95)=4.78s   
     http_reqs......................: 4911    79.242219/s
     iteration_duration.............: avg=3.73s    min=472.37ms med=3.68s    max=7.69s    p(90)=4.44s    p(95)=4.79s   
     iterations.....................: 4891    78.919506/s
     vus............................: 245     min=245     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c75f0cca-ad0c-4daf-0e14-9dc541e6df00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f0e1914c-a738-4f8a-1a1b-3e6274917800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c820d59d-bb68-4ecb-49e4-44a1f511c000/public" alt="HTTP Overview" />


  </details>