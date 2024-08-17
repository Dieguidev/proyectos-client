
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
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  projectId: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;


//* Auth & Users
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'email' | 'password' | 'name' | 'passwordConfirmation'>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;


