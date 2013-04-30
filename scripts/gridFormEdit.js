
/*global jQuery */
;(function($, window, document, undefined ) {

  $.extend(true, window, {
    "sparkz": {
      "GridFormEdit": GridFormEdit
    }
  });

  function GridFormEdit(opts){
    var self = this, o = opts
      , $grid = $(o.grid)
      , $formDiv = $(o.formDiv)
      , editFormUrl = o.editFormUrl
      , $spinDiv = o.spinnerDiv?o.spinnerDiv:$('#spinner')

    var spin = {
      spinner: new Spinner(),

      show: function(){
        $spinDiv.show()
        spin.spinner.spin($spinDiv[0])
      },

      hide:function(){
        spin.spinner.stop();
        $spinDiv.slideUp('fast')
      }
    }

    // loads the formDiv with results of calling url
    this.showForm = function(url){
      //some hackiness so that the fixed nav bar on top does not obscure the an in-page anchor or jump
      //found here https://github.com/twitter/bootstrap/issues/1768
      //show spinner
      spin.show()
      //$formDiv.hide()

      $formDiv.load(url,function(){
        spin.hide()
          $formDiv.slideDown('fast');
          scrollBy(0, -50);
          //set the focus for IE
          $('[autofocus]:not(:focus)').eq(0).focus();
      });
    }

    //calls showForm with the url of the edit screen
    this.showEditForm = function(rowId){
      var urlLink = o.editFormUrl + "?id=" +rowId;
      self.showForm(urlLink)
    }

    this.attachEditActionEvents = function(){
      $grid.on('editAction',function(e,rowId,gridObject) {
        self.showEditForm(rowId)
      })

      $grid.on('click',"a.editActionLink" , function(evt) {
        var id = $(this).parents("tr:first").attr("id");
        self.showEditForm(id)
      })
    }

    this.attachSubmitEvent = function(){

      $formDiv.on('submit',"form[data-async]" , function(evt) {
        evt.preventDefault();
        var $form = $(this);
        var $target = $($form.attr('data-target'));
        $("button[type='submit']",$form).button('loading');
        $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data: $form.serialize(),
          success: function(data, status) {
            console.log(data);
            //$grid.jqGrid("setGridParam",{datatype:'local'})
            if($grid.jqGrid("getInd",data.id) === false){
              $grid.jqGrid("addRowData", data.id,data,"first")
            }else{
              $grid.jqGrid("setRowData", data.id,data)
            }

            $target.html("").hide();
            var ind = $grid[0].rows.namedItem(data.id);
            //$grid.jqGrid('setSelection', data.id, false)
            //flash the row so use knows its updated
            $(ind).css("background-color", "#DFF0D8")
            $(ind).delay(100).fadeOut('medium',function(){
              $(ind).css("background-color", "")
            }).fadeIn('fast')
          },
          error: function(request,error){
            $target.html(request.responseText);
          }
        });
      });

    }

    this.attachResetEvent = function(){
      //reset button
      $formDiv.on('click', "form button[type='reset']" , function(evt) {
        evt.preventDefault();
        var form = $(this).closest('form')[0];
        var $target = $($(form).attr('data-target'));
        form.reset();
        $target.slideUp('fast');
      });
    }

    this.init = function(){
      self.attachEditActionEvents()
      self.attachSubmitEvent()
      self.attachResetEvent()
      return self
    }
    //****INITIALIZE******/

  }

  GridFormEdit.newInstance = function(o){
    return new GridFormEdit(o).init()
  }

})(jQuery, window, document);
