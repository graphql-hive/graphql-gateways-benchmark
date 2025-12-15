## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/67dcb985-2d0e-4369-0239-2d76999c3d00/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :-------------------------- | :----: | :--------------------: | :--------------------: | :---- |
| hive-router                 |  1831  | 110358 total, 0 failed |  avg: 27ms, p95: 48ms  | ✅    |
| grafbase                    |  1473  | 88952 total, 0 failed  |  avg: 33ms, p95: 58ms  | ✅    |
| cosmo                       |  691   | 41764 total, 0 failed  | avg: 72ms, p95: 105ms  | ✅    |
| hive-gateway-router-runtime |  328   | 19942 total, 0 failed  | avg: 150ms, p95: 192ms | ✅    |
| hive-gateway                |  302   | 18481 total, 0 failed  | avg: 162ms, p95: 227ms | ✅    |
| apollo-router               |  231   | 14083 total, 0 failed  | avg: 213ms, p95: 273ms | ✅    |
| apollo-gateway              |  125   |  7685 total, 0 failed  | avg: 391ms, p95: 460ms | ✅    |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 330774      ✗ 0     
     data_received..................: 9.7 GB  161 MB/s
     data_sent......................: 128 MB  2.1 MB/s
     http_req_blocked...............: avg=4.65µs   min=1.01µs  med=2.55µs  max=7.38ms   p(90)=3.83µs   p(95)=4.47µs   p(99.9)=84.22µs
     http_req_connecting............: avg=1.67µs   min=0s      med=0s      max=7.34ms   p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=26.96ms  min=1.78ms  med=24.39ms max=435.34ms p(90)=41.67ms  p(95)=48.23ms  p(99.9)=83.83ms
       { expected_response:true }...: avg=26.96ms  min=1.78ms  med=24.39ms max=435.34ms p(90)=41.67ms  p(95)=48.23ms  p(99.9)=83.83ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 110358
     http_req_receiving.............: avg=117.88µs min=21.61µs med=44.32µs max=229.43ms p(90)=103.09µs p(95)=343µs    p(99.9)=11.75ms
     http_req_sending...............: avg=92.16µs  min=4.05µs  med=9.35µs  max=300ms    p(90)=23.85µs  p(95)=125.83µs p(99.9)=12.65ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=26.75ms  min=1.74ms  med=24.23ms max=415.96ms p(90)=41.32ms  p(95)=47.84ms  p(99.9)=83.08ms
     http_reqs......................: 110358  1831.375624/s
     iteration_duration.............: avg=27.2ms   min=3.25ms  med=24.6ms  max=448.91ms p(90)=41.89ms  p(95)=48.46ms  p(99.9)=84.35ms
     iterations.....................: 110258  1829.716138/s
     success_rate...................: 100.00% ✓ 110258      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/890a65f9-a2c7-41ef-72e8-cd7d64878500/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f06af5c5-735b-491e-3ec3-553a5f049c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 266556      ✗ 0    
     data_received..................: 7.8 GB  130 MB/s
     data_sent......................: 104 MB  1.7 MB/s
     http_req_blocked...............: avg=6.39µs   min=1.06µs  med=3.2µs   max=8.6ms    p(90)=5.01µs   p(95)=6.47µs   p(99.9)=133.4µs 
     http_req_connecting............: avg=2.45µs   min=0s      med=0s      max=8.56ms   p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=33.46ms  min=2.59ms  med=30.05ms max=481.21ms p(90)=50.86ms  p(95)=58.22ms  p(99.9)=103.92ms
       { expected_response:true }...: avg=33.46ms  min=2.59ms  med=30.05ms max=481.21ms p(90)=50.86ms  p(95)=58.22ms  p(99.9)=103.92ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 88952
     http_req_receiving.............: avg=168.79µs min=33.68µs med=58.3µs  max=333.27ms p(90)=207.78µs p(95)=468.88µs p(99.9)=16.85ms 
     http_req_sending...............: avg=115.43µs min=4.8µs   med=11.74µs max=338.36ms p(90)=85.88µs  p(95)=167.28µs p(99.9)=16.6ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=33.18ms  min=2.54ms  med=29.86ms max=480.29ms p(90)=50.34ms  p(95)=57.63ms  p(99.9)=101.93ms
     http_reqs......................: 88952   1473.947153/s
     iteration_duration.............: avg=33.75ms  min=8.75ms  med=30.31ms max=511ms    p(90)=51.14ms  p(95)=58.49ms  p(99.9)=104.62ms
     iterations.....................: 88852   1472.290139/s
     success_rate...................: 100.00% ✓ 88852       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3e66ac9a-c80b-475d-d375-622242592600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d92f5a6d-5a38-48e2-5b99-9ab57fe6f500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 124992     ✗ 0    
     data_received..................: 3.7 GB  61 MB/s
     data_sent......................: 49 MB   804 kB/s
     http_req_blocked...............: avg=17.77µs  min=1.06µs  med=2.93µs  max=18.07ms  p(90)=4.29µs   p(95)=5.13µs   p(99.9)=7.7ms   
     http_req_connecting............: avg=14.21µs  min=0s      med=0s      max=18.03ms  p(90)=0s       p(95)=0s       p(99.9)=7.66ms  
     http_req_duration..............: avg=71.56ms  min=2.73ms  med=70.41ms max=496.31ms p(90)=97.02ms  p(95)=104.53ms p(99.9)=265.21ms
       { expected_response:true }...: avg=71.56ms  min=2.73ms  med=70.41ms max=496.31ms p(90)=97.02ms  p(95)=104.53ms p(99.9)=265.21ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 41764
     http_req_receiving.............: avg=138.05µs min=26.88µs med=57.86µs max=29.66ms  p(90)=119.11µs p(95)=337.45µs p(99.9)=13.94ms 
     http_req_sending...............: avg=57.07µs  min=4.57µs  med=10.89µs max=173.87ms p(90)=22.07µs  p(95)=123.19µs p(99.9)=2.84ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=71.36ms  min=2.65ms  med=70.23ms max=495.77ms p(90)=96.79ms  p(95)=104.27ms p(99.9)=251.34ms
     http_reqs......................: 41764   691.397745/s
     iteration_duration.............: avg=72.01ms  min=4.79ms  med=70.69ms max=555.02ms p(90)=97.29ms  p(95)=104.77ms p(99.9)=291.69ms
     iterations.....................: 41664   689.742258/s
     success_rate...................: 100.00% ✓ 41664      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4b556495-689b-4636-6aa3-26766c3f3600/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c8c7dbb0-dde6-44d4-4c88-0e4c166c9900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 59526      ✗ 0    
     data_received..................: 1.8 GB  29 MB/s
     data_sent......................: 23 MB   382 kB/s
     http_req_blocked...............: avg=33.55µs  min=1.27µs  med=3.61µs   max=16.06ms  p(90)=5µs      p(95)=5.77µs   p(99.9)=12.54ms 
     http_req_connecting............: avg=29.1µs   min=0s      med=0s       max=16.04ms  p(90)=0s       p(95)=0s       p(99.9)=12.52ms 
     http_req_duration..............: avg=150.25ms min=4.84ms  med=146.64ms max=596.43ms p(90)=180.8ms  p(95)=192.13ms p(99.9)=447.53ms
       { expected_response:true }...: avg=150.25ms min=4.84ms  med=146.64ms max=596.43ms p(90)=180.8ms  p(95)=192.13ms p(99.9)=447.53ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 19942
     http_req_receiving.............: avg=81.31µs  min=29.74µs med=60.56µs  max=7.02ms   p(90)=101.38µs p(95)=122.67µs p(99.9)=2.14ms  
     http_req_sending...............: avg=75.36µs  min=5.75µs  med=13.57µs  max=359.12ms p(90)=21.67µs  p(95)=31.64µs  p(99.9)=5.73ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=150.09ms min=4.79ms  med=146.53ms max=596.07ms p(90)=180.68ms p(95)=191.88ms p(99.9)=436.34ms
     http_reqs......................: 19942   328.247817/s
     iteration_duration.............: avg=151.34ms min=40.95ms med=147.05ms max=657.02ms p(90)=181.21ms p(95)=192.56ms p(99.9)=458.98ms
     iterations.....................: 19842   326.601804/s
     success_rate...................: 100.00% ✓ 19842      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/467c671f-851c-47af-b371-fe0a4d642800/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5a9f26b8-8479-42e2-450a-03cbf9305100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 55143      ✗ 0    
     data_received..................: 1.6 GB  27 MB/s
     data_sent......................: 22 MB   352 kB/s
     http_req_blocked...............: avg=36.8µs   min=1.04µs  med=2.9µs    max=17.45ms  p(90)=5.21µs   p(95)=6.43µs   p(99.9)=13.21ms 
     http_req_connecting............: avg=32.92µs  min=0s      med=0s       max=17.4ms   p(90)=0s       p(95)=0s       p(99.9)=13.18ms 
     http_req_duration..............: avg=162.17ms min=7.1ms   med=150.56ms max=700.13ms p(90)=197.58ms p(95)=226.95ms p(99.9)=696.53ms
       { expected_response:true }...: avg=162.17ms min=7.1ms   med=150.56ms max=700.13ms p(90)=197.58ms p(95)=226.95ms p(99.9)=696.53ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 18481
     http_req_receiving.............: avg=93.22µs  min=24.86µs med=53.39µs  max=12.6ms   p(90)=111.55µs p(95)=208.16µs p(99.9)=3.58ms  
     http_req_sending...............: avg=122.29µs min=4.44µs  med=10.91µs  max=450.19ms p(90)=23.53µs  p(95)=125.86µs p(99.9)=6.16ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=161.95ms min=7.03ms  med=150.37ms max=700.09ms p(90)=197.44ms p(95)=226.65ms p(99.9)=696.47ms
     http_reqs......................: 18481   302.76634/s
     iteration_duration.............: avg=163.4ms  min=43.42ms med=151.46ms max=708.39ms p(90)=197.95ms p(95)=227.53ms p(99.9)=697.55ms
     iterations.....................: 18381   301.128083/s
     success_rate...................: 100.00% ✓ 18381      ✗ 0    
     vus............................: 30      min=30       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/36176435-fd02-4839-5ee8-018684f6d100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/47293998-983a-4da6-5600-843b5d81d700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 41949      ✗ 0    
     data_received..................: 1.2 GB  20 MB/s
     data_sent......................: 16 MB   269 kB/s
     http_req_blocked...............: avg=43.9µs   min=1.54µs  med=3.97µs   max=20.69ms  p(90)=5.84µs   p(95)=6.75µs   p(99.9)=14.09ms 
     http_req_connecting............: avg=38.47µs  min=0s      med=0s       max=20.65ms  p(90)=0s       p(95)=0s       p(99.9)=14.06ms 
     http_req_duration..............: avg=212.75ms min=5.67ms  med=212.79ms max=643.39ms p(90)=259.4ms  p(95)=273.06ms p(99.9)=505.73ms
       { expected_response:true }...: avg=212.75ms min=5.67ms  med=212.79ms max=643.39ms p(90)=259.4ms  p(95)=273.06ms p(99.9)=505.73ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 14083
     http_req_receiving.............: avg=117.47µs min=33.44µs med=76.38µs  max=329.11ms p(90)=129.67µs p(95)=159.63µs p(99.9)=1.94ms  
     http_req_sending...............: avg=59.02µs  min=6.81µs  med=15.33µs  max=347.92ms p(90)=26.35µs  p(95)=43.35µs  p(99.9)=1.8ms   
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=212.58ms min=5.56ms  med=212.66ms max=622.81ms p(90)=259.24ms p(95)=272.9ms  p(99.9)=495.9ms 
     http_reqs......................: 14083   231.619654/s
     iteration_duration.............: avg=214.74ms min=38.21ms med=213.51ms max=722.67ms p(90)=260.15ms p(95)=273.65ms p(99.9)=554.77ms
     iterations.....................: 13983   229.974978/s
     success_rate...................: 100.00% ✓ 13983      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f34212be-8396-4c5f-a357-d6287d046b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2bb2ad26-7a1e-4df2-4b99-5d91bba9ee00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 22755      ✗ 0   
     data_received..................: 675 MB  11 MB/s
     data_sent......................: 8.9 MB  146 kB/s
     http_req_blocked...............: avg=83.72µs  min=1.17µs  med=3.46µs   max=17.17ms  p(90)=5.34µs   p(95)=6.03µs   p(99.9)=16.05ms 
     http_req_connecting............: avg=79.44µs  min=0s      med=0s       max=17.14ms  p(90)=0s       p(95)=0s       p(99.9)=16ms    
     http_req_duration..............: avg=390.98ms min=7.19ms  med=390.27ms max=770.71ms p(90)=444.11ms p(95)=459.86ms p(99.9)=681.54ms
       { expected_response:true }...: avg=390.98ms min=7.19ms  med=390.27ms max=770.71ms p(90)=444.11ms p(95)=459.86ms p(99.9)=681.54ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 7685
     http_req_receiving.............: avg=84.35µs  min=28.87µs med=60.97µs  max=120.2ms  p(90)=101.14µs p(95)=114.88µs p(99.9)=472.72µs
     http_req_sending...............: avg=83.11µs  min=5.39µs  med=13.01µs  max=245.07ms p(90)=20.77µs  p(95)=23.39µs  p(99.9)=3.58ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=390.81ms min=7.1ms   med=390.16ms max=763.04ms p(90)=443.87ms p(95)=459.74ms p(99.9)=675.82ms
     http_reqs......................: 7685    125.7411/s
     iteration_duration.............: avg=396.6ms  min=109.9ms med=390.86ms max=800.58ms p(90)=444.65ms p(95)=460.64ms p(99.9)=760.06ms
     iterations.....................: 7585    124.104911/s
     success_rate...................: 100.00% ✓ 7585       ✗ 0   
     vus............................: 28      min=28       max=50
     vus_max........................: 50      min=50       max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0dbe0d6e-87fc-43fb-dbe9-271241736b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7eadb0fc-ed52-4823-7a2d-b9d10025d200/public" alt="HTTP Overview" />


  </details>