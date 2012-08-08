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
    Parse.User.signUp($scope.naccount, $scope.npass, { ACL: new Parse.ACL() }, {
      success: function(user) {
        alert("ユーザー登録に成功したよ。 o(*^▽^*)o");
      }
      , error: function(user, error) {
        alert("ユーザー登録に失敗しちゃったよ。 (ﾉ_･｡)");
      }
    });
  };

  $scope.login = function() {

  };

  $scope.addItem = function() {
    var item = new SyncAppObject({name : $scope.itemName, description : $scope.itemDescription});
    list.add(item);
    item.save();   
  };

  Parse.initialize("ZmZd8uAiLo0jYP6rQmxZ4YyBprNVDg2hZqUoGane", "Etil6taJbynJCtWn5OlRvQ4t2pKmufwocoxTbxJg");

}
