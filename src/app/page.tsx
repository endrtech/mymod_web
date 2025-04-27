import Head from "next/head";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="bg-white w-full h-screen flex flex-col items-center justify-center">
      <SignIn routing="hash" afterSignInUrl={"/:d:/app"} />
    </div>
  );
}
