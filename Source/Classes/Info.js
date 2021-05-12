class Info{
	constructor(x,y,name,colour, title) {
		this.x=x;
		this.y=y;

		this.colour=colour;
		this.margin=40;
		this.name=name;
		this.title=title;
		this.displayed=true;

		this.textDisplayed=false;

		this.information=['Spacebar - Play/Pause', 
		'Left Arrow - Previous song', 
		'Right Arrow - Next song', 
		'F - Fullscreen toggle', 
		'P - Player toggle',
		'M - Menu toggle', 
		'1/2/3/4 - Individual toggle', 
		'R - Reposition menu'];
		//(if wanted to use this for different information)
		//constructor could have another parameter called "lines" or "information" and take in an array)
		this.tips=['Press M to start playing with effect menus.',
		'You can drag the menus by the numbered circles. (after pressing M)',
		'Use individual toggle to only have chosen menus on screen.']
	}
	
	hover() {
		this.textDisplayed = Math.hypot(this.x - mouseX, this.y - mouseY) < this.margin;
	}
	
	drawObject() {
		if (this.displayed) {
			this.hover();

			push();

			textSize(32);
			//stroke(8);
			fill(this.colour);
			ellipse(this.x,this.y, 3/2*this.margin);
			fill("#000");
			textAlign(CENTER,CENTER);
			text(this.name,this.x,this.y);
			
			if (this.textDisplayed){

				translate(width/2,height/2-100);

				stroke(this.colour);
				strokeWeight(12);
				rectMode(CENTER, CENTER); // Set rectMode to CENTER
				fill("#000"); // Set fill to semi opaque white

				rect(0, 0, this.margin*10, this.margin*(this.information.length+4), 20);

				//TITLE + information
				fill(this.colour);
				noStroke();
				textSize(64);
				text(this.title, 0, this.margin*(-this.information.length/2));


				textSize(24);

				for (let i=0; i<this.information.length; i++) {
					text(this.information[i], 0, this.margin*3/2+this.margin*(-this.information.length/2)+40*i);
				}
				
				//TIPS to include
				fill(0);
				noStroke();
				rect(0,height*1/3+50,width/2,60*this.tips.length,20);
				for (let i=0; i<this.tips.length; i++) {
					noStroke();
					fill(120);
					text(this.tips[i],0,height*1/3+50*i);
				}
			}
			pop();
		}
	}
}