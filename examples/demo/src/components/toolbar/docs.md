**menu-click** (*function(item, event*)) - an event function to call when menu item is clicked 

**menu-items\*** (*object*) - The items list that can be chosen from the menu. Each action is an object with the properties 'display' (*string*) which is the only required one,  'action' (*function(item, event)*) a specific function that will be called for that item if you don't want to use a general menu-click function.
