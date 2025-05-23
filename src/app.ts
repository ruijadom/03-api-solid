import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { UserAlreadyExistsError } from "./use-cases/errors/user-already-exists-error";
import { ZodError } from "zod";
import { env } from "./env";
export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({ message: "Validation error.", issues: err.format() });
  }

  if(env.NODE_ENV !== "production") {
    console.error(err);
  } else {
    // TODO: Here we should log to an external tool like DataDog/Sentry/Bugsnag
  }

  return reply.status(500).send({ message: "Internal server error." });
});