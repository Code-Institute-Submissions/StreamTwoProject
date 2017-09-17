## Overview

### Application description:

This Stream Two Project is a Flask, D3, DC and Crossfilter based application used to construct a Dashboard 
containing multiple interactive graphs.  

### Purpose and Construction:

The intended purpose of this project is to construct a web based application that utilises multiple technologies that
displays multiple interactive graphs which call upon information supplied via database which respond dynamically when 
certain time frames or components are selected.  The dashboard contains 7 main graphical components comprised of four 
graphs, a digital display, a terminal map and a short overview of the displayed data.  I chose to use a csv. database that
contained information regarding the passenger traffic through Los Angeles airport.  The intended purpose was to highlight 
the current growth of passenger traffic and the utilisation of various terminals to then promote possible expansion or 
additions of terminals and runways.  

The open source dashboard framework that I utilised provided me with a base structure for the index.html as well as the
starting point for css styling.  I subsequently modified the original code for my intended purpose, deleting various
sub menus,  addition of the graph elements to the body as well as two modals to contain the map and the overview.  

### Deployment and Testing:

The testing that I carried out on my application was mainly associated to the responsiveness.  Whilst I used the Google
Chrome Developer tool I also used a website [CodeBeautify](https://codebeautify.org/responsive-website-tester#allView) to inspect responsiveness. 
Once the construction of the application was complete I then deployed it using the cloud based hosting platform Heroku.   


### Included Technologies:
- **Flask**
    - Flask was used to control the bases of the web application including rendering the template html page as well as serving information 
    stored in a mongoDB database. 
- **DC**
    - DC was the first of three javascript libraries utilised to chart the information served from the data set. 
- **D3**
    - This javascript library was implemented to help create dynamic and interactive data visualisations.  
- **Crossfilter**
    - This javascript library was used to handle the slicing and dicing of the various graphs to allow fast grouping and filtering.  
- **MongoDB**   
    - MongoDB was used to store the data set using the document orientated model to allow fast querying and serving of data.  

 
