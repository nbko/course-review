"""
2024-2025년도에 컴퓨터 수업을 가르칠 교수님의 성함을 크롤링해오는 코드
원래는 모든 전공의 교수님 성함 정보를 가져오려 했으나(다른 웹사이트에서) 
이 코드를 짤 때는 컴싸 교수님들 정보만 따로 cs course info 웹사이트에 올라와있었음
"""

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json

def scrape_instructors(url, instructors_set, i):
    # Launch a browser and navigate to the URL
    # url로 이동
    driver = webdriver.Firefox()
    driver.get(url)

    # Wait for the page to load
    # 페이지 로딩될때까지 기다리기
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
    # 교수님 성함 가져오기
    for row in rows:
        # Find the third <p> element within the row
        instructor_cell = row.find_all('p')[2]
        
        # Extract instructor names from <a> tags within the <p> element
        # 교수님 이름이 p 엘리먼트 안의 a 태그 안에 있음
        instructor_name_tags = instructor_cell.find_all('a')
        for name_tag in instructor_name_tags:
            instructor_name = name_tag.text.strip()
            instructors_lst.add(instructor_name)
            instructors_set.add(instructor_name)
    
    instructors_lst = sorted(instructors_lst)
    print(i, instructors_lst, "\n")

# URLs to scrape
# 내년 수업 인포 정보
urls = [
    "https://course-info.cs.uchicago.edu/guavaC/mobile/aut24.html",
    "https://course-info.cs.uchicago.edu/guavaC/mobile/win25.html",
    "https://course-info.cs.uchicago.edu/guavaC/mobile/spr25.html"
]

def generate_instructors():
    # Initialize a set to store unique instructor names
    # 교수님 이름은 한번만 저장할 것. 중복 금지
    instructors_set = set()
    i = 0

    # 위의 링크에서 교수님의 성함을 가져와서 set로 append
    # Scrape instructors from each URL and append them to the set
    for url in urls:
        i += 1
        scrape_instructors(url, instructors_set, i)

    # Convert set to list if needed
    return sorted(instructors_set)

# 가져온 교수님 성함 리스트를 파일에 저장
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