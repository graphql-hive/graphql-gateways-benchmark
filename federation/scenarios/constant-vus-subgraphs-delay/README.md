## Overview for: `federation/constant-vus-subgraphs-delay`


This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.


This scenario was running 300 VUs over 30s


### Comparison


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/37adc421-3b91-48c3-221b-33e106bd7a00/public" alt="Comparison" />


| Gateway          | RPS ⬇️ |       Requests       |         Duration          | Notes |
| :--------------- | :----: | :------------------: | :-----------------------: | :---- |
| cosmo            |  186   | 5783 total, 0 failed |  avg: 912ms, p95: 2303ms  | ✅     |
| grafbase         |  167   | 5169 total, 0 failed |  avg: 904ms, p95: 3051ms  | ✅     |
| apollo-router    |  161   | 5009 total, 0 failed |  avg: 983ms, p95: 2403ms  | ✅     |
| apollo-server    |   83   | 2801 total, 0 failed | avg: 3387ms, p95: 29923ms | ✅     |
| hive-gateway-bun |   81   | 2717 total, 0 failed | avg: 3472ms, p95: 5924ms  | ✅     |
| mercurius        |   78   | 2489 total, 0 failed | avg: 3691ms, p95: 5627ms  | ✅     |
| hive-gateway     |   75   | 2550 total, 0 failed | avg: 3693ms, p95: 24076ms | ✅     |



<details>
  <summary>Summary for: `cosmo`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 17289      ✗ 0    
     data_received..................: 508 MB  16 MB/s
     data_sent......................: 6.9 MB  222 kB/s
     http_req_blocked...............: avg=1.04ms   min=1.61µs  med=3.08µs   max=851.92ms p(90)=5.46µs  p(95)=579.92µs
     http_req_connecting............: avg=770.25µs min=0s      med=0s       max=851.86ms p(90)=0s      p(95)=278.06µs
     http_req_duration..............: avg=912.14ms min=3.23ms  med=749.38ms max=5.85s    p(90)=1.75s   p(95)=2.3s    
       { expected_response:true }...: avg=912.14ms min=3.23ms  med=749.38ms max=5.85s    p(90)=1.75s   p(95)=2.3s    
     http_req_failed................: 0.00%   ✓ 0          ✗ 5783 
     http_req_receiving.............: avg=250.13ms min=33.02µs med=81.1µs   max=5.18s    p(90)=1.02s   p(95)=1.57s   
     http_req_sending...............: avg=21.98ms  min=8.13µs  med=14.42µs  max=2.36s    p(90)=361.4µs p(95)=27.05ms 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=640.03ms min=3.15ms  med=622.58ms max=2.88s    p(90)=1.01s   p(95)=1.2s    
     http_reqs......................: 5783    186.979519/s
     iteration_duration.............: avg=1.58s    min=36.54ms med=1.33s    max=7.3s     p(90)=3.07s   p(95)=3.72s   
     iterations.....................: 5763    186.332867/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/f5ba8952-2339-4e51-3c43-714f3f621200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/80494fde-dc54-4343-3ff2-7bc97f676900/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/84327b5c-0cd9-43e5-e2f7-df74ba2bcd00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `grafbase`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 15447      ✗ 0    
     data_received..................: 454 MB  15 MB/s
     data_sent......................: 6.1 MB  199 kB/s
     http_req_blocked...............: avg=1.29ms   min=1.38µs  med=3.48µs   max=1.73s  p(90)=6.51µs   p(95)=487.4µs 
     http_req_connecting............: avg=1.2ms    min=0s      med=0s       max=1.73s  p(90)=0s       p(95)=364.78µs
     http_req_duration..............: avg=903.68ms min=3.16ms  med=472ms    max=7.25s  p(90)=2.44s    p(95)=3.05s   
       { expected_response:true }...: avg=903.68ms min=3.16ms  med=472ms    max=7.25s  p(90)=2.44s    p(95)=3.05s   
     http_req_failed................: 0.00%   ✓ 0          ✗ 5169 
     http_req_receiving.............: avg=488.07ms min=32.74µs med=105.2µs  max=6.72s  p(90)=1.96s    p(95)=2.5s    
     http_req_sending...............: avg=16.89ms  min=8.13µs  med=15.78µs  max=2.66s  p(90)=352.06µs p(95)=14.6ms  
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=398.71ms min=3.05ms  med=309.99ms max=1.63s  p(90)=873.99ms p(95)=1.17s   
     http_reqs......................: 5169    167.923371/s
     iteration_duration.............: avg=1.76s    min=17.99ms med=1.19s    max=11.06s p(90)=4.12s    p(95)=5.03s   
     iterations.....................: 5149    167.273639/s
     vus............................: 300     min=300      max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/2310f48f-a02e-41d1-86b0-a879585b1100/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d31a77e7-ee66-4eda-de8f-63b1cb45a500/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8db54563-f78e-4715-e949-b8e39c18e100/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-router`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 14967      ✗ 0    
     data_received..................: 440 MB  14 MB/s
     data_sent......................: 5.9 MB  192 kB/s
     http_req_blocked...............: avg=2.1ms    min=1.39µs  med=3.35µs   max=1.93s p(90)=5.97µs  p(95)=9.73ms
     http_req_connecting............: avg=1.69ms   min=0s      med=0s       max=1.21s p(90)=0s      p(95)=7.92ms
     http_req_duration..............: avg=982.81ms min=6.5ms   med=835.01ms max=5.94s p(90)=1.91s   p(95)=2.4s  
       { expected_response:true }...: avg=982.81ms min=6.5ms   med=835.01ms max=5.94s p(90)=1.91s   p(95)=2.4s  
     http_req_failed................: 0.00%   ✓ 0          ✗ 5009 
     http_req_receiving.............: avg=280.97ms min=31.19µs med=86.19µs  max=4.99s p(90)=1.17s   p(95)=1.78s 
     http_req_sending...............: avg=14.13ms  min=8.2µs   med=14.81µs  max=1.97s p(90)=315.3µs p(95)=8.54ms
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s    p(90)=0s      p(95)=0s    
     http_req_waiting...............: avg=687.71ms min=6.44ms  med=645.89ms max=2.25s p(90)=1.2s    p(95)=1.3s  
     http_reqs......................: 5009    161.420582/s
     iteration_duration.............: avg=1.81s    min=35.07ms med=1.56s    max=7.1s  p(90)=3.43s   p(95)=4.21s 
     iterations.....................: 4989    160.77606/s
     vus............................: 29      min=29       max=300
     vus_max........................: 300     min=300      max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/3c606ba7-4613-41cf-0cc4-c2ebc9ed0c00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/60023e9b-b4c9-4930-e8b4-2fd1636ddf00/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/4f1a7453-2304-4b45-136c-1f4741a18a00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `apollo-server`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 8343      ✗ 0    
     data_received..................: 246 MB  7.3 MB/s
     data_sent......................: 3.3 MB  99 kB/s
     http_req_blocked...............: avg=246.39µs min=1.72µs   med=3.48µs   max=14.14ms p(90)=242.1µs  p(95)=1.86ms  
     http_req_connecting............: avg=222.22µs min=0s       med=0s       max=8.22ms  p(90)=143.37µs p(95)=1.75ms  
     http_req_duration..............: avg=3.38s    min=11.2ms   med=1.35s    max=33.22s  p(90)=2.63s    p(95)=29.92s  
       { expected_response:true }...: avg=3.38s    min=11.2ms   med=1.35s    max=33.22s  p(90)=2.63s    p(95)=29.92s  
     http_req_failed................: 0.00%   ✓ 0         ✗ 2801 
     http_req_receiving.............: avg=191.76µs min=46.12µs  med=108.39µs max=40.53ms p(90)=202.6µs  p(95)=318.76µs
     http_req_sending...............: avg=128.73µs min=9.13µs   med=17.32µs  max=16.43ms p(90)=159.85µs p(95)=1.01ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.38s    min=11.11ms  med=1.35s    max=33.22s  p(90)=2.63s    p(95)=29.92s  
     http_reqs......................: 2801    83.301225/s
     iteration_duration.............: avg=3.42s    min=195.35ms med=1.37s    max=33.23s  p(90)=2.65s    p(95)=30.71s  
     iterations.....................: 2781    82.706428/s
     vus............................: 58      min=58      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/5955981f-a570-4005-ec84-7d400c6e4f00/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/add10a4a-d8e6-492f-9811-f27026550000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/d4186b74-c7e4-497f-ca5b-b42147bed200/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway-bun`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 8091      ✗ 0    
     data_received..................: 239 MB  7.1 MB/s
     data_sent......................: 3.2 MB  96 kB/s
     http_req_blocked...............: avg=728.61µs min=1.8µs    med=3.45µs   max=22.04ms  p(90)=431.13µs p(95)=5.79ms  
     http_req_connecting............: avg=711.37µs min=0s       med=0s       max=22ms     p(90)=303.12µs p(95)=5.61ms  
     http_req_duration..............: avg=3.47s    min=17.26ms  med=3.17s    max=8.86s    p(90)=5.07s    p(95)=5.92s   
       { expected_response:true }...: avg=3.47s    min=17.26ms  med=3.17s    max=8.86s    p(90)=5.07s    p(95)=5.92s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 2717 
     http_req_receiving.............: avg=57.6ms   min=39.44µs  med=181.96µs max=2.34s    p(90)=5.88ms   p(95)=391.78ms
     http_req_sending...............: avg=562.24µs min=8.57µs   med=18.48µs  max=127.12ms p(90)=306.68µs p(95)=1.54ms  
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.41s    min=17.1ms   med=3.13s    max=8.86s    p(90)=5.05s    p(95)=5.92s   
     http_reqs......................: 2717    81.010262/s
     iteration_duration.............: avg=3.55s    min=125.52ms med=3.23s    max=8.93s    p(90)=5.14s    p(95)=5.97s   
     iterations.....................: 2697    80.413941/s
     vus............................: 71      min=71      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/fb0c75bb-6491-465f-5ecd-c2f229df7000/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/b3c91861-75f4-45c4-7abe-9db39af2a000/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/a077b370-91ab-4c9c-d7e0-a62802605b00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `mercurius`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 7407      ✗ 0    
     data_received..................: 219 MB  6.8 MB/s
     data_sent......................: 3.0 MB  93 kB/s
     http_req_blocked...............: avg=335.43µs min=1.62µs   med=3.44µs  max=16.63ms  p(90)=300.41µs p(95)=3.26ms  
     http_req_connecting............: avg=304.53µs min=0s       med=0s      max=16.16ms  p(90)=222.69µs p(95)=3.13ms  
     http_req_duration..............: avg=3.69s    min=10.4ms   med=3.71s   max=8.4s     p(90)=4.68s    p(95)=5.62s   
       { expected_response:true }...: avg=3.69s    min=10.4ms   med=3.71s   max=8.4s     p(90)=4.68s    p(95)=5.62s   
     http_req_failed................: 0.00%   ✓ 0         ✗ 2489 
     http_req_receiving.............: avg=3.17ms   min=38.37µs  med=96.94µs max=344.51ms p(90)=264.99µs p(95)=1ms     
     http_req_sending...............: avg=124.58µs min=8.52µs   med=18.99µs max=13.69ms  p(90)=107.78µs p(95)=720.07µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.68s    min=10.24ms  med=3.71s   max=8.4s     p(90)=4.68s    p(95)=5.62s   
     http_reqs......................: 2489    78.009604/s
     iteration_duration.............: avg=3.74s    min=292.99ms med=3.72s   max=8.41s    p(90)=4.7s     p(95)=5.67s   
     iterations.....................: 2469    77.382769/s
     vus............................: 195     min=195     max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/c65d1f79-f1ea-4648-f0b9-170de8be4300/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/56ba8dbb-a31b-4f1f-e9ea-1bf283f8b700/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/e06056ad-0a20-46a6-f257-91f48485ff00/public" alt="HTTP Overview" />


  </details>

<details>
  <summary>Summary for: `hive-gateway`</summary>

  **K6 Output**




```
     ✓ response code was 200
     ✓ no graphql errors
     ✓ valid response structure

     █ setup

     checks.........................: 100.00% ✓ 7590      ✗ 0    
     data_received..................: 224 MB  6.7 MB/s
     data_sent......................: 3.0 MB  90 kB/s
     http_req_blocked...............: avg=2.97ms   min=1.44µs   med=3.77µs   max=77.17ms p(90)=3.07ms   p(95)=32.96ms
     http_req_connecting............: avg=2.86ms   min=0s       med=0s       max=56.23ms p(90)=2.82ms   p(95)=31.6ms 
     http_req_duration..............: avg=3.69s    min=14.63ms  med=1.88s    max=33.01s  p(90)=3.79s    p(95)=24.07s 
       { expected_response:true }...: avg=3.69s    min=14.63ms  med=1.88s    max=33.01s  p(90)=3.79s    p(95)=24.07s 
     http_req_failed................: 0.00%   ✓ 0         ✗ 2550 
     http_req_receiving.............: avg=353.86µs min=45.33µs  med=108.16µs max=32.07ms p(90)=451.93µs p(95)=1.26ms 
     http_req_sending...............: avg=689.86µs min=8.91µs   med=22.17µs  max=45.61ms p(90)=622µs    p(95)=4.45ms 
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s      p(90)=0s       p(95)=0s     
     http_req_waiting...............: avg=3.69s    min=14.55ms  med=1.88s    max=33.01s  p(90)=3.79s    p(95)=24.06s 
     http_reqs......................: 2550    75.911615/s
     iteration_duration.............: avg=3.74s    min=158.06ms med=1.9s     max=33.02s  p(90)=3.81s    p(95)=24.71s 
     iterations.....................: 2530    75.31623/s
     vus............................: 55      min=55      max=300
     vus_max........................: 300     min=300     max=300
```


**Performance Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/72f81f61-6562-42e3-571b-0118a1dab200/public" alt="Performance Overview" />


**Subgraphs Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/8bcebda3-b9a5-45d1-d36b-8b67adbb6800/public" alt="Subgraphs Overview" />


**HTTP Overview**


<img src="https://imagedelivery.net/KYe9TScr4TldYHA48pczVg/60a1af3e-b023-4113-2c88-340972fdc200/public" alt="HTTP Overview" />


  </details>