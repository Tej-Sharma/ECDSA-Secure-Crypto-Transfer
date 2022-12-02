## Secure Crypto Transfer via ECDSA 

Uses ECDSA digital signatures via private / public key encryption to securely transfer crypto form one account to another.

Uses Elliptic Curve Digital Signatures (ECDSA) so the server only allows transfers that have been signed for by the person who owns the associated address.

Made as part of Alchemy University's Ethereum developer bootcamp.
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 
