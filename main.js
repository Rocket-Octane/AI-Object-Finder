objects = [];
status = "";

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function setup(){
    canvas = createCanvas(400, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();    
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    obj_name = document.getElementById("obj_name").value;
}

function modelLoaded(){
    console.log("Model is initialized");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 400, 300);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            stroke("red");
            fill("red");
            percent = floor(objects[i].confidence * 100);
            noFill();
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = "Objects Detected";

            if(objects[i].label == obj_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = obj_name + " Found";
                var utterThis = new SpeechSynthesisUtterance(obj_name + " found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML = obj_name + " Not Found";
            }
        }
    }
}