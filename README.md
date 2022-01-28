These are the steps to run app:

open this repo in a code-editor window. In terminal write "pwd" to be sure that you're in this exact folder.
write there "npm ci" - that would install all the packages needed for app.
write "npm start" to run app. It would take some time for app to build and run.
when its done - separate browser tab would open - it is our app.
you can see two blocks: left one is filled with cards (if you lunched server) and the right one should be empty, because this part is for authorized users to save a cards. On top of the page you can see button "Enter using google" - press it and you would be redirected to google-auth page. Choose a profile you prefer and the next you see - is the same page but this time - you when you drag cards into right block - it will save it tou your profile. You can double click on a card to see a user's post. Also when you added some cards you can use sort option (but be aware that its available after page reload)