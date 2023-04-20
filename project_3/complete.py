from flask import Flask, request, jsonify, render_template
import sqlite3
import requests
import os

app = Flask(__name__, template_folder=os.getcwd())

# create a connection to the database
conn = sqlite3.connect('covid_data3.db')
c = conn.cursor()

# create a table to store the state data
c.execute('''CREATE TABLE IF NOT EXISTS state_data
             (state text, population integer, cases integer, deaths integer, tests integer, positive_test_rate real)''')

# load the data from the Covid Act Now API and insert it into the table
url = 'https://api.covidactnow.org/v2/states.json?apiKey=0c417904f50d4ee1ba49933bd4d12c08'
response = requests.get(url)
data = response.json()

for row in data:
    state = row['state']
    population = row['population']
    cases = row['actuals']['cases']
    deaths = row['actuals']['deaths']
    tests = row['actuals']['positiveTests']
    positive_test_rate = row['metrics']['testPositivityRatio']
    c.execute("INSERT INTO state_data VALUES (?, ?, ?, ?, ?, ?)",
              (state, population, cases, deaths, tests, positive_test_rate))

# commit the changes and close the connection to the database
conn.commit()
conn.close()

# define a route to retrieve the state data from the database
@app.route('/state_data')
def get_state_data():
    conn = sqlite3.connect('covid_data3.db')
    c = conn.cursor()
    c.execute("SELECT * FROM state_data")
    data = c.fetchall()
    conn.close()
    return jsonify(data)

# define a route to serve the home page
@app.route('/')
def home():
    return render_template('cases.html')

# define a route to serve the vaccines page
@app.route('/vaccines')
def vaccines():
    return render_template('vaccines.html')

# define a route to serve the homepage
@app.route('/homepage')
def homepage():
    return render_template('homepage.html')

# define a route to serve the deaths page
@app.route('/deaths')
def deaths():
    return render_template('deaths.html')

# define a route to serve the covid multi-line page
@app.route('/covid_multi_line')
def covid_multi_Line():
    return render_template('covid-Multi-Line.html')

# define a route to serve the covid charts page
@app.route('/covid_charts')
def covid_charts():
    return render_template('Covid-Charts.html')

if __name__ == '__main__':
    app.run() # debug mode is disabled by default in production mode 
