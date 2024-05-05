from pypdf import PdfReader

reader = PdfReader("example.pdf")
number_of_pages = len(reader.pages)
count = 0
print("there are a total of", number_of_pages, "in this pdf")

for page in reader.pages:
    text = page.extract_text()

    for image_file_object in page.images:
        with open(str(count) + image_file_object.name, "wb") as fp:
            fp.write(image_file_object.data)
            count += 1

    print(text)


# page = reader.pages[7]
# count = 0
# for image_file_object in page.images:
#     with open(str(count) + image_file_object.name, "wb") as fp:
#         fp.write(image_file_object.data)
#         count += 1
# text = page.extract_text()
