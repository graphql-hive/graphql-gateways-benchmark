## Overview for: `constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6699c0dc-0e9b-4617-95a5-e10602279300/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |        Duration        | Notes |
| :--------------- | :----: | :-------------------: | :--------------------: | :---- |
| grafbase         |  173   | 14042 total, 0 failed | avg: 215ms, p95: 226ms | ✅     |
| hive-router      |  170   | 13793 total, 0 failed | avg: 219ms, p95: 229ms | ✅     |
| cosmo            |  165   | 13439 total, 0 failed | avg: 225ms, p95: 250ms | ✅     |
| hive-gateway     |  161   | 12365 total, 0 failed | avg: 244ms, p95: 304ms | ✅     |
| hive-gateway-bun |  158   | 12186 total, 0 failed | avg: 247ms, p95: 290ms | ✅     |
| apollo-router    |  133   | 10864 total, 0 failed | avg: 278ms, p95: 324ms | ✅     |
| apollo-gateway   |  123   | 10097 total, 0 failed | avg: 299ms, p95: 334ms | ✅     |



<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 41826      ✗ 0    
     data_received..................: 1.2 GB  15 MB/s
     data_sent......................: 16 MB   202 kB/s
     http_req_blocked...............: avg=20.31µs  min=1.19µs   med=2.01µs   max=10ms     p(90)=3.62µs   p(95)=5.29µs   p(99.9)=7.11ms  
     http_req_connecting............: avg=17.59µs  min=0s       med=0s       max=9.97ms   p(90)=0s       p(95)=0s       p(99.9)=7.09ms  
     http_req_duration..............: avg=215.06ms min=156.4ms  med=214.3ms  max=606ms    p(90)=223.14ms p(95)=225.58ms p(99.9)=510.85ms
       { expected_response:true }...: avg=215.06ms min=156.4ms  med=214.3ms  max=606ms    p(90)=223.14ms p(95)=225.58ms p(99.9)=510.85ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 14042
     http_req_receiving.............: avg=83.29µs  min=25.82µs  med=46.48µs  max=13.75ms  p(90)=97.61µs  p(95)=267.45µs p(99.9)=5.25ms  
     http_req_sending...............: avg=118.46µs min=5.58µs   med=8.72µs   max=379.96ms p(90)=30.65µs  p(95)=96.04µs  p(99.9)=6.58ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=214.86ms min=156.35ms med=214.18ms max=605.12ms p(90)=222.99ms p(95)=225.43ms p(99.9)=493.14ms
     http_reqs......................: 14042   173.570868/s
     iteration_duration.............: avg=215.33ms min=156.54ms med=214.54ms max=622.49ms p(90)=223.34ms p(95)=225.75ms p(99.9)=519ms   
     iterations.....................: 13942   172.334784/s
     success_rate...................: 100.00% ✓ 13942      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/efb7e5ab-74be-41c1-79d9-d153165a1300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/919edf43-8f64-4f43-d9a1-60349a62a600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 41079      ✗ 0    
     data_received..................: 1.2 GB  15 MB/s
     data_sent......................: 16 MB   198 kB/s
     http_req_blocked...............: avg=19.71µs  min=1.15µs   med=2.08µs   max=9.44ms   p(90)=3.22µs   p(95)=4.52µs   p(99.9)=6.69ms  
     http_req_connecting............: avg=17.08µs  min=0s       med=0s       max=9.41ms   p(90)=0s       p(95)=0s       p(99.9)=6.67ms  
     http_req_duration..............: avg=219.33ms min=158.58ms med=218.38ms max=593.77ms p(90)=226.7ms  p(95)=229.24ms p(99.9)=509.17ms
       { expected_response:true }...: avg=219.33ms min=158.58ms med=218.38ms max=593.77ms p(90)=226.7ms  p(95)=229.24ms p(99.9)=509.17ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 13793
     http_req_receiving.............: avg=72.09µs  min=24.87µs  med=41.98µs  max=16.78ms  p(90)=82.91µs  p(95)=229.45µs p(99.9)=2.84ms  
     http_req_sending...............: avg=145.3µs  min=5.71µs   med=8.74µs   max=362.97ms p(90)=28.96µs  p(95)=94.38µs  p(99.9)=5.12ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=219.11ms min=158.53ms med=218.29ms max=593.06ms p(90)=226.55ms p(95)=229.07ms p(99.9)=486.8ms 
     http_reqs......................: 13793   170.457631/s
     iteration_duration.............: avg=219.62ms min=158.73ms med=218.6ms  max=602.51ms p(90)=226.86ms p(95)=229.4ms  p(99.9)=517.39ms
     iterations.....................: 13693   169.221804/s
     success_rate...................: 100.00% ✓ 13693      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a7fcaba2-72ee-4c2a-2b26-8035ee33c500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/65b84c97-c443-42b3-2e6b-a18c9507da00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 40017      ✗ 0    
     data_received..................: 1.2 GB  15 MB/s
     data_sent......................: 16 MB   193 kB/s
     http_req_blocked...............: avg=24.31µs  min=1.29µs   med=2.74µs   max=11.98ms  p(90)=4.38µs   p(95)=5.36µs   p(99.9)=8.04ms  
     http_req_connecting............: avg=19.82µs  min=0s       med=0s       max=10.78ms  p(90)=0s       p(95)=0s       p(99.9)=7.8ms   
     http_req_duration..............: avg=224.81ms min=131.8ms  med=223.6ms  max=651.69ms p(90)=243.72ms p(95)=250.07ms p(99.9)=539.56ms
       { expected_response:true }...: avg=224.81ms min=131.8ms  med=223.6ms  max=651.69ms p(90)=243.72ms p(95)=250.07ms p(99.9)=539.56ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 13439
     http_req_receiving.............: avg=515.4µs  min=32.26µs  med=74.26µs  max=236.31ms p(90)=385.55µs p(95)=791.71µs p(99.9)=28.63ms 
     http_req_sending...............: avg=91.45µs  min=6.07µs   med=11.46µs  max=309.41ms p(90)=32.33µs  p(95)=126.09µs p(99.9)=4ms     
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=224.2ms  min=131.63ms med=223.12ms max=635.15ms p(90)=242.99ms p(95)=249.46ms p(99.9)=525.58ms
     http_reqs......................: 13439   165.616519/s
     iteration_duration.............: avg=225.26ms min=132.03ms med=223.95ms max=680.67ms p(90)=244.06ms p(95)=250.38ms p(99.9)=568.68ms
     iterations.....................: 13339   164.384162/s
     success_rate...................: 100.00% ✓ 13339      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4e1964fe-3d11-4c6a-d2dd-3f24a1925300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7c8e7b80-9364-45d8-659e-c1a70817a600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 36795      ✗ 0    
     data_received..................: 1.1 GB  14 MB/s
     data_sent......................: 14 MB   188 kB/s
     http_req_blocked...............: avg=27.28µs  min=1.17µs   med=2.77µs   max=12.18ms  p(90)=4.58µs   p(95)=6.29µs   p(99.9)=8.63ms  
     http_req_connecting............: avg=23.62µs  min=0s       med=0s       max=12.13ms  p(90)=0s       p(95)=0s       p(99.9)=8.58ms  
     http_req_duration..............: avg=243.96ms min=140.66ms med=236.47ms max=696.38ms p(90)=263.8ms  p(95)=304.29ms p(99.9)=586.56ms
       { expected_response:true }...: avg=243.96ms min=140.66ms med=236.47ms max=696.38ms p(90)=263.8ms  p(95)=304.29ms p(99.9)=586.56ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 12365
     http_req_receiving.............: avg=98.44µs  min=26.38µs  med=50.41µs  max=17.37ms  p(90)=117.32µs p(95)=260.89µs p(99.9)=4.9ms   
     http_req_sending...............: avg=94.64µs  min=5.65µs   med=11.47µs  max=143.13ms p(90)=33.96µs  p(95)=132.05µs p(99.9)=4.66ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=243.77ms min=136.23ms med=236.33ms max=695.67ms p(90)=263.55ms p(95)=302.1ms  p(99.9)=585.2ms 
     http_reqs......................: 12365   161.615905/s
     iteration_duration.............: avg=244.96ms min=140.89ms med=236.85ms max=726.18ms p(90)=264.3ms  p(95)=306.23ms p(99.9)=649.94ms
     iterations.....................: 12265   160.308862/s
     success_rate...................: 100.00% ✓ 12265      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/72dfb6c6-493a-48c8-850e-2618b1991f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/02805106-da15-4b4c-ac26-1c821ac9f200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 36258      ✗ 0    
     data_received..................: 1.1 GB  14 MB/s
     data_sent......................: 14 MB   185 kB/s
     http_req_blocked...............: avg=34.47µs  min=1.16µs   med=2.67µs   max=13.17ms  p(90)=4.49µs   p(95)=6.1µs    p(99.9)=10.46ms 
     http_req_connecting............: avg=30.2µs   min=0s       med=0s       max=13.13ms  p(90)=0s       p(95)=0s       p(99.9)=10.43ms 
     http_req_duration..............: avg=247.39ms min=146.55ms med=241.49ms max=834.1ms  p(90)=271.86ms p(95)=289.98ms p(99.9)=698.89ms
       { expected_response:true }...: avg=247.39ms min=146.55ms med=241.49ms max=834.1ms  p(90)=271.86ms p(95)=289.98ms p(99.9)=698.89ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 12186
     http_req_receiving.............: avg=97.14µs  min=26.68µs  med=49.44µs  max=20.83ms  p(90)=117.79µs p(95)=249.02µs p(99.9)=4.66ms  
     http_req_sending...............: avg=118.56µs min=5.3µs    med=11.32µs  max=295.64ms p(90)=33.69µs  p(95)=124.74µs p(99.9)=4.54ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=247.17ms min=146.47ms med=241.39ms max=833.12ms p(90)=271.64ms p(95)=289.51ms p(99.9)=698.07ms
     http_reqs......................: 12186   158.786247/s
     iteration_duration.............: avg=248.4ms  min=146.71ms med=241.87ms max=866.99ms p(90)=272.15ms p(95)=290.32ms p(99.9)=715.91ms
     iterations.....................: 12086   157.483225/s
     success_rate...................: 100.00% ✓ 12086      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/30a9438e-3937-443a-3bbd-88b084033f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4839047b-dbd1-4f54-d452-a8f25d7eba00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 32292      ✗ 0    
     data_received..................: 953 MB  12 MB/s
     data_sent......................: 13 MB   155 kB/s
     http_req_blocked...............: avg=66.11µs  min=1.43µs   med=2.92µs   max=21.13ms  p(90)=4.38µs   p(95)=5.81µs   p(99.9)=15.51ms 
     http_req_connecting............: avg=60.92µs  min=0s       med=0s       max=21.07ms  p(90)=0s       p(95)=0s       p(99.9)=15.31ms 
     http_req_duration..............: avg=277.85ms min=166.45ms med=278.47ms max=689.17ms p(90)=313.34ms p(95)=323.55ms p(99.9)=581.99ms
       { expected_response:true }...: avg=277.85ms min=166.45ms med=278.47ms max=689.17ms p(90)=313.34ms p(95)=323.55ms p(99.9)=581.99ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 10864
     http_req_receiving.............: avg=144.91µs min=32.55µs  med=57.37µs  max=165.04ms p(90)=170.93µs p(95)=471µs    p(99.9)=5.02ms  
     http_req_sending...............: avg=102.66µs min=6.62µs   med=11.51µs  max=216.46ms p(90)=87.35µs  p(95)=149.69µs p(99.9)=4.32ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=277.6ms  min=166.36ms med=278.27ms max=677.75ms p(90)=313.09ms p(95)=323.1ms  p(99.9)=576.01ms
     http_reqs......................: 10864   133.343366/s
     iteration_duration.............: avg=278.87ms min=166.61ms med=279.13ms max=705.99ms p(90)=313.78ms p(95)=323.97ms p(99.9)=628.93ms
     iterations.....................: 10764   132.115978/s
     success_rate...................: 100.00% ✓ 10764      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a85eb816-0798-4e55-20e6-8de60f346e00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/48c74596-064c-4ce8-a7f2-75d009bc6000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 29991      ✗ 0    
     data_received..................: 887 MB  11 MB/s
     data_sent......................: 12 MB   144 kB/s
     http_req_blocked...............: avg=38.06µs  min=1.21µs   med=3.59µs   max=12.92ms  p(90)=5.71µs   p(95)=6.75µs   p(99.9)=10.04ms 
     http_req_connecting............: avg=33.09µs  min=0s       med=0s       max=12.86ms  p(90)=0s       p(95)=0s       p(99.9)=10.02ms 
     http_req_duration..............: avg=299.47ms min=212.11ms med=297.67ms max=840.42ms p(90)=324.76ms p(95)=333.91ms p(99.9)=736.77ms
       { expected_response:true }...: avg=299.47ms min=212.11ms med=297.67ms max=840.42ms p(90)=324.76ms p(95)=333.91ms p(99.9)=736.77ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 10097
     http_req_receiving.............: avg=130.49µs min=28.3µs   med=77.84µs  max=311.63ms p(90)=139.51µs p(95)=174.33µs p(99.9)=2.09ms  
     http_req_sending...............: avg=52.86µs  min=5.86µs   med=14.63µs  max=111.47ms p(90)=28.6µs   p(95)=44.19µs  p(99.9)=2.24ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=299.28ms min=211.98ms med=297.53ms max=833.06ms p(90)=324.59ms p(95)=333.73ms p(99.9)=725.89ms
     http_reqs......................: 10097   123.603626/s
     iteration_duration.............: avg=300.8ms  min=222.17ms med=298.17ms max=873.48ms p(90)=325.2ms  p(95)=334.37ms p(99.9)=797.97ms
     iterations.....................: 9997    122.379465/s
     success_rate...................: 100.00% ✓ 9997       ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1e34417e-fdf6-4707-dc45-a4154a6e4b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bb88cfac-5e29-4de7-f43c-2fd953fc1500/public" alt="HTTP Overview" />


  </details>