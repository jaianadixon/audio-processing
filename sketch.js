var song;
var button, skipButton;
var volumeSlider, rateSlider, panSlider;
var amp, volume, size;

function preload(){
    song = loadSound("sound/dc.mp3");
}

function setup(){
    createCanvas(600, 400, WEBGL);
    background(255,0,0);
    
    button=createButton("Play");
    button.mousePressed(togglePlaying);
    button.position(20,100);
    
    skipButton=createButton("Skip");
    skipButton.mousePressed(skip);
    skipButton.position(80,100);
    
    //volume is increase/decreasing applitude
    volumeSlider= createSlider(0, 1, 0.5, .05);
    volumeSlider.position(20,150);
    
    rateSlider=createSlider(0.5, 1.5, 1, 0.05);
    rateSlider.position(20,180);
    
    panSlider=createSlider(-1, 1, 0, .05);
    panSlider.position(20, 210);
    
    //add Cue
    song.addCue(1, showCircle);
    
    amp = new p5.Amplitude();

}

function draw(){
    background(song.currentTime()*5, 100, 50);
    
    volume = amp.getLevel();
    size=map(volume, 0, 1, 50, 200);
    
    song.setVolume(volumeSlider.value());
    song.rate(rateSlider.value());
    song.pan(panSlider.value());
}

function togglePlaying(){
    if(song.isPlaying()){
        song.pause();
        button.html("Play");
    }
    else{
        song.play();
        button.html("Pause");
    }
}

function skip(){
    if(song.isPlaying()){
        song.jump(song.currentTime()+5);
    }
}

function showCircle(){
     sphere(size);
}