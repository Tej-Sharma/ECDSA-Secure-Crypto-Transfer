import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");

  return (
    <div> 
      <h1 className="app-title">Secure Crypto Transfer</h1>
      <div className="app">
        <Wallet
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          balance={balance}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
          setPublicKey={setPublicKey}
        />
        <Transfer 
          setBalance={setBalance}
          address={address}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          publicKey={publicKey}
        />
      </div>
    </div>

  );
}

export default App;
