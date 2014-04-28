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
				
				if(map[this.row][this.column].stack.length < 2)
				{
					removeStackSymbol(this.row,this.column);
				}
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
					
					//check to see if stack is less than 2, if so remove stack symbol
					if(map[this.row][this.column].stack.length < 2)
					{
						removeStackSymbol(this.row,this.column);
					}
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
			
			//check to see if a new stack has been created:
			var stackSymbolName = "stackSymbol"+newRow+newColumn;
			if(map[newRow][newColumn].stack.length == 2 && stage.getChildByName(stackSymbolName) == null)
			{
				addStackSymbol(newRow,newColumn);
				organizeChildren();
			}
			
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
			var infoLine1 = new createjs.Text("Moves: "+this.movementPoints+"/"+this.maxMovementPoints, "bold 9px Arial", "black");
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
			
			//line 5
			var infoLine5 = new createjs.Text("Food/turn: "+this.foodUpKeep, "bold 9px Arial", "black");
			infoLine5.x = stage.getChildByName("infoLine4").x;
			infoLine5.y = stage.getChildByName("infoLine4").y + stage.getChildByName("infoLine4").getMeasuredHeight();
			infoLine5.name = "infoLine5";
			stage.addChild(infoLine5);
		}
		else
		{
			var infoLine1 = stage.getChildByName("infoLine1");
			var infoLine2 = stage.getChildByName("infoLine2");
			var infoLine3 = stage.getChildByName("infoLine3");
			var infoLine4 = stage.getChildByName("infoLine4");
			infoLine1.text = "Moves: "+this.movementPoints+"/"+this.maxMovementPoints;
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

function handleBVMouseEvent(evt)
{
	
	var BuildVillageButton = stage.getChildByName("BuildVillageButton");
	
	if(evt.type == "click")
	{
		removeObjectCost();
		displayObjectCost("village");
		
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
			displayWarning(error);
		}
	}
	if(evt.type == "mouseover")
	{
		displayBuildVillageButton(stage, "blue");
		displayObjectCost("village");
		stage.update();
	}
	if(evt.type == "mouseout")
	{
		displayBuildVillageButton(stage, "lightBlue");
		removeObjectCost();
		stage.update();
	}
	cacheStage();
}

function handleBFMouseEvent(evt)
{
	
	var BuildFarmButton = stage.getChildByName("BuildFarmButton");
	
	if(evt.type == "click")
	{
		
		removeObjectCost();
		displayObjectCost("farm");
		
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
			displayWarning(error);
		}
	}
	if(evt.type == "mouseover")
	{
		displayBuildFarmButton(stage, "blue");
		displayObjectCost("farm");
		stage.update();
	}
	if(evt.type == "mouseout")
	{
		displayBuildFarmButton(stage, "lightBlue");
		removeObjectCost();
		stage.update();
	}
	cacheStage();
}


