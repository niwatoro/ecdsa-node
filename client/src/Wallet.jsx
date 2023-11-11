import server from "./server";
import {secp256k1} from "ethereum-cryptography/secp256k1"
import {toHex} from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    const address = privateKey && toHex(secp256k1.getPublicKey(privateKey));
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
        <input placeholder="Type a private key, for example: 0x1" onChange={onChange}></input>
      </label>
      Address: {address}

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
