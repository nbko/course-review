from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

def scrape_instructors(url, instructors_set, i):
    # Launch a browser and navigate to the URL
    driver = webdriver.Firefox()
    driver.get(url)

    # Wait for the page to load
    wait = WebDriverWait(driver, 10)
    wait.until(EC.visibility_of_element_located((By.ID, "mainmatter")))

    # Get the page source
    page_source = driver.page_source
    driver.quit()  # Close the browser

    # Parse the HTML
    soup = BeautifulSoup(page_source, "html.parser")

    # Find all rows with class even or odd
    rows = soup.find_all('tr', class_=lambda x: x in ['even', 'odd'])

    instructors_lst = set()

    # Extract instructor names from each row
    for row in rows:
        # Find the third <p> element within the row
        instructor_cell = row.find_all('p')[2]
        
        # Extract instructor names from <a> tags within the <p> element
        instructor_name_tags = instructor_cell.find_all('a')
        for name_tag in instructor_name_tags:
            instructor_name = name_tag.text.strip()
            instructors_lst.add(instructor_name)
            instructors_set.add(instructor_name)
    
    instructors_lst = sorted(instructors_lst)
    print(i, instructors_lst, "\n")

# URLs to scrape
urls = [
    "https://course-info.cs.uchicago.edu/guavaC/mobile/aut24.html",
    "https://course-info.cs.uchicago.edu/guavaC/mobile/win25.html",
    "https://course-info.cs.uchicago.edu/guavaC/mobile/spr25.html"
]

def generate_instructors():
    # Initialize a set to store unique instructor names
    instructors_set = set()
    i = 0

    # Scrape instructors from each URL and append them to the set
    for url in urls:
        i += 1
        scrape_instructors(url, instructors_set, i)

    # Convert set to list if needed
    return sorted(instructors_set)

def store_instructors_to_file(instructors, filename):
    # Open the file in write mode
    with open(filename, 'w') as f:
        # Write each instructor to the file
        json.dump(instructors, f)


def main():
    # Generate the list of instructors
    instructors = generate_instructors()

    # Write the list of instructors to a file
    filename = 'instructors_list.json'
    store_instructors_to_file(instructors, filename)

if __name__ == "__main__":
    main()