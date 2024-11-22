import Image from "next/image";
import Link from "next/link";

type ProjectsDetailsProps = {
  params: {
    id: string;
  };
};

async function getProjectById(id: string) {
  try {
    const projects = [
      {
        id: "1",
        image:
          "https://imgs.search.brave.com/y6zB5ly1fzrnwKOxBgDvRxzjx9dsSFcFBbisyRq17H0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmVz/L3R1dG9yaWFsZXMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzcvMjAyNC8wMy9B/bGxiaXJkcy5wbmc",
        title: "Card Title 1",
        description: "This is a short description of the content.",
        technologies: ["React, Redux, Node"],
      },
      {
        id: "2",
        image:
          "https://imgs.search.brave.com/wOMDgsgHIYzWMYoCPwYqzAnaQkODAE0QACxCSeyzKcQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmVz/L3R1dG9yaWFsZXMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzcvMjAyNC8wMy9O/b3RlYm9vay1UaGVy/YXB5LnBuZw",
        title: "Card Title 2",
        description: "This is a short description of the content.",
        technologies: ["Vue.js, Nuxt.js, Node"],
      },
      {
        id: "3",
        image:
          "https://imgs.search.brave.com/YkOqaUdDEjNJwTMUpGFOo7iACcEknef070mjQASuLzg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmVz/L3R1dG9yaWFsZXMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzcvMjAyNC8wMy9G/bHllcnMucG5n",
        title: "Card Title 3",
        description: "This is a short description of the content.",
        technologies: ["Angular, Ionic, Node"],
      },
      {
        id: "4",
        image:
          "https://imgs.search.brave.com/mvkoHJBcbUtOM0AWrfdDe4oZQo3KR161HnLiUghnIS0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aG9zdGluZ2VyLmVz/L3R1dG9yaWFsZXMv/d3AtY29udGVudC91/cGxvYWRzL3NpdGVz/LzcvMjAyNC8wMy9a/ZW5uaS5wbmc",
        title: "Card Title 4",
        description: "This is a short description of the content.",
        technologies: ["React Native, Redux, Node"],
      },
      {
        id: "5",
        image:
          "https://imgs.search.brave.com/zEaDPU05IpRVMjCmrzuV6UCy4a8QkO6fXu-fGFd7bDg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3liZXJjbGljay5l/cy9ocy1mcy9odWJm/cy8wNC4lMjBCTE9H/L2Vjb21tZXJjZSUy/MHNxdWFyZXNwYWNl/LnBuZz93aWR0aD0x/ODYyJmhlaWdodD03/OTMmbmFtZT1lY29t/bWVyY2UlMjBzcXVh/cmVzcGFjZS5wbmc",
        title: "Card Title 5",
        description: "This is a short description of the content.",
        technologies: ["TypeScript, React, Redux, Node"],
      },
    ];
    return (await projects.find((project) => project.id === id)) || null;
  } catch (error) {
    console.log(error);
  }
}

export default async function ProjectDetails({ params }: ProjectsDetailsProps) {
  const project = await getProjectById(params.id);

  if (!project) {
    return (
      <div>
        <h2 className="text-center my-5 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent flex justify-center items-center h-screen">
          Project Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md h-screen font-sans text-gray-400">
      <h2 className="text-center my-7 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
        {project.title}
      </h2>
      <div className="mb-6 flex justify-center bg-gradient-to-r from-orange-400 to-yellow-500 p-8">
        <Image
          src={project.image}
          alt={project.title}
          width={600}
          height={400}
          className="rounded-lg"
        />
      </div>
      <p className="text-lg mb-4">{project.description}</p>
      <h2 className="text-2xl font-semibold mb-2">Technologies:</h2>
      <ul className="list-disc pl-6">
        {project.technologies.map((tech) => (
          <li key={tech} className="text-lg">
            {tech}
          </li>
        ))}
      </ul>
      <div className="flex justify-end w-full">
        <div className="flex justify-end w-full">
          <Link
            href="/"
            className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
