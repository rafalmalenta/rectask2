import React from "react";
import PropTypes from "prop-types";

export default function DropdownItem (props){ 
    function fetchWeather(){
        props.fetchWeather(props.city, new Date() )
    };      
    return(
        <div> 
            <div onClick={fetchWeather}>{props.city.name}</div>
        </div>           
    );
}
const cityShape = {
    id: PropTypes.string,
    name: PropTypes.string,
}
DropdownItem.propTypes ={
    fetchWeather: PropTypes.func,
    cities: PropTypes.arrayOf(PropTypes.shape(cityShape))
}