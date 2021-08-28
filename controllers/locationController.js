
let locations = require("../data/geoLocation.json");



const { cosineSimilarity, textCosineSimilarity } =  require('../utils/similarity.js');



const geoLocation = {"suggestions":[]};
const geoLocationarr = []


exports.getlocations = (req, res) => {
 
    const latitude = req.query.latitude;
    const longitude = req.query.longitude
    const name = req.query.q;
    console.log(latitude,longitude,name);


    
    if(longitude!= undefined && latitude!=undefined){
        
        locations.forEach(location => {
            const locationSimilarity = Number(cosineSimilarity([latitude,longitude],[location["lat"],location["long"]]));
            const nameSimilarity  = Number(textCosineSimilarity(name,location["name"]));
            const score = Number((( locationSimilarity + nameSimilarity )/2).toFixed(2))
            console.log(typeof(score));
            geoLocationarr.push({
                "name":location["name"],
                "latitude": location["lat"],
                "longitude": location["long"],
                "score": score
            })
        });
        
        
    }
    else if (longitude!=undefined) {
        locations.forEach(location => {
            const locationSimilarity = Number(cosineSimilarity([longitude],[location["long"]]));
            const nameSimilarity  = Number(textCosineSimilarity(name,location["name"]));
            const score = Number((( locationSimilarity + nameSimilarity )/2).toFixed(2));
            //console.log(typeof(locationSimilarity),typeof(nameSimilarity));
            geoLocationarr.push({
                "name":location["name"],
                "latitude": location["lat"],
                "longitude": location["long"],
                "score": score
            })
        });
        
        

    }
    else if (latitude!=undefined) {
        locations.forEach(location => {
            const locationSimilarity = Number(cosineSimilarity([latitude],[location["lat"]]));
            const nameSimilarity  = Number(textCosineSimilarity(name,location["name"]));
            const score = Number((( locationSimilarity + nameSimilarity )/2).toFixed(2));
            //console.log(typeof(locationSimilarity),typeof(nameSimilarity));
            geoLocationarr.push({
                "name":location["name"],
                "latitude": location["lat"],
                "longitude": location["long"],
                "score": score
            })
        });
        
        

    }
    else if (name!=undefined) {
        locations.forEach(location => {
            const nameSimilarity  = Number(textCosineSimilarity(name,location["name"]));
            const score = Number((nameSimilarity).toFixed(2));
            //console.log(typeof(locationSimilarity),typeof(nameSimilarity));
            geoLocationarr.push({
                "name":location["name"],
                "latitude": location["lat"],
                "longitude": location["long"],
                "score": score
            })
        });
        
        

    }

    else {
        geoLocation["suggestions"] = geoLocationarr;
        res.status(200).json(geoLocation);
        
    }
    geoLocationarr.sort((a, b) => b.score - a.score);
    geoLocation["suggestions"] = geoLocationarr;


    res.status(200).json(geoLocation);
}


//"score": textCosineSimilarity(req.query.q,name)