[![Build Status](https://snap-ci.com/datavore-labs/website/branch/master/build_image)](https://snap-ci.com/datavore-labs/website/branch/master)

# website
Our corporate website


## Harp

Built with HarpJS: http://harpjs.com/docs/

To set up and run a local server:
```
npm install harp
harp server --port 9000
```

To compile finished production ready build into `/www`: 
```
harp compile
```

The `www` directory is what should be pushed to webhosting.

