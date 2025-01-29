import Image from "next/image";
import { TProject } from "../../../../types/typeProjects";
import { getAllUserProject } from "../../../../lib/api";
import { BackButton } from "../../../../components/BackButton";
import { IconSlider } from "../../../../components/Stack";






async function getProjectById(uuid: string): Promise<TProject | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_DEV}/projects/${uuid}`, {
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
    votes: response.data.votes,
  };

  return project;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ uuid: string }>;
}) {
  const uuid = (await params).uuid;
 
  const project = await getProjectById(uuid);
  const userProjects = await getAllUserProject();
  function normalizeTechnologies(data: string[]): string[] {
    return data
      .map((tech) => tech.replace(/[{}"]/g, ""))
      .map((tech) => tech.trim())
      .filter(Boolean);
  }
  const technologies = normalizeTechnologies(
    Array.isArray(project?.technologies) ? project.technologies : []
  );
  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-center my-5 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          Project Not Found
        </h2>
      </div>
    );
  }
 
  const appliedLength =
    userProjects?.filter(
      (userProject) => userProject.project_id === project.id
    ) || [];
 
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

      <BackButton />
      {appliedLength.length > 4 && (
        <div className="bg-red-500 text-center text-white p-2 rounded-sm mx-auto my-5">Team Completed</div>
      )}
      <p className="text-lg mb-6">{project.description}</p>

      <div>
        <IconSlider/>
        <h3 className="text-orange-300 text-xl font-semibold mb-3">
          Technologies:
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          {technologies.length > 0 ? (
            technologies.map((tech) => (
              <li key={tech} className="text-md">
                {tech}
              </li>
            ))
          ) : (
            <li className="text-md">No technologies specified</li>
          )}
        </ul>
      </div>

      <div className="mt-8">
        <p className="text-xl text-orange-300 font-semibold mb-3">
          Team applied:
        </p>
        <ul className="list-none pl-6 mb-12 space-y-2">
          {userProjects
            ?.filter((userProject) => userProject.project_id === project.id)
            .slice(0, 4)
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
