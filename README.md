# C-point-5

1. Recorded Video of the Assignmnet : - https://www.loom.com/share/8c3775fe9c284572aea795932611a0ae?sid=daf5fb9f-fa6a-44fd-aa8f-2ef098b9545d
   
2. Frontend in Angular: -
   
   You need to "npm install" or "npm install --force" first after that you can run this project by using "ng serve"
   
   url- http://localhost:4200/ 

3. Backend in Nodejs: -
   (1)Post - http://localhost:3000/add-item
   
   postman body - 

   {
  "name": "limka",
  "category": "Fruits",
  "quantity": 10,
  "price": 1.99,
  "expiration_date": "2023-12-31"
   }

   (2)Get - http://localhost:3000/get-items

   (3)Delete - http://localhost:3000/departments/:id

   You need to install npm first after that you can run this project by using "nodemon app"

4.Database-MySql
table query: - 

  CREATE TABLE IF NOT EXISTS grocery_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    expiration_date DATE NOT NULL
  );


   

