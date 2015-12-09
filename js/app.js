// app.js

// initialize app and module
var app = angular.module('jobTracker', ['ngRoute']);

app.config(function($routeProvider) {
    // route for home page
    $routeProvider.when('/', {
        templateUrl: '/pages/home.html',
        controller: 'MainController'
    })

    .when('/jobs', {
        templateUrl: '/pages/jobs.html',
        controller: 'JobsController'
    });

});


// configure routes
app.factory('jobService', function() {

    return {
        storeJob: function(newJob) {
            // log and store each job in chrome storage
            chrome.storage.sync.set(newJob, function() {
                console.log(newJob + "stored successfully!");
            });
        },
        removeJob: function(jobKey){
            // remove specific job
            chrome.storage.sync.remove(jobKey, function(){
                console.log(jobKey + "removed!");
            });
        },
        retrieveJobs: function(callback) {
            // log all jobs stored in chrome storage
            chrome.storage.sync.get(null, function(obj) {
                console.log(JSON.stringify(obj, null, "\t"));
                callback(obj);
            });
        },
        clearJobs: function() {
            chrome.storage.sync.clear();
        }
    };
});

// directive for resolving external urls
app.filter("urlFilter", function() {
    return function(link) {
        var result;
        var startingUrl = "http://";
        var httpsStartingUrl = "https://";
        if (link.startWith(startingUrl) || link.startWith(httpsStartingUrl)) {
            result = link;
        } else {
            result = startingUrl + link;
        }
        return result;
    };
});
String.prototype.startWith = function(str) {
    return this.indexOf(str) == 0;
};