## Overview for: `federation/ramping-vus`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was trying to reach 2000 concurrent VUs over 60s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1ccb1826-0748-47e2-ab18-564ebb40a400/public" alt="Comparison" />


| Gateway          | duration(p95)⬇️ |  RPS  |        Requests         |                       Durations                        | Notes                                                                       |
| :--------------- | :-------------: | :---: | :---------------------: | :----------------------------------------------------: | :-------------------------------------------------------------------------- |
| cosmo            |     6431ms      |  171  |  12304 total, 0 failed  |  avg: 2742ms, p95: 6431ms, max: 14137ms, med: 2177ms   | ✅                                                                           |
| apollo-router    |     6823ms      |  162  | 11460 total, 790 failed |  avg: 2948ms, p95: 6823ms, max: 15587ms, med: 2767ms   | ❌ 790 failed requests, 790 non-200 responses, 790 unexpected GraphQL errors |
| grafbase         |     11738ms     |  155  |  10907 total, 0 failed  |  avg: 3728ms, p95: 11739ms, max: 19528ms, med: 2329ms  | ✅                                                                           |
| hive-gateway-bun |     29054ms     |  88   |  7293 total, 0 failed   | avg: 11810ms, p95: 29054ms, max: 39625ms, med: 10479ms | ✅                                                                           |
| mercurius        |     42189ms     |  52   |  4870 total, 0 failed   | avg: 22296ms, p95: 42190ms, max: 43265ms, med: 21022ms | ✅                                                                           |
| hive-gateway     |     53846ms     |  79   |  7159 total, 0 failed   | avg: 13421ms, p95: 53847ms, max: 58939ms, med: 3535ms  | ✅                                                                           |
| apollo-server    |     59999ms     |  80   | 7423 total, 544 failed  | avg: 12559ms, p95: 60000ms, max: 60194ms, med: 2296ms  | ❌ 544 failed requests, 544 non-200 responses, 544 unexpected GraphQL errors |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 36852      ✗ 0     
     data_received..................: 1.1 GB  15 MB/s
     data_sent......................: 15 MB   204 kB/s
     http_req_blocked...............: avg=304.96ms min=1.69µs  med=4.04µs  max=10.53s p(90)=1.1s     p(95)=2.61s   
     http_req_connecting............: avg=301.04ms min=0s      med=0s      max=10.53s p(90)=1.09s    p(95)=2.59s   
     http_req_duration..............: avg=2.74s    min=3.29ms  med=2.17s   max=14.13s p(90)=5.78s    p(95)=6.43s   
       { expected_response:true }...: avg=2.74s    min=3.29ms  med=2.17s   max=14.13s p(90)=5.78s    p(95)=6.43s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 12304 
     http_req_receiving.............: avg=375.4ms  min=31.55µs med=90.65µs max=10.56s p(90)=1.13s    p(95)=3.9s    
     http_req_sending...............: avg=154.52ms min=7.58µs  med=20.96µs max=7.87s  p(90)=317.32ms p(95)=763.91ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=2.21s    min=3.12ms  med=1.64s   max=10.55s p(90)=5.21s    p(95)=5.77s   
     http_reqs......................: 12304   171.935282/s
     iteration_duration.............: avg=6.09s    min=21.71ms med=5.14s   max=28.37s p(90)=12.51s   p(95)=15.19s  
     iterations.....................: 12284   171.655803/s
     vus............................: 379     min=60       max=2000
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/aa0b44fc-8dbc-4099-e257-eba19045f800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e08c9272-3bb8-4a6d-d2e4-677ac0033100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/de2c2c29-b8a7-4166-1dd9-586339eeb500/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  93% — ✓ 10650 / ✗ 790
     ✗ no graphql errors
      ↳  93% — ✓ 10650 / ✗ 790
     ✓ valid response structure

     █ setup

     checks.........................: 95.28% ✓ 31950      ✗ 1580  
     data_received..................: 936 MB 13 MB/s
     data_sent......................: 14 MB  193 kB/s
     http_req_blocked...............: avg=644.39ms min=1.7µs   med=4.39µs  max=12.04s p(90)=3.14s    p(95)=3.89s 
     http_req_connecting............: avg=639.29ms min=0s      med=0s      max=12.04s p(90)=3.13s    p(95)=3.86s 
     http_req_duration..............: avg=2.94s    min=6.87ms  med=2.76s   max=15.58s p(90)=5.44s    p(95)=6.82s 
       { expected_response:true }...: avg=2.9s     min=6.87ms  med=2.72s   max=15.58s p(90)=5.29s    p(95)=6.84s 
     http_req_failed................: 6.89%  ✓ 790        ✗ 10670 
     http_req_receiving.............: avg=344.27ms min=0s      med=93.17µs max=11.12s p(90)=1.27s    p(95)=2.42s 
     http_req_sending...............: avg=192.54ms min=8.35µs  med=23.74µs max=9.58s  p(90)=656.31ms p(95)=1.04s 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=2.41s    min=6.74ms  med=2.14s   max=12.91s p(90)=4.56s    p(95)=5.19s 
     http_reqs......................: 11460  162.645424/s
     iteration_duration.............: avg=6.34s    min=26.78ms med=5.65s   max=27.13s p(90)=12.61s   p(95)=14.73s
     iterations.....................: 11440  162.361575/s
     vus............................: 387    min=74       max=1984
     vus_max........................: 2000   min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e45c06f1-1f62-4811-d451-153d6e250b00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/476d0f92-1cf9-4ab9-e041-8eee0dab0000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/258554b2-ffee-4924-21ad-3dd4583efa00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 32661      ✗ 0     
     data_received..................: 959 MB  14 MB/s
     data_sent......................: 13 MB   185 kB/s
     http_req_blocked...............: avg=296.72ms min=1.76µs  med=4.1µs   max=10.84s p(90)=777.22ms p(95)=2.05s   
     http_req_connecting............: avg=293.04ms min=0s      med=0s      max=10.84s p(90)=759.78ms p(95)=2.05s   
     http_req_duration..............: avg=3.72s    min=3.21ms  med=2.32s   max=19.52s p(90)=9.71s    p(95)=11.73s  
       { expected_response:true }...: avg=3.72s    min=3.21ms  med=2.32s   max=19.52s p(90)=9.71s    p(95)=11.73s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 10907 
     http_req_receiving.............: avg=270.67ms min=32.47µs med=86.3µs  max=10.31s p(90)=683.15ms p(95)=1.94s   
     http_req_sending...............: avg=94.56ms  min=7.6µs   med=22.18µs max=7.99s  p(90)=192.5ms  p(95)=551.25ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.36s    min=3.13ms  med=1.95s   max=19.24s p(90)=9.49s    p(95)=11.44s  
     http_reqs......................: 10907   155.576551/s
     iteration_duration.............: avg=6.52s    min=13.13ms med=5.28s   max=30.22s p(90)=14.22s   p(95)=17.36s  
     iterations.....................: 10887   155.291273/s
     vus............................: 45      min=45       max=1988
     vus_max........................: 2000    min=2000     max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/291e76e5-03d7-4600-4551-143f3df68900/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/54a7c241-2584-4e22-4fe0-12b973c1e400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/90e0b7f4-7752-412a-63d3-398e8e85c700/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 21819     ✗ 0     
     data_received..................: 640 MB  7.8 MB/s
     data_sent......................: 8.7 MB  105 kB/s
     http_req_blocked...............: avg=12.06ms  min=1.81µs   med=4.74µs   max=611.45ms p(90)=14.55ms p(95)=77.51ms 
     http_req_connecting............: avg=11.88ms  min=0s       med=0s       max=611.34ms p(90)=14.15ms p(95)=76.08ms 
     http_req_duration..............: avg=11.81s   min=16.83ms  med=10.47s   max=39.62s   p(90)=25.43s  p(95)=29.05s  
       { expected_response:true }...: avg=11.81s   min=16.83ms  med=10.47s   max=39.62s   p(90)=25.43s  p(95)=29.05s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 7293  
     http_req_receiving.............: avg=159.02ms min=41.74µs  med=156.71µs max=7.5s     p(90)=17.99ms p(95)=971.42ms
     http_req_sending...............: avg=10.02ms  min=9.38µs   med=27.22µs  max=2.24s    p(90)=5.53ms  p(95)=28.44ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=11.64s   min=16.72ms  med=10.41s   max=39.62s   p(90)=25.24s  p(95)=29.03s  
     http_reqs......................: 7293    88.424772/s
     iteration_duration.............: avg=12.07s   min=165.82ms med=10.59s   max=40.84s   p(90)=26.07s  p(95)=29.47s  
     iterations.....................: 7273    88.18228/s
     vus............................: 93      min=0       max=1999
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7e32dfd3-851f-40ba-4df4-3eac29cfa200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c0739ac0-3b5c-4db6-7532-b135e7478000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bf777479-3a1c-49de-324d-098c58da1000/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14394     ✗ 0     
     data_received..................: 428 MB  4.6 MB/s
     data_sent......................: 5.9 MB  64 kB/s
     http_req_blocked...............: avg=316.03µs min=1.91µs   med=5.26µs   max=36.08ms p(90)=616.37µs p(95)=1ms     
     http_req_connecting............: avg=278.85µs min=0s       med=0s       max=35.92ms p(90)=533.25µs p(95)=866.61µs
     http_req_duration..............: avg=22.29s   min=12.2ms   med=21.02s   max=43.26s  p(90)=41.43s   p(95)=42.18s  
       { expected_response:true }...: avg=22.29s   min=12.2ms   med=21.02s   max=43.26s  p(90)=41.43s   p(95)=42.18s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 4870  
     http_req_receiving.............: avg=4.29ms   min=39.32µs  med=112.28µs max=1.53s   p(90)=373.32µs p(95)=872.93µs
     http_req_sending...............: avg=77.07µs  min=9.23µs   med=33.23µs  max=18.52ms p(90)=81.89µs  p(95)=139.76µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=22.29s   min=12.08ms  med=21.02s   max=43.26s  p(90)=41.38s   p(95)=42.18s  
     http_reqs......................: 4870    52.892721/s
     iteration_duration.............: avg=22.21s   min=153.24ms med=20.02s   max=43.37s  p(90)=41.62s   p(95)=42.39s  
     iterations.....................: 4745    51.535105/s
     vus............................: 72      min=56      max=1999
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6031a022-65fa-4952-4ce5-e8604edc7100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9b6a6ae4-9a3b-465c-5bd9-18c006598c00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7f0136b3-575a-4367-7596-528a0e6e6900/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 21417     ✗ 0     
     data_received..................: 629 MB  7.0 MB/s
     data_sent......................: 8.5 MB  94 kB/s
     http_req_blocked...............: avg=2.6ms  min=2.17µs   med=4.67µs   max=190.95ms p(90)=1.91ms   p(95)=12.39ms
     http_req_connecting............: avg=2.54ms min=0s       med=0s       max=190.75ms p(90)=1.65ms   p(95)=11.98ms
     http_req_duration..............: avg=13.42s min=15.4ms   med=3.53s    max=58.93s   p(90)=47.47s   p(95)=53.84s 
       { expected_response:true }...: avg=13.42s min=15.4ms   med=3.53s    max=58.93s   p(90)=47.47s   p(95)=53.84s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 7159  
     http_req_receiving.............: avg=1.04ms min=41.47µs  med=113.94µs max=1.01s    p(90)=849.72µs p(95)=2.72ms 
     http_req_sending...............: avg=1.08ms min=9.26µs   med=28.51µs  max=120.12ms p(90)=168.62µs p(95)=2.87ms 
     http_req_tls_handshaking.......: avg=0s     min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=13.41s min=15.28ms  med=3.53s    max=58.93s   p(90)=47.44s   p(95)=53.84s 
     http_reqs......................: 7159    79.350407/s
     iteration_duration.............: avg=13.49s min=110.38ms med=3.58s    max=58.99s   p(90)=47.59s   p(95)=53.93s 
     iterations.....................: 7139    79.128726/s
     vus............................: 53      min=53      max=2000
     vus_max........................: 2000    min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e035f8a7-757c-4487-b60b-d6f75e340800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/02c62071-8989-45bc-5061-85c7ee1c9800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f64c7259-2218-4d69-982d-2f1ca4a91600/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✗ response code was 200
      ↳  92% — ✓ 6859 / ✗ 544
     ✗ no graphql errors
      ↳  92% — ✓ 6859 / ✗ 544
     ✓ valid response structure

     █ setup

     checks.........................: 94.97% ✓ 20577     ✗ 1088  
     data_received..................: 605 MB 6.5 MB/s
     data_sent......................: 8.9 MB 96 kB/s
     http_req_blocked...............: avg=543.77µs min=1.48µs  med=4.24µs  max=100.96ms p(90)=449.77µs p(95)=845.45µs
     http_req_connecting............: avg=515.98µs min=0s      med=0s      max=100.9ms  p(90)=365.13µs p(95)=695.19µs
     http_req_duration..............: avg=12.55s   min=11.81ms med=2.29s   max=1m0s     p(90)=56.99s   p(95)=59.99s  
       { expected_response:true }...: avg=8.8s     min=11.81ms med=2.2s    max=59.99s   p(90)=37.38s   p(95)=48.84s  
     http_req_failed................: 7.32%  ✓ 544       ✗ 6879  
     http_req_receiving.............: avg=277.21µs min=0s      med=113.9µs max=271.71ms p(90)=232.29µs p(95)=363.22µs
     http_req_sending...............: avg=253.79µs min=9.35µs  med=23.67µs max=96.9ms   p(90)=74.33µs  p(95)=152.95µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=12.55s   min=11.67ms med=2.29s   max=1m0s     p(90)=56.99s   p(95)=59.99s  
     http_reqs......................: 7423   80.049421/s
     iteration_duration.............: avg=12.6s    min=63.69ms med=2.31s   max=1m0s     p(90)=57.03s   p(95)=1m0s    
     iterations.....................: 7403   79.833741/s
     vus............................: 74     min=61      max=2000
     vus_max........................: 2000   min=2000    max=2000
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/bf7abb09-c4af-4876-c34a-06d02536f400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/020bf116-f833-4a28-48bf-5914e4df6400/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d101be40-cb70-4212-a17e-233b35c55000/public" alt="HTTP Overview" />


  </details>