# budgeting app

## requirements
- monthly budget with category
- amount for category

### schema design
- categories
  - <id, name, amount>
- users
  - <id, name, gender, ....>
- user_category
  - <id, user_id, category_id>
  - indexed on user_id
- txn
  - <id, txn_amount, date, category_id>

### CRUD API Design
- headers, auth, versions
- POST api/users/<user_id>/budgets/
  ```
  {
    "category": "medical",
    "amount": 1000
  }
  ```
- Response: 200 
- Response: 401 & 403
- Response: 500 (ISE)
- Response: 400 (Bad request)
  - missing required field(s)
  - invalid amount (-1.00 as budget)
- GET api/users/<user_id>/budgets
  - 200 -> 
  ```
  [
    "groceries": amount,
    ...
  ]
  ```
  - 401 
  - 400
- GET api/users/<user_id>/budgets/{budget_id}/transactions
- GET api/users/<user_id>/transactions
- GET api/users/<user_id>/budgets/{budget_id}
  - 200: 
  ```
  {
    "name": "rent",
    "amount": 1000.00
  }
  ```
- GET api/users/<user_id>/budgets?name=rent
  - 200:
  [
    "total": 1,
    "data": {
      "name": "rent",
      "amount": 1000.00
    }
  ]
- PUT api/users/<user_id>/budgets/{budget_id}
   {
     "name": "new_name",
     "amount": 1500.00
   }
  - Response: 200
  - Response: 400 (if name violates unique constraints)
- DELETE api/users/<user_id>/budgets/{budget_id}
  - Response: 200
  - Response: 404 (budget_id does not exist>

// For simplicity’s sake, assume the “category” value is 1:1 with the previously defined budget categories
function getTransactions(userId: String, fromDate: ISODate, toDate: ISODate): Array<transactions>
/* Example return value:
 * [
 *   { id: "48293", amount: -7500, date: "2020-03-15T12:43:41.389Z", category: "Phone bill" },
 *   { id: "45920", amount: 120000, date: "2020-03-15T06:00:00.000Z", category: "Paycheck" },
 *   ...
 * ]
 */
  
  { id: "48293", amount: -7500, date: "2020-03-15T12:43:41.389Z", category: "Phone bill", year_month: "2020-03" },
  { id: "45920", amount: 120000, date: "2020-03-15T06:00:00.000Z", category: "Paycheck", year_month: "2020-03" }
