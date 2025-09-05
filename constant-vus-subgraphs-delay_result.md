## Overview for: `constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 50 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0701dd2b-631e-4fe9-8a2b-fbfc4a96b100/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |        Duration        | Notes |
| :--------------- | :----: | :-------------------: | :--------------------: | :---- |
| grafbase         |  167   | 13600 total, 0 failed | avg: 222ms, p95: 236ms | ✅     |
| hive-router      |  167   | 13537 total, 0 failed | avg: 224ms, p95: 234ms | ✅     |
| cosmo            |  158   | 12853 total, 0 failed | avg: 235ms, p95: 258ms | ✅     |
| hive-gateway     |  148   | 11363 total, 0 failed | avg: 266ms, p95: 392ms | ✅     |
| hive-gateway-bun |  143   | 10997 total, 0 failed | avg: 275ms, p95: 369ms | ✅     |
| apollo-router    |  127   | 10396 total, 0 failed | avg: 291ms, p95: 337ms | ✅     |
| apollo-gateway   |   85   | 7009 total, 0 failed  | avg: 432ms, p95: 470ms | ✅     |



<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 40500      ✗ 0    
     data_received..................: 1.2 GB  15 MB/s
     data_sent......................: 16 MB   195 kB/s
     http_req_blocked...............: avg=56.58µs  min=1.35µs   med=3.3µs    max=22.01ms  p(90)=5.97µs   p(95)=7.7µs    p(99.9)=15.94ms 
     http_req_connecting............: avg=50.58µs  min=0s       med=0s       max=21.96ms  p(90)=0s       p(95)=0s       p(99.9)=15.19ms 
     http_req_duration..............: avg=222.06ms min=205.35ms med=219.88ms max=690.62ms p(90)=231.85ms p(95)=236.18ms p(99.9)=538.8ms 
       { expected_response:true }...: avg=222.06ms min=205.35ms med=219.88ms max=690.62ms p(90)=231.85ms p(95)=236.18ms p(99.9)=538.8ms 
     http_req_failed................: 0.00%   ✓ 0          ✗ 13600
     http_req_receiving.............: avg=98.17µs  min=29.68µs  med=69.87µs  max=10.08ms  p(90)=134.62µs p(95)=180.05µs p(99.9)=2.76ms  
     http_req_sending...............: avg=84.91µs  min=6.64µs   med=13.44µs  max=297.14ms p(90)=29.94µs  p(95)=43.51µs  p(99.9)=6.07ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=221.87ms min=205.29ms med=219.76ms max=684.52ms p(90)=231.64ms p(95)=235.97ms p(99.9)=532.57ms
     http_reqs......................: 13600   167.533773/s
     iteration_duration.............: avg=222.48ms min=205.48ms med=220.19ms max=712.69ms p(90)=232.17ms p(95)=236.47ms p(99.9)=563.37ms
     iterations.....................: 13500   166.301907/s
     success_rate...................: 100.00% ✓ 13500      ✗ 0    
     vus............................: 48      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c424d8f3-eee5-49f0-0ca8-2f0892690f00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ed878f4d-f8ea-426c-ca8d-30fe71f85a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 40311      ✗ 0    
     data_received..................: 1.2 GB  15 MB/s
     data_sent......................: 16 MB   194 kB/s
     http_req_blocked...............: avg=22.82µs  min=1.17µs   med=2.25µs   max=10.68ms  p(90)=3.37µs   p(95)=4.73µs   p(99.9)=7.88ms  
     http_req_connecting............: avg=19.87µs  min=0s       med=0s       max=10.64ms  p(90)=0s       p(95)=0s       p(99.9)=7.86ms  
     http_req_duration..............: avg=223.54ms min=122.57ms med=222.75ms max=600.5ms  p(90)=231.56ms p(95)=234.24ms p(99.9)=504.92ms
       { expected_response:true }...: avg=223.54ms min=122.57ms med=222.75ms max=600.5ms  p(90)=231.56ms p(95)=234.24ms p(99.9)=504.92ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 13537
     http_req_receiving.............: avg=82.59µs  min=26.1µs   med=44.01µs  max=13.22ms  p(90)=95.09µs  p(95)=276.08µs p(99.9)=3.8ms   
     http_req_sending...............: avg=112.91µs min=5.61µs   med=9.62µs   max=350.64ms p(90)=29.68µs  p(95)=101.16µs p(99.9)=4.4ms   
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=223.35ms min=122.52ms med=222.65ms max=599.57ms p(90)=231.38ms p(95)=234.06ms p(99.9)=498.58ms
     http_reqs......................: 13537   167.119372/s
     iteration_duration.............: avg=223.88ms min=122.7ms  med=222.97ms max=607.58ms p(90)=231.74ms p(95)=234.42ms p(99.9)=516.54ms
     iterations.....................: 13437   165.884834/s
     success_rate...................: 100.00% ✓ 13437      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ce6ba015-81fa-45c2-0703-62c138666400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ab2448aa-bdf9-4a65-11b4-cf8c8569bd00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 38259      ✗ 0    
     data_received..................: 1.1 GB  14 MB/s
     data_sent......................: 15 MB   185 kB/s
     http_req_blocked...............: avg=58.39µs  min=1.32µs   med=2.71µs   max=19.62ms  p(90)=4.06µs   p(95)=5.17µs   p(99.9)=16.86ms 
     http_req_connecting............: avg=54.53µs  min=0s       med=0s       max=19.59ms  p(90)=0s       p(95)=0s       p(99.9)=16.57ms 
     http_req_duration..............: avg=234.81ms min=159.37ms med=234.1ms  max=649.66ms p(90)=251.99ms p(95)=258.43ms p(99.9)=545.03ms
       { expected_response:true }...: avg=234.81ms min=159.37ms med=234.1ms  max=649.66ms p(90)=251.99ms p(95)=258.43ms p(99.9)=545.03ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 12853
     http_req_receiving.............: avg=330.69µs min=32.85µs  med=75.95µs  max=88.25ms  p(90)=251.48µs p(95)=523.22µs p(99.9)=27.02ms 
     http_req_sending...............: avg=93.64µs  min=6.26µs   med=11.33µs  max=228.9ms  p(90)=29.98µs  p(95)=126.96µs p(99.9)=5.61ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=234.39ms min=157.94ms med=233.72ms max=644.67ms p(90)=251.47ms p(95)=257.89ms p(99.9)=541.81ms
     http_reqs......................: 12853   158.736312/s
     iteration_duration.............: avg=235.35ms min=159.64ms med=234.44ms max=690ms    p(90)=252.26ms p(95)=258.72ms p(99.9)=577.77ms
     iterations.....................: 12753   157.501298/s
     success_rate...................: 100.00% ✓ 12753      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/752fe817-7b7a-4afb-96d3-45022e25c400/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c22d1a9f-0efc-4f25-d673-a06cbbabf700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 33789      ✗ 0    
     data_received..................: 998 MB  13 MB/s
     data_sent......................: 13 MB   172 kB/s
     http_req_blocked...............: avg=34.75µs  min=1.14µs   med=2.79µs   max=13.59ms  p(90)=4.45µs   p(95)=6.12µs   p(99.9)=10.48ms 
     http_req_connecting............: avg=30.42µs  min=0s       med=0s       max=13.56ms  p(90)=0s       p(95)=0s       p(99.9)=10.41ms 
     http_req_duration..............: avg=265.79ms min=160.77ms med=255.7ms  max=759.23ms p(90)=276.62ms p(95)=391.54ms p(99.9)=666.02ms
       { expected_response:true }...: avg=265.79ms min=160.77ms med=255.7ms  max=759.23ms p(90)=276.62ms p(95)=391.54ms p(99.9)=666.02ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 11363
     http_req_receiving.............: avg=100.28µs min=25.56µs  med=49.4µs   max=16.65ms  p(90)=115.2µs  p(95)=354.47µs p(99.9)=4.99ms  
     http_req_sending...............: avg=117.88µs min=5.51µs   med=11.29µs  max=279.57ms p(90)=37.01µs  p(95)=142µs    p(99.9)=8.52ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=265.57ms min=160.69ms med=255.57ms max=758.43ms p(90)=276.39ms p(95)=390.03ms p(99.9)=664.91ms
     http_reqs......................: 11363   148.219543/s
     iteration_duration.............: avg=267.1ms  min=176.25ms med=256ms    max=822.08ms p(90)=276.97ms p(95)=394.36ms p(99.9)=708.45ms
     iterations.....................: 11263   146.915138/s
     success_rate...................: 100.00% ✓ 11263      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/88514e04-85df-4c70-1c2b-bd612d3dff00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d884ac37-3b4d-457c-b195-8e6a8be5b600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 32691      ✗ 0    
     data_received..................: 966 MB  13 MB/s
     data_sent......................: 13 MB   167 kB/s
     http_req_blocked...............: avg=49.89µs  min=1.2µs    med=2.72µs   max=20.77ms  p(90)=4.52µs   p(95)=6.61µs   p(99.9)=13.48ms 
     http_req_connecting............: avg=45.06µs  min=0s       med=0s       max=16.55ms  p(90)=0s       p(95)=0s       p(99.9)=13.02ms 
     http_req_duration..............: avg=274.75ms min=145.15ms med=271.47ms max=828.33ms p(90)=316.96ms p(95)=368.69ms p(99.9)=715.89ms
       { expected_response:true }...: avg=274.75ms min=145.15ms med=271.47ms max=828.33ms p(90)=316.96ms p(95)=368.69ms p(99.9)=715.89ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 10997
     http_req_receiving.............: avg=108.35µs min=25.85µs  med=52.56µs  max=25.6ms   p(90)=132.66µs p(95)=391.7µs  p(99.9)=4.81ms  
     http_req_sending...............: avg=173.6µs  min=5.54µs   med=11.22µs  max=287.69ms p(90)=36.93µs  p(95)=145.76µs p(99.9)=12.73ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=274.47ms min=145.07ms med=271.26ms max=824.95ms p(90)=316.4ms  p(95)=368.04ms p(99.9)=703.1ms 
     http_reqs......................: 10997   143.368633/s
     iteration_duration.............: avg=276.16ms min=145.38ms med=271.96ms max=884.83ms p(90)=317.73ms p(95)=369.62ms p(99.9)=801.74ms
     iterations.....................: 10897   142.064926/s
     success_rate...................: 100.00% ✓ 10897      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/44a5766c-bf2d-4a33-8cc9-73f39c189b00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9a1d246e-fe12-4fe9-af96-a8c753c0a600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 30888      ✗ 0    
     data_received..................: 912 MB  11 MB/s
     data_sent......................: 12 MB   148 kB/s
     http_req_blocked...............: avg=30.08µs  min=1.78µs   med=2.77µs   max=11.24ms  p(90)=4.27µs   p(95)=5.27µs   p(99.9)=9.05ms  
     http_req_connecting............: avg=26.56µs  min=0s       med=0s       max=11.19ms  p(90)=0s       p(95)=0s       p(99.9)=9.01ms  
     http_req_duration..............: avg=291.29ms min=147.37ms med=291.08ms max=713.78ms p(90)=327.57ms p(95)=337.04ms p(99.9)=619.35ms
       { expected_response:true }...: avg=291.29ms min=147.37ms med=291.08ms max=713.78ms p(90)=327.57ms p(95)=337.04ms p(99.9)=619.35ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 10396
     http_req_receiving.............: avg=89.65µs  min=34.9µs   med=53.12µs  max=4.43ms   p(90)=110.59µs p(95)=237.1µs  p(99.9)=1.54ms  
     http_req_sending...............: avg=48.79µs  min=7.57µs   med=11.36µs  max=31.56ms  p(90)=27.51µs  p(95)=135.52µs p(99.9)=2.92ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=291.15ms min=147.31ms med=290.93ms max=712.43ms p(90)=327.49ms p(95)=336.91ms p(99.9)=618.27ms
     http_reqs......................: 10396   127.339926/s
     iteration_duration.............: avg=292.42ms min=147.55ms med=291.71ms max=731.79ms p(90)=327.9ms  p(95)=337.35ms p(99.9)=676.63ms
     iterations.....................: 10296   126.115032/s
     success_rate...................: 100.00% ✓ 10296      ✗ 0    
     vus............................: 50      min=0        max=50 
     vus_max........................: 50      min=50       max=50 
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2f3b1f39-eb4b-4997-3e11-d37ebfe90100/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ca0ba98e-da1d-4656-a14d-c5e4de469a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     checks.........................: 100.00% ✓ 20727     ✗ 0   
     data_received..................: 616 MB  7.5 MB/s
     data_sent......................: 8.2 MB  100 kB/s
     http_req_blocked...............: avg=52.51µs  min=1.55µs   med=3.37µs   max=12.91ms  p(90)=5.08µs   p(95)=5.91µs   p(99.9)=11.14ms 
     http_req_connecting............: avg=48.4µs   min=0s       med=0s       max=12.87ms  p(90)=0s       p(95)=0s       p(99.9)=11.1ms  
     http_req_duration..............: avg=431.79ms min=211.39ms med=435.64ms max=857.86ms p(90)=459.71ms p(95)=469.96ms p(99.9)=783.45ms
       { expected_response:true }...: avg=431.79ms min=211.39ms med=435.64ms max=857.86ms p(90)=459.71ms p(95)=469.96ms p(99.9)=783.45ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 7009
     http_req_receiving.............: avg=68.4µs   min=32.54µs  med=56.43µs  max=5.73ms   p(90)=98.72µs  p(95)=118.48µs p(99.9)=760.83µs
     http_req_sending...............: avg=76.34µs  min=6.53µs   med=12.99µs  max=228.96ms p(90)=20.29µs  p(95)=31.29µs  p(99.9)=4.88ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s       p(99.9)=0s      
     http_req_waiting...............: avg=431.64ms min=211.29ms med=435.55ms max=857.5ms  p(90)=459.57ms p(95)=469.71ms p(99.9)=782.13ms
     http_reqs......................: 7009    85.76075/s
     iteration_duration.............: avg=435.36ms min=285.53ms med=436.18ms max=887.53ms p(90)=460.27ms p(95)=470.57ms p(99.9)=817.66ms
     iterations.....................: 6909    84.537169/s
     success_rate...................: 100.00% ✓ 6909      ✗ 0   
     vus............................: 50      min=0       max=50
     vus_max........................: 50      min=50      max=50
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/63ec0108-8958-4231-1aea-b50aca96dd00/public" alt="Performance Overview" />




**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/703ffb5e-bf47-40c7-63e1-92a05598fd00/public" alt="HTTP Overview" />


  </details>