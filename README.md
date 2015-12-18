# website
Our corporate website


## Harp

Built with HarpJS: http://harpjs.com/docs/
```
npm install harp
harp server --port 9000
```

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
