import NewsletterForm from "@/components/NewsletterForm";
import Mockup from "@/components/Mockup";

export default function Home() {
  return (
    <main className="flex-col items-center justify-center p-10 dark:bg-black bg-white dark:bg-grid-white/[0.02] bg-grid-black/[0.05] flex">
      <section className="">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid items-center xl:justify-start text-center xl:text-left grid-cols-1 gap-12 ">
            <div className="h-screen flex flex-col items-center justify-center w-full">
              <h1 className="text-4xl font-bold text-black dark:text-white sm:text-6xl lg:text-7xl]">
                Collaborate remotely, with 
                <div className="relative inline-flex ml-2">
                  <span className="absolute inset-x-0 bottom-0 border-b-[30px] border-red-200"></span>
                  <h1 className="relative font-bold text-black dark:text-white ml-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-red-500 inline-block text-transparent bg-clip-text">
                   Postcrafts.
                  </h1>
                </div>
              </h1>
              <NewsletterForm />
            </div>
            {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
              <Mockup />
            </div> */}
          </div>
        </div>
      </section>
    </main>
  );
}
