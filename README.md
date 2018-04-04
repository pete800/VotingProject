# VotingProject
A website developed to provide a safe secure way to vote in the elections 

Utilizes blockchain technology

# How to Run:
There should already be a master instance of this project running at vote.delcol.io
To run this project on a local machine: 
1. Download Node and install.
2. Download this code and navigate a command prompt to the main directory
3. run npm install command
4. download and install mysql and enter the mysql command line client
5. Run command CREATE USER 'node'@'localhost' IDENTIFIED BY 'dbpassword';
6. Run command GRANT ALL ON * . * TO 'node'@'localhost';
7. Then add the data by running \. PATHTOFILE\database_setup.sql
7. back in the command line run npm start

Change connections.js if you would like to have the program connect to a different server


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

You can contact us if you have any questions