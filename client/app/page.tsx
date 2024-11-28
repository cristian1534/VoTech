import { getProjects } from "../lib/api";
import Banner from "../components/Banner";
import Card from "../components/Card";
import ContactForm from "../components/ContactForm";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { OpportunitiesList } from "../components/OpportunitiesList";
import { FAQ } from "../components/FAQ";
import { TProject } from "../types/typeProjects";
import { Subscribe } from "../components/Subscribe";
import { About } from "../components/About";
import Link from "next/link";
import { Discord } from "../components/Discord";

export default async function Home() {
  const projects: TProject[] = (await getProjects()) || [];

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

  return (
    <div>
      <div>
        <div className="container mx-auto">
          <Banner />
        </div>
        <div className="bg-white container mx-auto my-10">
          <About />
        </div>
        <div className="bg-white container mx-auto my-10">
          <UseText
            messageOne={messagesProjects.messageOne}
            messageTwo={messagesProjects.messageTwo}
            messageThree={messagesProjects.messageThree}
            messageFour={messagesProjects.messageFour}
          />
        </div>
        <div className="container mx-auto">
          <Card cards={projects} />
        </div>
        <div>
          <div className="bg-white container mx-auto">
            <OpportunitiesList />
          </div>

          <div className="bg-white container mx-auto my-10">
            <UseText
              messageOne={messagesPortfolio.messageOne}
              messageTwo={messagesPortfolio.messageTwo}
              messageThree={messagesPortfolio.messageThree}
              messageFour={messagesPortfolio.messageFour}
            />
            <div className="bg-white container mx-auto text-center pb-4 font-sans">
              <Link
                href="/portfolio"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white px-3 py-2 rounded-md"
              >
                PORTFOLIO
              </Link>
            </div>
          </div>
          <div className="bg-white container mx-auto">
            <FAQ />
          </div>
          <div className="bg-white container mx-auto my-10">
            <UseText
              messageOne={messagesContact.messageOne}
              messageTwo={messagesContact.messageTwo}
              messageThree={messagesContact.messageThree}
              messageFour={messagesContact.messageFour}
            />
          </div>
        </div>
        <div>
          <Discord />
        </div>
        <div className="p-7 mb-10 container mx-auto">
          <ContactForm />
          <Subscribe />
        </div>
      </div>
    </div>
  );
}
