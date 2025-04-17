## Overview for: `federation/constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/11ba53e4-76cd-4682-dee6-b2fd15555d00/public" alt="Comparison" />


| Gateway          | Successful RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :---------------: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |        166        | 10179 total, 0 failed | avg: 880ms, p95: 2398ms  | ✅                                                                        |
| grafbase         |        165        | 10131 total, 0 failed | avg: 855ms, p95: 2525ms  | ✅                                                                        |
| apollo-router    |        157        | 9622 total, 0 failed  | avg: 1008ms, p95: 2663ms | ✅                                                                        |
| apollo-server    |        85         | 5418 total, 73 failed | avg: 3355ms, p95: 3398ms | ❌ 73 failed requests, 73 non-200 responses, 73 unexpected GraphQL errors |
| hive-gateway-bun |        83         | 5266 total, 0 failed  | avg: 3421ms, p95: 5788ms | ✅                                                                        |
| hive-gateway     |        75         | 4822 total, 25 failed | avg: 3794ms, p95: 5289ms | ❌ 25 failed requests, 25 non-200 responses, 25 unexpected GraphQL errors |
| mercurius        |        73         | 4552 total, 0 failed  | avg: 3985ms, p95: 5275ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30477      ✗ 0    
     data_received..................: 893 MB  15 MB/s
     data_sent......................: 12 MB   198 kB/s
     http_req_blocked...............: avg=1.42ms   min=1.96µs  med=4.83µs   max=3.33s  p(90)=7.33µs   p(95)=15.37µs
     http_req_connecting............: avg=1.08ms   min=0s      med=0s       max=3.33s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=880.42ms min=4.01ms  med=694.29ms max=6.3s   p(90)=1.9s     p(95)=2.39s  
       { expected_response:true }...: avg=880.42ms min=4.01ms  med=694.29ms max=6.3s   p(90)=1.9s     p(95)=2.39s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10179
     http_req_receiving.............: avg=349.97ms min=37.17µs med=130.02µs max=5.71s  p(90)=1.22s    p(95)=1.83s  
     http_req_sending...............: avg=24.31ms  min=7.44µs  med=26.25µs  max=3.07s  p(90)=194.34µs p(95)=29.21ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=506.13ms min=3.83ms  med=486.27ms max=2.61s  p(90)=895.97ms p(95)=1.03s  
     http_reqs......................: 10179   166.625928/s
     iteration_duration.............: avg=1.77s    min=25.8ms  med=1.42s    max=10.39s p(90)=3.71s    p(95)=4.5s   
     iterations.....................: 10159   166.298536/s
     vus............................: 77      min=77       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/927cad0c-64bb-4e40-83ff-9ce32c826c00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ae54e1b2-0dda-4e1c-82ed-6b209915e500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b93ea6f6-544d-4ca0-90af-5925b835cc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30333      ✗ 0    
     data_received..................: 890 MB  15 MB/s
     data_sent......................: 12 MB   197 kB/s
     http_req_blocked...............: avg=1.07ms   min=1.69µs  med=3.82µs   max=1.77s  p(90)=5.67µs   p(95)=11.5µs
     http_req_connecting............: avg=669.73µs min=0s      med=0s       max=1.39s  p(90)=0s       p(95)=0s    
     http_req_duration..............: avg=855.01ms min=3.59ms  med=633.81ms max=6.97s  p(90)=1.99s    p(95)=2.52s 
       { expected_response:true }...: avg=855.01ms min=3.59ms  med=633.81ms max=6.97s  p(90)=1.99s    p(95)=2.52s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 10131
     http_req_receiving.............: avg=354.54ms min=33.5µs  med=102.36µs max=6.94s  p(90)=1.35s    p(95)=1.99s 
     http_req_sending...............: avg=15ms     min=8.06µs  med=17.73µs  max=2.73s  p(90)=129.89µs p(95)=2.55ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=485.46ms min=3.51ms  med=438.36ms max=2.45s  p(90)=926.63ms p(95)=1.11s 
     http_reqs......................: 10131   165.997811/s
     iteration_duration.............: avg=1.78s    min=21.21ms med=1.46s    max=10.27s p(90)=3.75s    p(95)=4.55s 
     iterations.....................: 10111   165.670108/s
     vus............................: 63      min=63       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/53ee7271-0824-4a47-21e6-167d3da6ea00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b58c9cc1-5a93-41ef-1ae9-942013634200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/47473049-675d-42d9-76b3-f3da0f61e000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 28806      ✗ 0    
     data_received..................: 844 MB  14 MB/s
     data_sent......................: 11 MB   187 kB/s
     http_req_blocked...............: avg=1.64ms   min=1.74µs  med=3.77µs   max=1.72s p(90)=5.84µs   p(95)=12.07µs
     http_req_connecting............: avg=1.41ms   min=0s      med=0s       max=1.51s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=1s       min=7.15ms  med=818.99ms max=6s    p(90)=2.13s    p(95)=2.66s  
       { expected_response:true }...: avg=1s       min=7.15ms  med=818.99ms max=6s    p(90)=2.13s    p(95)=2.66s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 9622 
     http_req_receiving.............: avg=352.18ms min=36.92µs med=94.9µs   max=4.95s p(90)=1.38s    p(95)=2.09s  
     http_req_sending...............: avg=19.03ms  min=7.49µs  med=17.88µs  max=3.52s p(90)=147.12µs p(95)=12.58ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=636.67ms min=7.03ms  med=600.1ms  max=2.42s p(90)=1.1s     p(95)=1.29s  
     http_reqs......................: 9622    157.728349/s
     iteration_duration.............: avg=1.88s    min=31.29ms med=1.61s    max=8.69s p(90)=3.77s    p(95)=4.53s  
     iterations.....................: 9602    157.400499/s
     vus............................: 31      min=31       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ac3fd24b-c1de-4552-76ec-c434a6241700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/98c845f0-ad0d-4711-7a0e-2cf268d3aa00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4777cd70-5184-4ab2-3dc1-11623f62e600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 5325 / ✗ 73
     ✗ no graphql errors
      ↳  98% — ✓ 5325 / ✗ 73
     ✓ valid response structure

     █ setup

     checks.........................: 99.09% ✓ 15975     ✗ 146  
     data_received..................: 470 MB 7.5 MB/s
     data_sent......................: 6.4 MB 103 kB/s
     http_req_blocked...............: avg=518.93µs min=1.53µs   med=3.16µs   max=22.3ms   p(90)=5.25µs   p(95)=877.84µs
     http_req_connecting............: avg=499.87µs min=0s       med=0s       max=22.28ms  p(90)=0s       p(95)=826.89µs
     http_req_duration..............: avg=3.35s    min=11.34ms  med=2s       max=1m0s     p(90)=2.53s    p(95)=3.39s   
       { expected_response:true }...: avg=2.58s    min=11.34ms  med=1.99s    max=59.11s   p(90)=2.49s    p(95)=3.01s   
     http_req_failed................: 1.34%  ✓ 73        ✗ 5345 
     http_req_receiving.............: avg=437.09µs min=0s       med=105.36µs max=231.03ms p(90)=207.45µs p(95)=387.28µs
     http_req_sending...............: avg=124.14µs min=8.88µs   med=15.79µs  max=47.65ms  p(90)=37.52µs  p(95)=261.23µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.35s    min=11.27ms  med=2s       max=1m0s     p(90)=2.53s    p(95)=3.39s   
     http_reqs......................: 5418   86.852203/s
     iteration_duration.............: avg=3.38s    min=229.77ms med=2.02s    max=1m0s     p(90)=2.55s    p(95)=3.42s   
     iterations.....................: 5398   86.531597/s
     vus............................: 70     min=70      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fddaef0a-b32e-4319-04fe-f671899c2400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bc10effe-36fc-4f30-62fa-243fda0ac100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4527e145-cc45-43fb-637c-8bd03ac65700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 15738     ✗ 0    
     data_received..................: 462 MB  7.3 MB/s
     data_sent......................: 6.3 MB  99 kB/s
     http_req_blocked...............: avg=1.34ms  min=1.46µs   med=3.65µs   max=77.81ms  p(90)=6.29µs  p(95)=3.77ms  
     http_req_connecting............: avg=1.28ms  min=0s       med=0s       max=77.77ms  p(90)=0s      p(95)=2.94ms  
     http_req_duration..............: avg=3.42s   min=16.81ms  med=3.13s    max=8.42s    p(90)=5.13s   p(95)=5.78s   
       { expected_response:true }...: avg=3.42s   min=16.81ms  med=3.13s    max=8.42s    p(90)=5.13s   p(95)=5.78s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5266 
     http_req_receiving.............: avg=54.68ms min=38.41µs  med=137.75µs max=2.31s    p(90)=66.3ms  p(95)=339.95ms
     http_req_sending...............: avg=1.92ms  min=9.4µs    med=18.72µs  max=733.43ms p(90)=138.3µs p(95)=7.35ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.36s   min=16.67ms  med=3.08s    max=8.42s    p(90)=5.07s   p(95)=5.74s   
     http_reqs......................: 5266    83.576189/s
     iteration_duration.............: avg=3.51s   min=165.52ms med=3.18s    max=8.43s    p(90)=5.31s   p(95)=5.94s   
     iterations.....................: 5246    83.258771/s
     vus............................: 9       min=9       max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1a949caa-0049-404e-4da3-d359916ccb00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9cc50058-b176-40aa-a27c-b486f99b6600/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fa780393-faad-4d65-e668-1f075a5d6e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 4777 / ✗ 25
     ✗ no graphql errors
      ↳  99% — ✓ 4777 / ✗ 25
     ✓ valid response structure

     █ setup

     checks.........................: 99.65% ✓ 14331     ✗ 50   
     data_received..................: 421 MB 6.7 MB/s
     data_sent......................: 5.7 MB 91 kB/s
     http_req_blocked...............: avg=550.05µs min=1.56µs   med=3.89µs   max=25.27ms  p(90)=6µs      p(95)=2.05ms  
     http_req_connecting............: avg=528.12µs min=0s       med=0s       max=25.23ms  p(90)=0s       p(95)=1.35ms  
     http_req_duration..............: avg=3.79s    min=15.98ms  med=2.55s    max=1m0s     p(90)=3.51s    p(95)=5.28s   
       { expected_response:true }...: avg=3.5s     min=15.98ms  med=2.54s    max=59.4s    p(90)=3.46s    p(95)=4.99s   
     http_req_failed................: 0.51%  ✓ 25        ✗ 4797 
     http_req_receiving.............: avg=364.69µs min=0s       med=112.37µs max=117.34ms p(90)=418.69µs p(95)=1.13ms  
     http_req_sending...............: avg=176.17µs min=8.41µs   med=22µs     max=24.85ms  p(90)=55.29µs  p(95)=464.02µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.79s    min=15.85ms  med=2.54s    max=1m0s     p(90)=3.51s    p(95)=5.28s   
     http_reqs......................: 4822   76.307523/s
     iteration_duration.............: avg=3.83s    min=155.43ms med=2.57s    max=1m0s     p(90)=3.54s    p(95)=5.31s   
     iterations.....................: 4802   75.991025/s
     vus............................: 44     min=44      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/598d9de0-fd2b-47d9-acd1-0cd4e1fa0000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bd3d0e3d-0a65-431b-e041-b8db22db1500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bccc32e7-2144-4c52-4997-9d63b22abe00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 13596     ✗ 0    
     data_received..................: 400 MB  6.5 MB/s
     data_sent......................: 5.4 MB  87 kB/s
     http_req_blocked...............: avg=452.72µs min=1.85µs   med=4.18µs   max=44.66ms  p(90)=6.52µs   p(95)=1ms     
     http_req_connecting............: avg=423.3µs  min=0s       med=0s       max=20.63ms  p(90)=0s       p(95)=802.16µs
     http_req_duration..............: avg=3.98s    min=12.01ms  med=4s       max=9.16s    p(90)=4.65s    p(95)=5.27s   
       { expected_response:true }...: avg=3.98s    min=12.01ms  med=4s       max=9.16s    p(90)=4.65s    p(95)=5.27s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4552 
     http_req_receiving.............: avg=2.58ms   min=41.63µs  med=110.02µs max=887.16ms p(90)=279.72µs p(95)=678.34µs
     http_req_sending...............: avg=162.01µs min=9.5µs    med=23.68µs  max=49.93ms  p(90)=49.33µs  p(95)=248.47µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.98s    min=11.9ms   med=4s       max=9.15s    p(90)=4.65s    p(95)=5.27s   
     http_reqs......................: 4552    73.486529/s
     iteration_duration.............: avg=4.02s    min=171.46ms med=4.02s    max=9.2s     p(90)=4.67s    p(95)=5.29s   
     iterations.....................: 4532    73.163653/s
     vus............................: 239     min=239     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7a800f63-c28f-4348-7bfd-13747149cc00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ec342dd8-e883-42ac-cfff-3a75a09e9100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b43513cf-814b-4a96-3818-af9ecd0d8a00/public" alt="HTTP Overview" />


  </details>