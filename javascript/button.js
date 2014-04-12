//button class

var flag = 0;

var Button = function(_name, _x, _y,_width,_height)
{
	this.name = _name; 
	this.text = _name;
	this.mouseOutColor = "Lightblue";
	this.mouseInColor = "blue";
	this.mouseDownColor = "DarkBlue";
	this.cornerRadius = 10;
	this.x = _x;
	this.y = _y;
	this.width = _width;
	this.height = _height;
	this.shape = null;
	this.textShape = null;
	this.fontType = "Arial";
	this.fontColor = "black";
	this.onClick = null;
	this.draw = draw;
	this.handleButtonEvent = handleButtonEvent;
	
	function derp()
	{
		infoText = "derp";
		updateInfoText();
	}
	
	function draw(input)
	{
		var inputFilter = null;
		inputFilter = typeof(input);
		
		var color = this.mouseOutColor;
		
		if(inputFilter == "undefined")
		{
			infoText = "TIMMAH!";
			updateInfoText();
			
		}
		else
		{
			//color = input;
		}
		flag = 1;
		
		if(stage.getChildByName(this.name) != null)
		{
			stage.removeChild(stage.getChildByName(this.name));
			stage.removeChild(stage.getChildByName(this.name+"-Text"));
		}
		
		flag = 2;
		//button shape
		this.shape = new createjs.Shape();
		flag = 2.1;
		this.shape.graphics.beginFill(color).drawRoundRect(0, 0, this.width, this.height, this.cornerRadius);
		flag = 2.2;
		this.shape.x = this.x;
		flag = 2.3;
		this.shape.y = this.y;
		flag = 2.4;
		this.shape.name = this.name;
		flag = 2.5;
		this.shape.parentButton = this;
		flag = 2.6;
		stage.addChild(this.shape);
		
		flag = 3;
		
		//this.shape.on("mouseover", handleButtonEvent);
		//this.shape.on("mouseout", handleButtonEvent);
		//this.shape.on("mousedown", handleButtonEvent);
		//this.shape.on("pressup", handleButtonEvent);
		
		//button text shape
		var fontSize = Math.floor(this.height - 2*this.height/5);
		this.textShape = new createjs.Text(this.text, "bold "+fontSize+"px "+this.fontType, this.fontColor);
		this.textShape.x = this.x + this.width/2 - this.textShape.getBounds().width/2;
		this.textShape.y = -this.height/15 + this.y + this.height/2 - this.textShape.getBounds().height/2;
		this.textShape.name = this.name+"-Text";
		stage.addChild(this.textShape);
		
		flag = 4;
		
		stage.update();
	}
	
	function handleButtonEvent(evt)
	{
		var sourceButton = evt.currentTarget.parent;
		
		
		infoText = evt.type;
		displayInfoText();
		
		if(evt.type == "pressup")
		{
			sourceButton.draw(sourceButton.mouseInColor);
			
			//call onClick function
			sourceButton.onClick();
		}
		if(evt.type == "mouseover")
		{
			sourceButton.draw(sourceButton.mouseInColor);
		}
		if(evt.type == "mouseout")
		{
			sourceButton.draw(sourceButton.mouseOutColor);
		}
		if(evt.type == "mousedown")
		{
			sourceButton.draw(sourceButton.mouseDownColor);
		}
		
	}
}





