from selenium import webdriver

chrome = webdriver.Chrome(executable_path='./driver/chromedriver.exe')
chrome.get("https://www.nttdocomo.co.jp/mydocomo/")

chrome.find_element_by_partial_link_text('ログインする').click()
chrome.find_element_by_id('Di_Uid').send_keys("jam14_01@icloud.com")
chrome.find_element_by_class_name('nextaction').click()
