import React from "react";

const backgroundKeyFrames = [
  {
    "--myColor1": "rgba(65, 88, 208, 1)",
    "--myColor2": "rgba(200, 80, 192, 1)",
    "--myColor3": "rgba(255, 204, 112, 1)",
  },
  {
    "--myColor1": "rgba(252,225,208,1)",
    "--myColor2": "rgba(255,173,214,1)",
    "--myColor3": "#rgba(162,186,245,1)",
  },

  {
    "--myColor1": "rgba(251,140,0,1)",
    "--myColor2": "rgba(0,139,155,1)",
    "--myColor3": "rgba(232,5,5,1)",
  },
  {
    "--myColor1": "rgba(252,225,208,1)",
    "--myColor2": "rgba(255,173,214,1)",
    "--myColor3": "#rgba(162,186,245,1)",
  },
  {
    "--myColor1": "rgba(65, 88, 208, 1)",
    "--myColor2": "rgba(200, 80, 192, 1)",
    "--myColor3": "rgba(255, 204, 112, 1)",
  },
  {
    "--myColor1": "rgba(182,255,139,1)",
    "--myColor2": "rgba(0,140,122,1)",
    "--myColor3": "rgba(50,172,109,1)",
  },
];

export default function NFTCard(props) {
  return (
    <div className="cardShadow" style={backgroundKeyFrames[props.pageProgress]}>
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
        @property --myColor1 {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }

        @property --myColor2 {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }
        @property --myColor3 {
          syntax: "<color>";
          initial-value: white;
          inherits: false;
        }
        .cardShadow {
          display: flex;
          align-items: center;
          transform: rotate(0deg);
          justify-content: center;
          width: 70%;
          background-image: white;
          height: 100%;
          background-image: conic-gradient(
            var(--myColor1),
            var(--myColor2),
            var(--myColor3),
            var(--myColor1)
          );

          transition: --myColor1 2s, --myColor2 2s, --myColor3 2s,
            transform 2s ease-in-out;
          border-radius: 50px;
        }

        .cardShadow::after {
          content: "";
          width: 100%;
          height: 100%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 255, 255, 0) 30%,
            rgba(255, 255, 255, 0.85) 58%,
            rgba(255, 255, 255, 1) 67%
          );
          position: absolute;
          top: 0;
          left: 0;
        }

        .NFTCard {
          border-radius: 20px;
          z-index: 100;
          width: 30rem;
          height: auto;
          background: white;
          display: flex;
          flex-direction: column;
          align-items: center;
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
    </div>
  );
}
