<?php
    if(isset($_GET)){
        $mysqli = new mysqli(
            'mysql31.unoeuro.com',
            'helgtandvaarden_se',
            'ckbz6gxB3taG',
            'helgtandvaarden_se_db'
        );
        if ($mysqli -> connect_errno) {
            echo json_encode("Failed to connect to MySQL: " . $mysqli -> connect_error);
            exit();
        }

        $stmt = $mysqli->prepare("SELECT * FROM google_reviews WHERE rating='5'");
        mysqli_stmt_execute($stmt);
        $result = $stmt->get_result();


        if(mysqli_num_rows($result) >= 1){

            $result_array = array();

            for($i = 0; $i < mysqli_num_rows($result); $i++){
                $row = mysqli_fetch_array($result);

                echo json_encode(print_r($row));

                $array = array(
                    'review_id' => $row['review_id'],
                    'source' => $row['source'],
                    'date' => $row['date'],
                    'rating' => $row['rating'],
                    'comment' => $row['comment'],
                    'name' => $row['name'],
                    'title' => $row['title'],
                    'scrape_date' => $row['scrape_date']
                );

                array_push($result_array, $array);
            }

            echo json_encode($result_array, JSON_FORCE_OBJECT);
            http_response_code(200);

        } else{
            http_response_code(400);
            echo json_encode("No data was found");
        }
    }
?>