## Overview for: `federation/constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b4e381cc-76a3-42fd-9613-68c15dbab400/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  174   | 10648 total, 0 failed | avg: 871ms, p95: 2165ms  | ✅                                                                        |
| grafbase         |  174   | 10620 total, 0 failed | avg: 849ms, p95: 2238ms  | ✅                                                                        |
| apollo-router    |  158   | 9669 total, 0 failed  | avg: 966ms, p95: 2384ms  | ❌ 11 unexpected GraphQL errors, non-compatible response structure (7)    |
| hive-gateway-bun |   96   | 6095 total, 0 failed  | avg: 2954ms, p95: 5005ms | ✅                                                                        |
| apollo-server    |   89   | 5633 total, 54 failed | avg: 3233ms, p95: 3080ms | ❌ 54 failed requests, 54 non-200 responses, 54 unexpected GraphQL errors |
| hive-gateway     |   87   | 5501 total, 5 failed  | avg: 3320ms, p95: 4441ms | ❌ 5 failed requests, 5 non-200 responses, 5 unexpected GraphQL errors    |
| mercurius        |   77   | 4795 total, 0 failed  | avg: 3784ms, p95: 4892ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31884      ✗ 0    
     data_received..................: 935 MB  15 MB/s
     data_sent......................: 13 MB   207 kB/s
     http_req_blocked...............: avg=2.09ms   min=1.63µs  med=3.55µs   max=1.89s p(90)=5.61µs   p(95)=11.89µs
     http_req_connecting............: avg=1.51ms   min=0s      med=0s       max=1.2s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=871.31ms min=3.46ms  med=736.53ms max=6.13s p(90)=1.75s    p(95)=2.16s  
       { expected_response:true }...: avg=871.31ms min=3.46ms  med=736.53ms max=6.13s p(90)=1.75s    p(95)=2.16s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10648
     http_req_receiving.............: avg=263.17ms min=31.53µs med=95.46µs  max=4.87s p(90)=1.06s    p(95)=1.48s  
     http_req_sending...............: avg=24.53ms  min=8.48µs  med=18.02µs  max=2.59s p(90)=152.16µs p(95)=27.09ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=583.6ms  min=3.28ms  med=557.78ms max=3.83s p(90)=1.01s    p(95)=1.2s   
     http_reqs......................: 10648   174.701336/s
     iteration_duration.............: avg=1.69s    min=21.87ms med=1.47s    max=8.5s  p(90)=3.29s    p(95)=3.98s  
     iterations.....................: 10628   174.373197/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c47adf72-618d-4fe3-b5d5-a69d99bb0600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/672df1ed-c903-48c8-6ce9-ee1106fb5000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/62682e60-d47d-47f4-09b2-e4f36285c500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 31800      ✗ 0    
     data_received..................: 933 MB  15 MB/s
     data_sent......................: 13 MB   207 kB/s
     http_req_blocked...............: avg=1.04ms   min=1.43µs  med=3.04µs   max=1.42s p(90)=4.35µs  p(95)=10.17µs
     http_req_connecting............: avg=720.87µs min=0s      med=0s       max=1.14s p(90)=0s      p(95)=0s     
     http_req_duration..............: avg=849.26ms min=2.92ms  med=709.29ms max=5.9s  p(90)=1.7s    p(95)=2.23s  
       { expected_response:true }...: avg=849.26ms min=2.92ms  med=709.29ms max=5.9s  p(90)=1.7s    p(95)=2.23s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10620
     http_req_receiving.............: avg=253.9ms  min=31.24µs med=79.09µs  max=4.87s p(90)=1.08s   p(95)=1.53s  
     http_req_sending...............: avg=22.02ms  min=7.52µs  med=13.99µs  max=2.93s p(90)=137.5µs p(95)=30.45ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s      p(95)=0s     
     http_req_waiting...............: avg=573.34ms min=2.86ms  med=550.45ms max=2.62s p(90)=1s      p(95)=1.15s  
     http_reqs......................: 10620   174.480366/s
     iteration_duration.............: avg=1.7s     min=23ms    med=1.41s    max=9.37s p(90)=3.38s   p(95)=4.1s   
     iterations.....................: 10600   174.151777/s
     vus............................: 286     min=286      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6fc2eefe-544c-4adc-7304-e2f5c011c600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/adfaa86f-a6fc-4708-c74d-3a1c8b82de00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/74dc47ad-503d-4263-37a4-954e574b4e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 9638 / ✗ 11
     ✗ valid response structure
      ↳  99% — ✓ 9642 / ✗ 7

     █ setup

     checks.........................: 99.93% ✓ 28929      ✗ 18   
     data_received..................: 848 MB 14 MB/s
     data_sent......................: 12 MB  188 kB/s
     http_req_blocked...............: avg=1.68ms   min=1.5µs   med=3.34µs   max=1.31s  p(90)=5.19µs   p(95)=11.08µs
     http_req_connecting............: avg=1.31ms   min=0s      med=0s       max=1.31s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=965.59ms min=6.74ms  med=798.09ms max=5.4s   p(90)=1.96s    p(95)=2.38s  
       { expected_response:true }...: avg=965.59ms min=6.74ms  med=798.09ms max=5.4s   p(90)=1.96s    p(95)=2.38s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 9669 
     http_req_receiving.............: avg=355.46ms min=34.13µs med=94.56µs  max=4.48s  p(90)=1.28s    p(95)=1.86s  
     http_req_sending...............: avg=14.29ms  min=8.5µs   med=15.66µs  max=2.71s  p(90)=122.09µs p(95)=4.52ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=595.83ms min=6.65ms  med=547.11ms max=2.72s  p(90)=1.1s     p(95)=1.29s  
     http_reqs......................: 9669   158.554527/s
     iteration_duration.............: avg=1.87s    min=30.23ms med=1.63s    max=12.24s p(90)=3.85s    p(95)=4.61s  
     iterations.....................: 9649   158.226562/s
     vus............................: 1      min=1        max=300
     vus_max........................: 300    min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4d268a45-529c-4b83-3df7-3047f78f2f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3a1e2798-5bf2-4240-1a9a-8ff3d86de100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f00ea413-26c3-4ffe-e9ef-4e72a7fa7300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 18225     ✗ 0    
     data_received..................: 535 MB  8.5 MB/s
     data_sent......................: 7.2 MB  115 kB/s
     http_req_blocked...............: avg=905.06µs min=1.6µs    med=3.3µs    max=36.06ms  p(90)=5.43µs   p(95)=2.07ms  
     http_req_connecting............: avg=866.23µs min=0s       med=0s       max=36.01ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=2.95s    min=12.85ms  med=2.73s    max=7.58s    p(90)=4.24s    p(95)=5s      
       { expected_response:true }...: avg=2.95s    min=12.85ms  med=2.73s    max=7.58s    p(90)=4.24s    p(95)=5s      
     http_req_failed................: 0.00%   ✓ 0         ✗ 6095 
     http_req_receiving.............: avg=42.62ms  min=38µs     med=104.47µs max=1.7s     p(90)=7.95ms   p(95)=271.47ms
     http_req_sending...............: avg=1.06ms   min=8.98µs   med=16.34µs  max=838.26ms p(90)=109.25µs p(95)=813.67µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.91s    min=12.74ms  med=2.7s     max=7.58s    p(90)=4.19s    p(95)=5s      
     http_reqs......................: 6095    96.949708/s
     iteration_duration.............: avg=3.03s    min=166.16ms med=2.79s    max=7.65s    p(90)=4.31s    p(95)=5.09s   
     iterations.....................: 6075    96.631579/s
     vus............................: 188     min=188     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b3d9bd8d-4a00-4059-093d-609f9621a600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/80e5bb97-d556-404e-d4d1-e07c67465a00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/90b4e3e5-540c-4d11-9bb0-25b84883bc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 5559 / ✗ 54
     ✗ no graphql errors
      ↳  99% — ✓ 5559 / ✗ 54
     ✓ valid response structure

     █ setup

     checks.........................: 99.35% ✓ 16677     ✗ 108  
     data_received..................: 490 MB 7.8 MB/s
     data_sent......................: 6.7 MB 107 kB/s
     http_req_blocked...............: avg=1.05ms   min=1.42µs   med=2.79µs   max=61.32ms  p(90)=4.85µs   p(95)=524.61µs
     http_req_connecting............: avg=1.02ms   min=0s       med=0s       max=47.03ms  p(90)=0s       p(95)=235.48µs
     http_req_duration..............: avg=3.23s    min=10.86ms  med=2.04s    max=1m0s     p(90)=2.74s    p(95)=3.08s   
       { expected_response:true }...: avg=2.68s    min=10.86ms  med=2.03s    max=59.27s   p(90)=2.72s    p(95)=3s      
     http_req_failed................: 0.95%  ✓ 54        ✗ 5579 
     http_req_receiving.............: avg=423.87µs min=0s       med=103.21µs max=101.38ms p(90)=216.97µs p(95)=407.63µs
     http_req_sending...............: avg=817.29µs min=8.64µs   med=14.39µs  max=61.6ms   p(90)=34.28µs  p(95)=463.6µs 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.23s    min=10.73ms  med=2.04s    max=1m0s     p(90)=2.74s    p(95)=3.07s   
     http_reqs......................: 5633   89.969182/s
     iteration_duration.............: avg=3.26s    min=409.91ms med=2.06s    max=1m0s     p(90)=2.76s    p(95)=3.11s   
     iterations.....................: 5613   89.649746/s
     vus............................: 100    min=100     max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3497b7c0-7986-46e3-bf6a-b9e4d3357e00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3b2b0edb-1c46-43bb-7f11-ea77f6fe1400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1950da6e-6599-4c77-707f-ba3df9610c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 5476 / ✗ 5
     ✗ no graphql errors
      ↳  99% — ✓ 5476 / ✗ 5
     ✓ valid response structure

     █ setup

     checks.........................: 99.93% ✓ 16428     ✗ 10   
     data_received..................: 483 MB 7.7 MB/s
     data_sent......................: 6.5 MB 104 kB/s
     http_req_blocked...............: avg=1.05ms   min=1.59µs   med=3.64µs   max=59.59ms  p(90)=5.52µs   p(95)=1.84ms  
     http_req_connecting............: avg=1.01ms   min=0s       med=0s       max=51.32ms  p(90)=0s       p(95)=998.17µs
     http_req_duration..............: avg=3.31s    min=13.59ms  med=2.46s    max=1m0s     p(90)=3.36s    p(95)=4.44s   
       { expected_response:true }...: avg=3.26s    min=13.59ms  med=2.46s    max=59.7s    p(90)=3.35s    p(95)=4.37s   
     http_req_failed................: 0.09%  ✓ 5         ✗ 5496 
     http_req_receiving.............: avg=535.89µs min=0s       med=105.79µs max=223.94ms p(90)=441.23µs p(95)=1.21ms  
     http_req_sending...............: avg=663.19µs min=9.1µs    med=20.67µs  max=39.81ms  p(90)=53.74µs  p(95)=2.26ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.31s    min=13.49ms  med=2.46s    max=1m0s     p(90)=3.35s    p(95)=4.44s   
     http_reqs......................: 5501   87.321014/s
     iteration_duration.............: avg=3.35s    min=329.29ms med=2.49s    max=1m0s     p(90)=3.39s    p(95)=4.46s   
     iterations.....................: 5481   87.003541/s
     vus............................: 4      min=4       max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3e941bcc-41e9-4e38-cbaf-6a897d218a00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ad434842-46ba-4a53-b395-2310631d6300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5b469bd4-c863-4f8d-a0c8-51beb989cb00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14325     ✗ 0    
     data_received..................: 421 MB  6.8 MB/s
     data_sent......................: 5.7 MB  92 kB/s
     http_req_blocked...............: avg=396.72µs min=1.7µs    med=3.96µs   max=29.52ms  p(90)=6.25µs  p(95)=1.48ms  
     http_req_connecting............: avg=378.11µs min=0s       med=0s       max=14.52ms  p(90)=0s      p(95)=1.28ms  
     http_req_duration..............: avg=3.78s    min=10.41ms  med=3.76s    max=8.42s    p(90)=4.13s   p(95)=4.89s   
       { expected_response:true }...: avg=3.78s    min=10.41ms  med=3.76s    max=8.42s    p(90)=4.13s   p(95)=4.89s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4795 
     http_req_receiving.............: avg=10.21ms  min=42.78µs  med=107.47µs max=803.49ms p(90)=345.7µs p(95)=1.43ms  
     http_req_sending...............: avg=155.08µs min=8.97µs   med=21.32µs  max=203.43ms p(90)=45.04µs p(95)=354.98µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.77s    min=10.33ms  med=3.76s    max=8.42s    p(90)=4.13s   p(95)=4.89s   
     http_reqs......................: 4795    77.52446/s
     iteration_duration.............: avg=3.82s    min=404.03ms med=3.78s    max=8.43s    p(90)=4.15s   p(95)=4.92s   
     iterations.....................: 4775    77.201105/s
     vus............................: 229     min=229     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/da4c5a4d-f3ef-4dcc-a2b7-b330ac3f4000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/58e44a1f-d711-4f74-d87e-7251fa89de00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0c241e05-fc69-4bcf-a78f-3194cc757600/public" alt="HTTP Overview" />


  </details>