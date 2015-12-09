app.controller('MainController', function($scope, jobService) {

    $scope.update = function(job) {
        console.log(job);
        var currentJob = {};
        // set unique job key based on job title and job company
        var jobKey = (job.title + job.company).replace(/ /g, '');
        
        // sanitize date object (if it's present)
        if(job.date){
            job.date = job.date.toLocaleDateString();
        }

        currentJob[jobKey] = job;
        jobService.storeJob(currentJob);
        $scope.job = {};

    };

    $scope.reset = function() {
        $scope.job = {};
    };

    $scope.viewAll = function() {
        $scope.showJobs = $scope.showJobs === false ? true : false;
        // grab updated list of jobs
        jobService.retrieveJobs(function(jobs) {
            $scope.jobs = jobs;
            console.log($scope.jobs);
        });
    };

    $scope.clearAll = function() {
        jobService.clearJobs(null, function(obj) {
            console.log("All jobs cleared!");
        });
    };

});

app.controller('JobsController', function($scope, jobService) {

    $scope.load = function() {
        // grab initial list of jobs
        jobService.retrieveJobs(function(jobs) {
            $scope.jobs = jobs;
            console.log($scope.jobs);
        });
    };

    $scope.removeJob = function(jobTitle, jobCompany) {
        // resolve job's key
        var jobKey = (jobTitle + jobCompany).replace(/ /g, '');

        // remove job from view
        delete $scope.jobs[jobKey];

        // remove job from chrome.storage
        jobService.removeJob(jobKey);
    };

    $scope.clearAll = function() {
        jobService.clearJobs(null, function(obj) {
            console.log("All jobs cleared!");
        });
    };

});