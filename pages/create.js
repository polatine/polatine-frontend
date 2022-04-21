import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
  Stack,
  styled,
  TextField,
} from "@mui/material/";
import Head from "next/head";
import { useState } from "react";
import Web3 from "web3";
import { pinFileToIPFS } from "../components/pinata";
import PageAnimation from "../components/PageAnimation";
import NFTCard from "../components/NFTCard";

export default function Home(props) {
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [collectionSize, setCollectionSize] = useState("");
  const [mintingPrice, setMintingPrice] = useState();
  const Input = styled("input")({
    display: "none",
  });

  const mint = async () => {
    pinFileToIPFS(file, name, desc).then((IpfsHash) => {
      props.contract.methods
        .register(
          collectionSize,
          "https://gateway.pinata.cloud/ipfs/" + IpfsHash,
          Web3.utils.toWei(mintingPrice, "ether")
        )
        .send({
          from: props.status.address,
        });
    });
  };

  return (
    <>
      <Head>
        <title>Polatine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {props.status.connected ? (
          <>
            <div className="previewView">
              <NFTCard />
            </div>
            <div className="settingsColumn">{/* <NFTCard /> */}</div>
          </>
        ) : (
          <div className="grid" onClick={props.connectWallet}>
            <div className="card">
              <h3>Connect wallet</h3>
              <p>Connect your wallet to proceed</p>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        main {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: row;
        }
        .previewView {
          min-width: 77%;
          min-height: 1vh;
          background: salmon;
          align-items: center;
          justify-content: center;
          display: flex;
        }
        .settingsColumn {
          min-width: 23%;
          min-height: 100%;
          background: grey;
        }
      `}</style>
    </>
  );
}
