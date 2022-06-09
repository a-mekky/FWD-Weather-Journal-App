
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/* Global Variables */
const baseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "24eb815915108d14d37b1ad5dc5cc3d8";

document
  .getElementById("generate")
  .addEventListener("click", generateBtnHandler);

function generateBtnHandler() {
  const country = document.getElementById("country").value;
  const zip = document.getElementById("zip").value;

  getWeatherByZibCode(baseUrl, zip, country, apiKey);
}

const getWeatherByZibCode = async (baseUrl, zipcode, countryCode, apiKey) => {
  const res = await fetch(
    `${baseUrl}${zipcode},${countryCode}&appid=${apiKey}`
  );

  try {
    const data = await res.json();
    data.date = newDate;
    data.feelings = document.getElementById("feelings").value;
    //console.log(data);
    UpdateData(data);
  } catch (error) {
    console.log(error);
  }
};

const UpdateData = async (data) => {
  const res = await fetch("/weather/save", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (data) => {
    const res = await fetch("/weather");
    try {
      waetherData = await res.json();
      console.log(waetherData);
      document.getElementById("date").innerHTML = waetherData.date;
      document.getElementById("temp").innerHTML = waetherData.temp;
      document.getElementById("content").innerHTML = waetherData.feelings;
    } catch (error) {
      console.log(error);
    }
  });
};
