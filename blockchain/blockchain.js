var Block = require('./block');
var networking = require('./networking');
var message = require('./message');
var file = require('./filemanager');

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
        let block = new Block();
        block.createBlock(Date.now(), "0", "0","","","");
        return block;
    }

    /**
     * returns the blockChain
     */
    getBlockchain() {
	    return this.chain;
    }

    /**
     * Set blockchain
     */


    setBlockchainFromFile(b) {
        if(b.length > 0)
            this.chain =[];
        for(let x=0; x < b.length; x++) {
            let block = new Block();
            block.duplicateBlock(b[x].previousHash, b[x].timestamp, b[x].index, b[x].UserID, b[x].vote,b[x].county, b[x].state,b[x].nonce, b[x].hash);
            this.chain.push(block);
        }
        if(this.isChainValid())
        {
            return;
        }
        else
        {
            console.log('Error loading chain. Creating new one');
            this.chain = [this.createGenesisBlock()];
        }
    }


    /**
     * get most recent block
     *
     * @returns {*}
     */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }


    generateNewBlockFromFile(UserID, vote, county, state) {
        let prevBlock = this.getLatestBlock();    // used to get prev hash
        let newBlock = new Block();
        newBlock.createBlock(Date.now(), prevBlock.index+1, UserID.toString(), vote, county, state, prevBlock.getHash);
        this.addBlock(newBlock);
        return newBlock;
    }

    /**
     * generates next block in the chain
     */
    generateNewBlock(UserID, vote, county, state) {

        let prevBlock = this.getLatestBlock();    // used to get prev hash
        let newBlock = new Block();
        newBlock.createBlock(Date.now(), prevBlock.index+1, UserID.toString(), vote, county, state, prevBlock.getHash);
        this.addBlock(newBlock);
        networking.broadcast(message.responseLatestMessage());
        file.writeBlockchainJSON();
        return newBlock;
    }

   /**
    *   Print entire blockchain for debug purposes to make sure it is gathering data properly
    *
    */
    printChain(){
        for(var x = 0; x < this.chain.length; x++) {
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


    /**
     * Iterates through blockchain and tallies votes
     */
    tallyVotes() {
        let votes = [];
        this.chain.forEach(block => votes[block.vote]++);
        console.log(votes);
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

            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {    // are contents valid
                console.log('Current Hash:' + currentBlock.hash);
                console.log('Calculated Hash:' + currentBlock.calculateHash());
                console.log('ID:'+i);
                console.log("Invalid Chain: current block's hash is invalid");
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {    // pointing to correct previous block
                console.log("Invalid Chain: prev and current hashes don't match");
                return false;
            }

            if (!currentBlock.isValidBlockStructure()){
                console.log("Current block's structure is invalid");
                return false;
            }
        }
        return true;
    }

    isChainEqual(chain){
        if(this.chain.length === chain.length){
            return false;
        }
        for(let x = 0; x < chain.length; x++)
        {
            if(chain[x].hash !== this.chain[x].hash)
            {
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
        if (newBlocks.isChainValid() && newBlocks.chain.length > this.chain.length) {

            console.log('Replacing chain');
            this.chain = newBlocks;
            networking.broadcast(message.responseLatestMessage());
            file.writeBlockchainJSON();
        } else {
            console.log('Invalid chain received');
        }
    }

    verifyUsersInBlocks(){

    }

    /**
     * Checks to see if the userHash is part of the chain
     * @param userHash
     */
    checkChainForID(userHash) {
        for(var x = 0; x < this.chain.length; x++)
        {
            if(this.chain[x].UserID === userHash)
            {
                return true;
            }
        }
        return false;
    }

    /**
     * Gets the block location of a speicified UserID
     * Returns Location of block if exists. Else returns -1
     * @param userHash
     * @returns {number}
     */
    getBlockForID(userHash)
    {
        for(var x = 0; x < this.chain.length; x++)
        {
            if(this.chain[x].UserID === userHash)
            {
                return x;
            }
        }
        return -1;
    }

    getBlockAtIndex(index){
        try{
            return this.chain[index];
        }catch(ex) {
            return -1;
        }
    }
}

const blockchain = new Blockchain();
module.exports.Blockchain = Blockchain;    // class
module.exports.blockchain = blockchain;    // object