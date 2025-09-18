import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    users: v.array(v.id("users")),
  },
  returns: v.id("projects"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("projects", {
      name: args.name,
      users: args.users,
    });
  },
});

export const findMany = query({
  args: {
    name: v.optional(v.string()),
  },
  returns: v.array(
    v.object({
      _id: v.id("projects"),
      _creationTime: v.number(),
      name: v.string(),
      users: v.array(v.id("users")),
    }),
  ),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("projects")
      .withIndex("name", (q) => q.eq("name", args.name ?? ""))
      .collect();
  },
});
