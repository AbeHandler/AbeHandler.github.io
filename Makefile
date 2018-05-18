# https://github.com/CloudCannon/bakery-store-jekyll-template/tree/navigation/css
build:
	bundle exec jekyll serve

deploy:
	cat _site/blog.html |  grep href | grep h3 | awk -F'"' '{print "_site"$2}' | python s3_util.py > upload.sh
