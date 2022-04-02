import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { pinFileToIPFS } from "../components/pinata";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Paper from "@mui/material/Paper";


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

import collection from "../testdata/collection1.json"

import { width } from "@mui/system";

export default function Home(props) {
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [mintingAmount, setMintingAmount] = useState(0);
  const [mintingPrice, setMintingPrice] = useState();
  const Input = styled("input")({
    display: "none",
  });

  const mintFromCollection = async () => {
    console.log("MINTED")
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
       


        {props.status.connected ? (
            <div className="mainContainer">
                
                

                <div className="collectionInfo">
                    
                        
                    <img style={{ display: "block", marginTop: "10px",  borderRadius: "15px"}} src = {collection["img_url"]}/>

                    <div  style={{width:"50%", marginLeft:"5%", minWidth: "50vh"}} className=" box">
                        <div  style={{margin:"5%"}}>
                        <h1 > {"Collection Name: "+ collection["name"]}</h1>
                        <h1 > {"Minting Price: "+ collection["mint_price"] + " ETH"}</h1>
                        <h1 > {"Claimed: " + collection["total_minted"] + " / " + collection["collection_size"]} </h1>
                        <h2>{collection["collection_rights"]}</h2>
                        <a href={"https://etherscan.io/address/" + collection["sc_address"]}  target="_blank">
                            <h3>{"Smartcontract adress: " + collection["sc_address"]}</h3>
                        </a>
                        <a href={"https://etherscan.io/address/" + collection["aw_address"]}  target="_blank">
                            <h3>{"Artist wallet adress: " + collection["aw_address"]}</h3>
                        </a>
                        </div>
                    </div>
                </div>
                
                <div className="mintingInfo box">
                    
                    <h1 >{"Cost "+ collection["mint_price"] * mintingAmount + " ETH"}</h1>
                    <h2 >Excluding gas fees.</h2>

                    <div className="amountPicker">
                        <IconButton onClick={() => {if (mintingAmount - 1 >= 0) setMintingAmount(mintingAmount - 1)}} >
                            <RemoveIcon style={{color: "rgb(100,100,100,1)", width: '35px', height: '35px', backgroundColor: '#fff5f5', display: "flex", justifyContent: "center", alignItems: "center"}}/>
                        </IconButton>
                        <h1>{mintingAmount}</h1>
                        <IconButton onClick={() => {if (mintingAmount + 1 <= collection["collection_size"] - collection["total_minted"]) setMintingAmount(mintingAmount + 1)}} >
                            <AddIcon style={{color: "rgb(100,100,100,1)", width: '35px', height: '35px', backgroundColor: '#fff5f5', display: "flex", justifyContent: "center", alignItems: "center"}}/>
                        </IconButton>
                    </div>

            

                    <Button onClick={mintFromCollection}>
                        <h3>Mint</h3>
                    </Button>
                </div>

                <div className="artistInfo">
        
                    <div style={{paddingLeft:"5%",paddingRight:"5%"}}>
                        <h1>About</h1>
                        
                        <h3 > {collection["description"]}</h3> 
                        <iframe  src="https://open.spotify.com/embed/artist/3q7HBObVc0L8jNeTe5Gofh?utm_source=generator" width="100%" height="380" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"/>
                    </div>
                    
                    <div className="statsInfo">
                        <h1>Stats</h1>
                        <h3>{"Monthly listener: " + "532423423"}</h3> 
                        <h3>{"Monthly streams: " + "1002423423"}</h3> 
                    </div>
                    
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


        .box {
            box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)
            ;



            border-style: outset;
            margin: 100px auto;
            background: white;
            border-radius: 15px;
        }

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
        
        
        .statsInfo {
            display: flex;
            width: 100%;
            flex-direction: column;
          }

          
          .collectionInfo {
            display: flex;
            width: 100%;
            justify-content: space-between;
            flex-direction: row;
          }

        .amountPicker {
            display: flex;
            width: 20%;
            justify-content: space-between;
            flex-direction: row;
          }

          

          .mintingInfo {
            min-width: 50vh;
            display: flex;
            width: 30%;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            
          }

        .mainContainer {
          display: flex;
          width: 100%;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        .artistInfo {
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

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
