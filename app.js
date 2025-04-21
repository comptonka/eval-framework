const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.static(__dirname + '/resource'));

app.get("/cloud", (req,res) => {
    res.sendFile(path.join(__dirname, "cloud.html"));
});

app.get("/multiquiz", (req,res) => {
    res.sendFile(path.join(__dirname, "dropQuiz_multi.html"));
})

app.get("/drag", (req,res) => {
    res.sendFile(path.join(__dirname, "dropQuiz.html"));
});

app.put("/drag", function(req,res){
    const filePath = path.join(__dirname,"drag.txt");
    fs.writeFile(filePath, "Quiz Complete", (err) => {
        if (err) {
            console.error("Error writing to file: ", err);
            res.status(500).send("Error saving data.");
        } 
        else {
            console.log("File Saved");
            res.status(200).send("Good to go");
        }
    });
});


app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", function(req,res){

    const formData = req.body;
    //console.log(formData.clusterUUID);
    compareInput(req,res);
    //return res.json(formData);

});

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

async function compareInput(req, res){

    const formData = req.body;
    if (formData.hasOwnProperty("clusterUUID") && typeof formData["clusterUUID"] === "string") {
        try{
            const clusterUUID = formData.clusterUUID;
            const elasticData = await getData();
            if (elasticData === clusterUUID){
                const filePath = path.join(__dirname,"data.txt");
                fs.writeFile(filePath, clusterUUID + "\n", (err) => {
                    if (err) {
                        console.error("Error writing to file: ", err);
                        res.status(500).send("Error saving data.");
                    } 
                    else {
                        console.log("Data saved to file " + clusterUUID);
                        res.json(elasticData);
                    }
                });
            }
            else{
                res.json("Not correct" + elasticData);
            }
        }
        catch (e){

        }
    }

}

async function getData(){
     
    const options = {
        method: "GET",
        headers: {
            "Authorization": "Basic <SECURITY>",
            "Content-Type": "application/json"
        }
    }
    try{
        const response = await fetch("<ELASTICADDRESS>",options);
        const data = await response.json();
        return data.cluster_uuid;
    }
    catch (error){
        console.error("Error", error);
    }
}



app.listen(3500, () => {
    console.log('Server listening on port:', "3500")
});
