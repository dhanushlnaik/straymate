"use client";
import { api } from "~/utils/api";
import EventCard from "./event-cards";
const EventPage = () => {
  const posts = api.post.getanimal.useQuery();
  
  return (
    <>
      <div className="min-h-screen">
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 pt-[15dvh] max-w-[80vw] mx-auto gap-5">
          {posts?.data?.map((post, index) => {
              return (
                <section key={index}>
                  <EventCard
                    category={post.category}
                    description={post.description ?? ""}
                    image= {post.image ?? ""}
                    createdAt= {post.createdAt}
                    author= {post.userId}
                  />
                </section>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default EventPage;