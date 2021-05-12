class Sun{
	constructor(){
		
	}
	
   draw() {
      let spect = fourier.analyze();
		 	let spes = fourier.getEnergy("lowMid");
		 	this.freq = map(20, 0, width/2, 20, 100);
		 // Re-maps a number from one range to another. 
		 	this.freq = constrain(this.freq, 1,200);
		 // Constrains a value between a minimum and maximum value.
		 	push();		
		 	translate(width/2, height/2);// start at the center of the canvas
		 		for( let i=0; i<spect.length; i++)
					{						
						let x = map(i,this.freq,spect.length, 0, width);
						//Re-maps a number from one range to another.
						let h = -height/2 + map(spect[i]*0.03, 0, 350, height/2, 10);
						let y = x / h;// y coordinates
							noStroke();
							strokeWeight(3);		 				
							fill(124,252,0,spect[i]);//green colour
							rotate(spes*0.01);//rotation
							circle(150+x*0.3,y,h*2,0);// small circles rotating
							fill(5,100,255,spect[i]);//blue colour
							ellipse(10+x/spect[i]*2,y*3, h*0.04, spes*2);	
							//center of the shape creating a star when it overlaps
					}
		 	pop();

				}
}