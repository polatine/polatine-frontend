import Head from "next/head";
import Link from "next/link";
import PageAnimation from "../components/PageAnimation";

export default function Home() {
  return (
    <PageAnimation>
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
      `}</style>
    </PageAnimation>
  );
}
