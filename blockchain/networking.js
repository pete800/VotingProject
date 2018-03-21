



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
        if (!(ws === WebSocket)) {
            initConnection(ws);
            console.log("WebSocket listening on port" + port);
        } else {
            console.log("Error: ws no recieved in initNetworking");
        }
    });
}


function initConnection(ws) {

    sockets.push(ws);

    sendMessage(es, null);
}

/**
 * send message to websocket
 *
 * @param who
 * @param message
 */
function sendMessage(who, message) {
    if (!(ws === WebSocket)) who.send(JSON.stringify(message));
}
export {getSockets};