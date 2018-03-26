var blockchain = require('./blockchain');
/***
 * defining the types of messages that will be sent
 */
var MessageType = {
    QUERY_LATEST : 0,
    QUERY_ALL : 1,
    RESPONSE_BLOCKCHAIN : 2
};


/**
 * For structured communication among nodes
 */
class Message {
    constructor(type, data) {
        if (type === MessageType) {
            this.type = type;
            this.data = data;
        }
        console.log("Provided 'type' was not MessageType");
    }
}


/*** creating function for each message type ***/

/**
 *
 * @returns {Message}
 */
function queryChainLengthMessage() {

    return new Message(MessageType.QUERY_LATEST, null);
}

/**
 * returns a message querying a peer of all blocks
 * @returns {Message}
 */
function queryAllMessage() {
    return new Message(MessageType.QUERY_ALL, null);
}

/**
 * sends an entire blockchain
 * @returns {Message}
 */
function responseBlockchainMessage() {
    return new Message(MessageType.RESPONSE_BLOCKCHAIN,
        JSON.stringify(blockchain.getBlockchain()));
}

/**
 * return a message to be sent, informing of the latest block
 * @returns {Message}
 */
function responseLatestMessage() {
    return new Message(MessageType.RESPONSE_BLOCKCHAIN,
        JSON.stringify(blockchain.getLatestBlock()));
}


module.exports.Message = Message;
module.exports.MessageType = MessageType;
module.exports.responseLatestMessage = responseLatestMessage;
module.exports.queryAllMessage = queryAllMessage;
module.exports.queryChainLengthMessage = queryChainLengthMessage;
module.exports.responseBlockchainMessage = responseBlockchainMessage;