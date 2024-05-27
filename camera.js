//model&cam var
let video;
let features;
let KNN;
let labelP;
let ready=false;
var over=false;

var controller="n";

function setup(){
  //noCanvas();
  createCanvas(320,240,cam);
  video=createCapture(VIDEO);
  video.size(320,240);
  video.hide();
  features=ml5.featureExtractor("MobileNet",modelLoaded);
  labelP=createP("...");
  labelP.style('font-size','32pt');
}

function goClassify(){
  const logits=features.infer(video);
  knn.classify(logits,function(error,result){
    if(error){
      console.log(error);
    }else{
      console.log(result);
      if (result.label=="0") {
        result.label="left";
        controller="l";
      }else if (result.label=="1") {
        result.label="right";
        controller="r";
      }else if(result.label=="2"){
        result.label="up";
        controller="u";
      }else{
        result.label="no pose";
        controller="n";
      }
      labelP.html(result.label);

      if(!over){goClassify();}
    }
  });
}

function modelLoaded(){
  console.log("MobileNet loaded!")
  knn=ml5.KNNClassifier();
  knn.load("model.json",function(){
    console.log("KNN Data Loaded")
    goClassify();
  });
}
function draw(){
  const flippedVideo = ml5.flipImage(video);
  image(flippedVideo,0,0);

  //noCanvas();  
  /*video=createCapture(VIDEO);
  video.size(320,240);
  video.hide();
  video=null;*/
}