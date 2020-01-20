# angular-appear
A jQuery plugin provides appear and disappear events to do infinite scroll or else effect.

## Demo
[Infinite Scroll](https://emn178.github.io/angular-appear/samples/infinite-scroll/)  

## CDN
Compress: https://cdn.rawgit.com/emn178/angular-appear/master/build/angular-appear.min.js  
Uncompress: https://cdn.rawgit.com/emn178/angular-appear/master/src/angular-appear.js

## Download
[Compress](https://raw.github.com/emn178/angular-appear/master/build/angular-appear.min.js)  
[Uncompress](https://raw.github.com/emn178/angular-appear/master/src/angular-appear.js)

## Installation
You can also install angular-appear by using Bower.
```
bower install angular-appear
```

## Requirements
* [jQuery](http://jquery.com/)
* [jQuery-appear](https://github.com/emn178/jquery-appear)  
* [AngularJS](https://angularjs.org/)  

## Usage
Add the ngAppear module as a dependency to your application module:
```JavaScript
var myAppModule = angular.module('MyApp', ['ngAppear'])
```

## ngAppear
The ngAppear directive allows you to specify custom behavior when an element appears.

### Directive Info
This directive executes at priority level 0.

### Usage
as attribute:
HTML
```HTML
<ANY
  ng-appear="">
...
</ANY>
```
### Arguments
| Param | Type | Details |
|:-----|:-------|-------|
|ngAppear   |expression     |Expression to evaluate upon appear. (Event object is available as $event)    |

### Example
```HTML
<div ng-appear="show = true" ng-class="{show: show}" />
```

## ngDisappear
The ngDisappear directive allows you to specify custom behavior when an element disappears.

### Directive Info
This directive executes at priority level 0.

### Usage
as attribute:
HTML
```HTML
<ANY
  ng-disappear="">
...
</ANY>
```
### Arguments
| Param | Type | Details |
|:-----|:-------|-------|
|ngDisappear   |expression     |Expression to evaluate upon disappear. (Event object is available as $event)    |

### Example
```HTML
<div ng-appear="show = true" ng-disappear="show = false" ng-class="{show: show}" />
```

## ngAppearing
The ngAppearing directive allows you to specify custom behavior when scrolling and element is in screen.

### Directive Info
This directive executes at priority level 0.

### Usage
as attribute:
HTML
```HTML
<ANY
  ng-appearing="">
...
</ANY>
```
### Arguments
| Param | Type | Details |
|:-----|:-------|-------|
|ngAppearing   |expression     |Expression to evaluate upon appear. (Event object is available as $event)    |

### Example
```HTML
<div ng-appearing="show = true" ng-class="{show: show}" />
```

## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/angular-appear  
Author: Yi-Cyuan Chen (emn178@gmail.com)
