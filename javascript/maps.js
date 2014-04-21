//maps and accessor functions

//survivor island
var survivorIsland = new Array();

survivorIsland[0] = new Array("water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water");
survivorIsland[1] = new Array("water","forest","mountains","forest","grass","grass","grass","grass","grass","grass","mountains","forest","desert","desert","desert","desert","desert","desert","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","forest","forest","mountains","mountains","water");
survivorIsland[2] = new Array("water","forest","forest","mountains","grass","grass","grass","forest","grass","grass","forest","mountains","forest","desert","desert","desert","desert","grass","grass","grass","grass","grass","grass","forest","grass","grass","grass","grass","forest","grass","grass","forest","forest","mountains","water");
survivorIsland[3] = new Array("water","grass","mountains","forest","grass","grass","forest","grass","grass","grass","grass","mountains","forest","desert","desert","desert","desert","grass","grass","grass","grass","grass","grass","grass","forest","grass","grass","grass","grass","grass","stone","grass","forest","forest","water");
survivorIsland[4] = new Array("water","forest","stone","grass","grass","grass","grass","grass","grass","grass","grass","grass","mountains","desert","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","water");
survivorIsland[5] = new Array("water","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","forest","mountains","grass","grass","grass","grass","grass","forest","grass","grass","grass","grass","water");
survivorIsland[6] = new Array("water","grass","grass","grass","grass","grass","grass","grass","forest","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","forest","mountains","forest","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","water");
survivorIsland[7] = new Array("water","grass","grass","forest","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","stone","grass","grass","mountains","forest","grass","grass","grass","forest","grass","grass","grass","grass","grass","grass","grass","water");
survivorIsland[8] = new Array("water","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","forest","grass","grass","grass","grass","stone","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","water");
survivorIsland[9] = new Array("water","grass","grass","grass","grass","grass","forest","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","forest","forest","grass","grass","water");
survivorIsland[10] = new Array("water","grass","grass","grass","grass","grass","grass","grass","grass","grass","forest","grass","grass","grass","grass","forest","forest","forest","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","water");
survivorIsland[11] = new Array("water","grass","grass","forest","forest","grass","grass","grass","grass","forest","grass","grass","grass","grass","grass","forest","forest","grass","grass","grass","forest","grass","grass","grass","forest","grass","grass","grass","grass","grass","grass","grass","forest","grass","water");
survivorIsland[12] = new Array("water","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","forest","mountains","grass","grass","grass","grass","grass","grass","grass","grass","grass","forest","grass","grass","stone","forest","mountains","forest","grass","grass","water");
survivorIsland[13] = new Array("water","grass","grass","grass","forest","forest","stone","grass","grass","grass","grass","grass","grass","grass","forest","grass","grass","grass","grass","grass","forest","mountains","desert","grass","grass","grass","grass","grass","grass","forest","forest","mountains","grass","grass","water");
survivorIsland[14] = new Array("water","grass","grass","forest","forest","mountains","forest","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","forest","forest","mountains","desert","desert","grass","grass","grass","grass","grass","grass","grass","forest","mountains","forest","grass","water");
survivorIsland[15] = new Array("water","grass","grass","forest","forest","mountains","mountains","grass","grass","grass","forest","grass","grass","grass","grass","grass","grass","grass","mountains","mountains","desert","desert","desert","grass","grass","grass","forest","grass","grass","grass","grass","forest","mountains","grass","water");
survivorIsland[16] = new Array("water","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","desert","desert","desert","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","water");
survivorIsland[17] = new Array("water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water");


function loadSurvivorIslandMap()
{
	var outputArray = [];
	
	for(var row = 0; row < survivorIsland.length; row++)
	{
		var newRow = [];
		for(var column = 0; column < survivorIsland[row].length; column++)
		{
			tile = new Tile();
			tile.type = survivorIsland[row][column];
			newRow.push(tile);
		}
		outputArray.push(newRow);
	}
	return outputArray;
}

function loadMapNoSnow()
{
	mapElement.src = "http://kev1shell.github.io/assets/maps/survivorIsland3.png";
}

function loadMapLightSnow()
{
	mapElement.src = "http://kev1shell.github.io/assets/maps/survivorIsland3_snow_light.png";
	
	//window.setTimeout(organizeChildren, 500);
}

function loadMapMediumSnow()
{
	mapElement.src = "http://kev1shell.github.io/assets/maps/survivorIsland3_snow_medium.png";
	
	//window.setTimeout(organizeChildren, 500);
}

function loadMapHeavySnow()
{
	mapElement.src = "http://kev1shell.github.io/assets/maps/survivorIsland3_snow_heavy.png";
	
	//window.setTimeout(organizeChildren, 500);
}
