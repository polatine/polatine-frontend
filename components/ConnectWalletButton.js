import { Button, styled } from "@mui/material/";

const RoundedButton = styled(Button)({
  background: "rgb(116, 119, 123)",
  border: "2px solid black",
  borderRadius: "17px",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
    background: "rgb(93, 96, 101)",
    border: "2px solid grey",
  },
});

export default function ConnectWalletButton(props) {
  function compressAddress(address) {
    let compressedAddress = "";

    for (let i = 0; i < 5; i += 1) {
      compressedAddress += address[i];
    }

    compressedAddress += "...";

    for (let i = address.length - 1; i > address.length - 6; i -= 1) {
      compressedAddress += address[i];
    }

    return compressedAddress;
  }
  return (
    <>
      <RoundedButton variant="contained" onClick={props.connectWallet}>
        {props.status.connected
          ? compressAddress(props.status.address)
          : "Connect wallet"}
      </RoundedButton>

      <style jsx>{``}</style>
    </>
  );
}
