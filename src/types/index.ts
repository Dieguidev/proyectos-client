
import { z } from "zod";

//* Projects
export const projectSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const dashboardProjectSchema = z.object({
  limit: z.number(),
  next: z.string().nullable(),
  page: z.number(),
  prev: z.string().nullable(),
  projects: z.array(projectSchema.pick({
    id: true,
    projectName: true,
    clientName: true,
    description: true
  })),
  total: z.number(),
})

export type Project = z.infer<typeof projectSchema>;

export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>


//* Tasks
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "COMPLETED"]);

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  projectId: z.string(),
  status: taskStatusSchema
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;


