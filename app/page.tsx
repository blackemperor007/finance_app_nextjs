import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center flex-col py-10 w-full">
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Prenez le contrôle < br /> de vos finances
          </h1>
          <p className="py-6 text-center text-gray-800">
            Suivez vos budgets et vos dépenses <br /> en toute simplicité sur notre application !
          </p>
          <div className="flex justify-center items-center">
            <Link href={"/sign-in"} className="btn btn-sm md:btn-md btn-outline btn-accent">
              Connexion
            </Link>
            <Link href={"/sign-up"} className="btn btn-sm md:btn-md ml-2 btn-accent">
              Inscription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
