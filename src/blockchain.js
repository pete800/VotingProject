class Blockchain {
	
	//
	// Constructor
	constructor() {
		this.chain = [this.createGenesisBlock];
		this.difficult = 1;    // this is what changes mining difficulrt--direct relationship
		
		// pending votes
		this.pendingVotes = [];
	}
	
	
	//
	// create GenesisBlock
	createGenesisBlock {
        return new Block("02/29/2018", "Genesis block", "0");
	}
	
	//
	// get most recent block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
	
	//
	// add a block to the chain
	//
	// param llock - a Block obj
	//
    createVote(vote) {
		this.pendingVotes.push(vote);
	}
	
	//
	// validates chain
	//
    isChainValid() {
		
		// from oldest to youngest
        for (let i = 1; i < this.chain.length; i++){
			
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {    // are contents valid
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {    // pointing to correct previous block
                return false;
            }
        }
        return true;
    }
	
}