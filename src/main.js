
import * as  bodyParser from 'body-parser';
import * as express from 'express';
import {blockchain} from '../blockchain/blockchain';
import {initNetworkingServer, connectToPeers, getSockets} from '../blockchain/networking';

const sitePort = 10001;     // port for communicating with voting server
const blockPort = 20002;    // port for the p2p/blockchain discussion


function initHTTPServer(port) {
    
    const app = express();
    app.use(bodyParser.json());    // for parsing json

    // associating a page with a function
    
    /*** page will print blocks **/
    app.get('/blocks', function (req, res) {
        res.send(blockchain.getBlockchain());
    });

    app.get('/mineBlocks', function (req, res) {
        /*** stub ****/
        const newBlock =
        });
    
    /*** list peers ***/
    app.get('/peers', function (req, res) {
        res.send(getSockets().map(( s ) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });

    /***
     * add peer to peers
     */
    app.post('/addPeer', function (req, res) {
        if (req.body.hasOwnProperty('peer')) {
            connectToPeers(req.body.peer);
            res.send();
        } else {
            console.log("peer property not found in HTTP req");
        }
    });


    /*** tells server where to listen ***/
    app.listen(port, function () {
        console.log("Server listening on port" + port + "...");
    });

}


initHTTPServer(sitePort);
initNetworkingServer(blockPort);
