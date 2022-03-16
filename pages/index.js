import Image from "next/image";
import { tokens } from "../components/tokens.ts";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Head from "next/head";
import { useMemo } from "react";

export default function Home() {
  const hostname = useMemo(() => {
    if (typeof window !== 'undefined') return window.location.hostname;

    return '';
  }, []);

  return (
    <>
    <Head>
      <title>Acala Token Resource</title>
    </Head>
    <section className="p-16 bg-slate-900 min-w-screen min-h-screen">
      <h1 className="text-2xl  text-red-400 font-bold mb-16">
        Acala Token Resource
      </h1>

      <ul className="flex flex-wrap gap-12">
        {tokens.map((item) => {
          return (
            <CopyToClipboard text={`${hostname}${item.icon}`} key={item.symbol}>
              <li className="border-1 border-slate-300 flex-[96px] flex-grow-0 flex-shrink-0 w-[96px] h-[96px] flex justify-center align-center flex-col hover:bg-slate-600 transition-all rounded-sm cursor-pointer">
                <Image src={item.icon} alt={item.symbol} objectFit="contain" width='48' height='48' />
                <p className="text-md text-slate-300 mt-1 text-center">{item.symbol}</p>
              </li>
            </CopyToClipboard>
          );
        })}
      </ul>
    </section>
    </>
  );
}
