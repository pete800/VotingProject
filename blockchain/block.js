const SHA256 = require("crypto-js/sha256");

class Block {
	
    constructor(timestamp, aVotes, bVotes, previousHash = '') {
		
        this.previousHash = previousHash;
        this.timestamp = timestamp;
		this.aVotes = aVotes;
		this.bVotes = bVotes;
        this.hash = this.calculateHash();
		this.nonce = 0;
    }

	
	//
	// calcs hash
	//
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.aVotes + this.bVotes) + this.nonce).toString();
    }
	
	//
	// function to mine a block
	//
	mineBlock(difficulty) {
		
		while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log("BLOCK MINED: " + this.hash);
		
	}
	
	
	//
	// mine pending votez
	minePendingVotes() {

    	let block = new Block(Date.now(), this.pendingVotes);
		block.mineBlock(this.difficulty);

		// add to chain, since its been mined
		this.chain.push(block);
	}

}