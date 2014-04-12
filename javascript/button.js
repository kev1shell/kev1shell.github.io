//button class

var Test = null;

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
	
	function draw(color)
	{
		Test = typeof(color);
		
		if(Test == "undefined")
		{
			infoText = "TIMMAH!";
			updateInfoText();
		}
		return;
		if(typeof(color)==='undefined') color = this.mouseOutColor;
		
		if(stage.getChildByName(this.name) != null)
		{
			stage.removeChild(stage.getChildByName(this.name));
			stage.removeChild(stage.getChildByName(this.name+"-Text"));
		}
		
		//button shape
		this.shape = new createjs.Shape();
		this.shape.graphics.beginFill(color).drawRoundRect(0, 0, this.width, this.height, this.cornerRadius);
		this.shape.x = this.x;
		this.shape.y = this.y;
		this.shape.name = this.name;
		this.shape.parent = this;
		stage.addChild(this.shape);
		
		this.shape.on("mouseover", handleButtonEvent);
		this.shape.on("mouseout", handleButtonEvent);
		this.shape.on("mousedown", handleButtonEvent);
		this.shape.on("pressup", handleButtonEvent);
		
		//button text shape
		var fontSize = Math.floor(this.height - 2*this.height/5);
		this.textShape = new createjs.Text(this.text, "bold "+fontSize+"px "+this.fontType, this.fontColor);
		this.textShape.x = this.x + this.width/2 - this.textShape.getBounds().width/2;
		this.textShape.y = -this.height/15 + this.y + this.height/2 - this.textShape.getBounds().height/2;
		this.textShape.name = this.name+"-Text";
		stage.addChild(this.textShape);
		
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





