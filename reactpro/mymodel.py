import PIL.Image as Image
import base64
import io
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from PIL import ImageOps
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
model=load_model('newhandwrite.h5')
def mymachinemodel(imageData):
    i=imageData[22:]
    i1=base64.b64decode(i)
    png = Image.open(io.BytesIO(i1))
    png.load()
    background = Image.new("RGB", png.size, (255, 255, 255))
    background.paste(png, mask=png.split()[3])
    background.save('mydigit.jpg', 'JPEG', quality=100)
    imgke=load_img('mydigit.jpg',target_size = (28, 28),color_mode = "grayscale")
    nim=ImageOps.invert(imgke)
    imgarray1=np.asarray(nim)
    imgarray1=imgarray1/255
    test_image2 = np.expand_dims(imgarray1, axis =0 )
    test_image2 = np.expand_dims(test_image2, axis =3 )
    pre=model.predict(test_image2)
    sort_array=np.sort(pre[0])
    l=list(pre[0])
    first=l.index(sort_array[-1])
    second=l.index(sort_array[-2])
    third=l.index(sort_array[-3])
    str_format=str(first)+str(second)+str(third)
    return str_format

