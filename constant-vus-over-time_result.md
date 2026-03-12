## Overview for: `constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/39130e26-e7e1-493c-bfb9-821bb7876e00/public" alt="Comparison" />


| Gateway                     | RPS ⬇️ |        Requests        |        Duration        | Notes |
| :-------------------------- | :----: | :--------------------: | :--------------------: | :---- |
| cosmo                       |  2175  | 131481 total, 0 failed |  avg: 23ms, p95: 45ms  | ✅    |
| hive-router                 |  1733  | 104482 total, 0 failed |  avg: 29ms, p95: 50ms  | ✅    |
| grafbase                    |  1640  | 99051 total, 0 failed  |  avg: 30ms, p95: 52ms  | ✅    |
| hive-gateway-router-runtime |  624   | 37921 total, 0 failed  | avg: 79ms, p95: 107ms  | ✅    |
| apollo-router               |  386   | 23473 total, 0 failed  | avg: 128ms, p95: 167ms | ✅    |
| hive-gateway                |  294   | 17976 total, 0 failed  | avg: 167ms, p95: 321ms | ✅    |
| apollo-gateway              |   88   |  5475 total, 0 failed  | avg: 551ms, p95: 651ms | ✅    |



<details>
  <summary>Summary for: cosmo</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 394143      ✗ 0     
     data_received..................: 12 GB   191 MB/s
     data_sent......................: 153 MB  2.5 MB/s
     http_req_blocked...............: avg=5.71µs   min=1.2µs    med=2.89µs  max=11.97ms  p(90)=4.22µs   p(95)=5.25µs   p(99.9)=93.33µs
     http_req_connecting............: avg=2.36µs   min=0s       med=0s      max=11.94ms  p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_duration..............: avg=22.61ms  min=437.13µs med=20.02ms max=490.43ms p(90)=39.15ms  p(95)=44.71ms  p(99.9)=72.96ms
       { expected_response:true }...: avg=22.61ms  min=437.13µs med=20.02ms max=490.43ms p(90)=39.15ms  p(95)=44.71ms  p(99.9)=72.96ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 131481
     http_req_receiving.............: avg=169.64µs min=24.4µs   med=45.52µs max=159.43ms p(90)=140.62µs p(95)=380.58µs p(99.9)=20.01ms
     http_req_sending...............: avg=114.06µs min=5.09µs   med=11.25µs max=321.29ms p(90)=31.35µs  p(95)=131.96µs p(99.9)=19.59ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s     
     http_req_waiting...............: avg=22.32ms  min=388.68µs med=19.83ms max=478.79ms p(90)=38.57ms  p(95)=44.02ms  p(99.9)=70.73ms
     http_reqs......................: 131481  2175.922481/s
     iteration_duration.............: avg=22.82ms  min=647.05µs med=20.22ms max=533.67ms p(90)=39.37ms  p(95)=44.92ms  p(99.9)=73.27ms
     iterations.....................: 131381  2174.267548/s
     success_rate...................: 100.00% ✓ 131381      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/be029554-5417-4423-ec0c-bf7814503b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f65ecf9e-b577-43e5-108c-b032f7a10d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 313146      ✗ 0     
     data_received..................: 9.2 GB  152 MB/s
     data_sent......................: 122 MB  2.0 MB/s
     http_req_blocked...............: avg=12.15µs  min=1.27µs  med=2.71µs  max=28.48ms  p(90)=4.01µs   p(95)=4.89µs   p(99.9)=106.81µs
     http_req_connecting............: avg=8.82µs   min=0s      med=0s      max=28.45ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=28.5ms   min=2.05ms  med=25.9ms  max=448.78ms p(90)=43.84ms  p(95)=50.37ms  p(99.9)=86.07ms 
       { expected_response:true }...: avg=28.5ms   min=2.05ms  med=25.9ms  max=448.78ms p(90)=43.84ms  p(95)=50.37ms  p(99.9)=86.07ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 104482
     http_req_receiving.............: avg=123.75µs min=24.49µs med=46.21µs max=48.69ms  p(90)=135.71µs p(95)=374.48µs p(99.9)=12.17ms 
     http_req_sending...............: avg=90.88µs  min=5.3µs   med=10.61µs max=353.22ms p(90)=34.94µs  p(95)=134.45µs p(99.9)=13.01ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=28.28ms  min=2.01ms  med=25.75ms max=448.72ms p(90)=43.45ms  p(95)=49.94ms  p(99.9)=83.16ms 
     http_reqs......................: 104482  1733.859249/s
     iteration_duration.............: avg=28.73ms  min=4.98ms  med=26.1ms  max=475.16ms p(90)=44.06ms  p(95)=50.57ms  p(99.9)=87.02ms 
     iterations.....................: 104382  1732.199768/s
     success_rate...................: 100.00% ✓ 104382      ✗ 0     
     vus............................: 50      min=50        max=50  
     vus_max........................: 50      min=50        max=50  
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/afb93977-41ca-440c-7f71-3d45f183c100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5c1ae08f-b367-4b70-9319-b1a31a942c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: grafbase</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 296853      ✗ 0    
     data_received..................: 8.7 GB  144 MB/s
     data_sent......................: 115 MB  1.9 MB/s
     http_req_blocked...............: avg=9.61µs   min=1.26µs  med=2.99µs  max=41.64ms  p(90)=4.14µs   p(95)=4.95µs   p(99.9)=123.24µs
     http_req_connecting............: avg=5.75µs   min=0s      med=0s      max=41.59ms  p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_duration..............: avg=30.04ms  min=2.76ms  med=27ms    max=498.33ms p(90)=45.69ms  p(95)=52.29ms  p(99.9)=92.31ms 
       { expected_response:true }...: avg=30.04ms  min=2.76ms  med=27ms    max=498.33ms p(90)=45.69ms  p(95)=52.29ms  p(99.9)=92.31ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 99051
     http_req_receiving.............: avg=145.62µs min=24.78µs med=48.07µs max=105.36ms p(90)=173.02µs p(95)=397.33µs p(99.9)=14.69ms 
     http_req_sending...............: avg=102.88µs min=5.17µs  med=11.42µs max=330.15ms p(90)=46.02µs  p(95)=137.49µs p(99.9)=13.35ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=29.79ms  min=2.71ms  med=26.82ms max=498.25ms p(90)=45.27ms  p(95)=51.83ms  p(99.9)=90.56ms 
     http_reqs......................: 99051   1640.691809/s
     iteration_duration.............: avg=30.3ms   min=7.91ms  med=27.22ms max=542.5ms  p(90)=45.94ms  p(95)=52.51ms  p(99.9)=94.71ms 
     iterations.....................: 98951   1639.035398/s
     success_rate...................: 100.00% ✓ 98951       ✗ 0    
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/da82e13c-41a5-48f6-bfea-e7c6006d1a00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a39f3edc-4285-41cf-6b26-ed055302cc00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway-router-runtime</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 113463     ✗ 0    
     data_received..................: 3.3 GB  55 MB/s
     data_sent......................: 44 MB   727 kB/s
     http_req_blocked...............: avg=14.92µs  min=1.31µs  med=3.08µs  max=16.44ms  p(90)=4.5µs    p(95)=5.75µs   p(99.9)=4.45ms  
     http_req_connecting............: avg=10.86µs  min=0s      med=0s      max=16.41ms  p(90)=0s       p(95)=0s       p(99.9)=4.4ms   
     http_req_duration..............: avg=78.88ms  min=5.07ms  med=77.16ms max=566.89ms p(90)=99.04ms  p(95)=106.81ms p(99.9)=311.67ms
       { expected_response:true }...: avg=78.88ms  min=5.07ms  med=77.16ms max=566.89ms p(90)=99.04ms  p(95)=106.81ms p(99.9)=311.67ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 37921
     http_req_receiving.............: avg=117.02µs min=27.47µs med=55.84µs max=241.17ms p(90)=119.58µs p(95)=292.09µs p(99.9)=6.44ms  
     http_req_sending...............: avg=89.18µs  min=5.59µs  med=11.62µs max=240.89ms p(90)=33.03µs  p(95)=131.46µs p(99.9)=10.68ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=78.67ms  min=5.02ms  med=77ms    max=554.62ms p(90)=98.79ms  p(95)=106.53ms p(99.9)=302.52ms
     http_reqs......................: 37921   624.928831/s
     iteration_duration.............: avg=79.36ms  min=14.65ms med=77.43ms max=600.41ms p(90)=99.31ms  p(95)=107.08ms p(99.9)=348.06ms
     iterations.....................: 37821   623.280856/s
     success_rate...................: 100.00% ✓ 37821      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b9e9ef20-6c46-4950-28d0-695ff027c400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/17ab3f42-52d3-4611-fe51-571cb63c4e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-router</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 70119      ✗ 0    
     data_received..................: 2.1 GB  34 MB/s
     data_sent......................: 27 MB   449 kB/s
     http_req_blocked...............: avg=30.65µs  min=1.81µs  med=2.84µs   max=18.32ms  p(90)=4.08µs   p(95)=4.86µs   p(99.9)=13.61ms 
     http_req_connecting............: avg=26.96µs  min=0s      med=0s       max=18.19ms  p(90)=0s       p(95)=0s       p(99.9)=13.51ms 
     http_req_duration..............: avg=127.61ms min=6.02ms  med=126.55ms max=567.55ms p(90)=157.38ms p(95)=166.76ms p(99.9)=404.86ms
       { expected_response:true }...: avg=127.61ms min=6.02ms  med=126.55ms max=567.55ms p(90)=157.38ms p(95)=166.76ms p(99.9)=404.86ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 23473
     http_req_receiving.............: avg=72.82µs  min=29.03µs med=48.72µs  max=14.35ms  p(90)=97.69µs  p(95)=126.22µs p(99.9)=1.28ms  
     http_req_sending...............: avg=91.72µs  min=7.25µs  med=11.4µs   max=405.63ms p(90)=19.2µs   p(95)=39.35µs  p(99.9)=2.78ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=127.45ms min=5.97ms  med=126.44ms max=567.07ms p(90)=157.24ms p(95)=166.63ms p(99.9)=399.58ms
     http_reqs......................: 23473   386.090652/s
     iteration_duration.............: avg=128.42ms min=34.69ms med=126.9ms  max=612.47ms p(90)=157.68ms p(95)=167.19ms p(99.9)=432.19ms
     iterations.....................: 23373   384.445823/s
     success_rate...................: 100.00% ✓ 23373      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1c8aa55c-9bbe-4cb4-e034-5bd783fb9400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/93acfe1c-2baf-414d-9b7e-541c3f32c400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: hive-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 53628      ✗ 0    
     data_received..................: 1.6 GB  26 MB/s
     data_sent......................: 21 MB   343 kB/s
     http_req_blocked...............: avg=42.58µs  min=1.27µs  med=2.9µs    max=28.4ms   p(90)=5µs      p(95)=6.6µs    p(99.9)=15.87ms 
     http_req_connecting............: avg=38.32µs  min=0s      med=0s       max=28.26ms  p(90)=0s       p(95)=0s       p(99.9)=15.81ms 
     http_req_duration..............: avg=166.72ms min=6.45ms  med=153.7ms  max=633.04ms p(90)=191.59ms p(95)=320.7ms  p(99.9)=520.46ms
       { expected_response:true }...: avg=166.72ms min=6.45ms  med=153.7ms  max=633.04ms p(90)=191.59ms p(95)=320.7ms  p(99.9)=520.46ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 17976
     http_req_receiving.............: avg=106.69µs min=26.98µs med=54.91µs  max=105.8ms  p(90)=120.86µs p(95)=229.32µs p(99.9)=4.22ms  
     http_req_sending...............: avg=97.17µs  min=5.51µs  med=11.45µs  max=193.24ms p(90)=33.24µs  p(95)=130.77µs p(99.9)=8.74ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=166.51ms min=6.36ms  med=153.57ms max=625.51ms p(90)=191.32ms p(95)=320.31ms p(99.9)=520.41ms
     http_reqs......................: 17976   294.90643/s
     iteration_duration.............: avg=167.99ms min=28.39ms med=154.1ms  max=698.68ms p(90)=192.08ms p(95)=321.54ms p(99.9)=528.37ms
     iterations.....................: 17876   293.265874/s
     success_rate...................: 100.00% ✓ 17876      ✗ 0    
     vus............................: 50      min=50       max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5e86e18a-2c02-4b0e-4039-6baf85a52700/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a52423ee-3d0c-433f-fb6d-6e8634457e00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: apollo-gateway</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 16125     ✗ 0   
     data_received..................: 481 MB  7.8 MB/s
     data_sent......................: 6.4 MB  103 kB/s
     http_req_blocked...............: avg=67.29µs  min=1.44µs   med=3.25µs   max=13.7ms   p(90)=5.17µs   p(95)=5.81µs   p(99.9)=11.9ms  
     http_req_connecting............: avg=63.36µs  min=0s       med=0s       max=13.67ms  p(90)=0s       p(95)=0s       p(99.9)=11.86ms 
     http_req_duration..............: avg=550.6ms  min=10.05ms  med=551.96ms max=920.41ms p(90)=628.64ms p(95)=650.61ms p(99.9)=844.29ms
       { expected_response:true }...: avg=550.6ms  min=10.05ms  med=551.96ms max=920.41ms p(90)=628.64ms p(95)=650.61ms p(99.9)=844.29ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 5475
     http_req_receiving.............: avg=85.38µs  min=32.93µs  med=61.26µs  max=79.68ms  p(90)=105.05µs p(95)=121.65µs p(99.9)=538.34µs
     http_req_sending...............: avg=124.98µs min=6.63µs   med=13.74µs  max=178.32ms p(90)=21.39µs  p(95)=25.16µs  p(99.9)=7ms     
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=550.39ms min=9.97ms   med=551.79ms max=920.25ms p(90)=628.36ms p(95)=650.26ms p(99.9)=843.66ms
     http_reqs......................: 5475    88.860506/s
     iteration_duration.............: avg=561.02ms min=308.14ms med=553ms    max=953.84ms p(90)=630.04ms p(95)=651.41ms p(99.9)=863.05ms
     iterations.....................: 5375    87.237483/s
     success_rate...................: 100.00% ✓ 5375      ✗ 0   
     vus............................: 50      min=0       max=50
     vus_max........................: 50      min=50      max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/157eae8c-3521-484d-f1bc-4b9155806a00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/28025be8-833f-4052-c50a-aa9b823ca400/public" alt="HTTP Overview" />


  </details>