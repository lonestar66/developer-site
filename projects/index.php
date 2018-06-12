<!doctype html>
<html>
	<head>
		<title>PostCard Creator</title>
		<link rel="stylesheet" href="./styles/main.css">
		<script language="javascript" src="./scripts/postcard-creator.js"></script>
		<script language="javascript" src="./scripts/main.js"></script>
	</head>
	<body>
		<div id="dvMain">
			<h1 style="text-align: center">Postcard Creator</h1>
			<!--<postcard-creator id="pcMain" width="690px" height="530px" stylesheet="styles/postcardcreator.css" postmethod="sendImageToServer";></postcard-creator>-->
			<postcard-creator id="pcMain" width="690px" height="530px" stylesheet="styles/postcardcreator.css"></postcard-creator>
		</div>
		<div id="dvInstructions">
			<div id="dvInstructionsMain">
				<h1>
					Postcard Creator
				</h1>
				<h3>
					Create a postcard and send it to a friend!
				</h3>
				<p>
					<span>Camera Butons</span>
					<ul>
						<li>Camera ON/off
							<ul>
								<li>Click on to turn on your web cam</li>
								<li>Click it again to turn it off. It's that simple!</li>
							</ul>
						</li>
						<li>Capture Image
							<ul>
								<li>Click to capture your webcam as an image!</li>
								<li>You'll be able to see what it captured</li>
									<ul>
										<li>If you like it, turn off the camera</li>
										<li>If not, take another one!</li>
							</ul>
						</li>
					</ul>
					<span>Canvas Tools</span>
					<ul>
						<li>Tt: Text Tool
							<ul>
								<li>Add text to the postcard!</li>
								<li>Click on this tool to select it, and then click on the postcard<li>
								<li>Type a message to your friend!</li>
								<li>To choose a different font, click and hold the text tool for the picker</li>
							</ul>
						</li>
						<li>&#9998;: Pencil Tool
							<ul>
								<li>Add a drawing to the postcard!</li>
								<li>Click on this tool to select it, and then press and hold on the postcard<li>
								<li>Draw wacky lines and shapes!</li>
								<li>To choose a different line width, click and hold the pencil tool for the picker</li>
							</ul>
						</li>
						<li>&#9724;: Color Picker
							<ul>
								<li>Add a little color to the postcard!</li>
								<li>Click and hold the color tool for the picker, and the text and pencil tools change color!</li>
							</ul>
						</li>
					</ul>
					<ul>
						<li>Send to a friend</li>
						<li>Click Send Me!</li>
					</ul>
				</p>
			</div>
			<div id="dvInstructionsToggle">
				<span>?</span>
			</div>
		</div>
	</body>
</html>