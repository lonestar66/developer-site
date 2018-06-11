<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'incl/Exception.php';
	require 'incl/PHPMailer.php';
	require 'incl/SMTP.php';

	$imgData = $_POST['postcardimage'];
	$imgData = substr($imgData, strpos($imgData, ","));
	$imgData = base64_decode($imgData);	
	
	$mail = new PHPMailer(true);
	
	try
	{
		//Server settings
		$mail->SMTPOptions = array(
		'ssl'=>array(
			'verify_peer'=>false,
			'verify_peer_name'=>false,
			'allow_self_signed'=>true
			)
		);
		$mail->Mailer = "smtp";
    		$mail->SMTPDebug = 2;                                 // Enable verbose debug output
    		$mail->isSMTP();                                      // Set mailer to use SMTP
   		$mail->Host = 'smtp.gmail.com';  			// Specify main and backup SMTP servers
   		$mail->SMTPAuth = true;                               // Enable SMTP authentication
   		$mail->Username = 'cacooke@gmail.com';                 // SMTP username
   		$mail->Password = 'B3@dy!23';                           // SMTP password
   		$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
   		
		$mail->Port = 587;                                    // TCP port to connect to
		
		//Recipients
  		$mail->setFrom('cacooke@gmail.com');
  		$mail->addAddress($_POST["recipient"]);

		//Content
  		$mail->isHTML(true);                                  // Set email format to HTML
  		$mail->Subject = 'Who loves you, baby?';
		$mail->Body = "<div><span>Thinking of you</span></div>";
		$mail->addStringAttachment($imgData, "postcard.png", "base64", "image/png");
  		$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
		$mail->send();
		
  		error_log('Message has been sent');
	} catch (Exception $e) {
		error_log('Message could not be sent. Mailer Error: '. $mail->ErrorInfo);
	}	
?>

<script>
	location.href = "index.php";
</script>