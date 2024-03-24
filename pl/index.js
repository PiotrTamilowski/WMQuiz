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

input.addEventListener('keypress', startQuiz);
input.addEventListener('input', startQuiz);
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
        for(let j = 3; j < tab[i].length; j++){
            if (country.toLowerCase().replaceAll("ż", "z").replaceAll("ź", "z").replaceAll("ą", "a").replaceAll("ę", "e").replaceAll("ć", "c").replaceAll("ó", "o").replaceAll("ł", "l").replaceAll("ń", "n").replaceAll("ś", "s") == tab[i][j].toLowerCase().replaceAll("ż", "z").replaceAll("ź", "z").replaceAll("ą", "a").replaceAll("ę", "e").replaceAll("ć", "c").replaceAll("ó", "o").replaceAll("ł", "l").replaceAll("ń", "n").replaceAll("ś", "s") && tab[i][0] == false){
                tab[i][0] = true;
                colorCountry(tab[i][2]);
                document.getElementById(tab[i][1] + "answer").innerHTML = tab[i][3];
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
    var found = count + " ze 196 państw zostało odnalezionych"
    document.getElementById("foundCountries").innerHTML = found;
    
    //THIS PART IS DISPLAYING WIN DIV WHEN ALL COUNTRIES ARE FOUND
    if(count >= 196){
        document.getElementById("countryTextBox").disabled = true;
        document.getElementById("win").style.display = "initial";
        document.getElementById("winp").innerHTML = count + " ze 196 państw zostało odnalezionych";
        document.getElementById("winScore").innerHTML = "Zdobyte punkty: " + score;
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
[false, 1, "Algeria", "Algieria", "Algierska Republika Ludowo-Demokratyczna"],
[false, 2, "Angola", "Angola", "Republika Angoli"],
[false, 3, "Benin", "Benin", "Republika Beninu"],
[false, 4, "Botswana", "Botswana", "Republika Botswany"],
[false, 5, "Burkina Faso", "Burkina Faso"],
[false, 6, "Burundi", "Burundi", "Republika Burundi"],
[false, 7, "Cameroon", "Kamerun", "Republika Kamerunu"],
[false, 8, "Cape Verde", "Republika Zielonego Przylądka"],
[false, 9, "Central African Republic", "Republika Środkowoafrykańska"],
[false, 10, "Chad", "Czad", "Republika Czadu"],
[false, 11, "Comoros" , "Komory", "Związek Komorów"],
[false, 12, "Democratic Republic of the Congo" , "Demokratyczna Republika Konga", "DR Konga"],
[false, 13, "Djibouti", "Dżibuti", "Republika Dżibuti"],
[false, 14, "Egypt", "Egipt", "Arabska Republika Egiptu"],
[false, 15, "Equatorial Guinea", "Gwinea Równikowa", "Republika Gwinei Równikowej"],
[false, 16, "Eritrea", "Erytrea", "Państwo Erytrea"],
[false, 17, "Eswatini", "Eswatini", "Królestwo Eswatini"],
[false, 18, "Ethiopia", "Etiopia", "Federalna Demokratyczna Republika Etiopii"],
[false, 19, "Gabon", "Gabon", "Republika Gabońska"],
[false, 20, "Ghana", "Ghana", "Republika Ghany"],
[false, 21, "Guinea", "Gwinea", "Republika Gwinei"],
[false, 22, "Guinea-Bissau", "Gwinea Bissau", "Gwinea-Bissau", "Republika Gwinei Bissau", "Republika Gwinei-Bissau"],
[false, 23, "Ivory Coast", "Wybrzeże Kości Słoniowej", "Republika Wybrzeży Kości Słoniowej"],
[false, 24, "Kenya", "Kenia", "Republika Kenii"],
[false, 25, "Lesotho", "Lesoto", "Królestwo Lesoto"],
[false, 26, "Liberia", "Liberia", "Republika Liberii"],
[false, 27, "Libya", "Libia", "Państwo Libia"],
[false, 28, "Madagascar", "Madagaskar", "Republika Madagaskaru"],
[false, 29, "Malawi", "Malawi", "Republika Malawi"],
[false, 30, "Mali", "Mali", "Republika Mali"],
[false, 31, "Mauritania", "Mauretania", "Islamska Republika Mauretańska"],
[false, 32, "Mauritius", "Mauritius", "Republika Mauritiusu"],
[false, 33, "Morocco", "Maroko", "Królestwo Marokańskie"],
[false, 34, "Mozambique", "Mozambik", "Republika Mozambiku"],
[false, 35, "Namibia", "Namibia", "Republika Namibii"],
[false, 36, "Niger", "Niger", "Republika Nigru"],
[false, 37, "Nigeria", "Nigeria", "Federalna Republika Nigerii"],
[false, 38, "Republic of the Congo", "Kongo", "Republika Konga"],
[false, 39, "Rwanda", "Rwanda", "Republika Rwandy"],
[false, 40, "Sao Tome and Principe", "Wyspy Świętego Tomasza i Książęca", "Wyspy św Tomasza i Książęca", "Wyspy Świętego Tomasza", "Wyspy św Tomasza"],
[false, 41, "Senegal", "Senegal", "Republika Senegalu"],
[false, 42, "Seychelles", "Seszele", "Republika Seszeli"],
[false, 43, "Sierra Leone", "Sierra Leone", "Republika Sierra Leone"],
[false, 44, "Somalia", "Somalia", "Federalna Republika Somalii"],
[false, 45, "South Africa", "RPA", "Południowa Afryka", "Republika Południowej Afryki"],
[false, 46, "South Sudan", "Sudan Południowy", "Południowy Sudan", "Republika Sudanu Południowego"],
[false, 47, "Sudan", "Sudan", "Republika Sudanu"],
[false, 48, "Tanzania", "Tanzania", "Zjednoczona Republika Tanzanii"],
[false, 49, "The Gambia", "Republic of the Gambia", "Gambia"],
[false, 50, "Togo", "Togo", "Republika Togijska"],
[false, 51, "Tunisia", "Tunezja", "Republika Tunezyjska"],
[false, 52, "Uganda", "Uganda", "Republika Ugandy"],
[false, 53, "Zambia", "Zambia", "Republika Zambii"],
[false, 54, "Zimbabwe", "Zimbabwe", "Republika Zimbabwe"],
//ASIA
[false, 55, "Afghanistan", "Afganistan", "Islamski Emirat Afganistanu"],
[false, 56, "Armenia", "Armenia", "Republika Armenii"],
[false, 57, "Azerbaijan", "Azerbejdżan", "Republika Azerbejdżanu"],
[false, 58, "Bahrain", "Bahrajn", "Królestwo Bahrajnu"],
[false, 59, "Bangladesh", "Bangladesz", "Ludowa Republika Bangladeszu"],
[false, 60, "Bhutan", "Bhutan", "Królestwo Bhutanu"],
[false, 61, "Brunei", "Brunei", "Państwo Brunei Darussalam"],
[false, 62, "Cambodia", "Kambodża", "Krolestwo Kambodży"],
[false, 63, "China", "Chiny", "Chińska Republika Ludowa"],
[false, 64, "Cyprus", "Cypr", "Republika Cypru"],
[false, 65, "East Timor", "Timor Wschodni", "Wschodni Timor", "Demokratyczna Republika Timoru Wschodniego"],
[false, 66, "Georgia", "Gruzja"],
[false, 67, "India", "Indie", "Republika Indii"],
[false, 68, "Indonesia", "Indonezja", "Republika Indonezji"],
[false, 69, "Iran", "Iran", "Islamska Republika Iranu"],
[false, 70, "Iraq", "Irak", "Republika Iraku"],
[false, 71, "Israel", "Izrael", "Państwo Izrael"],
[false, 72, "Japan", "Japonia"],
[false, 73, "Jordan", "Jordania", "Haszymidzkie Królestwo Jordanii"],
[false, 74, "Kazakhstan", "Kazachstan", "Republika Kazachstanu"],
[false, 75, "Kuwait", "Kuwejt", "Państwo Kuwejt"],
[false, 76, "Kyrgyzstan", "Kirgistan", "Republika Kirgiska"],
[false, 77, "Laos", "Laos", "Laotańska Republika Ludowo-Demokratyczna"],
[false, 78, "Lebanon", "Liban", "Republika Libańska"],
[false, 79, "Maldives", "Malediwy", "Republika Malediwów"],
[false, 80, "Malysia", "Malezja"],
[false, 81, "Mongolia", "Mongolia"],
[false, 82, "Myanmar", "Mjanma", "Birma", "Związek Birmański", "Republika Związku Mjanmy"],
[false, 83, "Nepal", "Nepal", "Federalna Demokratyczna Republika Nepalu"],
[false, 84, "North Korea", "Korea Północna", "Północna Korea","Koreańska Republika Ludowo-Demokratyczna", "KRLD"],
[false, 85, "Oman", "Oman", "Sułtanat Omanu"],
[false, 86, "Pakistan", "Pakistan", "Islamska Republika Pakistanu"],
[false, 87, "Philippines", "Filipiny", "Republika Filipin"],
[false, 88, "Qatar", "Katar", "Państwo Katar"],
[false, 89, "Saudi Arabia", "Arabia Saudyjska", "Królestwo Arabii Saudyjskiej"],
[false, 90, "Singapore", "Singapur", "Republika Singapuru"],
[false, 91, "South Korea", "Korea Południowa", "Południowa Korea", "Republika Korei"],
[false, 92, "Sri Lanka", "Sri Lanka", "Demokratyczno-Socjalistyczna Republika Sri Lanki"],
[false, 93, "Syria", "Syria", "Syryjska Republika Arabska"],
[false, 94, "Taiwan", "Tajwan", "Republika Chińska"],
[false, 95, "Tajikistan", "Tadżykistan", "Republika Tadżykistanu"],
[false, 96, "Thailand", "Tajlandia", "Królestwo Tajlandii"],
[false, 97, "Turkmenistan", "Turkmenistan", "Republika Turkmenistanu"],
[false, 98, "United Arab Emirates", "Zjednoczone Emiraty Arabskie", "ZEA", "Emiraty"],
[false, 99, "Uzbekistan", "Uzbekistan", "Republika Uzbekistanu"],
[false, 100, "Vietnam", "Wietnam", "Socjalistyczna Republika Wietnamu"],
[false, 101, "Yemen", "Jemen", "Republika Jemeńska"],
//AUSTRALIA
[false, 102, "Australia", "Australia", "Związek Australijski"],
[false, 103, "Fiji", "Fidzi", "Republika Fidżi"],
[false, 104, "Kiribati", "Kiribati", "Republika Kiribati"],
[false, 105, "Marshall Islands", "Wyspy Marshalla", "Republika Wysp Marshalla"],
[false, 106, "Micronesia", "Mikronezja", "Sfederowane Stany Mikronezji"],
[false, 107, "Nauru", "Nauru", "Republika Nauru"],
[false, 108, "New Zealand", "Nowa Zelandia"],
[false, 109, "Palau", "Palau", "Republika Palau"],
[false, 110, "Papua New Guinea", "Papua-Nowa Gwinea", "Papua Nowa Gwinea", "Niezależne Państwo Papui-Nowej Gwinei"],
[false, 111, "Samoa", "Samoa", "Niezależne Państwo Samoa"],
[false, 112, "Solomon Islands", "Wyspy Salomona"],
[false, 113, "Tonga", "Tonga", "Królestwo Tonga"],
[false, 114, "Tuvalu", "Tuvalu", "Tuwalu"],
[false, 115, "Vanuatu", "Vanuatu", "Republika Vanuatu"],
//EUROPE
[false, 116, "Albania", "Albania", "Republika Albanii"],
[false, 117, "Andorra", "Andora", "Księstwo Andory"],
[false, 118, "Austria", "Austria", "Republika Austrii"],
[false, 119, "Belarus", "Białoruś", "Republika Białorusi"],
[false, 120, "Belgium", "Belgia", "Królestwo Belgii"],
[false, 121, "Bosnia and Herzegovina", "Bośnia i Hercegowina", "Bośnia", "BiH"],
[false, 122, "Bulgaria", "Bułgaria", "Republika Bułgarii"],
[false, 123, "Croatia", "Chorwacja", "Republika Chorwacji"],
[false, 124, "Czech Republic", "Czechy", "Republika Czeska"],
[false, 125, "Denmark", "Dania"],
[false, 126, "Estonia", "Estonia", "Republika Estońska"],
[false, 127, "Finland", "Finlandia", "Republika Finlandii"],
[false, 128, "France", "Francja", "Republika Francuska"],
[false, 129, "Germany", "Niemcy", "Republika Federalna Niemiec"],
[false, 130, "Greece", "Grecja", "Republika Grecka"],
[false, 131, "Hungary", "Węgry"],
[false, 132, "Iceland", "Islandia"],
[false, 133, "Ireland", "Irlandia", "Republika Irlandii"],
[false, 134, "Italy", "Włochy", "Republika Włoska"],
[false, 135, "Kosovo", "Kosowo", "Republika Kosowa"],
[false, 136, "Latvia", "Łotwa", "Republika Łotwy"],
[false, 137, "Liechtenstein", "Liechtenstein", "Księstwo Liechtenstein"],
[false, 138, "Lithuania", "Litwa", "Republika Litewska"],
[false, 139, "Luxembourg", "Luksemburg", "Wielkie Księstwo Luksemburga"],
[false, 140, "Malta", "Malta", "Republika Malty"],
[false, 141, "Moldova", "Mołdawia", "Republika Mołdawii"],
[false, 142, "Monaco", "Monako", "Księstwo Monako"],
[false, 143, "Montenegro", "Czarnogóra"],
[false, 144, "Netherlands", "Holandia", "Królestwo Niderlandów", "Holland"],
[false, 145, "North Macedonia", "Macedonia Północna", "Macedonia", "Północna Macedonia", "Republika Macedonii Północnej"],
[false, 146, "Norway", "Norwegia", "Królestwo Norwegii"],
[false, 147, "Poland", "Polska", "Rzeczpospolita Polska"],
[false, 148, "Portugal", "Portugalia", "Republika Portugalska"],
[false, 149, "Romania", "Rumunia"],
[false, 150, "Russia", "Rosja", "Federacja Rosyjska"],
[false, 151, "San Marino", "San Marino", "Republika San Marino", "Najjaśniejsza Republika San Marino"],
[false, 152, "Serbia", "Serbia", "Republika Serbii"],
[false, 153, "Slovakia", "Słowacja", "Republika Słowacka"],
[false, 154, "Slovenia", "Słowenia", "Republika Słowenii"],
[false, 155, "Spain", "Hiszpania", "Królestwo Hiszpanii"],
[false, 156, "Sweden", "Szwecja", "Królestwo Szwecji"],
[false, 157, "Switzerland", "Szwajcaria", "Konfederacja Szwajcarska"],
[false, 158, "Turkey", "Turcja", "Republika Turcji"],
[false, 159, "Ukraine", "Ukraina"],
[false, 160, "United Kingdom", "Wielka Brytania", "Zjednoczone Królestwo"],
[false, 161, "Vatican", "Watykan", "Państwo Watykańskie"],
//NORTH AMERICA
[false, 162, "Antigua and Barbuda", "Antigua i Barbuda", "Antigua"],
[false, 163, "Barbados", "Barbados"],
[false, 164, "Belize", "Belize"],
[false, 165, "Canada", "Kanada"],
[false, 166, "Costa Rica", "Kostaryka", "Republika Kostaryki"],
[false, 167, "Cuba", "Kuba", "Republika Kuby"],
[false, 168, "Dominica", "Dominika", "Wspólnota Dominiki"],
[false, 169, "Dominican Republic", "Dominikana", "Republika Dominikańska"],
[false, 170, "El Salvador", "Salwador", "Republika Salwadoru"],
[false, 171, "Grenada", "Grenada"],
[false, 172, "Guatemala", "Gwatemala", "Republika Gwatemali"],
[false, 173, "Haiti", "Haiti", "Republika Haiti"],
[false, 174, "Honduras", "Honduras", "Republika Hondurasu"],
[false, 175, "Jamaica", "Jamajka"],
[false, 176, "Mexico", "Meksyk", "Meksykańska Stany Zjednoczone"],
[false, 177, "Nicaragua", "Nikaragua", "Republika Nikaragui"],
[false, 178, "Panama", "Panama", "Republika Panamy"],
[false, 179, "Saint Kitts and Nevis", "Saint Kitts i Nevis", "St Kitts i Nevis", "Federacja Saint Kitts i Nevis", "Federacja St Kitts i Nevis", "Saint Kitts", "St Kitts"],
[false, 180, "Saint Lucia", "Saint Lucia", "St Lucia"],
[false, 181, "Saint Vincent and the Grenadines", "Saint Vincent i Grenadyny", "St Vincent i Grenadyny", "Saint Vincent", "St Vincent"],
[false, 182, "The Bahamas", "Bahamy", "Wspólnota Bahamów"],
[false, 183, "Trinidad and Tobago", "Trydnidad i Tobago", "Trynidad"],
[false, 184, "United States", "Stany Zjednoczone Ameryki", "Stany Zjednoczone", "Ameryka", "USA"],
//SOUTH AMERICA
[false, 185, "Argentina", "Argentyna", "Republika Argentyńska"],
[false, 186, "Bolivia", "Boliwia", "Wielonarodowe Państwo Boliwia"],
[false, 187, "Brazil", "Brazylia", "Federacyjna Republika Brazylii"],
[false, 188, "Chile", "Chile", "Republika Chile"],
[false, 189, "Colombia", "Kolumbia", "Republika Kolumbii"],
[false, 190, "Ecuador", "Ekwador", "Republika Ekwadoru"],
[false, 191, "Guyana", "Gujana Francuska", "Gujana"],
[false, 192, "Paraguay", "Paragwaj", "Republika Paragwaju"],
[false, 193, "Peru", "Peru", "Republika Peru"],
[false, 194, "Suriname", "Surinam", "Republika Surinamu"],
[false, 195, "Uruguay", "Urugwaj", "Wschodnia Republika Urugwaju"],
[false, 196, "Venezuela", "Wenezuela", "Boliwarska Republika Wenezueli"]
];
        

     



 




//THIS PART OF THE CODE IS RESPONSBILE FOR ZOOMING MAP

//SVG VARIABLE IS ASSIGNED WITH ELEMENT OF MAPSVG ID
var svg = document.getElementById("mapSvg");

//VARIABLE POINT REPRESENTS A 2D POINT IN THE SVG COORDINATE SYSTEM
var point = svg.createSVGPoint();

//VIEVBOX VARIABLE CONTAINS BASE VALUES OF VIEWBOX
var viewBox = svg.viewBox.baseVal;

//BOUNDS OF SVG POSITION
var minY = document.getElementById("svg-container").offsetTop;
var maxY = document.getElementById("svg-container").offsetHeight + document.getElementById("svg-container").offsetTop;
var minX = document.getElementById("svg-container").offsetLeft;
var maxX = document.getElementById("svg-container").offsetWidth + document.getElementById("svg-container").offsetLeft;

window.addEventListener("resize", function(event) {
    minY = document.getElementById("svg-container").offsetTop;
    maxY = document.getElementById("svg-container").offsetHeight + document.getElementById("svg-container").offsetTop;
    minX = document.getElementById("svg-container").offsetLeft;
    maxX = document.getElementById("svg-container").offsetWidth + document.getElementById("svg-container").offsetLeft;
}, true)

//CACHEDVIEWBOX VARIABLE CONTAINS DEFAULT VIEWBOX VALUES
var cachedViewBox = {
  x: viewBox.x,
  y: viewBox.y,
  width: viewBox.width,
  height: viewBox.height
};

//EVENT LISTENER LOOKING FOR MOUSE CLICK
window.addEventListener("click", onClick);

function onClick(event) {
  
    event.preventDefault();
  
    window.removeEventListener("click", onClick);
    window.addEventListener("click", resetView);
    
    //SCALABLEFACTOR IS A ZOOM MULTIPLIER
    var scaleFactor = 5;

    var scaleDelta = 1 / scaleFactor;

    //IF WE CLICK OUTSIDE SVG MAP, NOTHING HAPPENS, ELSE THE MAP WILL ENLARGE
    if(event.clientX > maxX || event.clientX < minX || event.clientY > maxY || event.clientY < minY){
       
    } else {
        point.x = event.clientX;
        point.y = event.clientY;
        var startPoint = point.matrixTransform(svg.getScreenCTM().inverse());
      
        var fromVars = {
          x: viewBox.x,
          y: viewBox.y,
          width: viewBox.width,
          height: viewBox.height,
          //ease: Power2.easeOut
        };
        
        viewBox.x -= (startPoint.x - viewBox.x) * (scaleDelta - 1);
        viewBox.y -= (startPoint.y - viewBox.y) * (scaleDelta - 1);
        viewBox.width *= scaleDelta;
        viewBox.height *= scaleDelta;
          
        TweenLite.from(viewBox, 0.1, fromVars);  
    }
  
}

//IF MAP IS ENLARGED, THIS FUNCTION IS TRIGGERED AND ZOOM OUT THE MAP
function resetView() {
    if(event.clientX > maxX || event.clientX < minX || event.clientY > maxY || event.clientY < minY){
       
    } else{
        TweenLite.to(viewBox, 0.1, {
            x: cachedViewBox.x,
            y: cachedViewBox.y,
            width: cachedViewBox.width,
            height: cachedViewBox.height,
            onComplete: function() {
                window.removeEventListener("click", resetView);
                window.addEventListener("click", onClick);
              }
          });
    }
  
}


 

