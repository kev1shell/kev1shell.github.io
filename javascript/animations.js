var snowing = false;
var particles = [];
var refreshPeriod = 42;
var numParticles = 20;

function stopSnow()
{
	snowing = false;
}

function snow()
{
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
	
	animateSnow();
}

function animateSnow()
{
	var fallRate = 1;
	
	if(snowing == true)
	{
		for(var i=0;i<numParticles;i++)
		{
			particles[i].y = particles[i].y + fallRate;
			
			if(particles[i].y >= stage.getBounds().height)
			{
				particles[i].y = 50;
			}
		}
		stage.update();
		window.setTimeout(animateSnow, refreshPeriod);
	}
	
}