<html>
	<head>
	<title>Authenticating...</title>
	</head>
	<body>
	
		<?php
		
			$servername = "localhost";    // can be secured by putting this informatiion in a file below root
			$username = "root";
			$password = "3a5bda92e6bf62dd9b8ed6a42dc7bc7380e116126916ac5c";
			// TODO: Create a proper environment variables in the future so this is not in the code
			
			$firstname = $_POST['firstname'];
			$lastname  = $_POST['lastname'];
			$ssn       = $_POST['ssn'];
			$street    = $_POST['street'];
			$city      = $_POST['city'];
			$state     = $_POST['state'];
			$county    = $_POST['county'];

			foreach($_POST as $value) {    // securing from injection type attacks
				if ($value != $gender && isset($value)) {  // and not gender bc gender is not a text field
					$value = trim($value);
					$value = strip_tags($value);
				}
			}

			$conn = mysqli_connect("localhost","root","3a5bda92e6bf62dd9b8ed6a42dc7bc7380e116126916ac5c","vote");
			if(!$conn)
            {
                printf("Cannot connect to database");
            }
            echo "Connection Made \n";
            $result = mysqli_query($conn, "SELECT * FROM Users WHERE FName='".$firstname."' AND LName='".$lastname."' AND SSN='".$ssn."' AND street='".$street."' AND city='".$city."' AND state='".$state."' AND county='".$county."';");
            echo "Query\n";
			if(mysqli_num_rows($result) == 1)
            {
                mysqli_close($conn);
                header("Location: ./votingbooth.html"); Die();
            }else {
                echo "Condition Not Met\n";
            }
            mysqli_close($conn);
		?>
	</body>

</html>