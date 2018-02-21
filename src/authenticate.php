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

            // TODO: We should move some of this code to a master functions file
			try {
				$conn = new PDO("mysql:host=$servername;dbname=Vote", $username, $password);

				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				echo "Connected successfully"; 
			
			} catch(PDOException $e){
				echo "Connection failed: " . $e->getMessage();
			}
			
		    $stmt = $conn->prepare("SELECT * FROM Users WHERE FName='".$firstname."' AND LName='".$lastname."' AND SSN='".$ssn."' AND street='".$street."' AND city='".$city."' AND state='".$state."' AND county='".$county."';");
			
			$stmt->execute();
			//TODO: Move this to master file and create sessions
			if ($stmt->rowCount()==1)
				header("Location: votingbooth.html");
			
			
			$conn = null;
			
		?>
	</body>

</html>