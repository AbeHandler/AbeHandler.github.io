from PIL import Image
import os
import glob
import ntpath

def listdir_nohidden(path):
    return glob.glob(os.path.join(path, '*'))

fls = listdir_nohidden("static/images/big")

for f in fls:
	image = Image.open(f)
	image.thumbnail((500, 500), Image.ANTIALIAS)
	base = ntpath.basename(f)
	os.remove(f)
	image.save('static/images/big/' + base, 'JPEG', quality=88)