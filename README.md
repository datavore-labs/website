[![Build Status](https://snap-ci.com/datavore-labs/website/branch/master/build_image)](https://snap-ci.com/datavore-labs/website/branch/master)

# website
Our corporate website


## Harp

Built with HarpJS: http://harpjs.com/docs/

---
**!!NOTE!!**
Harp references a missing package `node-sass` for node `v6.5.0`.
You might need to `nvm use v5.0.0` or something.
---

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

