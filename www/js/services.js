 // var adminurl = "http://192.168.0.104:1337/"; //local

 var adminurl = "http://146.148.109.185:94/"; //server
 // var imgpath = adminurl + "uploadfile/getupload?file=";
 var imgurl = adminurl + "upload/";
 var imgpath = imgurl + "readFile?file=";
 var uploadurl = imgurl;


 var profile = {};

 $.jStorage.set("idOfCity", '577f4d106b78e0bc03724800');
 angular.module('starter.services', [])

 .factory('MyServices', function ($http) {
   var loginDetail = $.jStorage.get("loginDetail");
   if (!loginDetail) {
     loginDetail = {};
   }

   return {

     getHomeContent: function (callback) {
       var data = {
         city: $.jStorage.get("idOfCity")
       };
       $http({
         url: adminurl + 'exploresmash/getHomeContent',
         method: 'POST',
         withCredentials: true,
         data: data
       }).success(callback);
     },
     setUser: function (data) {
       _.assignIn(loginDetail, data);
       $.jStorage.set("loginDetail", loginDetail);
       console.log("setuser 656", loginDetail);
     },

     getUser: function () {
       return loginDetail;
     },
     CustomerForgetPassword: function (credentials, callback) {
       $http({
         url: adminurl + 'signup/CustomerForgetPassword',
         method: 'POST',
         withCredentials: true,
         data: credentials
       }).success(callback);
     },
     CustomerResetPassword: function (credentials, callback) {
       $http({
         url: adminurl + 'signup/CustomerResetPassword',
         method: 'POST',
         withCredentials: true,
         data: credentials
       }).success(callback);
     },
     getmap: function (data) {
       return $http.get("http://maps.googleapis.com/maps/api/geocode/jsonlatlng=40.714224,-73.961452", {});
       // return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + data + "&key=AIzaSyAj0OXepKIgjTlZiPe_ZVYTDjL8rYpobgQ", {});
       withCredentials: true

     },
     GetCustomerBookingDetails: function (custId, callback) {
       var data = {
         CustID: custId
       };
       $http({
         url: adminurl + 'signup/GetCustomerBookingDetails',
         method: 'POST',
         data: data
       }).success(callback);
     },

     getProfile: function (_id, callback) {
       if (_id) {
         $http({
           url: adminurl + 'signup/profile',
           method: 'POST',
           withCredentials: true,
           data: {
             _id: _id
           }
         }).success(callback);
       }
     },
     updateProfile: function (update, callback) {
       $http({
         url: adminurl + 'signup/updateProfile',
         method: 'POST',
         withCredentials: true,
         data: update
       }).success(callback);
     },

     getCity: function (callback) {
       $http({
         url: adminurl + 'city/getAllCityByOrder',
         method: 'POST',
         withCredentials: true
       }).success(callback);
     },
     getEvents: function (callback) {
       $http({
         url: adminurl + 'exploresmash/getAllEventsForApp',
         method: 'POST',
         withCredentials: true
       }).success(callback);
     },
     getTournaments: function (callback) {
       $http({
         url: adminurl + 'exploresmash/getAllTournaments',
         method: 'POST',
         withCredentials: true
       }).success(callback);
     },
     getChallenges: function (callback) {
       $http({
         url: adminurl + 'exploresmash/getAllChallenges',
         method: 'POST',
         withCredentials: true
       }).success(callback);
     },

     signUp: function (data, callback) {
       console.log("signup", data);
       $http({
         url: adminurl + 'signup/save',
         method: 'POST',
         withCredentials: true,
         data: data
       }).success(callback);
     },
     getUserNotification: function (userid,callback) {
       var data = {
         userid: userid,
       };
       $http({
         url: adminurl + 'signup/getUserNotification',
         method: 'POST',
         withCredentials: true,
         data: data
       }).success(callback);
     },
     removeNotification: function (note,callback) {
       var data = {
         _id:note.id,
         userid: note.userid
       };
       $http({
         url: adminurl + 'notification/removeNotification',
         method: 'POST',
         withCredentials: true,
         data: data
       }).success(callback);
     },
     getOrderDetails: function (orderid,callback) {
       $http({
         url: adminurl + 'signup/getOrderDetails',
         method: 'POST',
         withCredentials: true,
         data: orderid
       }).success(callback);
     },
     assistanceLoginSignup: function (formdata, callback) {
       $http({
         url: adminurl + 'assistance/save',
         method: 'POST',
         data: formdata
       }).success(callback);
     },
     getSlider: function (callback) {
       var data = {
         city: $.jStorage.get("idOfCity")
       };
       $http({
         url: adminurl + 'slider/getAllSliderByOrder',
         method: 'POST',
         withCredentials: true,
         data: data
       }).success(callback);
     },
     getSingleExploreSmaaash: function (id, callback) {
       var data = {
         _id: id,
         city: $.jStorage.get("idOfCity")
       };
       $http({
         url: adminurl + 'exploresmash/getSingleExploreSmaaash',
         method: 'POST',
         withCredentials: true,
         data: data

       }).success(callback);
     },
     generateOtp: function (getotp, callback) {

       $http({
         url: adminurl + 'signup/generateOtp',
         method: 'POST',
         withCredentials: true,
         data: getotp

       }).success(callback);
     },
     VerifyCustomerLogin: function (otp, callback) {

       $http({
         url: adminurl + 'signup/VerifyCustomerLogin',
         method: 'POST',
         withCredentials: true,
         data: otp

       }).success(callback);
     },
     RechargeCard: function (recharge, callback) {

       $http({
         url: adminurl + 'signup/RechargeCard',
         method: 'POST',
         withCredentials: true,
         data: recharge

       }).success(callback);
     },
     CustomerRegistration: function (otp, callback) {
       //  var data = {
       //      _id: id,
       //      city: $.jStorage.get("cityid")
       //  };
       $http({
         url: adminurl + 'signup/CustomerRegistration',
         method: 'POST',
         withCredentials: true,
         data: otp

       }).success(callback);
     },
     searchExploreSmaaash: function (filter, callback) {
       if (filter) {
         filter.city = $.jStorage.get("idOfCity");
       }
       $http({
         url: adminurl + 'exploresmash/getSingleExploreSmaaash',
         method: 'POST',
         withCredentials: true,
         data: filter

       }).success(callback);
     },
     addToWishList: function (id, callback) {
       console.log("nAV", id);
       var data = {
         user: $.jStorage.get("loginDetail")._id,
         wishList: {
           exploresmash: id,
           city: $.jStorage.get("idOfCity")
         }
       };
       $http({
         url: adminurl + 'signup/addToWishList',
         method: 'POST',
         withCredentials: true,
         data: data
       }).success(callback);
     },
     showWishList: function (callback) {
       // console.log("nAV", id);
       var data = {
         user: $.jStorage.get("loginDetail")._id,
       };
       $http({
         url: adminurl + 'signup/showWishList',
         method: 'POST',
         withCredentials: true,
         data: data
       }).success(callback);
     },
     logout: function (callback) {
      //  $.jStorage.flush();
       console.log("$.jStorage", $.jStorage);
        $.jStorage.set("loginDetail",null);
       //  $.jStorage.set("loginId",null);
       //  $.jStorage.set("loggedInUser",null);
       //  $.jStorage.set("customizeobj",null);
       return $http({
         url: adminurl + 'register/logout',
         method: 'POST',
       }).success(callback);
     },
     removeFromWishList: function (id, callback) {
       console.log("inNav", id);
       var data = {
         user: $.jStorage.get("loginDetail")._id,
         _id: id
       };
       $http({
         url: adminurl + 'signup/deleteWishList',
         method: 'POST',
         withCredentials: true,
         data: data
       }).success(callback);
     },
     getDetailExploreSmaaash: function (id, callback) {
       var data = {
         _id: id,
         city: $.jStorage.get("idOfCity")
       };

       $http({
         url: adminurl + 'exploresmash/getDetailExploreSmaaash',
         method: 'POST',
         withCredentials: true,
         data: data

       }).success(callback);
     },
   };
 });
