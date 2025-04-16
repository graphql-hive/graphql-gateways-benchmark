## Overview for: `federation/constant-vus-over-time`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 30s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a2a6e16c-60e6-4636-88ae-41617c868300/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests       |         Duration          | Notes |
| :--------------- | :----: | :------------------: | :-----------------------: | :---- |
| cosmo            |  186   | 5777 total, 0 failed |  avg: 853ms, p95: 2347ms  | ✅     |
| grafbase         |  167   | 5131 total, 0 failed |  avg: 875ms, p95: 2340ms  | ✅     |
| apollo-router    |  166   | 5139 total, 0 failed | avg: 1025ms, p95: 2663ms  | ✅     |
| apollo-server    |   84   | 2847 total, 0 failed | avg: 3314ms, p95: 28521ms | ✅     |
| hive-gateway-bun |   82   | 2742 total, 0 failed | avg: 3366ms, p95: 5509ms  | ✅     |
| mercurius        |   76   | 2433 total, 0 failed | avg: 3783ms, p95: 5698ms  | ✅     |
| hive-gateway     |   74   | 2524 total, 0 failed | avg: 3735ms, p95: 24391ms | ✅     |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17271      ✗ 0    
     data_received..................: 507 MB  16 MB/s
     data_sent......................: 6.9 MB  222 kB/s
     http_req_blocked...............: avg=1.68ms   min=1.5µs   med=3.19µs   max=1.87s p(90)=5.71µs   p(95)=1.05ms  
     http_req_connecting............: avg=1.47ms   min=0s      med=0s       max=1.87s p(90)=0s       p(95)=591.17µs
     http_req_duration..............: avg=853.11ms min=3.33ms  med=680.51ms max=6.63s p(90)=1.81s    p(95)=2.34s   
       { expected_response:true }...: avg=853.11ms min=3.33ms  med=680.51ms max=6.63s p(90)=1.81s    p(95)=2.34s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 5777 
     http_req_receiving.............: avg=307.93ms min=33.91µs med=91.58µs  max=4.19s p(90)=1.19s    p(95)=1.74s   
     http_req_sending...............: avg=21.62ms  min=7.5µs   med=14.2µs   max=3.33s p(90)=247.94µs p(95)=25.19ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=523.55ms min=3.21ms  med=515.24ms max=2.09s p(90)=939.86ms p(95)=1.11s   
     http_reqs......................: 5777    186.937574/s
     iteration_duration.............: avg=1.56s    min=22.47ms med=1.31s    max=9.89s p(90)=3.25s    p(95)=3.86s   
     iterations.....................: 5757    186.290396/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/810ca8dc-17b2-4e70-a20b-8eb772e0aa00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3e7f24bf-6816-4e38-2461-04c1d71db300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/9853d536-b431-4aea-fdf7-22a8337fa300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 15333      ✗ 0    
     data_received..................: 451 MB  15 MB/s
     data_sent......................: 6.1 MB  198 kB/s
     http_req_blocked...............: avg=1.73ms   min=1.6µs   med=3.68µs   max=927.8ms  p(90)=6.59µs   p(95)=737.51µs
     http_req_connecting............: avg=1.33ms   min=0s      med=0s       max=927.72ms p(90)=0s       p(95)=409.18µs
     http_req_duration..............: avg=875.2ms  min=3.15ms  med=705.43ms max=5.93s    p(90)=1.84s    p(95)=2.34s   
       { expected_response:true }...: avg=875.2ms  min=3.15ms  med=705.43ms max=5.93s    p(90)=1.84s    p(95)=2.34s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 5131 
     http_req_receiving.............: avg=291.45ms min=32.49µs med=86.42µs  max=5.19s    p(90)=1.18s    p(95)=1.91s   
     http_req_sending...............: avg=18.58ms  min=8.21µs  med=17.25µs  max=2.72s    p(90)=199.71µs p(95)=3.08ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=565.16ms min=3.08ms  med=505.64ms max=3.28s    p(90)=1.04s    p(95)=1.33s   
     http_reqs......................: 5131    167.143568/s
     iteration_duration.............: avg=1.75s    min=25.18ms med=1.5s     max=9.44s    p(90)=3.49s    p(95)=4.37s   
     iterations.....................: 5111    166.492063/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/7d1b30bf-7173-4bd0-8aab-daeecd74f200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/eb75f5fd-ce98-4182-51aa-1924c67b3d00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1f53c28c-f1c0-48f5-9d7d-c486af619400/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 15357      ✗ 0    
     data_received..................: 451 MB  15 MB/s
     data_sent......................: 6.1 MB  197 kB/s
     http_req_blocked...............: avg=1.97ms   min=1.54µs  med=3.19µs   max=1.36s p(90)=5.78µs   p(95)=2.71ms 
     http_req_connecting............: avg=1.7ms    min=0s      med=0s       max=1.36s p(90)=0s       p(95)=2.34ms 
     http_req_duration..............: avg=1.02s    min=6.43ms  med=775.99ms max=5.32s p(90)=2.17s    p(95)=2.66s  
       { expected_response:true }...: avg=1.02s    min=6.43ms  med=775.99ms max=5.32s p(90)=2.17s    p(95)=2.66s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 5139 
     http_req_receiving.............: avg=346.41ms min=36.05µs med=84.43µs  max=5.12s p(90)=1.57s    p(95)=1.94s  
     http_req_sending...............: avg=21.06ms  min=7.59µs  med=14.27µs  max=3.39s p(90)=399.14µs p(95)=16.06ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=657.67ms min=6.36ms  med=611.02ms max=2.21s p(90)=1.15s    p(95)=1.39s  
     http_reqs......................: 5139    166.074327/s
     iteration_duration.............: avg=1.74s    min=39.42ms med=1.44s    max=9.2s  p(90)=3.37s    p(95)=4.23s  
     iterations.....................: 5119    165.427997/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2a46b509-960d-4272-01bd-ba779099c400/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/368a80d9-8fd0-48b3-73e3-daff7ac85300/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8e62e4be-9091-49a7-1917-d7e5f0e25300/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 8481      ✗ 0    
     data_received..................: 250 MB  7.4 MB/s
     data_sent......................: 3.4 MB  100 kB/s
     http_req_blocked...............: avg=1.55ms   min=1.57µs   med=3.31µs  max=45.77ms  p(90)=121.88µs p(95)=16.99ms
     http_req_connecting............: avg=1.48ms   min=0s       med=0s      max=40.72ms  p(90)=83.82µs  p(95)=16.59ms
     http_req_duration..............: avg=3.31s    min=11.21ms  med=1.39s   max=33.25s   p(90)=2.27s    p(95)=28.52s 
       { expected_response:true }...: avg=3.31s    min=11.21ms  med=1.39s   max=33.25s   p(90)=2.27s    p(95)=28.52s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 2847 
     http_req_receiving.............: avg=528.75µs min=44.75µs  med=102.9µs max=271.61ms p(90)=190.39µs p(95)=308µs  
     http_req_sending...............: avg=510.06µs min=8.94µs   med=17.62µs max=23.4ms   p(90)=117.61µs p(95)=4.8ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=3.31s    min=11.12ms  med=1.39s   max=33.25s   p(90)=2.27s    p(95)=28.51s 
     http_reqs......................: 2847    84.476994/s
     iteration_duration.............: avg=3.35s    min=197.74ms med=1.4s    max=33.3s    p(90)=2.3s     p(95)=28.92s 
     iterations.....................: 2827    83.883548/s
     vus............................: 63      min=63      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/1da6f46d-173c-4ee9-c1c7-9a493cc6ae00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/24e8e0c2-0241-4cfb-9c6a-b6ba922d3c00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e74ccbfa-fd7b-48d0-a9d9-678eba081100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 8166      ✗ 0    
     data_received..................: 241 MB  7.3 MB/s
     data_sent......................: 3.3 MB  98 kB/s
     http_req_blocked...............: avg=847.6µs min=1.41µs  med=3.56µs   max=30.35ms p(90)=411.56µs p(95)=7.23ms
     http_req_connecting............: avg=584.8µs min=0s      med=0s       max=15.83ms p(90)=127.98µs p(95)=5.47ms
     http_req_duration..............: avg=3.36s   min=16.71ms med=3s       max=8.21s   p(90)=5.08s    p(95)=5.5s  
       { expected_response:true }...: avg=3.36s   min=16.71ms med=3s       max=8.21s   p(90)=5.08s    p(95)=5.5s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 2742 
     http_req_receiving.............: avg=53.5ms  min=41.36µs med=216.79µs max=1.48s   p(90)=6.17ms   p(95)=412ms 
     http_req_sending...............: avg=1.29ms  min=8.45µs  med=19.29µs  max=230.9ms p(90)=314.61µs p(95)=6.76ms
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s       max=0s      p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=3.31s   min=16.46ms med=2.97s    max=8.21s   p(90)=5.04s    p(95)=5.46s 
     http_reqs......................: 2742    82.634057/s
     iteration_duration.............: avg=3.45s   min=67.42ms med=3.04s    max=8.22s   p(90)=5.25s    p(95)=5.69s 
     iterations.....................: 2722    82.031328/s
     vus............................: 37      min=37      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f42a2ae8-8337-4ca5-92bb-67384aa93100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f571f6ca-70e2-450c-60e4-09a276c4f100/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/01780415-df53-42f5-da97-8d0c48a69b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 7239      ✗ 0    
     data_received..................: 214 MB  6.7 MB/s
     data_sent......................: 2.9 MB  91 kB/s
     http_req_blocked...............: avg=694µs   min=1.59µs   med=3.63µs  max=12.83ms  p(90)=2.33ms   p(95)=6.53ms  
     http_req_connecting............: avg=638µs   min=0s       med=0s      max=12.81ms  p(90)=320.97µs p(95)=6.33ms  
     http_req_duration..............: avg=3.78s   min=10.69ms  med=3.82s   max=8.22s    p(90)=4.6s     p(95)=5.69s   
       { expected_response:true }...: avg=3.78s   min=10.69ms  med=3.82s   max=8.22s    p(90)=4.6s     p(95)=5.69s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 2433 
     http_req_receiving.............: avg=10.16ms min=40.96µs  med=99.78µs max=680.91ms p(90)=323.04µs p(95)=1.1ms   
     http_req_sending...............: avg=95.67µs min=9.53µs   med=19.95µs max=17.33ms  p(90)=137.15µs p(95)=530.24µs
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.77s   min=10.6ms   med=3.82s   max=8.22s    p(90)=4.6s     p(95)=5.69s   
     http_reqs......................: 2433    76.204803/s
     iteration_duration.............: avg=3.83s   min=203.27ms med=3.84s   max=8.24s    p(90)=4.62s    p(95)=5.73s   
     iterations.....................: 2413    75.578376/s
     vus............................: 197     min=197     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/018529fb-d578-4657-93f6-e46757002f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/063f906d-9fbe-4bad-6f27-3498911b1a00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/892ac8b6-f653-455e-f96a-4a72ac0ae200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 7512      ✗ 0    
     data_received..................: 222 MB  6.6 MB/s
     data_sent......................: 3.0 MB  89 kB/s
     http_req_blocked...............: avg=757.48µs min=1.5µs    med=3.79µs   max=22.53ms p(90)=1.17ms   p(95)=6.93ms
     http_req_connecting............: avg=730.58µs min=0s       med=0s       max=22.5ms  p(90)=993.09µs p(95)=6.7ms 
     http_req_duration..............: avg=3.73s    min=16.92ms  med=1.92s    max=33.11s  p(90)=3.82s    p(95)=24.39s
       { expected_response:true }...: avg=3.73s    min=16.92ms  med=1.92s    max=33.11s  p(90)=3.82s    p(95)=24.39s
     http_req_failed................: 0.00%   ✓ 0         ✗ 2524 
     http_req_receiving.............: avg=398.38µs min=41.39µs  med=113.65µs max=98.14ms p(90)=420.31µs p(95)=1.07ms
     http_req_sending...............: avg=258.78µs min=7.85µs   med=22.15µs  max=21.29ms p(90)=196.36µs p(95)=1.57ms
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=3.73s    min=16.82ms  med=1.92s    max=33.11s  p(90)=3.82s    p(95)=24.38s
     http_reqs......................: 2524    74.989732/s
     iteration_duration.............: avg=3.78s    min=187.96ms med=1.93s    max=33.12s  p(90)=3.85s    p(95)=24.81s
     iterations.....................: 2504    74.395519/s
     vus............................: 58      min=58      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5dc4e485-9423-4054-e5cb-0b081bf02800/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/6dbca8a0-e801-4913-4b00-d3effac05700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/975e2fa7-3dc0-4d87-d225-ec41c1839c00/public" alt="HTTP Overview" />


  </details>