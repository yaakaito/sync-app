function AppCtrl($scope) {

  var SyncAppObject = Parse.Object.extend("SyncAppObject", {
    default: {
      description: "description"
    }
  });
  var SyncAppObjectList = Parse.Collection.extend({
    model: SyncAppObject
    , comparator : function(obj) {
      return obj.get("name");
    }
  });
  
  var list = new SyncAppObjectList();
  $scope.items = list.models;

  $scope.createAccount = function() {
  
  };

  $scope.login = function() {

  };

  $scope.addItem = function() {
    var item = new SyncAppObject({name : $scope.itemName, description : $scope.itemDescription});
    list.add(item);    
  };

  Parse.initialize("ZmZd8uAiLo0jYP6rQmxZ4YyBprNVDg2hZqUoGane", "Etil6taJbynJCtWn5OlRvQ4t2pKmufwocoxTbxJg");

}
