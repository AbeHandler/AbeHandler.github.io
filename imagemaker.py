from PIL import Image
image = Image.open('static/images/4719_Redwood.jpg')
image.thumbnail((80, 80), Image.ANTIALIAS)
image.save('static/images/thumb.jpg', 'JPEG', quality=88)