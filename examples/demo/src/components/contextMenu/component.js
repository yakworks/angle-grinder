import template from './component.html'
import Swal from 'angle-grinder/src/tools/swal'

class controller {
  player = {
    gold: 100
  }

  items = [
    { name: 'Health Potion', cost: 4 },
    { name: 'Mana Potion', cost: 5 },
    { name: 'Iron Sword', cost: 12 }
  ]

  menuOptionsObject = {
    edit: {
      display: 'Edit',
      icon: 'fa-pencil-square-o'
    },
    delete: {
      display: 'Delete',
      icon: 'fa-trash-o'
    }
  }

  contextMenuClick = (model, menuItem, event, elScope) => {
    Log.debug('contextMenuClick this', this)
    Log.debug('contextMenuClick elScope', elScope)
    Log.debug('contextMenuClick event', event)
    Log.debug('contextMenuClick menuItem', menuItem)
    Log.debug('contextMenuClick model', model)
    Swal.fire(`contextMenuClick key ${menuItem.key}`)
  }

  fullMontyMenuOptions = [
    {
      display: '<strong>Buy</strong>',
      action: (model, menuItem, event, elScope) => {
        Log.debug('contextMenuClick elScope', elScope)
        Log.debug('contextMenuClick event', event)
        Log.debug('contextMenuClick menuItem', menuItem)
        Log.debug('contextMenuClick modelValue', model)
        this.player.gold -= model.item.cost
      }
    },
    {
      display: 'Sell',
      action: (elScope) => {
        this.player.gold += elScope.item.cost
      },
      enabled: (elScope) => !elScope.item.name.match(/Iron/)
    },
    { divider: true },
    ['More...', [
      ['Alert Cost', function($itemScope) {
        alert($itemScope.item.cost)
      }],
      ['Alert Player Gold', function($itemScope) {
        alert(this.player.gold)
      }]
    ]],
    null,
    // NEW OBJECT BASED IMPLEMENTATION:
    {
      text: 'A Few New Objects',
      click: function() {
        alert('A new implementation based on objects')
      }
    },
    {
      text: 'Clicking this does not close the context menu',
      click: function() {
        // Returning false or any false-y value EXCEPT undefined will stop
        // the context menu from closing.
        return false
      }
    },
    {
      text: 'Object-based with Submenu',
      click: function() {
        alert('I clicked the parent item')
      },
      children: [
        { text: 'Object-based child 1', click: function() { alert('object child 1') } },
        { text: 'Object-based child 2', click: function() { alert('object child 2') } }
      ]
    },
    {
      text: 'Object-based with Submenu 3 levels',
      click: function() {
        alert('I clicked the parent item')
      },
      children: [
        {
          text: 'Object-based child 1',
          click: function() { alert('object child 1') },
          children: [
            { text: '3rd Level', click: function() { alert('level3!') } }
          ]
        },
        { text: 'Object-based child 2', click: function() { alert('object child 2') } }
      ]
    },
    {
      text: 'Disabled object-based option',
      enabled: function() {
        return false
      }
    },
    {
      text: function() { return 'Text Using Function' },
      hasBottomDivider: () => this.showHiddenOption,
      children: []
    },
    {
      html: function() { return '<a><b>HTML Using Function</b></a>' }
    },
    {
      text: 'Hidden option',
      displayed: () => {
        return this.showHiddenOption
      }
    }
  ];

  otherMenuOptions = [
    ['Favorite Color', function(model, menuItem, event, elScope) {
      alert(model)
    }]
  ]

  customHtml = '<div style="cursor: pointer; background-color: pink"><i class="glyphicon glyphicon-ok-sign"></i> Testing Custom </div>';
  customItem = {
    html: this.customHtml,
    click() {
      alert('custom html')
    }
  };

  customDisabledItem = {
    html: 'I\'m Disabled',
    enabled: () => {
      return false
    }
  };

  customHTMLOptions = [this.customItem, this.customDisabledItem,
    ['Example 1', () => {
      alert('Example 1')
    }]
  ];
}

export default angular
  .module('ag.demo.contextMenuDemo', [])
  .component('contextMenuDemo', { template, controller })
  .name
