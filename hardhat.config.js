/**
* @type import('hardhat/config').HardhatUserConfig
*/

// Export the Hardhat configuration object

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();


// Extract INFURA_API_KEY and PRIVATE_KEY from the environment variables
const {INFURA_API_KEY, PRIVATE_KEY } = process.env;


// Export the Hardhat configuration object
module.exports = {
  // Specify the Solidity compiler version
  solidity: "0.8.14",
   // Define networks for deployment
  networks: {
    sepolia: {
      // Set the RPC URL for the network using INFURA_API_KEY
      url : `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,

      // Specify the accounts to use for deployment, signing transactions, etc.
      // Here, we use the account associated with the provided PRIVATE_KEY
      accounts: [PRIVATE_KEY]
    }
  }
};
