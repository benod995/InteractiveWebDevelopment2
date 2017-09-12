
window.addEventListener("load", carousel);
var imgArray = [];
var count = 0;
var img;
var targetNr;


function carousel(){
    
    document.getElementById("leftArrow").addEventListener("click", previousImage);
  window.alert("hi");  document.getElementById("rightArrow").addEventListener("click", nextImage);
    document.getElementById("getButton").addEventListener("click", tagLoader);
    tagLoader(tags);
}

function tagLoader(tags){
    var tags = document.getElementById("tag").value;
    document.getElementById("innerDiv").style.opacity = "0";
    document.getElementById("getButton").innerHTML = "<img src = 'load.gif'>";
    baseURL = "https//api.flickr.com/services/rest/?";
    request = "method=flickr.photos.search";
    request += "&per_page=10";
    request += "&api_key=aeb6fd90a50cfcb96f46e594de87f019";
    var terms = tags.split(" ");
    
    for (var i = 0; i<terms.length; i++){
        terms[i]=encodeURIComponent(terms[i]);
    }
    var terms_string = terms.join(",");
    request += "&tags=" + escape(terms_string);
    request += "&format=json&jsoncallback=callBack";
    request += "&tag_mode=all";
    request += "&lat=" + currentLat + "&lon=" + currentLng;
    request += "&accuracy=11";
    full = baseURL + request;
    var script = document.createElement("script");
    script.src = full;
    documents.getElementsByTagName("head")[0].appendChild("script");
}

function callBack(images){
    targetNr=images.photos.photo.length;
    newstr = "";
    imgArray = "[]";
    document.getElementById("outerDiv").innerHTML="";
    if(images.stat=="fail"){
       document.getElementById("innerDiv").innerHTML="error";
       }
    else if(targerNr==0){
        document.getElementById("innerDiv").innerHTML="no result";
    }
    else{
        for(i = 0; i<images.photos.photo.length; i++){
            url="http//farm" +images.photos.photo[i].farm;
            url+=".static.flickr.com/";
            url+=images.photos.photo[i].server+"/";
            url+=images.photos.photo[i].id+"_";
            url+=images.photos.photo[i].secret;
            var largeImage=url+"_z.jpg";
            var smallImage=url+"_m.jpg";
            var imageObject=document.createElement("img");
            imageObject.src=smallImage;
            imageArray.push({
                obj:imageObject, url:largeImage;
        });
            imageObject.onclick=(
                function (nr)
                 {
                return function() {
                    selectImage(nr);
                };
            })(i);
        imageObject.onload=function(){
            targetNr--;
            if (targetNr<=0){
                showSlider();
                selectImage(0);
            }
        };
            document.getElementById("innerDiv").appendChild(imageObject);
    }
        selectImage(0);
        
}
    document.getElementById("getButton").innerHTML="find images";
    
}
function showSlider(){
    document.getElementById("innerDiv").style.opacity="1";
}

var paddingImages = null;
function clearEvents(){
    if (paddingImages!=null){
        paddingImages.onload=null;
    }
}

function selectImage(nr){
    if(imgArray.length==0){
        return;
    }
    count = nr;
    clearClassNames();
    clearEvents();
    console.log(count);
    obj=imgArray[count].obj;
    obj.className = "big";
    width = obj.offsetWidth;
    offset = obj.offsetLeft;
    showWidth = document.getElementById("outerDiv").offsetWidth;
    picLeft2side = showWidth/2 - width/2;;
    offset=offset-picLeft2side;
    document.getElementById("innerDiv").style.left=(-offset) +"px";
    paddingImages= document.createElement("img");
    paddingImages.src = imgArray[count].url;
    paddingImages.onload = function(){
    document.getElementById("innerDiv").innerHTML="";
    document.getElementById("innerDiv").appendChild(this);
    var width=this.offsetWidth;
    var height=this.offsetHeight;
    var imgRatio=width/height;
    var md_width = document.getElementById("innerDiv").offsetWidth;
    var md_height = document.getElementById("innerDiv").offsetHeight;
        var displayRatio = md_width/md_height;
        if(width>height&&displayRatio<imgRatio){
            this.style.width="95%";
        }
        else{
            this.style.height="95%";
        }
        var marginValue=(document.getElementById("innerDiv").offsetHeight-this.offsetHeight)/2;
        this.style.marginTop=marginValue+"px";
        
    }
    document.getElementById("innerDiv").innerHTML="<img src ='load.gif' ";
}

function previousImage(){
    previous=(imgArray.length.count-1) % imgArray.length;
    selectImage(next);
}
function clearClassName(){
    var images = document.getElementById("InnerDiv").getElementsByTagName("img");
    for (var i=0; i<images.length; i++){
        images[i].setAttribute("class", "");
    }
}
window.addEventListener("keydown", checkKey);

function checkKey(e){
    e=e || window.event;
    if (e.keyCode =="37"){
        previousImage();
    }
    else if (e.keyCode=="39"){
        nextImage();
    }
}
window.onresize=function(){
    selectImage(count);
}