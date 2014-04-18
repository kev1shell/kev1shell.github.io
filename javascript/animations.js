var snowing = false;
var particles = [];
var refreshPeriod = 42;

function stopSnow()
{
	snowing = false;
}

function snow()
{
	var numParticles = 20;
	particles = [];
	
	//release snow variable
	snowing = true;
	
	//generate snow particles
	for(var i=0;i<numParticles;i++)
	{
		//particle radius
		var radius = Math.floor(Math.random()*5) + 5;
		//particle shape
		var particle = new createjs.Shape();
		particle.graphics.beginFill("white").drawCircle(0, 0, radius);
		particle.x = Math.floor(Math.random()*840);;
		particle.y = 50;
		particle.name = "particle"+i;
		stage.addChild(particle);
		particles.push(particle);
	}
	
	//animateSnow();
}

function animateSnow()
{
	var fallRate = 1;
	
	while(snowing == true)
	{
		for(var i=0;i<particles.length;i++)
		{
			particles[i].y = particles[i].y - fallRate;
		}
		stage.update();
		//window.setTimeout(animateSnow, refreshPeriod);
	}
}