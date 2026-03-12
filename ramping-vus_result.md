## Overview for: `ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0c7d42e0-b9a1-4e3a-5cc5-a161d781c700/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |         Duration         | Notes                                    |
| :-------------------------- | :----: | :--------------------: | :----------------------: | :--------------------------------------- |
| hive-router                 |  1885  | 118169 total, 0 failed |  avg: 118ms, p95: 286ms  | ✅                                       |
| grafbase                    |  1614  | 102451 total, 0 failed |  avg: 136ms, p95: 325ms  | ✅                                       |
| cosmo                       |  707   | 45241 total, 0 failed  |  avg: 310ms, p95: 684ms  | ✅                                       |
| hive-gateway-router-runtime |  577   | 38079 total, 0 failed  |  avg: 369ms, p95: 784ms  | ❌ non-compatible response structure (1) |
| apollo-router               |  403   | 27135 total, 0 failed  | avg: 520ms, p95: 1194ms  | ❌ 9 unexpected GraphQL errors           |
| hive-gateway                |  258   | 17733 total, 0 failed  | avg: 790ms, p95: 1711ms  | ✅                                       |
| apollo-gateway              |  117   |  8487 total, 0 failed  | avg: 1453ms, p95: 2869ms | ✅                                       |



<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 351507      ✗ 0     
     data_received..................: 10 GB   165 MB/s
     data_sent......................: 138 MB  2.2 MB/s
     http_req_blocked...............: avg=399.76µs min=1.2µs   med=2.61µs   max=348.4ms  p(90)=3.98µs   p(95)=4.63µs   p(99.9)=146.49ms
     http_req_connecting............: avg=395.13µs min=0s      med=0s       max=306.4ms  p(90)=0s       p(95)=0s       p(99.9)=145.92ms
     http_req_duration..............: avg=117.92ms min=2.08ms  med=105.78ms max=485.63ms p(90)=241.12ms p(95)=286.16ms p(99.9)=399.2ms 
       { expected_response:true }...: avg=117.92ms min=2.08ms  med=105.78ms max=485.63ms p(90)=241.12ms p(95)=286.16ms p(99.9)=399.2ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 118169
     http_req_receiving.............: avg=480.87µs min=22.73µs med=42.03µs  max=118.87ms p(90)=197.87µs p(95)=408.34µs p(99.9)=70.58ms 
     http_req_sending...............: avg=369.67µs min=5.11µs  med=10.27µs  max=117.08ms p(90)=30.1µs   p(95)=131.4µs  p(99.9)=64.82ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=117.07ms min=2.04ms  med=105.06ms max=459.93ms p(90)=238.95ms p(95)=284.6ms  p(99.9)=397.66ms
     http_reqs......................: 118169  1885.493245/s
     iteration_duration.............: avg=119.57ms min=2.27ms  med=107.06ms max=740.48ms p(90)=243.61ms p(95)=288.27ms p(99.9)=430.23ms
     iterations.....................: 117169  1869.53734/s
     success_rate...................: 100.00% ✓ 117169      ✗ 0     
     vus............................: 96      min=0         max=500 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/edadfc0f-c4db-4b25-34c7-19e22f37c100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cfe41b56-5812-4dcc-9a26-3e2378dbfd00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 304353      ✗ 0     
     data_received..................: 9.0 GB  142 MB/s
     data_sent......................: 119 MB  1.9 MB/s
     http_req_blocked...............: avg=575.5µs  min=1.3µs   med=3.02µs   max=374.23ms p(90)=4.43µs   p(95)=5.38µs   p(99.9)=193.9ms 
     http_req_connecting............: avg=568.02µs min=0s      med=0s       max=374.17ms p(90)=0s       p(95)=0s       p(99.9)=192.95ms
     http_req_duration..............: avg=135.87ms min=2.64ms  med=123.72ms max=506.66ms p(90)=272.21ms p(95)=324.78ms p(99.9)=433.74ms
       { expected_response:true }...: avg=135.87ms min=2.64ms  med=123.72ms max=506.66ms p(90)=272.21ms p(95)=324.78ms p(99.9)=433.74ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 102451
     http_req_receiving.............: avg=605.87µs min=25.58µs med=48.63µs  max=162.63ms p(90)=180.93µs p(95)=454.25µs p(99.9)=83.9ms  
     http_req_sending...............: avg=468.2µs  min=5.45µs  med=11.72µs  max=141.18ms p(90)=33µs     p(95)=144.04µs p(99.9)=76.35ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=134.8ms  min=2.6ms   med=122.66ms max=477.46ms p(90)=269.68ms p(95)=322.29ms p(99.9)=428.98ms
     http_reqs......................: 102451  1614.004416/s
     iteration_duration.............: avg=138.1ms  min=3.31ms  med=125.48ms max=777.81ms p(90)=275.31ms p(95)=328.14ms p(99.9)=473.33ms
     iterations.....................: 101451  1598.2505/s
     success_rate...................: 100.00% ✓ 101451      ✗ 0     
     vus............................: 85      min=0         max=495 
     vus_max........................: 500     min=500       max=500 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1be189a3-5f22-4e44-2571-d7f25567b000/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/292a5eb7-26d9-40f2-6adf-dc20739f2500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 132723     ✗ 0    
     data_received..................: 4.0 GB  62 MB/s
     data_sent......................: 53 MB   824 kB/s
     http_req_blocked...............: avg=105.73µs min=1.31µs  med=2.91µs   max=151.27ms p(90)=4.22µs   p(95)=5.53µs   p(99.9)=33.47ms 
     http_req_connecting............: avg=100.7µs  min=0s      med=0s       max=151.2ms  p(90)=0s       p(95)=0s       p(99.9)=33.38ms 
     http_req_duration..............: avg=310.46ms min=2.97ms  med=290.23ms max=1.1s     p(90)=612.35ms p(95)=683.84ms p(99.9)=964.47ms
       { expected_response:true }...: avg=310.46ms min=2.97ms  med=290.23ms max=1.1s     p(90)=612.35ms p(95)=683.84ms p(99.9)=964.47ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 45241
     http_req_receiving.............: avg=582.15µs min=28.26µs med=59.68µs  max=175.62ms p(90)=225.97µs p(95)=477.89µs p(99.9)=86.25ms 
     http_req_sending...............: avg=155.36µs min=5.7µs   med=11.07µs  max=134.67ms p(90)=32.05µs  p(95)=131.35µs p(99.9)=30.77ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=309.73ms min=2.86ms  med=289.64ms max=1.1s     p(90)=611.44ms p(95)=682.58ms p(99.9)=963.67ms
     http_reqs......................: 45241   707.996493/s
     iteration_duration.............: avg=317.95ms min=3.17ms  med=298.74ms max=1.1s     p(90)=615.7ms  p(95)=685.91ms p(99.9)=964.99ms
     iterations.....................: 44241   692.347049/s
     success_rate...................: 100.00% ✓ 44241      ✗ 0    
     vus............................: 59      min=0        max=498
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/16114cfe-5c4d-414c-b6cb-99e7ea7f9400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/304ca7a3-40da-4a1f-38ed-b6ef5eaae500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✗ valid response structure
      ↳  99% — ✓ 37078 / ✗ 1

     checks.........................: 99.99% ✓ 111236     ✗ 1    
     data_received..................: 3.3 GB 51 MB/s
     data_sent......................: 44 MB  672 kB/s
     http_req_blocked...............: avg=158.86µs min=1.34µs  med=2.89µs   max=227.29ms p(90)=4.4µs    p(95)=5.82µs   p(99.9)=44.67ms
     http_req_connecting............: avg=153.57µs min=0s      med=0s       max=227.02ms p(90)=0s       p(95)=0s       p(99.9)=44.6ms 
     http_req_duration..............: avg=369.16ms min=4.82ms  med=357.56ms max=1.31s    p(90)=704.34ms p(95)=783.8ms  p(99.9)=1.04s  
       { expected_response:true }...: avg=369.16ms min=4.82ms  med=357.56ms max=1.31s    p(90)=704.34ms p(95)=783.8ms  p(99.9)=1.04s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 38079
     http_req_receiving.............: avg=209.64µs min=26.48µs med=45.69µs  max=158.68ms p(90)=91.78µs  p(95)=379.83µs p(99.9)=32.18ms
     http_req_sending...............: avg=258.9µs  min=5.57µs  med=11.02µs  max=158.89ms p(90)=30.32µs  p(95)=130.24µs p(99.9)=51.26ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=368.7ms  min=4.78ms  med=357.15ms max=1.31s    p(90)=703.74ms p(95)=783.41ms p(99.9)=1.04s  
     http_reqs......................: 38079  577.088921/s
     iteration_duration.............: avg=379.67ms min=5.42ms  med=367.82ms max=1.32s    p(90)=707.8ms  p(95)=786.63ms p(99.9)=1.05s  
     iterations.....................: 37079  561.933877/s
     success_rate...................: 99.99% ✓ 37078      ✗ 1    
     vus............................: 59     min=0        max=497
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/831ac844-f320-464c-5256-c2cc61033400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7912e71f-d6f3-4c4a-4eda-548a97106400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✗ no graphql errors
      ↳  99% — ✓ 26126 / ✗ 9
     ✓ valid response structure

     checks.........................: 99.98% ✓ 78396      ✗ 9    
     data_received..................: 2.4 GB 35 MB/s
     data_sent......................: 32 MB  471 kB/s
     http_req_blocked...............: avg=78.15µs  min=1.24µs  med=2.82µs   max=80.64ms p(90)=4.44µs   p(95)=6.28µs   p(99.9)=21.85ms
     http_req_connecting............: avg=73.39µs  min=0s      med=0s       max=80.58ms p(90)=0s       p(95)=0s       p(99.9)=21.81ms
     http_req_duration..............: avg=519.6ms  min=6.25ms  med=488.46ms max=2.02s   p(90)=1.04s    p(95)=1.19s    p(99.9)=1.76s  
       { expected_response:true }...: avg=519.6ms  min=6.25ms  med=488.46ms max=2.02s   p(90)=1.04s    p(95)=1.19s    p(99.9)=1.76s  
     http_req_failed................: 0.00%  ✓ 0          ✗ 27135
     http_req_receiving.............: avg=111.21µs min=28.73µs med=50.57µs  max=52.09ms p(90)=103.25µs p(95)=241.26µs p(99.9)=8.31ms 
     http_req_sending...............: avg=92.74µs  min=5.46µs  med=10.9µs   max=62.2ms  p(90)=29.76µs  p(95)=119.85µs p(99.9)=16.61ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=519.4ms  min=6.2ms   med=488.21ms max=2.02s   p(90)=1.04s    p(95)=1.19s    p(99.9)=1.76s  
     http_reqs......................: 27135  403.878824/s
     iteration_duration.............: avg=539.84ms min=6.51ms  med=512.44ms max=2.02s   p(90)=1.05s    p(95)=1.2s     p(99.9)=1.76s  
     iterations.....................: 26135  388.994769/s
     success_rate...................: 99.96% ✓ 26126      ✗ 9    
     vus............................: 69     min=0        max=499
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3701e7f8-4c0f-4b81-a580-ddc7296f4f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/44252a5e-6a5c-40d7-1a0b-dfb51a4f2000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 50199      ✗ 0    
     data_received..................: 1.6 GB  23 MB/s
     data_sent......................: 21 MB   303 kB/s
     http_req_blocked...............: avg=137.66µs min=1.34µs  med=2.91µs   max=120.64ms p(90)=5.59µs   p(95)=8.66µs   p(99.9)=37.67ms
     http_req_connecting............: avg=131.26µs min=0s      med=0s       max=120.59ms p(90)=0s       p(95)=0s       p(99.9)=37.61ms
     http_req_duration..............: avg=790.19ms min=6.13ms  med=715.1ms  max=5.19s    p(90)=1.56s    p(95)=1.71s    p(99.9)=4.15s  
       { expected_response:true }...: avg=790.19ms min=6.13ms  med=715.1ms  max=5.19s    p(90)=1.56s    p(95)=1.71s    p(99.9)=4.15s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 17733
     http_req_receiving.............: avg=184.56µs min=27.35µs med=48.21µs  max=96.89ms  p(90)=106.74µs p(95)=205.9µs  p(99.9)=27.24ms
     http_req_sending...............: avg=207µs    min=5.77µs  med=11.31µs  max=95.89ms  p(90)=32.78µs  p(95)=119.33µs p(99.9)=34.57ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=789.8ms  min=6.07ms  med=714.79ms max=5.19s    p(90)=1.56s    p(95)=1.71s    p(99.9)=4.15s  
     http_reqs......................: 17733   258.752359/s
     iteration_duration.............: avg=837.79ms min=8.58ms  med=779.22ms max=5.2s     p(90)=1.57s    p(95)=1.72s    p(99.9)=4.2s   
     iterations.....................: 16733   244.160786/s
     success_rate...................: 100.00% ✓ 16733      ✗ 0    
     vus............................: 98      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/183b896c-4320-476e-7df9-0cf4f7de1300/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/196e45a4-9c79-4ced-e721-9ca145c68b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 22461      ✗ 0    
     data_received..................: 745 MB  10 MB/s
     data_sent......................: 10 MB   143 kB/s
     http_req_blocked...............: avg=42.07µs min=1.41µs  med=3.2µs   max=40.1ms  p(90)=5.48µs   p(95)=19.06µs  p(99.9)=4.69ms
     http_req_connecting............: avg=35.99µs min=0s      med=0s      max=40.04ms p(90)=0s       p(95)=0s       p(99.9)=4.64ms
     http_req_duration..............: avg=1.45s   min=9.71ms  med=1.41s   max=19.88s  p(90)=2.59s    p(95)=2.86s    p(99.9)=18.56s
       { expected_response:true }...: avg=1.45s   min=9.71ms  med=1.41s   max=19.88s  p(90)=2.59s    p(95)=2.86s    p(99.9)=18.56s
     http_req_failed................: 0.00%   ✓ 0          ✗ 8487 
     http_req_receiving.............: avg=74.98µs min=27.77µs med=58.61µs max=3.27ms  p(90)=107.51µs p(95)=129.87µs p(99.9)=1.03ms
     http_req_sending...............: avg=41.3µs  min=5.95µs  med=12.74µs max=13.88ms p(90)=30.05µs  p(95)=51.38µs  p(99.9)=8.72ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s       p(99.9)=0s    
     http_req_waiting...............: avg=1.45s   min=9.66ms  med=1.41s   max=19.88s  p(90)=2.59s    p(95)=2.86s    p(99.9)=18.56s
     http_reqs......................: 8487    117.880504/s
     iteration_duration.............: avg=1.64s   min=10.12ms med=1.58s   max=19.89s  p(90)=2.64s    p(95)=2.9s     p(99.9)=18.65s
     iterations.....................: 7487    103.990967/s
     success_rate...................: 100.00% ✓ 7487       ✗ 0    
     vus............................: 89      min=0        max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a743b6ff-c626-4d83-1b92-35466b68af00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2f28873c-ded5-4a77-305e-0fc115c6fc00/public" alt="HTTP Overview" />


  </details>