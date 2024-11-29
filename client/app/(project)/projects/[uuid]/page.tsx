import Image from "next/image";
import Link from "next/link";
import { TProject } from "../../../../types/typeProjects";
import { getAllUserProject } from "../../../../lib/api";

async function getProjectById(uuid: string): Promise<TProject | null> {
  const res = await fetch(`https://votech.onrender.com/projects/${uuid}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    console.error("Error fetching project:", res.statusText);
    return null;
  }

  const response = await res.json();

  const project: TProject = {
    id: response.data.id,
    name: response.name,
    uuid: response.data.uuid,
    title: response.data.name,
    description: response.data.description,
    technologies: response.data.technologies
      ? response.data.technologies.split(",").map((tech: string) => tech.trim())
      : [],
    image: response.data.image.trim(),
  };

  return project;
}

export default async function ProjectDetails({ params }: { params: { uuid: string } }) {
  const project = await getProjectById(params.uuid);
  const userProjects = await getAllUserProject();

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-100 to-yellow-100">
        <h2 className="text-center text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
          Project Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl font-sans text-gray-400 overflow-hidden mt-10 sm:mt-12 sm:mb-0">
      <h2 className="text-center my-5 text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
        {project.title}
      </h2>
      
      <div className="mb-8 flex justify-center bg-gradient-to-r from-orange-400 to-yellow-500 p-12 shadow-2xl rounded-2xl">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={750}
            height={450}
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-full h-72 flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 text-gray-500 rounded-lg shadow-md">
            <span>No image available</span>
          </div>
        )}
      </div>

      <div className="flex justify-end w-full mb-6">
        <Link
          href="/"
          className="text-white px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-all ease-in-out duration-300 rounded-lg font-semibold shadow-lg shadow-orange-300"
        >
          Back
        </Link>
      </div>

      <p className="text-lg mb-6">{project.description}</p>

      <div>
        <h3 className="text-orange-300 text-xl font-semibold mb-3">Technologies:</h3>
        <ul className="list-disc pl-6 space-y-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="text-md">{tech}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-xl text-orange-300 font-semibold mb-3">Team applied:</p>
        <ul className="list-none pl-6 mb-12 space-y-2">
          {userProjects
            ?.filter((userProject) => userProject.project_id === project.id)
            .map((applicant) => (
              <li key={applicant.user_email} className="text-md list-disc">
                {applicant.user_name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
  
}
