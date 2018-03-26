var Block = require('./block');
var networking = require('./networking');
var message = require('./message');

class Blockchain {

    /**
     * constructor
     */
    constructor() {
		this.chain = [this.createGenesisBlock()];

		this.difficult = 1;    // this is what changes mining difficulrt--direct relationship

		this.pendingVotes = [];
	}


    /**
     * Creates the initial block for the blockchain
     *
     * @returns {Block}
     */
	createGenesisBlock() {
        return new Block(Date.now(), 0, 0, "");
    }

    /**
     * returns the blockChain
     */
    getBlockchain() {
	    return this.chain;
    }

    /**
     * get most recent block
     *
     * @returns {*}
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }


    /**
     * generates next block in the chain
     */
    generateNewBlock(UserID, vote) {

        let prevBlock = this.getLatestBlock();    // used to get prev hash
        let newBlock = new Block(Date.now(), UserID.toString(), vote, prevBlock.getHash);
        this.addBlock(newBlock);
        networking.broadcast(message.responseLatestMessage());
        return newBlock;
    }

   /**
    *   Print entire blockchain for debug purposes to make sure it is gathering data properly
    *
    */
    printChain(){
        for(var x = 0; x < this.chain.length; x++)
       {
            console.log(this.chain[x]);
       }
    }

    /**
     * determines if new block is valid, and adds to chain if so
     *   returns the success
     *
     * @param newBlock
     */
    addBlock(newBlock) {
        if (this.isValidNewBlock(newBlock)) {
            this.chain.push(newBlock);
            return true;
        }
        return false;
    }


    /**
     * returns whether new block is valid
     *
     * @param newBlock
     * @returns {boolean}
     */
    isValidNewBlock(newBlock) {
        return newBlock.getPHash === this.getLatestBlock().getHash;
    }


	//
	// add a block to the chain
	//
	// param llock - a Block obj
	//
    createVote(vote) {
		this.pendingVotes.push(vote);
	}

    /**
     * Validates entire blockchain
     *
     * @returns {boolean}
     */
    isChainValid() {

		// from oldest to youngest
        for (let i = 1; i < this.chain.length; i++){

            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {    // are contents valid
                console.log("Invalid Chain: current block's hash is invalid");
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {    // pointing to correct previous block
                console.log("Invalid Chain: prev and current hashes don't match");
                return false;
            }

            if (currentBlock.isValidBlockStructure()){
                console.log("Current block's structure is invalid");
                return false;
            }
        }
        return true;
    }


    /**
     * Replacing old chain with newly reieved
     *
     * @param newBlocks
     */
	replaceChain(newBlocks) {

        if (newBlocks.isChainValid() && newBlocks.length > this.chain.length) {

            console.log('Replacing chain');
            this.chain = newBlocks;
            networking.broadcast();

        } else {
            console.log('Invalid chain received');
        }
    }

}

const blockchain = new Blockchain();
module.exports = blockchain;