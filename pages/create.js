import { Description } from "@mui/icons-material";
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
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import collection from "../testdata/collection1.json";


export default function Home(props) {
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [collectionSize, setCollectionSize] = useState("");
  const [mintingPrice, setMintingPrice] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const maxPages = 11;
  

  const [mintingAmount, setMintingAmount] = useState(0);
  const [artistInfo, setArtistInfo] = useState();
  const Input = styled("input")({
    display: "none",
  });



  function cardInput(title, description, inputComponent, setPageNumber) {

    return (
      <div className="box " style={{ height: "400px", width: "600px", display: "flex", flexDirection: "column", zIndex: "2", position: "absolute" }} >
        <div style={{ margin: "3%", height: "80%" }}>
          <h1>{title}</h1>
          <div>{description}</div>
          {inputComponent}
        </div>

        <div>
          {pageNumber > 0 && <Button style={{ float: "left" }} onClick={() => { setPageNumber(prev => (prev - 1 >= 0) ? prev - 1 : prev) }}>
            <h3 >Previous</h3>
          </Button>}
          {pageNumber < maxPages && <Button style={{ float: "right" }} onClick={() => { setPageNumber(prev => (prev + 1 <= maxPages) ? prev + 1 : prev) }}>
            <h3>Next</h3>
          </Button>}
        </div>
        <h3 style={{ textAlign: "center" }}>{(1 + pageNumber) + "/" + (1 + maxPages)}</h3>



      </div>

    )

  }


  function cards(pageNumber) {
    console.log(pageNumber)
    switch (pageNumber) {


      case 0:
        return cardInput(
          "Collection Name",
          "This is the name your nft will have",
          <TextField key="1"
            id="outlined-basic"
            onChange={(event) => setName(event.target.value)}
            label="Name"
            variant="outlined"
          />,
          setPageNumber,
          maxPages
        );
      case 1:
        return cardInput(
          "Description",
          "Explain what the owner of the NFT will recieve, or explain what the collection is",
          <TextField key="2"
            id="outlined-basic"
            onChange={(event) => setDesc(event.target.value)}
            label="Description"
            variant="outlined"
          />,
          setPageNumber
        );

      case 2:
        return cardInput(
          "Collection Size",
          "How many NFT should be able to be minted from your collection, an succesfull artist does 100 features in their career, therefore we recommend a collection size of 20",
          <TextField key="3"
            id="outlined-basic"
            onChange={(event) => setCollectionSize(event.target.value)}
            label="Collection Size"
            variant="outlined"
          />,
          setPageNumber
        );



      case 3:
        return cardInput(
          "Minting Price",
          "How much in ETH should it cost to mint one Nft",
          <TextField key="4"
            id="outlined-basic"
            onChange={(event) => setMintingPrice(event.target.value)}
            label="Minting Price"
            variant="outlined"
          />,
          setPageNumber
        );

      case 4:
        return cardInput(
          "What are you down to do?",
          "What rights do you have as a collection creator",
          <FormControl
            sx={{ m: 3 }}
            component="fieldset"
            variant="standard"
          >
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
          </FormControl>,
          setPageNumber
        );


      case 5:
        return cardInput(
          "Upload Image",
          "This image will be displayed when people look at your collection",
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
          </div>,
          setPageNumber
        );

        case 6:
          return cardInput(
            "Customize minting widget",
            "Choose colors, allow minting more than one, etc",
            (null),
            setPageNumber
          );

        case 7:
          return cardInput(
            "Stats widget",
            "Buyers usually wants to see how you as an artist are preforming, by adding the stats widget you enable that",
            (null),
            setPageNumber
          );
   
        case 8:
          return cardInput(
            "Spotify widget",
            "Enable vistor to listen to your music",
            (null),
            setPageNumber
          );


      case 9:
        return cardInput(
          "",
          "",
          <div>
          <div className="card" onClick={() => {console.log("Minted") }}>
            <h3>Deploy Smartcontract</h3>
            <p>Enable your fans to mint your NFTs.</p>
          </div>
          <p>Cost will be 0.05ETH excluding fees</p>

          </div>,
          setPageNumber
        );

      case 10:
        return cardInput(
          "Congratulations",
          "You have succesfully launched your collection. Press next to visit your minting page, vi can fixa att man byter pages när man trycker på next.",
          (null),
          setPageNumber
        );


      default:
        return (null);

    }


  }

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






        {props.status.connected ? (
          <div className="center" style={{ position: "relative", width: "100%" }}>
            <div style={{ position: "absolute" }}>
              <div className="grid ">
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

                <div className="mintInfo">
                  {(name && pageNumber > 0) ? (<h1>{name}</h1>) :(<h1 style = {{color: "transparent"}}>woooooooooow</h1>)}

                  {(desc && pageNumber > 1) && <b>{desc}</b>}

                  <br />
                  <br />
                  {(collectionSize && pageNumber > 2) && <b>{"Claimed: " + "0" + " / " + collectionSize + " "}</b>}

                  <br />
                  {(mintingPrice && pageNumber > 3) && <b>{"Minting Price: " + mintingPrice + " ETH"}</b>}
                  <br />
                  {(pageNumber > 9) && <b><a href={"https://etherscan.io/address/" + collection["aw_address"]} target="_blank">{"Subcollection address: " + collection["aw_address"]}</a></b>}
                  <br />
                </div>
              </div>
              
              {(pageNumber > 6) &&
                    <div className="mintContainer">
                      <h1 style={{ textAlign: "center" }}>{"Cost " + mintingPrice * 0 + " ETH"}</h1>
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

                      <Button >
                        <h3>Mint</h3>
                      </Button>
                    </div>
                  }

              {(pageNumber > 7) && <div className="wide">
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
              </div>}

              {(pageNumber > 8) && <div className="wide">
                <div className="statsInfo box" style={{ float: "left" }}>
                  <h1>Stats</h1>
                  {"Monthly listener: " + "532423423"}
                  <br />
                  {"Monthly streams: " + "1002423423"}
                </div>
              </div>}
            </div>

            {cards(pageNumber)}




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
          flex-direction: column;
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
