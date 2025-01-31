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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <h2 className="text-center text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          Project Not Found
        </h2>
      </div>
    );
  }

  const appliedLength = userProjects?.filter(
    (userProject) => userProject.project_id === project.id
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
          <div className="p-8">
            <h2 className="text-center mb-8 text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              {project.title}
            </h2>

            <div className="mb-8 rounded-xl overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 p-1">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={600}
                  className="w-full h-[400px] object-cover rounded-lg"
                  priority
                />
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center bg-gray-800 text-gray-400 rounded-lg">
                  <span>No image available</span>
                </div>
              )}
            </div>

            {appliedLength.length > 4 && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center mb-6">
                Team Completed
              </div>
            )}

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="space-y-8">
              <div>
                <IconSlider />
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mb-4">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.length > 0 ? (
                    technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 text-sm"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">No technologies specified</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mb-4">
                  Team Members
                </h3>
                <div className="space-y-2">
                  {userProjects
                    ?.filter((userProject) => userProject.project_id === project.id)
                    .slice(0, 4)
                    .map((applicant) => (
                      <div
                        key={applicant.user_email}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-medium">
                          {applicant.user_name[0].toUpperCase()}
                        </div>
                        <span className="text-gray-300">{applicant.user_name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
