# VotingProject
A website developed to provide a safe secure way to vote in the elections 

Utilizes blockchain technology

#How to Run:
There should already be a master instance of this project running at vote.delcol.io
To run this project on a local machine: 
1. Download Node and install.
2. Download this code and navigate a command prompt to the main directory
3. run npm install command
4. After the install script has finished running, run the program through the command node ./bin/www

TODO:
-
1. ~~Convert voting booth to ejs~~
2. Create mysql scripts with node
3. Review mysql
4. Fix errors in blockchain code
5. Work on creating a link between ejs and blockchain code
6. Review blockchain code to ensure it works
7. Rebuild authentication in js
8. Update CSS to look and feel better
9. Create unit tests
10. Work on creating integration tests
11. Ensure we are following protocol outlined in slack


Blockchain Process:
-
Pre: Check server time to see if voting is opened
One server per time zone. Voting opens at 8 am and closes at 5 pm in each time zone
1. User enters their verification information
2. Validate verification information
3. If authentication is accpeted proceed to voting booth
4. Pull candidates from mysql and display
5. User votes
6. Set user vote for year to true. pass along vote information to blockchain system
7. Block is created with vote information
8. Add block to pending votes
9. Mine as many votes as possible
10. Update chain with recently mined blocks
11. Notify other nodes that the chain has been modified
12. Notify user if their block has been mined that their vote has been counted and give receipt id
