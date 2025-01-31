import { PortfolioList } from "../../../components/PortfolioList";
import { TPortfolio } from "../../../types/typePortfolio";
import { BackButton } from "../../../components/BackButton";
import { Suspense } from "react";
import { BiLoaderAlt } from "react-icons/bi";

export default async function PortfolioPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_DEV}/portfolio/`, {
    cache: "no-store",
  });
  const data = await response.json();
  const projects: TPortfolio[] | null = data?.data || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <BiLoaderAlt className="w-8 h-8 text-orange-400 animate-spin" />
            </div>
          }
        >
          <PortfolioList projects={projects || []} />
        </Suspense>
        
        <div className="flex justify-center mt-12">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
