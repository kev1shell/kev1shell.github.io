var snowing = false;
var particles = [];
var refreshPeriod = 42;
var numParticles = 100;

function stopSnow()
{
	snowing = false;
	//remove particles
	for(var i=0;i<particles.length;i++)
	{
		particles[i].uncache();
		stage.removeChild(particles[i]);
	}
	stage.update();
}

function createSnowParticle()
{
	//particle radius
	var radius = Math.floor(Math.random()*5) + 1;
	//particle shape
	var particle = new createjs.Shape();
	particle.graphics.beginFill("white").drawCircle(0, 0, radius);
	particle.x = Math.floor(Math.random()*840);
	particle.y = 50;
	particle.xDirection = Math.floor(Math.random()*3) -1;
	particle.name = "particle"+particles.length;
	stage.addChild(particle);
	particles.push(particle);
	
	particle.cache(-radius, -radius, radius * 2, radius * 2);
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
	
	//animateSnow();
}

function animateSnow()
{
	var fallRate = 1;
	
	if(snowing == true)
	{
		if(particles.length < numParticles && Math.floor(Math.random()*100) <= 20)
		{
			createSnowParticle();
		}
		
		for(var i=0;i<particles.length;i++)
		{
			particles[i].y = particles[i].y + fallRate;
			particles[i].x = particles[i].x + fallRate*particles[i].xDirection;
			
			if(particles[i].y >= stage.getBounds().height || particles[i].x >= stage.getBounds().width || particles[i].x < 0)
			{
				particles[i].uncache();
				stage.removeChild(particles[i]);
				particles.splice(i,1);
			}
		}
		stage.update();
		//window.setTimeout(animateSnow, refreshPeriod);
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