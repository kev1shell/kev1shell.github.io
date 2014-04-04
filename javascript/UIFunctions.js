
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
	TCtext.x = 704;
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
/*-------------------display functions----------------------*/

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
	ETsquare.graphics.beginFill(color).drawRect(0, 0, 100, 43);
	ETsquare.x = 740;
	ETsquare.y = 0;
	ETsquare.name = "ETsquare";
	
	ETsquare.on("click", handleETEMouseEvent);
	ETsquare.on("mouseover", handleETEMouseEvent);
	ETsquare.on("mouseout", handleETEMouseEvent);
	
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
	TCsquare.graphics.beginFill(color).drawRect(0, 0, 40, 43);
	TCsquare.x = stage.getChildByName("ETsquare").x - 40;
	TCsquare.y = 0;
	TCsquare.name = "TCsquare";
	stage.addChild(TCsquare);
	
	//turn counter tital
	var TCtital = new createjs.Text("Turn", "bold 14px Arial", "black");
	TCtital.x = 704;
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
	if(evt.type == "click" && player.onTurn == true)
	{
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