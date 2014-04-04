
//objects (they're like classes) (I think)

//Unit/Structure costs"
villagerFoodCost = 4;
villagerTimberCost = 0;
villagerStoneCost = 0;
villagerFoodUpKeep = 2;

warriorFoodCost = 4;
warriorTimberCost = 2;
warriorStoneCost = 1;
warriorFoodUpKeep = 4;

farmFoodCost = 0;
farmTimberCost = 2;
farmStoneCost = 0;

villageFoodCost = 0;
villageTimberCost = 8;
villageStoneCost = 4;

//base unit stats
villagerMaxMovementPoints = 4;
villagerMaxHealth = 1;
villagerDefense = 0;
villagerAttack = 0;

warriorMaxMovementPoints = 2;
warriorMaxHealth = 10;
warriorDefense = 2;
warriorAttack = 5;

//Resource Gathering Rates:
var farmCollectionRate = 4;
var timberCollectionRate = 2;
var stoneCollectionRate = 1;

//max village number:
var maxVillages = 3;

//error string
var error = "";

//test class
var Animal = function()
{
	this.type = "";
	this.name = "";
	this.age = 0;
	this.changeName = changeName;
	function changeName(newName)
	{
		this.name = newName;
	}
}

//Tile object
var Tile = function()
{
	this.type = "n/a";
	this.stack = [];
	
}

//Unit object
var Unit = function()
{
	this.id = Math.floor(Math.random()*1000000000);
	this.type = "n/a";
	this.row = 0;
	this.foodUpKeep = 0;
	this.column = 0;
	this.color = "n/a";
	this.image = null;
	this.owner = null;
	this.health = 0;
	this.maxHealth = 0;
	this.defense = 0;
	this.attack = 0;
	this.maxMovementPoints = 0;
	this.movementPoints = 0;
	this.shape = null;			//Unit's Easeljs graphics object
	this.move = move;
	this.remove = remove;
	function remove()
	{
		//find the index of this unit in the owner's unit array
		for(var i=0;i<this.owner.units.length;i++)
		{
			if(this.id == this.owner.units[i].id)
			{
				//remove it from the units array
				this.owner.units.splice(i,1);
			}
		}
		
		//remove this unit from the tile it was on
		var tile = map[this.row][this.column];
		for(var i = 0; i < tile.stack.length;i++)
		{
			if(tile.stack[i].id == this.id)
			{
				tile.stack.splice(i,1);
			}
		}
		
		//update player data
		
		if(this.owner.id == player.id)
		{
			this.owner.bank.foodRate += this.foodUpKeep;
		
			if(this.type == "villager")
			{
				this.owner.numVillagers--;
				if(tile.type == "forest")
				{
					this.owner.bank.timberRate -= timberCollectionRate;
				}
				else if(tile.type == "stone")
				{
					this.owner.bank.stoneRate -= stoneCollectionRate;
				}
			}
			else if(this.type == "warrior")
			{
				this.owner.numWarriors--;
			}
		}
		
		
		
		//remove the unit's shape from the canvas
		stage.removeChild(this.shape);
		stage.update();
		
	}
	
	function move(stage, map, newRow, newColumn)
	{
		
		
		if(this.movementPoints > 0)
		{
			//remove self from old tile's stack
			for(var i = 0 ; i < map[this.row][this.column].stack.length; i++)
			{
				//look for this unit in the tile's stack
				if(map[this.row][this.column].stack[i].id == this.id)
				{
					//found unit
					//remove the unit from the stack
					map[this.row][this.column].stack.splice(i,1);
				}
			}
			
			//check to see if resource rates need to be adjusted
			var oldTile = map[this.row][this.column];
			var newTile = map[newRow][newColumn];
			
			if(oldTile.type == "forest" && this.owner.id==player.id)
			{
				player.bank.timberRate -= timberCollectionRate;
			}
			else if(oldTile.type == "stone" && this.owner.id==player.id)
			{
				player.bank.stoneRate -= stoneCollectionRate;
			}
			
			if(newTile.type == "forest" && this.owner.id==player.id)
			{
				player.bank.timberRate += timberCollectionRate;
			}
			else if(newTile.type == "stone" && this.owner.id==player.id)
			{
				player.bank.stoneRate += stoneCollectionRate;
			}
			updateResources();
			
			//add self to new tile's stack
			map[newRow][newColumn].stack.push(this);
			
			
			this.row = newRow;
			this.column = newColumn;
			this.movementPoints--;
			
			this.shape.x = 4 + 24*this.column;
			this.shape.y = 54 + 24*this.row; 
			
			stage.update();
		}
	}
	this.displayInfo = displayInfo;
	function displayInfo(stage, sourcePlayer)
	{
		infoText = this.type+":";
		stage.getChildByName("IEtext").text = this.type+":";
		
		if(stage.getChildByName("infoLine1") == null)
		{
			//line 1
			var infoLine1 = new createjs.Text("MP: "+this.movementPoints+"/"+this.maxMovementPoints, "bold 9px Arial", "black");
			infoLine1.x = 15 + stage.getChildByName("IEtext").x + stage.getChildByName("IEtext").getMeasuredWidth();
			infoLine1.y = 1;
			infoLine1.name = "infoLine1";
			stage.addChild(infoLine1);
			
			//line 2
			var infoLine2 = new createjs.Text("Health: "+this.health+"/"+this.maxHealth, "bold 9px Arial", "black");
			infoLine2.x = stage.getChildByName("infoLine1").x;
			infoLine2.y = stage.getChildByName("infoLine1").y + stage.getChildByName("infoLine1").getMeasuredHeight();
			infoLine2.name = "infoLine2";
			stage.addChild(infoLine2);
			
			//line 3
			var infoLine3 = new createjs.Text("Attack: "+this.attack, "bold 9px Arial", "black");
			infoLine3.x = stage.getChildByName("infoLine2").x;
			infoLine3.y = stage.getChildByName("infoLine2").y + stage.getChildByName("infoLine2").getMeasuredHeight();
			infoLine3.name = "infoLine3";
			stage.addChild(infoLine3);
			
			//line 4
			var infoLine4 = new createjs.Text("Defense: "+this.defense, "bold 9px Arial", "black");
			infoLine4.x = stage.getChildByName("infoLine3").x;
			infoLine4.y = stage.getChildByName("infoLine3").y + stage.getChildByName("infoLine3").getMeasuredHeight();
			infoLine4.name = "infoLine4";
			stage.addChild(infoLine4);
		}
		else
		{
			var infoLine1 = stage.getChildByName("infoLine1");
			var infoLine2 = stage.getChildByName("infoLine2");
			var infoLine3 = stage.getChildByName("infoLine3");
			var infoLine4 = stage.getChildByName("infoLine4");
			infoLine1.text = "MP: "+this.movementPoints+"/"+this.maxMovementPoints;
			infoLine2.text = "Health: "+this.health+"/"+this.maxHealth;
			infoLine3.text = "Attack: "+this.attack;
			infoLine4.text = "Defense: "+this.defense;
			
		}
		
		//add buttons if necessary
		if(sourcePlayer.color == this.color && this.owner.onTurn == true && this.type == "villager")
		{
			displayBuildFarmButton(stage, "lightBlue");
			displayBuildVillageButton(stage, "lightBlue");
		}
		
		stage.update();
		
	}

}

//Structure object
var Structure = function()
{
	this.id = Math.floor(Math.random()*1000000000);
	this.owner = null;
	this.type = "n/a";
	this.row = 0;
	this.column = 0;
	this.color = "n/a";
	this.shape = null;		//Structure's Easeljs graphics object
	this.image = null;
	this.displayInfo = displayInfo;
	this.remove = remove;
	function remove()
	{
		//find the index of this structure in the owner's structures array
		for(var i=0;i<this.owner.structures.length;i++)
		{
			if(this.id == this.owner.structures[i].id)
			{
				//remove it from the structures array
				this.owner.structures.splice(i,1);
			}
		}
		
		//remove this structure from the tile it was on
		var tile = map[this.row][this.column];
		for(var i = 0; i < tile.stack.length;i++)
		{
			if(tile.stack[i].id == this.id)
			{
				tile.stack.splice(i,1);
			}
		}
		
		//update player data
		if(this.type == "village")
		{
			this.owner.numVillages--;
		}
		else if(this.type == "farm")
		{
			this.owner.numFarms--;
			this.owner.bank.foodRate -= farmCollectionRate;
		}
		
		//remove the unit's shape from the canvas
		stage.removeChild(this.shape);
		stage.update();
		
	}
	function displayInfo(stage, sourcePlayer)
	{
		infoText = this.type+":";
		stage.getChildByName("IEtext").text = this.type+":";
		
		
		//add buttons if necessary
		if(sourcePlayer.color == this.color && this.owner.onTurn == true && this.type == "village")
		{
			displayBuildVillagerButton(stage, "lightBlue");
			displayBuildWarriorButton(stage, "lightBlue");
		}
		
		
		
		stage.update()
		
	}
}

//Bank object
var Bank = function()
{
	this.food = 10 + villageFoodCost + villagerFoodCost;
	this.timber = villageTimberCost + villagerTimberCost;
	this.stone = villageStoneCost + villagerStoneCost;
	this.foodRate = 0;
	this.timberRate = 0;
	this.stoneRate = 0;
}

//Player object
var Player = function()
{
	this.id = Math.floor(Math.random()*1000000000);
	this.name = "n/a";
	this.color = "n/a";
	this.onTurn = false;
	this.bank = new Bank();
	this.numFarms = 0;
	this.numVillages = 0;
	this.numVillagers = 0;
	this.numWarriors = 0;
	this.units = [];
	this.structures = [];
	this.createUnit = createUnit;
	this.createStructure = createStructure;
	function createUnit(stage, map, unitType, row, column)
	{
		if(unitType == "villager")
		{
			createVillager(stage, map, this, row, column);
		}
		else if(unitType == "warrior")
		{
			createWarrior(stage, map, this, row, column);
		}
	}
	
	function createStructure(stage, map, structureType, row, column)
	{
		if(structureType == "farm")
		{
			createFarm(stage, map, this, row, column);
		}
		else if(structureType == "village")
		{
			createVillage(stage, map, this, row, column);
		}
	}
	
	function createVillage(stage, map, player, row, column)
	{
		var village = new Structure();
		village.owner = player;
		village.type = "village";
		village.row = row;
		village.column = column;
		village.color = player.color;
		
		village.image = new Image();
		if(village.color == "blue")
		{
			village.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/structures/blue/fe_hut_blue_0.png";
		}
		else if(village.color == "red")
		{
			village.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/structures/red/fe_hut_red_0.png";
		}
		village.image.onload = 	function()
							{
								village.shape = new createjs.Bitmap(this);
								village.shape.x = 24*village.column;
								village.shape.y = 50 + 24*village.row;
								village.shape.name = "village"+village.id;
								stage.addChild(village.shape);
								
								stage.update();
							}
		
		
		player.structures.push(village);
		player.numVillages++;
		player.bank.food -= villageFoodCost;
		player.bank.timber -= villageTimberCost;
		player.bank.stone -= villageStoneCost;
		updateResources();
		map[row][column].stack.push(village);
	}
	
	function createFarm(stage, map, player, row, column)
	{
		var farm = new Structure();
		farm.type = "farm";
		farm.owner = player;
		farm.row = row;
		farm.column = column;
		farm.color = player.color;
		
		farm.image = new Image();
		if(farm.color == "blue")
		{
			farm.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/structures/blue/fe_farm_0.png";
		}
		else if(farm.color == "red")
		{
			farm.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/structures/red/fe_farm_0.png";
		}
		farm.image.onload = 	function()
							{
								farm.shape = new createjs.Bitmap(this);
								farm.shape.x = 24*farm.column;
								farm.shape.y = 50 + 24*farm.row;
								farm.shape.name = "farm"+farm.id;
								stage.addChild(farm.shape);
								
								stage.update();
							}
		
		
		player.structures.push(farm);
		player.numFarms++;
		player.bank.foodRate += farmCollectionRate;
		player.bank.food -= farmFoodCost;
		player.bank.timber -= farmTimberCost;
		player.bank.stone -= farmStoneCost;
		updateResources();
		map[row][column].stack.push(farm);
	}
	
	function createWarrior(stage, map, player, row, column)
	{	
		
		var warrior = new Unit();
		warrior.type = "warrior";
		warrior.owner = player;
		warrior.foodUpKeep = warriorFoodUpKeep;
		warrior.row = row;
		warrior.column = column;
		warrior.color = player.color;
		//warrior image Location = "http://students.cse.tamu.edu/tjb33/assets/sprites/units/blue/warrior_1_blue.png";
		warrior.health = warriorMaxHealth;
		warrior.maxHealth = warriorMaxHealth;
		warrior.defense = warriorDefense;
		warrior.attack = warriorAttack;
		warrior.maxMovementPoints = warriorMaxMovementPoints;
		warrior.movementPoints = warrior.maxMovementPoints;
		
		warrior.image = new Image();
		warrior.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/units/blue/Warrior_0_blue.png";
		if(warrior.color == "blue")
		{
			warrior.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/units/blue/Warrior_0_blue.png";
		}
		else if(warrior.color == "red")
		{
			warrior.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/units/red/Warrior_0_red.png";
		}
		warrior.image.onload = 	function()
							{
								warrior.shape = new createjs.Bitmap(this);
								warrior.shape.x = 4 + 24*warrior.column;
								warrior.shape.y = 54 + 24*warrior.row;
								warrior.shape.name = "warrior"+warrior.id;
								stage.addChild(warrior.shape);
								
								stage.update();
							}
		
		
		player.units.push(warrior);
		player.numWarriors++;
		player.bank.foodRate -= warriorFoodUpKeep;
		player.bank.food -= warriorFoodCost;
		player.bank.timber -= warriorTimberCost;
		player.bank.stone -= warriorStoneCost;
		updateResources();
		map[row][column].stack.push(warrior);
	}
	
	function createVillager(stage, map, player, row, column)
	{	
		
		var villager = new Unit();
		villager.type = "villager";
		villager.owner = player;
		villager.foodUpKeep = villagerFoodUpKeep;
		villager.row = row;
		villager.column = column;
		villager.color = player.color;
		//villager image Location = "http://students.cse.tamu.edu/tjb33/assets/sprites/units/blue/Villager_1_blue.png";
		villager.health = villagerMaxHealth;
		villager.maxHealth = villagerMaxHealth;
		villager.defense = villagerDefense;
		villager.attack = 0;
		villager.maxMovementPoints = villagerMaxMovementPoints;
		villager.movementPoints = villager.maxMovementPoints;
		
		villager.image = new Image();
		villager.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/units/blue/Villager_1_blue.png";
		if(villager.color == "blue")
		{
			villager.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/units/blue/Villager_1_blue.png";
		}
		else if(villager.color == "red")
		{
			villager.image.src = "http://students.cse.tamu.edu/tjb33/assets/sprites/units/red/Villager_1_red.png";
		}
		villager.image.onload = 	function()
							{
								villager.shape = new createjs.Bitmap(this);
								villager.shape.x = 4 + 24*villager.column;
								villager.shape.y = 54 + 24*villager.row;
								villager.shape.name = "villager"+villager.id;
								stage.addChild(villager.shape);
								
								stage.update();
							}
		
		
		player.units.push(villager);
		player.numVillagers++;
		player.bank.foodRate -= villagerFoodUpKeep;
		player.bank.food -= villagerFoodCost;
		player.bank.timber -= villagerTimberCost;
		player.bank.stone -= villagerStoneCost;
		updateResources();
		map[row][column].stack.push(villager);
	}
}

//Game object
var Game = function()
{
this.players = [];
this.map = [];
this.nurnNum = 0;
}

//button functions

function displayBuildWarriorButton(stage, color)
{
	if(stage.getChildByName("BuildWarriorButton") != null)
	{
		stage.removeChild(stage.getChildByName("BuildWarriorButton"));
		stage.removeChild(stage.getChildByName("buildWarriortext"));
	}

	var BuildWarriorButton = new createjs.Shape();
	BuildWarriorButton.graphics.beginFill(color).drawRect(0, 0, 83, 18);
	BuildWarriorButton.x = 10 + stage.getChildByName("buildVillagertext").x + stage.getChildByName("buildVillagertext").getMeasuredWidth();
	BuildWarriorButton.y = 10;
	BuildWarriorButton.name = "BuildWarriorButton";
	BuildWarriorButton.color = color;
	stage.addChild(BuildWarriorButton);
	
	BuildWarriorButton.on("click", handleBWMouseEvent);
	BuildWarriorButton.on("mouseover", handleBWMouseEvent);
	BuildWarriorButton.on("mouseout", handleBWMouseEvent);
	
	//Build Farm button text
	var buildWarriortext = new createjs.Text("Build Warrior", "bold 12px Arial", "black");
	buildWarriortext.x = 4 + BuildWarriorButton.x;
	buildWarriortext.y = 1 + BuildWarriorButton.y;
	buildWarriortext.name = "buildWarriortext";
	stage.addChild(buildWarriortext);
}

function displayBuildVillagerButton(stage, color)
{
	if(stage.getChildByName("BuildVillagerButton") != null)
	{
		stage.removeChild(stage.getChildByName("BuildVillagerButton"));
		stage.removeChild(stage.getChildByName("buildVillagertext"));
	}

	var BuildVillagerButton = new createjs.Shape();
	BuildVillagerButton.graphics.beginFill(color).drawRect(0, 0, 83, 18);
	BuildVillagerButton.x = 10 + stage.getChildByName("IEtext").x + stage.getChildByName("IEtext").getMeasuredWidth();
	BuildVillagerButton.y = 10;
	BuildVillagerButton.name = "BuildVillagerButton";
	BuildVillagerButton.color = color;
	stage.addChild(BuildVillagerButton);
	
	BuildVillagerButton.on("click", handleBVgrMouseEvent);
	BuildVillagerButton.on("mouseover", handleBVgrMouseEvent);
	BuildVillagerButton.on("mouseout", handleBVgrMouseEvent);
	
	//Build Farm button text
	var buildVillagertext = new createjs.Text("Build Villager", "bold 12px Arial", "black");
	buildVillagertext.x = 4 + BuildVillagerButton.x;
	buildVillagertext.y = 1 + BuildVillagerButton.y;
	buildVillagertext.name = "buildVillagertext";
	stage.addChild(buildVillagertext);
}


function displayBuildFarmButton(stage, color)
{
	if(stage.getChildByName("BuildFarmButton") != null)
	{
		stage.removeChild(stage.getChildByName("BuildFarmButton"));
		stage.removeChild(stage.getChildByName("BFtext"));
	}

	var BuildFarmButton = new createjs.Shape();
	BuildFarmButton.graphics.beginFill(color).drawRect(0, 0, 70, 18);
	BuildFarmButton.x = 30 + stage.getChildByName("infoLine1").x + stage.getChildByName("infoLine1").getMeasuredWidth();
	BuildFarmButton.y = 5 + stage.getChildByName("infoLine1").y;
	BuildFarmButton.name = "BuildFarmButton";
	BuildFarmButton.color = color;
	stage.addChild(BuildFarmButton);
	
	BuildFarmButton.on("click", handleBFMouseEvent);
	BuildFarmButton.on("mouseover", handleBFMouseEvent);
	BuildFarmButton.on("mouseout", handleBFMouseEvent);
	
	//Build Farm button text
	var BFtext = new createjs.Text("Build Farm", "bold 12px Arial", "black");
	BFtext.x = 4 + BuildFarmButton.x;
	BFtext.y = 1 + BuildFarmButton.y;
	BFtext.name = "BFtext";
	stage.addChild(BFtext);
}

function displayBuildVillageButton(stage, color)
{
	if(stage.getChildByName("BuildVillageButton") != null)
	{
		stage.removeChild(stage.getChildByName("BuildVillageButton"));
		stage.removeChild(stage.getChildByName("BVtext"));
	}

	var BuildVillageButton = new createjs.Shape();
	BuildVillageButton.graphics.beginFill(color).drawRect(0, 0, 78, 18);
	BuildVillageButton.x = 10 + stage.getChildByName("BuildFarmButton").x + 70;
	BuildVillageButton.y = stage.getChildByName("BuildFarmButton").y;
	BuildVillageButton.name = "BuildVillageButton";
	BuildVillageButton.color = color;
	stage.addChild(BuildVillageButton);
	
	BuildVillageButton.on("click", handleBVMouseEvent);
	BuildVillageButton.on("mouseover", handleBVMouseEvent);
	BuildVillageButton.on("mouseout", handleBVMouseEvent);
	
	//Build Farm button text
	var BVtext = new createjs.Text("Build Village", "bold 12px Arial", "black");
	BVtext.x = 4 + BuildVillageButton.x;
	BVtext.y = 1 + BuildVillageButton.y;
	BVtext.name = "BVtext";
	stage.addChild(BVtext);
}

function handleBWMouseEvent(evt)
{
	
	var BuildWarriorButton = stage.getChildByName("BuildWarriorButton");
	
	if(evt.type == "click")
	{
		if(canBuild("warrior"))
		{
			//build warrior
			player.createUnit(stage,map,"warrior", selectedObject.row, selectedObject.column);
			
			//tell everyone else you built this
			var unit = player.units[player.units.length-1];
			messageArray = ["createUnit",unit.type,player.id,unit.id,unit.row,unit.column];
			updater(messageArray);
		}
		else
		{
			alert(error);
		}
	}
	if(evt.type == "mouseover")
	{
		displayBuildWarriorButton(stage, "blue");
		stage.update();
	}
	if(evt.type == "mouseout")
	{
		displayBuildWarriorButton(stage, "lightBlue");
		stage.update();
	}
	
}

function handleBVgrMouseEvent(evt)
{
	
	var BuildVillagerButton = stage.getChildByName("BuildVillagerButton");
	
	if(evt.type == "click")
	{
		if(canBuild("villager"))
		{
			//build villager
			player.createUnit(stage,map,"villager", selectedObject.row, selectedObject.column);
			
			//tell everyone else you built this
			var unit = player.units[player.units.length-1];
			messageArray = ["createUnit",unit.type,player.id,unit.id,unit.row,unit.column];
			updater(messageArray);
		}
		else
		{
			alert(error);
		}
	}
	if(evt.type == "mouseover")
	{
		displayBuildVillagerButton(stage, "blue");
		stage.update();
	}
	if(evt.type == "mouseout")
	{
		displayBuildVillagerButton(stage, "lightBlue");
		stage.update();
	}
	
}

function handleBVMouseEvent(evt)
{
	
	var BuildVillageButton = stage.getChildByName("BuildVillageButton");
	
	if(evt.type == "click")
	{
		if(canBuild("village"))
		{
			//build village
			player.createStructure(stage,map,"village", selectedUnit.row, selectedUnit.column);
		
			//tell everyone else you built this
			var structure = player.structures[player.structures.length-1];
			messageArray = ["createStructure",structure.type,player.id,structure.id,structure.row,structure.column];
			updater(messageArray);
		}
		else
		{
			alert(error);
		}
	}
	if(evt.type == "mouseover")
	{
		displayBuildVillageButton(stage, "blue");
		stage.update();
	}
	if(evt.type == "mouseout")
	{
		displayBuildVillageButton(stage, "lightBlue");
		stage.update();
	}
	
}

function handleBFMouseEvent(evt)
{
	
	var BuildFarmButton = stage.getChildByName("BuildFarmButton");
	
	if(evt.type == "click")
	{
		if(canBuild("farm"))
		{
			//build farm
			player.createStructure(stage,map,"farm", selectedUnit.row, selectedUnit.column);
			
			//tell everyone else you built this
			var structure = player.structures[player.structures.length-1];
			messageArray = ["createStructure","farm",player.id,structure.id,structure.row,structure.column];
			updater(messageArray);
		}
		else
		{
			alert(error);
		}
	}
	if(evt.type == "mouseover")
	{
		displayBuildFarmButton(stage, "blue");
		stage.update();
	}
	if(evt.type == "mouseout")
	{
		displayBuildFarmButton(stage, "lightBlue");
		stage.update();
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
