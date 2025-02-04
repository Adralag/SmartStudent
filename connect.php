<?php
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $studentID = $_POST['studentID'];
    $course = $_POST['course'];
    $password = $_POST['password'];

    // Database connection
    $conn = new mysqli( 'localhost',
                        'root',
                        '',
                        'smartstudent');

    if ($conn->connect_error) {
        die('Conncetion Failed : '.$conn->connect_error);
    } else {
        $stm = $conn->prepare("insert into users(fullname, email, studentID, course, password) values(?, ?, ?, ?, ?)");
        $stm->bind_param("sssss", $fullname, $email, $studentID, $course, $password);
        $stm->execute();
        echo"registration successfully...";
        $stm->close();
        $conn->close();
    }
?>