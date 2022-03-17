import FormData from "form-data";
import axios from "axios";

export const pinFileToIPFS = (img) => {
  const pinataApiKey = process.env.NEXT_PUBLIC_pinataApiKey;
  const pinataSecretApiKey = process.env.NEXT_PUBLIC_pinataSecretApiKey;
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  //we gather a local file for this example, but any valid readStream source will work here.
  let data = new FormData();
  data.append("file", img);

  //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
  //metadata is optional
  // TODO: Same name cannot be posted twice, how do we make sure name is different every time so IPFS accepts it?
  const metadata = JSON.stringify({
    name: "hella deep graffiti",
  });
  data.append("pinataMetadata", metadata);

  axios
    .post(url, data, {
      maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then(function (response) {
      //handle response here
      return (filehash = response.data.IpfsHash);
    });
};
