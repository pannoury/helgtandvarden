<?php

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST'); 
    header("Access-Control-Allow-Headers: X-Requested-With");

    if(isset($_POST['formArray'])){
        $mysqli = mysqli_connect(
            'mysql31.unoeuro.com',
            'helgtandvaarden_se',
            'ckbz6gxB3taG',
            'helgtandvaarden_se_db'
        );
        if(!$mysqli){
            die("Connection failed: " . mysqli_connect_error());
        }

        $formArray = $_POST['formArray'];

        $stmt = mysqli_stmt_init($mysqli);
        $stmt = mysqli_prepare($mysqli, "INSERT INTO contact (firstname, lastname, email, text) VALUES (?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "ssss", $formArray[0], $formArray[1], $formArray[2], $formArray[3]);
        mysqli_stmt_execute($stmt);
        $rows = mysqli_stmt_affected_rows($stmt);

        if($rows === 1){
            sendMail($formArray);
            //http_response_code(200);
            //echo json_encode($rows);
        }

    } else {
        http_response_code(400);
        echo json_encode("Parameters are missing, please try again");
    }


    function sendMail($data){

        $mail = "";
    }
?>