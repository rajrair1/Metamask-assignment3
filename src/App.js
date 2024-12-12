import React, { useState } from "react";
import { ethers } from "ethers";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const abi = [
  {
    "inputs": [{ "internalType": "uint256", "name": "ticketNumber", "type": "uint256" }],
    "name": "purchaseTicket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
    "name": "getTicketNumber",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "returnTicket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
];

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [notification, setNotification] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      setNotification("Please install MetaMask!");
      return;
    }
    const _provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = _provider.getSigner();
    const _contract = new ethers.Contract(contractAddress, abi, signer);
    setProvider(_provider);
    setContract(_contract);
    setNotification("Wallet connected!");
  };

  const handlePurchase = async () => {
    const ticketNumber = document.getElementById("ticketNumber").value;
    try {
      const tx = await contract.purchaseTicket(ticketNumber);
      await tx.wait();
      setNotification("Ticket purchased successfully!");
    } catch (err) {
      setNotification(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h1>Ticket Sale</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>
        <h2>Purchase Ticket</h2>
        <input id="ticketNumber" type="text" placeholder="Enter Ticket Number" />
        <button onClick={handlePurchase}>Purchase</button>
      </div>
      <p>{notification}</p>
    </div>
  );
}

export default App;
