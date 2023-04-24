<h1> Covid-19 Dashboard </h1>
<h2> Anthony Costa, Jon Diaz, Sarah Kim, Aakash Nagalapura </h2>


## Data Source: [Covid Act Now API](https://apidocs.covidactnow.org/) 
## Addtional JavaScript Library: [Chart.js](https://www.chartjs.org/) 

---

<p> Our goal for this project was to create a full-stack data visualization web application that allows users to interactively explore a dataset.
We chose to pull data from the Covid Act Now API to create a SQLite database. We used the following code to execute our SQLite database.</p> 

```
conn = sqlite3.connect('covid_data2.db')
c = conn.cursor()
c.execute('DROP TABLE IF EXISTS state_data')
c = conn.cursor()
c.execute('CREATE TABLE state_data (state TEXT, population INTEGER, cases INTEGER, deaths INTEGER)')
for state in data:
    try:
        c.execute('INSERT INTO state_data (state, population, cases, deaths) VALUES (?, ?, ?, ?)',
                  (state['state'], state['population'], state['actuals']['cases'], state['actuals']['deaths']))
    except TypeError as e:
        print(f"Error inserting state {state}: {e}")
        print(f"State data: {state}")
        print(f"Actuals data: {state['actuals']}")
        continue
conn.commit()
conn.close()
```

<p> We use our newly created SQLite database to create our cases, deaths and vaccinations maps using a Flask API. From these maps we see more densely populated areas see more cases and areas with higher vaccination rates see lower mortaility rates. </p>
<img width="1440" alt="COVID map" src="https://user-images.githubusercontent.com/119609975/233462069-fec0f6bd-8ffc-4294-8293-6e2518702b2e.png">
<img width="1440" alt="Screenshot 2023-04-20 at 19 18 14" src="https://user-images.githubusercontent.com/119609975/233506389-04a64120-e347-49d7-a822-0797bafec49c.png">
<img width="1440" alt="Screenshot 2023-04-20 at 20 36 17" src="https://user-images.githubusercontent.com/119609975/233514135-29e4d272-d66a-4039-ba46-4b3f7eeac5a6.png">

<p> Our second set of visualizations for the COVID-19 data looks at it graphically. Our first page contains 4 graphics:
<ol> 
  <li>Numerical Metrics </li>
  <li> Pie Chart of Postive vs. Negative Tests </li>
  <li> Gauge of the Current Infection Rate (0-5) </li>
  <li> Bar Chart: Cases-Deaths-Fall2022 Bivalent Booster </li>
</ol>
</p>

<img width="1440" alt="NJ Dashboard" src="https://user-images.githubusercontent.com/119609975/233463855-def8454a-b4e4-4824-8546-5bb7a86c0d46.png">


<p> As expected we see negative tests far outpace positive tests, however, it's notable that the ratio of positive tests to negative tests increases as the ratio cases of cases to Fall2022 Bivalent Booster vaccines increases. </p>
<br>
<p> Our second choice of data visualization implements the chart.js library to create a multiple line chart that depicts the cases, deaths, and vaccines
administered in each of the 50 states plus two territories. Please note, for both set of visualizations, I needed to omit Washington D.C. as it 
contained null values for the vaccine data. The data selected shows totals for 2021-10-22 through 2022-01-19.</p>

![NJ Timeseries total ](https://user-images.githubusercontent.com/119609975/233466980-c3067583-374a-42b5-9ad7-ba0d0f999b9e.png)



<p> We can see from the above chart that the total number of cases and vaccines administered far out pace the number of deaths, but that doesn't tell the whole story. First, we can observe the number of cases is growing, reminiscently, of a exponential function. However, as we approach the days post holidays(Thanksgiving, Chanukkah, Christmas, New Year's Eve, etc.) the number of cases starts to rises rapidly. At the beginning of January it begins to grow even more rapidly. We can get a clearer idea of the behavior from the graph below.</p>


![NJ Timeseries Cases](https://user-images.githubusercontent.com/119609975/233470675-e5b89ecd-6730-430d-9a4b-d4f9d9c75557.png)

<p> There's nothing particularly notable about the vaccines administered data. It increases at a fairly consistent rate. We can observe this more clearly below. </p>

![NJ Timeseries Vaccines Administered ](https://user-images.githubusercontent.com/119609975/233473286-e156b1d6-b46a-4a2d-a683-80b994baddd2.png)


<p> Lastly, the deaths chart is fairly consistent in it's growth pre-New Year. The chart grows faster around 2022-01-10 and continues to get faster. I assume this comes from the holiday season and has two aspects. One, from family get-togethers and delayed reporting from the holiday season. </p>

![NJ Timeseries Deaths Data](https://user-images.githubusercontent.com/119609975/233472839-0e669748-c175-4ca8-bcf5-4792e0c8e3da.png)

<h1>Flask Links for complete.py </h1>
<ul>
    <li>/cases </li>
    <li>/deaths </li>
    <li>/vaccines </li>
    <li>/covid_multi_line </li>
    <li>/covid_charts </li>
</ul>

