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
        <Link href="mint">
          <a
            className="menuItem"
            style={{
              background: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
            }}
          >
            Mint
            <img src="/blhome.png" className="blhome" />
          </a>
        </Link>
        <Link href="create">
          <a
            className="menuItem"
            style={{
              background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
            }}
          >
            Create
            <img src="/rhome.png" className="rhome" />
          </a>
        </Link>
        <Link href="profile">
          <a
            className="menuItem"
            style={{
              background: "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)",
            }}
          >
            Collection
            <img src="/mhome.png" className="mhome" />
          </a>
        </Link>
      </main>

      <style jsx>{`
        .menuItem {
          overflow: hidden;
          width: 100%;
          padding-top: 4rem;
          position: relative;
          text-align: center;
          height: 100%;
          font-size: 4rem;
          font-weight: 300;
          transition: height 0.3s ease-in-out;
        }
        .menuItem:hover {
          height: 140%;
          transition: height 0.3s ease-in-out;
        }

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
        }

        main {
          z-index: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100vh;
        }
      `}</style>
    </PageAnimation>
  );
}
