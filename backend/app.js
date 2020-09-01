const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// app.post("/api/posts", (req, res, next) => {
  
//   console.log(post);
//   res.status(201).json({
//     message: 'Post added successfully'
//   });
// });


const API_KEY= "d5b44a7ead7a29ad2b779d6fefb1b5cf"
const ROOT_URL= `https://api.openweathermap.org/data/2.5/forecast?`


app.post('/api/posts/', async (req, res, next) => {

  const url = `${ROOT_URL}q=${req.body.cityName}&appid=${API_KEY}`;

  const resp = await axios.get(url)

  const { list } = resp.data;

  res.status(200).json({
    message: "Posts fetched successfully!",
    list: list.slice(0,5)
  });
});

module.exports = app;
