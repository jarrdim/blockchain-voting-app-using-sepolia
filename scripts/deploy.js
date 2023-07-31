// Async function to deploy the 'Voting' smart contract and interact with it.
async function main() {
  // Get the contract factory for the 'Voting' smart contract using ethers.js.
  const Voting = await ethers.getContractFactory("Voting");

  //const d = await ethers.getSigners();
  //console.log("Deploying contracts with the account:", d.address);

  // Get the signer(s) of the current wallet and log the address of the deploying account.

  const owner = await ethers.getSigners();
  console.log(`deploying contract from: ${owner[0].address}`);
  //const feeData = await ethers.provider.getFeeData();
  //await contract.funtion(arguments, {gasLimit: 250000, maxFeePerGas: feeData.maxFeePerGas, maxPriorityFeePerGas: feeData.maxPriorityFeePerGas})
  //var contract = await Voting.deploy({value: hre.ethers.utils.parseEther("0.07")});
  // Start deployment, returning a promise that resolves to a contract object

  // Get the current gas price from the signer of the 'Voting' contract and log it.
  const gasPrice = await Voting.signer.getGasPrice();
  console.log(`Current gas price: ${gasPrice}`);

  // Deploy the 'Voting' contract with an array of candidate names and a voting duration of 90 minutes.
  const Voting_ = await Voting.deploy(["Isaac Otieno", "jack mutiso"], 90);
 // Log the address of the deployed 'Voting' contract.
  console.log("Contract address:", Voting_.address);
 


}

// Call the 'main' function and handle any errors that may occur during the deployment.
// Exit the process with status 0 if successful, or status 1 if there's an error.
main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });