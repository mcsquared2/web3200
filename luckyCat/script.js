// alert("yo sup");
var messages = null;
var askButton = document.getElementById("ask-button");
var notClicked = true;

for (var i = 0; i < 5; i++)
{
    element = document.body;
    createCloud(element);
}
var clouds = document.getElementsByClassName("cloud");
for (var i = 0; i <clouds.length; i++) {
    clouds[i].addEventListener("animationiteration", function (){
        // console.log(cloud);
        num = Math.floor(Math.random() *10);
        // console.log(num);
        num *= 45;
        this.style.top = String(num)+"px";
        this.style.display = "block";
        // this.style.animationDuration = (Math.floor(Math.random()*8)+10)+'s';
        // console.log(cloud.style.top)
    });
}


function createCloud (element) {
    cloud = document.createElement("div");
    cloud.className += "cloud";
    cloud.style.animationDuration = (Math.random()*10)+20+'s';
    num = Math.floor(Math.random() *10);
        // console.log(num);
    num *= 45
    cloud.style.top = num +'px';
    cloud.style.left = "-200px";
    cloud.style.animationDelay = Math.random() *7 + 's';
    element.appendChild(cloud);
};


askButton.onclick = function () {
    if (notClicked) 
    {   
        if (messages == null){
            alert("Our servers aren't wroking right now, please try again later.");
            return;
        }
        else {
            notClicked = false;
            var newIndex = Math.floor(Math.random()*messages.length);
            var historyItem = document.createElement('div');
            var question = document.getElementById("question");
            historyItem.className = "historyItem";
            // console.log("clicked");
            msg = document.getElementById("message")
            msg.classList.remove("fadein");
            void msg.offsetWidth;
            msg.classList.add("fadeout");
            var history = document.getElementById("middle");
            var ineer = "<p>" + question.value + "</p><p>" + messages[newIndex] + "</p>"
            historyItem.innerHTML = ineer;
            setTimeout(function () {
                    msg.innerHTML = messages[newIndex];
                
                    msg.classList.remove("fadeout");
                    void msg.offsetWidth;
                    msg.classList.add("fadein");
                    msg.style.animationName = "opacity 2s ease-in";
                    notClicked = true;
                    history.appendChild(historyItem);

                }
                , 1900);
        }
    }    
    
};


var request = new XMLHttpRequest();
request.onreadystatechange= function () {
    if (request.readyState == XMLHttpRequest.DONE)
    {
        if (request.status >=200 && request.status < 400)
        {
            messages = JSON.parse(request.responseText);
            
        }else {
            alert("I have a bad feeling about this");
        }
    }
     
};
request.open("GET", 'https://api.myjson.com/bins/446w2')
request.send();