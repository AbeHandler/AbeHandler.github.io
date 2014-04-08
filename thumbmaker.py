from PIL import Image
import os
import ntpath
fls = os.listdir("static/images/big")
for f in fls:
	image = Image.open("static/images/big/" + f)
	image.thumbnail((100, 100), Image.ANTIALIAS)
	image.save('static/images/thumbnails/' + f, 'JPEG', quality=88)