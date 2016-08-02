var app = angular.module('plotter',[])

app.controller('mainController',function($scope,$timeout,$window,$http){
	console.log('In a main controller');

	/**
	* Default Lat long positions
	*/
	var	myLatLng = {lat: 19.1069682, lng: 72.8954854};

	/**
	* Create a map object
	*/
	$scope.map = new google.maps.Map($window.document.getElementById('map'), {
		center: myLatLng,
		scrollwheel: false,
		zoom: 15
	});

	/**
	* Create a Marker
	*/
	$scope.marker = new google.maps.Marker({
		map: $scope.map,
		position: myLatLng,
		title: 'Driver Name'
	});

	/**
	* Function to update marker and location
	*/
	$scope.updateLocation = function(latLng){
		$scope.marker.setPosition(latLng)
		$scope.map.setCenter(latLng)
	}

	$scope.getLatLong = function(){
		var endpont = 'http://ec2-54-254-201-212.ap-southeast-1.compute.amazonaws.com/api/getLocation'
		var data = {driverId:0,tripId:1}
		console.log("sending post req")

		$http.post(endpont,data).success(function(response){
			console.log(JSON.stringify(response))

			var data = response.data.location || null
			if(data && data.length > 0)
				var coordidates = {lat:data[0].latitude,lng:data[0].longitude}
				$scope.updateLocation(coordidates)
		}).error(function(error){
			console.log("Got error",error)
		})	
	}

	//test 
	$scope.getLatLong();
	
})

app.factory('socket',function(){
	//TODO: Socket things will go here
})	

function initMap(myLatLng) {
	if(!myLatLng)
		var	myLatLng = {
			lat: 19.1069682,
			lng: 72.8954854
		};

	var map = new google.maps.Map(document.getElementById('map'), {
	  center: myLatLng,
	  scrollwheel: false,
	  zoom: 15
	});
	
	var marker = new google.maps.Marker({
	  map: map,
	  position: myLatLng,
	  title: 'Driver'
	});

	console.log("Initialising Func")
}