import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl text-sky-600 font-bold">Auth And Auth</h1>
      <div className="flex gap-5">
        <Link href={"/login"}>
              <Button>Login</Button>
        </Link>
        <Link href={"/sign-up"}>
              <Button>Sign -Up</Button>
        </Link>
      </div>
    </main>
  );
}
