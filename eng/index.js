//CURRENT SCORE IN THE GAME
var score = 0;

//POINTS EARNED FOR LAST COUNTRY FOUND
let points = 0;

//TIME PASSED SINCE LAST COUNTRY HAS BEEN REVEALED
let timePassed = 0

//CITY NAME VARIABLE SET TO NULL
let country = "";

//FOUND CITIES VARIABLE SET TO 0
let count = 0;

//BOOLEAN CHECK IF MAP IS ENLARGED
let isFocused = false;

//INPUT CONSTANCE - IT'S TAKING INFO FROM COUNTRYTEXTBOX FIELD
const input = document.getElementById("countryTextBox");

let isStarted = false;



//LISTENER CHECKS IF USER PRESS ANY KEY - IF YES IT'S TRIGGERING FIND CITY FUNCTION
input.addEventListener('keypress', findCountry);
input.addEventListener('input', findCountry);

input.addEventListener('input', startQuiz);
input.addEventListener('touchstart', startQuiz);

function startQuiz(e){
    if(isStarted == false){
        start()
        isStarted = true;
    }
}

function start(){
    setInterval(updatePowerBar, 10);
    setInterval(powerTimer, 10);
}

    
//THIS FUNCTION IS STARTING SET CITY AND CHECK CITY FUNCTIONS WITH THE DELAY - TO BE SURE THAT SETCOUNTRY FUNCTION WILL BE TRIGGERED FIRST
function findCountry(e) {
    setTimeout(checkCountry, 10);        
}

//CHECKCOUNTRY FUNCTION IS TAKING DATA INSERTED INTO COUNTRYTEXTBOX FIELD AND COMPARING IT WITH DATA IN ARRAY
//IF THE COUNTRY IS FOUND, THE FUNCTION IS CHECKING BOOLEAN VALUE. IF BOOLEAN IS SET TO FALSE, THE FUNCTION IS CHANGING BOOLEAN VALUE TO TRUE,
//TRIGGERING COLORCOUNTRY FUNCTION, INSERTING COUNTRY NAME INTO TABLE AND TRIGGERING CLEARFIELD FUNCTION
function checkCountry(){
    country = document.getElementById("countryTextBox").value;
    for(let i = 0; i < tab.length; i++){
        for(let j = 2; j < tab[i].length; j++){
            if (country.toLowerCase() == tab[i][j].toLowerCase() && tab[i][0] == false){
                tab[i][0] = true;
                colorCountry(tab[i][2]);
                document.getElementById(tab[i][1] + "answer").innerHTML = tab[i][2];
                clearField();
                timePassed = 0;
                score += points;
                addScoreText(points)
                document.getElementById("score").innerHTML = score;
                points = 0;
                i = tab.length-1;
                break;
            }
        }
    }
}

//COLORCOUNTRY FUNCTION CHECKING IF COUNTRY VALUE HAS ANY SPACES, IF YES IT'S CHANGING ALL SPACES TO HYPHENS TO MATCH CLASS NAME FROM HTML
//THEN THE FUNCTION IS CHANGING COLOR OF THE SVG PATHS WITH THE SAME CLASS NAMES
function colorCountry(country){
    while(country.search(" ") != -1){
        country = country.replace(" ", "-");
    }
    let elements = document.getElementsByClassName(country);
    for(i = 0; i < elements.length; i++){
        elements[i].style.fill = "rgb(0, 255, 0)";
    }  
}

// THIS FUNCTION IS SETTING COUNTRYTEXTBOX FIELD AND COUNTRY VALUE TO NULL,
// IT'S ALSO UPDATING COUNT VARIABLE, INFO ABOUT NUMBER OF FOUND COUNTRIES AND IT'S UPDATING PROGRESS BAR
function clearField(){
    document.getElementById("countryTextBox").value = ""
    country = "";
    count++;
    updateProgressBar();
    var found = count + " from 196 countries found"
    document.getElementById("foundCountries").innerHTML = found;
    
    //THIS PART IS DISPLAYING WIN DIV WHEN ALL COUNTRIES ARE FOUND
    if(count >= 196){
        document.getElementById("countryTextBox").disabled = true;
        document.getElementById("win").style.display = "initial";
        document.getElementById("winp").innerHTML = count + " from 196 countries found";
        document.getElementById("winScore").innerHTML = "Your score: " + score;
        timeToEnd = 0;
    }
}

//THIS FUNCTION UPDATING PROGRESS BAR
function updateProgressBar(){
       
    //PERCENT VARIABLE IS RESPONSIBLE FOR PROGRESS BAR WIDTH
    // WE ARE DIVIDING 100% BY CITIES NUMBER AND WE ARE MULTIPLY BY COUNT VARIABLE          
    let percent = 100/196 * count

    // THEN WE ARE ADDING PERCENT SIGN
    percent = percent + '%'
       
    //BASED ON COUNT VALUE THE PROGRESS BAR IS CHANGING IT'S COLOR 
    if(count<20) {
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #A61414 ${percent}, #ffffff ${percent})`
    } else if (count < 40){
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #F70609 ${percent}, #ffffff ${percent})`
    } else if (count < 60){
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #ff0000 ${percent}, #ffffff ${percent})`
    } else if (count < 80) {
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #F77406 ${percent}, #ffffff ${percent})`
    } else if (count < 100) {
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #F59B05 ${percent}, #ffffff ${percent})`
    } else if (count < 120) {
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #F5D705 ${percent}, #ffffff ${percent})`
    } else if (count < 140) {
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #EAF702 ${percent}, #ffffff ${percent})`
    } else if (count < 160) {
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #AEF702 ${percent}, #ffffff ${percent})`
    } else if (count < 180) {
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #4FF702 ${percent}, #ffffff ${percent})`
    } else {
        document.getElementById("progressBar").style.background = `linear-gradient(to right, #13C318 ${percent}, #ffffff ${percent})`
    } 
}

//TO DO
function updatePowerBar(){
       
    //PERCENT VARIABLE IS RESPONSIBLE FOR PROGRESS BAR WIDTH
    // WE ARE DIVIDING 100% BY CITIES NUMBER AND WE ARE MULTIPLY BY COUNT VARIABLE     
    

    let percentPB = 100;
    
      

    if(timePassed <= 3){
        percentPB=100;
        points = 2000;        
    } else {
        percentPB = percentPB+30-(timePassed*10)
        if(percentPB > 0){
            points = 1000 + (1000 * percentPB/100);
            points = Math.floor(points);           
        } 
        if(percentPB <=0) {
            percentPB =0;
        }
    } 

    // THEN WE ARE ADDING PERCENT SIGN
    let fill = percentPB;
    
    let assigned = percentPB + '%'
   
    
       
    //BASED ON COUNT VALUE THE PROGRESS BAR IS CHANGING IT'S COLOR 
    if(fill >= 100){
        document.getElementById("powerBar").style.background = `linear-gradient(to right, #057b3d ${assigned}, #ffffff ${assigned})`
    } else if (fill > 85){
        document.getElementById("powerBar").style.background = `linear-gradient(to right, #0da140 ${assigned}, #ffffff ${assigned})`
    } else if (fill > 70){
        document.getElementById("powerBar").style.background = `linear-gradient(to right, #10c226 ${assigned}, #ffffff ${assigned})`
    } else if (fill > 55){
        document.getElementById("powerBar").style.background = `linear-gradient(to right, #60e223 ${assigned}, #ffffff ${assigned})`
    } else if (fill > 40){
        document.getElementById("powerBar").style.background = `linear-gradient(to right, #9be223 ${assigned}, #ffffff ${assigned})`
    } else if (fill > 25){
        document.getElementById("powerBar").style.background = `linear-gradient(to right, #e2dd23 ${assigned}, #ffffff ${assigned})`
    } else if (fill > 10){
        document.getElementById("powerBar").style.background = `linear-gradient(to right, #e2b323 ${assigned}, #ffffff ${assigned})`
    } else if (fill > 0){
        document.getElementById("powerBar").style.background = `linear-gradient(to right, #e27023 ${assigned}, #ffffff ${assigned})`
    } else {
        document.getElementById("powerBar").style.background = `linear-gradient(to right, #ffffff ${assigned}, #ffffff ${assigned})`
    }
}

function powerTimer(){
    timePassed += 0.01;
}

function addScoreText(pointsValue){
    const element = document.getElementById("earnedPoints");
    
    let random;
    let randomColor = Math.floor(Math.random() * colorTab.length);


    if(element.offsetWidth > 300){
        random = Math.floor(Math.random() * 70)
    } else if(element.offsetWidth > 260){
        random = Math.floor(Math.random() * 65)
    } else if(element.offsetWidth > 240){
        random = Math.floor(Math.random() * 60)
    } else if(element.offsetWidth > 220){
        random = Math.floor(Math.random() * 55)
    } else if(element.offsetWidth > 200){
        random = Math.floor(Math.random() * 60)
    } else if(element.offsetWidth > 140){
        random = Math.floor(Math.random() * 55)
    } else if(element.offsetWidth > 80){
        random = Math.floor(Math.random() * 50)
    } else if(element.offsetWidth > 60){
        random = Math.floor(Math.random() * 40)
    } else if(element.offsetWidth > 40){
        random = Math.floor(Math.random() * 35)
    }
    else {
        random = Math.floor(Math.random() * 20)
    }

    random = random + '%'
    const para = document.createElement("p");
    para.style.position = 'absolute';
    para.style.top = '0px';
    para.style.left = random;
    para.style.animation = 'myAnimation 3s'; 
    para.style.fontSize = '2rem' 
    para.style.fontWeight = 'bold'
    para.style.color = colorTab[randomColor]

   setTimeout(() => {para.remove(); }, 2900);


    const node = document.createTextNode("+" +pointsValue);
    para.appendChild(node);
    element.appendChild(para);
    
}

let colorTab = [
    "#000000", "#383838", "#7a7979", "#630e0e", "#de0909", "#f23a3a", "#e68585", "#e6c285", "#8a6e3f", "#402f12", "#e89302", "#e8cd02", "#829911", "#77ff00",
    "#5dbf08", "#315c03", "#15cf40", "#02dbb0", "#13947a", "#00d5ff", "#52b8cc", "#028099", "#205a66", "#0044ff", "#002385", "#486dd4", "#596fab", "#0b1c4a",
    "#6b00f7", "#894cd9", "#45118a", "#bb00ff", "#894f9e", "#49165c", "#f700ef", "#873b85", "#690166", "#ed0086", "#f7a8d5", "#821955", "#ed003b"
]




//ARRAY TAB CONTAINING ALL COUNTRIES        
//FIRST COLUMN CONTAINS BOOLEAN - FALSE VALUE MEANS THAT THIS COUNTRY HAS NOT BEEN FOUND YET
//SECOND COLUMN CONTAINS ID NUMBER - THIS NUMBER IS USED TO SET COUNTRY NAME INTO PROPER TABLE ROW
//THIRD COLUMN CONTAINS CORRECT COUNTRY NAME - THE NAME IS THE SAME AS CLASS NAME OF THIS COUNTRY IN HTML FILE - THIS NAME WILL SHOW UP IN THE TABLE
//OTHER COLUMNS CONTAIN ALTERNATIVE COUNTRY NAMES AND THEIR SHORTCUTS    
let tab = [ 
//AFRICA
[false, 1, "Algeria", "People's Democratic Republic of Algieria"],
[false, 2, "Angola", "Republic of Angola"],
[false, 3, "Benin", "Republic of Benin"],
[false, 4, "Botswana", "Republic of Botswana"],
[false, 5, "Burkina Faso"],
[false, 6, "Burundi", "Republic of Burundi"],
[false, 7, "Cameroon", "Republic of Cameroon"],
[false, 8, "Cape Verde", "Cabo Verde", "Republic of Cabo Verde"],
[false, 9, "Central African Republic"],
[false, 10, "Chad", "Republic of Chad"],
[false, 11, "Comoros" , "Union of the Comoros"],
[false, 12, "Democratic Republic of the Congo" , "Congo-Kinshasa", "DR Congo", "the DRC", "the DROC"],
[false, 13, "Djibouti", "Republic of Djibouti"],
[false, 14, "Egypt", "Arab Republic of Egypt"],
[false, 15, "Equatorial Guinea", "Republic of Equatorial Guinea"],
[false, 16, "Eritrea", "State of Eritrea"],
[false, 17, "Eswatini", "Kingdom of Eswatini"],
[false, 18, "Ethiopia", "Federal Democratic Republic of Ethiopia"],
[false, 19, "Gabon", "Gaboneses Republic"],
[false, 20, "Ghana", "Republic of Ghana"],
[false, 21, "Guinea", "Republic of Guinea"],
[false, 22, "Guinea-Bissau", "Republic of Guinea-Bissau", "Guinea Bissau", "Republic of Guinea Bissau"],
[false, 23, "Ivory Coast", "Côte d'Ivoire", "Republic of Côte d'Ivoire"],
[false, 24, "Kenya", "Republic of Kenya"],
[false, 25, "Lesotho", "Kingdom of Lesotho"],
[false, 26, "Liberia", "Republic of Liberia"],
[false, 27, "Libya", "State of Libya"],
[false, 28, "Madagascar", "Republic of Madagascar"],
[false, 29, "Malawi", "Republic of Malawi"],
[false, 30, "Mali", "Republic of Mali"],
[false, 31, "Mauritania", "Islamic Republic of Mauritania"],
[false, 32, "Mauritius", "Republic of Mauritius"],
[false, 33, "Morocco", "Kingdom of Morocco"],
[false, 34, "Mozambique", "Republic of Mozambique"],
[false, 35, "Namibia", "Republic of Namibia"],
[false, 36, "Niger", "Republic of the Niger"],
[false, 37, "Nigeria", "Federal Republic of Nigeria"],
[false, 38, "Republic of the Congo", "Congo-Brazzaville", "the Congo Republic", "Congo", "the congo"],
[false, 39, "Rwanda", "Republic of Rwanda"],
[false, 40, "Sao Tome and Principe", "Sao Tome and Principe", "São Tomé and Príncipe", "Democratic Republic of Sao Tome and Principe", "Sao Tome"],
[false, 41, "Senegal", "Republic of Senegal"],
[false, 42, "Seychelles", "Republic of Seychelles"],
[false, 43, "Sierra Leone", "Republic of Sierra Leone"],
[false, 44, "Somalia", "Federal Republic of Somalia"],
[false, 45, "South Africa", "Republic of South Africa", "RSA"],
[false, 46, "South Sudan", "Republic of South Sudan"],
[false, 47, "Sudan", "Republic of the Sudan"],
[false, 48, "Tanzania", "United Republic of Tanzania"],
[false, 49, "The Gambia", "Republic of the Gambia", "Gambia"],
[false, 50, "Togo", "Togolese Republic"],
[false, 51, "Tunisia", "Republic of Tunisia"],
[false, 52, "Uganda", "Republic of Uganda"],
[false, 53, "Zambia", "Republic of Zambia"],
[false, 54, "Zimbabwe", "Republic of Zimbabwe"],
//ASIA
[false, 55, "Afghanistan", "Islamic Emirate of Afghanistan"],
[false, 56, "Armenia", "Republic of Armenia"],
[false, 57, "Azerbaijan", "Republic of Azerbaijan"],
[false, 58, "Bahrain", "Kingdom of Bahrain"],
[false, 59, "Bangladesh", "People's Republic of Bangladesh"],
[false, 60, "Bhutan", "Kingdom of Bhutan"],
[false, 61, "Brunei", "Brunei Darussalam"],
[false, 62, "Cambodia", "Kingdom of Cambodia"],
[false, 63, "China", "People's Republic of China"],
[false, 64, "Cyprus", "Republic of Cyprus"],
[false, 65, "East Timor", "Timor-Leste", "Democratic Republic of Timor-Leste"],
[false, 66, "Georgia"],
[false, 67, "India", "Republic of India"],
[false, 68, "Indonesia", "Republic of Indonesia"],
[false, 69, "Iran", "Islamic Republic of Iran"],
[false, 70, "Iraq", "Republic of Iraq"],
[false, 71, "Israel", "State of Israel"],
[false, 72, "Japan"],
[false, 73, "Jordan", "Hashemite Kingdom of Jordan"],
[false, 74, "Kazakhstan", "Republic of Kazakhstan"],
[false, 75, "Kuwait", "State of Kuwait"],
[false, 76, "Kyrgyzstan", "Kyrgyz Republic"],
[false, 77, "Laos", "Lao People's Democratic Republic"],
[false, 78, "Lebanon", "Republic of Lebanon", "Lebanese Republic"],
[false, 79, "Maldives", "Republic of Maldives"],
[false, 80, "Malysia"],
[false, 81, "Mongolia"],
[false, 82, "Myanmar", "Republic of the Union of Myanmar", "Burma"],
[false, 83, "Nepal", "Federal Democratic Republic of Nepal"],
[false, 84, "North Korea", "Democratic People's Republic of Korea", "DPRK", "Korea North"],
[false, 85, "Oman", "Sultanate of Oman"],
[false, 86, "Pakistan", "Islamic Republic of Pakistan"],
[false, 87, "Philippines", "Republic of the Philippines"],
[false, 88, "Qatar", "State of Qatar"],
[false, 89, "Saudi Arabia", "Kingdom of Saudi Arabia"],
[false, 90, "Singapore", "Republic of Singapore"],
[false, 91, "South Korea", "Republic of Korea", "ROK", "Korea South"],
[false, 92, "Sri Lanka", "Ceylon", "Democratic Socialist Republic of Sri Lanka"],
[false, 93, "Syria", "Syrian Arab Republic"],
[false, 94, "Taiwan", "Republic of China"],
[false, 95, "Tajikistan", "Republic of Tajikistan"],
[false, 96, "Thailand", "Kingdom of Thailand"],
[false, 97, "Turkmenistan"],
[false, 98, "United Arab Emirates", "Emirates", "UAE"],
[false, 99, "Uzbekistan", "Republic of Uzbekistan"],
[false, 100, "Vietnam", "Viet Nam", "Socialist Republic of Vietnam"],
[false, 101, "Yemen", "Republic of Yemen"],
//AUSTRALIA
[false, 102, "Australia", "Commonwelth of Australia"],
[false, 103, "Fiji", "Republic of Fiji"],
[false, 104, "Kiribati", "Republic of Kiribati"],
[false, 105, "Marshall Islands", "Republic of the Marshall Islands"],
[false, 106, "Micronesia", "Federated States of Micronesia"],
[false, 107, "Nauru", "Republic of Nauru"],
[false, 108, "New Zealand"],
[false, 109, "Palau", "Republic of Palau"],
[false, 110, "Papua New Guinea", "Independent State of Papua New Guinea", "Papua"],
[false, 111, "Samoa", "Independent State of Samoa"],
[false, 112, "Solomon Islands"],
[false, 113, "Tonga", "Kingdom of Tonga"],
[false, 114, "Tuvalu"],
[false, 115, "Vanuatu", "Republic of Vanatu"],
//EUROPE
[false, 116, "Albania", "Republic of Albania"],
[false, 117, "Andorra", "Principality of Andorra"],
[false, 118, "Austria", "Republic of Austria"],
[false, 119, "Belarus", "Republic of Belarus"],
[false, 120, "Belgium", "Kingdom of Belgium"],
[false, 121, "Bosnia and Herzegovina", "Bosnia", "Bosnia-Herzegovina", "BiH", "B&H"],
[false, 122, "Bulgaria", "Republic of Bulgaria"],
[false, 123, "Croatia", "Republic of Croatia"],
[false, 124, "Czech Republic", "Czechia"],
[false, 125, "Denmark"],
[false, 126, "Estonia", "Republic of Estonia"],
[false, 127, "Finland", "Republic of Finland"],
[false, 128, "France", "French Republic"],
[false, 129, "Germany", "Federal Republic of Germany"],
[false, 130, "Greece", "Hellenic Republic"],
[false, 131, "Hungary"],
[false, 132, "Iceland"],
[false, 133, "Ireland", "Republic of Ireland"],
[false, 134, "Italy", "Italian Republic", "Republic of Italy"],
[false, 135, "Kosovo", "Republic of Kosovo"],
[false, 136, "Latvia", "Republic of Latvia"],
[false, 137, "Liechtenstein", "Principality of Liechtenstein"],
[false, 138, "Lithuania", "Republic of Lithuania"],
[false, 139, "Luxembourg", "Grand Duchy of Luxembourg"],
[false, 140, "Malta", "Republic of Malta"],
[false, 141, "Moldova", "Republic of Moldova"],
[false, 142, "Monaco", "Principality of Monaco"],
[false, 143, "Montenegro"],
[false, 144, "Netherlands", "Holland"],
[false, 145, "North Macedonia", "Republic of North Macedonia", "Macedonia"],
[false, 146, "Norway", "Kingdom of Norway"],
[false, 147, "Poland", "Republic of Poland"],
[false, 148, "Portugal", "Portugese Republic"],
[false, 149, "Romania"],
[false, 150, "Russia", "Russian Federation"],
[false, 151, "San Marino", "Republic of San Marino", "Most Serene Republic of San Marino"],
[false, 152, "Serbia", "Republic of Serbia"],
[false, 153, "Slovakia", "Slovak Republic"],
[false, 154, "Slovenia", "Republic of Slovenia"],
[false, 155, "Spain", "Kingdom of Spain"],
[false, 156, "Sweden", "Kingdom of Sweden"],
[false, 157, "Switzerland", "Swiss Confederation"],
[false, 158, "Turkey", "Republic of Türkiye"],
[false, 159, "Ukraine"],
[false, 160, "United Kingdom", "UK", "The United Kingdom of Great Britain and Northern Ireland"],
[false, 161, "Vatican", "Vatican City State", "The Vatican"],
//NORTH AMERICA
[false, 162, "Antigua and Barbuda", "Antigua"],
[false, 163, "Barbados"],
[false, 164, "Belize"],
[false, 165, "Canada"],
[false, 166, "Costa Rica", "Republic of Costa Rica"],
[false, 167, "Cuba", "Republic of Cuba"],
[false, 168, "Dominica", "Commonwelth of Dominica"],
[false, 169, "Dominican Republic", "Dominicana"],
[false, 170, "El Salvador", "Republic of El Salvador", "Salvador"],
[false, 171, "Grenada"],
[false, 172, "Guatemala", "Republic of Guatemala"],
[false, 173, "Haiti", "Republic of Haiti"],
[false, 174, "Honduras", "Republic of Honduras"],
[false, 175, "Jamaica"],
[false, 176, "Mexico", "United Mexican States"],
[false, 177, "Nicaragua", "Republic of Nicaragua"],
[false, 178, "Panama", "Republic of Panama"],
[false, 179, "Saint Kitts and Nevis", "St Kitts and Nevis", "Federation of Saint Christopher and Nevis", "Saint Kitts", "St Kitts"],
[false, 180, "Saint Lucia", "st Lucia"],
[false, 181, "Saint Vincent and the Grenadines", "St Vincent and the Grenadines", "Saint Vincent", "st Vincent"],
[false, 182, "The Bahamas", "Commonwelt of the Bahamas", "Bahamas"],
[false, 183, "Trinidad and Tobago", "Republic of Trinidad and Tobago", "Trinidad"],
[false, 184, "United States", "The United States of America", "America", "USA"],
//SOUTH AMERICA
[false, 185, "Argentina", "Argentine Republic"],
[false, 186, "Bolivia", "Plurinational State of Bolivia"],
[false, 187, "Brazil", "Federative Republic of Brazil"],
[false, 188, "Chile", "Republic of Chile"],
[false, 189, "Colombia", "Republic of Colombia"],
[false, 190, "Ecuador", "Republic of Ecuador"],
[false, 191, "Guyana", "Co-operative Republic of Guyana"],
[false, 192, "Paraguay", "Republic of Paraguay"],
[false, 193, "Peru", "Republic of Peru"],
[false, 194, "Suriname", "Republic of Suriname"],
[false, 195, "Uruguay", "Oriental Republic of Uruguay"],
[false, 196, "Venezuela", "Bolivarian Republic of Venezuela"]
];
        

     


