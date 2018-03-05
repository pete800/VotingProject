<?PHP
    //Verify that the user is actually verified. Kick them to the home page if they are not
    session_start();
    if(!isset($_SESSION['UserID']) || empty($_SESSION['UserID'])){
        header("Location: index.html");
        die();
    }
    //Make connection and pull candidates if for the user
    if(empty($_POST)) {
        $servername = "localhost";
        $username = "root";
        $password = "3a5bda92e6bf62dd9b8ed6a42dc7bc7380e116126916ac5c";
        $conn = mysqli_connect($servername, $username, $password,"vote");
        if (!$conn) {
            printf("Cannot connect to database");
        }
        $year = date("Y");
        $results = mysqli_query($conn,"SELECT * FROM Candidates WHERE YearVote='".$year."'");
        mysqli_close($conn);
    }
    //After the user selects the candidates this is where we would send the info to the blockchain portion of the website
    if(!empty($_POST))
    {

    }
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Voting Booth</title>
	</head>
	<body>
        <header>

        </header>
        <content>
            <h1>Please select your vote</h1>
            <div>
                <form>
                    <h3>Presidential Candidates</h3>
                <?PHP
                    if(isset($results))
                    {
                        while($row = mysqli_fetch_assoc($results))
                        {
                            if($row['CandidateTypeID'] == 1) {
                                echo "<input type='radio' name='pres'>";
                                echo "<p>".$row['FName']."</p>";
                            }
                        }

                    }
                ?>
                </form>
            </div>
        </content>
	</body>
</html>