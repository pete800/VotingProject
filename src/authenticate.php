<?php
    if(!empty($_POST)) {
        $servername = "localhost";    // can be secured by putting this informatiion in a file below root
        $username = "root";
        $password = "3a5bda92e6bf62dd9b8ed6a42dc7bc7380e116126916ac5c";
        // TODO: Create a proper environment variables in the future so this is not in the code

        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $ssn = $_POST['ssn'];
        $street = $_POST['street'];
        $city = $_POST['city'];
        $state = $_POST['state'];
        $county = $_POST['county'];

        foreach ($_POST as $value) {    // securing from injection type attacks
            if (isset($value)) {  // and not gender bc gender is not a text field
                $value = trim($value);
                $value = strip_tags($value);
            }
        }

        $conn = mysqli_connect($servername, $username, $password,"vote");
        if (!$conn) {
            printf("Cannot connect to database");
        }
        $result = mysqli_query($conn, "SELECT * FROM Users WHERE FName='" . $firstname . "' AND LName='" . $lastname . "' AND SSN='" . $ssn . "' AND Street='" . $street . "' AND City='" . $city . "' AND StateCode='" . $state . "' AND County='" . $county . "';");
        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_assoc($result);
            mysqli_close($conn);
            session_start();
            $_SESSION['UserID'] = $row['UserID'];
            header("Location: votingbooth.php");
            Die();
        } else {
            //TODO Toss the user to the error screen here. Unable to authenticate
        }
        mysqli_close($conn);
    }
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Voting Authenticator</title>
		<link rel="stylesheet" type="text/css" href="Assets/styles.css">
	</head>
	<body>

		<header>
			<h1>U.S. Online Voting System</h1>
		</header>
		<div class="content">
			<h2>Please enter all of your information for verification</h2>
			<form action="./authenticate.php" method="post">
				<label for="firstname">First Name:</label><br>
				  <input type="text" name="firstname">
				<br>
				<label for="lastname">Last Name:</label><br>
				  <input type="text" name="lastname">
				<br>
				<div class="ssn_div">
					<label for="ssn">Social Security Number:</label><br>
					  <input type="numeber" name="ssn">
					<br>
				</div>

				<label for="street">Street Address:</label><br>
				  <input type="text" name="street">
				<br>
				<label for="city">City:</label><br>
				  <input type="text" name="city">
				<br>
				<label for="state">State:</label><br>
				  <input type="text" name="state">
				<br>
				<label for="county">County:</label><br>
				  <input type="text" name="county">
				<br>

				<input type="submit" value="Authenticate">
			</form>
		</div>
	</body>
</html>