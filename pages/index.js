import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Polatine</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Polatine</h1>

        <p className="description">The NFT Platform for Artists</p>

        <div className="grid">
          <Link href="mint">
            <a className="card">
              <h3>Mint</h3>
              <p>Mint features, cameos and so on.</p>
            </a>
          </Link>

          <Link href="create">
            <a className="card">
              <h3>Create Collection</h3>
              <p>Enable your fans to mint your NFTs.</p>
            </a>
          </Link>

          <Link href="profile">
            <a className="card">
              <h3>My NFTS</h3>
              <p>List the NFTs in your possession. Powered by OpenSea.</p>
            </a>
          </Link>
        </div>
        <img src="/blhome.png" className="blhome" />
        <img src="/rhome.png" className="rhome" />
        <img src="/tlhome.png" className="tlhome" />
        <img src="/mhome.png" className="mhome" />
      </main>

      <style jsx>{`
        img.blhome {
          width: 20%;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        img.rhome {
          width: 15%;
          position: absolute;
          right: 0;
          top: 30%;
        }
        img.tlhome {
          width: 15%;
          position: absolute;
          left: 0;
          top: 0;
        }
        img.mhome {
          width: 20%;
          position: absolute;
          z-index: -1;
        }
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          z-index: 1;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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

        .title {
          margin: 0;
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

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          min-height: 170px;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
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
          background-image: url("/background.jpg");
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
