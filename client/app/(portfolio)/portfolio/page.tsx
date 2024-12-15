import { PortfolioList } from "../../../components/PortfolioList";
import { TPortfolio } from "../../../types/typePortfolio";
import Link from "next/link";

export default async function Page() {
  const response = await fetch("https://votech.onrender.com/portfolio/", {
    cache: "no-store", 
  });
  const data = await response.json();

  const projects: TPortfolio[] | null = data?.data || null;

  return (
    <div>
      <PortfolioList projects={projects || []} />
      <div className="container flex justify-end w-full p-2 font-sans mt-10">
        <Link
          href="/"
          className="text-white px-6 py-2 mb-10 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
