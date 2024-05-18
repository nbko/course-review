from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json, requests, pickle

def save_cookies(driver, filename):
    cookies = driver.get_cookies()
    with open(filename, "wb") as f:
        pickle.dump(cookies, f)

# Function to load cookies
def load_cookies(driver, filename):
    with open(filename, "rb") as f:
        cookies = pickle.load(f)
        for cookie in cookies:
            driver.add_cookie(cookie)       

driver = webdriver.Firefox()
wait = WebDriverWait(driver, 30)
driver.get('https://uchicago.okta.com')

wait.until(EC.element_to_be_clickable((By.ID, "input28"))).send_keys("")

checkbox = wait.until(EC.presence_of_element_located((By.ID, "input36")))
driver.execute_script("arguments[0].click();", checkbox)

wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

wait.until(EC.element_to_be_clickable((By.ID, "input59"))).send_keys("")
wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()
wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "button-primary"))).click()

wait.until(EC.element_to_be_clickable((By.ID, "trust-browser-button"))).click()

# storing the cookies
save_cookies(driver, "cookies.pkl")


