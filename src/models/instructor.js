import { Employee } from './employee.js'

export class Instructor extends Employee {
  constructor(data) {
    super(data)
    this.courses = data.courses
  }
}