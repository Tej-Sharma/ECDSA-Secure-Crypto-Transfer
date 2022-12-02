import { useState } from "react";
import server from "./server";

import { keccak256 }  from "ethereum-cryptography/keccak";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex, hexToBytes, utf8ToBytes } from "ethereum-cryptography/utils";

function Transfer({ address, setBalance, privateKey, publicKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();


    // Message to be sent
    const data = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient
    }

    // Hash message
    const msgHash = toHex(keccak256(utf8ToBytes(JSON.stringify(data))));

    // Create digital signature
    let signature = await secp.sign(msgHash, privateKey);
    signature = toHex(signature);

    // Send data, hashed message, signature, and public key to server
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        ...data,
        msgHash,
        signature,
        publicKey: toHex(publicKey)
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
