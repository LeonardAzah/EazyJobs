import React from "react";
const URL = "https://eazy-jobs-f201sffk8-isongs-projects.vercel.app/";

const getJobs = async () => {
  try {
    const res = await fetch(`${URL}/api/jobs`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading jobs: ", error);
  }
};
const Jobs = async () => {
  const { jobs } = await getJobs();
  return (
    <div className="p-12">
      <div>
        <p className="font-poppins text-xl font-bold text-center pb-4">
          Avaialable Jobs
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job._id}>
            <div className="border border border-blue-300 p-8 rounded-2xl bg-white w-[600px]">
              <p className="mb-3 font-poppins text-base font-bold leading-[150%]">
                {job.position}
              </p>
              <p className="text-sm pb-2">{job.companyName}</p>
              <div className="rounded-xl bg-gray-200 w-fit px-4 py-2">
                <p>{job.salary}</p>
              </div>
              <p className="py-4">{job.description}</p>
              <div>
                <div className="flex justify-center items-center">
                  <button className="bg-blue-900 font-bold text-white py-2 px-6 rounded-xl ">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
