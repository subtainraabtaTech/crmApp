/**
 * Created by subtainishfaq on 10/30/16.
 */
angular.module('yapp')
  .controller('ContactPersonEditCtrl', function($scope, $state,$sce,contactpersonService,$rootScope,SeatEatsConstants,toastr,$stateParams,$localStorage,simpleObj) {

    $scope.$state = $state;
    $scope.formFields=$localStorage.currentUser.forms.nodes;
    if(angular.isDefined($scope.formFields[0].nodes))
      $scope.formFields=$scope.formFields[0].nodes[1];

    $scope.model = simpleObj.data;
    $scope.validatorServer=$localStorage.currentUser.validation.companyValidator.contactPersons;
    $scope.settings=$localStorage.currentUser.validation.settings;


    $scope.selectOptionsCompanyType = {
      filter: "contains",
      placeholder: "Select contactType...",
      dataTextField: "content",
      dataValueField: "content",
      valuePrimitive: true,
      autoBind: false,
      animation: {
        close: {
          effects: "zoom:out",
          duration: 500
        }
      },
      dataSource: {
        type: "json",
        serverFiltering: true,
        transport: {
          read: {
            url: SeatEatsConstants.AppUrlApi+"masterdata?type=contactType"
          }
        }
      }
    };


    $scope.validator;


    $scope.publishCompany=publishCompany;

    function publishCompany()
    {
      if ($scope.validator.validate()) {

        $rootScope.scopeWorkingVariable = true;

        contactpersonService.putContactPerson($scope.model).then(function (response) {
          console.log(response);
          $rootScope.scopeWorkingVariable = false;
          if (response.status = 200)
            toastr.success('Done', 'Operation Complete');
          else
            toastr.error('Error', 'Operation Was not complete');

         // $state.go('contactPerson', {myParam: $scope.companyItem});
        // check the state history to go to previous company state
        });

      }
      else
        toastr.error('Error', 'Operation Was not complete');

    }

  });
