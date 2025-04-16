## Overview for: `federation/constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ca4469fc-fbc2-4aee-139a-8537f8857d00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests        |         Duration         | Notes                                                                    |
| :--------------- | :----: | :-------------------: | :----------------------: | :----------------------------------------------------------------------- |
| cosmo            |  181   | 11050 total, 0 failed | avg: 796ms, p95: 2225ms  | ✅                                                                        |
| apollo-router    |  165   | 10082 total, 0 failed | avg: 882ms, p95: 2311ms  | ✅                                                                        |
| grafbase         |  164   | 10009 total, 0 failed | avg: 888ms, p95: 2447ms  | ✅                                                                        |
| hive-gateway-bun |   85   | 5455 total, 0 failed  | avg: 3298ms, p95: 5420ms | ✅                                                                        |
| apollo-server    |   82   | 5192 total, 21 failed | avg: 3520ms, p95: 3520ms | ❌ 21 failed requests, 21 non-200 responses, 21 unexpected GraphQL errors |
| hive-gateway     |   76   | 4836 total, 20 failed | avg: 3795ms, p95: 5336ms | ❌ 20 failed requests, 20 non-200 responses, 20 unexpected GraphQL errors |
| mercurius        |   74   | 4632 total, 0 failed  | avg: 3918ms, p95: 5195ms | ✅                                                                        |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 33090      ✗ 0    
     data_received..................: 970 MB  16 MB/s
     data_sent......................: 13 MB   215 kB/s
     http_req_blocked...............: avg=1.31ms   min=1.38µs  med=3.46µs   max=1.5s  p(90)=5.52µs   p(95)=11.53µs
     http_req_connecting............: avg=1.03ms   min=0s      med=0s       max=1.08s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=795.75ms min=3.25ms  med=619.55ms max=6.45s p(90)=1.63s    p(95)=2.22s  
       { expected_response:true }...: avg=795.75ms min=3.25ms  med=619.55ms max=6.45s p(90)=1.63s    p(95)=2.22s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 11050
     http_req_receiving.............: avg=269.57ms min=29.88µs med=90.39µs  max=5.89s p(90)=1.05s    p(95)=1.68s  
     http_req_sending...............: avg=25.11ms  min=8.1µs   med=16.3µs   max=3.24s p(90)=123.21µs p(95)=20.47ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=501.07ms min=3.14ms  med=448.34ms max=2.38s p(90)=918.14ms p(95)=1.08s  
     http_reqs......................: 11050   181.48156/s
     iteration_duration.............: avg=1.62s    min=21.68ms med=1.31s    max=9.28s p(90)=3.34s    p(95)=4.08s  
     iterations.....................: 11030   181.153087/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bdab8185-5e77-4bbe-83c9-b0c87f947d00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c79fb783-2200-4553-1b0a-f712aa32a700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e247ab61-d259-47bb-19d5-e14dba25c700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 30186      ✗ 0    
     data_received..................: 885 MB  15 MB/s
     data_sent......................: 12 MB   196 kB/s
     http_req_blocked...............: avg=1.44ms   min=1.62µs  med=3.32µs   max=1.63s p(90)=5.42µs   p(95)=11.23µs
     http_req_connecting............: avg=1.09ms   min=0s      med=0s       max=1.63s p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=881.81ms min=7.11ms  med=697.07ms max=5.6s  p(90)=1.85s    p(95)=2.31s  
       { expected_response:true }...: avg=881.81ms min=7.11ms  med=697.07ms max=5.6s  p(90)=1.85s    p(95)=2.31s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10082
     http_req_receiving.............: avg=294.69ms min=31.87µs med=87.61µs  max=5.18s p(90)=1.17s    p(95)=1.75s  
     http_req_sending...............: avg=17.29ms  min=7.86µs  med=15.3µs   max=3.34s p(90)=127.04µs p(95)=3.1ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=569.82ms min=7.03ms  med=527.58ms max=2.63s p(90)=1.06s    p(95)=1.21s  
     http_reqs......................: 10082   165.111479/s
     iteration_duration.............: avg=1.79s    min=30.92ms med=1.5s     max=9.49s p(90)=3.68s    p(95)=4.38s  
     iterations.....................: 10062   164.783942/s
     vus............................: 70      min=70       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9405c2e1-a61a-4c2a-5f92-b788935da700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/107705c9-23e7-4e5c-98de-94a5470ab300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0a40da70-10de-4dcf-04ae-b9da00537d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 29967     ✗ 0    
     data_received..................: 880 MB  14 MB/s
     data_sent......................: 12 MB   195 kB/s
     http_req_blocked...............: avg=860.36µs min=1.64µs  med=4.1µs    max=1.61s p(90)=5.93µs   p(95)=12.61µs
     http_req_connecting............: avg=715.99µs min=0s      med=0s       max=1.3s  p(90)=0s       p(95)=0s     
     http_req_duration..............: avg=888.12ms min=3.15ms  med=714.88ms max=7.53s p(90)=1.87s    p(95)=2.44s  
       { expected_response:true }...: avg=888.12ms min=3.15ms  med=714.88ms max=7.53s p(90)=1.87s    p(95)=2.44s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 10009
     http_req_receiving.............: avg=337.6ms  min=34.54µs med=100.16µs max=6.39s p(90)=1.25s    p(95)=1.83s  
     http_req_sending...............: avg=28.73ms  min=8.17µs  med=21µs     max=3.35s p(90)=207.11µs p(95)=19.64ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=521.77ms min=3.08ms  med=461.62ms max=2.35s p(90)=1.04s    p(95)=1.18s  
     http_reqs......................: 10009   164.3078/s
     iteration_duration.............: avg=1.79s    min=18.66ms med=1.49s    max=10.3s p(90)=3.75s    p(95)=4.54s  
     iterations.....................: 9989    163.97948/s
     vus............................: 300     min=300     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b53f9d2f-618a-4c57-50f4-2b346f812800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f50c6dc0-c7a7-4b4f-e07d-dd479e904100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4bb794a8-dbae-4a5b-fb70-9907f4744400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 16305     ✗ 0    
     data_received..................: 479 MB  7.5 MB/s
     data_sent......................: 6.5 MB  102 kB/s
     http_req_blocked...............: avg=743.12µs min=1.51µs   med=3.71µs   max=53.44ms  p(90)=6.04µs  p(95)=617.8µs 
     http_req_connecting............: avg=715.06µs min=0s       med=0s       max=53.39ms  p(90)=0s      p(95)=401.01µs
     http_req_duration..............: avg=3.29s    min=13.91ms  med=3.03s    max=7.34s    p(90)=4.95s   p(95)=5.41s   
       { expected_response:true }...: avg=3.29s    min=13.91ms  med=3.03s    max=7.34s    p(90)=4.95s   p(95)=5.41s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 5455 
     http_req_receiving.............: avg=45.24ms  min=39.06µs  med=114.63µs max=2.23s    p(90)=5.17ms  p(95)=278.28ms
     http_req_sending...............: avg=1.2ms    min=8.65µs   med=18.92µs  max=673.25ms p(90)=65.26µs p(95)=261.65µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.25s    min=13.77ms  med=3s       max=7.34s    p(90)=4.92s   p(95)=5.4s    
     http_reqs......................: 5455    85.87497/s
     iteration_duration.............: avg=3.4s     min=284.72ms med=3.1s     max=7.53s    p(90)=5.1s    p(95)=5.53s   
     iterations.....................: 5435    85.560121/s
     vus............................: 104     min=104     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fa44f9ff-2eab-4a48-b24e-74fb03b39500/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5fe441c2-f68c-4ab3-2bf6-498a66fa9300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/0d0313cd-4fa5-4d87-0ea6-d570e2811d00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 5151 / ✗ 21
     ✗ no graphql errors
      ↳  99% — ✓ 5151 / ✗ 21
     ✓ valid response structure

     █ setup

     checks.........................: 99.72% ✓ 15453     ✗ 42   
     data_received..................: 455 MB 7.2 MB/s
     data_sent......................: 6.2 MB 98 kB/s
     http_req_blocked...............: avg=2.1ms    min=1.71µs   med=3.85µs   max=128.85ms p(90)=6.05µs   p(95)=260.52µs
     http_req_connecting............: avg=2.02ms   min=0s       med=0s       max=128.81ms p(90)=0s       p(95)=163.4µs 
     http_req_duration..............: avg=3.51s    min=13.33ms  med=2.79s    max=1m0s     p(90)=3.29s    p(95)=3.51s   
       { expected_response:true }...: avg=3.29s    min=13.33ms  med=2.78s    max=59.57s   p(90)=3.28s    p(95)=3.48s   
     http_req_failed................: 0.40%  ✓ 21        ✗ 5171 
     http_req_receiving.............: avg=389.67µs min=0s       med=114.91µs max=88.9ms   p(90)=215.54µs p(95)=368.99µs
     http_req_sending...............: avg=223.84µs min=8.94µs   med=20.9µs   max=37.79ms  p(90)=41.43µs  p(95)=155.18µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.51s    min=13.18ms  med=2.79s    max=1m0s     p(90)=3.29s    p(95)=3.51s   
     http_reqs......................: 5192   82.40553/s
     iteration_duration.............: avg=3.55s    min=442.54ms med=2.81s    max=1m0s     p(90)=3.31s    p(95)=3.54s   
     iterations.....................: 5172   82.088098/s
     vus............................: 6      min=6       max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fbb3b393-166c-4135-60d7-906094e35300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9deb41e1-7c2b-4ec4-e317-06850b6eb900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/74c2e259-6864-47ab-19ce-86254f8a9200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  99% — ✓ 4796 / ✗ 20
     ✗ no graphql errors
      ↳  99% — ✓ 4796 / ✗ 20
     ✓ valid response structure

     █ setup

     checks.........................: 99.72% ✓ 14388     ✗ 40   
     data_received..................: 423 MB 6.7 MB/s
     data_sent......................: 5.7 MB 90 kB/s
     http_req_blocked...............: avg=2.19ms   min=1.85µs   med=4.42µs  max=94.86ms p(90)=6.49µs   p(95)=18.15ms
     http_req_connecting............: avg=2.12ms   min=0s       med=0s      max=84.25ms p(90)=0s       p(95)=16.75ms
     http_req_duration..............: avg=3.79s    min=15.79ms  med=2.66s   max=59.99s  p(90)=3.66s    p(95)=5.33s  
       { expected_response:true }...: avg=3.56s    min=15.79ms  med=2.65s   max=59.55s  p(90)=3.65s    p(95)=5.16s  
     http_req_failed................: 0.41%  ✓ 20        ✗ 4816 
     http_req_receiving.............: avg=392.35µs min=0s       med=116.2µs max=61.25ms p(90)=443.49µs p(95)=1.11ms 
     http_req_sending...............: avg=1.26ms   min=9.96µs   med=25.92µs max=72.25ms p(90)=71.42µs  p(95)=4.4ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=3.79s    min=15.68ms  med=2.66s   max=59.99s  p(90)=3.66s    p(95)=5.33s  
     http_reqs......................: 4836   76.057729/s
     iteration_duration.............: avg=3.83s    min=302.54ms med=2.68s   max=1m0s    p(90)=3.69s    p(95)=5.4s   
     iterations.....................: 4816   75.743181/s
     vus............................: 58     min=58      max=300
     vus_max........................: 300    min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9a85f5e6-f343-4006-8206-bdb8801c2700/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/95fb6e3d-475b-41f6-16b8-c08d06670d00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/08cc190d-5f2e-4b7f-b594-61b540572900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 13836     ✗ 0    
     data_received..................: 407 MB  6.6 MB/s
     data_sent......................: 5.5 MB  89 kB/s
     http_req_blocked...............: avg=1.38ms  min=1.73µs   med=4.16µs   max=73.51ms  p(90)=6.33µs   p(95)=7.34ms  
     http_req_connecting............: avg=1.34ms  min=0s       med=0s       max=73.48ms  p(90)=0s       p(95)=5.29ms  
     http_req_duration..............: avg=3.91s   min=11.04ms  med=3.94s    max=8.5s     p(90)=4.58s    p(95)=5.19s   
       { expected_response:true }...: avg=3.91s   min=11.04ms  med=3.94s    max=8.5s     p(90)=4.58s    p(95)=5.19s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 4632 
     http_req_receiving.............: avg=6.51ms  min=42.24µs  med=108.72µs max=796.59ms p(90)=254.92µs p(95)=547.68µs
     http_req_sending...............: avg=311.7µs min=9.22µs   med=23.7µs   max=22.59ms  p(90)=45.69µs  p(95)=564.77µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.91s   min=10.94ms  med=3.94s    max=8.5s     p(90)=4.58s    p(95)=5.19s   
     http_reqs......................: 4632    74.757361/s
     iteration_duration.............: avg=3.95s   min=482.43ms med=3.95s    max=8.51s    p(90)=4.6s     p(95)=5.2s    
     iterations.....................: 4612    74.434574/s
     vus............................: 236     min=236     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/ffba51c3-d8f9-4437-2e40-04c5b31fbb00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/254fb8ac-c7e5-49bd-537e-64a9a0cfaa00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f036ebd6-987d-4dc6-0c24-a95629303100/public" alt="HTTP Overview" />


  </details>