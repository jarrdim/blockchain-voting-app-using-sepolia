require('dotenv').config(); // Load environment variables from .env file// Import required modules and libraries
const express = require('express');// Import Express.js framework
const app = express();// Create an instance of Express app
const fileUpload = require('express-fileupload');// Middleware for handling file uploads
app.use(
    fileUpload({
        extended:true
    })
)
app.use(express.static(__dirname));// Serve static files from the current directory
app.use(express.json()); // Parse incoming JSON data
const path = require("path"); // Node.js module to handle file paths
const ethers = require('ethers');// Ethereum library for interacting with smart contracts

var port = 3000;// Define the port on which the app will listen

const API_URL = process.env.API_URL;// Get API URL from environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Get private key from environment variables
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS; // Get contract address from environment variables






const {abi} = require('./artifacts/contracts/Voting.sol/Voting.json'); // Import the ABI of the deployed smart contract
const provider = new ethers.providers.JsonRpcProvider(API_URL);// Create an Ethereum JSON-RPC provider

const signer = new ethers.Wallet(PRIVATE_KEY, provider); // Create a signer from the private key and provider

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})
// Route for serving the index.html file (fallback route if the user explicitly
app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

// Define routes and their respective handlers
// Route for handling POST requests to cast votes
app.post("/vote", async (req, res) => {
    var vote = req.body.vote;
    console.log(vote)
    // Function to store the vote data in the blockchain (smart contract)
    async function storeDataInBlockchain(vote) {
        console.log("Adding the candidate in voting contract...");
        const tx = await contractInstance.addCandidate(vote); // Call the smart contract's 'addCandidate' function
         // Wait for the transaction to be mined and confirmed
        await tx.wait();
    }
    const bool = await contractInstance.getVotingStatus();
    if (bool == true) {
         // If the voting is active, store the vote data in the blockchain
        await storeDataInBlockchain(vote);
        res.send("The candidate has been registered in the smart contract");
    }
    else {
        // If the voting has ended, notify the client that voting is finished
        res.send("Voting is finished");
    }
});
// Start the Express.js app and listen on the specified port
app.listen(port, function () {
    console.log("App is listening on port 3000")
});

