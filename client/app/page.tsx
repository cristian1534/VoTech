'use client'
import Banner from "../components/Banner";
import Card from "../components/Card";
import ContactForm from "../components/ContactForm";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { OpportunitiesList } from "../components/OpportunitiesList";
import { FAQ } from "../components/FAQ";


export default function Home() {
  const cards = [
    {
      id: 1,
      image:
        "https://imgs.search.brave.com/y6zB5ly1fzrnwKOxBgDvRxzjx9dsSFcFBbisyRq17H0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmVz/L3R1dG9yaWFsZXMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzcvMjAyNC8wMy9B/bGxiaXJkcy5wbmc",
      title: "Card Title 1",
      description: "This is a short description of the content.",
    },
    {
      id: 2,
      image:
        "https://imgs.search.brave.com/wOMDgsgHIYzWMYoCPwYqzAnaQkODAE0QACxCSeyzKcQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmVz/L3R1dG9yaWFsZXMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzcvMjAyNC8wMy9O/b3RlYm9vay1UaGVy/YXB5LnBuZw",
      title: "Card Title 2",
      description: "This is a short description of the content.",
    },
    {
      id: 3,
      image:
        "https://imgs.search.brave.com/YkOqaUdDEjNJwTMUpGFOo7iACcEknef070mjQASuLzg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmVz/L3R1dG9yaWFsZXMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzcvMjAyNC8wMy9G/bHllcnMucG5n",
      title: "Card Title 3",
      description: "This is a short description of the content.",
    },
    {
      id: 4,
      image:
        "https://imgs.search.brave.com/mvkoHJBcbUtOM0AWrfdDe4oZQo3KR161HnLiUghnIS0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmVz/L3R1dG9yaWFsZXMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzcvMjAyNC8wMy9a/ZW5uaS5wbmc",
      title: "Card Title 4",
      description: "This is a short description of the content.",
    },
    {
      id: 5,
      image:
        "https://imgs.search.brave.com/zEaDPU05IpRVMjCmrzuV6UCy4a8QkO6fXu-fGFd7bDg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3liZXJjbGljay5l/cy9ocy1mcy9odWJm/cy8wNC4lMjBCTE9H/L2Vjb21tZXJjZSUy/MHNxdWFyZXNwYWNl/LnBuZz93aWR0aD0x/ODYyJmhlaWdodD03/OTMmbmFtZT1lY29t/bWVyY2UlMjBzcXVh/cmVzcGFjZS5wbmc",
      title: "Card Title 5",
      description: "This is a short description of the content.",
    },
  ];

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
      
      <div className="container mx-auto">
        <Banner />
      </div>
      <div className="bg-white container mx-auto my-14">
        <UseText
          messageOne={messagesProjects.messageOne}
          messageTwo={messagesProjects.messageTwo}
          messageThree={messagesProjects.messageThree}
          messageFour={messagesProjects.messageFour}
        />
      </div>
      <div className="container mx-auto">
        <Card cards={cards} />
      </div>
      <div>
        <div className="bg-white container mx-auto">
          <OpportunitiesList />
        </div>
        <div className="bg-white container mx-auto">
          <FAQ />
        </div>
        <div className="bg-white container mx-auto my-14">
          <UseText
            messageOne={messagesContact.messageOne}
            messageTwo={messagesContact.messageTwo}
            messageThree={messagesContact.messageThree}
            messageFour={messagesContact.messageFour}
          />
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
