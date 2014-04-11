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
		this.shape.x = x;
		this.shape.y = y;
		this.shape.name = this.name;
		stage.addChild(this.shape);
		
		//this.shape.on("mouseover", handleETEMouseEvent);
		//this.shape.on("mouseout", handleETEMouseEvent);
		//this.shape.on("mousedown", handleETEMouseEvent);
		//this.shape.on("pressup", handleETEMouseEvent);
		
		//button text shape
		this.textShape = new createjs.Text(text, "bold 20px "+this.fontType, this.fontColor);
		this.textShape.x = 1+this.x;
		this.textShape.y = 1+this.y;
		this.textShape.name = this.name+"-Text";
		stage.addChild(this.textShape);
		
	}
}