import React from "react";

export default function NFTCard(props) {
  return (
    <>
      <div className="NFTCard">
        <div className="cardHeader">
          <div className="nftTitle">
            {props.name} {props.collectionSize ? "#" : ""}
            {props.collectionSize}
          </div>
          {props.mintingPrice ? (
            <div className="price">
              {props.mintingPrice} <br />
              ETH
            </div>
          ) : (
            ""
          )}
        </div>
        {props.file ? (
          <div className="imgPreview">
            <img
              className="imgPreview"
              src={URL.createObjectURL(props.file)}
              alt="img"
              style={{ display: "block", margin: "auto" }}
            />
          </div>
        ) : (
          <div className="imgPreview"></div>
        )}
        <p className="description">{props.desc}</p>
      </div>

      <style jsx>{`
        .NFTCard {
          border-radius: 20px;
          width: 30rem;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6),
            0 15px 12px rgba(0, 0, 0, 0.22);
          overflow: hidden;
        }

        .cardHeader {
          padding: 0.7rem 2rem;
          align-items: center;
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .imgPreview {
          width: 27rem;
          height: 27rem;
          margin: 0px !important;
          position: relative;
          border-radius: 10px;
        }
        .price {
          font-size: 14pt;
          text-align: right;
        }
        .nftTitle {
          font-size: 3rem;
          font-weight: 300;
        }
        .nftTitle::after {
          content: " ";
          font-size: 0;
          white-space: pre;
        }
        .description {
          font-size: 14pt;
          width: 100%;
          padding: 0 2rem;
          text-align: justify;
          align-self: flex-start;
          min-height: 5rem;
        }
      `}</style>
    </>
  );
}
