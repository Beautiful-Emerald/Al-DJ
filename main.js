score_rightWrist=0;
score_leftWrist=0;
song="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;

function preload(){
song=loadSound('music.mp3');
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

posenet=ml5.poseNet(video,modelLoaded);
posenet.on("pose", gotPoses);
}

function draw(){
image(video, 0, 0, 600, 500);
fill('#ff00000');
stroke('#fff000');

if(score_rightWrist>0.2){
circle(rightWristx,rightWristy, 20);

if(rightWristy>0&& rightWristy <= 100){
    document.getElementById("spee").innerHTML="Speed= 0.5x";
    song.rate(0.5);
    }

    else if(rightWristy>100&& rightWristy <= 200){
        document.getElementById("spee").innerHTML="Speed= 1 x";
        song.rate(1);


        }

        else if(rightWristy>200&& rightWristy <= 300){
            document.getElementById("spee").innerHTML="Speed= 1.5 x";
            song.rate(1.5);
    
    
            }

            else if(rightWristy>300&& rightWristy <= 400){
                document.getElementById("spee").innerHTML="Speed= 2 x";
                song.rate(2);
        
        
                }

                else if(rightWristy>400&& rightWristy <= 500){
                    document.getElementById("spee").innerHTML="Speed= 2.5 x";
                    song.rate(2.5);
            
            
                    }}

if(score_leftWrist>0.2){
    
circle(leftWristx,leftWristy, 20);
    
    InNo$Leftwristy=Number(leftWristy);
    remove_decimals=floor(InNo$Leftwristy);
    volume=remove_decimals/500;
    
    document.getElementById("volume").innerHTML="volume= "+ volume;
    song.setVolume(volume);
}
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function modelLoaded(){
console.log("Model Loaded");
}

function gotPoses(results){
if(results.length>0){

console.log(results);
score_leftWrist=results[0].pose.keypoints[9].score;
console.log("score left wrist= " + score_leftWrist);

score_rightWrist=results[0].pose.keypoints[10].score;
console.log("score right wrist= " + score_rightWrist);


leftWristx=results[0].pose.leftWrist.x;
leftWristy=results[0].pose.leftWrist.y;

rightWristx=results[0].pose.rightWrist.x;
rightWristy=results[0].pose.rightWrist.y;

console.log("leftWristx= "+leftWristx + "leftWristy= " + leftWristy);
console.log("rightWristx= "+rightWristx + "rightWristy= " + rightWristy);
}
}