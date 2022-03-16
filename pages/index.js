import Image from "next/image";
import { tokens } from "../components/tokens.ts";
import { chains } from "../components/chains.ts";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Head from "next/head";
import { useMemo } from "react";

const PUBLIC_HOST = 'https://resources.acala.network';

export default function Home() {
  const hostname = PUBLIC_HOST;

  return (
    <>
      <Head>
        <title>Acala Resources</title>
      </Head>
      <section className="p-16 bg-slate-900 min-w-screen min-h-screen">
        <h1 className="text-2xl  text-red-400 font-bold mb-16">
          Acala Tokens
        </h1>

        <ul className="flex flex-wrap gap-12">
          {tokens.map((item) => {
            const file = `https://${hostname}${item.icon}`;
            const temp = item.icon.split("/");

            return (
              <a
                key={item.symbol}
                href={file}
                download={temp[temp.length - 1]}
                className="text-xs text-slate-300 mt-1 text-center"
              >
                <li className="border-1 border-slate-300 flex-[96px] flex-grow-0 flex-shrink-0 w-[96px] h-[96px] flex justify-center align-center flex-col hover:bg-slate-600 transition-all rounded-md cursor-pointer">
                  <Image
                    src={item.icon}
                    alt={item.symbol}
                    objectFit="contain"
                    width="48"
                    height="48"
                    className="max-w-[48px]"
                  />
                  <p className="text-md text-slate-300 mt-1 text-center">
                    {item.symbol}
                  </p>
                </li>
              </a>
            );
          })}
        </ul>

        <h1 className="text-2xl  text-red-400 font-bold mb-16 mt-32">
          Chain Icons
        </h1>

        <ul className="flex flex-wrap gap-12">
          {chains.map((item) => {
            const file = `https://${hostname}${item.icon}`;
            const temp = item.icon.split("/");

            return (
              <a
                key={item.name}
                href={file}
                download={temp[temp.length - 1]}
                className="text-xs text-slate-300 mt-1 text-center"
              >
                <li className="border-1 border-slate-300 flex-[96px] flex-grow-0 flex-shrink-0 w-[96px] h-[96px] flex justify-center align-center flex-col hover:bg-slate-600 transition-all rounded-md cursor-pointer">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    objectFit='contain'
                    width={48}
                    height={48}
                  />
                  <p className="text-md text-slate-300 mt-1 text-center">
                    {item.name}
                  </p>
                </li>
              </a>
            );
          })}
        </ul>
      </section>
    </>
  );
}
