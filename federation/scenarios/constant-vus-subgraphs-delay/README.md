## Overview for: `federation/constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ac2df01d-9cec-4aa6-9855-c62942344500/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  180   | 11006 total, 0 failed | avg: 838ms, p95: 2105ms  | ✅                                                                        |
| grafbase         |  165   | 10094 total, 0 failed | avg: 932ms, p95: 2402ms  | ✅                                                                        |
| apollo-router    |  164   | 10049 total, 0 failed | avg: 901ms, p95: 2520ms  | ✅                                                                        |
| hive-gateway-bun |   82   | 5174 total, 0 failed  | avg: 3488ms, p95: 5845ms | ✅                                                                        |
| apollo-server    |   78   | 4928 total, 79 failed | avg: 3692ms, p95: 3803ms | ❌ 79 failed requests, 79 non-200 responses, 79 unexpected GraphQL errors |
| hive-gateway     |   76   | 4862 total, 25 failed | avg: 3763ms, p95: 5068ms | ❌ 25 failed requests, 25 non-200 responses, 25 unexpected GraphQL errors |
| mercurius        |   68   | 4276 total, 0 failed  | avg: 4247ms, p95: 5270ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32958      ✗ 0    
     data_received..................: 966 MB  16 MB/s
     data_sent......................: 13 MB   215 kB/s
     http_req_blocked...............: avg=1.22ms   min=1.51µs  med=3.14µs  max=1.94s  p(90)=4.85µs   p(95)=9.59µs
     http_req_connecting............: avg=989.26µs min=0s      med=0s      max=1.73s  p(90)=0s       p(95)=0s    
     http_req_duration..............: avg=837.67ms min=3.22ms  med=696.4ms max=4.63s  p(90)=1.8s     p(95)=2.1s  
       { expected_response:true }...: avg=837.67ms min=3.22ms  med=696.4ms max=4.63s  p(90)=1.8s     p(95)=2.1s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 11006
     http_req_receiving.............: avg=271.95ms min=34.2µs  med=84.6µs  max=3.95s  p(90)=1.16s    p(95)=1.64s 
     http_req_sending...............: avg=20.34ms  min=7.99µs  med=15.05µs max=3.08s  p(90)=123.01µs p(95)=4.13ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=545.37ms min=3.08ms  med=531.4ms max=2.57s  p(90)=966.08ms p(95)=1.11s 
     http_reqs......................: 11006   180.898367/s
     iteration_duration.............: avg=1.63s    min=18.48ms med=1.37s   max=10.47s p(90)=3.4s     p(95)=4.04s 
     iterations.....................: 10986   180.56964/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/501eb1ee-53a5-419c-37ab-1eaaa1dd4400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4ffb5388-1a86-41af-0c1b-ddbea6030d00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/78eff821-6aa3-4dd1-e3e0-91b7d391e300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30222      ✗ 0    
     data_received..................: 887 MB  15 MB/s
     data_sent......................: 12 MB   197 kB/s
     http_req_blocked...............: avg=1.51ms   min=1.53µs  med=3.91µs   max=2.04s p(90)=5.63µs   p(95)=11.94µs
     http_req_connecting............: avg=1.28ms   min=0s      med=0s       max=2.04s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=931.59ms min=3.25ms  med=772.09ms max=6.07s p(90)=1.97s    p(95)=2.4s   
       { expected_response:true }...: avg=931.59ms min=3.25ms  med=772.09ms max=6.07s p(90)=1.97s    p(95)=2.4s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10094
     http_req_receiving.............: avg=290.11ms min=33.5µs  med=91.05µs  max=4.92s p(90)=1.26s    p(95)=1.8s   
     http_req_sending...............: avg=23.61ms  min=8.12µs  med=19.9µs   max=3.22s p(90)=152.12µs p(95)=15.36ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=617.86ms min=3.17ms  med=605.56ms max=3.52s p(90)=1.06s    p(95)=1.22s  
     http_reqs......................: 10094   165.682128/s
     iteration_duration.............: avg=1.79s    min=22.05ms med=1.54s    max=9.9s  p(90)=3.57s    p(95)=4.35s  
     iterations.....................: 10074   165.353849/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9c47649f-4a0b-425a-a06d-b38cf6116700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/db448f78-3d26-4556-4b2d-1bc7c162cc00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2e5b2c1d-24d6-446f-52c2-2d70600f6e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30087      ✗ 0    
     data_received..................: 882 MB  15 MB/s
     data_sent......................: 12 MB   196 kB/s
     http_req_blocked...............: avg=1.36ms   min=1.69µs  med=3.21µs   max=1.94s    p(90)=4.86µs   p(95)=10.65µs
     http_req_connecting............: avg=1.06ms   min=0s      med=0s       max=472.23ms p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=900.53ms min=6.94ms  med=624.25ms max=8.25s    p(90)=2.05s    p(95)=2.52s  
       { expected_response:true }...: avg=900.53ms min=6.94ms  med=624.25ms max=8.25s    p(90)=2.05s    p(95)=2.52s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10049
     http_req_receiving.............: avg=407.19ms min=32.81µs med=89.8µs   max=8.18s    p(90)=1.49s    p(95)=2.06s  
     http_req_sending...............: avg=16.77ms  min=7.86µs  med=14.27µs  max=3.69s    p(90)=123.54µs p(95)=11.48ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=476.56ms min=6.85ms  med=411.67ms max=2.32s    p(90)=914.76ms p(95)=1.1s   
     http_reqs......................: 10049   164.750681/s
     iteration_duration.............: avg=1.79s    min=34.89ms med=1.41s    max=12.49s   p(90)=3.81s    p(95)=4.71s  
     iterations.....................: 10029   164.422787/s
     vus............................: 18      min=18       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ac9c6661-0b6b-4f49-4a31-c7d62527c100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ed529b88-d6b7-48b4-f77f-34cc007db500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c4237ded-d945-485c-5f86-7f3d75ede400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 15462     ✗ 0    
     data_received..................: 454 MB  7.2 MB/s
     data_sent......................: 6.1 MB  98 kB/s
     http_req_blocked...............: avg=404.86µs min=1.55µs   med=3.84µs   max=71.04ms  p(90)=7.21µs   p(95)=868.71µs
     http_req_connecting............: avg=353.18µs min=0s       med=0s       max=19.87ms  p(90)=0s       p(95)=531.16µs
     http_req_duration..............: avg=3.48s    min=17.14ms  med=3.19s    max=7.85s    p(90)=5.25s    p(95)=5.84s   
       { expected_response:true }...: avg=3.48s    min=17.14ms  med=3.19s    max=7.85s    p(90)=5.25s    p(95)=5.84s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5174 
     http_req_receiving.............: avg=54.85ms  min=42.23µs  med=154.87µs max=2.08s    p(90)=20.3ms   p(95)=341.72ms
     http_req_sending...............: avg=910.85µs min=8.79µs   med=19.73µs  max=477.39ms p(90)=142.74µs p(95)=720.72µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.43s    min=16.94ms  med=3.16s    max=7.58s    p(90)=5.15s    p(95)=5.83s   
     http_reqs......................: 5174    82.294016/s
     iteration_duration.............: avg=3.56s    min=338.96ms med=3.25s    max=7.87s    p(90)=5.43s    p(95)=5.88s   
     iterations.....................: 5154    81.97591/s
     vus............................: 117     min=117     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4e6abf23-7a22-427f-96a4-7542cf533e00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bdfa0e42-53f9-4197-7219-d430ead8f000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/97e3aa7b-d4a3-488f-7fba-14e1121ca900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  98% — ✓ 4829 / ✗ 79
     ✗ no graphql errors
      ↳  98% — ✓ 4829 / ✗ 79
     ✓ valid response structure

     █ setup

     checks.........................: 98.92% ✓ 14487     ✗ 158  
     data_received..................: 426 MB 6.8 MB/s
     data_sent......................: 5.8 MB 93 kB/s
     http_req_blocked...............: avg=298µs    min=1.44µs   med=3.15µs   max=11.17ms p(90)=5.36µs  p(95)=719.57µs
     http_req_connecting............: avg=285.11µs min=0s       med=0s       max=11.14ms p(90)=0s      p(95)=592.07µs
     http_req_duration..............: avg=3.69s    min=13.58ms  med=2.11s    max=1m0s    p(90)=2.73s   p(95)=3.8s    
       { expected_response:true }...: avg=2.77s    min=13.58ms  med=2.1s     max=59.25s  p(90)=2.7s    p(95)=2.97s   
     http_req_failed................: 1.60%  ✓ 79        ✗ 4849 
     http_req_receiving.............: avg=301.41µs min=0s       med=105.26µs max=75.06ms p(90)=211.4µs p(95)=386.27µs
     http_req_sending...............: avg=208.07µs min=8.58µs   med=15.73µs  max=89.07ms p(90)=40.8µs  p(95)=350.79µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.69s    min=13.48ms  med=2.11s    max=1m0s    p(90)=2.73s   p(95)=3.8s    
     http_reqs......................: 4928   78.668542/s
     iteration_duration.............: avg=3.72s    min=461.93ms med=2.13s    max=1m0s    p(90)=2.76s   p(95)=3.82s   
     iterations.....................: 4908   78.349271/s
     vus............................: 100    min=100     max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f23f42f3-eb1c-4a07-f2cc-6f229d073600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7c34892f-f330-4785-90e1-d25d76795c00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/041b0878-b678-4502-5dc5-39ce10dfb500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 4817 / ✗ 25
     ✗ no graphql errors
      ↳  99% — ✓ 4817 / ✗ 25
     ✓ valid response structure

     █ setup

     checks.........................: 99.65% ✓ 14451     ✗ 50   
     data_received..................: 425 MB 6.7 MB/s
     data_sent......................: 5.8 MB 91 kB/s
     http_req_blocked...............: avg=468.88µs min=1.55µs   med=3.61µs   max=27.62ms  p(90)=5.86µs   p(95)=3.09ms  
     http_req_connecting............: avg=426.63µs min=0s       med=0s       max=17.58ms  p(90)=0s       p(95)=1.81ms  
     http_req_duration..............: avg=3.76s    min=14.37ms  med=2.56s    max=1m0s     p(90)=3.56s    p(95)=5.06s   
       { expected_response:true }...: avg=3.47s    min=14.37ms  med=2.55s    max=59.32s   p(90)=3.53s    p(95)=4.68s   
     http_req_failed................: 0.51%  ✓ 25        ✗ 4837 
     http_req_receiving.............: avg=1.03ms   min=0s       med=109.08µs max=214.08ms p(90)=548.48µs p(95)=1.61ms  
     http_req_sending...............: avg=152.91µs min=8.62µs   med=20.18µs  max=24.21ms  p(90)=45.28µs  p(95)=352.45µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.76s    min=14.28ms  med=2.56s    max=1m0s     p(90)=3.56s    p(95)=5.06s   
     http_reqs......................: 4862   76.864609/s
     iteration_duration.............: avg=3.8s     min=148.82ms med=2.58s    max=1m0s     p(90)=3.6s     p(95)=5.28s   
     iterations.....................: 4842   76.548424/s
     vus............................: 30     min=30      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/308ab8c8-b9c6-43df-6348-b4daabbb6000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5678f6a2-bc87-4311-922c-3819624c5c00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3ad268e0-d756-4f57-3fe8-290f9fa48f00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 12768     ✗ 0    
     data_received..................: 375 MB  6.0 MB/s
     data_sent......................: 5.1 MB  82 kB/s
     http_req_blocked...............: avg=3.13ms  min=1.85µs   med=4.57µs   max=106.68ms p(90)=6.63µs   p(95)=25.38ms 
     http_req_connecting............: avg=3.03ms  min=0s       med=0s       max=106.65ms p(90)=0s       p(95)=24.93ms 
     http_req_duration..............: avg=4.24s   min=16.87ms  med=4.21s    max=8.71s    p(90)=4.94s    p(95)=5.26s   
       { expected_response:true }...: avg=4.24s   min=16.87ms  med=4.21s    max=8.71s    p(90)=4.94s    p(95)=5.26s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4276 
     http_req_receiving.............: avg=4.91ms  min=45.87µs  med=114.45µs max=976.05ms p(90)=254.71µs p(95)=569.16µs
     http_req_sending...............: avg=845.1µs min=9.05µs   med=26.09µs  max=104.33ms p(90)=46.37µs  p(95)=1.15ms  
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=4.24s   min=16.74ms  med=4.19s    max=8.71s    p(90)=4.94s    p(95)=5.26s   
     http_reqs......................: 4276    68.77911/s
     iteration_duration.............: avg=4.29s   min=283.64ms med=4.3s     max=8.72s    p(90)=4.96s    p(95)=5.28s   
     iterations.....................: 4256    68.457411/s
     vus............................: 83      min=83      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f171ae92-11d4-4380-1e2b-be4dbcb96300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/088e939b-502f-4ce8-7057-d32f5611b400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3f7a65ed-7e08-4849-53d2-3c5a66ad5000/public" alt="HTTP Overview" />


  </details>