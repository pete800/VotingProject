DROP DATABASE IF EXISTS vote;
CREATE DATABASE vote;
use vote;

CREATE TABLE Users(
  UserID int AUTO_INCREMENT PRIMARY KEY,
  FName varchar(255),
  LName varchar(255),
  SSN int(9),
  Street varchar(255),
  City varchar(255),
  StateCode varchar(2),
  County varchar(255)
);

INSERT INTO Users(UserID, Fname,LName,SSN,Street,City,StateCode,County)
VALUES("1","Peter","Del Col","112223333","200 Park Point Drive","Rochester","NY","Monroe");

CREATE TABLE Voted(
  UserID int PRIMARY KEY,
  Year2016 boolean,
  Year2018 boolean,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

INSERT INTO Voted VALUES("1","1","0");

CREATE TABLE Parties(
  PartyID SMALLINT AUTO_INCREMENT PRIMARY KEY,
  PartyName varchar(30)
);
INSERT INTO Parties VALUES("1", "Republican");
INSERT INTO Parties VALUES("2", "Democrats");

CREATE TABLE Candidates(
  CandidateID int AUTO_INCREMENT PRIMARY KEY,
  FName varchar(30),
  LName varchar(30),
  PartyID SMALLINT,
  VPresFName varchar(30),
  VPresLName varchar(30),
  YearVote varchar(30),
  FOREIGN KEY (PartyID) REFERENCES Parties(PartyID)
);

INSERT INTO Candidates VALUES("1","Donald","Trump","1","Mike","Pence","2018");
INSERT INTO Candidates VALUES("2","Hillary","Clinton","2","Tim","Kaine","2018");

