<?php

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST'); 
    header("Access-Control-Allow-Headers: X-Requested-With");

    if(isset($_GET['request'])){
        $mysqli = mysqli_connect(
            'mysql31.unoeuro.com',
            'helgtandvaarden_se',
            'ckbz6gxB3taG',
            'helgtandvaarden_se_db'
        );
        if(!$mysqli){
            die("Connection failed: " . mysqli_connect_error());
        }


        if($_GET['request'] === "google_reviews"){
            $stmt = mysqli_stmt_init($mysqli);
            $stmt = mysqli_prepare($mysqli, "SELECT * FROM google_reviews WHERE rating = 5 AND comment != ''");
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $rows = mysqli_num_rows($result);
    
            if($rows >= 1){
    
                $multiArray = array();
    
                for($i=0; $i < $rows; $i++){
                    $row = mysqli_fetch_array($result);
    
                    $resultWrapper = array(
                        'review_id' => utf8_encode($row['review_id']),
                        'source' => utf8_encode($row['source']),
                        'date' => utf8_encode($row['date']),
                        'rating' => utf8_encode($row['rating']),
                        'comment' => utf8_encode($row['comment']),
                        'name' => utf8_encode($row['name']),
                        'title' => utf8_encode($row['title']),
                        'scrape_date' => utf8_encode($row['scrape_date'])
                    );
    
                    array_push($multiArray, $resultWrapper);
                }
    
                echo json_encode($multiArray);
                http_response_code(200);
                mysqli_close($mysqli);
    
            } else{
                http_response_code(400);
                echo json_encode("No data was found");
                mysqli_close($mysqli);
            }
        } else{
            http_response_code(400);
            echo json_encode("No requests specified");
            mysqli_close($mysqli);
        }
    }
?>