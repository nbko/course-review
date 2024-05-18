from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json, requests, pickle

driver = webdriver.Firefox()
wait = WebDriverWait(driver, 30)
def load_cookies(driver, filename):
    with open(filename, "rb") as f:
        cookies = pickle.load(f)
        for cookie in cookies:

            driver.add_cookie(cookie)


load_cookies(driver, "cookies.pkl")

# Navigate to the desired page
driver.get('https://coursefeedback.uchicago.edu/')

wait.until(EC.element_to_be_clickable((By.ID, "nav-instructor-tab"))).click()
wait.until(EC.element_to_be_clickable((By.ID, "instructorSubject_chosen"))).click()

xpath = f"//ul[@class='chosen-results']/li[@data-option-array-index='{50}']"
wait.until(EC.element_to_be_clickable((By.XPATH, xpath))).click()

wait.until(EC.element_to_be_clickable((By.ID, "tags"))).send_keys("timothy")

xpath = f"//ul[@class='ui-autocomplete ui-menu ui-widget ui-widget-content ui-corner-all']/li[19]/a[@class='ui-corner-all']"
wait.until(EC.element_to_be_clickable((By.XPATH, xpath))).click()

buttons = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.form-row.buttons button.btn.btn-primary.submit")))
second_button = buttons[1]  # Select the second button (index 1)
second_button.click()

# html = driver.page_source
# soup = BeautifulSoup(html)
# print(soup)
table = wait.until(EC.presence_of_element_located((By.ID, "evalSearchResults")))
link_elem = table.find_element(By.CSS_SELECTOR, "tr.odd:nth-child(1) > td:nth-child(2) > a:nth-child(1)")
link_href = link_elem.get_attribute("href")
driver.get(link_href)


# if response.status_code == 200:
#     html = response.text
#     soup = BeautifulSoup(html, "html.parser")

#     instructor = soup.find(id="nav-instructor-tab")
    
#     print(instructor)


