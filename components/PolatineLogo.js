import Link from "next/link";

export default function PolatineLogo(props) {
  return (
    <Link href="/">
      <a>
        Polatine
        <style jsx>{`
          a {
            font-size: 20pt;
          }
        `}</style>
      </a>
    </Link>
  );
}
