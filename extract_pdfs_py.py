import os
import PyPDF2

pdf_dir = 'public/Courses'
scratch_dir = 'scratch'

if not os.path.exists(scratch_dir):
    os.makedirs(scratch_dir)

pdfs = [
    'Creative Design and video editing course.pdf',
    'Data Science with AI Course.pdf',
    'React JS Full Stack Development.pdf'
]

for pdf in pdfs:
    path = os.path.join(pdf_dir, pdf)
    if not os.path.exists(path):
        print(f"Not found: {path}")
        continue
    try:
        text = ""
        with open(path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() + "\n"
        
        out_path = os.path.join(scratch_dir, pdf.replace('.pdf', '.txt'))
        with open(out_path, 'w', encoding='utf-8') as out_f:
            out_f.write(text)
        print(f"Successfully extracted {pdf}")
    except Exception as e:
        print(f"Error extracting {pdf}: {e}")
