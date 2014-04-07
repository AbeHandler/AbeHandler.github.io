from PIL import Image
image = Image.open('static/images/4719_Redwood.jpg')
image.thumbnail((200, 200), Image.ANTIALIAS)
image.save('static/images/123_Octavia_St.jpg', 'JPEG', quality=88)