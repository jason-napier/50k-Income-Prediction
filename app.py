from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler,OneHotEncoder


app = Flask(__name__)
CORS(app)

# Load the trained machine learning model (pkl file)
# Replace 'path_to_your_model.pkl' with the actual path to your model
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON data from the request body
        json_data = request.get_json()

        # Log the received data to the console
        print('Received data:', json_data)

        # Parse the JSON data and extract the form data
        formData = json_data.get('formData', {})

       #convert json_data from json format into a pandas dataframe
        data = pd.DataFrame.from_dict(formData, orient='index').T
        print(data)
        #import income.csv as panda dataframe
        df = pd.read_csv('income.csv')

        #drop income
        df = df.drop(['income'], axis=1)
        #append data to income.csv
        df = pd.concat([df, data], ignore_index=True)
        print("you reached line 35 yay!")
        
        df_num = df[["age", "hours_per_week"]]
        df_obj = df.drop(["age", "hours_per_week"], axis = 1)
        df_obj = df_obj.astype(str)
        # Create a OneHotEncoder instance
        enc = OneHotEncoder(sparse_output=False)

        # Fit and transform the OneHotEncoder using the categorical variable list
        encode_df = pd.DataFrame(enc.fit_transform(df_obj))

        # Add the encoded variable names to the dataframe
        encode_df.columns = enc.get_feature_names_out()

        # Merge one-hot encoded features and drop the originals
        df = df_num.merge(encode_df,left_index=True, right_index=True)
        X= df
        # Create a StandardScaler instances
        scaler = StandardScaler()

        # Fit the StandardScaler
        X_scaler = scaler.fit(X)

        # Scale the data
        X_scaled = X_scaler.transform(X)
    
        newX = X_scaled[-1].reshape(1, -1)
        print(newX)
        print('newX is above')
     
      
       
        # Make predictions using the model
        prediction = model.predict(newX)

       
        # Return the prediction as a JSON response
        return jsonify({'result': prediction.tolist()})

    except Exception as e:
        # Return an error response if something went wrong
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5501)
    