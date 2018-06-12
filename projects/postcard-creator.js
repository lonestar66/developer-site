class PostcardCreator extends HTMLElement {
	constructor()
	{
		super();
		
		const shadowRoot = this.attachShadow({mode: 'closed'});
		shadowRoot.innerHTML = "<form id='frmMain' name='frmMain' method='post' action='sendToServer.php' enctype='multipart/form-data'><div id='dvPostcardCreator' class='pcc' style='height:500px;width:690px;'><div class='workArea'><video id='vPostCardCreatorVideo' class='pcccamera' height='480px' width='640px' style='display:none;' autoplay></video><canvas id='cnvPostCardCreatorCanvas' class='pcccanvas' height='480px' width='640px'></div><div id='dvCanvasControls' style='color:DeepSkyBlue'><div class='canvasControl' id='ctrlText' title='Add Text'><span>Tt</span><div class='ctrlFlyout' style='position:absolute;top:0px;left:50px;display:none'><ul><li setting='font=Arial,24px'>Arial 24px</li><li setting='font=Comic Sans MS,48px'>Comic Sans 48px</li><li setting='font=times new roman,72px'>Times New Roman 72px</li></ul></div></div><div class='canvasControl' id='ctrlPencil' title='Add Drawing'><span>&#9998;</span><div class='ctrlFlyout' style='position:absolute;top:0px;left:50px;display:none'><ul><li setting='pencil=1'><hr size=1 color='black' /></li><li setting='pencil=5'><hr size=5 color='black' /></li><li setting='pencil=10'><hr size=10 color='black' /></li></ul></div></div><div class='canvasControl' id='ctrlColor' title='Set Color'><span>&#9724;</span><div class='ctrlFlyout' style='position:absolute;top:0px;left:50px;display:none'><ul><li setting='color=Red'><span style='color:red'>&#9724;</span></li><li setting='color=Gray'><span style='color:Gray'>&#9724;</span></li><li setting='color=DeepSkyBlue'><span style='color:DeepSkyBlue'>&#9724;</span></li></ul></div></div></div><div class='pccCameraControls' style='height:auto;width:0px;'><button type='button' class='btnCameraToggle up'>Camera Off</button><button type='button' class='btnCapture up'>Capture Image</button></div><div class='dvEmailButtons'><input type='hidden' name='postcardimage' id='postcardimage' /><label for='recipient'>Recipient:</label>&nbsp;&nbsp;<input type='text' name='recipient' id='recipient' />&nbsp;&nbsp;<button type='button' class='btnEmail up'>Send Me!</button></div><style type='text/css'>div {background-color: red;}</style></div></form>";

		this._pccDiv = shadowRoot.querySelector(".pcc");
		this._workAreaElement = shadowRoot.querySelector(".workArea");
		this._videoElement = shadowRoot.querySelector("video");
		this._canvasElement = shadowRoot.querySelector("canvas");
		this._btnDiv = shadowRoot.querySelector(".pccCameraControls");
		this._toggleButtonElement = shadowRoot.querySelector(".btnCameraToggle");
		this._captureButtonElement = shadowRoot.querySelector(".btnCapture");
		this._styleElement = shadowRoot.querySelector("style");
		this._canvasControls = shadowRoot.querySelector("#dvCanvasControls");
		this._dvEmailButtons = shadowRoot.querySelector(".dvEmailButtons");
		this._emailButton = shadowRoot.querySelector(".btnEmail");
		this._form = shadowRoot.querySelector("#frmMain");
		this._postcardfield = shadowRoot.querySelector("#postcardimage");


		/*set the tools, too*/
		this._ctrlText = shadowRoot.querySelector("#ctrlText");
		this._ctrlText.addEventListener("mousedown", this._handleCtrlMouseDown.bind(this));
		this._ctrlText.addEventListener("mouseup", this._handleCtrlMouseUp.bind(this));	
		this._ctrlText.addEventListener("mouseleave", function(){clearTimeout(this._flyoutTimeout)}.bind(this));


		this._ctrlPencil = shadowRoot.querySelector("#ctrlPencil");
		this._ctrlPencil.addEventListener("mousedown", this._handleCtrlMouseDown.bind(this));
		this._ctrlPencil.addEventListener("mouseup", this._handleCtrlMouseUp.bind(this));	

		
		this._ctrlColor = shadowRoot.querySelector("#ctrlColor");
		this._ctrlColor.addEventListener("mousedown", this._handleCtrlMouseDown.bind(this));
		this._ctrlColor.addEventListener("mouseup", this._handleCtrlMouseUp.bind(this));	

		this._canvasContext = this._canvasElement.getContext("2d");
		

		/*wire 'em up*/

		this._toggleButtonElement.addEventListener("click", this._toggleCamera.bind(this));
		this._captureButtonElement.addEventListener("click", this._captureImage.bind(this));
		this._captureButtonElement.addEventListener("mousedown", this._buttonDown);
		this._captureButtonElement.addEventListener("mouseup", this._buttonUp);


		this._emailButton.addEventListener("click", this._sendEmail.bind(this));
		this._emailButton.addEventListener("mousedown", this._buttonDown);
		this._emailButton.addEventListener("mouseup", this._buttonUp);

		this._canvasElement.addEventListener("mousedown", this._canvasMouseDown.bind(this));
		this._canvasElement.addEventListener("mousemove", this._canvasDrag.bind(this));
		this._canvasElement.addEventListener("mouseup", this._canvasMouseUp.bind(this));

		shadowRoot.addEventListener("mousemove", this._handleDrag);
		document.addEventListener("mouseup", this._handleShadowMouseUp.bind(this));

		
		this._setDrawSettings(new Array(2));
	}

	_sendEmail(e)
	{
		//capture the image and send it to the server;
		if(this._postMethod)
		{
			//send to the post method			
			window[this._postMethod](this._canvasElement.toDataURL("image/png"));
		}
		else
		{
			//create an image to download
			this._postcardfield.value = this._canvasElement.toDataURL("image/png");
			this._form.submit();
		}
	}

	_handleDrag(e)
	{
		if(e.stopPropagation) e.stopPropagation();
    		if(e.preventDefault) e.preventDefault();
    		e.cancelBubble=true;
   		e.returnValue=false;
    		return false;
	}

	_canvasMouseDown(e)
	{
		if(this._currentTool == "ctrlPencil")
		{
			this._canvasDraw = true;
		}
	}

	_canvasMouseUp(e)
	{
		
		if(this._currentTool == "ctrlText")
		{
			var txtBox = document.createElement("input");
			txtBox.setAttribute("style", "position:absolute;z-index:2000;width:200px;top:" + e.offsetY + "px;left:" + e.offsetX + "px;font-family:" + this._currentFontFace + ";font-size:" + this._currentFontSize + ";color:" + this._currentColor + ";");
			txtBox.addEventListener("blur", this._saveTextToCanvas.bind(this));
			this._pccDiv.appendChild(txtBox);
			txtBox.focus();
		}
	}

	_saveTextToCanvas(e)
	{
		this._canvasContext.font = this._currentFontSize + " " + this._currentFontFace;
		this._canvasContext.fillStyle = this._currentColor;
		this._canvasContext.fillText(e.target.value, parseInt(e.target.style.left), parseInt(e.target.style.top)+parseInt(this._currentFontSize));

		e.target.parentNode.removeChild(e.target);
	}

	_canvasDrag(e)
	{
		
		
		var x = e.offsetX;
		var y = e.offsetY;
		
		if(this._canvasDraw)
		{
			e.stopPropagation();
						
			this._canvasContext.beginPath();
			this._canvasContext.strokeStyle = this._currentColor;
			this._canvasContext.lineWidth = this._currentLineThickness;
			this._canvasContext.lineJoin = "round";
			this._canvasContext.moveTo(this._lastMouseX, this._lastMouseY);
			this._canvasContext.lineTo(x, y);
			this._canvasContext.closePath();
			this._canvasContext.stroke();
		}
		this._lastMouseX = x;
		this._lastMouseY = y;
	}

	_handleCtrlMouseDown(e)
	{
		
		this._handleDrag(e);
		
		var node = e.target.className == "canvasControl" ? e.target : e.target.parentNode;
		this._currentButtonHold = node;

		//trigger flyout
		this._flyoutTimeout = setTimeout(
			function()
			{
				node.querySelector(".ctrlFlyout").style.display = "block";
			}.bind(node),
			500
		);
			
	}

	_handleCtrlMouseUp(e)
	{
		if(e.target === this._currentButtonHold || e.target.closest("div.canvasControl") === this._currentButtonHold)
		{
			var node = e.target.closest("div.ctrlFlyout ul li");
			if(node)
			{
				var arrySettings = node.attributes.setting.value.split("=");
				arrySettings[1] = arrySettings[1].split(",");
				this._setDrawSettings(arrySettings);
			}
		
			clearTimeout(this._flyoutTimeout);

			//set the control to highlighted
			
			if(this._currentButtonHold.id != "ctrlColor")
			{
				this._canvasControls.querySelectorAll(".canvasControl").forEach(function(key){key.style.backgroundColor="white"});
				this._currentButtonHold.style.backgroundColor = "beige";
				this._currentTool = this._currentButtonHold.id;

				switch (this._currentTool)
				{
					case "ctrlText":
				
						this._canvasElement.style.cursor = "text";

						break;
					case "ctrlPencil":
				
						this._canvasElement.style.cursor = "crosshair";

						break;
					default:
						this._canvasElement.style.cursor = "default";
						break;
				}
			}
		}
		else
		{

		}
		
	}



	_setDrawSettings(settings)
	{
		switch (settings[0])
		{
			case "font":
				this._currentFontFace = settings[1][0];
				this._currentFontSize = settings[1][1];
				break;
			case "pencil":
				this._currentLineThickness = settings[1][0];
				break;
			case "color":
				this._currentColor = settings[1][0];
				this._canvasControls.style.color = this._currentColor;
				break;
			default:
				this._currentFontFace = "arial";
				this._currentFontSize = "30px";
				this._currentLineThickness = 10;
				this._currentColor = "DeepSkyBlue";
				break;
		}
	}



	_handleShadowMouseUp(e)
	{
		this._pccDiv.querySelectorAll(".ctrlFlyout").forEach(function(key){key.style.display = "none"});
		this._canvasDraw = false;
	}

	static get observedAttributes()
	{ 
		return ["id","height","width","stylesheet","postmethod"];
	}
	attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
		if (name === "id")
		{
			this._id = newValue;
		}
		if (name === "height")
		{
			this._pccDiv.style.height = newValue;
			this._workAreaElement.style.height = (parseInt(newValue)-50) + "px";
		}
		if (name === "width")
		{
			this._pccDiv.style.width = newValue;
			this._workAreaElement.style.width = this._btnDiv.style.width = (parseInt(newValue)-50) + "px";
		}
		if (name === "stylesheet")
		{
			var styleSheet = document.createElement("link");
			styleSheet.setAttribute("rel", "stylesheet");
			styleSheet.setAttribute("href", newValue);
			this._pccDiv.appendChild(styleSheet);
			this._pccDiv.removeChild(this._styleElement);
		}
		if (name === "postmethod")
		{
			this._postMethod = newValue;
		}
	}

	_toggleCamera()
	{

		if(!this._iCameraState)
		{
			this._videoElement.style.display = "block";
			navigator.mediaDevices.getUserMedia({video:true}).
				then(function(stream){
					this._videoElement.srcObject = stream;
					this._streamWebCam = stream;
				}.bind(this)).
				catch(function(error){
					console.error('Failure is, apparently, an option', error);});

			this._buttonDown(this._toggleButtonElement);
			this._toggleButtonElement.innerHTML = "Camera ON";
			this._iCameraState = 1;
		}
		else
		{
			this._videoElement.style.display = "none";
			this._streamWebCam.getTracks().forEach(function(track){track.stop();});
			
			this._buttonUp(this._toggleButtonElement);
			this._toggleButtonElement.innerHTML = "Camera Off";
			this._iCameraState = 0;
		}
	}

	_captureImage()
	{
		this._videoElement.style.display = "none";
		this._canvasContext.drawImage(this._videoElement, 0, 0);		

		setTimeout(
			function()
			{
				this._videoElement.style.display = "block";
			}.bind(this),
			1000
		);	
	}

	_buttonDown(e)
	{
		var objBtn = e.target ? e.target : e;
		var btnClass = objBtn.attributes.class.value.split(" ");
		
		btnClass.splice((btnClass.indexOf("up") >= 0 ? btnClass.indexOf("up") : btnClass.length), 1, "down");
		objBtn.attributes.class.value = btnClass.join(" ");
	}

	_buttonUp(e)
	{
		var objBtn = e.target ? e.target : e;
		var btnClass = objBtn.attributes.class.value.split(" ");

		btnClass.splice((btnClass.indexOf("down") >= 0 ? btnClass.indexOf("down") : btnClass.length), 1, "up");
		objBtn.attributes.class.value = btnClass.join(" ");
	}
};

customElements.define('postcard-creator', PostcardCreator);