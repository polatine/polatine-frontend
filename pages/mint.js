import Head from "next/head";
import { useState, useEffect } from "react";
import Web3 from "web3";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS
} from "../contract/config";


const validChain = "0X4";

export default function Home() {
  const [contract, setContract] = useState(0);
  const [status, setStatus] = useState({
    connected: false,
    status: "Connect wallet",
    address: "",
  });

  var web3;
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
    <div className="container">
      <Head>
        <title>Polatine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Mint</h1>

        <p className="description">The NFT Platform for Artists {status.status}</p>

        <div className="grid">
          <div className="card">
            <h3>Mint</h3>
            <p>Mint features, cameos and so on.</p>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
