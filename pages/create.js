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
import { useRouter } from "next/router";
import { useState } from "react";
import Web3 from "web3";
import { pinFileToIPFS } from "../components/pinata";
import PageAnimation from "../components/PageAnimation";

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
    <PageAnimation>
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
            position: fixed;
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
        `}</style>
      </div>
    </PageAnimation>
  );
}
