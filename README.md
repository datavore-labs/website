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

---

## AWS

### S3 bucket
```
aws s3 mb s3://www.datavorelabs.com
aws s3 website s3://www.datavorelabs.com --index-document index.html --error-document error.html
```

### Dns
+ Use our dns provider to setup a root domain redirect from `datavore.com` to `www.datavore.com` 
+ Setup a cname for `www` to `www.datavorelabs.com.s3-website-us-east-1.amazonaws.com`

### Deploy
```
aws s3 sync . s3://www.datavorelabs.com --acl public-read --delete --exclude ".git/*"
```
