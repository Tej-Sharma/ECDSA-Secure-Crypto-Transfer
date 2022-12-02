const express = require("express");
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");

const app = express();
const port = 3042;
app.use(cors());
app.use(express.json());



const balances = {
  "97fbd393037d2d6bac0daf9a253e28013f3d0eb9": 100, // dan 6ab518662010cf92f2d29cd6e84fce5923fcbe8c1d27154060cea32d2a481384
  "104f593dc7cbae9dc061d2c424c2f2af0ef030b2": 50, // al a478fb2a82bbd28af192f8cf3149224567c80ee274f509622288a7b84eec1161
  "362726bf59fa7f4faeca18e436c52c516c1439bf": 75, // ben 0c548f47ae762105d898288bbc5932ff84bf9b9c701ee88e4527c1878cc96586
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // Get data from request
  const { signature, sender, recipient, amount, msgHash, publicKey } = req.body;
  // Verify digital signature
  const isSigned = secp.verify(signature, msgHash, publicKey);

  // If not verified
  if (!isSigned) {
    res.status(401).send({message: "Unauthorized transfer: digital signature could not be verified"});
    return;
  }

  // Otherwise, continue as normal
  
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
