
import { z } from "zod";

//* Auth & Users
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  currentPassword: z.string(),
  passwordConfirmation: z.string(),
  token: z.string(),
});

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'email' | 'password' | 'name' | 'passwordConfirmation'>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type NewPasswordForm = Pick<Auth, 'password' | 'passwordConfirmation'>;
export type UpdateCurrentUserPasswordFrom = Pick<Auth, 'currentPassword' | 'password' | 'passwordConfirmation'>;
export type CheckPasswordForm = Pick<Auth, 'password'>;



//* Users
export const userSchema = authSchema.pick({
  name: true,
  email: true,
}).extend({
  id: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, 'name' | 'email'>;



//* team
const teamMemberSchema = userSchema.pick({
  id: true,
  name: true,
  email: true,
});
export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;


//* Projects
export const projectSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ id: true }))
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
    description: true,
    manager: true,
  })),
  total: z.number(),
})

export const editProjectSchema = projectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
})
export type Project = z.infer<typeof projectSchema>;

export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>


//*Notes
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, 'content'>;

//* Tasks
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  projectId: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(z.object({
    _id: z.string(),
    user: userSchema,
    status: taskStatusSchema,
  })),
  notes: z.array(noteSchema.extend({
    createdBy: userSchema,
  })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, 'name' | 'description'>;


