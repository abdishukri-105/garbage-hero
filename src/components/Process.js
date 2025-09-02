"use client"
import Image from "next/image";
import { PhoneCall, ClipboardCheck, SprayCan, ShieldCheck } from "lucide-react";

const Process = () => {
  return (
    <section className="">
      <div className="container max-w-xl mx-auto p-6 space-y-12 lg:px-8 lg:max-w-7xl">
        <div>
          <h2 className="text-3xl font-bold text-center sm:text-5xl text-gray-900">
            Our Service Process
          </h2>
          
          <p className="max-w-3xl mx-auto mt-4 text-xl text-center text-gray-600">
            Discover how Garbage Hero Ltd delivers exceptional cleaning, sanitary, gardening, and fumigation services with a seamless, professional, and eco-friendly approach.
          </p>
        </div>
        <div className="grid  lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div className="bg-[#E5F3E8] p-3 rounded-[2rem]">
            <div className="mt-4 space-y-12">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-100 text-green-600">
                    <PhoneCall size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">
                    Initial Consultation
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Reach out via phone (+254 722 269 511) or email (info@garbagehero.co.ke) to discuss your needs. Our team assesses your requirements—whether for cleaning, landscaping, or pest control—and crafts a tailored plan for your home, office, or institution.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-preview
shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-100 text-green-600">
                    <ClipboardCheck size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">
                    Site Assessment & Planning
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Our experts visit your property to evaluate the space, whether it’s a hospital, school, or garden. We design a customized solution, prioritizing eco-friendly methods and compliance with industry standards, ensuring a clean and safe environment.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-100 text-green-600">
                    <SprayCan size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">
                    Service Execution
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Our professional team delivers the service with precision, using advanced tools and eco-friendly products. From deep cleaning high-touch surfaces to creating stunning landscapes or eliminating pests, we ensure top-quality results with minimal disruption.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-green-100 text-green-600">
                    <ShieldCheck size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-gray-900">
                    Quality Assurance & Follow-Up
                  </h4>
                  <p className="mt-2 text-gray-600">
                    After service completion, we conduct a thorough quality check to ensure your satisfaction. We offer follow-up support and maintenance plans to keep your space clean, green, and pest-free, tailored to your schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
  {/* First Image - spans full width */}
  <div className="lg:col-span-2">
    <Image
      src="/projects/cleaning-1.jpg"
      alt="Garbage Hero Ltd team cleaning a professional space"
      width={600}
      height={800}
      className="mx-auto rounded-lg shadow-lg w-full h-auto"
    />
  </div>

  {/* Second Image */}
  <div>
    <Image
      src="/projects/cleaning-3.jpg"
      alt="Garbage Hero Ltd team cleaning a professional space"
      width={600}
      height={800}
      className="mx-auto rounded-lg shadow-lg w-full h-auto"
    />
  </div>

  {/* Third Image */}
  <div>
    <Image
      src="/projects/cleaning-4.jpg"
      alt="Garbage Hero Ltd team cleaning a professional space"
      width={600}
      height={800}
      className="mx-auto rounded-lg shadow-lg w-full h-auto"
    />
  </div>
</div>

        </div>
      </div>
    </section>
  );
}

export default Process;