<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
<title>Christopher Cooke - Developer</title>
	<link rel="stylesheet" href="styles/main.css" />
	<link rel="apple-touch-icon" sizes="57x57" href="images/favicon/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="images/favicon/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="images/favicon/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="images/favicon/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="images/favicon/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="images/favicon/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="images/favicon/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="images/favicon/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="images/favicon/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="images/favicon/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
	<script src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>
	<header>
		<span>Christopher Cooke - Developer</span>
	</header>
	<nav>
		<ul>
			<li><a href="#home" class="active">Home</a></li>
			<li><a href="#resume">Resume</a></li>
			<li><a href="#code">Code Examples</a></li>
			<li><a href="#play">Play!</a></li>
			<li><a href="#contact">Contact</a></li>
		</ul>
	</nav>
	<main>
		<div class="dvContent showme" id="home">
			<div class="textdiv">
					<p>"Make a portfolio site," they said. </p>
					<p>"It'll be fun," they said.</p>
			</div>
		</div>
		<div class="dvContent hideme" id="resume">
			<div class="textdiv">
				<p>Resume</p>
			</div>
		</div>
		<div class="dvContent hideme" id="code">
			<div class="textdiv">
				<p>Code Examples</p>
			</div>
		</div>
		<div class="dvContent hideme" id="play">
			<div class="textdiv">
				<p>Play a game</p>
			</div>
		</div>
		<div class="dvContent hideme" id="contact">
			<div class="textdiv">
				<p>Contact</p>
				<form class="contactForm" id="contact" name="contact" method="post">
					<div>
						<span class="label">
							<label for="namu">Name:</label>
						</span>
						<span class="input">
							<input type="text" name="namu" />
						</span>
					</div>
					<div>
						<span class="label">
							<label for="emailu">Email:</label>
						</span>
						<span class="input">
							<input type="text" name="emailu" />
						</span>
					</div>
					<div>
						<span class="label">
							<label for="message">Message:</label>
						</span>
						<span class="input">
							<textarea name="messageu"></textarea>
						</span>
					</div>
					<div>
						<span class="submit"><button name="sendu">Send!</button><!--<button name="sendu" class="g-recaptcha"
data-sitekey="6LcB510UAAAAAIxEgKjE9V2zZGsL6Q96AgRMwbx-"
data-callback="YourOnSubmitFn">Send!</button>--></span>
					</div>
				</form>
			</div>
		</div>
	</main>
	<footer>Copyright <?php echo date("Y"); ?> CA Cooke. All rights reserved.</footer>
	<script src="scripts/main.js"></script>
</body>
</html>