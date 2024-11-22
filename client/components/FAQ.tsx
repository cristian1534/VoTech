import React from "react";

export const FAQ = () => {
  return (
    <div className="mt-14 shadow-lg rounded-md">
      <section className="text-gray-400 py-32">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <h2 className="mb-12 text-4xl font-bold leading text-center sm:text-5xl bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Some questions?
          </h2>
          <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-orange-300">
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                How can I participate in the platform?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  To participate, simply register on our platform and subscribe
                  for just $5 per month. This will give you access to propose
                  projects, vote for them, and, if your application is accepted,
                  participate in their development.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What does the monthly subscription include?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  The monthly subscription includes the ability to: - Propose
                  your own projects. - Vote for the projects you prefer. - Apply
                  to participate in the development of the winning project. -
                  Access the collaborative portfolio to showcase completed
                  projects.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                How do the voting sessions work?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Voting takes place weekly. Each member of the platform can
                  vote for one or more projects proposed during that week. The
                  project with the most votes at the end of the week will be
                  selected for development.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                Who can work on the winning project?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Only members who have applied for the winning project can
                  participate in its development. This ensures that the team is
                  committed and motivated to carry it out.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What happens with completed projects?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Completed projects are published on the platform, and all
                  participants can add them to their professional portfolios.
                  This allows them to demonstrate their experience and teamwork
                  skills.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                Can I cancel my subscription at any time?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Yes, you can cancel your subscription at any time from your
                  profile. You will still have access to the platform until the
                  end of the period you have already paid for.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What payment methods do you accept?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  Currently, we only accept payments through PayPal. This method
                  ensures that all transactions are secure and reliable.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What happens if my project does not win the vote?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  If your project does not win, it will remain published on the
                  platform. You can improve it to attract more attention and
                  increase its chances of being selected in future votes.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What level of experience do I need to participate?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  No prior experience is required. The platform is designed to
                  help junior developers collaborate, learn, and build real
                  projects in teams.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                Can I propose any type of project?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  You can propose any project as long as it is technically
                  feasible and aligns with the platform policies. We avoid
                  projects that promote illegal or inappropriate content.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                What if I can not participate in the development of a project?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  The $5 subscription gives you full access to all platform
                  features, including proposing, voting, and actively
                  participating in development. If you can not commit to a
                  project in a given month, we recommend focusing on proposing
                  new ideas or collaborating on smaller tasks within the team.
                </p>
              </div>
            </details>
            <details>
              <summary className="py-2 outline-none cursor-pointer focus:underline">
                How can I contact support?
              </summary>
              <div className="px-4 pb-4">
                <p>
                  If you have any questions or need assistance, you can contact
                  us anytime via email at{" "}
                  <span className="text-orange-400">cmachuca32@gmail.com</span>.
                  Our team will be happy to assist you.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};
