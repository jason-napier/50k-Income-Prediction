# Predicting Yearly Income, Using a Neural Network and a Webpage

# Overview

In this project, our group sought to train a neural network to predict the income of users, based upon user inputs on a webpage. 
The neural network's predictions were based on a variety of economic, educational, personal, and demographic data. 
To allow users to interact with the neural network, input their data, and receive its predictions, we developed an interactive web application. 
Using Flask to access inputs to the webpage, the neural network is given the data, makes its predictions, and returns them to the webpage.

# Instructions
Begin by running app.py on your computer. 
The webpage can be opened through the HTML file in this repository. 
Clone the HTML file to your local machine, then select it to open in your web browser. 
Input your data in the webpage and click submit to send your data to the neural network. 
Users may experience better results by utilizing a Live Server extension on their coding environment. 
Jupyter Notebooks containing our neural network creation, optimization, and testing process can simply be run in your local coding environment or in Google Colab.

Ensure that the following dependencies and libraries have been imported to your computer:


  from flask import Flask, request, jsonify
  
  from flask_cors import CORS
  
  import pandas as pd
  
  import numpy as np
  
  import pickle
  
  from sklearn.preprocessing import StandardScaler,OneHotEncoder
  
  import findspark
  
  from sklearn.model_selection import train_test_split
  
  import matplotlib.pyplot as plt
  
  import tensorflow as tf
  
  from pyspark.sql import Row
  
  import matplotlib.pyplot as plt


# Features

To begin, we tested a number of neural network models, including Logistic Regression, Support Vector Machine, Decision Trees, Random Forest, K Neighbors, Neural Network. After comparing the classification reports and accuracy score for each, we found that neural networks offered the most robust and consistent results. Our final neural network model included three hidden layers, respectively containing 25, 12, and 6 nodes.

Data was cleaned using PySpark and SparkSQL queries. Using these queries, we searched for columns and rows containing question marks and removed them from the neural network training data.

After developing the model and cleaning the data, the neural network was trained and saved as a .PKL file, available in this repository as model.pkl.

To develop the front-end of our webpage, we used JavaScript and HTML. The JavaScript code iterates through the .CSV file to create a dropdown for each necessary category and the possible options for each. We elected to use a text-input box, so users could accurately represent their age. User inputs are recorded as a JSON object, which is accessed by a running Flask application. 

On the back-end, the Flask application has the pickled neural network model loaded into it. After receiving the JSON object from the webpage, it standardizes and encodes the data, then concatonates it to the original dataset used to train the neural network model. The model is then tasked to return its prediction, which is sent from the Flask application to the webpage. 

The webpage receives the prediction from the neural network file, then uses an 'if' statement to determine whether the user will predictably make above or below fifty thousand dollars per year.

# Acknowledgements

AmirHossein Mirzaei, "American Citizens' Annual Income", Kaggle, https://www.kaggle.com/datasets/amirhosseinmirzaie/americancitizenincome.

# Authors

Daniel Adamson

Em Greene

Geoffrey Hoehn

Jason Napier
