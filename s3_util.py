import sys

with open("upload.sh", "w") as of:
    for line in sys.stdin:
        out = "aws s3 cp " + line.strip("\n") + " " + "s3://www.abehandler.com/" + line.replace("_site/", "").replace("\n", "") + " --acl public-read --content-type text/html"
        print out
        of.write(out + "\n")
