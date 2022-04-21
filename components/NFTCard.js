import React from "react";

export default function NFTCard(props) {
  return (
    <>
      <div className="NFTCard">
        <h1 className="nftTitle">
          {props.name} {props.collectionSize ? "#" : ""}
          {props.collectionSize}
        </h1>
        {props.file ? (
          <div className="imgPreview">
            <img
              className="imgPreview"
              src={URL.createObjectURL(props.file)}
              alt="img"
              style={{ display: "block", margin: "auto" }}
            />
            <div className="price nftTitle">
              {props.mintingPrice} {props.mintingPrice ? "eth" : ""}
            </div>
          </div>
        ) : (
          <div className="imgPreview">
            <div className="price nftTitle">
              {props.mintingPrice} {props.mintingPrice ? "eth" : ""}
            </div>
          </div>
        )}
        <div className="description">{props.desc}</div>
      </div>

      <style jsx>{`
        .NFTCard {
          // border: 2px solid grey;
          border-radius: 20px;
          width: 30rem;
          height: 40rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6),
            0 15px 12px rgba(0, 0, 0, 0.22);
        }

        .imgPreview {
          width: 27rem;
          height: 27rem;
          margin: 0px !important;
          position: relative;
          border-radius: 10px;
        }
        .price {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
        .nftTitle {
          font-size: 3rem;
          text-align: center;
          font-weight: 300;
          margin: 0.7rem 0;
        }
        .nftTitle::after {
          content: " ";
          font-size: 0;
          white-space: pre;
        }
        .description {
          font-size: 1.2rem;
          padding: 1rem 2rem;
          align-self: flex-start;
        }
      `}</style>
    </>
  );
}
