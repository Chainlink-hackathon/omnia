import Web3 from "web3";
// Metamask 있는지 없는지 확인
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}
let web3js:any;

if (typeof window.ethereum !== "undefined") {
  web3js = new Web3(window.ethereum);
  window.ethereum.enable();
} else {
  alert("no metamask");
}

const insuranceContract = new web3js.eth.Contract(
  [
    {
      inputs: [],
      name: "authorizeLendingPool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      stateMutability: "payable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
      ],
      name: "ChainlinkCancelled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
      ],
      name: "ChainlinkFulfilled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "bytes32",
          name: "id",
          type: "bytes32",
        },
      ],
      name: "ChainlinkRequested",
      type: "event",
    },
    {
      inputs: [],
      name: "Checkfunc",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "checkIAT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "depositTolending",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "divideInsurancePayment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "_requestId",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "_volume",
          type: "uint256",
        },
      ],
      name: "fulfillAlarm",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "targetClient",
          type: "address",
        },
      ],
      name: "giveRight",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "insurancePayment",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "durationInSeconds",
          type: "uint256",
        },
      ],
      name: "requestAlarmClock",
      outputs: [
        {
          internalType: "bytes32",
          name: "requestId",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawForadmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "withdrawForclient",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawFromlending",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawLINK",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "balance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "clstatus",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getInsruanceBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "payTarget",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "size",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "userBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  "0xd4c93D24E6aE7DAf3B9eBA3Ace9cd4869983BaFA"
);

// 메타마스크 지갑주소 가져오는 함수
async function getAccount() {
  const accounts = await window.ethereum
    .request({
      method: "eth_requestAccounts",
    })
    .then((result:any) => {
      console.log(result);
      return result;
    });
  return accounts[0];
}

// 유저가 투자한 잔액 조회
async function getUserBalance() {
  const address = await getAccount();
  const balance = await insuranceContract.methods.balance().call({
    from: address,
  });
  return balance;
}

// 보험 컨트랙트 잔액 조회
async function getInsuranceContractBalance() {
  const contractBalance = await insuranceContract.methods
    .getInsruanceBalance()
    .call({
      from: "0xd4c93D24E6aE7DAf3B9eBA3Ace9cd4869983BaFA", // contract address
    });

  return contractBalance;
}

// 보험 가입비 제출
async function purchaseInsurance() {
  const address = await getAccount();
  const insuranceData = await insuranceContract.methods
    .insurancePayment()
    .send({
      from: address,
      value: web3js.utils.toWei("0.1", "ether"),
    });

  return insuranceData;
}

// 납부한 보험비 돌려받음
async function expireInsurance() {
  const address = await getAccount();
  const withdrawInsurance = insuranceContract.methods
    .withdrawForclient(1000000)
    .send({
      from: address,
    });
  return withdrawInsurance;
}

export default {getAccount, getUserBalance, getInsuranceContractBalance, purchaseInsurance, expireInsurance};



