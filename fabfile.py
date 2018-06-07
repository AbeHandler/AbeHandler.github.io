from fabric.api import *

def build():
    local("bundle exec jekyll build")

def serve():
    local("bundle exec jekyll serve")

def deploy():
    build()
    local("cat _site/blog.html |  grep href | grep h3 | awk -F'\"' '{print \"_site\"$2}' | python s3_util.py") # writes to upload.sh
    local("chmod +x upload.sh && ./upload.sh")
    local("aws s3 cp _site/css/style.css s3://www.abehandler.com/css/style.css --acl public-read")
    local("git push origin master")
