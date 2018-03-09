

initHTTPServer(port) {

	var app = express();
	app.use(bodyParser.json());
	
	app.get('/blocks', );
	app.get('/peers', );
	
	app.post('/addPeer', );
}