import { PortfolioList } from "../../../components/PortfolioList";
import { TPortfolio } from "../../../types/typePortfolio";
import { BackButton } from "../../../components/BackButton";

export default async function Page() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL_DEV}/portfolio/`, {
    cache: "no-store", 
  });
  const data = await response.json();

  const projects: TPortfolio[] | null = data?.data || null;

  return (
    <div>
      <PortfolioList projects={projects || []} />
      <div className="flex justify-center mt-8 mr-4">
          <BackButton />
        </div>
    </div>
  );
}
