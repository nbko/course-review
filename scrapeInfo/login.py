import json
import pickle
import requests
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

def setup_driver():
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
    driver.get('https://coursefeedback.uchicago.edu/')
    wait = WebDriverWait(driver, 30)

    # id
    checkbox = wait.until(EC.presence_of_element_located((By.ID, "input36")))
    driver.execute_script("arguments[0].click();", checkbox)
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

    # password
    wait.until(EC.element_to_be_clickable((By.ID, "input59"))).send_keys("")
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

    #verify button
    try:
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()
    except Exception:
        pass

def fetch_pdf(driver, full_name):
    wait = WebDriverWait(driver, 30)
    first_name, last_name = full_name.split(" ")
    name_key = f"{last_name},{first_name}"

    # click instructor name tab
    wait.until(EC.element_to_be_clickable((By.ID, "nav-instructor-tab"))).click()

    #choose the subject: CMSC - Computer Science
    wait.until(EC.element_to_be_clickable((By.ID, "instructorSubject_chosen"))).click()
    xpath = f"//ul[@class='chosen-results']/li[@data-option-array-index='{50}']"
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath))).click()

    # Send in Instructor Name
    search_bar = wait.until(EC.element_to_be_clickable((By.ID, "tags")))
    search_bar.clear()
    search_bar.send_keys(name_key)
    time.sleep(1)

    # Click Search
    buttons = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.form-row.buttons button.btn.btn-primary.submit")))
    second_button = buttons[1]  # Select the second button (index 1)
    second_button.click()

    try:
        # Fetch PDFs
        table = wait.until(EC.presence_of_element_located((By.ID, "evalSearchResults")))
        rows = list(table.find_elements(By.CSS_SELECTOR, "tr.odd, tr.even"))
        
        for row in rows:
            WebDriverWait(driver, 30)
            print(row.text)
            course_section = row.find_element(By.CSS_SELECTOR, "td.course > a").text
            link_elem = row.find_element(By.CSS_SELECTOR, "td.title > a")
            link_href = link_elem.get_attribute("href")
            instructors = row.find_element(By.CSS_SELECTOR, "td.instructor").text
            quarter = row.find_element(By.CSS_SELECTOR, "td.quarter").text

            driver.get(link_href)

            # Extract info for the current pdf
            comments_dic = {
                "course-section": course_section,
                "instructors": instructors,
                "quarter": quarter
            }
            comments_dic["comments"] = extract_comments(driver)
            save_comments(comments_dic, full_name)
            driver.back()
    except Exception:
        error_msg = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".messages.error span")))
        error_text = error_msg.text
        comments_dic = {"error": error_text}
        save_comments(comments_dic, full_name)


def extract_comments(driver):
    comments_dic = {}
    wait = WebDriverWait(driver, 30)
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, "report-block")))
    all_comments = driver.find_elements(By.CLASS_NAME, "report-block")

    for comment in all_comments:
        try:
            title = comment.find_element(By.CLASS_NAME, "ReportBlockTitle").text
            review_elems = comment.find_elements(By.CSS_SELECTOR, ".CommentBlockRow.TableContainer > .block-table.CondensedTabular > tbody")
            review_lst = []
            for elem in review_elems:
                review_text = elem.text
                if review_text:
                    review_parts = review_text.split('\n')
                    review_lst.extend(review_parts)
            if len(review_lst) != 0:
                comments_dic[title] = review_lst
        except Exception as e:
            continue
    return comments_dic

def save_comments(comments_dic, instructor_name):
    try:
        with open('new_data.json', 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        existing_data = {}

    # Ensure the instructor exists in the data
    if instructor_name not in existing_data:
        existing_data[instructor_name] = {}
    
    # Access the dictionary for the given instructor
    curr_instructor_courses = existing_data[instructor_name]
    curr_id = len(curr_instructor_courses)

    curr_instructor_courses[curr_id] = comments_dic

    with open('new_data.json', 'w', encoding='utf-8') as f:
        json.dump(existing_data, f, ensure_ascii=False, indent=4)

def main():
    try:
        json_file_path = "instructors_list.json"
        driver = setup_driver()
        navigate_to_site(driver)

        with open(json_file_path, "r", encoding="utf-8") as file:
            instructors = json.load(file)
            print(instructors)

            for instructor in instructors:
                fetch_pdf(driver, instructor)

    except FileNotFoundError as e:
        print(f"File not found: {e}")
        driver.close()

if __name__ == "__main__":
    main()