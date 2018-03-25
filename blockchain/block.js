const SHA256 = require("crypto-js/sha256");

class Block {

	/**
	public index: number;
	public timestamp: number;
	public aVotes: number;
	public bVotes: number;
	public previousHash: string;
	public hash: string;
	public nonce: number;
	*/

    constructor(timestamp, aVotes, bVotes, previousHash = '') {

        this.previousHash = previousHash;
        this.timestamp = timestamp;
		this.aVotes = aVotes;
		this.bVotes = bVotes;
        this.hash = this.calculateHash();
		this.nonce = 0;
    }


    get getHash(){
        return this.hash;
    }

    get getPHash() {
        return this.previousHash;
    }

    /**
     * Calculate the hash of this block
     */
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp
            + this.aVotes + this.bVotes
            + this.nonce).toString();
    }


    /**
     * method to mine a block
     *
     * @param difficulty
     */
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


    /**
     * checking structure of block
     *
     * @returns {boolean}
     */
	isValidBlockStructure() {

		return typeof this.aVotes === 'number' &&
			typeof this.hash === 'string' &&
			typeof this.previousHash === 'string' &&
			typeof this.aVotes === 'number' &&
			typeof this.bVotes === 'number';

	}

}

export {Block};