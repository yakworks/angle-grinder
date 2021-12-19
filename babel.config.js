module.exports = function(api) {
  api.cache(true);
  const presets = [
    ["@babel/preset-env",{
      // "useBuiltIns": "entry" ,
      "useBuiltIns": "usage" ,
      "corejs": 3
    }]
  ];
  const plugins = [
    ["angularjs-annotate"],
    "lodash",
    "babel-plugin-transform-async-to-promises",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
    "wildcard",
    ["module-resolver", {
      "root": ["./src"],
      //make it work with both
      "alias": [
        {"@ag-svelte": "./svelte"},
        {"@ag": "./src"},
        {"angle-grinder/svelte": "./svelte"},
        {"angle-grinder/src": "./src"},
        //used for demo
        { "~": "./examples/demo/src"},
      ]
    }],
    [ // required for svelte-jsx and svelte-fragment-component
      "@babel/plugin-transform-react-jsx",
      {"runtime": "automatic", "importSource": "svelte-jsx"}
    ]
  ];

  return {
    presets,
    plugins
  };
}