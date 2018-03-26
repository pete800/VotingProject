//
// class Vote defines a vote in a blockchainc
//
class Vote {
	
	//
	// constructor
	//
	// oaram name - name of voter
	// param candidste - who the vote is for
	//
	constructor(name, county, candidate) {
		
		this.name = name;
		this.county = county;
		this.vote = candidate;
	}
	
}