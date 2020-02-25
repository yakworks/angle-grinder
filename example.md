<a name="module_ag-demo"></a>

## ag-demo
Some info on Module

**Example**  
```js
`<ag-demo> name </ag-demo>`
```

* [ag-demo](#module_ag-demo)
    * [~bindings](#module_ag-demo..bindings)
    * [~menuClick](#module_ag-demo..menuClick) : <code>function</code>
    * [~MenuItem](#module_ag-demo..MenuItem) : <code>Object</code>

<a name="module_ag-demo..bindings"></a>

### ag-demo~bindings
Compont bindings

**Kind**: inner constant of [<code>ag-demo</code>](#module_ag-demo)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| color | <code>String</code> | <code>default</code> | `@` The default values for parties. |
| menuItems* | <code>MenuItem</code> |  | The default number of players. |
| menuClick | <code>MenuClick</code> |  | The default funtion to call when menu item is clicked. |
| content | <code>Sring</code> |  | the label for the button |

<a name="module_ag-demo..menuClick"></a>

### ag-demo~menuClick : <code>function</code>
MenuClick call back function

**Kind**: inner typedef of [<code>ag-demo</code>](#module_ag-demo)  

| Param | Type | Description |
| --- | --- | --- |
| menuItem | <code>MenuItem</code> | the menu item object that was clicked |
| event | <code>Object</code> | the event object |

<a name="module_ag-demo..MenuItem"></a>

### ag-demo~MenuItem : <code>Object</code>
MenuItem - The meta info for the menu items

**Kind**: inner typedef of [<code>ag-demo</code>](#module_ag-demo)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | the text or html to show for the item |
| action | <code>MenuClick</code> | the function to call on click |
| class | <code>String</code> | the CSS class to add |
| divider | <code>boolean</code> | set to true to show divider, should be the only one here |

