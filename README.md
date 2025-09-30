# Welcome to my Case Manager project!

## Introduction
A very simple program to manage court cases

## Running the program
To run the program, you will need to start both the backend and frontend (this will be replaced with a 
singular bash script shortly)

You must ensure that all the correct Python and React dependencies are installed!

### Backend
Make sure you have all the requirments installed (from requirements.txt). I would recommend using PIP maybe consider using a virtual environment to prevent clashes with other python projects

From the root directory follow these commands: <br>
cd .\backend\ <br>
python backend/main.py

### Frontend
From the root directory run: <br>
npm --prefix ./frontend start

## Running unit tests
To do this on windows (at least) you will have to be in administrator mode. For linux or Mac you can just sudo it. Make sure you are using your python virtual environement!

From the root directory run: <br>
python -m pytest