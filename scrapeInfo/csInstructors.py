'''
Using Beautiful Soup to scrape instructors names from the course info website
for the Department of Computer Science at the University of Chicago for the 
academic year 2024 - 2025
'''
from bs4 import BeautifulSoup
import requests
import lxml 
import re

with open("scrapeInfo/index.html") as fp:
    soup = BeautifulSoup(fp, 'html.parser')

# Initialize a set to store unique instructor names
instructors_set = set()

# Find all rows with class even or odd
rows = soup.find_all('tr', class_=lambda x: x in ['even', 'odd'])

# Extract instructor names from each row
for row in rows:
    instructor_cell = row.find_all('td')[2]
    instructor_name_tag = instructor_cell.find_all('a')
    for name in instructor_name_tag:
            instructor_name = re.sub(r'\s+', ' ', name.text.strip().replace('\n', ' '))
            instructors_set.add(instructor_name)

# Convert set to list if needed
instructors = sorted(instructors_set)
print(instructors, len(instructors))

# ['Aaron Elmore', 'Aaron Potechin', 'Adam Shaw', 'Alex Kale', 'Alexander Razborov', 'Aloni Cohen', 'Anand Bhattad', 'Andrew Chien', 'Anne Rogers', 'Avrim Blum', 'Ben Zhao', 'Blase Ur', 'Bo Li', 'Borja Sotomayor', 'Chenhao Tan', 'David Cash', 'David McAllester', 'Denis Hirschfeldt', 'Diana Franklin', 'Gordon Kindlmann', 'Grant Ho', 'Haifeng Xu', 'Hannah Morgan', 'Haryadi Gunawi', 'Heather Zheng', 'Ian Foster', 'Janos Simon', 'Jinbo Xu', 'John Reppy', 'Julia Chuzhoy', 'Junchen Jiang', 'Ken Nakagaki', 'Ketan Mulmuley', 'Laszlo Babai', 'Lorenzo Orecchia', 'Madhur Tulsiani', 'Marshini Chetty', 'Matthew Wachs', 'Matthew Walter', 'Michael Maire', 'Mohammed Suhail Rehman', 'Nathan Srebro', 'Nick Feamster', 'Pedro Lopes', 'Rana Hanocka', 'Raul Castro Fernandez', 'Ravi Chugh', 'Rebecca Willett', 'Rick Stevens', 'Risi Kondor', 'Robert Grossman', 'Robert Rand', 'Sanjay Krishnan', 'Sarah Sebo', 'Stuart Kurtz', 'Timothy Ng', 'William Fefferman', 'William Hoza', 'Yali Amit', 'Yanjing Li', 'Yury Makarychev', 'Yuxin Chen', 'Zhiyuan Li']
