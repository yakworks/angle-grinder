app = angular.module "angleGrinder.common"

app.directive 'tagInput', ->
  restrict: 'E'
  scope:
    tags: '=ngModel'

  link: ($scope, element, attrs) ->

    $scope.tagVal = ''
    $scope.style = attrs.style || ""
    $scope.placeholder = attrs.placeholder
    $scope.defaultWidth = '10px'

    $scope.tagArray = ->
      return [] if $scope.tags is undefined
      $scope.tags.replace(".", "").split(',').filter (tag) ->
        return tag != ""

    $scope.addTag = ->
      return if $scope.tagVal.length is 0
      tagArray = $scope.tagArray()
      if $scope.tagVal not in tagArray
        if ($scope.tagVal.indexOf(",") > -1)
          tagArray = tagArray.concat(_.map($scope.tagVal.split(","), (e)-> e.trim()))
        else
          tagArray.push $scope.tagVal.trim()
      tagArray = _.map(tagArray, (e) ->
        return e.trim()
      )
      $scope.tags = tagArray.join(',')
      $scope.tagVal = ""

    $scope.deleteTag = (key) ->
      tagArray = $scope.tagArray()
      if tagArray.length > 0 and $scope.tagVal.length is 0 and key is undefined
        tagArray.pop()
      else tagArray.splice key, 1  unless key is undefined
      $scope.tags = tagArray.join(',')

    $scope.$watch 'tagVal', (newVal, oldVal) ->
      unless newVal is oldVal and newVal is undefined

        tempEl = $("<span>" + newVal + "</span>").appendTo("body")
        $scope.inputWidth = tempEl.width() + 5
        $scope.inputWidth = $scope.defaultWidth if $scope.inputWidth < $scope.defaultWidth
        tempEl.remove()

    element.bind "keydown", (e) ->
      key = e.which

      e.preventDefault() if key is 9 or key is 13
      $scope.$apply 'deleteTag()' if key is 8

    element.bind "keyup", (e) ->
      key = e.which

      # Tab, Enter pressed
      if key is 9 or key is 13
        e.preventDefault()
        $scope.$apply 'addTag()'
      isDot = $scope.tags?[0] is "." or $scope.tagVal?[0] is "."
      if key is 188 and not isDot
        e.preventDefault()
        $scope.$apply 'addTag()'

    element.bind "focusout", (e) ->
      e.preventDefault()
      $scope.$apply 'addTag()'

  template: "<div class='tagged-input'><div class='tag' ng-repeat=\"tag in tagArray() track by $index\"><a href='javascript:' class='delete-tag' ng-click='deleteTag($index)'><i class='glyphicon glyphicon-remove'></i></a>{{tag}}</div><input type='text' style='width:  {{inputWidth}}' ng-model='tagVal' placeholder='{{placeholder}}'/></div>"
