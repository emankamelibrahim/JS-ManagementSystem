import { Person } from "./person.js"

export class Student extends Person {
  constructor(data) {
    super(data)
    this.major = data.major
    this.courses = data.courses
  }
}