<html>
	<head>
	<title>Authenticating...</title>
	</head>
	<body>
	
		<?php
		
			$servername = "localhost";    // can be secured by putting this informatiion in a file below root
			$username = "username";
			$password = "password";
			
			$firstname = $_POST['firstname'];
			$lastname  = $_POST['lastname'];
			$ssn       = $_POST['ssn'];
			$street    = $_POST['street'];
			$city      = $_POST['city'];
			$state     = $_POST['state'];
			$county    = $_POST['county'];
			$gender    = $_POST['gender'];
			
			foreach($_POST as $value) {    // securing from injection type attacks
				if ($value != $gender && isset($value)) {  // and not gender bc gender is not a text field
					$value = trim($value);
					$value = strip_tags($value);
				}
			}


			try {
				$conn = new PDO("mysql:host=$servername;dbname=myDB", $username, $password);

				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				echo "Connected successfully"; 
			
			} catch(PDOException $e){
				echo "Connection failed: " . $e->getMessage();
			}
			
		    $stmt = $conn->prepare("SELECT * FROM Users WHERE firstname==$firstname AND lastname==$lastname AND ssn==$ssn AND street==$street AND city==$city AND state==$state AND county==$county");
			
			$stmt->execute();
			if ($stmt->rowCount()==1)
				$auth=true;
			
			
			$conn = null;
			
		?>
	</body>

</html>