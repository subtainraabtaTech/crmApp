/**
 * Created by subtainishfaq on 11/4/16.
 */
/**
 * Created by subtainishfaq on 10/13/16.
 */

angular.module("yapp").factory('pitchesService',['$http','SeatEatsConstants', function($http,SeatEatsConstants){

  var game = {};

  game.getNewsList= function ()
  {

    var promise = $http.get(SeatEatsConstants.AppUrlApi+'games');
    return promise;
  };
  game.getPitchById= function (ID)
  {
debugger;
    var promise = $http.get(SeatEatsConstants.AppUrlApi+'pitches/'+ID);
    return promise;
  };

  game.deletePitchById= function (ID)
  {

    var promise = $http.delete(SeatEatsConstants.AppUrlApi+'pitches/'+ID);
    return promise;
  };


  game.postPitch=function (obj)
  {
    if(angular.isDefined(obj._id))
      return $http.put(SeatEatsConstants.AppUrlApi+'pitches/'+obj._id, obj);
    else
      return $http.post(SeatEatsConstants.AppUrlApi+'pitches/', obj);


  };


  return game;

}]);
