import Swal from 'sweetalert2'

let swalInstance = Swal.mixin({
  showClass: {
    // the default bouncy animation is really annoying/distressing, only thing not sweet about it
    popup: 'animated fadeIn faster'
  }
})

export default swalInstance
