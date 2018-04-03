const fs = require('fs');
const fireBase = require("firebase");
require("firebase/firestore");
const config = JSON.parse(fs.readFileSync('../json/config.json'));

module.exports = {

    getFireStore: function () {


        var fireStoreConfig = {
            apiKey: "AIzaSyC2CoK_xtnmj9MCG5QxU5pI4clYSqJzKHk",
            authDomain: "real-estate-store.firebaseapp.com",
            databaseURL: "https://real-estate-store.firebaseio.com",
            projectId: "real-estate-store",
            storageBucket: "real-estate-store.appspot.com",
            messagingSenderId: "364621996821"
        };

        fireBase.initializeApp(fireStoreConfig);
        return fireBase.firestore();
    },

    getParams : function (data) {
        var params = [];
        params["propertyType"] = data.result.parameters["propertyType"];
        params["propertyConfig"] = data.result.parameters["propertyConfig"];
        params["city"] = data.result.parameters["city"];
        params["ownMethod"] = data.result.parameters["ownMethod"];
        params["budget"] = data.result.parameters["budget"];
        params["family"] = data.result.parameters["family"];
        params["companyName"] = data.result.parameters["companyName"];
        params["locality"] = data.result.parameters.locality["subadmin-area"];

        return params;
    },
    
    applyFilters : function (db, params, callback)
    {
        var propertyListings = new Array();
        var budgetFilter = db.collection(config.collection[0].name)
                            .where(config.collection[0].cost, "<=", params["budget"])
        var typeFilter = db.collection(config.collection[0].name)
                            .where(config.collection[0].type, "==", params["propertyType"])


        var propertyFilter = new Set();
        propertyFilter.add(budgetFilter);
        propertyFilter.add(typeFilter);


        budgetFilter.get()
                .then(function (docs)
                {
                    docs.forEach(function (doc)
                    {
                        propertyListings.push(doc.data());
                    })
                    callback(propertyListings);
                })
                .catch(function (err)
                {
                    console.log(err)
                    callback(null)
                })

    }

};