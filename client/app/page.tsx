import Banner from "../components/Banner";
import Card from "../components/Card";

export default function Home() {
  const cards = [
    {
      id: 1,
      image:
        "https://imgs.search.brave.com/jbNH6f1ppsJjpEJDKVUbx_HK2HGSol48CvsFa40OvNE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTQvWWVs/bG93LUJhbGxvdC1C/b3gtUE5HLnBuZw",
      title: "Card Title 1",
      description: "This is a short description of the content.",
    },
    {
      id: 2,
      image:
        "https://imgs.search.brave.com/jbNH6f1ppsJjpEJDKVUbx_HK2HGSol48CvsFa40OvNE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTQvWWVs/bG93LUJhbGxvdC1C/b3gtUE5HLnBuZw",
      title: "Card Title 2",
      description: "This is a short description of the content.",
    },
    {
      id: 3,
      image:
        "https://imgs.search.brave.com/jbNH6f1ppsJjpEJDKVUbx_HK2HGSol48CvsFa40OvNE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTQvWWVs/bG93LUJhbGxvdC1C/b3gtUE5HLnBuZw",
      title: "Card Title 3",
      description: "This is a short description of the content.",
    },
  ];

  return (
    <div>
      <Banner />
      <div className="container mx-auto">
        <hr className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1 border-0" />
      </div>
      <Card cards={cards} />;
    </div>
  );
}
