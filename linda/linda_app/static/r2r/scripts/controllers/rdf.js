// Generated by CoffeeScript 1.8.0
(function() {
  'use strict';
  angular.module('app').controller('RdfCtrl', function($scope, $http, Config, Rdb, Rdf, R2rs) {
    $scope.rdb = Rdb;
    $scope.template = '';
    $scope.templateColumns = [];
    $scope.column = '';
    $scope.property = '';
    $scope.triples = [];
    $scope.$watch('template', function(value) {
      if (value != null) {
        if (value != null) {
          return $scope.templateColumns = value.match(/{[^}]*}/g);
        }
      }
    });
    $scope.$watch('templateColumns', function(value) {
      if (($scope.rdb.table != null) && ($scope.template != null) && (value != null)) {
        return R2rs.getSuggestedDBPediaTypes($scope.rdb.table, $scope.template).then(function(promise) {
          return $scope.suggestedTypes = promise;
        });
      }
    });
    $scope.$watch('column', function(value) {
      if (value != null) {
        return R2rs.getSuggestedLOVProperties(value).then(function(promise) {
          return $scope.suggestedProperties = promise;
        });
      }
    });
    $scope.types = function() {
      if ($scope.suggestedTypes != null) {
        return $scope.suggestedTypes.concat(Rdf.baseTypes);
      } else {
        return [].concat(Rdf.baseTypes);
      }
    };
    $scope.properties = function() {
      if ($scope.suggestedProperties) {
        return $scope.suggestedProperties.concat(Rdf.baseProperties);
      } else {
        return [].concat(Rdf.baseProperties);
      }
    };
    $scope.$watch('column', function(value) {
      if (value) {
        return R2rs.getSuggestedLOVProperties(Rdb.table, value).then(function(promise) {
          return $scope.suggestedProperties = promise;
        });
      }
    });
    return $scope.submitTemplate = function() {
      if ((Rdb.table !== '') && ($scope.template !== '')) {
        return R2rs.getSubjectsForTemplate(Rdb.table, Config.baseUri, $scope.template).then(function(promise) {
          return $scope.triples = promise;
        });
      }
    };
  });

}).call(this);
