<?PHP
    session_start();
    if(!isset($_SESSION['UserID']) || empty($_SESSION['UserID'])){
        header("Location: index.html");
        die();
    }
    if(!empty($_POST)) {
        $servername = "localhost";    // can be secured by putting this informatiion in a file below root
        $username = "root";
        $password = "3a5bda92e6bf62dd9b8ed6a42dc7bc7380e116126916ac5c";
        $conn = mysqli_connect($servername, $username, $password,"vote");
        if (!$conn) {
            printf("Cannot connect to database");
        }
        $year = date("Y");
        $results = mysqli_query($conn,"SELECT * FROM Candidates WHERE YearVote='".$year."'");
        while($row = mysqli_fetch_assoc($results))
        {
            echo $row['FName'];
        }
        mysqli_close($conn);
    }
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Voting Booth</title>
	</head>
	<body>

	</body>
</html>