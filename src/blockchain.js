class Blockchain {
	
	//
	// Constructor
	constructor() {
		this.chain = [this.createGenesisBlock];
	}
	
	
	//
	// create GenesisBlock
	createGenesisBlock {
        return new Block(0, "01/01/2017", "Genesis block", "0");
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
    addBlock( block ) {
		
        block.previousHash = this.getLatestBlock().hash;    // setting predecessor of new block
        block.hash = block.calculateHash();                         // updating hash since it was modified
        this.chain.push(block);                                            // add block to this
		
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