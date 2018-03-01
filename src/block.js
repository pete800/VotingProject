const SHA256 = require("crypto-js/sha256");

class Block {
	
    constructor(timestamp, aVotes, bVotes, previousHash = '') {
		
        this.previousHash = previousHash;
        this.timestamp = timestamp;
		this.aVotes = aVotes;
		this.bVotes = bVotes;
        this.hash = this.calculateHash();
;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.aVotes + this.bVotes)).toString();
    }
}