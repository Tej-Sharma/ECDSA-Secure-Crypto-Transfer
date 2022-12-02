import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, setPublicKey }) {
  async function onChange(evt) {
    // Take in private key
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    // Derive public key from private key
    const publicKey = secp.getPublicKey(privateKey);
    setPublicKey(publicKey);

    // Convert to eth address
    const address = toHex(keccak256(publicKey.slice(1)).slice(-20));
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>

      <label>
        Address
        <div className="balance">Address: {address}</div>      
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
