//WORK IN PROGRESS - Davinod
import {React,useState,useEffect} from "react";

export default function Timer() {
    const [time,setTime] = useState("")
    useEffect(()=>{
        let countDownDate = new Date(new Date("Jan 26, 2022 00:00:00").getTime() + (24 * 60 * 60 * 1000)); //reset every day at 12am
        //update every second
        let x=setInterval(function(){
            //Get todays date and time
            let now = new Date().getTime()
            //find the distance between now and countdown date
            let distance = countDownDate - now

            //let days = Math.floor(distance/(1000*60*60*24));
            let hours = Math.floor(
                (distance % (1000*60*60*24)) / (1000*60*60)
            )
            let minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
            let seconds = Math.floor((distance % (1000*60)) / 1000)

            setTime(hours + "h " + minutes + "m " + seconds + "s ")
            if (distance < 0){
                clearInterval(x)
                setTime("New Quiz!") //not working
            }
        },1000)
    },[])
  return <div style={style}>{time}</div>
}

const style = {
    fontSize:"90px",
    textAlign: "center",
    color:"blue",
    width: "50%",
    backgroundColor: "#FFE5B4",

}