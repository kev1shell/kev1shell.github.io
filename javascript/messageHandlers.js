
//Message Handlers

function startGameCommand(input)
{
	//message format: ["startGame"]
	stage.removeAllChildren();
	displayGameScreen();
}

function updateUnitCommand(input)
{
	/*
	message format:
	{"updateUnit",row,column,unit.id,unit.movementPoints,
	unit.maxMovementPoints,unit.health,unit.maxHealth,unit.attack,unit.defense}
	*/
	
	//set up stat vars
	var unit = null;
	var row = input[1];
	var column = input[2];
	var unitID = input[3];
	var unitMP = input[4];
	var unitMaxMP = input[5];
	var unitHealth = input[6];
	var unitMaxHealth = input[7];
	var unitAttack = input[8];
	var unitDefense = input[9];
	
	//find unit
	var tile = map[row][column];
	
	for(var i=0;i<tile.stack.length;i++)
	{
		if(tile.stack[i].id == unitID)
		{
			unit = tile.stack[i];
			//update unit stats
			unit.movementPoints = unitMP;
			unit.maxMovementPoints = unitMaxMP;
			unit.health = unitHealth;
			unit.maxHealth = unitMaxHealth;
			unit.attack = unitAttack;
			unit.defense = unitDefense;
			break;
		}
	}
}

function endTurnCommand(input)
{
	//message format: ["endTurn",pastPlayerColor]
	var color = input[1];
	if(color == "blue")
	{
		if(player.color == "red")
		{
			startTurn();
		}
	}
	else if(color == "red")
	{
		if(player.color == "blue")
		{
			startTurn();
		}
	}
}

function removeObjectCommand(input)
{
	//message format: ["remove", object.id, object.row, object.column]
	var objectID = input[1];
	var row = input[2];
	var column = input[3];
	
	var tile = map[row][column];
	//find object
	for(var i=0;i<tile.stack.length;i++)
	{
		if(tile.stack[i].id == objectID)
		{
			//remove object
			tile.stack[i].remove();
		}
	}
}

function createStructureCommand(input)
{
	//message format: ["createStructure","farm",player.id,structure.id,structure.row,structure.column];
	var structureType = input[1];
	var playerID = input[2];
	var structureID = input[3];
	var row = input[4];
	var column = input [5];
	
	//find player:
	for(var i=0;i<players.length;i++)
	{
		if(players[i].id == playerID)
		{
			//create the structure
			players[i].createStructure(stage,map,structureType,row,column);
			players[i].structures[players[i].structures.length-1].id = structureID;
		}
	}
	
}

function onLoginCommand(input)
{
	//alert('someone has logged in');
	//message format: ["login",player.id,player.color,player.name];
	var newPlayer = new Player();
	newPlayer.id = input[1];
	newPlayer.color = input[2];
	newPlayer.name = input[3];
	
	//make sure new player is not in players array:
	for(var i=0;i<players.length;i++)
	{
		if(players[i].id == newPlayer.id)
		{
			return;
		}
	}
	players.push(newPlayer);
	
	//Echo back this player's data:
	messageArray = ["login",player.id,player.color,player.name];
	updater(messageArray);
	
	//Echo back all this player's units
	/* for(var i=0;i<player.units.length;i++)
	{
		var unit = player.units[i];
		messageArray = ["createUnit",unit.type,player.id,unit.id,unit.row,unit.column];
		updater(messageArray);
	} */
}

function createUnitCommand(input)
{
	//message format: ["createUnit",unit.type,player.id,unit.id,row,column];
	
	unitType = input[1];
	playerID = input[2];
	unitID = input[3];
	unitRow = input[4];
	unitColumn = input[5];
	
	//find player:
	for(var i=0;i<players.length;i++)
	{
		if(players[i].id == playerID)
		{
			//create the unit
			players[i].createUnit(stage,map,unitType,unitRow,unitColumn);
			players[i].units[players[i].units.length-1].id = unitID;
		}
	}
}

function moveCommand(input)
{
	//alert(input);
	var unitID = input[1];
	newRow = input[2];
	newColumn = input[3];
	row = input[4];
	column = input[5];
	
	//get unit at row column
	var tile = map[row][column];
	var unit = null;
	for(var i=0;i<tile.stack.length;i++)
	{
		if(tile.stack[i].id == unitID)
		{
			unit = tile.stack[i];
			i = tile.stack.length;
		}
	}
	if(unit != null)
	{
		unit.move(stage,map,newRow,newColumn);
	}
}
