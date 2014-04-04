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