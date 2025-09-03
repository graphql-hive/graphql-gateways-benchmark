## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cc8c22ed-9bbb-4bc7-25c3-bcbab79fc500/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |        Requests         |         Duration         | Notes                                                                             |
| :--------------- | :----: | :---------------------: | :----------------------: | :-------------------------------------------------------------------------------- |
| hive-router      |  2055  | 126321 total, 12 failed |  avg: 142ms, p95: 233ms  | ❌ 12 failed requests, 12 non-200 responses, non-compatible response structure (9) |
| cosmo            |  687   |  43016 total, 0 failed  |  avg: 418ms, p95: 586ms  | ✅                                                                                 |
| grafbase         |  469   |  29313 total, 0 failed  |  avg: 613ms, p95: 756ms  | ✅                                                                                 |
| apollo-router    |  392   |  25458 total, 0 failed  | avg: 708ms, p95: 1002ms  | ❌ 6 unexpected GraphQL errors                                                     |
| hive-gateway     |  146   |  9928 total, 0 failed   | avg: 1829ms, p95: 2354ms | ✅                                                                                 |
| hive-gateway-bun |  137   |  9364 total, 0 failed   | avg: 1939ms, p95: 2479ms | ✅                                                                                 |
| mercurius        |   83   |  5714 total, 0 failed   | avg: 3155ms, p95: 4526ms | ✅                                                                                 |
| apollo-gateway   |   82   |  5710 total, 0 failed   | avg: 3224ms, p95: 6102ms | ✅                                                                                 |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 125709 / ✗ 12
     ✓ no graphql errors
     ✗ valid response structure
      ↳  99% — ✓ 125712 / ✗ 9

     checks.........................: 99.99% ✓ 377142      ✗ 21    
     data_received..................: 11 GB  180 MB/s
     data_sent......................: 147 MB 2.4 MB/s
     http_req_blocked...............: avg=628.99µs min=1.13µs  med=2.58µs   max=1.45s    p(90)=4.01µs   p(95)=4.79µs   p(99.9)=298.92ms
     http_req_connecting............: avg=624.42µs min=0s      med=0s       max=1.45s    p(90)=0s       p(95)=0s       p(99.9)=298.88ms
     http_req_duration..............: avg=141.5ms  min=1.89ms  med=122.04ms max=2.24s    p(90)=214.98ms p(95)=232.53ms p(99.9)=1.58s   
       { expected_response:true }...: avg=141.46ms min=1.89ms  med=122.04ms max=2.24s    p(90)=214.95ms p(95)=232.5ms  p(99.9)=1.58s   
     http_req_failed................: 0.00%  ✓ 12          ✗ 126309
     http_req_receiving.............: avg=520.93µs min=22.07µs med=44.61µs  max=445.43ms p(90)=281.6µs  p(95)=414.77µs p(99.9)=66.8ms  
     http_req_sending...............: avg=538.92µs min=5.3µs   med=10.22µs  max=820.19ms p(90)=98.07µs  p(95)=134.56µs p(99.9)=76.53ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=140.44ms min=0s      med=121.37ms max=1.9s     p(90)=213.83ms p(95)=231.28ms p(99.9)=1.46s   
     http_reqs......................: 126321 2055.122834/s
     iteration_duration.............: avg=143.15ms min=10.68ms med=122.57ms max=2.83s    p(90)=215.38ms p(95)=233.07ms p(99.9)=1.78s   
     iterations.....................: 125721 2045.361403/s
     success_rate...................: 99.99% ✓ 125709      ✗ 3     
     vus............................: 300    min=0         max=300 
     vus_max........................: 300    min=300       max=300 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/67c01b93-aabd-4391-f3a5-d4fb4f719d00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/43bc267f-8399-43b7-f87f-7e2546363300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 127248     ✗ 0    
     data_received..................: 3.8 GB  60 MB/s
     data_sent......................: 50 MB   800 kB/s
     http_req_blocked...............: avg=283.71µs min=1.27µs  med=2.72µs   max=75.08ms  p(90)=3.97µs   p(95)=5.08µs   p(99.9)=57.97ms
     http_req_connecting............: avg=277.76µs min=0s      med=0s       max=75.05ms  p(90)=0s       p(95)=0s       p(99.9)=57.9ms 
     http_req_duration..............: avg=418.03ms min=2.89ms  med=401.75ms max=3.02s    p(90)=534.6ms  p(95)=586.46ms p(99.9)=2.6s   
       { expected_response:true }...: avg=418.03ms min=2.89ms  med=401.75ms max=3.02s    p(90)=534.6ms  p(95)=586.46ms p(99.9)=2.6s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 43016
     http_req_receiving.............: avg=556.6µs  min=31.71µs med=69.55µs  max=767.16ms p(90)=211.26µs p(95)=492.63µs p(99.9)=76.34ms
     http_req_sending...............: avg=252.23µs min=5.67µs  med=11.18µs  max=1.46s    p(90)=29.96µs  p(95)=128.37µs p(99.9)=12.8ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=417.22ms min=2.79ms  med=401.11ms max=3.02s    p(90)=533.54ms p(95)=584.61ms p(99.9)=2.59s  
     http_reqs......................: 43016   687.612462/s
     iteration_duration.............: avg=425.14ms min=6.45ms  med=403.95ms max=3.19s    p(90)=535.91ms p(95)=588.34ms p(99.9)=2.7s   
     iterations.....................: 42416   678.021438/s
     success_rate...................: 100.00% ✓ 42416      ✗ 0    
     vus............................: 300     min=0        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/54c85ff7-4270-481d-5b55-2730b772fa00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5c9e2af5-65b0-498c-0172-d62ff7450100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 86139      ✗ 0    
     data_received..................: 2.6 GB  41 MB/s
     data_sent......................: 34 MB   546 kB/s
     http_req_blocked...............: avg=901.26µs min=1.44µs   med=3.55µs   max=236.43ms p(90)=5.67µs   p(95)=9.52µs   p(99.9)=127.95ms
     http_req_connecting............: avg=890.15µs min=0s       med=0s       max=236.23ms p(90)=0s       p(95)=0s       p(99.9)=127.07ms
     http_req_duration..............: avg=613.43ms min=2.69ms   med=601.27ms max=3.23s    p(90)=711.79ms p(95)=756.35ms p(99.9)=2.87s   
       { expected_response:true }...: avg=613.43ms min=2.69ms   med=601.27ms max=3.23s    p(90)=711.79ms p(95)=756.35ms p(99.9)=2.87s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 29313
     http_req_receiving.............: avg=322.18µs min=27.5µs   med=70.75µs  max=817.74ms p(90)=245.59µs p(95)=529.34µs p(99.9)=22.59ms 
     http_req_sending...............: avg=1.06ms   min=7.04µs   med=13.64µs  max=1.01s    p(90)=120.95µs p(95)=156.38µs p(99.9)=123.13ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=612.04ms min=2.64ms   med=600.86ms max=3.01s    p(90)=711.21ms p(95)=755.52ms p(99.9)=2.77s   
     http_reqs......................: 29313   469.479266/s
     iteration_duration.............: avg=628.87ms min=148.32ms med=603.59ms max=3.6s     p(90)=713.93ms p(95)=759.54ms p(99.9)=3.04s   
     iterations.....................: 28713   459.86962/s
     success_rate...................: 100.00% ✓ 28713      ✗ 0    
     vus............................: 300     min=0        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/07051a45-ddd9-4b41-f931-cae13da1f600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fc2c8fe2-68e2-45a2-c80c-9f2654d88c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 24852 / ✗ 6
     ✓ valid response structure

     checks.........................: 99.99% ✓ 74568      ✗ 6    
     data_received..................: 2.2 GB 35 MB/s
     data_sent......................: 30 MB  457 kB/s
     http_req_blocked...............: avg=450.74µs min=1.6µs   med=3.04µs   max=65.06ms p(90)=4.48µs   p(95)=5.69µs  p(99.9)=57.52ms 
     http_req_connecting............: avg=444.81µs min=0s      med=0s       max=65.01ms p(90)=0s       p(95)=0s      p(99.9)=57.5ms  
     http_req_duration..............: avg=707.89ms min=6.21ms  med=691.91ms max=3.48s   p(90)=908.97ms p(95)=1s      p(99.9)=3.23s   
       { expected_response:true }...: avg=707.89ms min=6.21ms  med=691.91ms max=3.48s   p(90)=908.97ms p(95)=1s      p(99.9)=3.23s   
     http_req_failed................: 0.00%  ✓ 0          ✗ 25458
     http_req_receiving.............: avg=252.6µs  min=32.92µs med=55.23µs  max=1.07s   p(90)=117.04µs p(95)=242.8µs p(99.9)=7.86ms  
     http_req_sending...............: avg=866.73µs min=6.84µs  med=11.73µs  max=1.22s   p(90)=30.66µs  p(95)=125.3µs p(99.9)=165.08ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s      p(99.9)=0s      
     http_req_waiting...............: avg=706.77ms min=6.13ms  med=691.61ms max=3.48s   p(90)=908.52ms p(95)=1s      p(99.9)=3.21s   
     http_reqs......................: 25458  392.789039/s
     iteration_duration.............: avg=727.15ms min=139.7ms med=697.3ms  max=3.84s   p(90)=912.05ms p(95)=1s      p(99.9)=3.44s   
     iterations.....................: 24858  383.531697/s
     success_rate...................: 99.97% ✓ 24852      ✗ 6    
     vus............................: 300    min=0        max=300
     vus_max........................: 300    min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c188a457-0127-474b-3c6d-3a5bba4bb500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7da44f9f-e109-48c2-c41e-1a0f73fe8a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 27984      ✗ 0    
     data_received..................: 872 MB  13 MB/s
     data_sent......................: 12 MB   170 kB/s
     http_req_blocked...............: avg=1.24ms   min=1.4µs    med=3.94µs  max=74.99ms p(90)=6.21µs   p(95)=24.61µs  p(99.9)=69.81ms 
     http_req_connecting............: avg=1.23ms   min=0s       med=0s      max=74.96ms p(90)=0s       p(95)=0s       p(99.9)=69.77ms 
     http_req_duration..............: avg=1.82s    min=7.57ms   med=1.92s   max=4.92s   p(90)=2.2s     p(95)=2.35s    p(99.9)=4.66s   
       { expected_response:true }...: avg=1.82s    min=7.57ms   med=1.92s   max=4.92s   p(90)=2.2s     p(95)=2.35s    p(99.9)=4.66s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 9928 
     http_req_receiving.............: avg=461.94µs min=29.04µs  med=79.6µs  max=1.22s   p(90)=145.47µs p(95)=194.57µs p(99.9)=17.76ms 
     http_req_sending...............: avg=1.11ms   min=6.88µs   med=15.71µs max=1.25s   p(90)=38.93µs  p(95)=130.63µs p(99.9)=283.21ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=1.82s    min=7.49ms   med=1.92s   max=4.8s    p(90)=2.2s     p(95)=2.35s    p(99.9)=4.64s   
     http_reqs......................: 9928    146.450689/s
     iteration_duration.............: avg=1.95s    min=199.44ms med=1.93s   max=5.19s   p(90)=2.21s    p(95)=2.37s    p(99.9)=5.1s    
     iterations.....................: 9328    137.599922/s
     success_rate...................: 100.00% ✓ 9328       ✗ 0    
     vus............................: 230     min=0        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/54f8a99d-a773-4f74-71dd-9719b99bcd00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fc07909e-fc39-450d-2ae1-08f44baf2300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 26292      ✗ 0    
     data_received..................: 822 MB  12 MB/s
     data_sent......................: 11 MB   160 kB/s
     http_req_blocked...............: avg=3.08ms   min=1.74µs   med=4.19µs  max=867.46ms p(90)=6.57µs   p(95)=23.61µs  p(99.9)=124.75ms
     http_req_connecting............: avg=2.97ms   min=0s       med=0s      max=135.14ms p(90)=0s       p(95)=0s       p(99.9)=124.14ms
     http_req_duration..............: avg=1.93s    min=7.79ms   med=2.03s   max=5.02s    p(90)=2.31s    p(95)=2.47s    p(99.9)=4.89s   
       { expected_response:true }...: avg=1.93s    min=7.79ms   med=2.03s   max=5.02s    p(90)=2.31s    p(95)=2.47s    p(99.9)=4.89s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 9364 
     http_req_receiving.............: avg=386.47µs min=34.75µs  med=86.12µs max=982.71ms p(90)=154.89µs p(95)=195.62µs p(99.9)=9.41ms  
     http_req_sending...............: avg=1.24ms   min=7.25µs   med=16.74µs max=1.39s    p(90)=41.14µs  p(95)=133µs    p(99.9)=144.25ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=1.93s    min=7.74ms   med=2.03s   max=5s       p(90)=2.31s    p(95)=2.47s    p(99.9)=4.88s   
     http_reqs......................: 9364    137.450817/s
     iteration_duration.............: avg=2.08s    min=171.51ms med=2.05s   max=5.31s    p(90)=2.33s    p(95)=2.51s    p(99.9)=5.26s   
     iterations.....................: 8764    128.643631/s
     success_rate...................: 100.00% ✓ 8764       ✗ 0    
     vus............................: 94      min=0        max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/21016c52-542c-4e85-31bb-c56656d60000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/26f4d584-6c65-4fb4-cfc6-089b18c49100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 15342     ✗ 0    
     data_received..................: 502 MB  7.3 MB/s
     data_sent......................: 6.6 MB  97 kB/s
     http_req_blocked...............: avg=2.01ms   min=1.44µs   med=3.55µs  max=68.73ms  p(90)=6.04µs   p(95)=11.27ms  p(99.9)=62.02ms
     http_req_connecting............: avg=2ms      min=0s       med=0s      max=68.7ms   p(90)=0s       p(95)=10.98ms  p(99.9)=61.99ms
     http_req_duration..............: avg=3.15s    min=9.71ms   med=3.49s   max=6.52s    p(90)=4.15s    p(95)=4.52s    p(99.9)=6.4s   
       { expected_response:true }...: avg=3.15s    min=9.71ms   med=3.49s   max=6.52s    p(90)=4.15s    p(95)=4.52s    p(99.9)=6.4s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5714 
     http_req_receiving.............: avg=562.01µs min=29.33µs  med=70.08µs max=882.34ms p(90)=124.79µs p(95)=151.22µs p(99.9)=57.7ms 
     http_req_sending...............: avg=2.45ms   min=6.34µs   med=14.55µs max=1.27s    p(90)=36.91µs  p(95)=1.26ms   p(99.9)=893.3ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=3.15s    min=9.66ms   med=3.49s   max=6.46s    p(90)=4.15s    p(95)=4.51s    p(99.9)=6.37s  
     http_reqs......................: 5714    83.528307/s
     iteration_duration.............: avg=3.53s    min=646.07ms med=3.51s   max=6.71s    p(90)=4.28s    p(95)=4.57s    p(99.9)=6.67s  
     iterations.....................: 5114    74.757396/s
     success_rate...................: 100.00% ✓ 5114      ✗ 0    
     vus............................: 262     min=0       max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e424d54d-0077-4f0b-79f5-7378aef25e00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/33f41e80-cdc0-467e-aed2-400cd9ecc300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 15330     ✗ 0    
     data_received..................: 502 MB  7.3 MB/s
     data_sent......................: 6.6 MB  96 kB/s
     http_req_blocked...............: avg=1.81ms   min=1.31µs  med=2.96µs  max=59.17ms  p(90)=5.28µs   p(95)=9.06ms   p(99.9)=57.82ms 
     http_req_connecting............: avg=1.8ms    min=0s      med=0s      max=59.13ms  p(90)=0s       p(95)=9.04ms   p(99.9)=57.8ms  
     http_req_duration..............: avg=3.22s    min=9.11ms  med=3.07s   max=9.44s    p(90)=5.2s     p(95)=6.1s     p(99.9)=9.35s   
       { expected_response:true }...: avg=3.22s    min=9.11ms  med=3.07s   max=9.44s    p(90)=5.2s     p(95)=6.1s     p(99.9)=9.35s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5710 
     http_req_receiving.............: avg=280.16µs min=29.32µs med=55.31µs max=690.64ms p(90)=105.18µs p(95)=125.69µs p(99.9)=21.87ms 
     http_req_sending...............: avg=1.31ms   min=6.11µs  med=11.93µs max=873.12ms p(90)=23.68µs  p(95)=1.31ms   p(99.9)=312.71ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=3.22s    min=9.06ms  med=3.06s   max=9.44s    p(90)=5.2s     p(95)=6.1s     p(99.9)=9.33s   
     http_reqs......................: 5710    82.736418/s
     iteration_duration.............: avg=3.6s     min=475.8ms med=3.2s    max=9.57s    p(90)=5.4s     p(95)=6.28s    p(99.9)=9.55s   
     iterations.....................: 5110    74.042573/s
     success_rate...................: 100.00% ✓ 5110      ✗ 0    
     vus............................: 30      min=0       max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9fc280fc-5190-418a-4261-8306b19aef00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/19455ee4-536c-4045-cc95-ce5a47381c00/public" alt="HTTP Overview" />


  </details>