import { job } from './job/job.js'

export const services = (app) => {
  app.configure(job)

  // All services will be registered here
}
