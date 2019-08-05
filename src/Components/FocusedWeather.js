import React from "react";
import PropTypes from "prop-types";

export default function FocusedWeather (props){    
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var monthname = months[new Date(props.date).getMonth()+1];
    var dayofmonth = new Date(props.date).getDate();        
    var dayofweek = days[new Date(props.date).getDay()];
    var fahrenhaits = Math.round((props.temperature*1.8)+32);   
    //Pozmieniałem wielkość liter w nazwach obrazkow aby wywolywać obrazek przekazujac nawe propsa wprost 
    //zamiast pisac switcha          
    return(
        <div class="focusedweather">                           
            <div class="dayofweek">
            {dayofweek}, {monthname} {dayofmonth}
            </div> 
            <div >{props.type}</div>
            <div class="half">
                <div class="imginline">                                
                    <img  src = {`./assets/${props.type}.png`}></img>                                 
                    <div style={{'fontSize':'50px'}} class="temperature">
                        {fahrenhaits}
                        <span style={{'fontSize':'20px','verticalAlign':'top'}}>°F</span>                         
                    </div>
                </div>                   
            </div>
            <div class="half">                
                <div class="precipitation">
                    precipitation : {props.precipitation}% 
                </div>
                <div class="humidity">
                    humidity: {props.humidity}% 
                </div>                 
                <div class="wind">
                    Wind: {props.windInfo.speed} {props.windInfo.direction}                              
                </div>
                <div class="pollen">
                Pollen count {props.pollenCount}
                </div>
            </div>            
        </div>           
    );
}

//windshape : PropTypes.shape( {
 //   direction: PropTypes.func,
 //   speed: PropTypes.nsaumber
//})
FocusedWeather.propTypes = { 
    temperature: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    precipitation: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    pollenCount: PropTypes.number.isRequired,
    windInfo: PropTypes.shape({
        direction: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired,       
    }).isRequired
}
