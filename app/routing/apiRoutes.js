
//loading data through a few routes to a series of data sources, that will then be displayed

var friendsArray = require("../data/friends");

module.exports = function(app){

    //displaying the json data on the friends page
    app.get("/api/friends", function(req, res){
        res.json(friendsArray);
    });

    app.post("/api/friends", function(req, res){
        console.log(req.body);

        var currentUser = req.body;
        var bestMatch = [];
        var bestScore = 100;


        for (var i=0;i < friendsArray.length;i++){

            var dif = 0;

            for (var j=0;j<currentUser.scores.length;j++){
                dif += Math.abs(currentUser.scores[j] - friendsArray[i].scores[j]);
            }
            if (dif < bestScore) {
                bestMatch = friendsArray[i];
                bestScore = dif;
            }

        }

        friendsArray.push(currentUser);
        res.json(bestMatch);

    
    });
}