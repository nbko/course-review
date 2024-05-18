from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json, requests, pickle
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service


# Set up Chrome options
options = webdriver.ChromeOptions() 
# options.add_experimental_option("detach", True)
options.add_argument("--user-data-dir=/Users/naeunko/Library/Application Support/Google/Chrom/User Data")
options.add_argument("--profile-directory=Profile 12")
options.add_experimental_option('detach', True)
options.add_argument('--no-sandbox')
options.add_argument("--single-process")


# wd = webdriver.Chrome(options=options)

service = Service()
driver = webdriver.Chrome(service=service,options=options)
wait = WebDriverWait(driver, 30)

# Open the URL
driver.get('https://coursefeedback.uchicago.edu/')

# wait.until(EC.element_to_be_clickable((By.ID, "input28"))).send_keys("nbko")

checkbox = wait.until(EC.presence_of_element_located((By.ID, "input36")))
driver.execute_script("arguments[0].click();", checkbox)

wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

wait.until(EC.element_to_be_clickable((By.ID, "input59"))).send_keys("eo3dlsxjsgkqrur!")
wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

# click on the instructor tab
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