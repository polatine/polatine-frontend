import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { pinFileToIPFS } from "../components/pinata";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {Select, MenuItem, InputLabel, FormControl,FormGroup, FormControlLabel,FormLabel, Checkbox} from "@mui/material/";

import { width } from "@mui/system";

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
        .mintNFT(
          props.status.address,
          "https://gateway.pinata.cloud/ipfs/" + IpfsHash
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
        <h1 className="title">Mint</h1>
        


        {props.status.connected ? (

              <div>
                <Stack spacing={2}>
                
              <div className="fileInputContainer">
                
                {file ? (
                  <div style={{display: "inline-block", width: "50%", margin: "auto"}}>
                  <img
                    className="imgPreview"
                    src={URL.createObjectURL(file)}
                    alt="img"
                    style={{display: "block",  margin: "auto"}}
                  />

                  <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                  <Button variant="contained" component="span" style={{display: "block"}}>
                    Reupload Image
                  </Button>
                  
                </label>
                  </div>
                ) : (
                  <div style={{display: "inline-block", width: "50%", margin: "auto"}}>
                    
                  <img
                    className="imgDefulat"
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHNxQ-Y9BMHlpIa0Tmmu1igY6fthBX3P3z2w&usqp=CAU"}
                    alt="img"
                    style={{display: "block",  margin: "auto"}}
                  />
                  <span style={{display: "block",  margin: "auto"}}  > Default image, kanske något vi kan generate:a, kanske återvända min kod för 3d flaggor, kanske overkill men ett sätt att standout</span>
                  <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                  <Button variant="contained" component="span" style={{display: "block", width:"50%", margin: "auto" }}>
                    Upload your own Image
                  </Button>
                  
                </label>
                    </div>
                )}
              </div>
              
              <Stack spacing={5} style={{width: "50%", margin: "auto"}}>
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
                

                <FormControl fullWidth>
                    <InputLabel htmlFor="demo-simple-select-label">Collection Size</InputLabel>
                    <Select
                      value={collectionSize}
                      onChange={(event) => setCollectionSize(event.target.value)}
                      label="Collection Size"
                      labelId="demo-simple-select-label"
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                  id="outlined-basic"
                  onChange={(event) => {setMintingPrice(event.target.value)}}
                  label="Minting Price"
                  variant="outlined"
                />
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                  <FormLabel component="legend">What are you down todo?</FormLabel>
                <FormGroup>
                  <FormControlLabel control={<Checkbox  />} label="Make feature for anybody" />
                  <FormControlLabel control={<Checkbox />} label="Record inperson" />
                  <FormControlLabel control={<Checkbox />} label="I have creative control" />
                </FormGroup>
                </FormControl>
              </Stack>
             
              <div className="grid" onClick={mint}>
            <div className="card">
              <h3>Mint</h3>
              <p>Mint features, cameos and so on.</p>
            </div>
          </div>
          </Stack>
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
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .imgPreview {
          width: 300px;
          height: 300px;
        }
        .fileInputContainer {
          min-width: 600px;
          min-height: 300px;
          margin-top: 2rem;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
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

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          cursor: pointer;
          min-height: 170px;
          min-width: 350px;
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

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
