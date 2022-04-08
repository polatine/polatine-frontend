// import App from 'next/app'
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../contract/config";
import { useState, useEffect } from "react";
import "../public/global.css";
import { AnimatePresence } from "framer-motion";

const validChain = "0X4";
var web3;

function MyApp({ Component, pageProps, router }) {
  const [contract, setContract] = useState(0);
  const [status, setStatus] = useState({
    connected: false,
    status: "Connect wallet",
    address: "",
  });

  const connectWallet = async () => {
    web3.eth
      .requestAccounts()
      .then((accounts) => {
        setStatus({
          connected: true,
          status: "",
          address: accounts[0],
        });
      })
      .catch((e) => {
        setStatus({
          connected: false,
          status: "Connect wallet",
          address: "",
        });
      })
      .then(() => {
        if (!(validChain === window.ethereum.chainId.toUpperCase())) {
          var s = status;
          s.connected = false;
          s.status = "Switch to Rinkeby Testnet";
          setStatus(s);
          web3.currentProvider
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: validChain }],
            })
            .then((response) => {
              if (typeof response === null) {
                s.connected = true;
                s.status = "";
                setStatus(s);
              }
            });
        }
      });

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  };

  const getContract = async () => {
    const theContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    setContract(theContract);
  };

  useEffect(() => {
    web3 = new Web3(window.ethereum);
    connectWallet();
    getContract();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence exitBeforeEnter>
      <Component
        contract={contract}
        status={status}
        connectWallet={connectWallet}
        key={router.route}
      />
    </AnimatePresence>
  );
}

export default MyApp;
