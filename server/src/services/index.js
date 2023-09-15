import { user } from './users/users.js'

import { job } from './job/job.js'

export const services = (app) => {
  app.configure(user)

  app.configure(job)

  // All services will be registered here
}
