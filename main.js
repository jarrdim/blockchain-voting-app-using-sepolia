
let WALLET_CONNECTED = "";
// Variables to store connected wallet address and the contract address and ABI
let contractAddress = "0x23A4887F9dE3Ffe910Fd7b704fF5E9560e825351";




let contractAbi = [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidateNames",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_durationInMinutes",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllVotesOfCandiates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "voteCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Voting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRemainingTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "getVotesOfCandiate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVotingStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  // Function to connect to Metamask and get the connected wallet address
const connectMetamask = async() => {
   // Create a Web3Provider instance using the window.ethereum object provided by Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    // Get the signer associated with the connected account
    const signer = provider.getSigner();
    // Get the connected wallet address and store it in WALLET_CONNECTED
    WALLET_CONNECTED = await signer.getAddress();
    // Update the element with ID "metamasknotification" to show the connected wallet address
    var element = document.getElementById("metamasknotification");
    element.innerHTML = "Metamask is connected " + WALLET_CONNECTED;
}


// Function to add a vote to the smart contract
const addVote = async() => {
  // Check if Metamask is connected
    if(WALLET_CONNECTED != 0) {
      // Get the candidate name from the "vote" element
        var name = document.getElementById("vote");
         // Create a Web3Provider instance using the window.ethereum object provided by Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
          // Get the signer associated with the connected account
        const signer = provider.getSigner();
        // Create an instance of the smart contract using the contract address and ABI
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        var cand = document.getElementById("cand");
        cand.innerHTML = "Please wait, adding a vote in the smart contract";
        // Call the 'vote' function of the smart contract with the candidate name
        const tx = await contractInstance.vote(name.value);
        // Wait for the transaction to be mined and confirmed
        await tx.wait();
        // Update the element with ID "cand" to show that the vote has been added
        cand.innerHTML = "Vote added successfully";
       // await sendSMS("Vote added successfully");
       
    }
    else {
      // Metamask is not connected, show a message in the element with ID "cand"
        var cand = document.getElementById("cand");
        cand.innerHTML = "Please connect metamask first";
       
    }
}

// Function to get the voting status and remaining time from the smart contract
const voteStatus = async() => {
    // Check if Metamask is connected
    if(WALLET_CONNECTED != 0) {
        // Get elements to show voting status and remaining time
        var status = document.getElementById("status");
        var remainingTime = document.getElementById("time");
         // Create a Web3Provider instance using the window.ethereum object provided by Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        // Get the signer associated with the connected account
        const signer = provider.getSigner();
        // Create an instance of the smart contract using the contract address and ABI
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        // Get the current voting status from the smart contract
        const currentStatus = await contractInstance.getVotingStatus();
        // Get the remaining time in seconds from the smart contract
        const time = await contractInstance.getRemainingTime();
        console.log(time);
        // Update the element with ID "status" to show the voting status
        status.innerHTML = currentStatus == 1 ? "Voting is currently open" : "Voting is finished";
        // Update the element with ID "time" to show the remaining time in seconds
        remainingTime.innerHTML = `Remaining time is ${parseInt(time, 16)} seconds`;

       
    }
    else {
      // Metamask is not connected, show a message in the element with ID "status"
        var status = document.getElementById("status");
        status.innerHTML = "Please connect metamask first";
    }
}

// Function to get all the candidates and their vote counts from the smart contract
const getAllCandidates = async() => {
    // Check if Metamask is connected
    if(WALLET_CONNECTED != 0) {
        // Get element to show status messages
        var p3 = document.getElementById("p3");
        // Create a Web3Provider instance using the window.ethereum object provided by Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        // Get the signer associated with the connected account
        const signer = provider.getSigner();
        // Create an instance of the smart contract using the contract address and ABI
        const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
        // Show a message indicating that the candidates' data is being fetched
        p3.innerHTML = "Please wait, getting all the candidates from the voting smart contract";
        // Call the 'getAllVotesOfCandiates' function of the smart contract to get all candidates and vote counts
        var candidates = await contractInstance.getAllVotesOfCandiates();
        // Get the table element with ID "myTable"
        var table = document.getElementById("myTable");
        // Iterate through the candidates and add them to the table
        for (let i = 0; i < candidates.length; i++) {
            var row = table.insertRow();
            var idCell = row.insertCell();
            var descCell = row.insertCell();
            var statusCell = row.insertCell();

            idCell.innerHTML = i;
            descCell.innerHTML = candidates[i].name;
            statusCell.innerHTML = candidates[i].voteCount;
        }
         // Show a message indicating that the tasks are updated
        p3.innerHTML = "The tasks are updated"
    }
    else {
        // Metamask is not connected, show a message in the element with ID "p3"
        var p3 = document.getElementById("p3");
        p3.innerHTML = "Please connect metamask first";
    }
}


