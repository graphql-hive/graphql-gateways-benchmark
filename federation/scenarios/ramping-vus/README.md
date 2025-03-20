## Overview for: `federation/ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was trying to reach 2000 concurrent VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5ad74c92-4f8b-4bfb-6886-fb4ce4885d00/public" alt="Comparison" />


| Gateway       | duration(p95)⬇️ |  RPS  |        Requests        |                       Durations                        | Notes                                                                       |
| :------------ | :-------------: | :---: | :--------------------: | :----------------------------------------------------: | :-------------------------------------------------------------------------- |
| cosmo         |     5624ms      |  175  | 12286 total, 0 failed  |  avg: 2606ms, p95: 5624ms, max: 10020ms, med: 2386ms   | ✅                                                                           |
| apollo-router |     7307ms      |  163  | 11734 total, 10 failed |  avg: 2768ms, p95: 7308ms, max: 15433ms, med: 2485ms   | ❌ 10 failed requests, 10 non-200 responses, 10 unexpected GraphQL errors    |
| mercurius     |     38008ms     |  54   |  4817 total, 0 failed  | avg: 21600ms, p95: 38008ms, max: 40342ms, med: 22826ms | ✅                                                                           |
| hive-gateway  |     50463ms     |  81   |  7182 total, 0 failed  | avg: 12847ms, p95: 50464ms, max: 57200ms, med: 4010ms  | ✅                                                                           |
| apollo-server |     60000ms     |  75   | 7037 total, 582 failed | avg: 13220ms, p95: 60000ms, max: 60076ms, med: 2340ms  | ❌ 582 failed requests, 582 non-200 responses, 582 unexpected GraphQL errors |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 36798      ✗ 0     
     data_received..................: 1.1 GB  15 MB/s
     data_sent......................: 15 MB   208 kB/s
     http_req_blocked...............: avg=326.81ms min=1.57µs  med=3.97µs  max=9.23s  p(90)=1.34s    p(95)=2.55s   
     http_req_connecting............: avg=318.35ms min=0s      med=0s      max=9.23s  p(90)=1.29s    p(95)=2.54s   
     http_req_duration..............: avg=2.6s     min=3.83ms  med=2.38s   max=10.02s p(90)=4.78s    p(95)=5.62s   
       { expected_response:true }...: avg=2.6s     min=3.83ms  med=2.38s   max=10.02s p(90)=4.78s    p(95)=5.62s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 12286 
     http_req_receiving.............: avg=115.9ms  min=34.94µs med=78.02µs max=6.25s  p(90)=7.2ms    p(95)=977.48ms
     http_req_sending...............: avg=158.3ms  min=7.82µs  med=20.15µs max=6.74s  p(90)=478.27ms p(95)=1.01s   
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.33s    min=3.65ms  med=2.2s    max=8.76s  p(90)=4.47s    p(95)=4.85s   
     http_reqs......................: 12286   175.201077/s
     iteration_duration.............: avg=5.74s    min=12.85ms med=4.78s   max=26.17s p(90)=11.73s   p(95)=14.1s   
     iterations.....................: 12266   174.915873/s
     vus............................: 4       min=4        max=1998
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/326c7509-17f1-45a4-dc57-04f15148ab00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ae795a7f-5908-4a0e-06d1-f0232d1fb800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a7b16c86-1416-48d1-b42d-99c3e76e3200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 11704 / ✗ 10
     ✗ no graphql errors
      ↳  99% — ✓ 11704 / ✗ 10
     ✓ valid response structure

     █ setup

     checks.........................: 99.94% ✓ 35112      ✗ 20    
     data_received..................: 1.0 GB 14 MB/s
     data_sent......................: 14 MB  194 kB/s
     http_req_blocked...............: avg=284.57ms min=1.82µs   med=3.89µs  max=13.1s  p(90)=198.72ms p(95)=2.29s   
     http_req_connecting............: avg=256.8ms  min=0s       med=0s      max=10.42s p(90)=174.07ms p(95)=2.2s    
     http_req_duration..............: avg=2.76s    min=355.33µs med=2.48s   max=15.43s p(90)=5.49s    p(95)=7.3s    
       { expected_response:true }...: avg=2.76s    min=6.67ms   med=2.48s   max=15.43s p(90)=5.48s    p(95)=7.27s   
     http_req_failed................: 0.08%  ✓ 10         ✗ 11724 
     http_req_receiving.............: avg=735.97ms min=0s       med=105.7µs max=12.47s p(90)=2.85s    p(95)=4.76s   
     http_req_sending...............: avg=182.23ms min=8.26µs   med=19.25µs max=11.79s p(90)=128.94ms p(95)=909.27ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=1.84s    min=10.92µs  med=1.4s    max=9.03s  p(90)=4.24s    p(95)=4.86s   
     http_reqs......................: 11734  163.692823/s
     iteration_duration.............: avg=6.23s    min=35.61ms  med=5.25s   max=32.46s p(90)=12.87s   p(95)=15.53s  
     iterations.....................: 11714  163.413817/s
     vus............................: 379    min=67       max=1971
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0bece9af-1b00-4432-1873-5c36e09b1200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/260634dc-caf2-4d85-3cee-35e318597400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/85902ca8-5140-4771-4191-ce4257072900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14391     ✗ 0     
     data_received..................: 423 MB  4.7 MB/s
     data_sent......................: 5.7 MB  64 kB/s
     http_req_blocked...............: avg=286.02µs min=1.76µs   med=5.09µs   max=51.32ms p(90)=537.71µs p(95)=684.81µs
     http_req_connecting............: avg=249.87µs min=0s       med=0s       max=51.25ms p(90)=461.26µs p(95)=606.4µs 
     http_req_duration..............: avg=21.59s   min=17.67ms  med=22.82s   max=40.34s  p(90)=37.23s   p(95)=38s     
       { expected_response:true }...: avg=21.59s   min=17.67ms  med=22.82s   max=40.34s  p(90)=37.23s   p(95)=38s     
     http_req_failed................: 0.00%   ✓ 0         ✗ 4817  
     http_req_receiving.............: avg=45.31ms  min=33.86µs  med=118.89µs max=3.46s   p(90)=382.77µs p(95)=4.71ms  
     http_req_sending...............: avg=58.61µs  min=9.52µs   med=31.36µs  max=12.54ms p(90)=72.41µs  p(95)=93.09µs 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=21.55s   min=17.53ms  med=22.82s   max=38.87s  p(90)=37s      p(95)=37.74s  
     http_reqs......................: 4817    54.020115/s
     iteration_duration.............: avg=21.91s   min=155.68ms med=22.91s   max=42.28s  p(90)=37.6s    p(95)=38.39s  
     iterations.....................: 4797    53.795825/s
     vus............................: 264     min=51      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/951e48ea-f63d-4fbd-070b-b98e28328000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/058a2833-0371-4c23-f5a8-b9aeb18d8200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4d101cc0-cf7f-4eab-c768-36fb3142e900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 21486     ✗ 0     
     data_received..................: 631 MB  7.2 MB/s
     data_sent......................: 8.5 MB  97 kB/s
     http_req_blocked...............: avg=6.31ms min=2.34µs   med=6.24µs   max=365.06ms p(90)=8.97ms   p(95)=42.22ms
     http_req_connecting............: avg=6.17ms min=0s       med=0s       max=365ms    p(90)=8.73ms   p(95)=41.13ms
     http_req_duration..............: avg=12.84s min=18.07ms  med=4.01s    max=57.2s    p(90)=44.33s   p(95)=50.46s 
       { expected_response:true }...: avg=12.84s min=18.07ms  med=4.01s    max=57.2s    p(90)=44.33s   p(95)=50.46s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 7182  
     http_req_receiving.............: avg=2.77ms min=44.86µs  med=134.87µs max=436.51ms p(90)=2.62ms   p(95)=8.22ms 
     http_req_sending...............: avg=2.88ms min=10.11µs  med=35.01µs  max=377.02ms p(90)=854.47µs p(95)=19.72ms
     http_req_tls_handshaking.......: avg=0s     min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=12.84s min=17.92ms  med=4s       max=57.15s   p(90)=44.32s   p(95)=50.45s 
     http_reqs......................: 7182    81.936074/s
     iteration_duration.............: avg=12.96s min=194.59ms med=4.09s    max=57.59s   p(90)=44.47s   p(95)=50.53s 
     iterations.....................: 7162    81.707904/s
     vus............................: 3       min=3       max=1999
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/43651be7-2e1c-4796-5c54-8b0539c20d00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0ac7d479-75d3-4bcd-dcd9-3130aa3c4300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6b021507-37b0-4c85-588e-caf394706900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  91% — ✓ 6435 / ✗ 582
     ✗ no graphql errors
      ↳  91% — ✓ 6435 / ✗ 582
     ✓ valid response structure

     █ setup

     checks.........................: 94.31% ✓ 19305     ✗ 1164  
     data_received..................: 567 MB 6.1 MB/s
     data_sent......................: 8.4 MB 91 kB/s
     http_req_blocked...............: avg=581.21µs min=1.5µs   med=4.05µs   max=120.93ms p(90)=438.53µs p(95)=676.86µs
     http_req_connecting............: avg=547.71µs min=0s      med=0s       max=120.84ms p(90)=362.2µs  p(95)=578.45µs
     http_req_duration..............: avg=13.21s   min=13.2ms  med=2.34s    max=1m0s     p(90)=58.03s   p(95)=1m0s    
       { expected_response:true }...: avg=9s       min=13.2ms  med=2.26s    max=59.98s   p(90)=38.33s   p(95)=43.39s  
     http_req_failed................: 8.27%  ✓ 582       ✗ 6455  
     http_req_receiving.............: avg=284.34µs min=0s      med=115.88µs max=115.64ms p(90)=189.26µs p(95)=260.38µs
     http_req_sending...............: avg=264.48µs min=8.71µs  med=21.59µs  max=98.32ms  p(90)=70.29µs  p(95)=124µs   
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=13.21s   min=13.1ms  med=2.33s    max=1m0s     p(90)=58.03s   p(95)=1m0s    
     http_reqs......................: 7037   75.823663/s
     iteration_duration.............: avg=13.27s   min=64.02ms med=2.36s    max=1m0s     p(90)=58.05s   p(95)=1m0s    
     iterations.....................: 7017   75.608163/s
     vus............................: 15     min=15      max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d713f0a3-a96e-4be2-1de7-3ce8a4e0b800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/edf5832c-7f2c-427c-455d-42c84e1ba900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/67af8cdc-e7dc-4240-5595-719ff155d600/public" alt="HTTP Overview" />


  </details>