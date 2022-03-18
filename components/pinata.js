import FormData from "form-data";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const pinFileToIPFS = async (img) => {
  const pinataApiKey = process.env.NEXT_PUBLIC_pinataApiKey;
  const pinataSecretApiKey = process.env.NEXT_PUBLIC_pinataSecretApiKey;
  var url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  //we gather a local file for this example, but any valid readStream source will work here.
  let data = new FormData();
  data.append("file", img);

  //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
  //metadata is optional
  // TODO: Same name cannot be posted twice, how do we make sure name is different every time so IPFS accepts it?
  const metadata = JSON.stringify({
    name: uuidv4(),
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
      url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      let metadata = {
        pinataMetadata: {
          name: uuidv4(),
        },
        pinataContent: {
          image: response.data.IpfsHash,
          name: "my new nft",
          description: "this is an nft",
        },
      };
      axios
        .post(url, metadata, {
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        })
        .then(function (metaresponse) {
          console.log(metaresponse);
          return metaresponse.data.IpfsHash;
        });
    });
};
