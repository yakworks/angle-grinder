import template from './component.html'
import Swal from 'angle-grinder/src/tools/swal'
import toast from 'angle-grinder/src/tools/toast'

class controller {

  constructor($compile, $scope){
    this.$compile = $compile
    this.$scope = $scope
  }

  buttonClick(event) {
    // console.log('menuItemClick params', { menuItem, event })
    Swal.fire(
      'The Title',
      'Some Text or <strong>html</strong>'
    )
  }

  questionClick(event) {
    Swal.fire(
      'The Internet?',
      'That thing is still around?',
      'question'
    )
  }

  errorClick(event) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>',
      showCloseButton: true
    })
  }

  compileClick(event) {
    Swal.fire({
      title: 'Compiled Angular',
      showCloseButton: true,
      onOpen: (el) => {
        // not ideal but it shows that it can be done
        const cnt = this.$compile(`
        <ag-select ng-model="$ctrl.vm.cust" style="text-align: left"
          select-options="{ dataApiKey: 'customer' }"></ag-select>`)(this.$scope)
        $(el).find('#swal2-content').append(cnt).show()
      }
    })
  }

  confirmClick(event) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No',
      showCancelButton: true,
      showCloseButton: true
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      // confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        toast.success('Your file has been deleted.', 'Deleted!')
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  async withInputlick(event) {
    const result = await Swal.fire({
      title: 'Enter Foo Name?',
      text: 'What is the name of the foo',
      input: 'text',
      // inputValue: 'Bill',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter a name!'
        }
      },
      confirmButtonText: 'Change Name',
      showCancelButton: true
    })
    console.log('result', result)

    toast.success(`your foo is now named ${result.value}`, 'Named Foo!')
  }
}
controller.$inject = ['$compile', '$scope']
export default { template, controller }
