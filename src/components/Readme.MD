# To run the project:

# Go to the terminal and run the command "npm install".
# After all the packages are installed, run the command "npm run dev".
# This will start the server at localhost:5731.

###### #####

# Now in the App.jsx file it consist of all the that is compareButton and cryptopchart fullscreenbUTTONHeader.jsx

# In the Header.jsx:  the main functionnaliy of this file is to display the total value of the currency and with there country symbol  and also it will show percentaion of the currency whthewr it got profit or loos  by using the probes I got the data from the respivtive files

# App.jsx
# This file includes components like CompareButton, CryptoChart, FullscreenButton, and Header.

# Header.jsx
# The main functionality of this file is to display the total value of the currencies along with their respective country symbols. It also shows the percentage change of the currency, indicating whether it has gained or lost value. The data is passed to this component via props from other files.
# Key Features
# Currency Display: The project displays the currency values of different countries.


# API Integration:

# An example API is used to fetch currency data.
# Axios library is utilized to fetch data from the API.
# The fetched data is converted into a JSON object.
# Data Visualization:

# Recharts, a third-party library, is used to display the fetched data in the form of graphs and charts.
# The project includes a feature to compare two currencies by fetching symbols from a similar API.
# Fullscreen Mode:

# A fullscreen mode feature is added, allowing users to view charts in fullscreen with a black background.
# Time Frame Comparison:

# Users can compare currency values over different time frames (e.g., 1 week equals 7 days).
# User Interface Enhancements:

# Interactive buttons such as CompareButton and FullscreenButton enhance the user experience.
# The application is designed to be responsive and user-friendly.
# Real-time Updates: The application fetches real-time data, ensuring the currency values and comparisons are up-to-date.