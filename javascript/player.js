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
		
		//organize children
		organizeChildren();
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
		//organize children
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
								organizeChildren();
								organizeChildren();
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
								organizeChildren();
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
								organizeChildren();
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
								organizeChildren();
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
