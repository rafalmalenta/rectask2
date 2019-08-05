import React from "react";
import PropTypes from "prop-types";

export default function WeatherItem (props){
    function focusChange(){
        props.focusChange(props.arrayIndex)
    };
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];  
    //Pozmieniałem wielkość liter w nazwach obrazkow aby wywolywać obrazek przekazujac nazwe propsa wprost 
    //zamiast pisac switcha
    var nameofday;
    if(props.arrayIndex==0){
        nameofday = "Today";
    }
    else
    {
        nameofday = days[new Date(props.date).getDay()];
    }    
    return(
        <div class="weatheritem" onClick={focusChange}>                           
            <div class="dayofweek">
            {nameofday}
            </div>                 
            <img  src = {`./assets/${props.type}.png`} alt ={props.type}></img>             
                           
            <div class="blockonsmall" >
            {/* W przykładzie te dwie wartości były wyrażone w stopniach ale nie mam pojęcia czym
            w istocie były, bo nie były one odpowiadającymi sobie fahrenhaitami i celcjuszami, 
            geometrycznymi chyba też nie
            więc użyłem w ich miejsce wartości precipitation i humidity */}
                <div class="precipitation">
                    {props.precipitation}% 
                </div>
                <div class="humidity">
                    {props.humidity}% 
                </div>
            </div>                                    
            <div class="pollen">
                Pollen {props.pollenCount}
            </div>              
        </div>           
    );
}

WeatherItem.propTypes = {
    focusChange: PropTypes.func.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    precipitation: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    pollenCount: PropTypes.number.isRequired,
}