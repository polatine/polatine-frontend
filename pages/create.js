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
  Input,
  Divider,
} from "@mui/material/";
import Head from "next/head";
import { useState, useEffect } from "react";
import Web3 from "web3";
import { pinFileToIPFS } from "../components/pinata";
import ConnectWalletButton from "../components/ConnectWalletButton";
import NFTCard from "../components/NFTCard";

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    margin: "0rem 0",
    fontSize: "14pt",
    paddingLeft: "6px",
    "& textarea": {
      paddingLeft: "16.5px",
    },
    "& fieldset": {
      borderRadius: "50px",
      border: "1px solid grey",
    },
    "&:hover fieldset": {
      border: "1px solid grey",
    },
    "&.Mui-focused fieldset": {
      border: "3px solid blue",
    },
  },
});

const RoundedButton = styled(Button)({
  borderRadius: "50px",
  margin: "0 0",
  padding: "10px 0",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
});

const MarginedDivider = styled(Divider)({
  margin: "2rem 0",
});

export default function Home(props) {
  const [pageProgress, setPageProgress] = useState(0);
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [collectionSize, setCollectionSize] = useState("");
  const [mintingPrice, setMintingPrice] = useState();

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

  useEffect(() => {
    if (!props.status.connected) {
      setPageProgress(0);
    } else {
      setPageProgress(Math.max(1, pageProgress));
    }
  }, [props.status.connected]);

  return (
    <>
      <Head>
        <title>Polatine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className="previewView">
          <NFTCard
            file={file}
            name={name}
            desc={desc}
            pageProgress={pageProgress}
            collectionSize={collectionSize}
            mintingPrice={mintingPrice}
          />
        </section>
        <section className="settingsColumn">
          <header>
            <ConnectWalletButton
              status={props.status}
              connectWallet={props.connectWallet}
            />
          </header>
          <h1 className="settingsTitle">Create a collection</h1>
          <div
            fullWidth
            style={{
              textAlign: "center",
            }}
          >
            <h2
              style={
                1 <= pageProgress ? { color: "black" } : { color: "#aeaeae" }
              }
            >
              Cover image
            </h2>
            <RoundedButton
              variant="contained"
              component="label"
              disabled={1 > pageProgress}
            >
              <img src="/upload.svg" />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(event) => {
                  setFile(event.target.files[0]);
                  setPageProgress(Math.max(pageProgress, 2));
                }}
              />
            </RoundedButton>
          </div>
          {/* <MarginedDivider /> */}
          <h2
            className="spaced"
            style={
              2 <= pageProgress ? { color: "black" } : { color: "#aeaeae" }
            }
          >
            Title
          </h2>
          <RoundedTextField
            fullWidth
            disabled={2 > pageProgress}
            placeholder=""
            onChange={(event) => {
              setName(event.target.value);
              setPageProgress(Math.max(pageProgress, 3));
            }}
          />
          <h2
            style={
              3 <= pageProgress ? { color: "black" } : { color: "#aeaeae" }
            }
          >
            Description
          </h2>
          <RoundedTextField
            multiline
            fullWidth
            disabled={3 > pageProgress}
            placeholder=""
            onChange={(event) => {
              setDesc(event.target.value);
              setPageProgress(Math.max(pageProgress, 4));
            }}
          />
          {/* <MarginedDivider /> */}

          <div className="spacediv"></div>
          <h2
            className="spaced"
            style={
              4 <= pageProgress ? { color: "black" } : { color: "#aeaeae" }
            }
          >
            Collection size
          </h2>
          <RoundedTextField
            fullWidth
            placeholder=""
            disabled={4 > pageProgress}
            type="number"
            onChange={(event) => {
              setCollectionSize(event.target.value);
              setPageProgress(Math.max(pageProgress, 5));
            }}
            onWheel={(e) => e.target.blur()}
          />
          <h2
            style={
              5 <= pageProgress ? { color: "black" } : { color: "#aeaeae" }
            }
          >
            Minting price
          </h2>
          <RoundedTextField
            fullWidth
            placeholder=""
            type="number"
            disabled={5 > pageProgress}
            onChange={(event) => {
              setMintingPrice(event.target.value);
              setPageProgress(Math.max(pageProgress, 6));
            }}
            onWheel={(e) => e.target.blur()}
          />
          {/* <MarginedDivider /> */}

          <div className="spaced"></div>
          <RoundedButton
            disabled={6 > pageProgress}
            fullWidth
            variant="contained"
            onClick={mint}
          >
            Mint
          </RoundedButton>
        </section>
      </main>

      <style jsx>{`
        main {
          width: 100%;
          height: 100vh;
          background: white;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        header {
          position: fixed;
          width: 100%;
          display: flex;
          justify-content: flex-end;
          padding: 1rem 4rem;
          background: white;
          top: 0;
          right: 0;
          z-index: 70;
        }
        h2 {
          margin: 1rem 0;
          font-size: 15pt;
        }
        .spaced {
          margin-top: 10rem;
        }
        .spacediv {
          min-height: 7rem;
          min-width: 100%;
        }
        .settingsTitle {
          font-size: 4rem;
          text-align: center;
          font-weight: 300;
        }
        .previewView {
          width: 74%;
          height: 100%;
          background: white;
          align-items: center;
          justify-content: center;
          display: flex;
          position: fixed;
          top: 0;
          pointer-events: none;
        }
        .settingsColumn {
          width: 26%;
          min-height: 100%;
          background: white;
          padding: 7rem 4% 30rem 2rem;
          float: right;
        }
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
