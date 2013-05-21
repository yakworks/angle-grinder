
/*global jQuery */
;(function($, window, document, undefined ) {

  "use strict"; // jshint ;_;
  // register namespace
  $.extend(true, window, {
    "grinder": {
      "Grid": Gridz
    }
  });

  // Class definition
  function Gridz(element, options) {
    this.init(element, options)
  }

  Gridz.prototype = {

    init: function (element, opts ) {
      var $el = $(element)

      this.$element = $el
      this.$el = $el
      this.$grid = $el

      this.gridId = $el.attr('id')
      /** the containing div for the grid , will be built after jqGrid is called*/
      this.gboxId = "gbox_" + $el.attr('id')

      this.options = this.getOptions(opts)

      //console.log(this.options.actionPopup)
      if (this.options.actionPopup)
        this.addRowActionColumn()

      //call the jqgrid
      $el.jqGrid(this.options)

      this.responsiveResize()
    },

    getOptions: function (options) {
      var self = this
      //console.log($.fn.gridz.defaults)
      options = $.extend({}, $.fn.gridz.defaults, options)

      //Events .. beforeSelectRow
      var optBeforeSelectRow = options.beforeSelectRow
      options.beforeSelectRow = function(rowid, e) {
        self.beforeSelectRow.apply(this, arguments)
        if ($.isFunction(optBeforeSelectRow)) { optBeforeSelectRow.apply(this, arguments) }
        return true
      }

      //Events .. gridComplete
      var _gridComplete = options.gridComplete
      options.gridComplete = function() {
        self.gridComplete.apply(self)
        if ($.isFunction(_gridComplete)){
          _gridComplete.apply(this, arguments)
        }
        self.$grid.trigger('gridComplete')
      }
      //if sortable is true then add exclusion for the action column
      if(options.actionPopup && options.sortable){
        options.sortable = {exclude :"#" + this.gridId  + "_row_action_col"}
      }
      //console.log(options)
      return options
    },

    /**
     * stuff to do after the grid is completed loading and rendering
     */
    gridComplete: function (){
      if(this.options.actionPopup) this.actionPopupSetup()

      var gid = "jqgh_" + this.$element.attr('id') + "_row_action_col"
      // disable the sortable property on the action column
      //$('tr.ui-jqgrid-labels').sortable({ cancel: 'th:#'+gid});
      // update the list of sortable item's, and exclude your target element
      //$('tr.ui-jqgrid-labels').sortable({ items: "th:not(#" + gid + ")" });

    },

    /**
     * Handles proper multi selection of rows
     */
    beforeSelectRow: function (rowid, e) {
      //alert(e)
      var $this = $(this), rows = this.rows,
        startId = $this.jqGrid('getGridParam', 'selrow'), // get id of the previous selected row
        startRow, endRow, iStart, iEnd, i, rowidIndex

      var isCheckBox = $(e.target).hasClass('cbox')
      if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !isCheckBox) {
        $this.jqGrid('resetSelection')
      } else if (startId && e.shiftKey) {
        //console.log("shift select")
        $this.jqGrid('resetSelection')

        // get DOM elements of the previous selected and
        // the currect selected rows
        startRow = rows.namedItem(startId)
        endRow = rows.namedItem(rowid)
        if (startRow && endRow) {
          // get min and max from the indexes of the previous selected
          // and the currect selected rows
          iStart = Math.min(startRow.rowIndex, endRow.rowIndex)
          rowidIndex = endRow.rowIndex
          iEnd = Math.max(startRow.rowIndex, rowidIndex)
          for (i = iStart; i <= iEnd; i++) {
            // the row with rowid will be selected by
            // jqGrid. So we don't need select it
            if (i !== rowidIndex) {
              $this.jqGrid('setSelection', rows[i].id, false)
            }
          }
        }

        // clear text selection
        if(document.selection && document.selection.empty) {
          document.selection.empty()
        } else if(window.getSelection) {
          window.getSelection().removeAllRanges()
        }
      }
      return true
    },

    /**
     * adds listener to resize grid to parent container when window is resized. This will work for reponsive and fluid layouts
     */
    responsiveResize: function (){
      var $grid = this.$element
        , gboxId = "#gbox_" + $grid.attr('id')

      $(window).on('resize', function(event, ui) {
        // Get width of parent container which is assumed to be expanded to span
        var parWidth = $(gboxId).parent().width()
          , curWidth = $(gboxId).width()
          , w = parWidth - 1 // add -1 Fudge factor to prevent horizontal scrollbars

        //console.log("span width " + parWidth + " gridWidth " + gWidth)
        if (Math.abs(w - curWidth) > 2){
          //alert("resize to " + width)
          console.log("span width " + parWidth + " gridWidth " + curWidth)
          $grid.setGridWidth(w)
          console.log("new width " + w)
        }
      })//.trigger('resize')
    },

    //*************Action popup methods*************/

    /**
     * adds the action column and formatter.
     */
    addRowActionColumn: function (){
      var self = this
        , opts = this.options
        , containerId = "gbox_" + this.$element.attr('id')

      opts.colModel.unshift({
          name:'row_action_col'
        , label:' '
        , width:20
        , sortable:false
        , search:false
        , hidedlg:true
        , resizable:false //can't resize
        , fixed:true //don't auto calc size
        , formatter:function(cellValue, colOptions, rowObject){
            var func = opts.actionPopup.cellFormatter || self.actionPopupFormatter
            return func(containerId,cellValue, colOptions, rowObject)
          }

        })
    },

    /**
     * default rowActionFormatter. containerId is the dom el to add the drop down to
     */
    actionPopupFormatter: function (containerId) {
      return '<a class="jqg-row-action" title="" data-toggle="popover" href="#" data-container="#' + containerId+'"><i class="icon-cog"></i></a>'
    },
    //called after grid complete to setup the menu
    actionPopupSetup:function(){
      var self = this ,
        options = this.options ,
        actionMenu ;

      if(options.actionPopup.menuList){
        actionMenu = options.actionPopup.menuList
      } else{
        actionMenu = '<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu"> \
          <li><a href="#" class="row_action_show" data-dismiss="clickover"><i class="icon-eye-open"></i> show</a></li> \
          <li><a href="#" class="row_action_edit" data-dismiss="clickover"><i class="icon-edit"></i> edit</a></li> \
          <li><a href="#" class="row_action_delete" data-dismiss="clickover"><i class="icon-trash"></i> delete</a></li> \
          </ul>'
      }

      $('.jqg-row-action').clickover({
        html: true,
        content: actionMenu,
        template: '<div class="popover row-action-popover"><div class="arrow"></div><div class="popover-content dropdown clearfix" style="padding:0;"></div></div>',
        onShown: function (){
          self.actionPopupOnShow.call(self, this)
          //this = the clickover <a>
          //assignActionRowId.call(self,this)
          //addActionPopupListeners(self,this,$grid)
        }
      })
    },

    //fired when the clickover is shown
    actionPopupOnShow : function (clickoverEl){
      var self = this, $grid = this.$element,
          id = $(clickoverEl.$element,$grid.rows).parents("tr:first").attr("id"),
          $menu = $('#' + self.gboxId + ' .dropdown-menu')

      $grid.data("actionRowId",id)
      $grid.jqGrid('resetSelection')
      $grid.jqGrid('setSelection', id )

      $menu.on('click','li a.row_action_show', function(e) {
        $grid.trigger('showAction')
      })
      $menu.on('click','li a.row_action_edit', function(e) {
        $grid.trigger('editAction', [id,self])
      })
      $menu.on('click','li a.row_action_delete', function(e) {
        $grid.trigger('deleteAction')
      })
    }

  } // end Gridz.prototype definition





  // Jquery Plugin definition
  $.fn.gridz = function (option) {

    if (typeof option === 'string') {
      var otherArgs = Array.prototype.slice.call(arguments, 1)
        , instance  = $(this).data("gridz")

      if (instance && instance[option] ) {
        instance[option].apply(this, otherArgs)
      }
      else { //try passing through to jqgrid
        return $(this).jqGrid(arguments)
      }
    }
    return this.each(function() {

      var $this = $(this)
        , instance = $this.data('gridz')
        , options = typeof option === "object" ? option : {}

      if (!instance) {
        $this.data('gridz', (instance = new Gridz(this, options)))
      }

    })
  }

  $.fn.gridz.Constructor = Gridz

  $.fn.gridz.defaults = {
    prmNames:{page:"page",rows:"max", sort: "sort",order: "order"},
    jsonReader: { repeatitems: false},
    datatype: 'json',
    mtype: 'GET', //for the ajax json read
    rowNum:20, //num rows to show by default
    rowList:[10,20,50,100],
    altRows: true,
    shrinkToFit:false,
    autowidth: true,
    height: '100%',
    sortable: true,
    multiselect: true, //one or more row selections
    pager: "#gridPager",
    // onSortCol:sortColumn,
    // onPaging:pagingChange,
    beforeSelectRow: null ,
    gridComplete: null ,
    actionPopup:{
      formatter:null,
      menuList:null
    }
    // gridComplete:function(){
    //     setupActionClickOver()
    // }
  }

  //Extra formatters for jqGrid
  $.extend($.fn.fmatter , {
    okIcon : function(cellVal, options, rowdata) {
      return cellVal ? "<i class='icon-ok'></i>" : ""
    },
    editActionLink: function(cellVal, options, rowdata) {
      //console.log(rowdata)
      return '<a class="editActionLink" href="#" > '+cellVal+'</a>';
    }
  });

})(jQuery, window, document);
