import random
from datetime import datetime, timedelta
import io
from PIL import Image, ImageDraw
from hashlib import sha256

def generate_random_date(start_date=datetime(1970, 1, 1), end_date=datetime(2023, 12, 31)):
    random_seconds = random.randint(0, int((end_date - start_date).total_seconds()))
    random_date = start_date + timedelta(seconds=random_seconds)
    return random_date

def generate_random_color():
    return tuple(random.randint(0, 255) for _ in range(3))

def generate_random_shape(image, res):
    draw = ImageDraw.Draw(image)

    shape_type = random.choice(['rectangle', 'triangle', 'circle', 'ellipse'])
    color = generate_random_color()
    shape_color = generate_random_color()

    if shape_type == 'rectangle':
        x1 = random.randint(10, res)
        y1 = random.randint(10, res)
        x2 = random.randint(x1, res)
        y2 = random.randint(y1, res)
        draw.rectangle([(x1, y1), (x2, y2)], fill=shape_color, outline=color)

    elif shape_type == 'triangle':
        x1 = random.randint(10, res)
        y1 = random.randint(10, res)
        x2 = random.randint(10, res)
        y2 = random.randint(10, res)
        x3 = random.randint(10, res)
        y3 = random.randint(10, res)
        draw.polygon([(x1, y1), (x2, y2), (x3, y3)], fill=shape_color, outline=color)

    elif shape_type == 'circle':
        x = random.randint(10, res)
        y = random.randint(10, res)
        radius = random.randint(10*res/128, 50*res/128)
        draw.ellipse([(x - radius, y - radius), (x + radius, y + radius)], fill=shape_color, outline=color)

    elif shape_type == 'ellipse':
        x = random.randint(0, res)
        y = random.randint(0, res)
        width = random.randint(10*res/128, 50*res/128)
        height = random.randint(10*res/128, 50*res/128)
        draw.ellipse([(x - width, y - height), (x + width, y + height)], fill=shape_color, outline=color)

    del draw

def generate_random_image(res, num_shapes):
    image = Image.new('RGB', (res, res), generate_random_color())
    for _ in range(num_shapes):
        generate_random_shape(image, res)
    image_data = io.BytesIO()
    image.save(image_data, format='PNG')
    image_binary = image_data.getvalue()
    return image_binary

def hash_password(input_string):
    sha256_hash_obj = sha256()
    sha256_hash_obj.update(input_string.encode('utf-8'))
    hashed_value = sha256_hash_obj.hexdigest()
    return hashed_value