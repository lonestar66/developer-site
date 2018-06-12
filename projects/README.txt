POSTCARD CREATOR

I chose this particular project because I could see the potential for it to scale larger after this initial run. When I first started to code, I initially created several JavaScript objects to handle each element of the app. After a couple of days, I realized that to TRULY scale this and have it be portable, I could create a custom HTML element instead. The potential for this is vast, especially with the already coded handlers for adding a postmethod and external stylesheet on the fly.

In a number of the organizations for which I worked, we always moved towards code-reusability and abstraction for other developers who would want to use the same functionality. Someone coming behind me should be able to just drop the postcard-creator element in their code, ensure the require the js file, and go on about her business.

I also stuck to vanilla JavaScript. While other libraries, including the ubiquitous jQuery, could have made my work a little simpler, I wanted to get my hands dirty and make my code work without the bloat that comes from dropping an entire library into a small app. Especially since the idea for this element is for any developer to utilize it regardless of library included.

There are a few things that I would want to tacke on version 2 of this element:
	1) The ability to drag the text around the canvas
	2) Creating the history element for previously sent postcards.
		A) Obviously, this aspect would have some engineering aspects which would need to open
				the methods up to the end-developer, but I'm confident it could still
				be a drop-and-go HTML element.
	3) A few other tools, like SVG shapes and a smart eraser.
	4) Layers

TESTING
This app is best tested by dropping it into a webserver which runs PHP. Unzip the archive, register the site, and go. I personally used WAMP as it's free and easy to install and run.

The PHP uses PHP Mailer. I included it in the incl folder:
	NAME: PHPMailer
	VERSION: 6.0.5
	PURPOSE: Emailing HTML from PHP
	LICENSE: GPU
	WEBSITE: https://github.com/PHPMailer/PHPMailer

Once the index.php page is loaded up, have fun! The help feature can be accessed by clicking the ? at the bottom right of the page.





