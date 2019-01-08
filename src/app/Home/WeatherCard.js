import * as React from "react";
import styled, { css } from "styled-components";
import moment from "moment";

export const WeatherCard = ({ weatherItem, onClick }) => {
  return (
    <Wrapper onClick={onClick ? onClick : null}>
      <img
        src={weatherItem.weatherIconUrl[0].value}
        alt={`${weatherItem.weatherDesc[0].value} weather icon`}
      />
      <h3>
        {weatherItem.weatherDesc[0].value} :{" "}
        {weatherItem.temp_C ? weatherItem.temp_C : weatherItem.tempC} &#8451;
      </h3>
      <h3>
        {weatherItem.time
          ? weatherItem.time === "0"
            ? "12:00 am"
            : moment(weatherItem.time, "Hmm").format("hh:mm a")
          : weatherItem.observation_time}
      </h3>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(0,128,128, 0.5);
  h3 {
    margin: 0;
    text-align: center;
  }
  ${({ onClick }) => {
    if (onClick) {
      return css`
      cursor: pointer;
      `;
    }
  }}
`;
