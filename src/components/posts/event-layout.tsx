"use client";
import { api } from "~/utils/api";
import EventCard from "./event-cards";
const EventPage = () => {
  const posts = api.post.getanimal.useQuery();

  return (
    <>
      <div className="min-h-screen">
        <div className="mx-auto grid max-w-[80vw] grid-cols-1 gap-5 pt-[15dvh] lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {posts?.data?.map((post, index) => {
            return (
              <section key={index}>
                <EventCard
                  category={post.category}
                  description={post.description ?? ""}
                  image={post.image ?? ""}
                  createdAt={post.createdAt}
                  author={post.userId}
                />
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EventPage;
