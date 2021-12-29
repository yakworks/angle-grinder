import _ from 'lodash'
import { setupData } from './dataQuery'
/**
 * configures the row formatter based on option settings
 *
 */
export default function select2Setup(opts, dataStoreApi) {
  let defaults = {
    allowClear: true,
    fields: {
      id: 'id',
      text: 'name'
    },
    dataVar: 'val',
    showSelectAll: false,
    multiple: false
  }
  _.defaultsDeep(opts, defaults)
  // default to whats in fields.text
  if(!opts.displayFields) opts.displayFields = [opts.fields.text]
  // console.log("select2 opts", opts)
  // select2 needs placeholder if allowClear=true.
  if (opts.allowClear && !opts.placeholder) {
    opts.placeholder = ' '
  }

  if (opts.multiple) {
    //setup multiple defaults
    if (_.isUndefined(opts.closeOnSelect)) opts.closeOnSelect = false
  }
  //setup data
  setupData(opts, dataStoreApi)

  // if modelType is object then will use the elm.select2('data') and will store the selected
  // object(s) in the model as objects instead of as just the ids

  // when its on and input and its set to multiple then we will use 'data' so it creates and array of obbjecgs for
  // selection and not array of ids
  if (opts.useDataObject === undefined && opts.multiple) {
    opts.useDataObject = true
  }

  // don't do initSelection with useDataObject, its screws it up and preruns the promise for rest
  if (!opts.initSelection && opts.useDataObject) opts.initSelection = function(element, callback) { }
  // if initSelection is a boolean true then remove it so the default in Select2 can take over
  // useful to set true on single selects when you only id and want to get the name display from select2
  if (opts.initSelection === true) delete opts.initSelection

  if (opts.useDataObject) {
    opts.dataVar = 'data'
  }

  const showSelectAll = opts.showSelectAll
  const displayFields = opts.displayFields

  opts.text = function(item) {
    return item[opts.fields.text]
  }

  //function to underline matching text with what was typed
  let markMatch = function(text, term, escapeMarkup){
    var markup=[];
    Select2.util.markMatch(text, term, markup, escapeMarkup);
    return markup.join("")
  }

  let formatMultiColumns = function(item) {
    let displayTds = ''
    displayFields.forEach( it => displayTds = `${displayTds} <td>${item[it]}</td>` )
    var markup = `
      <table class="table table-condensed select-rest-result">
        <tr>${displayTds}</tr>
      </table>
    `
    return markup;
  }

  //main format function
  opts.formatResult = function(result, container, query, escapeMarkup) {
    if (showSelectAll && result.id === 'selectAll') return selectAllMenu()

    if(displayFields.length > 1){
      return formatMultiColumns(result)
    }else{
      return markMatch(opts.text(result), query.term, escapeMarkup)
    }
  }
}

function selectAllMenu(){
  return `
    <span class="select-all-menu">
      <span class="select-all">
      <i class="fas fa-th"></i> Select All &nbsp; | </span>
      <span class="clear-all"> x Clear All </span>
    </span>
  `
}

