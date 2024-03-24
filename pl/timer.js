let isPressed = false;

//STARTING TIME SET TO 25 MINUTES
const startingMinutes = 25;
//TIME VARIABLE IS CHANGING MINUTES TO SECONDS
var timeToEnd = startingMinutes * 60 - 1;

//WE ARE CHECKING FOR KEY PRESSED
input.addEventListener('keypress', startTimer);
input.addEventListener('touchstart', startTimer);

//THIS FUNCTION IS STARTING TIMER
function startTimer(e) {
    if (isPressed == false) {
        isPressed = true;
        console.log(isPressed)
        countDown();  
        
    }
}


//THIS IS TIMER
function countDown() {
    

    //COUNTDOWNEL IS ASSOCIATED WITH TIMER ON WEBPAGE - IT'S SHOWING TIME LEFT
    const countDownEl = document.getElementById("end");

    //TIMER UPDATE EVERY 1 SECOND
    setInterval(updateCountdown, 1000);
   
    //TIMER UPDATE FUNCTION
    function updateCountdown(){

        if (timeToEnd > 0){
            //CHANGING SECONDS INTO MINUTES AND SECONDS LEFT
            const minutes = Math.floor(timeToEnd/60);
            const seconds = timeToEnd % 60;

            
            if(seconds > 9){
                countDownEl.innerHTML = `Pozostały czas: ${minutes}:${seconds}`;
            }

            //THIS PART ADDING ADDITIONAL "0" TO SECONDS IF THERE IS LESS THAN 10 SECONDS LEFT, TO AVOID FOR EXAMPLE TIME LIKE: 4:2 2:9
            else if(seconds < 10 && seconds > 0){
                countDownEl.innerHTML = `Czas do końca: ${minutes}:0${seconds}`;
            //THIS PART IS PLACING 00 IF THERE IS 0 SECONDS LEFT
            } else {
                countDownEl.innerHTML = `Czas do końca: ${minutes}:00`;
            }

            //THIS PART IS CHANING TIMER COLOR TO RED IF ONLY 1 MINUTE LEFT
            if (minutes < 1) {
                countDownEl.style.color = "red"
            }
            //TIME - VARIABLE CONTAINING SECONDS IS DECREASING BY 1
            timeToEnd--;

            
        } else {
            document.getElementById("countryTextBox").disabled = true;
            document.getElementById("win").style.display = "initial";
            document.getElementById("winp").innerHTML = count + " ze 196 państw zostało odnalezionych";
            document.getElementById("winScore").innerHTML = "Zdobyte punkty: " + score;
            timeToEnd = 0;
        }    
    }  
}

document.getElementById("stopButton").onclick = function(){
    timeToEnd = 0;
    startTimer();
}



