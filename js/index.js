 var firebaseConfig = {
    apiKey: "AIzaSyAsipKV_XXvaBVPJhDzzGOTWCSMe4H0WQ0",
    authDomain: "home-finder-app-d25ca.firebaseapp.com",
    databaseURL: "https://home-finder-app-d25ca-default-rtdb.firebaseio.com",
    projectId: "home-finder-app-d25ca",
    storageBucket: "home-finder-app-d25ca.appspot.com",
    messagingSenderId: "362873940150",
    appId: "1:362873940150:web:734a8d7b3b0239479a9e17"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function()
  
  {
      var email=$("#email").val()
      var password=$("#password").val()

      if(email!== "" && password!== ""){

        var result=firebase.auth().signInWithEmailAndPassword(email,password)
     
        result.catch(function(error)
        {
            var errorCode=error.code;
            var errorMessage=error.message
console.log(errorCode)
console.log(errorMessage)
          window.alert("Message:"+ errorMessage)
           
        });
    
    }
      else{
       window.alert("PLEASE FILL OUT ALL FIELDS")
      }
  });



  $("#btn-logout").click(function()
  
  {
    firebase.auth().signOut();
  });


  $("#btn-resetPassword").click(function()
  
  {
  var auth=  firebase.auth();
  var email=  $("#email").val()

  if(email != ""){
auth.sendPasswordResetEmail(email).then(function(){
  window.alert("EMAIL HAS BEEN SENT TO YOU,PLEASE CHECK AND VERIFY")
})
.catch(function(error){
  var errorCode=error.code;
            var errorMessage=error.message

console.log(errorCode)
console.log(errorMessage)
          window.alert("Message:"+ errorMessage)
});
  }
  else{
    window.alert("PLEASE ENTER YOUR EMAIL ADDRESS")
  }
  });

  $("#btn-signup").click(function()
  
  {
      var email=$("#email").val()
      var password=$("#password").val()
      var cPassword=$("#confirmPassword").val()

    
      if(email!= "" && password!= "" && cPassword!=""){

      if(password==cPassword){
        var result=firebase.auth().createUserWithEmailAndPassword(email,password)
     
        result.catch(function(error)
        {
            var errorCode=error.code;
            var errorMessage=error.message
console.log(errorCode)
console.log(errorMessage)
          window.alert("Message:"+ errorMessage)
            
        });
      }
      else{
        window.alert("PASSWORD DOESN'T MATCH WITH THE CONFIRM PASSWORD")
      }
     }
   else{
       window.alert("PLEASE FILL OUT ALL FIELDS")
      }
  });


  $("#btn-update").click(function()
  
  {
    var phone=$("#phone").val()
    var address=$("#address").val()
    var bio =$("#bio").val()
    var firstName=$("#firstName").val()
    var lastName=$("#lastName").val()
    var country =$("#country").val()
    var gender =$("#gender").val()

    var rootRef = firebase.database().ref().child("Users");
    var userId=firebase.auth().currentUser.uid;
    var usersRef=  rootRef.child(userId)

    if(firstName!="" && lastName!="" && phone!="" && address!="" && bio!="" && country!="" && gender!=""){
var userData={
"phone":phone,
"address":address,
"bio":bio,
"firstName":firstName,
"lastName":lastName,
"country":country,
"gender":gender,
};
usersRef.set(userData,function(error)
{
if(error){
  var errorCode=error.code;
            var errorMessage=error.message
console.log(errorCode)
console.log(errorMessage)
          window.alert("Message:"+ errorMessage)
}
else{
 window.alert("UPDATED")
}
});
}
    else{
      window.alert("FORM IS INCOMPLETE.PLEASE FILL OUT ALL FIELDS")
    }
  });



  function switchView(view)
  {
    $.get({
      url:view,
      catch:false
    })
    .then(function(data){
    $("#container").html(data)   
    });
  }