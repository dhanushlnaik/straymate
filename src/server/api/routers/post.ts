import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

enum Category {
  CATS = "CATS",
  DOGS = "DOGS",
  OTHERS = "OTHERS",
}

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  postanimal: publicProcedure
    .input(
      z.object({
        potid: z.string(),
        category: z.enum([Category.CATS, Category.DOGS, Category.OTHERS]),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        address: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user = ctx.session?.user;
      return ctx.db.post.create({
        data: {
          category: input.category,
          name: input.name,
          description: input.description,
          image: input.image,
          userId: user?.id.toString() ?? "",
          address: input.address,
        },
      });
    }),
  getanimal: publicProcedure.query(async ({ ctx }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ctx.db.post.findMany();
  }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

  // getLatest: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),
});
