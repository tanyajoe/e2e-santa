Feature: User logins

    Scenario: user1 logins
        When user logs in with "tanyajoooe+test1@gmail.com" and "12345678"
        Then boxes are available

    Scenario: user2 logins
        When user logs in with "tanyajoooe+test2@gmail.com" and "12345678"
        Then boxes are available

    Scenario: user3 logins
        When user logs in with "tanyajoooe+test3@gmail.com" and "12345678"
        Then boxes are available


    
