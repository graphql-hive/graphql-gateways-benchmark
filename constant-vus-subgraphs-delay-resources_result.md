## Overview for: `constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c06172bc-c82e-4b56-1d4a-64ecf5ee3d00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |        Duration        | Notes |
| :--------------- | :----: | :-------------------: | :--------------------: | :---- |
| hive-router      |  168   | 13678 total, 0 failed | avg: 221ms, p95: 231ms | ✅     |
| grafbase         |  166   | 13493 total, 0 failed | avg: 224ms, p95: 239ms | ✅     |
| cosmo            |  165   | 13444 total, 0 failed | avg: 225ms, p95: 250ms | ✅     |
| hive-gateway     |  161   | 12331 total, 0 failed | avg: 245ms, p95: 287ms | ✅     |
| hive-gateway-bun |  158   | 12138 total, 0 failed | avg: 249ms, p95: 301ms | ✅     |
| apollo-router    |  140   | 11407 total, 0 failed | avg: 265ms, p95: 308ms | ✅     |
| apollo-gateway   |  120   | 9847 total, 0 failed  | avg: 307ms, p95: 344ms | ✅     |



<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 40734      ✗ 0    
     data_received..................: 1.2 GB  15 MB/s
     data_sent......................: 16 MB   196 kB/s
     http_req_blocked...............: avg=23.1µs   min=1.19µs   med=2.21µs   max=10.81ms  p(90)=3.53µs   p(95)=4.79µs   p(99.9)=7.78ms  
     http_req_connecting............: avg=20.29µs  min=0s       med=0s       max=10.77ms  p(90)=0s       p(95)=0s       p(99.9)=7.76ms  
     http_req_duration..............: avg=221.12ms min=158.75ms med=220.09ms max=600.66ms p(90)=228.67ms p(95)=231.49ms p(99.9)=522.04ms
       { expected_response:true }...: avg=221.12ms min=158.75ms med=220.09ms max=600.66ms p(90)=228.67ms p(95)=231.49ms p(99.9)=522.04ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 13678
     http_req_receiving.............: avg=78.73µs  min=25.17µs  med=43.69µs  max=16.22ms  p(90)=92.59µs  p(95)=261.78µs p(99.9)=2.89ms  
     http_req_sending...............: avg=138.61µs min=5.46µs   med=9.02µs   max=358.85ms p(90)=31.7µs   p(95)=99.14µs  p(99.9)=6.59ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=220.9ms  min=158.7ms  med=220.02ms max=599.64ms p(90)=228.52ms p(95)=231.31ms p(99.9)=490.62ms
     http_reqs......................: 13678   168.818226/s
     iteration_duration.............: avg=221.43ms min=158.87ms med=220.31ms max=611.84ms p(90)=228.86ms p(95)=231.66ms p(99.9)=532.27ms
     iterations.....................: 13578   167.583994/s
     success_rate...................: 100.00% ✓ 13578      ✗ 0    
     vus............................: 33      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3d59087d-ef9e-481a-e456-c86895d93800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0b88e272-ac91-4581-57ac-4d831815cf00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 40179      ✗ 0    
     data_received..................: 1.2 GB  15 MB/s
     data_sent......................: 16 MB   193 kB/s
     http_req_blocked...............: avg=23.92µs  min=1.38µs   med=3.15µs   max=10.84ms  p(90)=5.11µs   p(95)=6.02µs   p(99.9)=7.88ms  
     http_req_connecting............: avg=19.75µs  min=0s       med=0s       max=10.8ms   p(90)=0s       p(95)=0s       p(99.9)=7.86ms  
     http_req_duration..............: avg=223.83ms min=205.8ms  med=222.19ms max=672.41ms p(90)=234.59ms p(95)=238.52ms p(99.9)=549.61ms
       { expected_response:true }...: avg=223.83ms min=205.8ms  med=222.19ms max=672.41ms p(90)=234.59ms p(95)=238.52ms p(99.9)=549.61ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 13493
     http_req_receiving.............: avg=91.89µs  min=27.76µs  med=65.24µs  max=9.36ms   p(90)=117.24µs p(95)=159.82µs p(99.9)=3.06ms  
     http_req_sending...............: avg=72.36µs  min=5.71µs   med=12.67µs  max=288.12ms p(90)=24.28µs  p(95)=39.49µs  p(99.9)=2.55ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=223.66ms min=205.73ms med=222.07ms max=671.39ms p(90)=234.43ms p(95)=238.36ms p(99.9)=548.28ms
     http_reqs......................: 13493   166.312177/s
     iteration_duration.............: avg=224.27ms min=205.99ms med=222.53ms max=702.44ms p(90)=234.87ms p(95)=238.83ms p(99.9)=579.71ms
     iterations.....................: 13393   165.079596/s
     success_rate...................: 100.00% ✓ 13393      ✗ 0    
     vus............................: 32      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e28996fe-cf18-45d9-33c2-f4f264ac6900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c9916d25-0cb7-4fd9-e252-ecc4d9fb3200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 40032      ✗ 0    
     data_received..................: 1.2 GB  15 MB/s
     data_sent......................: 16 MB   193 kB/s
     http_req_blocked...............: avg=22.74µs  min=1.24µs   med=2.76µs   max=10.56ms  p(90)=4.21µs   p(95)=5.43µs   p(99.9)=7.52ms  
     http_req_connecting............: avg=18.97µs  min=0s       med=0s       max=10.52ms  p(90)=0s       p(95)=0s       p(99.9)=7.5ms   
     http_req_duration..............: avg=224.84ms min=120.97ms med=223.48ms max=647.06ms p(90)=244.4ms  p(95)=250.4ms  p(99.9)=534.81ms
       { expected_response:true }...: avg=224.84ms min=120.97ms med=223.48ms max=647.06ms p(90)=244.4ms  p(95)=250.4ms  p(99.9)=534.81ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 13444
     http_req_receiving.............: avg=564.29µs min=31.53µs  med=69.29µs  max=33.59ms  p(90)=406.66µs p(95)=1.22ms   p(99.9)=28.31ms 
     http_req_sending...............: avg=74.26µs  min=6.18µs   med=11.28µs  max=231.65ms p(90)=33.88µs  p(95)=122.45µs p(99.9)=3.83ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=224.2ms  min=120.91ms med=222.87ms max=646.01ms p(90)=243.6ms  p(95)=249.74ms p(99.9)=533.88ms
     http_reqs......................: 13444   165.819288/s
     iteration_duration.............: avg=225.25ms min=121.11ms med=223.82ms max=668.71ms p(90)=244.7ms  p(95)=250.65ms p(99.9)=553.24ms
     iterations.....................: 13344   164.585881/s
     success_rate...................: 100.00% ✓ 13344      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fbe9f510-0d31-4b30-6100-d6405e604400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ee95d34d-55f8-4337-0f93-2b74132b3000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 36693      ✗ 0    
     data_received..................: 1.1 GB  14 MB/s
     data_sent......................: 14 MB   187 kB/s
     http_req_blocked...............: avg=31.15µs  min=1.21µs   med=2.67µs   max=13.47ms  p(90)=4.48µs   p(95)=5.88µs   p(99.9)=9.47ms  
     http_req_connecting............: avg=27.25µs  min=0s       med=0s       max=13.43ms  p(90)=0s       p(95)=0s       p(99.9)=9.44ms  
     http_req_duration..............: avg=244.74ms min=161.18ms med=236.86ms max=815ms    p(90)=264.31ms p(95)=287.24ms p(99.9)=689.93ms
       { expected_response:true }...: avg=244.74ms min=161.18ms med=236.86ms max=815ms    p(90)=264.31ms p(95)=287.24ms p(99.9)=689.93ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 12331
     http_req_receiving.............: avg=94.7µs   min=26.24µs  med=48.91µs  max=13.44ms  p(90)=120.42µs p(95)=304.63µs p(99.9)=3.93ms  
     http_req_sending...............: avg=107.11µs min=5.41µs   med=11µs     max=166.89ms p(90)=33.76µs  p(95)=132.56µs p(99.9)=5.27ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=244.54ms min=161.08ms med=236.72ms max=814.37ms p(90)=263.89ms p(95)=285.6ms  p(99.9)=689.49ms
     http_reqs......................: 12331   161.107449/s
     iteration_duration.............: avg=245.76ms min=169.65ms med=237.27ms max=837.39ms p(90)=264.64ms p(95)=288.05ms p(99.9)=747.78ms
     iterations.....................: 12231   159.800925/s
     success_rate...................: 100.00% ✓ 12231      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fb9eadac-f2a9-4968-cbde-9e0060d64700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/113d4df4-50d4-4248-13a7-1fa827a27000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 36114      ✗ 0    
     data_received..................: 1.1 GB  14 MB/s
     data_sent......................: 14 MB   184 kB/s
     http_req_blocked...............: avg=30.55µs  min=1.17µs   med=2.65µs   max=12.29ms  p(90)=4.54µs   p(95)=6.02µs   p(99.9)=9.84ms  
     http_req_connecting............: avg=26.55µs  min=0s       med=0s       max=12.22ms  p(90)=0s       p(95)=0s       p(99.9)=9.8ms   
     http_req_duration..............: avg=248.81ms min=161.29ms med=241.56ms max=697.57ms p(90)=273.44ms p(95)=301.33ms p(99.9)=587.35ms
       { expected_response:true }...: avg=248.81ms min=161.29ms med=241.56ms max=697.57ms p(90)=273.44ms p(95)=301.33ms p(99.9)=587.35ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 12138
     http_req_receiving.............: avg=94.02µs  min=26.5µs   med=47.56µs  max=17.68ms  p(90)=106.1µs  p(95)=180.16µs p(99.9)=4.65ms  
     http_req_sending...............: avg=113.69µs min=5.45µs   med=10.98µs  max=180.62ms p(90)=32.75µs  p(95)=122.38µs p(99.9)=6.1ms   
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=248.6ms  min=161.19ms med=241.4ms  max=696.79ms p(90)=273.09ms p(95)=300.74ms p(99.9)=586.39ms
     http_reqs......................: 12138   158.152492/s
     iteration_duration.............: avg=249.81ms min=184.99ms med=241.94ms max=735.63ms p(90)=273.86ms p(95)=301.96ms p(99.9)=611.86ms
     iterations.....................: 12038   156.849539/s
     success_rate...................: 100.00% ✓ 12038      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7a3534c1-a504-4ea7-c9b5-03395b905000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/761877a5-d745-4f64-a16d-393c948bb200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 33921      ✗ 0    
     data_received..................: 1.0 GB  12 MB/s
     data_sent......................: 13 MB   163 kB/s
     http_req_blocked...............: avg=26.13µs  min=1.27µs   med=2.88µs   max=10.23ms  p(90)=4.23µs   p(95)=5.31µs   p(99.9)=7.85ms  
     http_req_connecting............: avg=21.46µs  min=0s       med=0s       max=10.19ms  p(90)=0s       p(95)=0s       p(99.9)=7.83ms  
     http_req_duration..............: avg=265.22ms min=176.21ms med=265.03ms max=656.91ms p(90)=298.83ms p(95)=307.64ms p(99.9)=563.14ms
       { expected_response:true }...: avg=265.22ms min=176.21ms med=265.03ms max=656.91ms p(90)=298.83ms p(95)=307.64ms p(99.9)=563.14ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 11407
     http_req_receiving.............: avg=124.12µs min=30.54µs  med=51.8µs   max=117.35ms p(90)=161.03µs p(95)=440.48µs p(99.9)=3.67ms  
     http_req_sending...............: avg=106.67µs min=6.33µs   med=11.38µs  max=303.18ms p(90)=73.42µs  p(95)=136.79µs p(99.9)=3.89ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=264.99ms min=176ms    med=264.87ms max=649.03ms p(90)=298.58ms p(95)=307.41ms p(99.9)=551.1ms 
     http_reqs......................: 11407   140.204629/s
     iteration_duration.............: avg=266.06ms min=176.43ms med=265.58ms max=671.81ms p(90)=299.29ms p(95)=307.98ms p(99.9)=604.37ms
     iterations.....................: 11307   138.975519/s
     success_rate...................: 100.00% ✓ 11307      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6bf28c72-1f21-4100-b261-32c766829900/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cd711bf4-aff4-457c-4ba2-08659876c700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 29241      ✗ 0   
     data_received..................: 865 MB  11 MB/s
     data_sent......................: 12 MB   140 kB/s
     http_req_blocked...............: avg=81.9µs   min=1.35µs   med=3.3µs    max=28.75ms  p(90)=5.3µs    p(95)=6.62µs   p(99.9)=22.39ms 
     http_req_connecting............: avg=75.39µs  min=0s       med=0s       max=28.5ms   p(90)=0s       p(95)=0s       p(99.9)=22.33ms 
     http_req_duration..............: avg=307.15ms min=211.6ms  med=304.68ms max=868.12ms p(90)=333.97ms p(95)=343.94ms p(99.9)=728.59ms
       { expected_response:true }...: avg=307.15ms min=211.6ms  med=304.68ms max=868.12ms p(90)=333.97ms p(95)=343.94ms p(99.9)=728.59ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 9847
     http_req_receiving.............: avg=99.27µs  min=31.5µs   med=67.91µs  max=94.47ms  p(90)=127.5µs  p(95)=165.95µs p(99.9)=1.92ms  
     http_req_sending...............: avg=76.93µs  min=6.6µs    med=13.06µs  max=236.15ms p(90)=27.11µs  p(95)=41.54µs  p(99.9)=2.41ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=306.97ms min=211.35ms med=304.58ms max=850.77ms p(90)=333.76ms p(95)=343.7ms  p(99.9)=727.3ms 
     http_reqs......................: 9847    120.602191/s
     iteration_duration.............: avg=308.61ms min=217.84ms med=305.26ms max=891.88ms p(90)=334.32ms p(95)=344.3ms  p(99.9)=795.19ms
     iterations.....................: 9747    119.377431/s
     success_rate...................: 100.00% ✓ 9747       ✗ 0   
     vus............................: 50      min=0        max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cfb29693-3416-40c3-de1f-42c3f69b7100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bc28ea57-04da-4130-d4cf-8af85b27c800/public" alt="HTTP Overview" />


  </details>