import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const logSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const projectSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(10).max(255).required(),
  technologies: Joi.array().items(Joi.string().min(3).max(50)).required(), 
  image: Joi.string().min(10).max(255).required(),
});

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(255).required(),
});

export const partialUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  active: Joi.boolean().optional(),
});

export const portfolioSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(10).max(255).required(),
  technologies: Joi.array().items(Joi.string().min(3).max(50)).required(), 
  members: Joi.array().items(Joi.string().min(3).max(50)).required(),    
  deployment: Joi.string().min(10).max(255).required(),
  github: Joi.string().uri().required(),
  image: Joi.string().min(10).max(255).required(),
});
