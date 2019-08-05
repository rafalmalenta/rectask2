import "./styles/style.sass";
import React from "react";
import ReactDOM from "react-dom";
import Weatherapp from "./Components/Weatherapp";
import Sunny from "./assets/Sunny.png";
import RainAndCloudy from "./assets/RainAndCloudy.png"
import Cloudy from "./assets/Cloudy.png"
import RainLight from "./assets/RainLight.png"
import PartlyCloudy from "./assets/PartlyCloudy.png"

const app = document.getElementById("app");

ReactDOM.render(<Weatherapp/>,app)