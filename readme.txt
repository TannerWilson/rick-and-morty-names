This project is a simple name data base and search engine for the Rick and Morty universe. This allows you to search for names that may have appeared in the show, search for names that are alike and insert your own names incase there are some that were missed. All names were found and seeded from https://rickandmortyapi.com/.

This is a node app, running an express web server backed by a Mongo Atlas cloud database. To run the app locally, download or fork the repository and run 
a few commands after you have node installed on your computer:

  cd to the project folder
  npm install
  node server.js {portNumber}  (The port defaults to 8080 if not specified)

When the server is running, open a browser and navigate to localhost:{portNumber}. There you will see a very simple html page with 3 lines of input. The functionality of each is defined below:

  - Search Name: This will search the database for that exact name and report wether it was found or not. Keep in mind that this is case sensitive and will exact match the strings in the database.

  - Get Alike Names: This will take the name inserted and the "closeness value" and it will compare the input name against all the names in the database and will report back which names are within the closeness value edits away from the original. For instance if you input the name "Smith" "5", it will return all the names that are within 5 edits away from being the string "Smith". This includes strings like "Smuth" or "Smithyson" but will also include strings that are of length 5 as any string of length 5 can be changed to "Smith" in 5 edits. This makes for some results that one might not expect because the two strings seem very different, like "Smith" and "Frank" are 5 edits apart. The algorithm used to compute this difference is called the "Levenshtein Distance"

  - Insert Name: this allows you to insert any name you want into the database. 

Thanks for taking an interest in this project!
