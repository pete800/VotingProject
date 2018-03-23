import {blockchain} from "./blockchain";


const WebSocket = require('ws');


const sockets = WebSocket[];

/***
 * defining the types of messages that will be sent
 */
enum MessageType {
    QUERY_LATEST = 0;
    QUERY_ALL = 1;
    RESPONSE_BLOCKCHAIN = 2;
}


class Message {
    public type;     // must test to ensure the enum
    public data;
}

/**
 * get sockets (peers)
 */
function getSockets() {
    return sockets;
}

/***
 * initialize the listening on port
 * @param port
 */
function initNetworking(port) {

    const wss = WebSocket.Server({
        port: port
    });

    wss.on('connection', function (ws) {
        if (ws === WebSocket) {
            initConnection(ws);
            console.log("WebSocket listening on port" + port);
        } else {
            console.log("Error: ws no recieved in initNetworking");
        }
    });
}


function initConnection(ws) {

    sockets.push(ws);

    initErrorHandler(ws);
    sendMessage(ws, null);
}


/*** creating function for messages ***/
/**
 * connect to peers
 *
 * @param peer - address
 */
function connectToPeers(peer) {

    const ws = new WebSocket(peer);
    ws.onopen( () => initConnection(ws));
    ws.onerror( () => console.log("connection failed"));
}


/**
 * establishing what is to be done if webSocket fails or closes
 * @param ws
 */
function initErrorHandler(ws) {

    ws.onclose( () => closeConn(ws));
    ws.onerror( () => closeConn(ws));

}

/**
 * closing connection and printing error, if it fails
 * @param ws
 */
function closeConn(ws) {

    console.log("connection failed:" + ws.url);
    sockets.splice(sockets.indexOf(ws), 1);

}


/**
 * handling when blockchain is requested
 * @param receivedBlocks
 */
function handleBlockchainResponse(receivedBlocks) {

    /*** checking if empty ***/
    if (receivedBlocks.length === 0) {
        console.log("Blockchain is empty");
        return;
    }

    /*** validating structure ***/
    const latestBlockRecieved = receivedBlocks[receivedBlocks.length-1];
    if (!latestBlockRecieved.isValidBlockStructure()) {
        console.log("Invalid Block");
        return;
    }

    const latestBlock = blockchain.getLatestBlock();
    /*** is this a new block that agrees with previous chain ***/
    if ( latestBlockRecieved.getPHash() === latestBlock.getHash()) {
        /*** if so, lets add it to chain ***/
        if (blockchain.addBlock(latestBlockRecieved)) {
            broadcast();
        }
    } else if (receivedBlocks.length === 1) {
        /*** query bc this shouldn't be ***/
        broadcast();
    } else {
        /*** there's > 1 block, so take em all ***/
        this.replaceChain(receivedBlocks);
    }

}


/**
 * send message to webSocket
 *
 * @param who
 * @param message
 */
function sendMessage(who, message) {
    if (who === WebSocket) who.send(JSON.stringify(message));
}

/**
 * send a message to all sockets
 */
function broadcast(message) {
    sockets.forEach(s => sendMessage(s, message));
}


export {initNetworking, connectToPeers, getSockets, broadcast};