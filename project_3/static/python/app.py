{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 4,
   "id": "85e410ac",
   "metadata": {},
   "outputs": [
    {
     "ename": "ModuleNotFoundError",
     "evalue": "No module named 'geocode'",
     "output_type": "error",
     "traceback": [
      "\u001b[0;31m---------------------------------------------------------------------------\u001b[0m",
      "\u001b[0;31mModuleNotFoundError\u001b[0m                       Traceback (most recent call last)",
      "\u001b[0;32m/var/folders/hz/y87trqcx5xqd75yzkbbq1h5r0000gn/T/ipykernel_75372/11537348.py\u001b[0m in \u001b[0;36m<module>\u001b[0;34m\u001b[0m\n\u001b[1;32m      4\u001b[0m \u001b[0;32mfrom\u001b[0m \u001b[0mflask\u001b[0m \u001b[0;32mimport\u001b[0m \u001b[0mjsonify\u001b[0m\u001b[0;34m,\u001b[0m \u001b[0mmake_response\u001b[0m\u001b[0;34m\u001b[0m\u001b[0;34m\u001b[0m\u001b[0m\n\u001b[1;32m      5\u001b[0m \u001b[0;34m\u001b[0m\u001b[0m\n\u001b[0;32m----> 6\u001b[0;31m \u001b[0;32mfrom\u001b[0m \u001b[0mgeocode\u001b[0m \u001b[0;32mimport\u001b[0m \u001b[0mlatlon_df\u001b[0m\u001b[0;34m\u001b[0m\u001b[0;34m\u001b[0m\u001b[0m\n\u001b[0m",
      "\u001b[0;31mModuleNotFoundError\u001b[0m: No module named 'geocode'"
     ]
    }
   ],
   "source": [
    "import requests\n",
    "import json\n",
    "import pandas as pd\n",
    "from flask import jsonify, make_response\n",
    "\n",
    "from geocode import latlon_df\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 8,
   "id": "f5df3738",
   "metadata": {},
   "outputs": [
    {
     "ename": "ModuleNotFoundError",
     "evalue": "No module named 'geocode'",
     "output_type": "error",
     "traceback": [
      "\u001b[0;31m---------------------------------------------------------------------------\u001b[0m",
      "\u001b[0;31mModuleNotFoundError\u001b[0m                       Traceback (most recent call last)",
      "\u001b[0;32m/var/folders/hz/y87trqcx5xqd75yzkbbq1h5r0000gn/T/ipykernel_75372/379195478.py\u001b[0m in \u001b[0;36m<module>\u001b[0;34m\u001b[0m\n\u001b[1;32m      2\u001b[0m \u001b[0msys\u001b[0m\u001b[0;34m.\u001b[0m\u001b[0mpath\u001b[0m\u001b[0;34m.\u001b[0m\u001b[0mappend\u001b[0m\u001b[0;34m(\u001b[0m\u001b[0;34m\"geocode.py\"\u001b[0m\u001b[0;34m)\u001b[0m  \u001b[0;31m# replace with the actual path to file1.py\u001b[0m\u001b[0;34m\u001b[0m\u001b[0;34m\u001b[0m\u001b[0m\n\u001b[1;32m      3\u001b[0m \u001b[0;34m\u001b[0m\u001b[0m\n\u001b[0;32m----> 4\u001b[0;31m \u001b[0;32mfrom\u001b[0m \u001b[0mgeocode\u001b[0m \u001b[0;32mimport\u001b[0m \u001b[0mlatlon_df\u001b[0m\u001b[0;34m\u001b[0m\u001b[0;34m\u001b[0m\u001b[0m\n\u001b[0m",
      "\u001b[0;31mModuleNotFoundError\u001b[0m: No module named 'geocode'"
     ]
    }
   ],
   "source": [
    "import sys\n",
    "sys.path.append(\"geocode.py\")  # replace with the actual path to file1.py\n",
    "\n",
    "from geocode import latlon_df"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "70ed791e",
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "intro_python_requirements_osx.yml",
   "language": "python",
   "name": "intro_python_requirements_osx.yml"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.9.13"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
