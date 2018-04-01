const SHA256 = require("crypto-js/sha256");

class Block {

	/**
	public index: number;
	public timestamp: number;
	public UserID: number;
	public vote: number;
	public previousHash: string;
	public hash: string;
	public nonce: number;
	*/

    createBlock(timestamp,index, UserID, vote, county, state, previousHash = '') {
        this.previousHash = previousHash;
        this.index = index;
        this.timestamp = timestamp;
		this.UserID = UserID;
		this.vote = vote;
		this.county = county;
		this.state = state;
		this.nonce = 0;
		this.hash = this.calculateHash();
    }
    /**
     public previousHash: string;
     public timestamp: number;
     public index: index
     public UserID: number;
     public vote: number;
     public county: string;
     public state: string;
     public nonce: number;
     public hash: string;
     */
    duplicateBlock(previousHash, timestamp, index, UserID, vote, county, state, nonce, hash ) {
        this.previousHash = previousHash;
        this.index = index;
        this.timestamp = timestamp;
        this.UserID = UserID;
        this.vote = vote;
        this.county = county;
        this.state = state;
        this.nonce = 0;
        this.hash = hash;
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
            + this.UserID + this.vote + this.county + this.state
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


		return typeof this.hash === 'string' &&
        typeof this.previousHash === 'string' &&
        typeof this.UserID === 'string' &&
        typeof this.vote === 'string';
	}

}

module.exports = Block;