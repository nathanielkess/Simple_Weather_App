import * as React from "react";
import styled, { injectGlobal } from "styled-components";

import { getWeatherData } from "../getWeatherData";
import { WeatherCard } from "./WeatherCard";

class Home extends React.Component {
  state = {
    city: "",
    hourlyConditions: [],
    currentConditions: null,
    currentDate: "",
    queryLocation: "",
    showHourly: false
  };

  showHourly = () => {
    this.setState({
      showHourly: !this.state.showHourly
    });
  };

  parseData = weatherData => {
    const hourlyConditions = weatherData.weather[0].hourly;
    const currentConditions = weatherData.current_condition[0];
    const currentDate = weatherData.weather[0].date;
    const queryLocation = weatherData.request[0].query;

    this.setState({
      hourlyConditions,
      currentConditions,
      currentDate,
      queryLocation
    });
  };

  handleCityUpdate = () => {
    let weatherData = "";
    if (this.state.city !== "") {
      getWeatherData(this.state.city).then(res => {
        if (res !== null) {
          weatherData = res;
          this.parseData(weatherData);
        }
      });
    }
    document.getElementById("city-input").value = "";
  };

  handleInputChange = e => {
    this.setState({
      city: e.target.value
    });
  };

  render() {
    return (
      <Wrapper>
        <h1>Weather App</h1>
        <label htmlFor="city-input">Please Enter A City</label>
        <Input type="text" id="city-input" onChange={this.handleInputChange} />
        <Button onClick={this.handleCityUpdate}>Get Weather</Button>
        {this.state.currentConditions ? (
          <WeatherWrapper>
            <WeatherCityTime>
              {`Weather for ${this.state.queryLocation} on ${
                this.state.currentDate
              }`}
            </WeatherCityTime>
            <WeatherCard
              onClick={this.showHourly}
              weatherItem={this.state.currentConditions}
            />
            {this.state.showHourly ? (
              <WeatherCardsHourly>
                {this.state.hourlyConditions.map((hourly, index) => (
                  <WeatherCard key={index} weatherItem={hourly} />
                ))}
              </WeatherCardsHourly>
            ) : null}
          </WeatherWrapper>
        ) : null}
      </Wrapper>
    );
  }
}

injectGlobal`
  * {
    box-sizing: border-box;
  }
`;

const WeatherCityTime = styled.div`
  font-size: 20px;
  padding-bottom: 20px;
  font-weight: bold;
`;

const Input = styled.input`
  margin-top: 10px;
  font-size: 12px;
  border: 1px solid lightgrey;
  width: 200px;
  padding: 5px;
  &:focus {
    outline: none;
    border: 1px solid teal;
  }
`;

const Button = styled.button`
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  width: 200px;
  padding: 5px;
  border: none;
  background-color:teal;
  border-radius: 4px;
  color: white;
  &:hover {
    background-color: rgba(0,128,128, 0.5);
    color: black;
    font-weight: bold;
  }
`;

const WeatherCardsHourly = styled.div`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WeatherWrapper = styled.div`
  display:flex; 
  padding-top: 20px;
  flex-direction: column;
  align-items: center;
`;

export default Home;
