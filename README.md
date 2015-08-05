# website
Our corporate website

## Aws

### Setup
```
aws s3 mb s3://www.datavorelabs.com
aws s3 website s3://www.datavorelabs.com --index-document index.html --error-document error.html
```
Use the ui to create another bucket `s3://datavorelabs.com` and set to __Redirect all requests to another host name__ `www.datavorelabs.com`

### Deploy
```
aws s3 sync . s3://www.datavorelabs.com --acl public-read --delete --exclude ".git/*"
```
