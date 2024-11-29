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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectDetails({ params }: any) {
  const project = await getProjectById(params.uuid);
  const userProjects = await getAllUserProject();

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
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-md  font-sans text-gray-400 overflow-y-auto mt-5 sm:mb-0 shadow-2xl">
      <h2 className="text-center my-7 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
        {project.title}
      </h2>
      <div className="mb-6 flex justify-center bg-gradient-to-r from-orange-400 to-yellow-500 p-8 shadow-2xl rounded-md">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="w-60 h-60 object-cover rounded-lg my-4"
          />
        ) : (
          <div className="w-96 h-64 flex items-center justify-center bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent rounded-lg">
            <span className="text-gray-500 text-center">
              No image available
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end w-full">
        <Link
          href="/"
          className="text-white px-6 py-2 mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
        >
          Back
        </Link>
      </div>
      <p className="text-lg mb-4">{project.description}</p>
      <h2 className="text-orange-300 text-lg font-semibold mb-2">
        Technologies:
      </h2>
      <ul className="list-disc pl-6">
        {project.technologies.map((tech) => (
          <li key={tech} className="text-md">
            {tech}
          </li>
        ))}
      </ul>
      <p className="text-lg text-orange-300 font-semibold">Team applied:</p>
      <ul className="list-none pl-6 mb-12">
        {userProjects
          ?.filter((userProject) => userProject.project_id === project.id)
          .map((applicant) => (
            <li key={applicant.user_email} className="text-md list-disc">
              {applicant.user_name}
            </li>
          ))}
      </ul>
    </div>
  );
}
