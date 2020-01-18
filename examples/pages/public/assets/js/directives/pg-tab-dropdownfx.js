/* ============================================================
 * Directive: pgTabDropdownfx
 * Responsive Tabs with dropdown effect
 * effect for tab transitions. 
 * ============================================================ */

angular.module('app')
    .directive('pgTabDropdownfx', function() {
        return {
            link: function(scope, element, attrs) {

                var drop = $(element);
                drop.addClass("hidden-sm hidden-xs");
                var content = '<select class="cs-select cs-skin-slide full-width" data-init-plugin="cs-select">'
                for(var i = 1; i <= drop.children("li").length; i++){
                    var li = drop.children("li:nth-child("+i+")");
                    var selected ="";
                    if(li.hasClass("active")){    
                        selected="selected";
                    }
                    content +='<option value="'+ li.children('a').attr('href')+'" '+selected+'>';
                    content += li.children('a').text();
                    content += '</option>';
                }
                content +='</select>'
                drop.after(content);
                var select = drop.next()[0];
                $(select).on('change', function (e) {
                    var optionSelected = $("option:selected", this);
                    var valueSelected = this.value;
                    drop.find('a[href="'+valueSelected+'"]').tab('show') 
                })
                $(select).wrap('<div class="nav-tab-dropdown cs-wrapper full-width p-t-10 visible-xs visible-sm"></div>');
                new SelectFx(select);

            }
        };
    });