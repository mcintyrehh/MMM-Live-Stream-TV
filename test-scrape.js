/* eslint-disable indent */
const axios = require("axios");

axios.get("https://www.earthcam.com/cams/newyork/timessquare/?cam=tsnorth_hd")
    .then(response => {
      console.log(typeof response.data)
      // console.log(response.data);
      const startJSON = response.data.indexOf("{\"cam\"")
      const endJSON = response.data.indexOf("\"related_cams\":") -2
      console.log(`startJSON: ${startJSON}`);
      console.log(`endJSON: ${endJSON}`);
      const slicedJSON = response.data.slice(startJSON, endJSON).concat("}");
      const parsedJSON = JSON.parse(slicedJSON)
      console.log(parsedJSON)
      const camName = Object.keys(parsedJSON.cam)[0]
      console.log(camName);
      console.log(parsedJSON.cam[camName].html5_streamingdomain)
      const liveStreamURL = parsedJSON.cam[camName].html5_streamingdomain + parsedJSON.cam[camName].html5_streampath

      console.log(liveStreamURL);
    })

// https://videos3.earthcam.com/fecnetwork/3983.flv/chunklist_w1167321633.m3u8