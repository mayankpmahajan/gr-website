import { Code2 } from "lucide-react"

const jobListings = [
  {
    title: "Graphic Designer",
    location: "Remote",
    type: "Volunteering Position",
    duration: "2 Months",
  },
  {
    title: "Web Developer",
    location: "Remote",
    type: "Internship",
    duration: "3 Months",
  },
  {
    title: "UI/UX Designer",
    location: "Remote",
    type: "Part Time",
    duration: "6 Months",
  },
]

export default function JoinUs() {
    return (
      <section className="w-full py-12 flex justify-center items-center min-h-screen">
        <div className="container px-4 md:px-6">
          <h2 className="md:text-8xl text-5xl font-bold mb-12 text-[#fff] text-center">JOIN US</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {jobListings.map((job, index) => (
              <div key={index} className="bg-zinc-900 mt-16 text-white rounded-lg overflow-hidden">
                <div className="p-6 space-y-6">
                  <div className="flex justify-center">
                    <img src="/gr.svg" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-left">{job.title}</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-zinc-400">
                        Location: <span className="text-white">{job.location}</span>
                      </p>
                      <p className="text-sm text-zinc-400">
                        Type: <span className="text-white">{job.type}</span>
                      </p>
                      <p className="text-sm text-zinc-400">
                        Duration: <span className="text-white">{job.duration}</span>
                      </p>
                    </div>
                    <div className="flex justify-center">
                        <button className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-4xl">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
