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
        $stmt = mysqli_prepare($mysqli, "INSERT INTO contact (firstname, lastname, email, text, phonenumber) VALUES (?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "sssss", $formArray[0], $formArray[1], $formArray[2], $formArray[4], $formArray[3]);
        mysqli_stmt_execute($stmt);

        if(mysqli_affected_rows($mysqli) === 1){
            sendMail($formArray);
        }

    } else {
        http_response_code(400);
        echo json_encode("Parameters are missing, please try again");
    }


    function sendMail($formArray){

        $mailBody = 
        "
        <html>
        <head>
            <title>Kontaktförfrågan</title>
        </head>
        <body class='clean-body u_body' style='margin: 0;padding: 0;-webkit-text-size-adjust: 100%;color: #000000'>
      <table style='border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;width:100%' cellpadding='0' cellspacing='0'>
      <tbody>
      <tr style='vertical-align: top'>
        <td style='word-break: break-word;border-collapse: collapse !important;vertical-align: top'>
        <table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td align='center'>
      <div class='u-row-container' style='padding: 20px 0px 0px;background-color: transparent'>
      <div class='u-row' style='Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'>
        <div style='border-collapse: collapse;display: table;width: 100%;background-color: transparent;'>
          <!--[if (mso)|(IE)]><table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding: 20px 0px 0px;background-color: transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:500px;'><tr style='background-color: transparent;'><![endif]-->
      <!--[if (mso)|(IE)]><td align='center' width='500' style='background-color: #ffffff;width: 500px;padding: 0px;border-top: 7px solid #05386b;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;' valign='top'><![endif]-->
      <div class='u-col u-col-100' style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'>
      <div style='background-color: #dfdfdf;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'>
      <!    --[if (!mso)&(!IE)]><!--><div style='padding: 0px;border-top: 7px solid #05386b;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'><!--<![endif]-->
      
      <table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>
      <tbody>
        <tr>
          <td style='overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px;font-family:arial,helvetica,sans-serif;' align='left'>
      <table width='100%' cellpadding='0' cellspacing='0' border='0'>
      <tr>
        <td style='padding-right: 0px;padding-left: 0px;' align='center'>
          <img align='center' border='0' src='https://helgtandvården.se/assets/helgtandvard-logo.png' alt='' title='' style='outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 17%;max-width: 81.6px;' width='81.6'/>
        </td>
      </tr>
      </table>
          </td>
        </tr>
      </tbody>
      </table>
      <table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>
      <tbody>
        <tr>
          <td style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;' align='left'>
      <h1 style='margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 23px;'>
        <strong>Vi har mottagit din förfrågan!</strong>
      </h1>
          </td>
        </tr>
      </tbody>
      </table>
      <table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>
      <tbody>
        <tr>
          <td style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;' align='left'>
      <div style='line-height: 140%; text-align: left; word-wrap: break-word;'>
        <p style='font-size: 14px; line-height: 140%;'>Tack för att du har av dig till oss på Helgtandvården. Vi kommer inom väldigt kort att höra av oss till dig för att besvara på alla dina frågor.</p>
        <p style='font-size: 14px; line-height: 140%;'>
          Förnamn: {$formArray[0]}
        </p>
        <p style='font-size: 14px; line-height: 140%;'>
          Efternamn: {$formArray[1]}
        </p>
        <p style='font-size: 14px; line-height: 140%;'>
          E-postadress: {$formArray[2]}
        </p>
        <p style='font-size: 14px; line-height: 140%;'>
          Telefonnummer: {$formArray[3]}
        </p>
        <p style='font-size: 14px; line-height: 140%;'>
          Beskrivning: {$formArray[4]}
        </p>
      </div>
          </td>
        </tr>
      </tbody>
      </ta    ble>
      
      <table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>
      <tbody>
        <tr>
              <td style='overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;' align='left'>
      
      <div style='line-height: 140%; text-align: left; word-wrap: break-word;'>
        <p style='font-size: 14px; line-height: 140%;'>Ifall du inte f&ouml;rv&auml;ntade dig detta meddelande, var god och ta bort alternativt ignorera denna email.</p>
      </div>
          </td>
        </tr>
      </tbody>
      </table>
      <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
      </div>
      </div>
      <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
      </div>
      </div>
      <div class='u-row-container' style='padding: 0px;background-image: url('https://swedcom.se/assets/logo.svg');background-repeat: no-repeat;background-position: center top;background-color: transparent'>
      <div class='u-row' style='Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'>
        <div style='border-collapse: collapse;display: table;width: 100%;background-color: transparent;'>
              <table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding: 0px;background-image: url('https://swedcom.se/assets/logo.svg');background-repeat: no-repeat;background-position: center top;background-color: transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:500px;'><tr style='background-color: transparent;'><![endif]-->
      
      <td align='center' width='500' style='background-color: #ffffff;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;' valign='top'><![endif]-->
      <div class='u-col u-col-100' style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'>
      <div style='background-color: #ffffff;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'>
      <!--><div style='padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'><!--<![endif]-->
      </div>
      </div>
      </div>
      </td>
          </tr></table></td></tr></table>
        </div>
      </div>
      </div>
      <div class='u-row-container' style='padding: 0px;background-color: transparent'>
      <div class='u-row' style='Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;'>
        <div style='border-collapse: collapse;display: table;width: 100%;background-color: transparent;'>
              <table width='100%' cellpadding='0' cellspacing='0' border='0'><tr><td style='padding: 0px;background-color: transparent;' align='center'><table cellpadding='0' cellspacing='0' border='0' style='width:500px;'><tr style='background-color: transparent;'><![endif]-->
      
      <td align='center' width='500' style='background-color: #05386b;width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;' valign='top'><![endif]-->
      <div class='u-col u-col-100' style='max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;'>
      <div style='background-color: #05386b;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'>
      <!    --><div style='padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;'><!--<![endif]-->
      
      <table style='font-family:arial,helvetica,sans-serif;' role='presentation' cellpadding='0' cellspacing='0' width='100%' border='0'>
      <tbody>
        <tr>
              <td style='overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:arial,helvetica,sans-serif;' align='left'>
      
      <div style='line-height: 140%; text-align: left; word-wrap: break-word;'>
        <p style='font-size: 14px; line-height: 140%;'><span style='color: #ffffff; font-size: 14px; line-height: 19.6px;'>Helgtandvården Sverige AB, 559355-7332</span></p>
      </    div>
      
          </td>
        </tr>
      </tbody>
      </table>
      
      </div>
      </div>
      </tr></table></td></tr></table>
        </div>
      </div>
      </div>
        </td></tr></table>
        </td>
      </tr>
      </tbody>
      </table>
      </div>
      </div>
      </body>
      </html>
        ";

        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=iso-8859-1';
        $headers[] = 'From: info@helgtandvarden.se';
        $to = "{$formArray[2]}, 'info@helgtandvarden.se'";

        if(mail($to, "Kontaktförfrågan", $mailBody, implode("\r\n", $headers))){
            echo ('Message has been sent');
            http_response_code(200);
        } else{
            http_response_code(400);
            echo "Message could not be sent";
        }
    }
?>