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



