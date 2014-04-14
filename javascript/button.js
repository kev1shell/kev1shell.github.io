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
	this.outlineshape = null;
	this.fontType = "Arial";
	this.fontColor = "black";
	this.onClick = null;
	this.draw = draw;
	this.handleButtonEvent = handleButtonEvent;
	this.remove = remove;
	
	function remove()
	{
		stage.removeChild(this.shape);
		stage.removeChild(this.textShape);
		stage.removeChild(this.outlineshape);
	}
	
	function draw(color)
	{
		if(typeof(color) == "undefined")
		{
			color = this.mouseOutColor;
		}
		
		if(stage.getChildByName(this.name) != null)
		{
			stage.removeChild(stage.getChildByName(this.name));
			stage.removeChild(stage.getChildByName(this.name+"-Text"));
			stage.removeChild(stage.getChildByName(this.name+"-Outline"));
		}
		
		//button shape
		this.shape = new createjs.Shape();
		this.shape.graphics.beginFill(color).drawRoundRect(0, 0, this.width, this.height, this.cornerRadius);
		this.shape.x = this.x;
		this.shape.y = this.y;
		this.shape.name = this.name;
		this.shape.parentButton = this;
		stage.addChild(this.shape);
		
		//event listeners
		this.shape.on("mouseover", this.handleButtonEvent);
		this.shape.on("mouseout", this.handleButtonEvent);
		this.shape.on("mousedown", this.handleButtonEvent);
		this.shape.on("pressup", this.handleButtonEvent);
		
		//button text shape
		var fontSize = Math.floor(this.height - 2*this.height/5);
		this.textShape = new createjs.Text(this.text, "bold "+fontSize+"px "+this.fontType, this.fontColor);
		this.textShape.x = this.x + this.width/2 - this.textShape.getBounds().width/2;
		this.textShape.y = -this.height/15 + this.y + this.height/2 - this.textShape.getBounds().height/2;
		this.textShape.name = this.name+"-Text";
		stage.addChild(this.textShape);
		
		//button outline
		this.outlineshape = new createjs.Shape();
		this.outlineshape.graphics.beginStroke("Black").drawRoundRect(0, 0, this.width, this.height, this.cornerRadius);
		this.outlineshape.x = this.x;
		this.outlineshape.y = this.y;
		this.outlineshape.name = this.name+"-Outline";
		this.outlineshape.parentButton = this;
		stage.addChild(this.outlineshape);
		
		stage.update();
	}
	
	function handleButtonEvent(evt)
	{
		var sourceButton = evt.currentTarget.parentButton;
		
		if(evt.type == "pressup")
		{
			sourceButton.draw(sourceButton.mouseInColor);
			
			//call onClick function
			sourceButton.onClick();
		}
		if(evt.type == "mouseover" && stage.getChildByName(sourceButton.shape.name) != null)
		{
			sourceButton.draw(sourceButton.mouseInColor);
		}
		if(evt.type == "mouseout" && stage.getChildByName(sourceButton.shape.name) != null)
		{
			sourceButton.draw(sourceButton.mouseOutColor);
		}
		if(evt.type == "mousedown" && stage.getChildByName(sourceButton.shape.name) != null)
		{
			sourceButton.draw(sourceButton.mouseDownColor);
		}
		
	}
}





