import { Fade } from "react-awesome-reveal";
import { type FunctionComponent } from "react";
import Image from "next/image";
import localFont from "next/font/local";

const myFont = localFont({ src: "../../pages/obscura.otf" });

const AboutUs: FunctionComponent = () => {
  return (
    <section className="bg-white text-black transition-colors duration-500 dark:bg-gray-900/10 dark:text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <Fade triggerOnce cascade>
          <div>
            <div className="relative isolate">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative-left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
                ></div>
              </div>

              <div>
                <div className="mx-auto max-w-6xl  lg:px-8">
                  <div className="mb-24 flow-root sm:mt-24">
                    <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                      <div className="flex flex-col items-center justify-center gap-8 p-8 sm:flex-row">
                        <div className="flex w-full flex-col items-center sm:w-1/2 sm:items-start">
                          <h1
                            className={`${myFont.className} mb-4 max-w-3xl text-center text-4xl font-bold text-pink-600 sm:text-left sm:text-5xl md:text-5xl lg:text-6xl`}
                          >
                            About Us
                          </h1>
                          <p className="text-left">
                            {
                              "Welcome to StrayMate your premier destination for finding loving homes for stray animals in need. At Straymate we are driven by a deep commitment to rescuing and rehoming stray animals, providing them with the second chance they deserve. Our dedicated team works tirelessly to rescue, rehabilitate, and place stray animals into loving forever homes. We believe that every animal deserves a chance at happiness and security, regardless of their past circumstances.Join us in our mission to save lives and make a difference in the lives of stray animals. Whether you're looking to adopt, foster, volunteer, or donate, together, we can change the lives of countless animals and create a brighter future for them."
                            }
                          </p>
                        </div>

                        <div className="mt-4 w-full cursor-pointer overflow-hidden rounded-lg sm:mt-0 sm:w-1/2">
                          <Image
                            src={"/hero3.jpg"}
                            width={1000}
                            height={750}
                            alt="main-image"
                            quality={100}
                            className="rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                  className="relative-left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
                ></div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default AboutUs;
