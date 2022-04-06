import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { pinFileToIPFS } from "../components/pinata";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from "@mui/material/";

import { width } from "@mui/system";
import Web3 from "web3";

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
  const router = useRouter();

  return (
    <div className="container">
      <Head>
        <title>Polatine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <span className="backButton" onClick={() => router.back()}>
          ⬅
        </span>
        <h1 className="title">Create Collection</h1>

        {props.status.connected ? (
          <div className="mainContainer">
            <div className="fileInputContainer">
              {file ? (
                <img
                  className="imgPreview"
                  src={URL.createObjectURL(file)}
                  alt="img"
                  style={{ display: "block", margin: "auto" }}
                />
              ) : (
                <div className="imgPreview"></div>
              )}
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(event) => setFile(event.target.files[0])}
                />
                <Button
                  variant="contained"
                  component="span"
                  style={{ display: "block", borderRadius: "0 0 7px 7px" }}
                >
                  Upload Image
                </Button>
              </label>
            </div>

            <Stack spacing={5} style={{ width: "30%", margin: "auto" }}>
              <TextField
                id="outlined-basic"
                onChange={(event) => setName(event.target.value)}
                label="Name"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                onChange={(event) => setDesc(event.target.value)}
                label="Description"
                variant="outlined"
              />

              <TextField
                id="outlined-basic"
                onChange={(event) => {
                  setCollectionSize(event.target.value);
                }}
                label="Collection Size"
                variant="outlined"
              />

              <TextField
                id="outlined-basic"
                onChange={(event) => {
                  setMintingPrice(event.target.value);
                }}
                label="Minting Price"
                variant="outlined"
              />
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">
                  What are you down todo?
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Make feature for anybody"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Record inperson"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="I have creative control"
                  />
                </FormGroup>
              </FormControl>
            </Stack>

            <div className="card" onClick={mint}>
              <h3>Create collection</h3>
              <p>Enable your fans to mint your NFTs.</p>
            </div>
          </div>
        ) : (
          <div className="grid" onClick={props.connectWallet}>
            <div className="card">
              <h3>Connect wallet</h3>
              <p>Connect your wallet to proceed</p>
            </div>
          </div>
        )}
      </main>

      <footer></footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .backButton {
          position: absolute;
          font-size: 40pt;
          left: 100px;
          top: 40px;
          cursor: pointer;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          width: 70%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .imgPreview {
          width: 300px;
          height: 300px;
          margin: 0px !important;
        }
        div.imgPreview {
          border: grey 2px solid;
        }

        .mainContainer {
          display: flex;
          width: 100%;
          justify-content: space-between;
          flex-direction: row;
        }

        .fileInputContainer {
          min-width: 400px;
          min-height: 300px;
          // margin-top: 2rem;
          display: flex;
          flex-direction: column;
          // flex-wrap: wrap;
          // justify-content: space-between;
          align-items: center;
        }
        .textInputsContainer {
          display: flex;
          justify-content: space-evenly;
          width: 600px;
          margin: 40px;
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
          margin-bottom: 4rem;
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

        .card {
          margin: 0rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          cursor: pointer;
          height: 170px;
          max-width: 350px;
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
        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
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

        body {
          background-image: url("/background.jpg");
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
