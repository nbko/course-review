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
    driver.get('https://coursefeedback.uchicago.edu/')
    wait = WebDriverWait(driver, 30)

    # Enter an ID
    checkbox = wait.until(EC.presence_of_element_located((By.ID, "input36")))
    driver.execute_script("arguments[0].click();", checkbox)
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

    # Enter the Password
    wait.until(EC.element_to_be_clickable((By.ID, "input59"))).send_keys("")
    wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

    # If the browser asks for a verficiation, press the button
    try:
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()
    except Exception:
        pass

def fetch_instructor_reviews(driver, full_name):
    wait = WebDriverWait(driver, 30)

    # Convert the given name into a recognizable format for the given website
    # An intstructor can have a middle name e.g. "Mohammed Suhail Rehman",
    name = full_name.split(" ")
    first_name = name[0]
    last_name = name[len(name) - 1]
    name_key = f"{last_name},{first_name}"

    # Click instructor name tab
    wait.until(EC.presence_of_element_located((By.ID, "nav-instructor-tab"))).click()

    #Choose the major: CMSC - Computer Science
    wait.until(EC.element_to_be_clickable((By.ID, "instructorSubject_chosen"))).click()
    xpath = f"//ul[@class='chosen-results']/li[@data-option-array-index='{50}']"
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath))).click()

    # Enter Instructor Name
    search_bar = wait.until(EC.element_to_be_clickable((By.ID, "tags")))
    search_bar.clear()
    search_bar.send_keys(name_key)
    time.sleep(1)

    # Click Search
    buttons = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.form-row.buttons button.btn.btn-primary.submit")))
    second_button = buttons[1] # Select the second button (index 1)
    second_button.click()

    # Get the page source and parse the HTML
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".search-results .row .col-md-12 .eval-results")))
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, "html.parser")

    error_msg = soup.find("div", "messages error")

    if error_msg is None:
        table = soup.find("table", id="evalSearchResults")
        # Find all rows with class even or odd
        rows = table.find_all("tr", class_=lambda x: x in ['even', 'odd'])

        for row in rows:
            # Extract info for the current pdf
            course_section = row.select("td.course > a")[0].text

            link_href = row.select("td.title > a")[0]["href"]

            title_text = row.select("td.title > a")[0].get_text().split('-')[1].strip();
            title = re.sub(r'\s*\(.*?\)\s*', '', title_text)

            instructors_text = row.select("td.instructor")[0].get_text()
            instructors = [name.strip() for name in instructors_text.split(',')]

            semester_text = row.select("td.quarter")[0].get_text()
            semester = re.sub(r'\([^)]*\)', '', semester_text).strip()

            # Navigate to the PDF link
            driver.get(link_href)

            comments_dic = {
                "course_section": course_section,
                "title": title,
                "instructors": instructors,
                "semester": semester,
                "link": link_href
            }

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


def fetch_reviews(driver):
    comments_dic = {}
    wait = WebDriverWait(driver, 30)
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, "report-block")))

    # Get the page source and parse the HTML
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, "html.parser")

    # Fetch all comments in the given pdf
    all_comments = soup.find_all("div", class_="report-block")

    for comment in all_comments:
        #print("comment", comment)
        title = comment.select(".ReportBlockTitle")

        # Store the comments only if the title of the comment block exists
        if len(title) != 0:
            title = title[0].get_text()

            # No need to fetch the info about the TA/CA or Intern
            if not ("TA" or "Intern") in title: 
                review_elems = comment.select(".CommentBlockRow.TableContainer > .block-table.CondensedTabular > tbody")
                review_lst = []

                # parsing over answers for each questions
                for elem in review_elems:
                    review_text = elem.text
                    if review_text:
                        review_parts = filter(None, review_text.split('\n\n'))
                        review_lst.extend(review_parts)

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
    if instructor_name not in existing_data:
        existing_data[instructor_name] = {}
    
    # Update the data for the given instructor
    curr_instructor_courses = existing_data[instructor_name]
    curr_id = len(curr_instructor_courses)

    curr_instructor_courses[curr_id] = comments_dic

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