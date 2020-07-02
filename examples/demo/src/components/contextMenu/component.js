import template from './component.html'
import Swal from 'sweetalert2'

class controller {
  player = {
    gold: 100
  }

  items = [
    { name: 'Small Health Potion', cost: 4},
    { name: 'Small Mana Potion', cost: 5 },
    { name: 'Iron Short Sword', cost: 12 }
  ]

  menuOptions = [
    ['Buy', ($itemScope) => {
      this.player.gold -= $itemScope.item.cost;
    }],
    null,
    ['Sell', ($itemScope) => {
      this.player.gold += $itemScope.item.cost;
    }, function ($itemScope) {
      return $itemScope.item.name.match(/Iron/) == null;
    }],
    null,
    ['More...', [
      ['Alert Cost', function ($itemScope) {
        alert($itemScope.item.cost);
      }],
      ['Alert Player Gold', function ($itemScope) {
        alert(this.player.gold);
      }]
    ]],
    null,
    // NEW OBJECT BASED IMPLEMENTATION:
    {
      text: 'A Few New Objects',
      click: function () {
        alert('A new implementation based on objects');
      }
    },
    {
      text: 'Clicking this does not close the context menu',
      click: function () {
        // Returning false or any false-y value EXCEPT undefined will stop
        // the context menu from closing.
        return false;
      }
    },
    {
      text: 'Object-based with Submenu',
      click: function() {
        alert('I clicked the parent item');
      },
      children: [
        { text: 'Object-based child 1', click: function() { alert('object child 1');} },
        { text: 'Object-based child 2', click: function() { alert('object child 2');} }
      ]
    },
    {
      text: 'Object-based with Submenu 3 levels',
      click: function() {
        alert('I clicked the parent item');
      },
      children: [
        {
          text: 'Object-based child 1',
          click: function() { alert('object child 1');},
          children: [
            { text: '3rd Level', click: function() { alert('level3!'); }}
          ]
        },
        { text: 'Object-based child 2', click: function() { alert('object child 2');} }
      ]
    },
    {
      text: 'Disabled object-based option',
      enabled: function () {
        return false;
      },
    },
    {
      text: function() { return 'Text Using Function'; },
      hasBottomDivider: function () {
        return this.showHiddenOption;
      },
      children: [],
    },
    {
      html: function() { return '<a><b>HTML Using Function</b></a>'; },
      hasTopDivider: function () {
        return !this.showHiddenOption;
      }
    },
    {
      text: 'Hidden option',
      displayed: function () {
        return this.showHiddenOption;
      }
    }
  ];

  otherMenuOptions = [
    ['Favorite Color', function ($itemScope, event, modelValue, text, $li) {
      alert(modelValue);
      console.info($itemScope);
      console.info(event);
      console.info(modelValue);
      console.info(text);
      console.info($li);
    }]
  ]

  customHtml = '<div style="cursor: pointer; background-color: pink"><i class="glyphicon glyphicon-ok-sign"></i> Testing Custom </div>';
  customItem = {
    html: this.customHtml,
    click: function ($itemScope, event, modelValue, text, $li) {
      alert('custom html');
      console.info($itemScope);
      console.info(event);
      console.info(modelValue);
      console.info(text);
      console.info($li);
    }
  };

  customDisabledItem = {
    html: 'I\'m Disabled',
    click: function ($itemScope, $event, value) {
      console.log('expect to never get here!');
    },
    enabled: function ($itemScope, $event, value) {
      console.log('can\'t click');
      return false;
    }
  };

  customHTMLOptions = [this.customItem, this.customDisabledItem,
    ['Example 1', function ($itemScope, $event, value) {
      alert('Example 1');
    }]
  ];
}

export default angular
  .module('ag.demo.contextMenuDemo', [])
  .component('contextMenuDemo', { template, controller })
  .name
