//button class
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
	
	function draw()
	{
		if(stage.getChildByName(this.name) != null)
		{
			stage.removeChild(stage.getChildByName(this.name));
			stage.removeChild(stage.getChildByName(this.name+"-Text"));
		}
		
		//button shape
		this.shape = new createjs.Shape();
		this.shape.graphics.beginFill(this.mouseOutColor).drawRoundRect(0, 0, this.width, this.height, this.cornerRadius);
		this.shape.x = this.x;
		this.shape.y = this.y;
		this.shape.name = this.name;
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
	
	function handleButtonEvent(evt,source)
	{
		infoText = source.text;
		updateInfoText();
		
		/*
		if(evt.type == "pressup" && player.onTurn == true)
		{
			displayEndTurnElement("red");
			stage.update();
			
			infoText = "Turn Ended";
			updateInfoText();
			
			//startTurn();
			endTurn();
			var messageArray = ["endTurn", player.color];
			updater(messageArray);
		}
		if(evt.type == "mouseover" && player.onTurn == true)
		{
			displayEndTurnElement("red");
			stage.update();
		}
		if(evt.type == "mouseout" && player.onTurn == true)
		{
			displayEndTurnElement("salmon");
			stage.update();
		}
		if(evt.type == "mousedown" && player.onTurn == true)
		{
			
			displayEndTurnElement("darkRed");
			stage.update();
		}
		*/
	}
}





