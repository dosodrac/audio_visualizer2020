class Player extends EffectsMenu {
	constructor(inix, iniy,width,height, songList, col, title, key) {
		super([], title, key, col, inix, iniy);
		this.w=width;
		this.h=height;
		this.margin=40;

		this.inverse="#000";

		this.displayed=false;
		this.state=null; //Loading/Playing/Paused?
	}

	drawObject() { //draws full player maybe includes main outline
		if (this.displayed) {
			push();
			rectMode(CENTER);
			strokeWeight(8);
			stroke(this.col);
			fill("#000");
			rect(this.inix, this.iniy+this.h/2,this.w+this.margin, this.h, 10);

			//ellipse/pivot to drag
			fill(this.col);
			ellipse(this.inix,this.iniy,this.margin*2);

			//TEXT menu
			fill("#000");
			textSize(50);
			noStroke();
			textAlign(CENTER,CENTER);
			text(this.key,this.inix,this.iniy);

			fill(this.col);
			text(this.title, this.inix, this.iniy+2*this.margin);

			this.songDisplay();

			this.playButton();
			this.currentState();

			this.skipButton();

			pop();
		}
	}

	songDisplay() { //will display state of current song also the current song details
		//state draw
		rect(this.inix, this.iniy+150, this.w-this.margin/2, 80, 10);
		fill(this.inverse);
		this.currentState();
		textSize(28);
		text(this.state, this.inix, this.iniy+150);

		//author sng name
		textSize(23);
		fill(this.col);
		text(songList[currentSong].name, this.inix, this.iniy+258);
		textSize(24);
		text(songList[currentSong].artist, this.inix, this.iniy+220);
		textSize(40);
		text("_", this.inix, this.iniy+220);
	}

	currentState(){ //changes the state so it shows whether it's loading, playing or paused
	//+draws icons of play button
		push();
		fill(this.inverse);
		if (songLoading) {
			this.state="Loading";
			textSize(20);
			text(songLoadingProgress, this.inix, this.iniy+345);
		}
		else if (playsNow.isPlaying()) {
			this.state="Playing\n" + toStandardFormat(playsNow.currentTime()) + " / " + toStandardFormat(playsNow.duration());

			rect(this.inix-10, this.iniy+340, 10, 40);
			rect(this.inix+10, this.iniy+340, 10, 40);
		}
		else {
			this.state = frameCount % 240 > 120 ? "Paused" : toStandardFormat(playsNow.currentTime()) + " / " + toStandardFormat(playsNow.duration());;
			triangle(this.inix-15, this.iniy+320,
				this.inix-15, this.iniy+360, 
				this.inix+18, this.iniy+340)
		}
		pop();
	}

	playButton() { //play button frame or border
		//draw frame or border
		fill(this.col);
		rect(this.inix, this.iniy+340, 90, 90, 10);
	}

	skipButton() { //prev/next button
		noFill();
		stroke(this.col);
		rect(this.inix-90, this.iniy+340, 60, 60, 10);
		rect(this.inix+90, this.iniy+340, 60, 60, 10);

		strokeWeight(6);
		line(this.inix-100, this.iniy+350, this.inix-100, this.iniy+330);
		line(this.inix+100, this.iniy+350, this.inix+100, this.iniy+330);

		fill(this.col);
		triangle(this.inix-95, this.iniy+340,
			this.inix-80, this.iniy+350,
			this.inix-80, this.iniy+330);
		triangle(this.inix+95, this.iniy+340,
			this.inix+80, this.iniy+350,
			this.inix+80, this.iniy+330);
	}

}

//calculates and shows time in the format wanted mm:ss
function toStandardFormat(seconds) {
	return moment().startOf('day')
		.seconds(seconds)
		.format('mm:ss');
}