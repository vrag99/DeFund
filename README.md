
# DeFund

Defund creates a borderless, community-driven financial ecosystem. A seeker can list their project and can ask for funding from the investors. A voting system is there for checking the legitimacy of the funding.

## How it is built?

The project onsists of several paerts:
* registration of users through sismo
* project addition by seeker 
* project funding by investor 
* polling by investors to determine whether to continue funding or not 


## Architecture 



![WhatsApp Image 2023-10-22 at 9 13 21 PM](https://github.com/vrag99/DeFund/assets/121158631/0c705bed-0ea5-4adf-b486-4bf26e9b36f0)



## Application Flow 

DeFund leverages Sismo to verify the credentials of the user. When the users login to the app,  his wallet is connected to MetaMask automatically with the same account address that he verified with Sismo. 

When a seeker adds a project,  asking for funding for his project in ApeCoin, an event is emitted which is listened by our web app. We leverage The Graph to show the added projects on the home page of the app. 

When an investor funds a project with a percentage of the ApeCoin demanded , the funded projects are shown on the UI which is again leveraged by The Graph. The same process is repeated when an investor funds an already funded project after the consensus(votes of other investors) gives a positive response

Contract address on sepolia: 0x17Fe9424EEF56Fa2A9Fd47615B0645B987Be4cBa
