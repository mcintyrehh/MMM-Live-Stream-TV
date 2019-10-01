/* eslint-disable indent */
const axios = require("axios");
const $ = require("cheerio");

axios.get("https://www.earthcam.com/usa/newyork/brooklynbridge/?cam=gzcchd")
    .then(response => {
      console.log(typeof response.data)
      const startJSON = response.data.indexOf("{\"cam\"")
      const endJSON = response.data.indexOf("\"related_cams\":") -2
      console.log(`startJSON: ${startJSON}`);
      console.log(`endJSON: ${endJSON}`);
      const slicedJSON = response.data.slice(startJSON, endJSON).concat("}");
      const parsedJSON = JSON.parse(slicedJSON)
      console.log(parsedJSON)
    })

// https://videos3.earthcam.com/fecnetwork/3983.flv/chunklist_w1167321633.m3u8