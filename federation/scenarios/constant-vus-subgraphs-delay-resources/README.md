## Overview for: `federation/constant-vus-subgraphs-delay-resources`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 500 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3fa36392-3154-420c-8ec4-8e05c47abb00/public" alt="Comparison" />


| Gateway          | Successful RPS ⬇️ |        Requests        |         Duration          | Notes                                                                                                           |
| :--------------- | :---------------: | :--------------------: | :-----------------------: | :-------------------------------------------------------------------------------------------------------------- |
| cosmo            |        176        | 10838 total, 0 failed  | avg: 1299ms, p95: 3063ms  | ✅                                                                                                               |
| grafbase         |        164        | 10122 total, 0 failed  | avg: 1380ms, p95: 3840ms  | ✅                                                                                                               |
| apollo-router    |        158        | 9754 total, 10 failed  | avg: 1343ms, p95: 3029ms  | ❌ 10 failed requests, 10 non-200 responses, 11 unexpected GraphQL errors, non-compatible response structure (1) |
| hive-gateway-bun |        87         |  5634 total, 0 failed  | avg: 5346ms, p95: 9143ms  | ✅                                                                                                               |
| apollo-server    |        83         | 5730 total, 262 failed | avg: 5348ms, p95: 46959ms | ❌ 262 failed requests, 262 non-200 responses, 262 unexpected GraphQL errors                                     |
| hive-gateway     |        78         | 5205 total, 145 failed | avg: 5854ms, p95: 26508ms | ❌ 145 failed requests, 145 non-200 responses, 145 unexpected GraphQL errors                                     |
| mercurius        |        77         |  4905 total, 0 failed  | avg: 6247ms, p95: 8223ms  | ✅                                                                                                               |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32454      ✗ 0    
     data_received..................: 951 MB  16 MB/s
     data_sent......................: 13 MB   209 kB/s
     http_req_blocked...............: avg=3.18ms   min=1.27µs  med=3.19µs  max=2.44s  p(90)=5.12µs   p(95)=55.39µs
     http_req_connecting............: avg=2.39ms   min=0s      med=0s      max=1.35s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=1.29s    min=3.33ms  med=1.11s   max=7.09s  p(90)=2.53s    p(95)=3.06s  
       { expected_response:true }...: avg=1.29s    min=3.33ms  med=1.11s   max=7.09s  p(90)=2.53s    p(95)=3.06s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10838
     http_req_receiving.............: avg=294.08ms min=33.51µs med=80.09µs max=5.41s  p(90)=1.31s    p(95)=2.02s  
     http_req_sending...............: avg=29.7ms   min=7.77µs  med=14.73µs max=3.15s  p(90)=418.15µs p(95)=21.96ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=975.35ms min=3.21ms  med=927.9ms max=4.17s  p(90)=1.68s    p(95)=2.06s  
     http_reqs......................: 10838   176.266643/s
     iteration_duration.............: avg=2.76s    min=20.46ms med=2.41s   max=12.05s p(90)=5.27s    p(95)=6.2s   
     iterations.....................: 10818   175.941367/s
     vus............................: 261     min=261      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/37d1d7ee-989e-4019-1d0c-e96e249b1e00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/33c3fed4-7273-491e-2be9-8ac12e549400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cfdbff50-6d8d-4e7d-d944-dc178fc57c00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30306      ✗ 0    
     data_received..................: 890 MB  14 MB/s
     data_sent......................: 12 MB   195 kB/s
     http_req_blocked...............: avg=1.71ms   min=1.74µs  med=3.82µs   max=1.87s  p(90)=6.15µs   p(95)=185.66µs
     http_req_connecting............: avg=847.17µs min=0s      med=0s       max=1.65s  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=1.38s    min=3.25ms  med=1.14s    max=9.79s  p(90)=2.72s    p(95)=3.84s   
       { expected_response:true }...: avg=1.38s    min=3.25ms  med=1.14s    max=9.79s  p(90)=2.72s    p(95)=3.84s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 10122
     http_req_receiving.............: avg=447.76ms min=32.47µs med=95.94µs  max=7.77s  p(90)=1.5s     p(95)=2.53s   
     http_req_sending...............: avg=41.22ms  min=7.21µs  med=18.38µs  max=6.3s   p(90)=239.87µs p(95)=18.88ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=891.41ms min=3.17ms  med=814.49ms max=3.7s   p(90)=1.65s    p(95)=1.98s   
     http_reqs......................: 10122   164.359589/s
     iteration_duration.............: avg=2.95s    min=25.2ms  med=2.55s    max=14.25s p(90)=5.73s    p(95)=6.95s   
     iterations.....................: 10102   164.034832/s
     vus............................: 197     min=197      max=500
     vus_max........................: 500     min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ae213e8b-d7ec-4721-e9f7-ffdd3cfaed00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b63b3100-05b8-4c5b-ab64-c75b0b4a3200/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/00c53d3d-e763-47ff-0fa8-bbf2a2308000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 9724 / ✗ 10
     ✗ no graphql errors
      ↳  99% — ✓ 9723 / ✗ 11
     ✗ valid response structure
      ↳  99% — ✓ 9723 / ✗ 1

     █ setup

     checks.........................: 99.92% ✓ 29170      ✗ 22   
     data_received..................: 855 MB 14 MB/s
     data_sent......................: 12 MB  188 kB/s
     http_req_blocked...............: avg=5.25ms   min=1.61µs  med=3.57µs   max=3.34s  p(90)=6.29µs   p(95)=6.33ms
     http_req_connecting............: avg=5.18ms   min=0s      med=0s       max=3.34s  p(90)=0s       p(95)=5.22ms
     http_req_duration..............: avg=1.34s    min=7.46ms  med=1.22s    max=7.17s  p(90)=2.47s    p(95)=3.02s 
       { expected_response:true }...: avg=1.34s    min=7.46ms  med=1.22s    max=7.17s  p(90)=2.47s    p(95)=3.02s 
     http_req_failed................: 0.10%  ✓ 10         ✗ 9744 
     http_req_receiving.............: avg=318.15ms min=0s      med=90.69µs  max=5.74s  p(90)=1.25s    p(95)=1.91s 
     http_req_sending...............: avg=23.98ms  min=7.22µs  med=17.58µs  max=4.78s  p(90)=150.65µs p(95)=2.25ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=1s       min=7.35ms  med=936.02ms max=3.18s  p(90)=1.83s    p(95)=2.04s 
     http_reqs......................: 9754   158.687222/s
     iteration_duration.............: avg=3.04s    min=26.64ms med=2.78s    max=12.05s p(90)=5.59s    p(95)=6.53s 
     iterations.....................: 9734   158.361844/s
     vus............................: 285    min=285      max=500
     vus_max........................: 500    min=500      max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f02d0468-a571-43fb-70b8-68673d1f7600/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6c08de87-a0f9-4bf3-3dc6-434e752a8c00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/99f87111-8c0f-42cc-f705-3d8ae1e67b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 16842     ✗ 0    
     data_received..................: 495 MB  7.7 MB/s
     data_sent......................: 6.7 MB  104 kB/s
     http_req_blocked...............: avg=5.46ms  min=1.83µs   med=4.23µs   max=170.54ms p(90)=13.91µs p(95)=53.41ms 
     http_req_connecting............: avg=5.31ms  min=0s       med=0s       max=170.51ms p(90)=0s      p(95)=51.77ms 
     http_req_duration..............: avg=5.34s   min=16.76ms  med=4.93s    max=13.99s   p(90)=7.92s   p(95)=9.14s   
       { expected_response:true }...: avg=5.34s   min=16.76ms  med=4.93s    max=13.99s   p(90)=7.92s   p(95)=9.14s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5634 
     http_req_receiving.............: avg=68.07ms min=33.55µs  med=124.34µs max=2.89s    p(90)=7.79ms  p(95)=320.91ms
     http_req_sending...............: avg=3.34ms  min=8.4µs    med=23.3µs   max=580.53ms p(90)=1.1ms   p(95)=26.06ms 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=5.27s   min=16.57ms  med=4.88s    max=13.99s   p(90)=7.82s   p(95)=9.1s    
     http_reqs......................: 5634    87.744624/s
     iteration_duration.............: avg=5.49s   min=425.29ms med=5.05s    max=14.16s   p(90)=8.03s   p(95)=9.24s   
     iterations.....................: 5614    87.433142/s
     vus............................: 34      min=34      max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f8fd7b07-fa48-48f2-b5a5-ddf922162700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ca0239f5-15dd-45e3-beb0-046b04c83700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/664122f2-b298-4584-09ca-5508cc658200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  95% — ✓ 5448 / ✗ 262
     ✗ no graphql errors
      ↳  95% — ✓ 5448 / ✗ 262
     ✓ valid response structure

     █ setup

     checks.........................: 96.89% ✓ 16344     ✗ 524  
     data_received..................: 481 MB 7.3 MB/s
     data_sent......................: 6.8 MB 103 kB/s
     http_req_blocked...............: avg=2.06ms   min=1.56µs   med=3.22µs   max=177.82ms p(90)=168.7µs  p(95)=17.67ms 
     http_req_connecting............: avg=2.01ms   min=0s       med=0s       max=152ms    p(90)=127.02µs p(95)=17.41ms 
     http_req_duration..............: avg=5.34s    min=11.9ms   med=2.12s    max=1m0s     p(90)=2.95s    p(95)=46.95s  
       { expected_response:true }...: avg=2.72s    min=11.9ms   med=2.07s    max=59.44s   p(90)=2.69s    p(95)=3.09s   
     http_req_failed................: 4.57%  ✓ 262       ✗ 5468 
     http_req_receiving.............: avg=218.98µs min=0s       med=101.84µs max=48.96ms  p(90)=207.08µs p(95)=336.81µs
     http_req_sending...............: avg=407.59µs min=9.12µs   med=16.79µs  max=94.7ms   p(90)=151.95µs p(95)=1.37ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.34s    min=11.72ms  med=2.12s    max=1m0s     p(90)=2.95s    p(95)=46.95s  
     http_reqs......................: 5730   87.115614/s
     iteration_duration.............: avg=5.38s    min=389.07ms med=2.14s    max=1m0s     p(90)=2.97s    p(95)=47.78s  
     iterations.....................: 5710   86.811546/s
     vus............................: 79     min=79      max=500
     vus_max........................: 500    min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/da200f07-7f0a-47e7-d398-23171cfce100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c10ac9ff-7b51-4b98-9901-eca42adaa000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8562edc7-9ab3-4419-885b-0af14d53e700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  97% — ✓ 5040 / ✗ 145
     ✗ no graphql errors
      ↳  97% — ✓ 5040 / ✗ 145
     ✓ valid response structure

     █ setup

     checks.........................: 98.11% ✓ 15120    ✗ 290  
     data_received..................: 444 MB 6.9 MB/s
     data_sent......................: 6.2 MB 96 kB/s
     http_req_blocked...............: avg=5.98ms   min=2.14µs   med=4.49µs   max=135.7ms  p(90)=33.01µs  p(95)=62.26ms
     http_req_connecting............: avg=5.81ms   min=0s       med=0s       max=132.14ms p(90)=0s       p(95)=61.6ms 
     http_req_duration..............: avg=5.85s    min=17.15ms  med=3.23s    max=1m0s     p(90)=5.49s    p(95)=26.5s  
       { expected_response:true }...: avg=4.29s    min=17.15ms  med=3.19s    max=59.63s   p(90)=4.75s    p(95)=6.74s  
     http_req_failed................: 2.78%  ✓ 145      ✗ 5060 
     http_req_receiving.............: avg=1.41ms   min=0s       med=110.27µs max=309.22ms p(90)=861.16µs p(95)=2.83ms 
     http_req_sending...............: avg=944.43µs min=9.57µs   med=26.14µs  max=105.01ms p(90)=607.59µs p(95)=3.88ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=5.85s    min=17.03ms  med=3.23s    max=1m0s     p(90)=5.47s    p(95)=26.5s  
     http_reqs......................: 5205   80.76844/s
     iteration_duration.............: avg=5.92s    min=644.96ms med=3.27s    max=1m0s     p(90)=5.53s    p(95)=26.66s 
     iterations.....................: 5185   80.45809/s
     vus............................: 44     min=44     max=500
     vus_max........................: 500    min=500    max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/58959b52-9cc0-4534-3fb0-625021c4f500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/64438f6e-9b60-40a8-aa40-29264067e000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2352b3dc-95be-4b7d-a3f9-489ccf0f5a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14655     ✗ 0    
     data_received..................: 431 MB  6.8 MB/s
     data_sent......................: 5.8 MB  92 kB/s
     http_req_blocked...............: avg=1.64ms   min=1.8µs    med=3.71µs  max=44.63ms  p(90)=144.19µs p(95)=17.23ms 
     http_req_connecting............: avg=1.59ms   min=0s       med=0s      max=34.62ms  p(90)=102.95µs p(95)=16.86ms 
     http_req_duration..............: avg=6.24s    min=11.99ms  med=6.23s   max=12.97s   p(90)=7.33s    p(95)=8.22s   
       { expected_response:true }...: avg=6.24s    min=11.99ms  med=6.23s   max=12.97s   p(90)=7.33s    p(95)=8.22s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4905 
     http_req_receiving.............: avg=4.23ms   min=39.07µs  med=97.92µs max=753.07ms p(90)=246.62µs p(95)=507.99µs
     http_req_sending...............: avg=142.09µs min=9.1µs    med=20.53µs max=39.94ms  p(90)=98.09µs  p(95)=614.81µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=6.24s    min=11.87ms  med=6.23s   max=12.97s   p(90)=7.33s    p(95)=8.22s   
     http_reqs......................: 4905    77.557933/s
     iteration_duration.............: avg=6.3s     min=465.57ms med=6.25s   max=13.01s   p(90)=7.35s    p(95)=8.24s   
     iterations.....................: 4885    77.241693/s
     vus............................: 82      min=82      max=500
     vus_max........................: 500     min=500     max=500
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/cf5f23a0-8ceb-4091-1cc7-d6ed217b3700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/732f04cc-993d-49bc-533a-7b60f6e49700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5bdefad1-da93-480d-79e4-429d19915800/public" alt="HTTP Overview" />


  </details>