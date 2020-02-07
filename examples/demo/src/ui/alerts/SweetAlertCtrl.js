import angular from 'angular'
import Swal from 'sweetalert2'
// see more examples here https://sweetalert2.github.io/#examples

/* @ngInject */
export default class SweetAlertCtrl {
  constructor() {
    this.swalInstance = Swal.mixin({
      showClass: {
        // the default bouncy animation is really annoying/distressing, only thing not sweet about it
        popup: 'animated fadeIn faster'
      }
    })
  }

  fire(opts) {
    return this.swalInstance.fire(opts)
  }

  fireTitleText() {
    this.fire({
      title: 'Big Title',
      text: "It's a pretty message, isn't it?",
      confirmButtonColor: '#007AFF',
      showClass: {
        popup: 'animated fadeIn'
      }
    })
  }

  fireConfirmation() {
    this.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        })
      }
    })
  }

  // fireCatFacts() {
  //   const { value: animal } = await Swal.fire({
  //     title: 'Welcome to Cat Facts:',
  //     text:'Did you know a group of cats is called a “clowder.\nWhat is you favorite animal?',
  //     input: 'select',
  //     inputOptions: {
  //       dog: 'Dog',
  //       cat: 'Cat',
  //       octopus: 'Octopus',
  //       gopher: 'Gopher'
  //     },
  //     inputPlaceholder: 'Select an animal',
  //     showCancelButton: true,
  //     inputValidator: (value) => {
  //       return new Promise((resolve) => {
  //         if (value === 'cat') {
  //           resolve()
  //         } else {
  //           resolve('Incorrect, your favorite animal is a cat:)')
  //         }
  //       })
  //     }
  //   })

  //   if (animal) {
  //     Swal.fire(`You selected: ${animal}`)
  //   }
  // }

  toast(icon, text) {
    Swal.fire({
      toast: true,
      icon: icon,
      text: text,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }
}

// angular.module('app').controller('SweetAlertCtrl', function ($scope) {

//   $scope.simpleSwal = function () {
//     Swal.fire('Any fool can use a computer')
//   };

//   $scope.demo2 = function () {
//     SweetAlert.swal({
//       title: "Here's a message!",
//       text: "It's pretty, isn't it?",
//       confirmButtonColor: "#007AFF"
//     });
//   };

//   $scope.demo3 = function () {
//     SweetAlert.swal({
//       title: "Good job!",
//       text: "You clicked the button!",
//       type: "success",
//       confirmButtonColor: "#007AFF"
//     });
//   };

//   $scope.demo4 = function () {
//     SweetAlert.swal({
//       title: "Are you sure?",
//       text: "Your will not be able to recover this imaginary file!",
//       type: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#DD6B55",
//       confirmButtonText: "Yes, delete it!"
//     }, function () {
//       SweetAlert.swal({
//         title: "Booyah!",
//         confirmButtonColor: "#007AFF"
//       });
//     });
//   };

//   $scope.demo5 = function () {
//     SweetAlert.swal({
//       title: "Are you sure?",
//       text: "Your will not be able to recover this imaginary file!",
//       type: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#DD6B55",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel plx!",
//       closeOnConfirm: false,
//       closeOnCancel: false
//     }, function (isConfirm) {
//       if (isConfirm) {
//         SweetAlert.swal({
//           title: "Deleted!",
//           text: "Your imaginary file has been deleted.",
//           type: "success",
//           confirmButtonColor: "#007AFF"
//         });
//       } else {
//         SweetAlert.swal({
//           title: "Cancelled",
//           text: "Your imaginary file is safe :)",
//           type: "error",
//           confirmButtonColor: "#007AFF"
//         });
//       }
//     });
//   };

//   $scope.demo6 = function () {
//     SweetAlert.swal({
//       title: "Sweet!",
//       text: "Here's a custom image.",
//       imageUrl: "http://oitozero.com/img/avatar.jpg",
//       confirmButtonColor: "#007AFF"
//     });
//   };

// });
