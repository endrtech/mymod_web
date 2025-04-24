import Head from "next/head";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs"; 
import { dark } from "@clerk/themes";
import { Geist } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
});


export default function Home() {
  return (
    <div className={`${geistSans.className} bg-black w-full h-screen flex flex-col items-center justify-center`}>
      <SignIn appearance={{
        baseTheme: dark
      }} routing="hash" afterSignInUrl={"/:d:/app"} />
    </div>
  );
}
