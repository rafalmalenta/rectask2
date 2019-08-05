import React from "react";
import DropdownItem from "./DropdownItem"
import PropTypes from "prop-types";

export default function Dropdown (props){
    function fetchWeather(city, day,){        
        props.fetchWeather(city, day);
    };
    var citiesList = [];           
    props.cities.map((city, i) => {             
        citiesList.push(<DropdownItem key = {i} city = {city} fetchWeather={fetchWeather} />)
    });
    return(
        <div class ="dropdown" > {props.dropdownValue}
            { citiesList }
        </div>
    );        
}
const cityShape = {
    id: PropTypes.string,
    name: PropTypes.string,
}
Dropdown.propTypes ={
    fetchWeather: PropTypes.func,
    cities: PropTypes.arrayOf(PropTypes.shape(cityShape))
}