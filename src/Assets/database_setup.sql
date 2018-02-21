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

INSERT INTO Voted VALUES("1","TRUE","FALSE");