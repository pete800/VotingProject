
import * as  bodyParser from 'body-parser';
import * as express from 'express';
import {blockchain} from '../blockchain/blockchain';
import {initNetworking, connectToPeers, getSockets} from '../blockchain/networking';

const port = 9999;    // temp
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
        });
    
    /*** list peers ***/
    app.get('/peers', function (req, res) {
        res.send(getSockets().map(( s ) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });

    /***
     * add peer to peers
     */
    app.post('/addPeer', function (req, res) {
        connectToPeers(req.body.peer);
        res.send();
    });
    
    /*** tells server where to listen ***/
    app.listen(port, function () {
        console.log("Server listening on port" + port + "...");
    });

}


initHTTPServer(port);
