const SHA256 = require("crypto-js/sha256");

class Block {
	
    constructor(index, timestamp, aVotes, bVotes, previousHash = '') {
		
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
		this.aVotes = aVotes;
		this.bVotes = bVotes;
        this.hash = this.calculateHash();
;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}