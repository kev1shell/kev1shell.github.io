var snowing = false;
var particles = [];
var refreshPeriod = 42;
var numParticles = 20;

function stopSnow()
{
	snowing = false;
}

function createSnowParticle()
{
	//particle radius
	var radius = Math.floor(Math.random()*5) + 5;
	//particle shape
	var particle = new createjs.Shape();
	particle.graphics.beginFill("white").drawCircle(0, 0, radius);
	particle.x = Math.floor(Math.random()*840);;
	particle.y = 50;
	particle.name = "particle"+particles.length;
	stage.addChild(particle);
	particles.push(particle);
}

function snow()
{
	particles = [];
	
	//release snow variable
	snowing = true;
	
	//generate snow particles
	/* for(var i=0;i<numParticles;i++)
	{
		createSnowParticle();
	} */
	
	animateSnow();
}

function animateSnow()
{
	var fallRate = 1;
	
	if(snowing == true)
	{
		if(particles.length < numParticles && Math.floor(Math.random()*100) >= 50)
		{
			createSnowParticle();
		}
		
		for(var i=0;i<particles.length;i++)
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
	else
	{
		//remove particles
		for(var i=0;i<particles.length;i++)
		{
			stage.removeChild(particles[i]);
		}
		stage.update();
	}
	
}