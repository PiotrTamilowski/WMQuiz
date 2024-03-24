let isPressed = false;
//WE ARE CHECKING FOR KEY PRESSED
input.addEventListener('keypress', startTimer);

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
    //STARTING TIME SET TO 25 MINUTES
    const startingMinutes = 25;
    //TIME VARIABLE IS CHANGING MINUTES TO SECONDS
    let time = startingMinutes * 60 - 1;

    //COUNTDOWNEL IS ASSOCIATED WITH TIMER ON WEBPAGE - IT'S SHOWING TIME LEFT
    const countDownEl = document.getElementById("end");

    //TIMER UPDATE EVERY 1 SECOND
    setInterval(updateCountdown, 1000);
   
    //TIMER UPDATE FUNCTION
    function updateCountdown(){

        //CHANGING SECONDS INTO MINUTES AND SECONDS LEFT
        const minutes = Math.floor(time/60);
        const seconds = time % 60;

        
        if(seconds > 9){
            countDownEl.innerHTML = `Time Left: ${minutes}:${seconds}`;
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
        time--;

        //IF TIME HAS PASSED THIS PART IS DISABLING LABEL TO NOT LET USER TYPE COUNTRIES, IT ALSO STOPPING TIMER FUNCTION
        if (minutes <= 0 && seconds <= 0){
            document.getElementById("countryTextBox").style.display = "none";
            document.getElementById("win").style.display = "initial";
            document.getElementById("winp").innerHTML = count + " from 196 countries found";
            time = 0;
            window.removeEventListener(countDown);
        }
        
    }
}


