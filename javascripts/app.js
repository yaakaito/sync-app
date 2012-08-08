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
  
  var objectList = new SyncAppObjectList();
  $scope.items = objectList.models;

  $scope.createAccount = function() {
    Parse.User.signUp($scope.naccount, $scope.npass, { ACL: new Parse.ACL() }, {
      success: function(user) {
        $scope.loginUser = Parse.User.current().get("username");
        $scope.$apply();
        alert("ユーザー登録に成功したよ。 o(*^▽^*)o");
      }
      , error: function(user, error) {
        alert("ユーザー登録に失敗しちゃったよ。 (ﾉ_･｡)");
      }
    });
  };

  $scope.login = function() {
    Parse.User.logIn($scope.laccount, $scope.lpass, {
      success: function(user) {
        $scope.loginUser = Parse.User.current().get("username");
        $scope.$apply();
        alert("ログインに成功したよ。 o(*^▽^*)o");
      },
      error: function(user, error) {
        alert("ログインに失敗しちゃったよ。 (ﾉ_･｡)");
      }
    });
  };

  $scope.addItem = function() {
    if(!Parse.User.current()) {
      alert("ログインするかユーザーつくってね。ヾ(@~▽~@)ノ");
      return ;
    }
    var item = new SyncAppObject({name : $scope.itemName
                                  , description : $scope.itemDescription
                                  , user : Parse.User.current()
                                  , ACL : new Parse.ACL(Parse.User.current())});
    objectList.add(item);
    $scope.items = objectList.models;
    item.save();
  };

  $scope.syncItems = function() {
    objectList.query = new Parse.Query(SyncAppObject);
    objectList.query.equalTo("user", Parse.User.current());
    objectList.fetch();
    $scope.items = objectList.models; 
  }

  Parse.initialize("ZmZd8uAiLo0jYP6rQmxZ4YyBprNVDg2hZqUoGane", "Etil6taJbynJCtWn5OlRvQ4t2pKmufwocoxTbxJg");
  if(Parse.User.current()) {
    $scope.loginUser = Parse.User.current().get("username");
  } else {
    $scope.loginUser = "not login";
  }
}
