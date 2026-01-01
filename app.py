from flask import Flask, render_template, request, send_file
from flask_cors import CORS
import qrcode
from io import BytesIO
import base64
from PIL import Image, ImageDraw

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_qr():
    data = request.json
    text = data.get('text', '')
    size = int(data.get('size', 300))
    fg_color = data.get('fgColor', '#000000')
    bg_color = data.get('bgColor', '#ffffff')
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=2,
    )
    qr.add_data(text)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color=fg_color, back_color=bg_color)
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    
    img_base64 = base64.b64encode(buffer.getvalue()).decode()
    return {'image': f'data:image/png;base64,{img_base64}'}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
