import InputBase from '../input-base'
/* @ngInject */
export default class YSelectCtrl extends InputBase {

  optionsData

  constructor($element, $timeout) {
		super($element, $timeout);
  }

	$onInit() {
    console.log("YSelectCtrl $onInit with this.$element", this.$element)
		super.onInit();
    super.validate();
    this.ngOptions = "value.id as value.name for value in cmpCtrl.optionsData"
  }

  $postLink() {
    let el = this.$element
    let $sel = this.$element.find("ng-transclude > select")
    console.log("postLink $sel ", $sel)
    //$sel.addClass("form-control")
    //el.find("ng-transclude > select").children().appendTo(el.find("select.comp_select"))

    this.$timeout(() => {
      //let $s = el.find("ng-transclude > select")
      //el.find("select.comp_select").append($s.children())
      //$s.children().appendTo(el.find("select.comp_select"))
      //$s.children().appendTo("select.comp_select");

      //console.log("timeout $sel ", $s)
    });
  }

	onChange() {
		super.onChange();
		super.validate();
	}
}
