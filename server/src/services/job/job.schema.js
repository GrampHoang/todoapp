// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const jobSchema = {
  $id: 'Job',
  type: 'object',
  additionalProperties: false,
  required: ['description'], // Update this to match your frontend structure
  properties: {
    description: { type: 'string' }, // Match the property names and types
    done: { type: 'boolean' },
    date: { type: 'string' },
    time: { type: 'string' },
  }
}
export const jobValidator = getValidator(jobSchema, dataValidator)
export const jobResolver = resolve({})

export const jobExternalResolver = resolve({})

// Schema for creating new data
export const jobDataSchema = {
  $id: 'JobData',
  type: 'object',
  additionalProperties: false,
  required: ['description'],
  properties: {
    ...jobSchema.properties
  }
}
export const jobDataValidator = getValidator(jobDataSchema, dataValidator)
export const jobDataResolver = resolve({})

// Schema for updating existing data
export const jobPatchSchema = {
  $id: 'JobPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...jobSchema.properties
  }
}
export const jobPatchValidator = getValidator(jobPatchSchema, dataValidator)
export const jobPatchResolver = resolve({})

// Schema for allowed query properties
export const jobQuerySchema = {
  $id: 'JobQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(jobSchema.properties)
  }
}
export const jobQueryValidator = getValidator(jobQuerySchema, queryValidator)
export const jobQueryResolver = resolve({})
