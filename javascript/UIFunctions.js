
//UI functions

/*---------------------------------------------------------*/
/*-------------------update functions----------------------*/

//updates turn counter
function updateTurnNum()
{	
	
	if(stage.getChildByName("TCtext") != null)
	{
		stage.removeChild(stage.getChildByName("TCtext"));
	}
	
	var TCtext = new createjs.Text(turnNum, "bold 14px Arial", "black");
	TCtext.x = stage.getChildByName("TCtital").x + 1;
	TCtext.y = 20;
	TCtext.name = "TCtext";
	stage.addChild(TCtext);
	
	stage.update();
	
}

//updates info text
function updateInfoText()
{			
	//info title
	if(stage.getChildByName("IEtext") == null)
	{
		var IEtext = new createjs.Text(infoText, "bold 14px Arial", "black");
		IEtext.x = 340;
		IEtext.y = 13;
		IEtext.name = "IEtext";
		stage.addChild(IEtext);
	}
	else
	{
		stage.getChildByName("IEtext").text = infoText;
	}
	
	stage.update();
}

//updates resource text
function updateResources()
{
	stage.removeChild(stage.getChildByName("REfoodNum"));
	stage.removeChild(stage.getChildByName("REfoodRate"));
	stage.removeChild(stage.getChildByName("REtimberNum"));
	stage.removeChild(stage.getChildByName("REstoneNum"));
	stage.removeChild(stage.getChildByName("REfarmNum"));
	stage.removeChild(stage.getChildByName("REvillagerNum"));
	stage.removeChild(stage.getChildByName("REwarriorNum"));
	
	
	//food text
	if(stage.getChildByName("REfoodNum") == null)
	{
		var REfoodNum = new createjs.Text(player.bank.food, "bold 14px Arial", "black");
		REfoodNum.x = 31;
		REfoodNum.y = 3;
		REfoodNum.name = "REfoodNum";
		stage.addChild(REfoodNum);
		
		var foodRateColor = "black";
		var extraPlus = "";
		if(player.bank.foodRate > 0)
		{
			foodRateColor = "green";
			extraPlus = "+";
		}
		else if(player.bank.foodRate < 0)
		{
			foodRateColor = "red";
		}
		
		var REfoodRate = new createjs.Text("(" + extraPlus + player.bank.foodRate + ")", "bold 14px Arial", foodRateColor);
		REfoodRate.x = REfoodNum.x + REfoodNum.getMeasuredWidth() + 2; 
		REfoodRate.y = REfoodNum.y;
		REfoodRate.name = "REfoodRate";
		stage.addChild(REfoodRate);
	}
	else
	{
		stage.getChildByName("REfoodNum").text = player.bank.food;
		
		var extraPlus = "";
		if(player.bank.foodRate > 0)
		{
			stage.getChildByName("REfoodRate").color = "green";
			extraPlus = "+";
		}
		else if(player.bank.foodRate < 0)
		{
			stage.getChildByName("REfoodRate").color = "red";
		}
		stage.getChildByName("REfoodRate").text = "(" + extraPlus + player.bank.foodRate + ")";
		stage.getChildByName("REfoodRate").x = stage.getChildByName("REfoodNum").x + stage.getChildByName("REfoodNum").getMeasuredWidth() + 2;
	}
	
	//timber text
	if(stage.getChildByName("REtimberNum") == null)
	{
		var REtimberNum = new createjs.Text(player.bank.timber + " (+" + player.bank.timberRate + ")", "bold 14px Arial", "black");
		REtimberNum.x = 130;
		REtimberNum.y = 3;
		REtimberNum.name = "REtimberNum";
		stage.addChild(REtimberNum);
	}
	else
	{
		stage.getChildByName("REtimberNum").text = player.bank.timber + " (+" + player.bank.timberRate + ")";
	}
	
	//stone text
	if(stage.getChildByName("REstoneNum") == null)
	{
		var REstoneNum = new createjs.Text(player.bank.stone + " (+" + player.bank.stoneRate + ")", "bold 14px Arial", "black");
		REstoneNum.x = 235;
		REstoneNum.y = 3;
		REstoneNum.name = "REstoneNum";
		stage.addChild(REstoneNum);
	}
	else
	{
		stage.getChildByName("REstoneNum").text = player.bank.stone + " (+" + player.bank.stoneRate + ")";
	}
	
	//farm counter text
	if(stage.getChildByName("REfarmNum") == null)
	{
		var REfarmNum = new createjs.Text(player.numFarms, "bold 14px Arial", "black");
		REfarmNum.x = 31;
		REfarmNum.y = 24;
		REfarmNum.name = "REfarmNum";
		stage.addChild(REfarmNum);
	}
	else
	{
		stage.getChildByName("REfarmNum").text = player.numFarms;
	}
	
	//villager counter text
	if(stage.getChildByName("REvillagerNum") == null)
	{
		var REvillagerNum = new createjs.Text(player.numVillagers, "bold 14px Arial", "black");
		REvillagerNum.x = 130;
		REvillagerNum.y = 24;
		REvillagerNum.name = "REvillagerNum";
		stage.addChild(REvillagerNum);
	}
	else
	{
		stage.getChildByName("REvillagerNum").text = player.numVillagers;
	}
	
	//warrior text
	if(stage.getChildByName("REwarriorNum") == null)
	{
		var REwarriorNum = new createjs.Text(player.numWarriors, "bold 14px Arial", "black");
		REwarriorNum.x = 235;
		REwarriorNum.y = 24;
		REwarriorNum.name = "REwarriorNum";
		stage.addChild(REwarriorNum);
	}
	else
	{
		stage.getChildByName("REwarriorNum").text = player.numWarriors;
	}
	
	stage.update();
}

/*----------------------------------------------------------*/
/*-------------------display screen----------------------*/
function displayGameScreen()
{
	
	displayResourceElement();
			
	displayInfoElement();
	
	displayMapElement();
	
	joinGame();
	
	if(player.onTurn == true)
	{
		displayEndTurnElement("salmon");
		
		displayTurnCounterElement("lightGreen");
	}
	else
	{
		displayEndTurnElement("lightSlateGrey");
	
		displayTurnCounterElement("salmon");
	}
	
	stage.update();
}

function displayDemoHelpScreen()
{
	//clear all existing children from the stage
	stage.removeAllChildren();
	
	//plain background
	var background = new createjs.Shape();
	background.graphics.beginFill("DarkSlateGray").drawRect(0, 0, stage.canvas.width, stage.canvas.height);
	background.x = 0;
	background.y = 0;
	background.name = "background";
	stage.addChild(background);
	
	//some text
	var titalText = new createjs.Text("Help", "bold 72px Arial", "black");
	titalText.x = 200;
	titalText.y = 30;
	titalText.name = "titalText";
	stage.addChild(titalText);
	
	//back button
	var backButton = new Button("backButton",338,170,175,50); //constructor: (name,x,y,width,height)
	backButton.text = "Back";//the text on the button
	backButton.mouseOutColor = "yellow";
	backButton.mouseInColor = "gold";
	backButton.mouseDownColor = "orange";
	backButton.onClick = displayDemoMainMenu;//function that the button calls when clicked.
	backButton.draw();
	
	//update stage
	stage.update();
}

function displayDemoMainMenu()
{
	//clear all existing children from the stage
	stage.removeAllChildren();
	
	//some text
	var titalText = new createjs.Text("Village Wars", "bold 72px Arial", "black");
	titalText.x = 200;
	titalText.y = 30;
	titalText.name = "titalText";
	
	//start game button
	var StartGameButton = new Button("StartGameButton",338,170,175,50); //constructor: (name,x,y,width,height)
	StartGameButton.text = "Start Game";//the text on the button
	StartGameButton.mouseOutColor = "yellow";
	StartGameButton.mouseInColor = "gold";
	StartGameButton.mouseDownColor = "orange";
	StartGameButton.onClick = startGame;//function that the button calls when clicked.
	
	//help button
	var helpButton = new Button("helpButton",338,230,175,50); //constructor: (name,x,y,width,height)
	helpButton.text = "help";//the text on the button
	helpButton.mouseOutColor = "yellow";
	helpButton.mouseInColor = "gold";
	helpButton.mouseDownColor = "orange";
	helpButton.onClick = displayDemoHelpScreen;//function that the button calls when clicked.
	
	//background image
	var backgroundImage = new Image();
	backgroundImage.src = "http://students.cse.tamu.edu/tjb33/assets/maps/survivorIsland3.png"
	
	backgroundImage.onload = function()
							{
								var backgroundShape = new createjs.Bitmap(this);
								backgroundShape.x = 0;
								backgroundShape.y = 0;
								backgroundShape.name = "demoMainBackground";
								
								/*If you're using a background image,
								add your text and draw the buttons here.
								Be sure to list them in the order you wish
								them to be drawn on the canvas!*/
								stage.addChild(backgroundShape);
								stage.addChild(titalText);
								StartGameButton.draw();
								helpButton.draw();
								
								stage.update();
							}
	
}

/*----------------------------------------------------------*/
/*-------------------display functions----------------------*/

function displayObjectCost(object)
{
	
	var text = "";
	var color = "salmon";
	var xOffset = 0;
	
	if(canBuild(object) == true)
	{
		color = "lightGreen";
	}
	
	if(object == "village")
	{
		text = "Timber: "+villageTimberCost+" Stone: "+villageStoneCost;
		xOffset = 75;
		
	}
	else if(object == "farm")
	{
		text = "Timber: "+farmTimberCost;
		xOffset = 75;
	}
	else if(object == "villager")
	{
		text = "Food: "+villagerFoodCost;
	}
	else if(object == "warrior")
	{
		text = "Food: "+warriorFoodCost+" Timber: "+warriorTimberCost+" Stone: "+warriorStoneCost;
	}
	
	//cost text
	var costText = new createjs.Text(text, "bold 14px Arial", "black");
	costText.x = 406+xOffset;
	costText.y = 35;
	costText.name = "costText";
	
	//background
	var costBackground = new createjs.Shape();
	costBackground.graphics.beginFill(color).drawRect(0, 0, costText.getBounds().width+10, 18);
	costBackground.x = 401+xOffset;
	costBackground.y = 35;
	costBackground.name = "costBackground";
	
	stage.addChild(costBackground);
	stage.addChild(costText);
	
	stage.update();
}

function displaySSBInfo(object,row,column)
{
	//background
	var SSBInfoBackground = new createjs.Shape();
	SSBInfoBackground.graphics.beginFill("LightSlateGray").drawRect(0, 0, 85, 75);
	SSBInfoBackground.x = 24*(column+1)+46;
	SSBInfoBackground.y = 50+24*row;
	SSBInfoBackground.name = "SSBInfoBackground";
	stage.addChild(SSBInfoBackground);
	
	//Object name text
	var objectName = new createjs.Text(object.type, "bold 14px Arial", "black");
	objectName.x = 24*(column+1)+52;
	objectName.y = 52+24*row;
	objectName.name = "objectName";
	stage.addChild(objectName);
	
	if(isUnit(object))
	{
		//line 1
		var infoLine1 = new createjs.Text("MP: "+object.movementPoints+"/"+object.maxMovementPoints, "bold 9px Arial", "black");
		infoLine1.x = 24*(column+1)+52;15 + stage.getChildByName("IEtext").x + stage.getChildByName("IEtext").getMeasuredWidth();
		infoLine1.y = 60+24*row + 10*1;
		infoLine1.name = "SSBinfoLine1";
		stage.addChild(infoLine1);
		
		//line 2
		var infoLine2 = new createjs.Text("Health: "+object.health+"/"+object.maxHealth, "bold 9px Arial", "black");
		infoLine2.x = 24*(column+1)+52;
		infoLine2.y = 60+24*row + 10*2;
		infoLine2.name = "SSBinfoLine2";
		stage.addChild(infoLine2);
		
		//line 3
		var infoLine3 = new createjs.Text("Attack: "+object.attack, "bold 9px Arial", "black");
		infoLine3.x = 24*(column+1)+52;
		infoLine3.y = 60+24*row + 10*3;
		infoLine3.name = "SSBinfoLine3";
		stage.addChild(infoLine3);
		
		//line 4
		var infoLine4 = new createjs.Text("Defense: "+object.defense, "bold 9px Arial", "black");
		infoLine4.x = 24*(column+1)+52;
		infoLine4.y = 60+24*row + 10*4;
		infoLine4.name = "SSBinfoLine4";
		stage.addChild(infoLine4);
	}
	
	stage.update();
}

function handleSSBBEvent(evt)
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
		displaySSBInfo(sourceButton.target,sourceButton.row,sourceButton.column);
	}
	if(evt.type == "mouseout" && stage.getChildByName(sourceButton.shape.name) != null)
	{
		sourceButton.draw(sourceButton.mouseOutColor);
		stage.removeChild(stage.getChildByName("SSBInfoBackground"));
		stage.removeChild(stage.getChildByName("objectName"));
		stage.removeChild(stage.getChildByName("SSBinfoLine1"));
		stage.removeChild(stage.getChildByName("SSBinfoLine2"));
		stage.removeChild(stage.getChildByName("SSBinfoLine3"));
		stage.removeChild(stage.getChildByName("SSBinfoLine4"));
		stage.update();
	}
	if(evt.type == "mousedown" && stage.getChildByName(sourceButton.shape.name) != null)
	{
		sourceButton.draw(sourceButton.mouseDownColor);
	}
}

function displayStackSelectionBox(row,column)
{
	var tile = map[row][column];
	var stack = tile.stack;
	
	var addMoveButton = 0;
	var index = 0;
	//check to see if there's a select square here
	for(var i=0;i<movementSquares.length;i++)
	{
		if(movementSquares[i].row == row && movementSquares[i].column == column)
		{
			addMoveButton = 1;
			
		}
	}
	
	//background
	var stackSelectionBox = new createjs.Shape();
	stackSelectionBox.graphics.beginFill("DarkSlateGray").drawRect(0, 0, 44, 25*(stack.length+addMoveButton));
	stackSelectionBox.x = 24*(column+1);
	stackSelectionBox.y = 50+24*row;
	stackSelectionBox.name = "stackSelectionBox";
	stage.addChild(stackSelectionBox);
	
	for(var i=0;i<stack.length;i++)
	{
		//add button
		var SSBButton = new Button("SSBButton",24*(column+1)+20,52+24*row+24*i,20,20);
		SSBButton.name = "SSBButton"+i;
		SSBButton.text = "<";
		SSBButton.row = row;
		SSBButton.column = column;
		SSBButton.target = stack[i];
		SSBButton.handleButtonEvent = handleSSBBEvent;
		SSBButton.onClick = function()
							{	
								deSelectAll();
								
								var tile = map[this.row][this.column]
								selectedObject = this.target;
								displaySelectBox(this.row,this.column);
								selectedObject.displayInfo(stage, player);
								
								if(isUnit(this.target) == true)
								{
									selectedUnit = this.target;
									
									if(selectedUnit.movementPoints > 0 && selectedUnit.color == player.color && player.onTurn == true)
									{
										displayMovementSquares(this.row,this.column);
									}
								}
								else
								{
									selectedUnit = null;
								}
								
								removeStackSelectionBox();
								stage.update();
							}
		SSBButton.draw();
		
		//add image
		var objectImage = new Image();
		objectImage.src = stack[i].image.src;
		objectImage.yOffset = i;
		objectImage.onload = function()
							{
								var SSBImage = new createjs.Bitmap(this);
								SSBImage.x = 24*(column+1)+2;
								SSBImage.y = 54 + 24*row+24*this.yOffset;
								SSBImage.name = "SSBImage";
								stage.addChild(SSBImage);
								
								stage.update();
							}
		
		index++;
	}
	
	if(addMoveButton == 1)
	{
		//add move here button
		var moveHereButton = new Button("moveHereButton",24*(column+1)+20,52+24*row+24*index,20,20);
		moveHereButton.name = "moveHereButton";
		moveHereButton.text = "<";
		moveHereButton.row = row;
		moveHereButton.column = column;
		
		var placeHolder = [];placeHolder.type = "Move Here";
		
		moveHereButton.target = placeHolder;
		moveHereButton.handleButtonEvent = handleSSBBEvent;
		moveHereButton.onClick = function()
							{
								moveSelectedUnit(this.row,this.column);
					
								if(selectedUnit.movementPoints > 0)
								{
									displayMovementSquares(selectedUnit.row,selectedUnit.column);
								}
								else
								{
									removeMovementSquares();
									stage.update();
								}
								
								removeStackSelectionBox();
								stage.update();
							}
		moveHereButton.draw();
		
		//add image
		var moveHereImage = new Image();
		moveHereImage.src = "http://kev1shell.github.io/assets/sprites/other/moveHereSymbol.png";
		moveHereImage.yOffset = index;
		moveHereImage.onload = function()
							{
								var MHImage = new createjs.Bitmap(this);
								MHImage.x = 24*(column+1)+2;
								MHImage.y = 54 + 24*row+24*this.yOffset;
								MHImage.name = "MHImage";
								stage.addChild(MHImage);
								
								stage.update();
							}
	}
	
	stage.update();
	
}

//displays movement squares around the specified tile.
//only displays squares on tiles that can be moved to.
function displayMovementSquares(row,column)
{
	
	for(var r = row-1; r < row+2; r++)
	{
		for(var c = column-1; c < column+2; c++) //lol "c++"
		{
			var tile = map[r][c];
			var enemyObject = getEnemyAt(r,c);
			if(tile.type != "mountains" && tile.type != "water" && (r != row || c != column))
			{
				var movementSquare = new createjs.Shape();
				if(enemyObject == null)
				{
					movementSquare.graphics.beginStroke("blue").drawRect(0, 0, 24, 24);
				}
				else
				{
					movementSquare.graphics.beginStroke("red").drawRect(0, 0, 24, 24);
				}
				movementSquare.x = 24*c;
				movementSquare.y = 50 + 24*r;
				movementSquare.row = r;
				movementSquare.column = c;
				movementSquare.name = "movementSquare"+movementSquares.length;
				stage.addChild(movementSquare);
				movementSquares.push(movementSquare);
			}
		}
	}
	stage.update();
}

//Displays selection box
function displaySelectBox(row,column)
{
	if(stage.getChildByName("selectSquare") != null)
	{
		stage.getChildByName("selectSquare").x = 24*column;
		stage.getChildByName("selectSquare").y = 50 + 24*row;
	}
	else
	{
		var selectSquare = new createjs.Shape();
		selectSquare.graphics.beginStroke("Black").drawRect(0, 0, 24, 24);
		selectSquare.x = 24*column;
		selectSquare.y = 50 + 24*row;
		selectSquare.name = "selectSquare";
		stage.addChild(selectSquare);
	}
	stage.update();
}

//displays resource element image
function displayResourceElement()
{
	//resource element 
	resourceElement = new Image();
	resourceElement.onload = handleRELoad;
	resourceElement.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/ui/ResourceElement.png";
}

//displays info box square
function displayInfoElement()
{
	//info element
	var IEsquare = new createjs.Shape();
	IEsquare.graphics.beginStroke("Black").drawRect(0, 0, 350, 43);
	IEsquare.x = 325;
	IEsquare.y = 0;
	stage.addChild(IEsquare);
	updateInfoText();
}

//displays map image
function displayMapElement()
{
	//map element
	mapElement = new Image();
	mapElement.onload = handleMapLoad;
	mapElement.src = "http://students.cse.tamu.edu/tjb33/assets/maps/survivorIsland3.png";
}

//displays end turn button with the specified color
function displayEndTurnElement(color)
{
	//end turn element
	if(stage.getChildByName("ETsquare") != null)
	{
		stage.removeChild(stage.getChildByName("ETsquare"));
		stage.removeChild(stage.getChildByName("ETtext"));
	}
	
	var ETsquare = new createjs.Shape();
	ETsquare.graphics.beginFill(color).drawRoundRect(0, 0, 100, 43,10);
	ETsquare.x = 740;
	ETsquare.y = 0;
	ETsquare.name = "ETsquare";
	
	ETsquare.on("click", handleETEMouseEvent);
	ETsquare.on("mouseover", handleETEMouseEvent);
	ETsquare.on("mouseout", handleETEMouseEvent);
	ETsquare.on("mousedown", handleETEMouseEvent);
	ETsquare.on("mouseup", handleETEMouseEvent);
	ETsquare.on("pressup", handleETEMouseEvent);
	
	stage.addChild(ETsquare);
	
	//end turn text
	var ETtext = new createjs.Text("End Turn", "bold 20px Arial", "black");
	ETtext.x = 745;
	ETtext.y = 10;
	ETtext.name = "ETtext";
	stage.addChild(ETtext);
}

//displays turn counter stuff
function displayTurnCounterElement(color)
{
	if(stage.getChildByName("TCsquare") != null)
	{
		stage.removeChild(stage.getChildByName("TCsquare"));
		stage.removeChild(stage.getChildByName("TCtital"));
	}
	
	//turn counter
	var TCsquare = new createjs.Shape();
	TCsquare.graphics.beginFill(color).drawRoundRect(0, 0, 42, 43, 10);
	TCsquare.x = stage.getChildByName("ETsquare").x - 45;
	TCsquare.y = 0;
	TCsquare.name = "TCsquare";
	stage.addChild(TCsquare);
	
	//turn counter tital
	var TCtital = new createjs.Text("Turn", "bold 14px Arial", "black");
	TCtital.x = stage.getChildByName("TCsquare").x + 5;
	TCtital.y = 5;
	TCtital.name = "TCtital";
	stage.addChild(TCtital);
	
	updateTurnNum();
}

/*--------------------------------------------------------------*/
/*-------------------mouse event functions----------------------*/

//handles End turn mouse events
function handleETEMouseEvent(evt)
{
	
	if(evt.type == "click" || evt.type == "mouseup" || evt.type == "pressup" && player.onTurn == true)
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
}

//handles map mouse events.
function handleMapMouseEvent(evt) 
{
	//output.text = "evt.target: "+evt.target+", evt.type: "+evt.type;
	
	if(evt.type == "click")
	{
		var x = evt.stageX - evt.target.x;
		var y = evt.stageY - evt.target.y;
		
		var row = Math.floor(y/24);
		var column = Math.floor(x/24);
		
		//infoText = "Tile:(" + row + "," + column + ")";
		//updateInfoText();
		
		removeStackSelectionBox();
		
		if(selectedObject == null)
		{
			//nothing is selected
			//select object
			selectObject(row,column);
		}
		else
		{
			//something is selected
			if(isUnit(selectedObject) == true)
			{
				//if selectedObject is a unit
				unitHandler(row,column);
			}
			else
			{
				//if selectedObject is not a unit
				if(selectedObject.row != row || selectedObject.column != column)
				{
					//if selectedObject is not at (row, column)
					deSelectAll();
					selectObject(row,column);
				}
				else
				{
					deSelectAll();
					selectObject(row,column);
				}
			}
		}
		
	}
	
	//stage.update();
}

/*-------------------------------------------------------------*/
/*-------------------image load functions----------------------*/

//loads the resource element image
function handleRELoad()
{
	bitmap2 = new createjs.Bitmap(resourceElement);
	bitmap2.x = 0;
	bitmap2.y = 0;
	stage.addChild(bitmap2);
	updateResources();
	stage.update();
}

//loads the map image
function handleMapLoad()
{
	bitmap = new createjs.Bitmap(mapElement);
	bitmap.x = 0;
	bitmap.y = 50;
	
	var mapBackground = new createjs.Shape();
	mapBackground.graphics.beginFill("white").drawRect(0, 0, 840, 432);
	mapBackground.x = bitmap.x;
	mapBackground.y = bitmap.y;
	mapBackground.name = "mapBackground";
	mapBackground.on("click", handleMapMouseEvent);
	
	stage.addChild(mapBackground);
	stage.addChild(bitmap);
	
	stage.update();
}

/*----------------------------------------------------------*/