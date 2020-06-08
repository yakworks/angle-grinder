import template from './comp.html'

class controller {
  vm = {
    singleColor: 'blue',
    multiColorTags: ['red', 'blue'],
    singlePickId: 1,
    singlePick: { id: 2 },
    multiPick: [
      {
        "id": 1,
        "name": "Option 1"
      },
      {
        "id": 2,
        "name": "Option 2"
      }
    ]
  }
  vm2 = {
    singleColor: 'yellow',
    multiColorTags: ['yellow', 'blue'],
    singlePick: { id: 3 },
    multiPick: [
      {
        "id": 3,
        "name": "Option 3"
      }
    ]
  }

  picklistData = [
    // { id: 'all', name: 'Select All', disabled: true },
    { id: 'all', name: 'Select All'},
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]
  colorData = ['red','blue','yellow']

  singleColorOpts = {
    //useDataObject: false,
    data: this.colorData
  }

  multiColorOpts = {
    useDataObject: false,
    multiple: true,
    data: this.colorData
  }

  singlePickOpts = {
    useDataObject: true,
    data: this.picklistData
  }

  multiPickOpts = {
    useDataObject: true,
    multiple: true,
    closeOnSelect: false,
    data: this.picklistData,
    formatResult:function(object, container, query){
      console.log("formatResult", object)
      if(object.id=='all' || object.id=='clear')
        return `
          <span class="all" style="font-size:12px; margin-top:-3px; margin-bottom:-3px;""><i class="fa fa-th"></i> ${object.name} </span> |
          <span class="clear" style="font-size:12px; margin-top:-3px; margin-bottom:-3px;""><i class="fa fa-times-circle"></i> Clear All</span>
        `
        //return '<span style="color:#31708F;font-size:10px;"><i class="fa fa-th"></i> '+object.name+'</span>';

      return object.name;
    }
  }

  changeModelData(){
    this.vm = this.vm2
  }
  clearData(){
    this.vm = {}
  }
}

const COMP = 'demoSelDataInput'
export default angular.module(`ag.demo.${COMP}`, [])
  .component(COMP, { template, controller }).name
