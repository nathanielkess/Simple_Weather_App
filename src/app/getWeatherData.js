export const getWeatherData = async city => {
  try {
    let response = await fetch(
      `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=4a6eeeaa6fb246ffbe1152344182008&q=${city}&format=json&num_of_days=1`
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
