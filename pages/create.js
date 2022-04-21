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
} from "@mui/material/";
import Head from "next/head";
import { useState } from "react";
import Web3 from "web3";
import { pinFileToIPFS } from "../components/pinata";
import PageAnimation from "../components/PageAnimation";
import NFTCard from "../components/NFTCard";

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    margin: "2rem 0",
    fontSize: "14pt",
    paddingLeft: "6px",
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
  margin: "4rem 0",
  padding: "10px 0",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
});

export default function Home(props) {
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

  return (
    <>
      <Head>
        <title>Polatine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {props.status.connected ? (
          <>
            <section className="previewView">
              <NFTCard
                file={file}
                name={name}
                desc={desc}
                collectionSize={collectionSize}
                mintingPrice={mintingPrice}
              />
            </section>
            <section className="settingsColumn">
              <h1 className="settingsTitle">Create a collection</h1>
              <div
                fullWidth
                style={{
                  textAlign: "center",
                }}
              >
                <RoundedButton variant="contained" component="label">
                  <img src="/upload.svg" />
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                </RoundedButton>
              </div>
              gravida. Quisque dolor massa,
              <RoundedTextField
                fullWidth
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}
              />
              pulvinar sit amet justo sed, consequat imperdiet arcu. Donec
              convallis, leo a tincidunt pharetra, augue sapien tempor magna, in
              <RoundedTextField
                fullWidth
                placeholder="Description"
                onChange={(event) => setDesc(event.target.value)}
              />
              venenatis ligula risus sit amet ex. Vestibulum ante ipsum primis
              in faucibus orci luctus et ultrices posuere cubilia curae; In
              egestas, neque nec pellentesque dignissim, ipsum massa vehicula
              <RoundedTextField
                fullWidth
                placeholder="Collection Size"
                type="number"
                onChange={(event) => setCollectionSize(event.target.value)}
              />
              <RoundedTextField
                fullWidth
                placeholder="Minting Price"
                type="number"
                onChange={(event) => setMintingPrice(event.target.value)}
              />
              suscipit odio eu mi viverra, sit amet sagittis ante metus justo in
              diam. Maecenas dapibus vel lorem vel accumsan. Fusce eu leo metus.
              Fusce egestas id dolor sed consequat. Duis et tortor tellus.
              Nullam placerat sed justo sit amet dignissim. Nam efficitur erat
              sed magna congue cursus. Suspendisse auctor enim tincidunt risus
              elementum, ut ornare ligula porta. Suspendisse at justo arcu.
              Suspendisse sit amet ante vitae velit finibus dignissim ut at
              turpis.
              <RoundedButton fullWidth variant="contained">
                Mint
              </RoundedButton>
            </section>
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
          background: white;
          overflow-y: scroll;
          overflow-x: hidden;
        }
        .settingsTitle {
          font-size: 4rem;
          text-align: center;
          font-weight: 300;
        }
        .previewView {
          width: 77%;
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
          width: 23%;
          min-height: 100%;
          background: white;
          padding: 7rem 2rem 30rem 2rem;
          float: right;
        }
        .settingsColumn::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
