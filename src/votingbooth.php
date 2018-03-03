<?PHP
    if(!isset($_SESSION['UserID'])){
        header("Location: index.html");
        Die();
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