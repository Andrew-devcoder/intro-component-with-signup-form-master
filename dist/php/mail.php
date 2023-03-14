<?php
require_once __DIR__ . '/../../vendor/autoload.php';

// composer require vlucas/phpdotenv
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');  // .env
$dotenv->load();


require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$c = true;
// mail 
$title = "title"; // theme mail
foreach ( $_POST as $key => $value ) {
  if ( $value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
    $body .= "
    " . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
      <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
      <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
    </tr>
    ";
  }
}

$body = "<table style='width: 100%;'>$body</table>";

// setting PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;

  // setting my mail
  $mail->Host       = 'smtp.gmail.com'; 
  $mail->Username   = 'andrey.kovpak.01@gmail.com'; // getenv('SMTP_MAIL');
  $mail->Password   = 'ldynqjibtgvofnin'; // getenv('SMTP_PASSWORD');
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('andrey.kovpak.01@gmail.com', 'send my mail'); // Sender's name (getenv('SMTP_SENDMAIL')

  // The person who receives the email.
  $mail->addAddress('andrey.kovpak.01@gmail.com'); //getenv('SMTP_TAKEMAIL'));

  // files
  // if (!empty($file['name'][0])) {
  //   for ($ct = 0; $ct < count($file['tmp_name']); $ct++) {
  //     $uploadfile = tempnam(sys_get_temp_dir(), sha1($file['name'][$ct]));
  //     $filename = $file['name'][$ct];
  //     if (move_uploaded_file($file['tmp_name'][$ct], $uploadfile)) {
  //         $mail->addAttachment($uploadfile, $filename);
  //         $rfile[] = "Файл $filename прикреплён";
  //     } else {
  //         $rfile[] = "Не удалось прикрепить файл $filename";
  //     }
  //   }
  // }



  // SEND MAIL
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send();

} catch (Exception $e) {
  $status = "Message was not sent. Error: {$mail->ErrorInfo}";
}
