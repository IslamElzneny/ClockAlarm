
const select_hours=document.querySelector(".hour_section select"),
      select_minutes=document.querySelector(".minute_section select"),
      selection_time_day=document.querySelector('.selection_time_day select'),
      setAlart_btn=document.querySelector(".creation_alart button"),
      content=document.querySelector('.container_section_clock .content'),
      currentTime=document.getElementById('timer');

let alermTime,isSetAlerm=false,
    tone=new Audio('./file/alarm.mp3');

function displayTime(){
    
    var dateTime=new Date(),
    hour=dateTime.getHours(),
    mintuse=dateTime.getMinutes(),
    second=dateTime.getSeconds(),
    ampm='AM';

    if(hour>=12){
        hour=hour-12;
        ampm='PM';
    }
    
    hour==0?hour==12:hour;
    hour<10?hour="0"+hour:hour;
    mintuse<10?mintuse="0"+mintuse:mintuse;
    second<10?second="0"+second:second;

    currentTime.innerText=`${hour}:${mintuse}:${second} ${ampm}`;

    if(alermTime == `${hour}:${mintuse} ${ampm}`){
        tone.play();
        tone.loop=true;
    }


}

setInterval(displayTime,100);

function printed_option_element(parentEl,numOfEl){

    for (let i=1;i<numOfEl+1;i++){

        let option_el=document.createElement('option'),
            num = document.createTextNode(i>9?i:i='0'+i);
            
            // set attribute value is number of hours
            option_el.value=i;
            option_el.appendChild(num);
            parentEl.appendChild(option_el);
    }
}
printed_option_element(select_hours,12);
printed_option_element(select_minutes,59);


// Create function clock alert 



function setAlart(){

    if(isSetAlerm){
        alermTime="";
        tone.pause();
        content.classList.remove('disable');
        setAlart_btn.innerText='Set Alerm';
        return isSetAlerm=false;
    }

    let time=`${select_hours.value}:${select_minutes.value} ${selection_time_day.value}`;

    if(time.includes('hour') || time.includes('minute') || time.includes('AM/PM')){
        return alert("Please, selected a valid time to set alart!")
    }
    isSetAlerm=true;
    alermTime=time;
    content.classList.add('disable');
    setAlart_btn.innerText='Clear Alerm';
}

setAlart_btn.addEventListener('click',setAlart);

