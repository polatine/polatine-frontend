import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";
import PageAnimation from "../components/PageAnimation";
import collection from "../testdata/collection1.json";

export default function Home(props) {
  const [mintingAmount, setMintingAmount] = useState(0);
  const [mintingPrice, setMintingPrice] = useState();
  const [artistInfo, setArtistInfo] = useState();

  const mintFromCollection = async () => {
    const price = Web3.utils.toWei(
      (collection["mint_price"] * mintingAmount).toString(),
      "ether"
    );
    if (mintingAmount == 1)
      props.contract.methods
        .claimNFT(collection["aw_address"])
        .send({ from: props.status.address, value: price });
    else if (mintingAmount > 1)
      props.contract.methods
        .claimNFT(collection["aw_address"], mintingAmount)
        .send({ from: props.status.address, value: price });
  };

  useEffect(() => {
    if (!props.contract) return;
    props.contract.methods
      .tokenURI(2)
      .call()
      .then((resp) => {
        axios.get(resp).then((json) => {
          console.log(resp);
          setArtistInfo(json.data);
        });
      });
    props.contract.methods
      .priceOf(collection["aw_address"])
      .call()
      .then((resp) => {
        setMintingPrice(Web3.utils.fromWei(resp, "ether"));
      });
  }, [props.contract]);

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

          {props.status.connected ? (
            <>
              <div className="grid">
                <img
                  width="400px"
                  style={{ borderRadius: "10px" }}
                  src={
                    artistInfo ? "https://ipfs.io/ipfs/" + artistInfo.image : ""
                  }
                />
                <div className="mintInfo">
                  <div className="mintContainer">
                    <h1 style={{ textAlign: "center" }}>
                      {"Cost " +
                        collection["mint_price"] * mintingAmount +
                        " ETH"}
                    </h1>
                    <h2>Excluding gas fees.</h2>

                    <div className="amountPicker">
                      <IconButton
                        onClick={() => {
                          if (mintingAmount - 1 >= 0)
                            setMintingAmount(mintingAmount - 1);
                        }}
                        src={RemoveIcon}
                      >
                        <RemoveIcon
                          style={{
                            color: "rgb(100,100,100,1)",
                            width: "35px",
                            height: "35px",
                            backgroundColor: "#fff5f5",
                          }}
                        />
                      </IconButton>
                      <h1>{mintingAmount}</h1>
                      <IconButton
                        onClick={() => {
                          if (
                            mintingAmount + 1 <=
                            collection["collection_size"] -
                              collection["total_minted"]
                          )
                            setMintingAmount(mintingAmount + 1);
                        }}
                      >
                        <AddIcon
                          style={{
                            color: "rgb(100,100,100,1)",
                            width: "35px",
                            height: "35px",
                            backgroundColor: "#fff5f5",
                          }}
                        />
                      </IconButton>
                    </div>

                    <Button onClick={mintFromCollection}>
                      <h3>Mint</h3>
                    </Button>
                  </div>
                  <h1>{collection["name"]}</h1>
                  {collection["collection_rights"]}
                  <br />
                  <br />
                  <b>{"Minting Price: " + collection["mint_price"] + " ETH"}</b>
                  <br />
                  <b>
                    {"Claimed: " +
                      collection["total_minted"] +
                      " / " +
                      collection["collection_size"]}{" "}
                    <br />
                    <a
                      href={
                        "https://etherscan.io/address/" +
                        collection["aw_address"]
                      }
                      target="_blank"
                    >
                      {"Subcollection address: " + collection["aw_address"]}
                    </a>
                    <br />
                    minting price {mintingPrice}
                  </b>
                </div>
              </div>

              <div className="wide">
                <div className="statsInfo box" style={{ float: "right" }}>
                  <h1>About</h1>

                  {collection["description"]}
                  <iframe
                    src="https://open.spotify.com/embed/artist/3q7HBObVc0L8jNeTe5Gofh?utm_source=generator"
                    width="100%"
                    height="180"
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  />
                </div>
              </div>

              <div className="wide">
                <div className="statsInfo box" style={{ float: "left" }}>
                  <h1>Stats</h1>
                  {"Monthly listener: " + "532423423"}
                  <br />
                  {"Monthly streams: " + "1002423423"}
                </div>
              </div>
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
          .box {
            box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
              0 6.7px 5.3px rgba(0, 0, 0, 0.048),
              0 12.5px 10px rgba(0, 0, 0, 0.06),
              0 22.3px 17.9px rgba(0, 0, 0, 0.072),
              0 41.8px 33.4px rgba(0, 0, 0, 0.086),
              0 100px 80px rgba(0, 0, 0, 0.12);
            padding: 30px;
            background: white;
            border-radius: 15px;
          }

          .wide {
            width: 100%;
          }

          .mintContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
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

          .mintInfo {
            width: 50%;
          }

          .statsInfo {
            display: flex;
            width: 40%;
            min-height: 300px;
            opacity: 0.8;
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
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
            height: 50px;
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
        `}</style>
      </div>
    </PageAnimation>
  );
}
