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

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
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
            <div className="settingsColumn">
              <h1 className="settingsTitle">Create a collection</h1>
              gravida. Quisque dolor massa,
              <RoundedTextField fullWidth label="Collection name" />
              pulvinar sit amet justo sed, consequat imperdiet arcu. Donec
              convallis, leo a tincidunt pharetra, augue sapien tempor magna, in
              <RoundedTextField fullWidth label="Collection name" />
              venenatis ligula risus sit amet ex. Vestibulum ante ipsum primis
              in faucibus orci luctus et ultrices posuere cubilia curae; In
              egestas, neque nec pellentesque dignissim, ipsum massa vehicula
              <RoundedTextField fullWidth label="Collection name" />
              metus, et posuere lectus lectus sed lorem. Nullam id gravida
              mauris, non venenatis risus. Fusce sagittis tristique maximus.
              Suspendisse tempor imperdiet magna et lacinia. Proin mollis
              dignissim gravida. Aliquam erat volutpat. Suspendisse potenti.
              Cras non blandit elit, vel congue massa. Vestibulum suscipit ipsum
              libero, at egestas massa volutpat sit amet. Aenean auctor ipsum
              eget mauris varius, id semper urna cursus. Sed a aliquet sapien.
              In tristique tincidunt sapien at tincidunt. Integer porta, magna
              eu suscipit efficitur, libero eros rhoncus purus, nec dapibus quam
              metus vel libero. Cras a augue vulputate, interdum diam id,
              aliquet nulla. Vestibulum quis nisl dui. Nullam volutpat sit amet
              leo nec pharetra. Sed fringilla placerat ex, sed feugiat sapien
              accumsan non. Phasellus tellus dolor, vehicula vitae vulputate ut,
              tempor et lorem. Phasellus at urna a lacus placerat finibus.
              Suspendisse nec pellentesque risus. Aliquam suscipit odio eu mi
              viverra, sit amet sagittis ante pharetra. Morbi vestibulum nulla
              bibendum odio elementum aliquet. Cras molestie efficitur arcu,
              vitae blandit neque volutpat in. Etiam nec nibh semper nisi porta
              tristique. Mauris euismod, eros eget sagittis porttitor, lectus
              mauris luctus dolor, id rutrum augue justo eget eros. Vestibulum
              nisi ligula, imperdiet sed ullamcorper a, blandit in lacus.
              Curabitur erat mauris, aliquet ut volutpat eget, blandit eu nunc.
              Fusce vehicula diam at vehicula tempor. Fusce sed urna maximus,
              feugiat ex eget, ultrices purus. Ut at ipsum cursus, pharetra elit
              ut, ultrices massa. Donec mi nunc, dapibus congue dictum a,
              blandit sed neque. Nunc tincidunt id ante sed accumsan. Proin
              efficitur eros velit, eget blandit leo auctor non. Nunc dui purus,
              congue vitae rutrum at, venenatis id tellus. Donec non leo
              scelerisque, malesuada odio nec, ultricies nisl. Mauris egestas
              maximus mauris dapibus maximus. Phasellus bibendum vestibulum
              lorem, a rutrum lacus mollis a. Quisque varius rutrum fermentum.
              Sed purus velit, condimentum ut congue ac, gravida at risus.
              Quisque vitae maximus ipsum. Praesent sit amet urna at odio ornare
              dapibus ac id lorem. Donec nulla ligula, ultrices eget ligula eu,
              pretium varius tellus. Nam ullamcorper, massa sed cursus congue,
              orci est blandit nisi, sit amet vulputate metus justo in diam.
              Maecenas dapibus vel lorem vel accumsan. Fusce eu leo metus. Fusce
              egestas id dolor sed consequat. Duis et tortor tellus. Nullam
              placerat sed justo sit amet dignissim. Nam efficitur erat sed
              magna congue cursus. Suspendisse auctor enim tincidunt risus
              elementum, ut ornare ligula porta. Suspendisse at justo arcu.
              Suspendisse sit amet ante vitae velit finibus dignissim ut at
              turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque vestibulum nunc urna, non ullamcorper tortor
              ultricies id. Ut lacus ligula, ullamcorper id mauris quis, cursus
              lobortis metus. Ut accumsan urna libero, nec vestibulum metus
              posuere maximus. Nam vel viverra quam. Vestibulum sem magna,
              condimentum facilisis magna id, maximus condimentum libero. Sed at
              mi quam. Aenean dignissim pharetra quam sit amet gravida. Quisque
              dolor massa, pulvinar sit amet justo sed, consequat imperdiet
              arcu. Donec convallis, leo a tincidunt pharetra, augue sapien
              tempor magna, in venenatis ligula risus sit amet ex. Vestibulum
              ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia curae; In egestas, neque nec pellentesque dignissim, ipsum
              massa vehicula metus, et posuere lectus lectus sed lorem. Nullam
              id gravida mauris, non venenatis risus. Fusce sagittis tristique
              maximus. Suspendisse tempor imperdiet magna et lacinia. Proin
              mollis dignissim gravida. Aliquam erat volutpat. Suspendisse
              potenti. Cras non blandit elit, vel congue massa. Vestibulum
              suscipit ipsum libero, at egestas massa volutpat sit amet. Aenean
              auctor ipsum eget mauris varius, id semper urna cursus. Sed a
              aliquet sapien. In tristique tincidunt sapien at tincidunt.
              Integer porta, magna eu suscipit efficitur, libero eros rhoncus
              purus, nec dapibus quam metus vel libero. Cras a augue vulputate,
              interdum diam id, aliquet nulla. Vestibulum quis nisl dui. Nullam
              volutpat sit amet leo nec pharetra. Sed fringilla placerat ex, sed
              feugiat sapien accumsan non. Phasellus tellus dolor, vehicula
              vitae vulputate ut, tempor et lorem. Phasellus at urna a lacus
              placerat finibus. Suspendisse nec pellentesque risus. Aliquam
              suscipit odio eu mi viverra, sit amet sagittis ante metus justo in
              diam. Maecenas dapibus vel lorem vel accumsan. Fusce eu leo metus.
              Fusce egestas id dolor sed consequat. Duis et tortor tellus.
              Nullam placerat sed justo sit amet dignissim. Nam efficitur erat
              sed magna congue cursus. Suspendisse auctor enim tincidunt risus
              elementum, ut ornare ligula porta. Suspendisse at justo arcu.
              Suspendisse sit amet ante vitae velit finibus dignissim ut at
              turpis.
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
        main {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: row;
        }
        .settingsTitle {
          font-size: 4rem;
          text-align: center;
          font-weight: 300;
        }
        .previewView {
          min-width: 77%;
          min-height: 1vh;
          background: white;
          align-items: center;
          justify-content: center;
          display: flex;
        }
        .settingsColumn {
          min-width: 23%;
          min-height: 100%;
          background: white;
          overflow-y: scroll;
          overflow-x: hidden;
          padding: 9rem 2rem;
        }
        .settingsColumn::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
