// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  jobDataValidator,
  jobPatchValidator,
  jobQueryValidator,
  jobResolver,
  jobExternalResolver,
  jobDataResolver,
  jobPatchResolver,
  jobQueryResolver
} from './job.schema.js'
import { JobService, getOptions } from './job.class.js'

export const jobPath = 'job'
export const jobMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './job.class.js'
export * from './job.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const job = (app) => {
  // Register our service on the Feathers application
  app.use(jobPath, new JobService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: jobMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(jobPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(jobExternalResolver), schemaHooks.resolveResult(jobResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(jobQueryValidator), schemaHooks.resolveQuery(jobQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(jobDataValidator), schemaHooks.resolveData(jobDataResolver)],
      patch: [schemaHooks.validateData(jobPatchValidator), schemaHooks.resolveData(jobPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
