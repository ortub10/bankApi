# bankApi
 GET =>  https://bank-api12.herokuapp.com/users  
 get all users  
example:  
[  
    {  
        "userId": 123,  
        "acocunts": [  
            {  
                "number_account": "123-1",  
                "cash": 1000,  
                "credit": 500
            }  
          ]  
    },  
    {  
        "userId": 127,  
        "acocunts": [  
            {  
                "number_account": "127-1",  
                "cash": 1000,  
                "credit": 500
            }  
        ]  
    },   
    .  
    .  
    .  
    ]  
    
     GET =>  https://bank-api12.herokuapp.com/users/:id  
     get user by id  
     example:  
      {  
        "userId": 123,  
        "acocunts": [  
            {  
                "number_account": "123-1",  
                "cash": 1000,  
                "credit": 500
            }  
          ]  
    }
    
    POST => https://bank-api12.herokuapp.com/users/:id?cash=1500&credit=2000  
    add new user, cash and credit by defult 0  
    
    PUT => https://bank-api12.herokuapp.com/users/add-account/:id  
    add new account for user by id  
    
    PUT => https://bank-api12.herokuapp.com/users/cash/:id/:accountNumber?numberToAdd=200    
    add cash by id and account number  
    
    PUT => https://bank-api12.herokuapp.com/users/credit/:id/:accountNumber?numberToAdd=200    
    add credit by id and account number  
    
    PUT => https://bank-api12.herokuapp.com/users/withdrawal/:id/:accountNumber?cashToGet=200   
    withdraw money from the user by id and account number  
    
     PUT => https://bank-api12.herokuapp.com/users/transference/:idSend/:accountNunmerSend/:idGet/:accountNunmerGet?cashTotransfer=200  
     n transfer money from one user to another
    
    
    
    
    
    
     
