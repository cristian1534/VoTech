import Image from "next/image";
import Link from "next/link";
import { TProject } from "../../../../types/typeProjects";

async function getProjectById(uuid: string): Promise<TProject | null> {
  const res = await fetch(`https://votech.onrender.com/projects/${uuid}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    console.error("Error fetching project:", res.statusText);
    return null;
  }

  const response = await res.json();
  console.log(response)

  const project: TProject = {
    id: response.data.id,
    uuid: response.data.uuid,
    title: response.data.name,
    description: response.data.description,
    technologies: response.data.technologies
      ? response.data.technologies
          .split(",")
          .map((tech: string) => tech.trim()) 
      : [], 
    image: response.data.image.trim(), 
  };


  return project;
}

type TParams = {
  uuid: string;
};

export default async function ProjectDetails({ params }: { params: TParams }) {
  const project = await getProjectById(params.uuid);
  console.log(params.uuid);

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-center my-5 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
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
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="rounded-lg"
          />
        ) : (
          <div className="w-600 h-400 flex items-center justify-center bg-gray-200 rounded-lg">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
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
        <Link
          href="/"
          className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
