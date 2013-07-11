# angle-grinder

## Documentation

```
grunt build
(cd dist/ ; python -m SimpleHTTPServer 8000)
```

navigate to http://localhost:8000/docs

## Tasks

### `grunt bower` - install bower packages

If bower install is run on this configuration file, the entire package's repository will be
pulled down and copied into a components directory.
This repository could quite large, when probably only a built js and css file are needed.

`grunt bower` - provides an easy way for pulling down the specific files from the packages.
