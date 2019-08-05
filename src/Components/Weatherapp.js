import React from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import WeatherItem from "./WeatherItem";
import FocusedWeather from "./FocusedWeather"

export default class Weatherapp extends React.Component{
    constructor(){
        super()        
        this.state = {
            cities:[],
            weather:[],
            fetching: null,
            focusedItemIndex: 0,
            dropdownValue : "Select City",

        };
        this.weather = []; //tymczasowa tablica
        this.daycount = 7; //na przykładzie lista składała się z 7 komponentów
    }
    fetchWeather(daycount, city, day ){
        //w celu pobierania pogody na określoną liczbę dni, nie narzuconą przes API wykonałem rekurencyjne fetchowanie
        this.setState({fetching:true});       
        var nextday = new Date(); 
        axios.get(`http://dev-weather-api.azurewebsites.net/api/city/${city.id}/weather?date=${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`)
            .then( (response) => {
                //Uważam że jest to optymalna metoda fetchowania aby uzyskać określoną liczbę rekordów zamiast pojedyńczego 
                //requesta i otrzymania 4 albo 5 rekordów            
                response.data.some(weatherforday => {
                    this.weather.push(weatherforday);                    
                    if (this.weather.length == daycount) return true;
                });
                if(this.weather.length < daycount){
                    nextday.setDate(day.getDate() + this.weather.length);             
                    this.fetchWeather(daycount, city, nextday );
                }
                else{
                    this.setState({weather: this.weather, fetching: false, dropdownValue: city.name});                                        
                    //this.setState({fetching: false});
                    //this.setState({dropdownValue: cityid})
                    this.weather = [];
                }        
             })
            .catch((error) =>{
                // handle error
                console.log(error);
            })
            .finally(() => {  
                              
        });
    }
    fetchCities(){        
        axios.get('http://dev-weather-api.azurewebsites.net/api/city')
            .then( (response) => {
            this.setState({cities : response.data});            
        })
        .catch((error) =>{
        // handle error
        console.log(error);
        })
        .finally(() => {               
        });
    }
    componentDidMount(){      
       this.fetchCities();       
    }
    componentWillUnmount(){

    };
    focusChange(arrayIndex){
        this.setState({focusedItemIndex : arrayIndex});
        
    };   
    render(){  
        var weatherList=[];
        var focuseditem=[];
        if(this.state.weather.length > 0){            
            focuseditem.push(<FocusedWeather
                key ={this.state.focusedItemIndex}
                focusChange = {this.focusChange.bind(this)}
                { ...this.state.weather[this.state.focusedItemIndex] }                
                />)        
            }
        this.state.weather.map((Weather, i) => {
            weatherList.push(<WeatherItem                
                key={i}                
                focusChange={this.focusChange.bind(this)}
                arrayIndex={i}
                { ...Weather } 
                />)
        });
        //console.log(this.daycount)

        return(
            <div class="weatherapp"> 
                <Dropdown fetchWeather =
                    {this.fetchWeather.bind(this, this.daycount)} cities={this.state.cities} dropdownValue={this.state.dropdownValue}
                    />
                {this.state.fetching != true? [ focuseditem ] : ""} 
                {this.state.fetching != true? ( [ weatherList ]) : (<div>Fetching data</div>) }                
            </div>
        );
       
       
    }
}
