const express = require('express');
const bodyParse = require("body-parser");
const fs = require('fs');

const tools = require("../utils/javascripts/getPropertyTools");
const app = express();
app.use(bodyParse.json());

app.post("/firebase", function (req, res) {
    var result = JSON.parse(fs.readFileSync('../json/data.json'));

    var db = tools.getFireStore();
    var params = tools.getParams(result);

    tools.applyFilters(db, params, function (filteredResults)
    {
        console.log(filteredResults)
    })

    res.setHeader('Content-Type', 'application/json');
    var resJson = JSON.parse(fs.readFileSync('../json/response.json'));
    res.send(JSON.stringify(resJson));
});


app.listen(process.env.PORT||3000 , function(){
    console.log("Started server !");
});
