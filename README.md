# management system

a simple management system focused on clean architecture and core backend logic rather than ui complexity.

the project demonstrates solid oop design while handling real-world data operations such as crud, pagination, sorting, searching, and controlled user input.

## preview
![dashboard overview](assets/preview.png)

## features
- dashboard for managing:
  - employees
  - students
  - instructors
  - courses
- full crud operations for all entities
- pagination for large data sets
- sorting and searching
- restricted data input to preserve integrity
  - example: students can only be assigned to existing courses via dropdowns
- data insights and statistics visualized using chartjs

## architecture
- follows oop principles
- clear separation of responsibilities
- entities, logic, and ui concerns kept distinct

## tech stack
- hmtl
- css
- javascript (es6)
- chartjs


## screenshots
- Add new entity
  
![add new](assets/add.png)

- Dropdown menu for courses
  
![courses dropdown restriction](assets/dropdown.png)

- Confirm message before deletion
  
![Delete Confirmation](assets/deleteConfirmation.png)

- Pagination
  
![pagination](assets/pagination.png)

- Sort by name
  
![pagination](assets/sort.png)

- Search by Name
  
![search by name](assets/SearchByName.png)

- Search by Major
  
![search by major](assets/searchByMajor.png)

- Charts
  
![insights dashboard](assets/charts1.png)
![insights dashboard](assets/charts2.png)

