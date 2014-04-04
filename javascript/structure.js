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