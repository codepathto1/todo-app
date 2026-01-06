import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  handler: async (ctx) => {
    return await ctx.db.query("todos").order("desc").collect();
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });
    return todoId;
  },
});

export const toggleComplete = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.get(args.id);
    if (!todoId) return new ConvexError("Todo not found");
    const t = todoId.isCompleted;
    await ctx.db.patch(args.id, {
      isCompleted: !todoId.isCompleted,
    });
  },
});

export const updateTodo = mutation({
  args: { id: v.id("todos"), text: v.string() },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) return new ConvexError("Todo not found");

    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

export const deleteAllTodos=mutation({
  handler:async(ctx)=>{
    const allTodos=await ctx.db.query('todos').collect()

    for (const todo of allTodos){
      ctx.db.delete(todo._id)
    }
    return {todoCount:allTodos.length}
  }
  
})
