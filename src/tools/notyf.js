import { Notyf } from 'notyf'
// import 'notyf/notyf.min.css'

const themeColors = {
  success: 'hsla(85, 77%, 35%, .97)',
  info: '#039BE5',
  warning: '#faae42',
  danger: 'hsla(0, 53%, 58%, 0.95)',
}
const notyf = new Notyf({
  duration: 2000,
  dismissible: true,
  position: { x: 'right', y: 'top' },
  types: [
    {
      type: 'success',
      background: themeColors.success,
      duration: 0,
      dismissible: true,
    },
    {
      type: 'error',
      background: themeColors.danger,
      duration: 0,
      dismissible: true,
      icon: {
        className: 'fas fa-exclamation-circle fa-lg',
        tagName: 'i',
        color: 'white'
      }
    }
  ]
})
// const notyf = new Notyf({
//   duration: 0,
//   dismissible: true,
//   position: { x: 'right', y: 'top' },
//   types: [
//     {
//       type: 'success',
//       background: themeColors.success,
//       // icon: {
//       //   className: 'material-icons',
//       //   tagName: 'i',
//       //   text: 'warning'
//       // }
//     },
//     {
//       type: 'warning',
//       background: 'orange',
//       icon: {
//         className: 'material-icons',
//         tagName: 'i',
//         text: 'warning'
//       }
//     },
//     {
//       type: 'error',
//       background: 'indianred',
//       duration: 0,
//       dismissible: true,
//       icon: {
//         className: 'material-icons',
//         tagName: 'i',
//         text: 'warning'
//       }
//     }
//   ]
// })

export default notyf
