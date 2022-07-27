import Image from "next/image";
import tokenList from "../resources/tokens.json";
import networkList from "../resources/networks.json";
import Head from "next/head";
// import { CopyToClipboard } from "react-copy-to-clipboard";

const PUBLIC_HOST = 'https://resources.acala.network';
const tokens = Object.values(tokenList)
const networks = Object.values(networkList)

export default function Home() {
  const hostname = PUBLIC_HOST;

  return (
    <div className="p-16 bg-slate-900 min-w-screen min-h-screen">
      <Head>
        <title>Acala Resources</title>
      </Head>
      <section className="max-w-[1200px] m-auto">
        <h3 className="text-3xl text-red-400 font-bold mb-16 flex justify-between items-center">
          Token Icons
          {/* <CopyToClipboard text='https://resources.acala.network/tokens.json'>
            <span className="inlint-block ml-2 text-xs text-red-400 font-bold cursor-pointer self-end">
              COPY PATH
            </span>
          </CopyToClipboard> */}
        </h3>

        <ul className="flex flex-wrap gap-12">
          {tokens.map((item) => {
            const file = `${hostname}${item.icon}`;
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

        <h3 className="text-3xl text-red-400 font-bold mb-16 flex justify-between mt-32 items-center">
          Chain Icons
          {/* <CopyToClipboard text='https://resources.acala.network/networks.json'>
            <span className="inlint-block ml-2 text-xs text-red-400 font-bold cursor-pointer self-end">
              COPY PATH
            </span>
          </CopyToClipboard> */}
        </h3>
        <ul className="flex flex-wrap gap-12">
          {networks.map((item) => {
            const file = `${hostname}${item.icon}`;
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
    </div>
  );
}
