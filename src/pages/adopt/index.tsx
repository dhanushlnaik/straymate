import Head from "next/head";
import MaxWidthWrapper from "~/components/layout/max-width-wrapper";
import localFont from "next/font/local";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Fade } from "react-awesome-reveal";
import EventPage from "~/components/posts/event-layout";
const myFont = localFont({ src: "../../pages/obscura.otf" });
export default function Adopt() {
  return (
    <>
      <Head>
        <title>Straymate</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="bg-white text-black transition-colors duration-500 dark:bg-gray-900/10 dark:text-white">
          <Fade triggerOnce cascade>
            <div className="mt-4 flex flex-col items-center justify-center text-center">
              <MaxWidthWrapper>
                <h1
                  className={`${myFont.className} bg-gradient-to-b from-pink-600 to-violet-400 bg-clip-text pt-10 text-center text-6xl font-black text-transparent underline-offset-2 `}
                >
                  Adopt Me!
                </h1>
                <p className="sm-text-l mb-4 mt-2 text-center font-semibold text-zinc-700">
                  Foster Animals available for Adoption
                </p>
                <Tabs defaultValue="dogs">
                  <TabsList>
                    <TabsTrigger value="dogs">Dogs</TabsTrigger>
                    <TabsTrigger value="cats">Cats</TabsTrigger>
                    <TabsTrigger value="others">Other</TabsTrigger>
                  </TabsList>
                  <TabsContent value="dogs"><EventPage/></TabsContent>
                  <TabsContent value="cats"><EventPage/></TabsContent>
                  <TabsContent value="others"><EventPage/></TabsContent>
                </Tabs>
              </MaxWidthWrapper>
            </div>
          </Fade>
        </section>
      </main>
    </>
  );
}
