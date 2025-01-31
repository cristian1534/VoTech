import Banner from "../components/Banner";
import Card from "../components/Card";
import ContactForm from "../components/ContactForm";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { OpportunitiesList } from "../components/OpportunitiesList";
import { FAQ } from "../components/FAQ";
import { Subscribe } from "../components/Subscribe";
import { About } from "../components/About";
import Link from "next/link";
import { Discord } from "../components/Discord";
import { ScrollButton } from "../components/ScrollButton";

export default async function Home() {
  const messagesProjects: TMessage = {
    messageOne: "Explore a selection of Projects.",
    messageTwo:
      "Crafted by talented developers, showcasing creativity, innovation, and technical expertise.",
    messageThree:
      "Each project reflects a passion for development and real-world solutions.",
    messageFour: "",
  };

  const messagesContact: TMessage = {
    messageOne: "Do you have a project in mind? We want to hear from you!",
    messageTwo:
      "This is the perfect space to propose ideas, challenges, or projects you'd like to see developed. We're here to turn your needs into innovative tech solutions while simulating the workflow of a JR team.",
    messageThree: "",
    messageFour: "",
  };

  const messagesPortfolio: TMessage = {
    messageOne: "🚀 Check Out the Amazing Projects by VoTech Junior Teams!",
    messageTwo:
      "Want to see real-world projects created by talented junior teams at VoTech? Explore our portfolio page to view the completed projects, check out the code on GitHub, see the deployed versions, and learn about the amazing contributors behind each project. Do not miss out – visit now!",
    messageThree: "",
    messageFour: "",
  };

  function BetaVersion() {
    return (
      <div
        id="beta-version"
        className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-base sm:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg shadow-xl flex items-center gap-3 max-w-sm sm:max-w-md md:max-w-lg transition-opacity font-sans text-center break-words"
      >
        <svg
          className="w-5 sm:w-6 h-5 sm:h-6 text-white animate-pulse"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1010 10A10 10 0 0012 2z"
          ></path>
        </svg>
        <span>🚀 WORKING ON THE SITE 🚀<br/>BETA VERSION</span>
  
        <script
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(() => {
                const betaElement = document.getElementById("beta-version");
                if (betaElement) {
                  betaElement.style.opacity = "0";
                  setTimeout(() => betaElement.style.display = "none", 500);
                }
              }, 2000);
            `,
          }}
        />
      </div>
    );
  }
  

  return (
    <div>
      <div>
        <div id="top">
          <Banner />
          <BetaVersion />
        </div>
        <div className="my-10">
          <About />
        </div>
        <div className="bg-white container mx-auto my-10">
          <UseText {...messagesProjects} />
        </div>
        <div>
          <Card />
        </div>
        <>
          <div>
            <OpportunitiesList />
          </div>
          <div className="bg-white container mx-auto my-10">
            <UseText {...messagesPortfolio} />
            <div className="bg-white container mx-auto text-center mt-8 pb-4 font-sans">
              <Link
                href="/portfolio"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 hover:scale-105"
              >
                PORTFOLIO
              </Link>
            </div>
          </div>
          <FAQ />
          <div className="bg-white container mx-auto my-10">
            <UseText {...messagesContact} />
          </div>
        </>
        <div>
          <Discord />
        </div>
        <div>
          <ContactForm />
          <Subscribe />
        </div>
      </div>
      <ScrollButton />
    </div>
  );
}
