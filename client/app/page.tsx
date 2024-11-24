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

  return (
    <div>
      <div>
  <div className="container mx-auto">
    <Banner />
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
    <ContactForm />
  </div>
  <div className="p-7 mb-10 container mx-auto">
    <Subscribe />
  </div>
</div>

    </div>
  );
}
