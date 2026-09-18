from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=240):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Check if pixel is close to white (allow slight off-white like 245+)
        if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
            # Change white to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_white_bg("public/partners/jaighurudevalogo.webp", "public/partners/jaighurudevalogo.png")
