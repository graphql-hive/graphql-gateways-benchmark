## Overview for: `federation/constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/15c0be62-e194-4a38-874a-65a684779000/public" alt="Comparison" />


| Gateway       | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :------------ | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo         |  182   | 11125 total, 0 failed | avg: 822ms, p95: 2372ms  | ✅                                                                        |
| apollo-router |  165   | 10133 total, 0 failed | avg: 911ms, p95: 2650ms  | ✅                                                                        |
| hive-gateway  |   85   | 5400 total, 0 failed  | avg: 3370ms, p95: 5052ms | ✅                                                                        |
| apollo-server |   80   | 5030 total, 82 failed | avg: 3615ms, p95: 4136ms | ❌ 82 failed requests, 82 non-200 responses, 82 unexpected GraphQL errors |
| mercurius     |   65   | 4093 total, 0 failed  | avg: 4443ms, p95: 5744ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 33315      ✗ 0    
     data_received..................: 976 MB  16 MB/s
     data_sent......................: 13 MB   217 kB/s
     http_req_blocked...............: avg=1.1ms    min=1.32µs  med=3.19µs   max=2.12s p(90)=4.92µs   p(95)=9.92µs 
     http_req_connecting............: avg=710.4µs  min=0s      med=0s       max=2.12s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=821.73ms min=3.81ms  med=622.93ms max=5.55s p(90)=1.85s    p(95)=2.37s  
       { expected_response:true }...: avg=821.73ms min=3.81ms  med=622.93ms max=5.55s p(90)=1.85s    p(95)=2.37s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 11125
     http_req_receiving.............: avg=324.05ms min=32.05µs med=86.82µs  max=5.12s p(90)=1.3s     p(95)=1.86s  
     http_req_sending...............: avg=16.18ms  min=8.17µs  med=14.75µs  max=2.62s p(90)=130.23µs p(95)=15.65ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=481.49ms min=3.72ms  med=460.86ms max=2.09s p(90)=863.42ms p(95)=1.01s  
     http_reqs......................: 11125   182.398669/s
     iteration_duration.............: avg=1.61s    min=20.4ms  med=1.27s    max=10.1s p(90)=3.41s    p(95)=4.12s  
     iterations.....................: 11105   182.070762/s
     vus............................: 12      min=12       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/45bb8bab-1cae-4744-8f09-097713391400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9de3b339-63d7-43a9-dc31-4afbc3194f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d4417aed-1fa4-489f-d2a3-77c72545a900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30339      ✗ 0    
     data_received..................: 889 MB  15 MB/s
     data_sent......................: 12 MB   196 kB/s
     http_req_blocked...............: avg=1.57ms   min=1.72µs  med=3.61µs   max=1.36s  p(90)=5.71µs   p(95)=11.15µs
     http_req_connecting............: avg=1.44ms   min=0s      med=0s       max=1.36s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=911.21ms min=8.34ms  med=635.97ms max=5.82s  p(90)=2.17s    p(95)=2.65s  
       { expected_response:true }...: avg=911.21ms min=8.34ms  med=635.97ms max=5.82s  p(90)=2.17s    p(95)=2.65s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10133
     http_req_receiving.............: avg=434.46ms min=32.57µs med=99.6µs   max=5.53s  p(90)=1.67s    p(95)=2.13s  
     http_req_sending...............: avg=19.32ms  min=8.07µs  med=16.01µs  max=3.43s  p(90)=118.88µs p(95)=1.29ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=457.42ms min=8.26ms  med=386.44ms max=2.4s   p(90)=887.3ms  p(95)=1.11s  
     http_reqs......................: 10133   165.498373/s
     iteration_duration.............: avg=1.77s    min=21.83ms med=1.4s     max=10.92s p(90)=3.98s    p(95)=4.93s  
     iterations.....................: 10113   165.171721/s
     vus............................: 93      min=93       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/342b36b6-590b-46ff-bfe6-3663d0bfb900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/042c8fae-e6da-4d23-efa5-d7eca1266600/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/95a79ea7-7035-40e5-2d77-6cc6a12d5c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 16140     ✗ 0    
     data_received..................: 474 MB  7.5 MB/s
     data_sent......................: 6.4 MB  102 kB/s
     http_req_blocked...............: avg=439.95µs min=1.36µs  med=3.77µs  max=44.16ms  p(90)=5.96µs  p(95)=803.54µs
     http_req_connecting............: avg=404.52µs min=0s      med=0s      max=26.07ms  p(90)=0s      p(95)=529.02µs
     http_req_duration..............: avg=3.36s    min=12.18ms med=2.86s   max=34.7s    p(90)=3.73s   p(95)=5.05s   
       { expected_response:true }...: avg=3.36s    min=12.18ms med=2.86s   max=34.7s    p(90)=3.73s   p(95)=5.05s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5400 
     http_req_receiving.............: avg=3.17ms   min=40.47µs med=92.65µs max=339.4ms  p(90)=2.15ms  p(95)=9.65ms  
     http_req_sending...............: avg=467.75µs min=7.84µs  med=20µs    max=107.55ms p(90)=51.88µs p(95)=556.33µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.36s    min=12.08ms med=2.85s   max=34.7s    p(90)=3.73s   p(95)=5.05s   
     http_reqs......................: 5400    85.802717/s
     iteration_duration.............: avg=3.42s    min=94.92ms med=2.91s   max=34.72s   p(90)=3.81s   p(95)=5.13s   
     iterations.....................: 5380    85.484929/s
     vus............................: 167     min=167     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c9781b17-19b9-4ab4-c614-fefb8c3e1e00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/38089cc9-8076-4679-cf78-46c86d1dc100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5913c218-e96d-4ffe-4546-3e6b9f008900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 4928 / ✗ 82
     ✗ no graphql errors
      ↳  98% — ✓ 4928 / ✗ 82
     ✓ valid response structure

     █ setup

     checks.........................: 98.90% ✓ 14784     ✗ 164  
     data_received..................: 435 MB 6.9 MB/s
     data_sent......................: 6.0 MB 95 kB/s
     http_req_blocked...............: avg=309.13µs min=1.39µs   med=3.01µs   max=29.36ms p(90)=5.26µs  p(95)=229.43µs
     http_req_connecting............: avg=296.19µs min=0s       med=0s       max=23.55ms p(90)=0s      p(95)=187.32µs
     http_req_duration..............: avg=3.61s    min=13.67ms  med=2.01s    max=1m0s    p(90)=2.67s   p(95)=4.13s   
       { expected_response:true }...: avg=2.68s    min=13.67ms  med=1.99s    max=59.68s  p(90)=2.62s   p(95)=2.89s   
     http_req_failed................: 1.63%  ✓ 82        ✗ 4948 
     http_req_receiving.............: avg=219.79µs min=0s       med=106.25µs max=60.93ms p(90)=173.6µs p(95)=217.45µs
     http_req_sending...............: avg=70.18µs  min=8.24µs   med=15.16µs  max=22.77ms p(90)=34.8µs  p(95)=114.22µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.61s    min=13.55ms  med=2.01s    max=1m0s    p(90)=2.67s   p(95)=4.13s   
     http_reqs......................: 5030   80.324176/s
     iteration_duration.............: avg=3.64s    min=206.36ms med=2.03s    max=1m0s    p(90)=2.69s   p(95)=4.25s   
     iterations.....................: 5010   80.004795/s
     vus............................: 95     min=95      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d07b7e55-d01d-4310-e258-37f7c8595b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cc45956d-3204-4bf7-548e-6c79b7f99f00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b9821dd1-ed1b-4e2e-825d-590809689e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 12219     ✗ 0    
     data_received..................: 359 MB  5.8 MB/s
     data_sent......................: 4.9 MB  78 kB/s
     http_req_blocked...............: avg=1.11ms   min=1.88µs   med=4.92µs   max=63.89ms  p(90)=7.39µs   p(95)=6.93ms  
     http_req_connecting............: avg=1.08ms   min=0s       med=0s       max=63.83ms  p(90)=0s       p(95)=6.87ms  
     http_req_duration..............: avg=4.44s    min=14.37ms  med=4.34s    max=10.06s   p(90)=5.54s    p(95)=5.74s   
       { expected_response:true }...: avg=4.44s    min=14.37ms  med=4.34s    max=10.06s   p(90)=5.54s    p(95)=5.74s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4093 
     http_req_receiving.............: avg=7.46ms   min=41.9µs   med=119.96µs max=870.16ms p(90)=183.27µs p(95)=266.33µs
     http_req_sending...............: avg=798.62µs min=10.44µs  med=28.58µs  max=37.67ms  p(90)=52.31µs  p(95)=2.17ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=4.43s    min=14.25ms  med=4.34s    max=10.04s   p(90)=5.54s    p(95)=5.73s   
     http_reqs......................: 4093    65.83976/s
     iteration_duration.............: avg=4.48s    min=199.57ms med=4.35s    max=10.08s   p(90)=5.55s    p(95)=5.75s   
     iterations.....................: 4073    65.518041/s
     vus............................: 57      min=57      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a7283e3c-2729-4b68-ccef-feaa739be700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8b4a6b9c-15d0-4030-4a8c-548eaf737d00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b9b19dad-6af7-4d69-fc86-b60d1accfc00/public" alt="HTTP Overview" />


  </details>