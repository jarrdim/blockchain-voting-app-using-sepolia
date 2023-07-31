// SPDX-License-Identifier: MIT

// The pragma directive specifies the version of the Solidity compiler that should be used to compile the code.

pragma solidity ^0.8.0;

 // The contract 'Voting' starts here.
contract Voting {
    struct Candidate {
        // A struct to represent a candidate, containing name and voteCount.
        string name;
        uint256 voteCount;
    }
    // An array to store the list of candidates, and the 'public' modifier makes it accessible from outside the contract.

    Candidate[] public candidates;
    // A variable to store the address of the contract owner.
    address owner;
    // A mapping to keep track of whether an address has voted or not.
    mapping(address => bool) public voters;

    // Variables to store the start and end timestamps of the voting period.

    uint256 public votingStart;
    uint256 public votingEnd;

    // Constructor function to initialize the contract.
    // It takes an array of candidate names and the duration of the voting period in minutes as inputs.

constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
     // Loop to add each candidate from the input array to the 'candidates' array.
    for (uint256 i = 0; i < _candidateNames.length; i++) {
        candidates.push(Candidate({
            name: _candidateNames[i],
            voteCount: 0
        }));
    }
    // Set the contract owner as the address of the sender (creator) of the contract.
    owner = msg.sender;
    // Set the start time of the voting period as the current block timestamp.
    votingStart = block.timestamp;
    // Calculate the end time of the voting period by adding the duration in minutes to the start time.
    votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
}

 // A custom modifier to be used in functions that should only be executed by the contract owner.
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    // Function to add a new candidate to the 'candidates' array.
    // Only the contract owner can call this function.

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({
                name: _name,
                voteCount: 0
        }));
    }

    // Function to cast a vote for a specific candidate.
    // It takes the index of the candidate in the 'candidates' array as input.

    function vote(uint256 _candidateIndex) public {
        // Ensure that the sender has not voted before.
        require(!voters[msg.sender], "You have already voted.");
        // Check if the candidate index is valid.
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        // Increment the vote count of the selected candidate.
        candidates[_candidateIndex].voteCount++;
        // Mark the sender's address as voted.
        voters[msg.sender] = true;
    }

    function getAllVotesOfCandiates() public view returns (Candidate[] memory){
        // Function to retrieve the list of all candidates and their respective 
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        // Function to check if the voting period is currently active.
        // Returns true if the current block timestamp is within the voting period, otherwise false.
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        // Function to get the remaining time (in seconds) until the end of the voting period.
        // Returns 0 if the voting period has ended.
        // Throws an error if the voting has not started yet.
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
    }
        return votingEnd - block.timestamp;
    }
}
