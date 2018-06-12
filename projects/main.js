/** Globals **/

/** Init **/

function init(){
	/** Add Listeners **/
	
	var objInstrToggle = document.getElementById("dvInstructionsToggle");
	
	objInstrToggle.addEventListener("click", showHideInstructions);
}

/** Helper Functions **/

var showHideInstructions = function()
{
	var objInstructions = document.getElementById("dvInstructionsMain");
	
	objInstructions.style.display = (objInstructions.style.display == "block" ? "none" : "block");

	return true;
}

var sendImageToServer = function()
{
	//send image data to server
	
	/*var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			//success
		}
		else
		{
			//failure
		}
	};
	xmlhttp.open("POST", "sendToServer.php");
	xmlhttp.setRequestHeader("Content-type", "application/upload");
	xmlhttp.onload = function(e)
	{
		//uploaded
	}
	xmlhttp.send(imagedata);*/
}


/** Check document loaded **/

window.onload = function(e){init();};




