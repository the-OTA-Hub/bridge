import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    users: v.array(v.id("users")),
  })
    .index("by_users", ["users"])
    .index("name", ["name"]),
  devices: defineTable({
    name: v.string(),
    projectId: v.id("projects"),
  }).index("by_projectId", ["projectId"]),
});
