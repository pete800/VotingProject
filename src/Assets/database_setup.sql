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
INSERT INTO Users(UserID, Fname,LName,SSN,Street,City,StateCode,County)
VALUES("2","TestUser1","Smith","000112222","1 Lomb Memorial Drive","Rochester","NY","Monroe");
INSERT INTO Users(UserID, Fname,LName,SSN,Street,City,StateCode,County)
VALUES("3","TestUser2","Smith","111223333","47 Greenleaf Court","Rochester","NY","Monroe");

CREATE TABLE Voted(
  UserID int PRIMARY KEY,
  Year2016 boolean,
  Year2018 boolean,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

INSERT INTO Voted VALUES("1","1","0");
INSERT INTO Voted VALUES("2","1","0");
INSERT INTO Voted VALUES("3","1","0");

CREATE TABLE Parties(
  PartyID SMALLINT AUTO_INCREMENT PRIMARY KEY,
  PartyName varchar(30)
);
INSERT INTO Parties VALUES("1", "Republican");
INSERT INTO Parties VALUES("2", "Democrats");

CREATE TABLE CandidateType(
  CandidateTypeID int AUTO_INCREMENT PRIMARY KEY,
  Name varchar(30),
  Permissions smallint
);

INSERT INTO CandidateType VALUES("1","President", "3");
INSERT INTO CandidateType VALUES("2", "Representitive", "2");
INSERT INTO CandidateType VALUES("3", "Local", "1");

CREATE TABLE Candidates(
  CandidateID int AUTO_INCREMENT PRIMARY KEY,
  FName varchar(30),
  LName varchar(30),
  PartyID SMALLINT,
  State varchar(2),
  County varchar(30),
  YearVote varchar(30),
  CandidateTypeID SMALLINT,
  FOREIGN KEY (PartyID) REFERENCES Parties(PartyID)
);

INSERT INTO Candidates VALUES("1","Donald","Trump","1","NY","NY","2018", "1");
INSERT INTO Candidates VALUES("2","Hillary","Clinton","2","NY","Albany","2018", "1");

