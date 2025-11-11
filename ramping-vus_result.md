## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e4def9ca-94aa-462f-84b5-80bdacdc0200/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |         Duration         | Notes                                                                  |
| :-------------------------- | :----: | :--------------------: | :----------------------: | :--------------------------------------------------------------------- |
| hive-router                 |  1692  | 105643 total, 0 failed |  avg: 132ms, p95: 319ms  | ✅                                                                     |
| grafbase                    |  1532  | 96934 total, 0 failed  |  avg: 143ms, p95: 330ms  | ✅                                                                     |
| cosmo                       |  679   | 43411 total, 0 failed  |  avg: 323ms, p95: 710ms  | ✅                                                                     |
| hive-gateway-router-runtime |  606   | 39921 total, 0 failed  |  avg: 352ms, p95: 740ms  | ❌ non-compatible response structure (2)                               |
| apollo-router               |  395   | 26620 total, 0 failed  | avg: 529ms, p95: 1187ms  | ❌ 23 unexpected GraphQL errors, non-compatible response structure (1) |
| hive-gateway                |  256   | 18225 total, 0 failed  | avg: 769ms, p95: 1681ms  | ✅                                                                     |
| apollo-gateway              |  153   | 10587 total, 0 failed  | avg: 1228ms, p95: 2601ms | ✅                                                                     |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 313929      ✗ 0     
     data_received..................: 9.3 GB  148 MB/s
     data_sent......................: 123 MB  2.0 MB/s
     http_req_blocked...............: avg=531.91µs min=1.22µs  med=2.72µs   max=351.92ms p(90)=4.41µs   p(95)=5.4µs    p(99.9)=180.71ms
     http_req_connecting............: avg=526.92µs min=0s      med=0s       max=351.84ms p(90)=0s       p(95)=0s       p(99.9)=180.23ms
     http_req_duration..............: avg=131.77ms min=1.97ms  med=117.24ms max=490.34ms p(90)=271.09ms p(95)=319.27ms p(99.9)=420.12ms
       { expected_response:true }...: avg=131.77ms min=1.97ms  med=117.24ms max=490.34ms p(90)=271.09ms p(95)=319.27ms p(99.9)=420.12ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 105643
     http_req_receiving.............: avg=573.89µs min=25.33µs med=44.11µs  max=149.64ms p(90)=158.09µs p(95)=432.71µs p(99.9)=80.37ms 
     http_req_sending...............: avg=467.16µs min=5.43µs  med=10.5µs   max=167.23ms p(90)=30.08µs  p(95)=139.6µs  p(99.9)=75.05ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=130.73ms min=1.92ms  med=116.25ms max=474.55ms p(90)=268.69ms p(95)=317.11ms p(99.9)=417.87ms
     http_reqs......................: 105643  1692.189419/s
     iteration_duration.............: avg=133.9ms  min=2.12ms  med=118.89ms max=813.14ms p(90)=273.79ms p(95)=322.03ms p(99.9)=469.74ms
     iterations.....................: 104643  1676.17142/s
     success_rate...................: 100.00% ✓ 104643      ✗ 0     
     vus............................: 82      min=0         max=496 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/eb7aeadf-f98c-4f4e-1a53-954dafccf600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0de89223-f7cc-4213-2e97-777958199400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 287802      ✗ 0    
     data_received..................: 8.5 GB  135 MB/s
     data_sent......................: 113 MB  1.8 MB/s
     http_req_blocked...............: avg=692.27µs min=1.25µs  med=2.9µs    max=508.16ms p(90)=4.24µs   p(95)=5.13µs   p(99.9)=226.19ms
     http_req_connecting............: avg=686.36µs min=0s      med=0s       max=508.1ms  p(90)=0s       p(95)=0s       p(99.9)=226.14ms
     http_req_duration..............: avg=143.49ms min=2.49ms  med=132.23ms max=467.97ms p(90)=283.46ms p(95)=330.48ms p(99.9)=422.55ms
       { expected_response:true }...: avg=143.49ms min=2.49ms  med=132.23ms max=467.97ms p(90)=283.46ms p(95)=330.48ms p(99.9)=422.55ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 96934
     http_req_receiving.............: avg=654.43µs min=23.64µs med=46.6µs   max=152.6ms  p(90)=105.35µs p(95)=424.85µs p(99.9)=86.08ms 
     http_req_sending...............: avg=568.05µs min=5.2µs   med=11.49µs  max=151.85ms p(90)=30.7µs   p(95)=136.62µs p(99.9)=83.43ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=142.27ms min=2.45ms  med=131.1ms  max=434.16ms p(90)=280.95ms p(95)=327.98ms p(99.9)=418.98ms
     http_reqs......................: 96934   1532.918284/s
     iteration_duration.............: avg=146.07ms min=2.67ms  med=134ms    max=872.46ms p(90)=286.54ms p(95)=333.71ms p(99.9)=525.81ms
     iterations.....................: 95934   1517.104243/s
     success_rate...................: 100.00% ✓ 95934       ✗ 0    
     vus............................: 71      min=0         max=496
     vus_max........................: 500     min=500       max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/08511e28-e16e-442a-88ba-28d223250e00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/48d59596-795b-4ddc-e7f6-e40afa097a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 127233     ✗ 0    
     data_received..................: 3.8 GB  60 MB/s
     data_sent......................: 51 MB   791 kB/s
     http_req_blocked...............: avg=126.45µs min=1.22µs  med=2.95µs   max=183.65ms p(90)=4.6µs    p(95)=6.52µs   p(99.9)=40.93ms 
     http_req_connecting............: avg=121.63µs min=0s      med=0s       max=183.59ms p(90)=0s       p(95)=0s       p(99.9)=40.82ms 
     http_req_duration..............: avg=323.4ms  min=2.9ms   med=309.54ms max=1.26s    p(90)=629.57ms p(95)=709.62ms p(99.9)=973.55ms
       { expected_response:true }...: avg=323.4ms  min=2.9ms   med=309.54ms max=1.26s    p(90)=629.57ms p(95)=709.62ms p(99.9)=973.55ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 43411
     http_req_receiving.............: avg=492.82µs min=27.24µs med=61.79µs  max=217.76ms p(90)=177.46µs p(95)=482.28µs p(99.9)=74.93ms 
     http_req_sending...............: avg=175.05µs min=5.46µs  med=11.38µs  max=134.89ms p(90)=32.14µs  p(95)=133.53µs p(99.9)=30.4ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=322.74ms min=2.81ms  med=308.8ms  max=1.26s    p(90)=628.77ms p(95)=708.25ms p(99.9)=972.47ms
     http_reqs......................: 43411   679.059192/s
     iteration_duration.............: avg=331.6ms  min=3.2ms   med=318.19ms max=1.26s    p(90)=634.57ms p(95)=713.36ms p(99.9)=974.94ms
     iterations.....................: 42411   663.416631/s
     success_rate...................: 100.00% ✓ 42411      ✗ 0    
     vus............................: 61      min=0        max=498
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2e2fd856-2d49-4ec2-5ec7-bcc59c6cf600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/dab0fed8-2838-4c6b-6129-c9c84a6b2600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✗ valid response structure
      ↳  99% — ✓ 38919 / ✗ 2

     checks.........................: 99.99% ✓ 116761     ✗ 2    
     data_received..................: 3.5 GB 53 MB/s
     data_sent......................: 47 MB  707 kB/s
     http_req_blocked...............: avg=173.98µs min=1.33µs med=2.82µs   max=257.43ms p(90)=4.34µs   p(95)=5.9µs    p(99.9)=48.03ms
     http_req_connecting............: avg=166.43µs min=0s     med=0s       max=257.23ms p(90)=0s       p(95)=0s       p(99.9)=47.3ms 
     http_req_duration..............: avg=351.81ms min=4.71ms med=343.46ms max=1.1s     p(90)=654ms    p(95)=739.96ms p(99.9)=1.01s  
       { expected_response:true }...: avg=351.81ms min=4.71ms med=343.46ms max=1.1s     p(90)=654ms    p(95)=739.96ms p(99.9)=1.01s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 39921
     http_req_receiving.............: avg=231.63µs min=26.5µs med=44.43µs  max=198.23ms p(90)=93.21µs  p(95)=371.86µs p(99.9)=34.31ms
     http_req_sending...............: avg=256.54µs min=5.61µs med=10.85µs  max=164.15ms p(90)=29.95µs  p(95)=129.25µs p(99.9)=48.19ms
     http_req_tls_handshaking.......: avg=0s       min=0s     med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=351.32ms min=4.66ms med=343.02ms max=1.1s     p(90)=653.3ms  p(95)=739.19ms p(99.9)=1.01s  
     http_reqs......................: 39921  606.956017/s
     iteration_duration.............: avg=361.47ms min=5.38ms med=353.28ms max=1.3s     p(90)=657.48ms p(95)=744.97ms p(99.9)=1.01s  
     iterations.....................: 38921  591.752088/s
     success_rate...................: 99.99% ✓ 38919      ✗ 2    
     vus............................: 53     min=0        max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fd2705af-b35f-4fd0-60cf-fe4e89d64c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6b7c4566-7454-4db6-7343-1e7c890f9100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 25597 / ✗ 23
     ✗ valid response structure
      ↳  99% — ✓ 25619 / ✗ 1

     checks.........................: 99.96% ✓ 76836      ✗ 24   
     data_received..................: 2.3 GB 35 MB/s
     data_sent......................: 31 MB  461 kB/s
     http_req_blocked...............: avg=90.59µs  min=1.57µs  med=3.15µs   max=169.93ms p(90)=5.07µs  p(95)=7.49µs   p(99.9)=21.87ms
     http_req_connecting............: avg=84.42µs  min=0s      med=0s       max=169.89ms p(90)=0s      p(95)=0s       p(99.9)=21.78ms
     http_req_duration..............: avg=529.47ms min=6.29ms  med=500.51ms max=1.92s    p(90)=1.05s   p(95)=1.18s    p(99.9)=1.63s  
       { expected_response:true }...: avg=529.47ms min=6.29ms  med=500.51ms max=1.92s    p(90)=1.05s   p(95)=1.18s    p(99.9)=1.63s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 26620
     http_req_receiving.............: avg=122.59µs min=32.08µs med=54.32µs  max=120.88ms p(90)=105.3µs p(95)=179.38µs p(99.9)=8.72ms 
     http_req_sending...............: avg=135.65µs min=6.36µs  med=11.99µs  max=143.28ms p(90)=30.75µs p(95)=118.76µs p(99.9)=20.63ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=529.22ms min=6.24ms  med=500.15ms max=1.92s    p(90)=1.05s   p(95)=1.18s    p(99.9)=1.63s  
     http_reqs......................: 26620  395.282073/s
     iteration_duration.............: avg=550.61ms min=6.63ms  med=525.65ms max=1.92s    p(90)=1.06s   p(95)=1.19s    p(99.9)=1.63s  
     iterations.....................: 25620  380.43301/s
     success_rate...................: 99.91% ✓ 25597      ✗ 23   
     vus............................: 82     min=0        max=498
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/019a6d0c-195b-41ec-881e-eb6df9bf7c00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/41a3251c-434a-4329-01a4-75d4c624cc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 51675      ✗ 0    
     data_received..................: 1.6 GB  23 MB/s
     data_sent......................: 21 MB   300 kB/s
     http_req_blocked...............: avg=156.63µs min=1.37µs  med=3.08µs   max=176.48ms p(90)=5.31µs   p(95)=8.44µs   p(99.9)=35.3ms 
     http_req_connecting............: avg=149.83µs min=0s      med=0s       max=176.39ms p(90)=0s       p(95)=0s       p(99.9)=35.19ms
     http_req_duration..............: avg=768.63ms min=7.24ms  med=734.24ms max=5.07s    p(90)=1.52s    p(95)=1.68s    p(99.9)=4.01s  
       { expected_response:true }...: avg=768.63ms min=7.24ms  med=734.24ms max=5.07s    p(90)=1.52s    p(95)=1.68s    p(99.9)=4.01s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 18225
     http_req_receiving.............: avg=199.09µs min=28.93µs med=49.08µs  max=103.31ms p(90)=103.73µs p(95)=221.59µs p(99.9)=27.83ms
     http_req_sending...............: avg=249.06µs min=6.18µs  med=11.77µs  max=160.55ms p(90)=33.86µs  p(95)=134.3µs  p(99.9)=48.14ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=768.18ms min=7.18ms  med=734.1ms  max=5.07s    p(90)=1.51s    p(95)=1.68s    p(99.9)=4.01s  
     http_reqs......................: 18225   256.084034/s
     iteration_duration.............: avg=813.57ms min=7.86ms  med=771.49ms max=5.08s    p(90)=1.55s    p(95)=1.69s    p(99.9)=4.1s   
     iterations.....................: 17225   242.032784/s
     success_rate...................: 100.00% ✓ 17225      ✗ 0    
     vus............................: 78      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8dd4ee50-7c9b-43fe-39c4-a0ed02ab6e00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0f297619-84e5-481c-3e24-353fe590e700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 28761      ✗ 0    
     data_received..................: 930 MB  14 MB/s
     data_sent......................: 13 MB   184 kB/s
     http_req_blocked...............: avg=50.2µs  min=1.33µs  med=3.07µs  max=37.18ms p(90)=4.85µs  p(95)=11.97µs  p(99.9)=11.36ms
     http_req_connecting............: avg=43.99µs min=0s      med=0s      max=37.12ms p(90)=0s      p(95)=0s       p(99.9)=11.31ms
     http_req_duration..............: avg=1.22s   min=7.58ms  med=1.18s   max=16.38s  p(90)=2.21s   p(95)=2.6s     p(99.9)=14.47s 
       { expected_response:true }...: avg=1.22s   min=7.58ms  med=1.18s   max=16.38s  p(90)=2.21s   p(95)=2.6s     p(99.9)=14.47s 
     http_req_failed................: 0.00%   ✓ 0          ✗ 10587
     http_req_receiving.............: avg=73.48µs min=26.64µs med=51.61µs max=11.21ms p(90)=96.33µs p(95)=121.18µs p(99.9)=1.54ms 
     http_req_sending...............: avg=44.29µs min=5.93µs  med=12.28µs max=16.8ms  p(90)=26.69µs p(95)=44.71µs  p(99.9)=7.91ms 
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=1.22s   min=7.52ms  med=1.18s   max=16.38s  p(90)=2.21s   p(95)=2.6s     p(99.9)=14.47s 
     http_reqs......................: 10587   153.466042/s
     iteration_duration.............: avg=1.35s   min=7.87ms  med=1.3s    max=16.39s  p(90)=2.26s   p(95)=2.67s    p(99.9)=14.62s 
     iterations.....................: 9587    138.970335/s
     success_rate...................: 100.00% ✓ 9587       ✗ 0    
     vus............................: 76      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4a5deea5-03c2-4dfb-e8f4-9d2f2b41cd00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6df6019c-3bf8-41a1-8eca-ce393e844600/public" alt="HTTP Overview" />


  </details>