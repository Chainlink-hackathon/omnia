# Chainlink Virtual Hackathon Spring 2021
## Omnia: Blockchain-based P2P Insurance Platform



<p align="center"><img src="./markdown_img/Omia_real.png"></p>



<br>
<h3>1.  Member </h3>

| Name   	| Role                         	|
|--------	|-------------------------------	|
| HeeYoun Kim  	| Back-end Developer |
| YongWook Lee  	| Front-end Developer |
| JeongMin Lee	| SmartContract Developer	|
| Chaewon Jeong 	| Project Manager |

---


<h3>2.  Inspiration  </h3>

### Omnia is a ***blockchain-based p2p(peer-to-peer) insurance platform***. 

Personally, we were dissatisfied with the chronic problems of the existing insurance industry.  
For example, because of the issue of revenue structures, there were complaints about the inability of insurance to be generated for small needs, large amounts to be paid to cover risks, and complex contract procedures.  
We had only vaguely thought of solving the problem, but through this opportunity, we were able to solve the problems one by one by designing and developing a p2p service that specifically introduced blockchain.

#### Omnia's Vision
“Uni navi ne committas omnia” is a Latin saying, ‘Don’t leave everything in one boat.’
As such, we decided to make catchphrase in hopes of safely distributing risks through our platform.
Namely, We created a platform called ‘Omnia’ to give people a well-being life by creating an insurance platform that can safely distribute risks with blockchain.


---

<h3>3.  Service Features </h3>

We serve as a platform for connecting small needs that individuals have. Specifically, Recruit people who want to be guaranteed risks, and create insurance groups when a certain number of people gather in our platform. Then, Customers check the price and benefits and get insurance with higher benefits and lower costs than traditional insurance. Finally, in the total amount of insurance money each paid, insurance money shall be paid in the event of an accident. At this time, the entire process from subscription to payment of screening was designed to introduce smart contract technology. <br>

---

<h4> Service Process </h4>
<img src="./markdown_img/flow.png">
<br>
<h4> Omnia's Advantages </h4>
<img src="./markdown_img/f1.png">
It was difficult to receive insurance money because of an accident in the existing p2p insurance. Of course, there are cases in some insurance that reduce up to 90 percent, but it is rare. The reason may be that there are risks in terms of profitability. Omnia intends to use blockchain technology not only for the process of insurance procedures, but also for the formation of profitable models. Using DEFI, it is intended to be returned to the user by dividing the amount collected from the entire population, excluding the premium deducted. At this time, the fee for the platform was set very low at 5%. Still, the company can take a stable profit model. This is because there is revenue operated by fees and DEFI. Currently, we envision a model for making DAI of MakerDAo and Staking of Compound. <br>
<br>
<img src="./markdown_img/f2.png">
 In the current insurance industry, the use of blockchain is being partially utilized. Omnia intends to provide efficient infrastructure by introducing smart contract technology throughout the entire process, including subscription, screening, and insurance payments. Omnia has more advantages than the traditional insurance industry.
 First of all, it has simple and fast procedures, so you can experience high UX in terms of consumers, and it is also economical for the company. If operating costs decrease, it will also be replaceable with a large amount that can be returned to consumers. In addition, contracts are all written in code, thus reducing the ambiguity of contracts. Blockchain technology will provide high security, reduced fraud, and immutability.
Finally, we also try to minimize the chronic 'oracle problem' experienced by existing blockchain industries using chainlink's adapter.<br>
<br>
<img src="./markdown_img/f3.png">
<br>
We also considered ways to improve UX from the perspective of consumers. So what we've come up with is two functions. It will gradually introduce functions such as ordering and consulting by voice by linking voice recognition api inside the web. It is expected that this will improve the quality of experience for the underprivileged who are struggling with the IT UI.
In addition, in addition to the automatic upload function that Verifier automatically sends documents, we will also introduce the function to manually upload insurance review documents by linking OCR API. As we are still students, we can't cope with cloud charges because we can't afford it now, so we haven't developed each technology and connected it completely, but we will also connect additional functions when we carry out our business in the future.


---

<h3> 4. Service Architecture </h3>

<img src="./markdown_img/SA!.png">
Approximately, we designed the architecture as follows: Since it is a development demonstration, Verifier is difficult to recruit in reality, so it will be recruited and shown in future projects. Development is being carried out based on that architecture, and more detailed development and architecture will be uploaded at the final announcement.
<br>

---
<h3>5.  Expected Benefits </h3>

#### Ensured Revenue Model

#### Scability & Flexibility


<h3> 6. Develop Process </h3>


Using React, express(nodejs framework), we made web server for communicating with client. React for client screen, express for backend server and truffle for smartcontract deploy. Also we made smartcontract for the insurance on the insurance page. This operates insurance payment when accidents when an accident occurred and it was certified. It is also operated when an accident does not occur and is overdue. The chainlink node will be built for importing the insurer's external data into the blockchain network. Also, we made database for managing user's data using MySQL and connected AAVE API for defi staking. 

###  Languages and Frameworks & version 

#### Common

| Languages and Frameworks | version |
| --- | --- |
| yarn | 1.22.10 |

#### Client

| Languages and Frameworks | version |
| --- | --- |
| react | 17.0.2 |
| react-dom | 17.0.2 |
| react-router-dom | 5.2.0 |
| react-scripts | 4.0.3 |
| react-transition-group | 4.4.1 |
| styled-components | 5.2.3 |
| typescript | 4.1.2 |

#### Server

| Languages and Frameworks | version |
| --- | --- |
| node.js | 12.18 |
| postgreSQL | >=11 |
| nvm | 0.38.0 |
| cors | 2.8.5 |
| ejs | 3.1.6 |
| express | 4.17.1 |
| express-react-views | 0.11.0 |
| express-session | 1.17.1 |
| morgan | 1.10.0 |
| mustache | 4.2.0 |
| nodemon | 2.0.7 |
| path | 0.12.7 |
| session-file-store | 1.5.0 |
| ts-node | 9.1.1 |

#### Smart Contract

| Languages and Frameworks | version |
| --- | --- |
| geth | 1.8+ |
| solidity compiler | 0.6.12 |


---
### Details
#### a. Front-end
#### b. Back-end

**< Overview >**

    

> Server made with Express js (Node js), Typescript and MySQL. Server deployed with Heroku 
(Cloud Application Platform)

**< API >**

***> 1. Purchase Insurance ( '/api/create' )***
> 
> - request -> user can purchase insurance with this request. It requires user's confirmation code, user's name, Insurance's end date
> and user's wallet address.
> ```js
> // Request Body
> {
>    confirmationCode: String,
>    name: String,
>    dueDate: Date,
>    walletAddress: String
> }
> ```
> 
> - DB Query -> Insert user's data into insurance table.
>```mysql
>INSERT into insurance(confirmation_code, name, due_date, wallet_address) VALUES(?, ?, ?, ?)
>```
> 
> - response -> If there is an error, response error or not response success code.
>```js
>// Success Response Body
>{
>   code: 1
>}
>
>// Fail Response Body
>{
>   code: 0
>}
>```
> 
***> 2. Get My Insurance Data ( '/api/myPage' )***
> 
> - request -> User can check he or she's insurance data with this request. It requires user's wallet address.
>```js
>// Request Body
>{
>   walletAddress: String
>}
>```
> 
> - DB Query -> SELECT insurance data which user purchased from insurance table.
>```mysql
>SELECT * FROM insurance WHERE wallet_address=?
>```
> 
> - response -> If there is an error, response error or not response insurance data
>```js
>// Response Body
>{
>   confirmationCode: String,
>   name: String,
>   dueDate: Date
>}
>```
>

#### c. Smart Contract

> 1. ***Client structure***: Depending on the state and the amount of money deposited by the person, 0 means no insurance payment and 1 means no
> insurance payment.
> 
> 2. ***ClientInfo Mapping*** : Created to map with address => client structure format and address as key KeyList Address Array: To store
> the addresses of the people who have deposited and to count the total
> number of people later on. Mappings are not Iterative, so counting is
> inconvenient.
> 
> 3. The things in the constructor() **1** Ether must be initially deposited by the issuer to issue the contract.
> 
> 4. using **setPublicChainlinkToken()** -> using chainlink token Oracle -> External Adapter Oracle Address I Use JobId -> External Adapter id
> Clstatus -> First of all false
> 
> 5. **RequestAlarmClock,fulAlarm** —> supplied by the chainlink external adapter, and entered a few seconds in the requestalarmclock, thenreplaced the status value with true after the chainlink Oracle has run it all automatically.
> 
> 6. ***DepositTolending(), withdrawFromlending()*** —>  functions that deposit and withdraw all the money in the contract into the lendingpool.
> 
> 7. ***giveRight*** —>Contract Issuer makes the status of a particular client 1 If clstatus is true (i.e. the original goal was to get data from an external adapter when certified by the insurer and change the status corresponding to the person's address to 1, but after a certain period of time using alarm clock as an alternative, the contract issuer enters and executes the insured's address).
> 
> 8. ***withdraw()*** —> All balance withdrawals in the contract
> 
> 9. ***withdraw(uintamount)*** —> a function that allows withdrawals and payments to be made only by those authorized to pay insurance.
> 
> 10. A function of handing out insurance money (to the uninsured)
>
> 11. **insurancePayment()** —> a function that customers pay for insurance (1 ether default)
> 
> 12. ***size()*** —> Shows the number of people insured
> 
> 13. ***Balance()*** —> Show how much insurance you put in
> 
> 14. ***getInsuranceBalance()*** —> Shows the balance currently in this contract
> 
> 15. ***payTarget()*** —> You can check if you are eligible for insurance Payable Must not be 0 and must be 1 to be eligible for insurance payTarget()
> 
> 16. ***withdrawLINK()*** —> To perform a chainlink related function, you can send and use linktoken to this contract, which returns the remaining
> linktoken.




---

<h3> 7. Results </h3>

#### Webstie URL 

https://chainlink-omnia.herokuapp.com/

Please consider that the speed is a bit slow using the free domain.

#### DEMO Video







