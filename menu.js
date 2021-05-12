"use strict";

console.log("menu.js body loading");
function setup() {
	console.log("setup ran");
	createCanvas(windowWidth,windowHeight);

	//MENU INITIALISATION/CREATION
	player = new Player(width*6/7, 80, 300, 420, songList, "#c778ff", "Player", "P");

	//David's EFFECTS
	let dc1 = new ButtonEffect(null,null,200,60,"#ff9645","Hypnosis", new Hypnosis());//#fad55F
	let dc2 = new ButtonEffect(null,null,200,60,"#ff9645","Bounce", new Bounce());//#ffce2e"
	let dc3 = new ButtonEffect(null,null,200,60,"#ff9645","Space", new Space());
	DCMenu = new EffectsMenu([dc1,dc2,dc3], "DC", 1, "#ff9645", map(0,0,3,width/4,3/4*width), height-55);

	//Mary's EFFECTS
	let ms1 = new ButtonEffect(null,null,200,60,"#ffff45","Confetti", new Confetti());//#fad55F
	let ms2 = new ButtonEffect(null,null,200,60,"#ffff45","Tunnel", new Tunnel());
	let ms3 = new ButtonEffect(null,null,200,60,"#ffff45","Sun", new Sun());
	let ms4 = new ButtonEffect(null,null,200,60,"#ffff45","Radial", new Radial());
	MSMenu = new EffectsMenu([ms1,ms2,ms3,ms4], "MS", 2, "#ffff45", map(1,0,3,width/4,3/4*width), height-55);

	//Sorana's EFFECTS
	let sim1 = new ButtonEffect(null,null,200,60,"#45ffa5","Polar", new Polar()); //Polar graphs
	let sim2 = new ButtonEffect(null,null,200,60,"#45ffa5","Binary", new Binary()); //Binary tree
	let sim3 = new ButtonEffect(null,null,200,60,"#45ffa5","Cogs", new Cog(width/2,height/2)); //Cog
	let sim4 = new ButtonEffect(null,null,200,60,"#45ffa5","Grass", new Grass());
	let sim5 = new ButtonEffect(null,null,200,60,"#45ffa5","Sputnik", new Sputnik());
	SIMMenu = new EffectsMenu([sim1,sim2,sim3,sim4,sim5], "SIM", 3, "#45ffa5", map(2,0,3,width/4,3/4*width), height-55);

	//DEFAULT EFFECTS MENU
	let d1 = new ButtonEffect(null,null,200,60,"#45f6ff","Spectrum", new Spectrum());//#3be1f7
	let d2 = new ButtonEffect(null,null,200,60,"#45f6ff","Wave", new WavePattern()); //#3dd117
	let d3 = new ButtonEffect(null,null,200,60,"#45f6ff","Needles", new Needles()); //#fad117
	let d4 = new ButtonEffect(null,null,200,60,"#618bff","Extension", new LineGridExt());
	DMenu = new EffectsMenu([d1,d2,d3,d4], "Default", 4, "#45f6ff", map(3,0,3,width/4,3/4*width), height-55);

	effectMenus=[DCMenu, MSMenu, SIMMenu, DMenu, player];

	currentSong=0;
	songList[0].insert();

	fourier = new p5.FFT();

	
	info = new Info(60,60,"i","#ed798c", "Shortcuts");//#b861ff

	//loads image for an effect
	spaceShip = loadImage('Images/sputnik.png');
}




////////gets called every frame
function draw() {
	background("#000");
	noStroke();

	//draws effect if button is active
	if (currentButton!=undefined && currentButton.active === true) {
		currentButton.effect.draw();
	}

	//DRAWS ALL menus from within the array effectMenus
	push();
	for (let i=0; i<effectMenus.length;i++) {
		effectMenus[i].drawObject();
	}
	pop();

	//draws the info object
	info.drawObject();

	textSize(20);
	fill(255,0,0);

	//if a song finished loading this updates their loaded state to true
	if (replayNextFrame && !songLoading) {
		playsNow.loop();
		replayNextFrame = false;
		songLoading = false;
		songList[currentSong].loaded = true;
	}

	//if key e is pressed then DEBUG gets activated
	//debug shows x and y coordinates and also shows frames per second per effect
	if(DEBUG) {
		frameAverages.push(frameRate());
		if(frameAverages.length > 20) {
			frameAverages.shift();
		}
		text(String(mouseX)+","+String(mouseY), mouseX, mouseY);
		text(round(frameRate()) + "\nAVG: " + round(average(frameAverages)) , 0, 20);
	}
}



let replayNextFrame = false; //in case a song failes to load instantly
let songLoading = false;


let songList = [new Song("Music/Crypteque.mp3",          "Danny Baranowsky", "Crypteque"),
new Song("Music/Metalmacy.mp3",          "Danny Baranowsky", "Metalmacy"),
new Song("Music/DanceOfTheDecorous.mp3", "Danny Baranowsky", "Dance of the Decorous"),
new Song("Music/AHotMess.mp3",           "Danny Baranowsky", "A Hot Mess"),
new Song("Music/KnightToC-Sharp.mp3",    "Danny Baranowsky", "Knight to C-Sharp"),
new Song("Music/DeepSeaBass.mp3",        "Danny Baranowsky", "Deep Sea Bass"),
new Song("Music/Portabellohead.mp3",     "Danny Baranowsky", "PortabelloHead"),
new Song("Music/MarchOfTheProfane.mp3",  "Danny Baranowsky", "March of the Profane"),
new Song("Music/ddr.m4a",                "WRLD",             "Little Too Close")]; 

//playlist.push(loadSound());

let info;
let DEBUG = false;

let frameAverages = [];


////INITIALIZING VARIABLES (GLOBAL)

//current selected effect and whether the drag was valid
let currentButton;
let validDrag;

//fourier global var and player
let fourier;
let player;

//other useful global variables for audio vis logic
let playsNow;
let currentSong;
let songLoadingProgress;

//Effect Menus (Default, MS, DC, SIM)
let DMenu;let MSMenu;let SIMMenu;let DCMenu;let isMenu;

//Array to render menus
let effectMenus = [];

//space ship image
var spaceShip;


//FPS counter
function average(list) {
	let sum = 0;
	for (let i = list.length - 1; i >= 0; i--) {
		sum+= list[i];
	}
	return sum / list.length;
}



////////////FUNCTIONS MOUSE CLICK/INTERACTIONS
function mouseClicked() {
	let mouseact = "nothing";
	if (player.displayed && !validDrag && !songLoading) {
		if ((mouseX>=player.inix-45 && mouseX<=player.inix+45) 
			&& 
			(mouseY>=player.iniy+295 && mouseY<=player.iniy+385)) {
			mouseact = "play";
		}
		//previous
		else if ((mouseX>=player.inix-120 && mouseX<=player.inix-60) 
			&& 
			(mouseY>=player.iniy+310 && mouseY<=player.iniy+370)) {
			mouseact = "prev";
			
		//next
		}
		else if ((mouseX>=player.inix+60 && mouseX<=player.inix+120) 
			&& 
			(mouseY>=player.iniy+310 && mouseY<=player.iniy+370)) {
			mouseact = "next";
		}
	}

	///PLEYER BUTTONS CLICK CHECK
	//play button click
	let buttonClicked = false;
	for (let j=effectMenus.length-1; j>=0;j--) {
		for (let i=0;i<effectMenus[j].buttons.length;i++) {
			if (effectMenus[j].displayed 
				&& !validDrag
				&& !buttonClicked
				&& mouseX>=effectMenus[j].buttons[i].x-effectMenus[j].buttons[i].w/2
				&& mouseX<=effectMenus[j].buttons[i].x+effectMenus[j].buttons[i].w/2
				&& mouseY>=effectMenus[j].buttons[i].y-effectMenus[j].buttons[i].h/2
				&& mouseY<=effectMenus[j].buttons[i].y+effectMenus[j].buttons[i].h/2
				) {
				
				currentButton=effectMenus[j].buttons[i];
				currentButton.selected();
				buttonClicked = true;

				if (Math.hypot(mouseX-effectMenus[j].inix,mouseY-effectMenus[j].iniy)<effectMenus[j].margin) {
					currentButton.deselected();
					buttonClicked = false;
				}

			}

			else if (!validDrag && mouseact == "nothing") {
				effectMenus[j].buttons[i].deselected();
			}

		}
	}
	

	if(buttonClicked) {
		mouseact = "nothing";
	}

	switch(mouseact) {
		case "play":
			if (playsNow.isPlaying()) {
				playsNow.pause();
			}
			else {
				playsNow.loop();
			}
			break;

		case "prev":
			previous();
			break;

		case "next":
			next();
			break;
	}



}

function mousePressed() {
	for (let i=effectMenus.length-1; i>=0;i--) {
		if (Math.hypot(mouseX-effectMenus[i].inix,mouseY-effectMenus[i].iniy)<effectMenus[i].margin) {
			effectMenus[i].dragged=true;
			if (effectMenus[i].key==player.key) {
				continue;
			}
			let topOfArray=effectMenus[i];
			for (let j=i+1; j<effectMenus.length; j++) {
				effectMenus[j-1]=effectMenus[j];
			}
			effectMenus[effectMenus.length-1]=topOfArray;
			break;
		}
	}
}

function mouseDragged() {
	for (let i=0; i<effectMenus.length;i++) {
		if (effectMenus[i].dragged) {
			effectMenus[i].inix+=movedX;
			effectMenus[i].iniy+=movedY;

			for (let j=0; j<effectMenus[i].buttons.length;j++) {
				effectMenus[i].buttons[j].x=effectMenus[i].inix;
				effectMenus[i].buttons[j].y=1.5*effectMenus[i].margin+effectMenus[i].iniy+((j+1)*90);
			}
		}
	}
}

function mouseReleased() {
	validDrag=false;
	for (let i=0; i<effectMenus.length;i++) {

		validDrag=validDrag || effectMenus[i].dragged;
		effectMenus[i].dragged=false;
	}
}

//resizes canvas to size of current window size
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
	//if some menus are on they have to be turned off
	//if all are off they all have to be turned on by the m key
	//1st all turn on
	//2nd the ones which are on should turn off
	if (keyCode==77) { //"M" for menus
		for (let h=0; h<effectMenus.length; h++) {
			if (effectMenus[h].key==player.key) continue;

			else if (effectMenus[h].displayed) { //if any displayed, turn off all
				for (let i=0; i<effectMenus.length; i++) {
					if (effectMenus[i].key==player.key) continue;
					turnOff(effectMenus[i]);
				}
				isMenu=false;
				break;
			}
			else if (!effectMenus[h].displayed) {
				turnOn(effectMenus[h]);
				isMenu=true;
			}
		}
	}

	if (keyCode==73) { //turns off and on display hover
		info.displayed=!info.displayed;
	}

	//FULLSCREEN TOGGLE
	if (keyCode==70) {
		fullscreen(!fullscreen());
	}

	if (keyCode >= 49 && keyCode <= 52) {
		for (let i=0; i<effectMenus.length;i++) {
			if (4-(52-keyCode)==effectMenus[i].key) {
				turnOO(effectMenus[i]);
			}
		}
	}

	if (keyCode==82) { //r key for restart
		console.log(player.x);
		player.inix=width*6/7;
		player.iniy=80;
		for (let i=0; i<effectMenus.length-1; i++) {
			resetMenu(i+1); //check helper functions
		}
	}

	if (keyCode==80) { //player - P
		turnOO(player);
	}

	//PLAYING SONGS
	//N=next
	//B=prev
	//space bar = pause/unpause
	if(!songLoading) {
		//debugger;
		if (keyCode == 32) { //SPACEBAR Pause/Play
			if (playsNow.isPlaying()) {
				playsNow.pause();
			}
			else {
				playsNow.loop();
			}
		}

		else if (keyCode == 37) { //PREVIOUS
			previous();
		}

		else if (keyCode == 39) { //NEXT
			next();
		}
	}

	if(keyCode == 69) { //E for dEbug
		DEBUG = !DEBUG;
	}

}


//////HELPER FUNCTIONS
function resetMenu(key) { //resets the menus to the initial position at the bottom of the screen
	for (let i=0; i<effectMenus.length; i++) {
		if (effectMenus[i].key==key) {
			effectMenus[i].inix=map(key,1,effectMenus.length-1,width/4,3/4*width); //equally distributed
			effectMenus[i].iniy=height-55;
			for (let j=0; j<effectMenus[i].buttons.length;j++) {
				effectMenus[i].buttons[j].x=effectMenus[i].inix;
				effectMenus[i].buttons[j].y=1.5*effectMenus[i].margin+effectMenus[i].iniy+((j+1)*90);
			}
		}
	}
}

function turnOff(menu) { //turnsOff 1 menu different to the use of turning it off and on, since we want to be able to also individually turn on and off,
	//these 2 singular On or Off functions help in turning all the menus off and on.
	menu.displayed=false;
}

function turnOn(menu) {//turnsOn 1 menu used in a loop, check above comment
	menu.displayed=true;
}

function turnOO(menu) {//turns off and on 1 menu, used on individual menu turn ons offs.
	menu.displayed = !menu.displayed;
}

function previous(){ //selects previous song
	if(playsNow.isPlaying()) playsNow.stop();

	if (currentSong == 0) {
		currentSong = songList.length-1;
	}
	else {
		currentSong -= 1;
	}
	songList[currentSong].insert();
	if(songLoading) replayNextFrame = true;
	else playsNow.loop();
}

function next() { //selects next song
	if(playsNow.isPlaying()) playsNow.stop();
	if (currentSong == songList.length-1) {
		console.log("backtracking and setting currentSong to 0");
		currentSong = 0;
	}
	else {
		currentSong += 1;
	}
	console.log("currentSong: " + currentSong);
	songList[currentSong].insert();
	if(songLoading) replayNextFrame = true;
	else playsNow.loop();
}