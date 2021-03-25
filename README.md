# Omnia: Blockchain-based P2P Insurance Platform



<p align="center"><img src="./markdown_img/omnia_logo.png" height = "300px" width= "300px"></p>


## 2021 ChainLink Hackathon Team Omnia's project


<h3> Member </h3>

| Name   	| Role                         	|
|--------	|-------------------------------	|
| Kim HeeYun  	| Backend |
| Lee YongWook 	| Frontend |
| Lee JeongMin 	| SmartContract 	|
| Jeong Chaewon 	| PM  |


<h3> Service Architecture </h3>

<img src="./markdown_img/Service_Architecture.png">


<h3> Develop Process </h3>

<img src="./markdown_img/Develop_process.png">

Using React, express(nodejs framework) and truffle, we will make web server for communicating with client. React for client screen, express for backend server and truffle for smartcontract deploy. Also we will make smartcontract for the insurance on the insurance page. This operates insurance payment when accidents when an accident occurred and it was certified. It is also operated when an accident does not occur and is overdue. The chainlink node will be built for importing the insurer's external data into the blockchain network. 

<h3> Contract </h3>
<img src="./markdown_img/request_model.png">
Through the chainlink external adapter, we will get approved insurance data from oracle Node. When chainlink client request an information, 
