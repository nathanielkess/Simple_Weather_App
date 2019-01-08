export const getWeatherData = async city => {
  try {
    let response = await fetch(
      `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=66c65720d3214c86a5d214424190801&q=${city}&format=json&num_of_days=1`
    );
    response = await response.json();
    //to catch any errors returned by server
    if (response.data.error) {
      return null;
    }
    return response.data;
  } catch (error) {
    //to catch any server errors ie. server down
    console.log(error);
    return null;
  }
};
