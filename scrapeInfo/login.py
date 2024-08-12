'''
수업 후기 웹사이트에 들어가려면 duo mobile을 통한 이중 로그인이 필요 (remember me 눌러도
가끔 필요).
개인정보는 가급적 빼는 편이지만 코드를 실행할때는 password를 직접 넣어서 로그인
(좋은 방법은 아닌 것 같긴 함)
수업 후기 웹사이트에 들어가서 getProfs.py에서 크롤링한 교수님 성함을 넣어서 
교수님 수업 후기를 다 긁어오는 작업을 수행

교수님 성함을 시스템이 알아볼 수 있는 방식으로 넣지 않고, 그게 자동완성으로 변환될 때 까지 기다리지 않고 바로 search 버튼을 누르면 아무 정보도 나타나지 않음. 

'''

import json
import pickle
import requests
import time
import re
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

def setup_driver():
    # Set up a Custom Profile
    # 크롬 프로필 셋업
    options = webdriver.ChromeOptions()
    options.add_argument("--user-data-dir=/Users/naeunko/Library/Application Support/Google/Chrom/User Data")
    options.add_argument("--profile-directory=Profile 12")
    options.add_experimental_option('detach', True)
    options.add_argument('--no-sandbox')
    options.add_argument("--single-process")

    service = Service()
    driver = webdriver.Chrome(service=service, options=options)
    return driver

def navigate_to_site(driver):
    # Navigate to the URL
    # 수업 후기 웹사이트로 이동
    driver.get('https://coursefeedback.uchicago.edu/')
    wait = WebDriverWait(driver, 30)

    # Enter an ID
    # 위 사이트에 들어가려면 로그인 필요함
    checkbox = wait.until(EC.presence_of_element_located((By.ID, "input36")))
    driver.execute_script("arguments[0].click();", checkbox)
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

    # 개인정보라 일단 지음. 원래는 send_keys 안에 비번 넣어줌
    # Enter the Password
    wait.until(EC.element_to_be_clickable((By.ID, "input59"))).send_keys("")
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

    # 만약 duo mobile로 이중 인증이 필요햐하고 하면 확인 버튼 누르기
    # If the browser asks for a verficiation, press the button
    try:
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()
    except Exception:
        pass

def fetch_instructor_reviews(driver, full_name):
    wait = WebDriverWait(driver, 30)

    # getProf.py에서 넣은 교수님 성함을 수업 후기 웹사이트가 인식할 수 있는 이름으로 바꿈
    # e.g. Aaron Elmore면 Elmore,Aaron으로 바꿈. 교수님이 middle name이 있으실 수 있음. 그러면 미들네임 제거
    # Convert the given name into a recognizable format for the given website
    # An intstructor can have a middle name e.g. "Mohammed Suhail Rehman",
    name = full_name.split(" ")
    first_name = name[0]
    last_name = name[len(name) - 1]
    name_key = f"{last_name},{first_name}"

    # Click instructor name tab
    # 교수님 성함 탭 누르기 (선택지가 있음 e.g: academic term, instructor name, catalog number)
    wait.until(EC.presence_of_element_located((By.ID, "nav-instructor-tab"))).click()

    # 전공은 컴싸를 선택
    #Choose the major: CMSC - Computer Science
    wait.until(EC.element_to_be_clickable((By.ID, "instructorSubject_chosen"))).click()
    xpath = f"//ul[@class='chosen-results']/li[@data-option-array-index='{50}']"
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath))).click()

    # 교수님 성함 입력후 자동 완성으로 뜨게 잠깐 기다리기. 자동 완성이 뜨지 않고 바로 넘어가면 
    # 시스템이 인식을 못함. 
    search_bar = wait.until(EC.element_to_be_clickable((By.ID, "tags")))
    search_bar.clear()
    search_bar.send_keys(name_key)
    time.sleep(1)

    # Click Search
    buttons = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.form-row.buttons button.btn.btn-primary.submit")))
    second_button = buttons[1] # Select the second button (index 1)
    second_button.click()

    # Get the page source and parse the HTML
    # 해당 교수님에 대한 수업 후기가 학기별, 수업별로 리스트 형식으로 쫙 뜸
    # 하나의 row가 수업 후기를 보여주는 pdf의 링크이기 때문에 링크 타고 들어가서 pdf에서 수업
    # 후기를 가져와야 함
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".search-results .row .col-md-12 .eval-results")))
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, "html.parser")

    error_msg = soup.find("div", "messages error")

    if error_msg is None:
        table = soup.find("table", id="evalSearchResults")
        # Find all rows with class even or odd
        # 모든 row를 찾기
        rows = table.find_all("tr", class_=lambda x: x in ['even', 'odd'])

        for row in rows:
            # Extract info for the current pdf
            # 리스트에 있는 링크 하나당 정보 긁어오기 e.g. 수업 이름, 수업 번호, 교수님(들) 성함, 학기, 수업 후기 pdf 링크
            course_section = row.select("td.course > a")[0].text

            link_href = row.select("td.title > a")[0]["href"]

            title_text = row.select("td.title > a")[0].get_text().split('-')[1].strip();
            title = re.sub(r'\s*\(.*?\)\s*', '', title_text)

            instructors_text = row.select("td.instructor")[0].get_text()
            instructors = [name.strip() for name in instructors_text.split(',')]

            semester_text = row.select("td.quarter")[0].get_text()
            semester = re.sub(r'\([^)]*\)', '', semester_text).strip()

            # pdf 링크로 이동
            # Navigate to the PDF link
            driver.get(link_href)

            comments_dic = {
                "course_section": course_section,
                "title": title,
                "instructors": instructors,
                "semester": semester,
                "link": link_href
            }

            # pdf에서 코멘트를 긁어와서 새로 만들은 dictionary에 저장
            # Save the info for the current course
            comments_dic["comments"] = fetch_reviews(driver)
            if len(comments_dic["comments"]) != 0:
                save_comments(comments_dic, full_name)

            # Navigate back to the course list to parse through the next course review
            driver.back()
    else:
        error_text = error_msg.find("p").get_text()
        # print("error-msg:", error_text)
        comments_dic = {"error": error_text}
        save_comments(comments_dic, full_name)

# pdf에 있는 코멘트 긁어오는 작업해주는 함수
def fetch_reviews(driver):
    comments_dic = {}
    wait = WebDriverWait(driver, 30)
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, "report-block")))

    # Get the page source and parse the HTML
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, "html.parser")

    # report-block 안에 있는 후기들을 다 긁어옴
    # Fetch all comments in the given pdf
    all_comments = soup.find_all("div", class_="report-block")

    for comment in all_comments:
        #print("comment", comment)
        title = comment.select(".ReportBlockTitle")

        # 타이틀이 없다는 것은 후기 말고 그래프밖에 없다는 뜻이기 때문에 타이틀 없을때는 패스
        # Store the comments only if the title of the comment block exists
        if len(title) != 0:
            title = title[0].get_text()

            # No need to fetch the info about the TA/CA or Intern
            # TA/Intern 정보 후기 필요 없음
            if not ("TA" or "Intern") in title: 
                review_elems = comment.select(".CommentBlockRow.TableContainer > .block-table.CondensedTabular > tbody")
                review_lst = []

                # 하나의 pdf에 질문이 여러개 있을 수 있기 때문에 그에 대한 답변들 가져오기
                # parsing over answers for each questions
                for elem in review_elems:
                    review_text = elem.text
                    if review_text:
                        review_parts = filter(None, review_text.split('\n\n'))
                        review_lst.extend(review_parts)

                # 만약 질문에 대한 답이 없다면 후기가 없다는 뜻이기 때문에 저장할 필요 없음
                # No need to save the review if the question has no reviews
                if len(review_lst) != 0:
                    if title in comments_dic:
                        comments_dic[title].extend(review_lst)
                    else:
                        comments_dic[title] = review_lst
            else:
                continue
    return comments_dic

def save_comments(comments_dic, instructor_name):
    try:
        with open('course_review_data.json', 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        existing_data = {}

    # Create a new dictionary for a new instructor
    # dictionary에 교수님 성함이 없다면 새로 추가
    if instructor_name not in existing_data:
        existing_data[instructor_name] = {}
    
    # Update the data for the given instructor
    # 긁어온 정보를 교수님 성함이랑 매핑해서 저장
    curr_instructor_courses = existing_data[instructor_name]
    curr_id = len(curr_instructor_courses)

    curr_instructor_courses[curr_id] = comments_dic

    # course_review_data.json파일을 만들어서 json 형식으로 업데이트
    with open('course_review_data.json', 'w', encoding='utf-8') as f:
        json.dump(existing_data, f, ensure_ascii=False, indent=4)

def main():
    try:
        json_file_path = "instructors_list.json"
        driver = setup_driver()
        navigate_to_site(driver)

        with open(json_file_path, "r", encoding="utf-8") as file:
            instructors = json.load(file)

            for instructor in instructors:
                print(instructor)
                fetch_instructor_reviews(driver, instructor)

    except FileNotFoundError as e:
        print(f"File not found: {e}")
        driver.close()
    
    finally:
        driver.close()

if __name__ == "__main__":
    main()