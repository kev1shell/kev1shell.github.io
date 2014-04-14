
// General Functions

//called by one client and FORCES all other clients to start the game.
//Only ONE client should call this function.

function organizeChildren()
{
	var children = [];
	var result = [];
	var units = [];
	var structures = [];
	var other = [];
	var selectionObjects = [];
	
	children = stage.children;
	
	//remove all
	//stage.removeAllChildren();
	
	//add everything that is not a unit, structure, or selection object
	for(var i=0;i<children.length;i++)
	{
		var name = children[i].name;
		
		if(name == null || typeof(name) == "undefined")
		{
			other.push(children[i]);
			continue;
		}
		
		if(name.indexOf("villager") != 0 && name.indexOf("warrior") != 0)
		{
			if(name.indexOf("farm") != 0 && name.indexOf("village") != 0)
			{
				if(name.indexOf("movementSquare") == -1 && name.indexOf("selectSquare") == -1)
				{
					other.push(children[i]);
					continue;
				}
			}
		}
	}
	
	//add structures
	for(var i=0;i<children.length;i++)
	{
		var name = children[i].name;
		
		if(name == null || typeof(name) == "undefined")
		{
			continue;
		}
		
		if((name.indexOf("village") == 0 || name.indexOf("farm") == 0) && name.indexOf("villager") == -1)
		{
			structures.push(children[i]);
		}
	}
	
	//add units
	for(var i=0;i<children.length;i++)
	{
		var name = children[i].name;
		
		if(name == null || typeof(name) == "undefined")
		{
			continue;
		}
		
		if(name.indexOf("villager") == 0 || name.indexOf("warrior") == 0)
		{
			units.push(children[i]);
		}
	}
	
	//add selection objects if they exist
	for(var i=0;i<children.length;i++)
	{
		var name = children[i].name;
		
		if(name == null || typeof(name) == "undefined")
		{
			continue;
		}
		
		if(name.indexOf("movementSquare") == 0 || name.indexOf("selectSquare") == 0)
		{
			selectionObjects.push(children[i]);
		}
	}
	
	for(var i=0;i<other.length;i++)
	{
		result.push(other[i]);
	}
	
	for(var i=0;i<structures.length;i++)
	{
		result.push(structures[i]);
	}
	
	for(var i=0;i<units.length;i++)
	{
		result.push(units[i]);
	}
	
	for(var i=0;i<selectionObjects.length;i++)
	{
		result.push(selectionObjects[i]);
	}
	
	stage.children = result;
	//reset stage children
	//for(var i=0;i<stage.children.length;i++){stage.children[i] = result[i];}
	
	//update the stage
	stage.update();
}

function startGame()
{
	//remove all children from stage
	stage.removeAllChildren();
	
	//tell other clients to start the game
	messageArray = ["startGame"];
	updater(messageArray);
	
	displayGameScreen();
	
}

//called by each client when a match starts
function joinGame()
{
	if(player.color == "blue")
	{
		player.onTurn = true;
		player.createUnit(stage,map,"villager",5,4);
		
		//send the new villager to all clients
		var unit = player.units[0];
		messageArray = ["createUnit",unit.type,player.id,unit.id,unit.row,unit.column];
		updater(messageArray);
		
		//update info text
		infoText = "You are blue, begin your turn";
		updateInfoText();
	}
	else if(player.color == "red")
	{
		player.onTurn = false;
		player.createUnit(stage,map,"villager",6,33);
		
		//send the new villager to all clients
		var unit = player.units[0];
		messageArray = ["createUnit",unit.type,player.id,unit.id,unit.row,unit.column];
		updater(messageArray);
		
		//update info text
		infoText = "You are red, Waiting for other players...";
		updateInfoText();
	}
}

function canBuild(object)
{
	
	if(object == "villager")
	{
		if(player.bank.food >= villagerFoodCost && player.bank.timber >= villagerTimberCost & player.bank.stone >= villagerStoneCost)
		{
			return true;
		}
		else
		{
			error = "Insufficient Resources! Villagers require: "+villagerFoodCost+" food, "+villagerTimberCost+" timber, and "+villagerStoneCost+" stone to build.";
			return false;
		}
	}
	else if(object == "warrior")
	{
		if(player.bank.food >= warriorFoodCost && player.bank.timber >= warriorTimberCost & player.bank.stone >= warriorStoneCost)
		{
			return true;
		}
		else
		{
			error = "Insufficient Resources! Warriors require: "+warriorFoodCost+" food, "+warriorTimberCost+" timber, and "+warriorStoneCost+" stone to build.";
			return false;
		}
	}
	else if(object == "farm")
	{
		
		if(player.bank.food >= farmFoodCost && player.bank.timber >= farmTimberCost & player.bank.stone >= farmStoneCost)
		{
			if(player.numFarms < player.numVillages*2)
			{
				if(getStructureAt(selectedUnit.row, selectedUnit.column) == null)
				{
					var tile = map[selectedUnit.row][selectedUnit.column];
					if(tile.type == "grass")
					{
						return true;
					}
					else
					{
						error = "Farms must be built on grass tiles";
						return false;
					}
				}
				else
				{
					error = "Another structure is in the way!";
					return false;
				}
			}
			else
			{
				error = "Not Enough Villages! You must have 1 village for every 2 farms.";
				return false;
			}
		}
		else
		{
			error = "Insufficient Resources! Farms require: "+farmTimberCost+" timber to build.";
			return false;
		}
	}
	else if(object == "village")
	{
		if(player.bank.food >= villageFoodCost && player.bank.timber >= villageTimberCost & player.bank.stone >= villageStoneCost)
		{
			if(player.numVillages < maxVillages)
			{
				if(getStructureAt(selectedUnit.row, selectedUnit.column) == null)
				{
					var tile = map[selectedUnit.row][selectedUnit.column];
					if(tile.type == "grass")
					{
						return true;
					}
					else
					{
						error = "Villages must be built on grass tiles";
						return false;
					}
				}
				else
				{
					error = "Another structure is in the way!";
					return false;
				}
			}
			else
			{
				error = "Max village number reached! No more villages may be built!";
				return false;
			}
		}
		else
		{
			error = "Insufficient Resources! Villages require: "+villageFoodCost+" food, "+villageTimberCost+" timber, and "+villageStoneCost+" stone to build.";
			return false;
		}
	}
}

function getStructureAt(row, column)
{
	var tile = map[row][column];
	
	for(var i = 0; i < tile.stack.length; i++)
	{
		if(isUnit(tile.stack[i]) == false)
		{
			return tile.stack[i];
		}
	}
	return null;
}

function tileContainsEnemy(row, column)
{
	var tile = map[row][column];
	if(tile.stack.length > 0)
	{
		if(tile.stack[i].color != player.color)
		{
			return true; 
		}
	}
	return false;
}

function getEnemyAt(row,column)
{
	var tile = map[row][column];
	if(tile.stack.length > 0)
	{
		for(var i = 0; i < tile.stack.length; i++)
		{
			var object = tile.stack[i];
			if(i == tile.stack.length-1 && object.color != player.color)
			{
				return object;
			}
			else
			{
				if(isUnit(object) && object.color != player.color)
				{
					return object;
				} 
			}
		}
	}
	return null;
}

function combaty(attackingUnit, defendingUnit)
{
	while( attackingUnit.health > 0 && defendingUnit.health > 0)
	{
		defendingUnit.health -= attackingUnit.attack - defendingUnit.defense;
		if(defendingUnit.health > 0)
		{
			attackingUnit.health -= defendingUnit.attack - attackingUnit.defense;
		}	
	}
	if(defendingUnit.health > 0)
	{
		return defendingUnit;
	}
	else
	{
		return attackingUnit;
	}
}

function combat(unitA, unitB)
{ 
	//-----Combat-specific helper functions-----
	function removeMax(dice){ //removes and returns the max value from the array
		dice.sort();
		dice.reverse();
		return dice.splice(0,1);
	}

	function rollDice(){ 
		return Math.floor((Math.random()*6)+1);
	}

	//-----Local variables-----
	var redAttack = unitA.attack;
	var blueDefense = unitB.defense;
	
	var RedsDice = [];
	var BluesDice = [];
	var numComparisons = Math.min(redAttack, blueDefense);

	//-----Combat calculations-----
	while (true){
		for (var i=0;i<redAttack;i++){
			RedsDice[i] = rollDice();
			//RedsDice[i] = flipCoin();
		}
		for (var i=0;i<blueDefense;i++){
			BluesDice[i] = rollDice();
			//BluesDice[i] = flipCoin();
		}
		
		//alert("RedsDice = ["+RedsDice+"] BluesDice = ["+BluesDice+"]");
		
		for (var i=0; i<numComparisons; i++){//compare one die from each set until no pairs are left
			var RedMax = removeMax(RedsDice);
			var BlueMax = removeMax(BluesDice);
			if ((RedMax <= 3 && RedMax >= BlueMax) || (RedMax > 3 && RedMax > BlueMax)) // 'fair chance' method
			//if (RedMax > BlueMax) // 'defender's advantage' method
			//if (RedMax == 2) //for use with flipCoin()
				unitB.health--;
			else
				unitA.health--;
			
			if (unitA.health == 0){ //If Red is defeated...
				//return "Blue";
				//unitA.remove();
				return unitB;
			}
			if (unitB.health == 0){ //If Blue is defeated...
				//return "Red";
				//unitB.remove();
				return unitA;
			}	
		} 
	}
} //end of Combat() function

//removes movementSquares from the movementSquares array and the stage
function killRandomUnit()
{
	var index = Math.floor(Math.random()*player.units.length);
	var unit = player.units[index];
	
	unit.remove();
	var messageArray = ["remove", unit.id,unit.row,unit.column];
	updater(messageArray);
	alert("Your villages starving! you have lost a "+unit.type+"!");
}

function removeMovementSquares()
{
	while(movementSquares.length > 0)
	{
		stage.removeChild(movementSquares[0]);
		movementSquares.splice(0,1);
	}
}

//returns true if object is a unit, false otherwise
function isUnit(object)
{
	if(object.type != null)
	{
		if(object.type == "villager" || object.type == "warrior")
		{
			return true;
		}
	}
	
	return false;
}

//Whenever a unit is moved this function should be called
function moveUnit(unit,row,column)
{
	
	if(unit == null)
	{
		return;
	}
	
	var oldRow = unit.row;
	var oldColumn = unit.column;
	unit.move(stage, map, row, column);
	//send the move to other clients
	var messageArray = ["move",unit.id,unit.row,unit.column,oldRow,oldColumn];
	updater(messageArray);
}

function moveSelectedUnit(row,column)
{
	//selectedUnit.move(stage, map, row, column);
	moveUnit(selectedUnit,row,column);
	selectedUnit.displayInfo(stage, player);
	displaySelectBox(row,column);
	removeMovementSquares();
}

function addStackSymbol(row,column)
{
	
	var stackSymbol = new Image();
	stackSymbol.src = "http://kev1shell.github.io/assets/sprites/other/stackSymbol.png"
	
	stackSymbol.onload = function()
							{
								var stackSymbolImage = new createjs.Bitmap(this);
								stackSymbolImage.x = 17+24*column;
								stackSymbolImage.y = 50 + 24*row;
								stackSymbolImage.name = "stackSymbol"+row+column;
								stage.addChild(stackSymbolImage);
								
								stage.update();
							}
}

function removeStackSymbol(row,column)
{
	stage.removeChild(stage.getChildByName("stackSymbol"+row+column));
	stage.update();
}

//handles the nitty gritty of unit movement
function unitHandler(row,column)
{
	if(selectedUnit.row != row || selectedUnit.column != column)
	{
		var distance = getDistance(row, column, selectedUnit.row, selectedUnit.column);
		if(distance < 2 && selectedUnit.movementPoints > 0 && selectedUnit.color == player.color && player.onTurn == true)
		{
			var tile = map[row][column];
			if(tile.type != "water" && tile.type != "mountains")
			{
				var enemyObject = getEnemyAt(row,column);
				
				if(enemyObject == null)
				{
					if(tile.stack.length > 0)
					{
						displayStackSelectionBox(row,column);
					}
					else
					{
						//no worries here
						moveSelectedUnit(row,column);
					
						if(selectedUnit.movementPoints > 0)
						{
							displayMovementSquares(selectedUnit.row,selectedUnit.column);
						}
						else
						{
							removeMovementSquares();
							stage.update();
						}
					}
				}
				else
				{
					//Enemy sighted!
					
					
					if(selectedUnit.type == "warrior")
					{
						//its fight'n time!
						
						while(enemyObject != null && selectedUnit != null)
						{
							if(isUnit(enemyObject) == true)
							{
								var survivor = combaty(selectedUnit, enemyObject);
								if(survivor.id == selectedUnit.id)
								{
									//remove enemy object
									enemyObject.remove();
									
									//remove this object from all clients
									var messageArray = ["remove", enemyObject.id,enemyObject.row,enemyObject.column];
									updater(messageArray);
									
									/*
									message format:
									{"updateUnit",row,column,unit.id,unit.movementPoints,
									unit.maxMovementPoints,unit.health,unit.maxHealth,unit.attack,unit.defense}
									*/
									
									//update surviving unit's stats on all clients
									messageArray = 
									["updateUnit",selectedUnit.row,selectedUnit.column,selectedUnit.id,
									selectedUnit.movementPoints,selectedUnit.maxMovementPoints,
									selectedUnit.health,selectedUnit.maxHealth,selectedUnit.attack,
									selectedUnit.defense];
									
									updater(messageArray);
								}
								else
								{
									//remove selected unit
									selectedUnit.remove();
									
									//remove selected unit from all clients
									var messageArray = ["remove", selectedUnit.id,selectedUnit.row,selectedUnit.column];
									updater(messageArray);
									
									//update surviving unit's stats on all clients
									messageArray = 
									["updateUnit",selectedUnit.row,selectedUnit.column,selectedUnit.id,
									selectedUnit.movementPoints,selectedUnit.maxMovementPoints,
									selectedUnit.health,selectedUnit.maxHealth,selectedUnit.attack,
									selectedUnit.defense];
									
									updater(messageArray);
									
									//deselected all
									deSelectAll();
								}
							}
							else
							{
								enemyObject.remove();
								var messageArray = ["remove", enemyObject.id,enemyObject.row,enemyObject.column];
								updater(messageArray);
							}
							enemyObject = getEnemyAt(row,column);
						}
						//enemyObject.remove();
						moveSelectedUnit(row,column);
						selectedUnit.movementPoints = 0;
						removeMovementSquares();
						stage.update();
					}
					
				}
			}
		}
		else
		{
			deSelectAll();
			selectObject(row,column);
		}
	}
	else
	{
		deSelectAll();
		selectObject(row,column);
	}
}

//returns the distance between two tiles.
function getDistance(row1,column1,row2,column2)
{
	var drow = row1 - row2;
	var dcolumn = column1 - column2;
	var distance = Math.sqrt(drow*drow + dcolumn*dcolumn);
	
	return distance
}

//called when a player ends a turn
function endTurn()
{
	
	deSelectAll();
	player.onTurn = false;
	displayTurnCounterElement("salmon");
	displayEndTurnElement("lightSlateGrey");
	infoText = "Turn Ended, Waiting for other players...";
	updateInfoText();
	
}

//called when a player begins a turn.
function startTurn()
{
	//deSelect units
	deSelectAll();
	player.onTurn = true;
	
	displayEndTurnElement("salmon");
	displayTurnCounterElement("lightGreen");
	
	infoText = "Begin your turn"
	updateInfoText();
	
	//refresh movement points
	for(var j=0;j<players.length;j++)
	{
		var playa = players[j];
		for(var i = 0; i < playa.units.length;i++)
		{
			playa.units[i].movementPoints = playa.units[i].maxMovementPoints;
		}
	}
	
	//update resources
	player.bank.food += player.bank.foodRate;
	if(player.bank.food < 0)
	{
		//PLAYER IS STARVING!!
		player.bank.food = 0;
		
		killRandomUnit();
	}
	player.bank.timber += player.bank.timberRate;
	player.bank.stone += player.bank.stoneRate;
	
	updateResources();
	
	//increment turn counter
	turnNum++;
	updateTurnNum();
	
	//do some other shit maybe
	
}

function removeObjectCost()
{
	stage.removeChild(stage.getChildByName("costBackground"));
	stage.removeChild(stage.getChildByName("costText"));
	
	stage.update();
}

function removeStackSelectionBox()
{
	stage.removeChild(stage.getChildByName("stackSelectionBox"));
	stage.removeChild(stage.getChildByName("SSBInfoBackground"));
	stage.removeChild(stage.getChildByName("objectName"));
	stage.removeChild(stage.getChildByName("SSBinfoLine1"));
	stage.removeChild(stage.getChildByName("SSBinfoLine2"));
	stage.removeChild(stage.getChildByName("SSBinfoLine3"));
	stage.removeChild(stage.getChildByName("SSBinfoLine4"));
	
	if(stage.getChildByName("moveHereButton") != null)
	{
		stage.getChildByName("moveHereButton").parentButton.remove();
	}
	
	stage.removeChild(stage.getChildByName("MHImage"));
	
	
	//remove all stack selection buttons
	var index = 0;
	while(stage.getChildByName("SSBButton"+index) != null)
	{
		stage.getChildByName("SSBButton"+index).parentButton.remove();
		index++;
	}
	
	//remove all stack selection images
	while(stage.getChildByName("SSBImage") != null)
	{
		stage.removeChild(stage.getChildByName("SSBImage"));
	}
	stage.update();
}

//removes all selection and movement graphics
//and resets all selection pointers to null
function deSelectAll()
{
	selectedObject = null;
	selectedUnit = null;
	
	stage.removeChild(stage.getChildByName("infoLine1"));
	stage.removeChild(stage.getChildByName("infoLine2"));
	stage.removeChild(stage.getChildByName("infoLine3"));
	stage.removeChild(stage.getChildByName("infoLine4"));
	stage.removeChild(stage.getChildByName("selectSquare"));
	stage.removeChild(stage.getChildByName("BFtext"));
	stage.removeChild(stage.getChildByName("BuildFarmButton"));
	stage.removeChild(stage.getChildByName("BVtext"));
	stage.removeChild(stage.getChildByName("BuildVillageButton"));
	stage.removeChild(stage.getChildByName("buildVillagertext"));
	stage.removeChild(stage.getChildByName("BuildVillagerButton"));
	stage.removeChild(stage.getChildByName("buildWarriortext"));
	stage.removeChild(stage.getChildByName("BuildWarriorButton"));
	
	removeStackSelectionBox();
	
	removeMovementSquares();
	
	infoText = "";
	updateInfoText();
	
	stage.update();
}

//selects an object if any, at the specified location
//if successful, the 'selectedObject' pointer will
//point to the newly selected object. if that object is
//a unit, 'selectedUnit' will also point to it.
function selectObject(row,column)
{
	var tile = map[row][column];
	
	if(tile.stack.length == 0)
	{
		//no objects in the stack
		//display tile type
		infoText = tile.type;
		updateInfoText();
		
		//remove stack selection box if necessary
		removeStackSelectionBox();
	}
	else if(tile.stack.length == 1)
	{
		//only one object is in the tile's stack
		//Select this object
		selectedObject = tile.stack[0];
		displaySelectBox(row,column);
		selectedObject.displayInfo(stage, player);
		
		if(isUnit(tile.stack[0]) == true)
		{
			//the only object in the stack is a unit
			
			//select unit
			selectedUnit = tile.stack[0];
			
			if(selectedUnit.movementPoints > 0 && selectedUnit.color == player.color && player.onTurn == true)
			{
				displayMovementSquares(row,column);
			}
			
		}
		else
		{
			//the only object in the stack is not a unit
			//the object must be a structure
			selectedUnit = null;

		}
	}
	else
	{
		//stack selection
		displayStackSelectionBox(row,column);
	}
}
