<?PHP
    session_start();
    if(!isset($_SESSION['UserID']) || empty($_SESSION['username'])){
        echo $_SESSION['UserID'];
        echo "Test";
    }
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Voting Booth</title>
	</head>
	<body>
		Test Voting booth page. This should only show if you have authenticated.
	</body>
</html>