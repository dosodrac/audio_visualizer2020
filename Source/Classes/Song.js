"use strict";

let loadedSongs = {};
let songNumber = 0;

////////////LOADING SONGS CLASS
class Song {
	constructor(url, artist, name) {
		this.url = url; //The url of the 
		this.artist = artist; //the name of the artist of the song (optional)
		this.name = name; //the name of the song itself(optional)

		this.songNumber = songNumber; //automatically generated number for reference
		songNumber++; 
		this.loaded = false; //whether the current song has been loaded and decoded into memory
	}

	load() {
		console.log(this, "called to load");
		if(!this.loaded) {
			loadedSongs[this.songNumber] = new p5.SoundFile(this.url, this.success, this.error, this.progress);
			songLoadingProgress = 0;
			songLoading = true;
		} else {
			console.log("WARNING: " + url + " already loaded");
		}
	}

	success() {
		songLoading = false;
		replayNextFrame = true;
		console.log(this, "loaded");
	}

	error() {
		console.log("ERROR!");
	}

	progress(n) {
		console.log(n);
		songLoading = true;
		songLoadingProgress = Math.round(n*100) + "%";
	}

	insert() {
		if(!this.loaded) this.load();
		playsNow = loadedSongs[this.songNumber];
	}

}