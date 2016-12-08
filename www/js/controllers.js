angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function ($scope, $state, $ionicModal, $timeout, $ionicScrollDelegate, $ionicSideMenuDelegate, MyServices) {
  console.log("APP is called",$.jStorage.get("loginDetail"));
  if($.jStorage.get("loginDetail")){

    MyServices.getProfile($.jStorage.get("loginDetail")._id,function(data) {
      $scope.userForm = data.data;
    });
  }
  $scope.$root.canDrag = false;
    if ($scope.userForm) {
      $scope.login = true;
      $state.go("app.account");

    } else {
      $scope.login = false;
      $state.go("noheader.login");
    }

    $scope.login = false;

    // if($.jStorage.get("loginDetail")!=null){
    //   $state.go("app.account");
    //
    // var jstoreage =  $.jStorage.get("loginDetail");
    // // var _id = jstoreage.data._id;
    // // console.log("iddd", _id);
    // $scope.points="3500";
    // $scope.login=true;
    // console.log("hkdsflkdsjxflsdjl",$scope.login);
    //
    // $scope.userForm1 ={};
    // $scope.userForm1 =$.jStorage.get("loginDetail");
    // console.log("$scope.userForm1", $scope.userForm1);
    //
    //   // MyServices.getProfile(_id, function(data) {
    //   //   if (data.value) {
    //   //       console.log("data0",data);
    //   //       $scope.userForm =data.data;
    //   //   } else {}
    //   // });
    // }
    // else{
    //   $state.go("noheader.login");
    //
    //   $scope.login=false;
    // }
    $scope.account = function () {
      if ($.jStorage.get("loginDetail") == null) {
        $state.go("noheader.login");
      } else {
        $state.go("app.account");

      }
    };


    $scope.logout = function () {
      $scope.userForm = {};
      MyServices.logout(function (data) {
        console.log(data);
        if (data.value)
          $state.go('noheader.login');
      });
    };

    $scope.getCross = "";
    $scope.whenClose = function () {
      if ($scope.getCross == "") {
        $scope.getCross = "m-cross";
      } else {
        $scope.getCross = "";
      }
    };
    $scope.closeAll = function (val) {
      $state.go(val);
      if ($ionicSideMenuDelegate.isOpenLeft()) {
        $ionicSideMenuDelegate.toggleLeft();
        // $scope.whenClose();
      }
      if ($ionicSideMenuDelegate.isOpenRight()) {
        $ionicSideMenuDelegate.toggleRight();
        $scope.whenClose();
      }
    };




    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      $ionicScrollDelegate.scrollTop();
    });


    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
    // scroll class
    // $(document).ready(function() {
    //   $(window).scroll(function() {
    //     var scroll = $(window).scrollTop();
    //     console.log(scroll);
    //     if (scroll >= 40) {
    //       $(".bar-light").addClass("darkHeader");
    //     } else {
    //       $(".bar-light").removeClass("darkHeader");
    //     }
    //   });
    // });


  })
  .controller('LeaderCtrl', function ($scope, $stateParams) {

    $scope.leader = [{
      img: 'img/usa/flylady.png',
      title: 'vishwanathan kothian',
      text: 'chief financial officer',
      para: 'As CFO ......'
    }, {
      img: 'img/usa/flyman.png',
      title: 'vishwanathan kothian',
      text: 'chief financial officer',
      para: 'As CMO ......'
    }, {
      img: 'img/usa/sach.png',
      title: 'vishwanathan kothian',
      text: 'chief financial officer',
      para: 'Brain child of the multi-faceted Mr. Shripal Morakhia, Smaaash offers a lot more than your run-of-the-mill banquet hall and gaming center. It presents an unmatched range of games that offer a superlative virtual-reality experience, and combines the best of sports, music and dining into a highly immersive, interactive, innovative and involved entertainment experience. Smaaash has not only redefined sports entertainment, but also raised the bar for customer engagement. This innovative entertainment and active engagement is what defines Smaaash.'
    }]

  })
  .controller('PlaylistsCtrl', function ($scope) {
    $scope.playlists = [{
      title: 'Reggae',
      id: 1
    }, {
      title: 'Chill',
      id: 2
    }, {
      title: 'Dubstep',
      id: 3
    }, {
      title: 'Indie',
      id: 4
    }, {
      title: 'Rap',
      id: 5
    }, {
      title: 'Cowbell',
      id: 6
    }];
  })

.controller('HomeCtrl', function ($scope, $stateParams, MyServices, $ionicSlideBoxDelegate) {
  var jstoreage = $.jStorage.get("loginDetail");
  if (jstoreage) {
    var _id = jstoreage.data_id;
    console.log("iddd", _id);
    // $scope.startloading() ;
    MyServices.getProfile(_id, function (data) {
      $scope.startloading();
      if (data.value) {
        $ionicLoading.hide();
        console.log("data0", data);
        $scope.userForm = data.data;
        $scope.userForm.dob = new Date(data.data.dob);
      } else {}
    });
  }

  $scope.homeslider = [
    'img/banners/banner.jpg',
    'img/banners/banner.jpg',
    'img/banners/banner.jpg',
    'img/banners/banner.jpg'
  ];
  $scope.showSignUp = false;
  if ($.jStorage.get("user") || _.isEmpty($.jStorage.get("user"))) {
    $scope.showSignUp = true;
  } else {
    $scope.showSignUp = false;
  };

  MyServices.getSlider(function (data) {
    console.log(data.data);
    $scope.mySlides = data.data;
    _.each($scope.mySlides, function (n,key) {
      n.ordering = key+1;
    });
    $ionicSlideBoxDelegate.update();
  });

})

.controller('ProfileCtrl', function ($scope, $stateParams, $ionicPopup, MyServices, $ionicLoading) {
  $scope.popupmsg = false;

  $scope.startloading = function () {
    console.log("hi in loader");
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-light"></ion-spinner>'
    });
  };
  var jstoreage = $.jStorage.get("loginDetail");
  var _id = jstoreage._id;
  console.log("iddd", _id);
  // $scope.startloading() ;



  MyServices.getProfile(_id, function (data) {
    $scope.startloading();
    if (data.value) {
      $ionicLoading.hide();
      console.log("data0", data);
      $scope.userForm = data.data;
      $scope.userForm.dob = new Date(data.data.dob);
    } else {}
  });

  $scope.reset = function () {
    $scope.popupmsg = false;
    $scope.reset = $ionicPopup.show({
      templateUrl: 'templates/modal/reset.html',
      scope: $scope
    });
  };
  $scope.closePopup = function () {
    $scope.reset.close();
  }
  $scope.updateProfile = function (userForm) {
    MyServices.updateProfile(userForm, function (data) {
      console.log(data);
      if (data.value === true) {
        $scope.popupmsg = true;
        MyServices.setUser(data.data);

      }
    })
  }

  $scope.credentials = {};
  $scope.credentials.CustomerID = $.jStorage.get("loginDetail").CustomerID;
  $scope.CustomerResetPassword = function (password) {
    console.log(password);

    console.log($scope.credentials);
    MyServices.CustomerResetPassword($scope.credentials, function (data) {
      console.log(data);
      if (data.value === true)
        $scope.popupmsg = true;
    })
  }

})

.controller('OffersCtrl', function ($scope, $stateParams) {

})

.controller('SorryCtrl', function ($scope, $stateParams) {

})

.controller('ThankCtrl', function ($scope, $stateParams) {

})

.controller('BeverageCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $filter, $ionicSlideBoxDelegate) {
  $scope.getPlan = function (galleryimg) {
    $scope.galleryimages = galleryimg;
    $scope.checkPlan = $ionicPopup.show({
      templateUrl: 'templates/modal/gallery.html',
      scope: $scope
    });
  };
  var attraction = [];
  var whatsnew = [];
  var hostParty = [];


  MyServices.getHomeContent(function (data) {
    if (data.value) {
      $scope.homeContent = data.data;
      $scope.content = _.groupBy($scope.homeContent, "type.name");
      $scope.attraction = $scope.content.Attraction;
      $scope.whatsnew = $scope.content["What's new"];
      $scope.hostParty = $scope.content["Host a party"];



    } else {}

  });


  $scope.closePopupgallery = function () {
    $scope.checkPlan.close();
  }
  $scope.foodBeveragesId = "57bc4b48eb9c91f1025a3b57";
  MyServices.getSingleExploreSmaaash($scope.foodBeveragesId, function (data) {
    $scope.drinkParty = data.data;
    console.log("  $scope.drinkParty", $scope.drinkParty);
  });
  $scope.selected = function (id) {
    console.log(id);
    $scope.carousel = id;
  }
  $scope.nextSlide = function (id) {
    $ionicSlideBoxDelegate.slide(id, [500]);

  }

  var options = "location=no,toolbar=yes";
  var target = "_blank";
  var url = "";
  // $scope.url = "http://104.155.129.33:82/upload/readFile?file=58343a4c9f3f2cd049f2cf56.pdf&width=250&height=250&style=fill";

  $scope.openPDF = function (link) {
    url = $filter('uploadpath')(link);
    var ref = cordova.InAppBrowser.open(url, target, options);
  };
  $scope.pdf = function () {
    $scope.pdf = $ionicPopup.show({
      templateUrl: 'templates/modal/pdf.html',
      scope: $scope,

    });
  }
  $scope.closePopup = function () {
    $scope.pdf.close();
  }


})

.controller('PartyCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $filter) {

  MyServices.getSingleExploreSmaaash($stateParams.id, function (data) {
    $scope.SingleHostParty = data.data;
    // $scope.SingleHostParty = _.chunk(data.data, 3);
    // $scope.content = _.groupBy($scope.SingleHostParty, 'hostAPartyType');
    // $scope.birthday = $scope.content['57d6a09dbd5eb9846074b419'];
    // $scope.kittyparties = $scope.content['57e1429c3da62fae1dfc560c'];
    // $scope.wedding = $scope.content['57d6a027bd5eb9846074b418'];
    // $scope.corporate = $scope.content['57e142483da62fae1dfc55f2'];
  });
  var options = "location=no,toolbar=yes";
  var target = "_blank";
  var url = "";
  $scope.url = "http://104.155.129.33:82/upload/readFile?file=58343a4c9f3f2cd049f2cf56.pdf&width=250&height=250&style=fill";

  $scope.openPDF = function (link) {
    url = $filter('uploadpath')(link);
    var ref = cordova.InAppBrowser.open(url, target, options);
  };
  $scope.pdf = function () {
    $scope.pdf = $ionicPopup.show({
      templateUrl: 'templates/modal/pdf.html',
      scope: $scope,

    });
  }
  $scope.closePopup = function () {
      $scope.pdf.close();
    }
    //   $scope.pdf = function() {
    //   $scope.pdfParty = $ionicPopup.show({
    //     templateUrl: 'templates/modal/pdf.html',
    //     scope: $scope
    //   });
    // }
    // $scope.closePopup = function() {
    //   $scope.pdfParty.close();
    // }
})

.controller('PartyFormCtrl', function ($scope, $stateParams, MyServices, $timeout) {
  $scope.userForm = {};
  $scope.formComplete = false;
  MyServices.getCity(function (data) {
    $scope.getCities = data.data;
    console.log("  $scope.getCities ", $scope.getCities);

  });
  $scope.userSignup = function (userForm) {
    if (userForm) {
      console.log("userForm", userForm);
      MyServices.assistanceLoginSignup(userForm, function (data) {
        console.log("data", data);
        if (data.value === true) {
          $scope.formComplete = true;
          $timeout(function () {
            $scope.formComplete = false;
            $scope.userForm = {};
          }, 2000);
        } else {
          $scope.error = data.data;
        }
      })
    }
  }
})


.controller('EventsCtrl', function ($scope, $stateParams, MyServices) {
  $scope.items = [{
    title: 'live screening !',
    text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
  }];
  $scope.toggleItem = function (item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function (item) {
    return $scope.shownItem === item;
  };

  // $scope.eventId = "57bd4e71a86ee9fa6770d4b2";
  // MyServices.getSingleExploreSmaaash($scope.eventId, function(data) {
  //   $scope.events = data.data;
  //
  //   console.log("$scope.events", $scope.events);
  //
  // });
  MyServices.getEvents(function (data) {
    $scope.events = data.data;
    console.log("$scope.events", $scope.events);
  });

})

.controller('CartCtrl', function ($scope, $stateParams) {

})

.controller('NewCtrl', function ($scope, $stateParams, MyServices, $ionicPopup, $cordovaSocialSharing, $filter) {
    MyServices.getSingleExploreSmaaash($stateParams.id, function (data) {
      $scope.SingleExploreSmaaash = data.data;
      console.log("$scope.SingleExploreSmaaash", $scope.SingleExploreSmaaash);
    });
    $scope.read = "Read More";
    $scope.more = false;

    $scope.readmore = function (id) {
      if (!$scope.more) {
        $scope.read = "Read Less";
        $scope.more = true;
      } else {
        $scope.read = "Read More";
        $scope.more = false;
      }
    }


    $scope.shareProduct = function (index) {
      console.log($scope.SingleExploreSmaaash[index].hometext);
      var image = $filter('serverimage')($scope.SingleExploreSmaaash[index].image);
      console.log(image);
      $cordovaSocialSharing
        .share($scope.SingleExploreSmaaash[index].hometext, image, '') // Share via native share sheet
        .then(function (result) {
          console.log("done");
        }, function (err) {
          // An error occured. Show a message to the user
        });
    };
    $scope.isInWishlist = function (id) {
      var indexF = _.findIndex($scope.userwishlist, function (key) {
        return key.exploresmash._id == id;
      })
      if (indexF !== -1) {
        return true;
      } else {
        return false;
      }
    }
    if ($.jStorage.get("loginDetail") != null) {
      function showWishList() {
        MyServices.showWishList(function (data) {
          $scope.userwishlist = data.data.wishList;
          console.log("$scope.userwishlist", $scope.userwishlist);
        })
      };
      showWishList();
    }

    $scope.addedToWishList = function (id) {
      console.log("id", id);
      if ($.jStorage.get("loginDetail") == null) {
        console.log("am in if");
        $scope.myPopup = $ionicPopup.show({
          templateUrl: 'templates/modal/wishlistsignup.html',
          scope: $scope
        });
      } else if ($.jStorage.get("loginDetail") != null) {
        var findIndex = _.findIndex($scope.userwishlist, function (key) {
          console.log(id, '////////');
          return key.exploresmash._id === id;
        });
        console.log("findIndex", findIndex);
        if (findIndex !== -1) {
          console.log("findIndex", findIndex);
          constraints = _.find($scope.userwishlist, function (key) {
            return key.exploresmash._id === id;
          });
          console.log(constraints);
          MyServices.removeFromWishList(constraints._id, function (data) {
            console.log(data, 'removed data');
            if (data.value) {
              showWishList();
              $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/modal/removeWishlist.html',
                scope: $scope
              });
            };

          });
        } else {
          MyServices.addToWishList(id, function (data) {
            console.log("wishlist", data);
            if (data.value) {
              $scope.myPopup = $ionicPopup.show({
                templateUrl: 'templates/modal/wishlist.html',
                scope: $scope
              });
            }
            showWishList();
          });
        }
      }
    };
    $scope.closeModals = function () {
      $scope.myPopup.close();
    }
  })
  .controller('SCricketCtrl', function ($scope, $stateParams) {
    $scope.items = [{
      title: 'game description',
      text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
    }, {
      title: 'timing and pricing',
      text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
    }, {
      title: 'technology',
      text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
    }, {
      title: 'game description',
      text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
    }, {
      title: 'promotions',
      text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
    }, {
      title: 'photos',
      text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
    }];
    $scope.toggleItem = function (item) {
      if ($scope.isItemShown(item)) {
        $scope.shownItem = null;
      } else {
        $scope.shownItem = item;
      }
    };
    $scope.isItemShown = function (item) {
      return $scope.shownItem === item;
    };
  })

.controller('CricketCtrl', function ($scope, $stateParams, MyServices, $ionicPopup) {
  $scope.toggleItem = function (item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function (item) {
    return $scope.shownItem === item;
  };

  MyServices.getDetailExploreSmaaash($stateParams.id, function (data) {
    console.log("data", data);
    $scope.cricket = data.data;
  });
  $scope.isInWishlist = function (id) {
    var indexF = _.findIndex($scope.userwishlist, function (key) {
      return key.exploresmash._id == id;
    })
    if (indexF !== -1) {
      return true;
    } else {
      return false;
    }
  }
  if ($.jStorage.get("loginDetail") != null) {
    function showWishList() {
      MyServices.showWishList(function (data) {
        $scope.userwishlist = data.data.wishList;
        console.log("$scope.userwishlist", $scope.userwishlist);
      })
    };
    showWishList();
  }


  $scope.addedToWishList = function (id) {
    console.log("id", id);
    if ($.jStorage.get("loginDetail") == null) {
      console.log("am in if");
      $scope.myPopup = $ionicPopup.show({
        templateUrl: 'templates/modal/wishlistsignup.html',
        scope: $scope
      });
    } else if ($.jStorage.get("loginDetail") != null) {
      var findIndex = _.findIndex($scope.userwishlist, function (key) {
        console.log(id, '////////');
        return key.exploresmash._id === id;
      });
      console.log("findIndex", findIndex);
      if (findIndex !== -1) {
        console.log("findIndex", findIndex);
        constraints = _.find($scope.userwishlist, function (key) {
          return key.exploresmash._id === id;
        });
        console.log(constraints);
        MyServices.removeFromWishList(constraints._id, function (data) {
          console.log(data, 'removed data');
          if (data.value) {
            showWishList();
            $scope.myPopup = $ionicPopup.show({
              templateUrl: 'templates/modal/removeWishlist.html',
              scope: $scope
            });
          };

        });
      } else {
        MyServices.addToWishList(id, function (data) {
          console.log("wishlist", data);
          if (data.value) {
            $scope.myPopup = $ionicPopup.show({
              templateUrl: 'templates/modal/wishlist.html',
              scope: $scope
            });
          }
          showWishList();
        });
      }
    }
  };
  $scope.closeModals = function () {
    $scope.myPopup.close();
  }
})


.controller('SelectCityCtrl', function ($scope, $stateParams, MyServices, $state) {

  MyServices.getCity(function (data) {
    $scope.getCity = _.chunk(data.data, 2);
  })
  $scope.selectCity = function (city) {

    $.jStorage.set("cityid", city._id);
    $.jStorage.set("city", city.name);
    $state.go("noheader.signup");
  }

  // $scope.getCityName=function(cityName){
  //   $.jStorage.set("city",cityName);
  //   $scope.city=$.jStorage.get("city").name;
  // console.log("  $scope.city",  $scope.city);
  // }
})

.controller('SelectAvatarCtrl', function ($scope, $stateParams, $state, $cordovaFileTransfer, $ionicLoading, $cordovaImagePicker, $cordovaCamera, MyServices, $filter) {

  $scope.startloading = function () {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-light"></ion-spinner>'
    });
  };
  $scope.collection = {
    selectedImage: ''
  };
  $scope.userForm = {};
  var jstoreage = $.jStorage.get("loginDetail");

  var _id = jstoreage._id;
  $scope.userForm.profilePic = "";
  MyServices.getProfile(_id, function (data) {
    if (data.value) {
      console.log("data0", data);
      $scope.userForm = data.data;
    } else {}

  });

  var options = {
    maximumImagesCount: 1,
    quality: 100
  };

  $scope.uploadProfilePic = function () {
    $cordovaImagePicker.getPictures(options).then(function (resultImage) {
      // Success! Image data is here
      console.log(resultImage);
      $scope.userForm.profilePic = resultImage[0];
      $scope.updateProfile($scope.userForm.profilePic);
      $scope.uploadImage($scope.userForm.profilePic);

    }, function (err) {
      // An error occured. Show a message to the user
    });
  }

  $scope.getAvtar = function (avtar) {
      if (avtar) {
        $scope.userForm.profilePic = avtar;
        $scope.updateProfile($scope.userForm);

      }
    }
    //Upload Image
  $scope.uploadImage = function (imageURI) {
    console.log('imageURI', imageURI);
    // $scope.showLoading('Uploading Image...', 10000);
    $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
      .then(function (result) {
        // Success!
        console.log(result.response);
        result.response = JSON.parse(result.response);
        $scope.userForm.profilePic = result.response.data[0];
        $scope.updateProfile($scope.userForm.profilePic);

        // $scope.submitData($scope.formData);
        // $scope.submitProfile($scope.profileData);
      }, function (err) {
        // Error
        $scope.hideLoading();
        $scope.showLoading('Error!', 2000);
      }, function (progress) {
        // constant progress updates
      });
  };
  $scope.updateProfile = function (userForm) {
    MyServices.updateProfile(userForm, function (data) {
      console.log(data);
      if (data.value === true) {
        $scope.popupmsg = true;
          $state.go('app.account');
      }
    })
  }
  $scope.takePhotoCamera = function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      console.log("hi1");

      // $scope.imgURI = "data:image/jpeg;base64," + imageData;
      $scope.userForm.profilePic = "data:image/jpeg;base64," + imageData;
      $scope.profilePic = $scope.imgURI;
      $scope.updateProfile($scope.userForm.profilePic);


    }, function (err) {
      // An error occured. Show a message to the user
    });
  }
})

.controller('BuyCtrl', function ($scope, $stateParams, $ionicPopup, $state) {

  $scope.getPlan = function () {
    $scope.checkPlan = $ionicPopup.show({
      templateUrl: 'templates/modal/alert.html',
      scope: $scope
    });
  };
  $scope.closePopup = function () {
    $scope.checkPlan.close();
  }

  $scope.Rechargeopen = function () {
    if ($.jStorage.get("loginDetail") != null) {
      console.log("hellooo", $.jStorage.get("loginDetail"));
      $state.go('app.recharge');
    } else {
      $scope.getPlan();
    }
  }
})

.controller('ContactCtrl', function ($scope, $stateParams) {

})

.controller('AttractionsCtrl', function ($scope, $stateParams, $ionicPopup, MyServices) {
  $scope.getPlan = function () {
    $scope.checkPlan = $ionicPopup.show({
      templateUrl: 'templates/modal/choose.html',
      scope: $scope
    });
  };
  $scope.closePopup = function () {
    $scope.checkPlan.close();
  }
  var ionicpop = "";
  $scope.wishlistsignupFun = function () {
    $scope.ionicpop = $ionicPopup.show({
      templateUrl: 'templates/modal/wishlistsignup.html',
      scope: $scope
    });
  }
  $scope.closeModal = function () {
    scope.ionicpop.closePopup();

  };


  // $scope.attractionId = "57bc4b2aeb9c91f1025a3b55";

  $scope.male = '';
  $scope.female = '';
  $scope.children = '';
  $scope.filter = {};
  $scope.filter._id = $stateParams.id;
  $scope.msg = false;
  $scope.goTOSearch = function (filter) {
    MyServices.searchExploreSmaaash($scope.filter, function (data) {
      $scope.singleAttraction = data.data;
      if ($scope.singleAttraction.length === 0) {
        $scope.msg = true;
      } else {
        $scope.msg = false;
      }

      _.each($scope.singleAttraction, function (data) {
        data.gameforarray = [];
        _.each(data.gamefor, function (n) {
          switch (n) {
            case '1':
              data.gameforarray.push('Male')
              break;
            case '2':
              data.gameforarray.push('Female')
              break;
            case '3':
              data.gameforarray.push('Children')
              break;
            default:
          }
        });
      });
    });
  }
  $scope.goTOSearch($scope.filter);

  if ($.jStorage.get("loginDetail") != null) {
    function showWishList() {
      MyServices.showWishList(function (data) {
        $scope.userwishlist = data.data.wishList;
        console.log("$scope.userwishlist", $scope.userwishlist);
      })
    };
    showWishList();
  };
  $scope.isInWishlist = function (id) {
    // console.log('userwishlist',$sc);
    var indexF = _.findIndex($scope.userwishlist, function (key) {
      return key.exploresmash._id == id;
    })

    if (indexF !== -1) {
      return true;
    } else {
      return false;
    }
  }
  $scope.addedToWishList = function (id) {
    console.log("id", id);
    if ($.jStorage.get("loginDetail") == null) {
      console.log("am in if");
      $ionicPopup.show({
        templateUrl: 'templates/modal/wishlistsignup.html',
        scope: $scope
      });
    } else if ($.jStorage.get("loginDetail") != null) {
      var findIndex = _.findIndex($scope.userwishlist, function (key) {
        console.log(id, '////////');
        return key.exploresmash._id === id;
      });
      console.log("findIndex", findIndex);
      if (findIndex !== -1) {
        console.log("findIndex", findIndex);
        constraints = _.find($scope.userwishlist, function (key) {
          return key.exploresmash._id === id;
        });
        console.log(constraints);
        MyServices.removeFromWishList(constraints._id, function (data) {
          console.log(data, 'removed data');
          if (data.value) {
            showWishList();
            $ionicPopup.show({
              templateUrl: 'templates/modal/removeWishlist.html',
              scope: $scope
            });
          };

        });
      } else {
        MyServices.addToWishList(id, function (data) {
          console.log("wishlist", data);
          if (data.value) {
            $ionicPopup.show({
              templateUrl: 'templates/modal/wishlist.html',
              scope: $scope
            });
          }
          showWishList();
        });
      }
    }
  };

})

.controller('EventCtrl', function ($scope, $stateParams) {

})

.controller('ExploreSmaaashCtrl', function ($scope, $stateParams, $ionicSlideBoxDelegate, MyServices) {
    var attraction = [];
    var whatsnew = [];
    var hostParty = [];
    var beverage = [];
    $scope.food = [{
        img: 'img/new.png',
      }, {
        img: 'img/new.png',
      }, {
        img: 'img/new.png',
      }

    ];

    MyServices.getHomeContent(function (data) {
      if (data.value) {
        $scope.homeContent = data.data;

        $scope.content = _.groupBy($scope.homeContent, "type.name");
        // console.log("  $scope.homeContent",    $scope.content );
        $scope.attraction = $scope.content.Attraction;
        $scope.whatsnew = $scope.content["What's new"];
        $scope.hostParty = $scope.content["Host a party"];
        $scope.beverage = $scope.content["Food and Beverages"];
      } else {}

    });
    $scope.nextSlide = function (val) {
      // console.log("hi");
      // console.log($ionicSlideBoxDelegate.$getByHandle(val).slidesCount());
      // console.log($ionicSlideBoxDelegate.$getByHandle(val).currentIndex());
      if ($ionicSlideBoxDelegate.$getByHandle(val).slidesCount() - 2 <= $ionicSlideBoxDelegate.$getByHandle(val).currentIndex()) {
        $ionicSlideBoxDelegate.$getByHandle(val).slide(0);
      } else {
        $ionicSlideBoxDelegate.$getByHandle(val).next();
      }
    };
    $scope.options = {
      loop: true
    };
    $scope.disableSwipe = function () {
      $ionicSlideBoxDelegate.enableSlide(false);
    };

  })
  .controller('PaymentCtrl', function ($scope, $stateParams, MyServices) {
    $scope.accordion = function (val) {
      console.log($scope.showAccordion);
      console.log(val);
      if (val == $scope.showAccordion) {
        $scope.showAccordion = 0;
      } else {
        if (val == 1) {
          $scope.showAccordion = 1;
        } else if (val == 2) {
          $scope.showAccordion = 2;
        } else if (val == 3) {
          $scope.showAccordion = 3;
        } else if (val == 4) {
          $scope.showAccordion = 4;
        } else if (val == 5) {
          $scope.showAccordion = 5;
        } else {
          $scope.showAccordion = 0;
        }
      }
      console.log($scope.showAccordion);
      console.log(val);
    }

  })
  .controller('DirectionCtrl', function ($scope, $stateParams, $cordovaGeolocation, MyServices, $window, $ionicPopup) {
    $scope.Mumbai = true;
    $scope.gotofun = function (city) {
      console.log(city);
      $scope.Mumbai = false;
    }
    $scope.lat = "";
    $scope.long = "";
    var posOptions = {
      timeout: 10000,
      enableHighAccuracy: false
    };

    $scope.initMap = function () {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {
          lat: 44.854850,
          lng: -93.242306
        } // Australia.
      });

      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: map,
        panel: document.getElementById('right-panel')
      });

      directionsDisplay.addListener('directions_changed', function () {
        computeTotalDistance(directionsDisplay.getDirections());
      });
      $scope.lat = "";
      $scope.long = "";
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          //  console.log("position", position);
          var lat = position.coords.latitude
          var long = position.coords.longitude
          $scope.lat = lat;
          $scope.long = long;
          $scope.position = position;
          console.log("latlong1", lat, long);
          console.log("latlong scope", $scope.lat, $scope.long);
          var geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
          var request = {
            latLng: latlng
          };

          console.log("position", $scope.position.coords.latitude, $scope.position.coords.longitude);



          $scope.displayRoute($scope.position.coords.latitude + "," + $scope.position.coords.longitude, '44.854850, -93.242306', directionsService,
            directionsDisplay);
        }, function (err) {
          // error
          console.log("err", err);
          $scope.getPlan();
          console.log("hello", err);


        });

    }
    $scope.getPlan = function () {
      $scope.checkPlan = $ionicPopup.show({
        templateUrl: 'templates/modal/map.html',
        scope: $scope
      });
    };
    $scope.closePopup = function () {
      $scope.checkPlan.close();
    }
    $scope.displayRoute = function (origin, destination, service, display) {
      console.log("origin", origin);
      service.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
        avoidTolls: true
      }, function (response, status) {
        if (status === 'OK') {
          display.setDirections(response);
        } else {
          alert('Could not display directions due to: ' + status);
        }
      });
    }


    $scope.computeTotalDistance = function (result) {
      var total = 0;
      var myroute = result.routes[0];
      for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
      }
      total = total / 1000;
      document.getElementById('total').innerHTML = total + ' km';
    }

  })

.controller('WishlistCtrl', function ($scope, $stateParams, MyServices) {


  $scope.attraction = '';
  $scope.whatsnew = '';
  var i = 0;

  function getuserWishList() {
    if ($.jStorage.get("loginDetail") != null) {
      MyServices.showWishList(function (data) {
        $scope.showWishList = data.data;
        var i = 1;
        _.each($scope.showWishList.wishList, function (data) {
          data.pageName = [];
          data.ordering = i;
          i++;
          _.each(data.exploresmash, function (n) {
            switch (n) {
              case '57bc4b2aeb9c91f1025a3b55':
                data.pageName.push("Attraction")
                break;
              case '57bc4af6eb9c91f1025a3b4f':
                data.pageName.push("What's new")
                break;
              default:
            }
          });
        });


      });
    }
  };
  getuserWishList();


  $scope.removeFromWishList = function (id) {
    MyServices.removeFromWishList(id, function (data) {
      getuserWishList();
    });
  };

})


.controller('TournamentCtrl', function ($scope, $stateParams, MyServices) {

  $scope.toggleItem = function (item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function (item) {
    return $scope.shownItem === item;
  };
  MyServices.getTournaments(function (data) {
    $scope.tour = data.data;
    console.log("$scope.tour", $scope.tour);
  });

})


.controller('ChallengesCtrl', function ($scope, $stateParams, MyServices) {

  $scope.toggleItem = function (item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function (item) {
    return $scope.shownItem === item;
  };
  MyServices.getChallenges(function (data) {
    $scope.challenges = data.data;
    console.log("$scope.challenges", $scope.challenges);
  });
})

.controller('OrderCtrl', function ($scope, $stateParams, MyServices) {
  $scope.CustID = "202";
  // $scope.customerBookingDetails = {
  //     "GetCustomerBookingDetails": {
  //         "CustomerBooking": [{
  //             "Status": 1,
  //             "Message": "Get Booking Data",
  //             "BranchName": "Mumbai",
  //             "PackageName": "Travel Agents - WeekDay",
  //             "PackagePhoto": "http://192.168.0.41/Smaaash/Upload/ImageNotFound.jpg",
  //             "BookingDate": "22-11-2016",
  //             "VisitDate": "30-11-2016",
  //             "CNRNo": 511,
  //             "PayableAmount": 999,
  //             "IsCustomerCard": 1
  //         }, {
  //             "Status": 1,
  //             "Message": "Get Booking Data",
  //             "BranchName": "Mumbai",
  //             "PackageName": "Travel Agents - WeekDay",
  //             "PackagePhoto": "http://192.168.0.41/Smaaash/Upload/ImageNotFound.jpg",
  //             "BookingDate": "22-11-2016",
  //             "VisitDate": "01-12-2016",
  //             "CNRNo": 510,
  //             "PayableAmount": 999,
  //             "IsCustomerCard": 1
  //         }],
  //         "CustomerCardRecharge": [{
  //             "Status": 1,
  //             "Message": "Get Card Recharge Data",
  //             "BranchName": "Mumbai",
  //             "CustomerName": "piyush",
  //             "RechargeDate": "26-11-2016",
  //             "RechargeID": 3,
  //             "RechargeAmt": 2000
  //         }, {
  //             "Status": 1,
  //             "Message": "Get Card Recharge Data",
  //             "BranchName": "Mumbai",
  //             "CustomerName": "piyush",
  //             "RechargeDate": "26-11-2016",
  //             "RechargeID": 2,
  //             "RechargeAmt": 100
  //         }, {
  //             "Status": 1,
  //             "Message": "Get Card Recharge Data",
  //             "BranchName": "Mumbai",
  //             "CustomerName": "piyush",
  //             "RechargeDate": "26-11-2016",
  //             "RechargeID": 1,
  //             "RechargeAmt": 500
  //         }]
  //     }
  // }
  //
  //        $scope.bookingDetails = [];
  //        $scope.custBooking = $scope.customerBookingDetails.GetCustomerBookingDetails.CustomerBooking;
  //        $scope.CustCardRecharge = $scope.customerBookingDetails.GetCustomerBookingDetails.CustomerCardRecharge;
  //        $scope.bookingDetails = $scope.custBooking.concat($scope.CustCardRecharge);
  //        _.each($scope.bookingDetails, function(value) {
  //            if (value.Message === "Get Booking Data") {
  //                value.objtype = "Booking";
  //            } else if (value.Message === "Get Card Recharge Data") {
  //                value.objtype = "Recharge";
  //            };
  //
  //        });
  $scope.msg = false;
  $scope.CustID = $.jStorage.get("loginDetail").CustomerID;
  MyServices.GetCustomerBookingDetails($scope.CustID, function (data) {
    if (data.value === true) {
      console.log("orderif");
      $scope.custBooking = data.GetCustomerBookingDetails.CustomerBooking;
      $scope.CustCardRecharge = data.GetCustomerBookingDetails.CustomerCardRecharge;
      $scope.bookingDetails = $scope.custBooking.concat($scope.CustCardRecharge);
      _.each($scope.bookingDetails, function (value) {
        if (value.Message === "Get Booking Data") {
          value.objtype = "Booking";
        } else if (value.Message === "Get Card Recharge Data") {
          value.objtype = "Recharge";
        };
      });
    } else if (data.value === false) {
      $scope.msg = true;
    }
  })



})

.controller('GpurchaseCtrl', function ($scope, $stateParams) {

})

.controller('MerchandiseCtrl', function ($scope, $stateParams) {

})


.controller('DealsCtrl', function ($scope, $stateParams, MyServices) {
  var id = "57bc4b5aeb9c91f1025a3b58";
  MyServices.getSingleExploreSmaaash(id, function (data) {
    $scope.SingleDealsPackages = data.data;
  });
})

.controller('AboutCtrl', function ($scope, $stateParams) {

})

.controller('AccountCtrl', function ($scope, $stateParams, $ionicPopup, MyServices, $ionicLoading, $state) {

    if ($.jStorage.get("loginDetail") != null) {

      var jstoreage = $.jStorage.get("loginDetail");
      console.log("jstoreage", jstoreage);

      var _id = jstoreage._id;
      $scope.userForm = {};
      // $state.go("app.account");
      MyServices.getProfile(_id, function (data) {
        // $scope.startloading();
        if (data.value) {
          // $ionicLoading.hide();
          console.log("data0", data);
          $scope.userForm = data.data;
        } else {}

      });
    } else {
      $state.go("noheader.login");
      console.log("jstoreage", jstoreage);

    }


    $scope.startloading = function () {
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-light"></ion-spinner>'
      });
    };
    $scope.getPlan = function () {
      $scope.checkPlan = $ionicPopup.show({
        templateUrl: 'templates/modal/headline.html',
        scope: $scope
      });
    };
    $scope.closePopup = function () {
      $scope.checkPlan.close();
    }



  })
  .controller('ConfirmOrderCtrl', function ($scope, $stateParams) {

  })
  .controller('RechargeCtrl', function ($scope, $stateParams, $ionicPopup, MyServices) {

    $scope.popHeadline = function () {
      $scope.headlienPop = $ionicPopup.show({
        templateUrl: 'templates/modal/headline.html',
        scope: $scope
      });
    }
    $scope.closePopup = function () {
      $scope.headlienPop.close();
    }
    $scope.Recharge = {};

    $scope.RechargeCard = function (formData) {
      console.log("formData", formData);
      $scope.Recharge = formData;
      $scope.Recharge.PGReturnURL = "http://104.155.129.33:94/signup/returnUrlFunctionForMobile";
      $scope.Recharge.CustomerID = $.jStorage.get("loginDetail").data.CustomerID;
      $scope.Recharge.BranchID = "17";

      console.log("formData", $scope.Recharge);


      MyServices.RechargeCard(formData, function (data) {
        console.log(data);
        if (data.value === true) {
          console.log("formData", data);
          $state.go("app.thank");
        } else {
          $state.go("app.sorry");
        }
      })
    }
  })

.controller('SignupCtrl', function ($scope, $stateParams, $ionicPopup, $state, MyServices, $timeout) {
  $scope.ionicpop = "";
  // $.jStorage.set("cityid", "17");
  // $.jStorage.set("city", "usa");
  $scope.oneTimepswd = function () {
    $scope.ionicpop = $ionicPopup.show({
      templateUrl: 'templates/modal/otp.html',
      scope: $scope
    });
  }

  $scope.closePopup = function () {
    $scope.ionicpop.close();
  }
  $scope.variables = {};
  $scope.userForm = {};
  $scope.userForm.BranchID = "17";
  $scope.userForm.otp = "";
  $scope.formComplete = false;
  $scope.emailExist = false;
  $scope.getotp = {};
  $scope.getotp.CustomerMobileNo = "";
  $scope.getotp.OTPFor = "1";
  $scope.getotp.BranchID = "17";
  $scope.variables.letIn = true;

  $scope.generateOtp = function (phone) {
<<<<<<< HEAD
      if($scope.variables.letIn){
        $scope.variables.letIn = false;
        $scope.getotp.CustomerMobileNo = phone;
        MyServices.generateOtp($scope.getotp, function (data) {
          console.log(data);
          $scope.errormsg = "false";

          if (data.value === true) {
            $scope.oneTimepswd();
          } else {
            $scope.errormsg = "true";
            $scope.errortext = data.data.GenerateOTPTable[0].Message;
          }
        })
      }
=======
    console.log("in fun",phone);
    if(phone.CustomerPassword === phone.confirmPassword){
      $scope.invalPass =false;
 $scope.getotp.CustomerMobileNo = phone.CustomerMobile;
      MyServices.generateOtp($scope.getotp, function (data) {
        console.log(data);
        $scope.errormsg = "false";

        if (data.value === true) {
          $scope.oneTimepswd();
        } else {
          $scope.errormsg = "true";
          $scope.errortext = data.data.GenerateOTPTable[0].Message;
        }
      })
    }else{
      $scope.invalPass = true;
    }
     
>>>>>>> 8cf9f9a954df3ff92a02afc5c4867b5adeb507a3
    }
    $scope.resendOtp =function(phone){
      console.log(phone,"****");
      if (phone) {
        $scope.closePopup();
        phone.OTP="";
      }
      $scope.getotp.CustomerMobileNo =phone.CustomerMobile;
      MyServices.generateOtp($scope.getotp, function(data) {
        console.log(data);
        $scope.errormsg= "false";
<<<<<<< HEAD

=======
        $scope.error="";
    
>>>>>>> 8cf9f9a954df3ff92a02afc5c4867b5adeb507a3
        if(data.value === true){
          $scope.oneTimepswd();
        }
        else{
          $scope.errormsg= "true";
          $scope.errortext=data.data.GenerateOTPTable[0].Message;
        }
      })
    }

  $scope.CustomerRegistration = function (formData) {

    console.log("formData", formData);
    // if (formData) {
    //   formData.city=$.jStorage.get("cityid");
    // }
    MyServices.CustomerRegistration(formData, function (data) {
      console.log(data);
      if (data.value === true) {
        // $.jStorage.set("loginDetail", data);
        MyServices.setUser(data.data);

        $scope.formComplete = true;

        $timeout(function () {
          $scope.formComplete = false;
          $scope.emailExist = false;
          $scope.userForm = {};
          $scope.ionicpop.close();
          $state.go("noheader.avatar");
        }, 2000);
      } else {
        $scope.emailExist = true;
        $scope.error = data.data.Registration[0].Message;

      }

    })
  }
})

.controller('LoginCtrl', function ($scope, $stateParams, $ionicPopup, $state, MyServices, $timeout, $ionicSideMenuDelegate) {
  console.log('herermmmmm', $.jStorage);
  if ($.jStorage.get("loginDetail") != null) {
    var jstoreage = $.jStorage.get("loginDetail");
    console.log("data0", jstoreage);
    $state.go("app.home");
  } else {
    $state.go("noheader.login");
  }

  $scope.closeAll = function (val) {
    $state.go(val);
    if ($ionicSideMenuDelegate.isOpenLeft()) {
      $ionicSideMenuDelegate.toggleLeft();
      // $scope.whenClose();
    }
    if ($ionicSideMenuDelegate.isOpenRight()) {
      $ionicSideMenuDelegate.toggleRight();
      $scope.whenClose();
    }
  };

  $scope.earn = [{
      img: 'img/usa/bgusa.png'
    }, {
      img: 'img/usa/bgusa.png'
    }, {
      img: 'img/usa/bgusa.png'
    }]
    // $scope.logoutforskip =function(){
    //   MyServices.logout(function(data){
    //     console.log(data);
    //     if(data.value)
    //     {
    //       $state.go('app.home');
    //     }
    //   });
    // };


})


.controller('LandingCtrl', function ($scope, $stateParams, $ionicLoading, $state, $ionicPopup, MyServices, $timeout) {
  $scope.ionicpop = "";
  $scope.oneTimepswd = function () {
    $scope.popupmsg = false;
    $scope.ionicpop = $ionicPopup.show({
      templateUrl: 'templates/modal/otp1.html',
      scope: $scope
    });
  }
  $scope.closePopupfor = function () {
    $scope.ionicpop.close();
  }
  $scope.password = function () {
    console.log('inside modal');
    $scope.popupmsg = false;
    $scope.error = "";
    $scope.password10 = $ionicPopup.show({
      templateUrl: 'templates/modal/password.html',
      scope: $scope
    });
  }
  $scope.closePopup = function () {
    $scope.password10.close();
  }
  $scope.CustomerForgetPassword = function (password) {
    console.log(password.CustomerEmail);
    if (password.CustomerEmail != null && password.CustomerMobileNo != null) {
      MyServices.CustomerForgetPassword(password, function (data) {
        console.log(data);
        if (data.value === true) {
          $scope.popupmsg = true;
          password.CustomerEmail = "";
          password.CustomerMobileNo = "";
        } else {
          $scope.error = "enter correct details";
        }
      })
    } else {
      $scope.error = "enter correct details";
    }
  }
  $scope.toAvatar = function () {
    ionicpop.close();
    $state.go("app.account")
  };
  $scope.getotp = {};
  $scope.getotp.CustomerMobileNo = "";
  $scope.getotp.OTPFor = "2";
  $scope.getotp.BranchID = "17";
  $scope.userForm = {};
  $scope.generateOtp = function (userForm) {
    console.log(userForm, "****");
    $scope.getotp.CustomerMobileNo = userForm.UserName;
    MyServices.generateOtp($scope.getotp, function (data) {
      console.log("$scope.getotp", $scope.getotp);
      console.log(data);

      $scope.errormsg = "false";

      if (data.value === true) {
        $scope.oneTimepswd();
      } else {
        $scope.errormsg = "true";
        $scope.errortext = data.data.GenerateOTPTable[0].Message;
      }
    })
  }
  $scope.resendOtp = function (userForm) {
    console.log(userForm, "****");
    if (userForm) {
      $scope.closePopupfor();
      userForm.OTP = "";
    }
    $scope.getotp.CustomerMobileNo = userForm.UserName;
    MyServices.generateOtp($scope.getotp, function (data) {
      console.log("$scope.getotp", $scope.getotp);
      console.log(data);

      $scope.error = "";


      if (data.value === true) {
        $scope.oneTimepswd();
      } else {
        $scope.errormsg = "true";
        $scope.errortext = data.data.GenerateOTPTable[0].Message;
      }
    })
  }

  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };
  $scope.login = {};
  $scope.VerifyCustomerLogin = function (formData) {
    console.log("formData", formData);
    $scope.login = formData;
    $scope.login.IsOTPValidation = "1";
    console.log("formData", $scope.login);

    // if (formData) {
    //   formData.city=$.jStorage.get("cityid");
    // }
    MyServices.VerifyCustomerLogin(formData, function (data) {
      console.log(data);
      if (data.value === true) {

        MyServices.setUser(data.data);
        $scope.$broadcast('scroll.refreshComplete');

        //$.jStorage.set("loginDetail", data);
        $scope.formComplete = true;

        $timeout(function () {
          $scope.formComplete = false;
          $scope.error = "";
          $scope.userForm = {};
          $scope.ionicpop.close();
          $state.go("app.account")

        }, 2000);
      } else {
        $scope.error = data.data;
        $scope.$broadcast('scroll.refreshComplete');
        $scope.showLoading('Error Updating Profile!', 1000);
      }

    })
  }
})

.controller('BonusCtrl', function ($scope, $stateParams, MyServices) {})

.controller('EarnCtrl', function ($scope, $stateParams, MyServices) {
  //  $scope.nextSlide = function(val) {
  //     console.log($ionicSlideBoxDelegate.$getByHandle(val).slidesCount());
  //     console.log($ionicSlideBoxDelegate.$getByHandle(val).currentIndex());
  //     if ($ionicSlideBoxDelegate.$getByHandle(val).slidesCount() - 2 <= $ionicSlideBoxDelegate.$getByHandle(val).currentIndex()) {
  //         $ionicSlideBoxDelegate.$getByHandle(val).slide(0);
  //     } else {
  //         $ionicSlideBoxDelegate.$getByHandle(val).next();
  //     }
  // };
  // $scope.options = {
  //     loop: true
  // };
  // $scope.disableSwipe = function() {
  //     $ionicSlideBoxDelegate.enableSlide(false);
  // };
  $scope.earn = [{
    img: 'img/new.png'

  }, {
    img: 'img/new.png'
  }, {
    img: 'img/new.png'
  }]


  $scope.items = [{
    title: 'game description',
    text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
  }, {
    title: 'timing and pricing',
    text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
  }, {
    title: 'technology',
    text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
  }, {
    title: 'game description',
    text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
  }, {
    title: 'promotions',
    text: 'take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...take guard against the greatest...'
  }];
  $scope.toggleItem = function (item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function (item) {
    return $scope.shownItem === item;
  };

})

.controller('NoHeaderCtrl', function ($scope, $stateParams, MyServices) {
  // MyServices.getCity(function(data) {
  //     $scope.getCity = _.chunk(data.data, 2);
  //     console.log('$scope.getCity', $scope.getCity);
  // })
  // $scope.selectCity = function(city) {
  //     $.jStorage.set("mycity", city);
  //     $state.go("noheader.signup");
  // }
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {

});
