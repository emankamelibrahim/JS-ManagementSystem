
import { Person } from "./person.js";
export class Employee extends Person {
  constructor (data) {
    super(data)
    this.position = data.position
    this.salary = data.salary
  }
}
