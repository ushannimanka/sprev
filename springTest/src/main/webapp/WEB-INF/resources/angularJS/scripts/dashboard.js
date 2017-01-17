var list = [];

var dashboardApp = angular.module('hello', ['ui.router','ngTable'])
    .service('sharedProperties', function ($base64) {
        var spList=null;

        return{
            getspList: function(){
            return spList;
        },
            setspList: function (splist) {
                spList=splist;
            }
        }
    }

);


dashboardApp.config(function($stateProvider, $urlRouterProvider) {



    // For any unmatched url, redirect to /state1
    $urlRouterProvider

        .otherwise("/Dashboard");
     //.otherwise("/api1");

    $stateProvider
        .state('upload', {
            url: "/sp_file",
            templateUrl: "resources/angularJS/views/file.html",
            controller: "home"
        })
        .state('list', {
            url: "/sp_list",
            templateUrl: "resources/angularJS/views/splist.html",
            controller: "SPfileUploadController"
        })
        .state('show', {
            url: "/sp_list",
            templateUrl: "resources/angularJS/views/show.jsp",
            controller: "ListController"
        })
        .state('filter', {
            url: "/filter",
            templateUrl: "resources/angularJS/views/filter.html",
            controller: "FilterController"
        })
});


dashboardApp.controller('home', function($scope) {

});


dashboardApp.controller('FilterController', function($scope,$http) {
   $scope.showTableFiltered = false;


    $scope.pdf = function () {
       // $(document).ready(function () {
        //     $('#PDF').tableExport({type: 'pdf', pdfFontSize: '7', escape: 'false'});
        //
        //     pdf.save('test.pdf');
        // });
        //// pdf.save('test1.pdf');

       // $scope.showTableFiltered = !$scope.showTableFiltered;


        console.debug("debug");
        $scope.filterNumber;
        $http.get('/filterpdf?spid=' + $scope.filterNumber).
            success(function (response) {
                console.debug("debug2");
                $scope.filteredUsers = response.responseData;
                list = response.responseData;
                console.debug( $scope.filteredUsers);

                var ret = [];
                ret.push('"' + Object.keys(list[0]).join('","') + '"');
                for (var i = 0, len = list.length; i < len; i++) {
                    var line = [];
                    for (var key in list[i]) {
                        if (list[i].hasOwnProperty(key)) {
                            line.push('"' + list[i][key] + '"');
                           // alert(ret.join('n'));
                           // alert(ret.join('\n'));
                           // var table = document.getElementById(ret).innerHTML;


                        }
                    }
                    ret.push(line.join(','));
                }

                var hiddenElement = document.createElement('a');

                hiddenElement.href = 'data:attachment/csv,' + encodeURI(ret.join('\n'));
                hiddenElement.target = '_blank';
                hiddenElement.download = 'myFile.csv';
                hiddenElement.click();
                return ret.join('\n');

            });


    };


    $scope.pdftest = function () {

        //var doc = new jsPDF();

        //var pdf = new jsPDF('p','pt','a4');
        //pdf.addHTML(document.getElementById('pdfTable'),function() {
        //    console.log('pdf generated');
        //});
        //pdf.save('pdfTable.pdf');
        var pdf = new jsPDF('p','pt','a4');
//var source = document.getElementById('table-container').innerHTML;
        console.log(document.getElementById('table-container'));
        var margins = {
            top: 25,
            bottom: 60,
            left: 20,
            width: 522
        };
// all coords and widths are in jsPDF instance's declared units
// 'inches' in this case
        pdf.text(20, 20, 'Hello world.');
        pdf.addHTML(document.body, margins.top, margins.left, {}, function() {
            pdf.save('test.pdf');
        });
        //doc.text (20 , 20 , 'TEST ME');
        //doc.addPage();
       //doc.text(20,20,'test page 2');
       // doc.save('Test.pdf');

        alert("hello");

    };


        $scope.filter = function () {

            $scope.showTableFiltered = !$scope.showTableFiltered;

            /** @namespace $scope.jobNumber */
            console.debug("debug");
            $scope.filterNumber;
            $http.get('/filter?filterNum=' + $scope.filterNumber).
                success(function (response) {
                    console.debug("debug2");
                    $scope.filteredUsers = response.responseData;
                    list = response.responseData;
                    console.debug( $scope.filteredUsers);
                });


        };


    $scope.tin = function () {

        $scope.showTableFiltered = !$scope.showTableFiltered;

        /** @namespace $scope.jobNumber */
        console.debug("debug");
        $scope.filterNumber;
        $http.get('/filter?filterNum=' + $scope.filterNumber).
            success(function (response) {
                console.debug("debug2");
                $scope.filteredUsers = response.responseData;
                list = response.responseData;
                console.debug( $scope.filteredUsers);

                var table = document.getElementById(filteredUsers).innerHTML;
                var data = table.replace(/<thead>/g,'')
                    .replace(/<\/thead>/g,'')
                    .replace(/<tbody>/g,'')
                    .replace(/<\/tbody>/g,'')
                    .replace(/<tbody>/g,'')
                    .replace(/<tr>/g,'')
                    .replace(/<\/tr>/g,'')
                    .replace(/<th>/g,'')
                    .replace(/<\/th>/g,'')
                    .replace(/<td>/g,'')
                    .replace(/<\/td>/g,'')
                    .replace(/\t/g,'')
                    .replace(/\n/g,'')

                // alert((table));
                var myLink = document.createElement('a');
                myLink.download = "csvname.csv";
                myLink.href ="data:application/csv," + escape(data);
                myLink.click();
            });


    };






    //filterSPpDf


    $scope.printPdf1 = function (uuid){
        $http({
            url : 'PDF_URL',
            method : 'GET',
            headers : {
                'Content-type' : 'application/pdf'
            },
            responseType : 'arraybuffer'
        }).success(function(data, status, headers, config) {
            var pdfFile = new Blob([ data ], {
                type : 'application/pdf'
            });
            var pdfUrl = URL.createObjectURL(pdfFile);
            var printwWindow = $window.open(pdfUrl);
            printwWindow.print();
        }).error(function(data, status, headers, config) {
            alert('Sorry, something went wrong')
        });
    };





    $scope.credit = function() {
        $http.get('/credit?creditNum=' + $scope.filterNumber).
            success(function (response) {

                $scope.creditedUsers = response.responseData;
            });


        $scope.selectedItems = [];

       /* $scope.$watch('filteredUsers', function(newValues){
            $scope.selectedItems.length = 0;
            angular.forEach(newValues, function(user) {
                if (user.id == true) {
                    $scope.selectedItems.push(user);
                }
            });
            console.log($scope.selectedItems);
        }, true);
*/

     /*   $("#filteredUsers tr").click(function(){
            $(this).addClass('selected').siblings().removeClass('selected');
            var value=$(this).find('td:first').html();
            alert(value);
        });*/

    };



});

dashboardApp.controller('SPfileUploadController', function($scope,$http) {
    $scope.jobNumber;

    $scope.createLog = function() {


        /** @namespace $scope.jobNumber */
        $scope.userPassword = {jobNum: $scope.jobNumber};

        $http.get('/spLog?jobNumber=' + $scope.jobNumber).
            success(function (response) {

            });
    };


        $scope.deleteLog = function() {


            /** @namespace $scope.jobNumber */


            $http.get('/clearLog?jobNumber=' + $scope.jobNumber).
                success(function (response) {

                });
        }

    });

dashboardApp.controller('ListController', function($scope,$http, $filter, ngTableParams) {


    $scope.users ="";
        /*$scope.users = [{"id":1,"first_name":"Philip","last_name":"Kim","email":"pkim0@mediafire.com","country":"Indonesia","ip_address":"29.107.35.8"},
            {"id":2,"first_name":"Judith","last_name":"Austin","email":"jaustin1@mapquest.com","country":"China","ip_address":"173.65.94.30"},
            {"id":3,"first_name":"Julie","last_name":"Wells","email":"jwells2@illinois.edu","country":"Finland","ip_address":"9.100.80.145"},
            {"id":4,"first_name":"Gloria","last_name":"Greene","email":"ggreene3@blogs.com","country":"Indonesia","ip_address":"69.115.85.157"},
        {"id":50,"first_name":"Andrea","last_name":"Greene","email":"agreene4@fda.gov","country":"Russia","ip_address":"128.72.13.52"}];
*/

    $scope.showTable = false;

    $scope.showLog = function () {

        $scope.showTable = !$scope.showTable;

        $http.get('/showLog').
            success(function (response) {
                $scope.users=response.responseData;
                console.log($scope.users);
            });
    };

    $scope.showLog();



  /*  $scope.usersTable = new ngTableParams({
        page: 1,
        count: 10
    }, {
        //total: $scope.users.length,
        getData: function ($defer, params) {
            $scope.data = $scope.users.slice((params.page() - 1) * params.count(), params.page() * params.count());
            $defer.resolve($scope.data);
        }
    });
*/
});

