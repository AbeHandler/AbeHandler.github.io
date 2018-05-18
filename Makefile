# https://github.com/CloudCannon/bakery-store-jekyll-template/tree/navigation/css
build:
	bundle exec jekyll serve

deploy:
	aws s3 cp _site/index.html s3://www.abehandler.com/index.html --acl public-read && aws s3 cp _site/blog.html s3://www.abehandler.com/blog.html --acl public-read	
