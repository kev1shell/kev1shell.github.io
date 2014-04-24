var snowing = false;
var particles = [];
var refreshPeriod = 42;
var numParticles = 100;

function snowHandler()
{
	if(snowing == true)
	{
		animateSnow();
	}
	else
	{
		var updateStage = false;
		for(var i=0;i<particles.length;i++)
		{
			//particles[i].uncache();
			updateStage = true;
			stage.removeChild(particles[i]);
		}
		if (updateStage == true)
		{
			stage.update();
		}
	}
}

function stopSnow()
{
	snowing = false;
	//remove particles
	for(var i=0;i<particles.length;i++)
	{
		//particles[i].uncache();
		stage.removeChild(particles[i]);
	}
	stage.update();
}

function pauseSnow()
{
	var result = [];
	var xPositions = [];
	var yPositions = [];
	var radii = [];
	var xDirections = [];
	
	for(var i=0;i<particles.length;i++)
	{
		xPositions.push(particles[i].x);
		yPositions.push(particles[i].y);
		radii.push(particles[i].radius);
		xDirections.push(particles[i].xDirection);
	}
	
	result = [xPositions,yPositions,radii,xDirections];
	stopSnowing();
	return result;
}

function resumeSnow(pausedParticles)
{
	var xPositions = pausedParticles[0];
	var yPositions = pausedParticles[1];
	var radii = pausedParticles[2];
	var xDirections = pausedParticles[3];
	
	particles = [];
	for(var i=0;i<xPositions.length;i++)
	{
		resumeSnowParticle(xPositions[i],yPositions[i],radii[i],xDirections[i]);
	}
	cacheStage();
	snowing = true;
}

function resumeSnowParticle(x,y,radius,dir)
{
	//particle radius
	//var radius = radius;
	//particle shape
	var particle = new createjs.Shape();
	particle.graphics.beginFill("white").drawCircle(0, 0, radius);
	particle.x = x;
	particle.y = y;
	particle.xDirection = dir;
	//particle.yStop =  Math.floor(Math.random()*422) + 10;
	particle.name = "particle"+particles.length;
	stage.addChild(particle);
	particles.push(particle);
	
	//particle.cache(-radius, -radius, radius * 2, radius * 2);
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
	particle.radius = radius;
	particle.xDirection = Math.floor(Math.random()*3) -1;
	//particle.yStop =  Math.floor(Math.random()*422) + 10;
	particle.name = "particle"+particles.length;
	stage.addChild(particle);
	particles.push(particle);
	
	//particle.cache(-radius, -radius, radius * 2, radius * 2);
}

var caching = false;
function cacheStage()
{
	
	if(caching == false)
	{
		return;
	}
	
	
	for(var i=0;i<stage.children.length;i++)
	{
		var shape = stage.getChildAt(i);
		if(shape.getBounds() != null)
		{
			shape.cache(0, 0, shape.getBounds().width*2, shape.getBounds().height*2);
		}
	}
	stage.update();
}

function snow()
{
	particles = [];
	
	//release snow variable
	snowing = true;
	
	cacheStage();
	
	//generate snow particles
	/* for(var i=0;i<numParticles;i++)
	{
		createSnowParticle();
	} */
	
	//animateSnow();
}

var snowRender = true;

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
				var particle = particles[i];
				particle.x = Math.floor(Math.random()*840);
				particle.y = 50;
				particle.xDirection = Math.floor(Math.random()*3) -1;
				//particle.yStop =  Math.floor(Math.random()*422) + 10;
			}
		}
		
		if(snowRender)
		{
			stage.update();
		}
		snowRender = !snowRender;
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