from PIL import Image
import os
import ntpath
import glob

def listdir_nohidden(path):
    return glob.glob(os.path.join(path, '*'))

fls = listdir_nohidden("static/images/big")

for f in fls:
	image = Image.open(f)
	image.thumbnail((100, 100), Image.ANTIALIAS)
	head, tail = ntpath.split(f)
	image.save('static/images/thumbnails/' + tail, 'JPEG', quality=88)