from pypdf import PdfReader

# pdf file 경로
PDF_FILE_PATH = "example.pdf"

reader = PdfReader(PDF_FILE_PATH)
number_of_pages = len(reader.pages)
pages = reader.pages[1:5]
text = ""

# print(pages)
for page in pages:
    curr_pg_txt = page.extract_text()
    text += curr_pg_txt

print(text)


# for image_file_object in page.images:
#     with open(str(count) + image_file_object.name, "wb") as fp:
#         fp.write(image_file_object.data)
#         count += 1


# page = reader.pages[7]
# count = 0
# for image_file_object in page.images:
#     with open(str(count) + image_file_object.name, "wb") as fp:
#         fp.write(image_file_object.data)
#         count += 1
# text = page.extract_text()
