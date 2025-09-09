"use client"
import Image from "next/image";
import { PhoneCall, ClipboardCheck, SprayCan, ShieldCheck } from "lucide-react";
import Heading from './ui/Heading';

// Palette: brand #3AA335, brand-dark #1E611B, brand-light #E8F6E9, body #333333

const Process = () => {
  return (
    <section className="section-standard font-lato text-[#333333]">{/* standardized spacing */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 space-y-12 lg:px-8">{/* standardized container */}
        <div className="text-center md:text-left">
          <div className="mx-auto md:mx-0 w-fit pb-1 px-3 rounded-md border-b-4" style={{ borderColor: '#3AA335' }}>
            <Heading level={2} variant="primary" className="mb-0 text-center md:text-left">Our Service Process</Heading>
          </div>
          <p className="max-w-3xl mx-auto md:mx-0 mt-4 text-xl text-center md:text-left text-[#333333]">
            Discover how Garbage Hero Ltd delivers exceptional cleaning, sanitary, gardening, and fumigation services with a seamless, professional, and eco-friendly approach.
          </p>
        </div>
        <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div className="bg-[#E8F6E9] p-3 rounded-[2rem]">
            <div className="mt-4 space-y-12">
              {/* Step cards */}
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#3AA335]/15 text-[#3AA335]">
                    <PhoneCall size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-black">
                    Initial Consultation
                  </h4>
                  <p className="mt-2 text-[#333333]">
                    Reach out via phone (+254 722 269 511) or email (info@garbagehero.co.ke) to discuss your needs. Our team assesses your requirements—whether for cleaning, landscaping, or pest control—and crafts a tailored plan for your home, office, or institution.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-preview shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#3AA335]/15 text-[#3AA335]">
                    <ClipboardCheck size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-black">
                    Site Assessment & Planning
                  </h4>
                  <p className="mt-2 text-[#333333]">
                    Our experts visit your property to evaluate the space, whether it’s a hospital, school, or garden. We design a customized solution, prioritizing eco-friendly methods and compliance with industry standards, ensuring a clean and safe environment.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#3AA335]/15 text-[#3AA335]">
                    <SprayCan size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-black">
                    Service Execution
                  </h4>
                  <p className="mt-2 text-[#333333]">
                    Our professional team delivers the service with precision, using advanced tools and eco-friendly products. From deep cleaning high-touch surfaces to creating stunning landscapes or eliminating pests, we ensure top-quality results with minimal disruption.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-[#3AA335]/15 text-[#3AA335]">
                    <ShieldCheck size={24} />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium leading-6 text-black">
                    Quality Assurance & Follow-Up
                  </h4>
                  <p className="mt-2 text-[#333333]">
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