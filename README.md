#Blockchain voting school Project

#CREATING METAMASK ACCOUNT 
# INSTALLING METAMASK extension
# Open the extension metamask 
# Select sepolia network and add network
# then follow the steps as in the zzPictures FOLDER
# After following all the steps COPY AND PASTE PRIVATE KEY FROM METAMASK TO .env FILE
# 
# Now below account details click view asset on exporer 
# then COPY THE ADDRESS then after copying the address go to
# https://sepoliafaucet.com/
# and paste the address the send some ETH

# After that you shld see some amount in your sepolia account 

# THEN 


#make sure you have installed node js in your windows
#Next step open the project folder using VISUAL STUDIO CODE Editor
#OPEN vs TERMINAL then type

```shell
     npm install --save-dev hardhat
```
       

#Wait for the installation of hardhat
#Then run the deploy script using the following command 

```shell
    npx hardhat run --network sepolia scripts/deploy.js
```


#Wait for the application to connect to the NETMASK ONTRACK using sepolia network
#Once the process is terminated
#Copy and paste CONTRACT ADDRESS TO THE .env file where There is Contract address variable
#paste the same in main.js file , at the top where there is contract address variable 
#Finally run the project using

```shell
        node index.js
```
then 

open link
 
 # http://localhost:3000

 # nice time follow  my github page is https://github.com/jarrdim

