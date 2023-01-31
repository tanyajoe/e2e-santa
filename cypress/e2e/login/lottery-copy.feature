Feature: User creates a box and conducts a draw

    Scenario: user logins and create a box
        Given user logs in with "tanyajoooe@gmail.com" and "12345678"
        When user creates a box
        Then box is visible

    Scenario: add participants
        Given box is visible
        When clicks submit button
        Then invite link creates

    Scenario: approve as user1
        Given visit invite link
        When clicks submit button
        Then approve by user1
            | login                      | password |
            | tanyajoooe@gmail.com       | 12345678 |
            | tanyajoooe+test1@gmail.com | 12345678 |
            | tanyajoooe+test2@gmail.com | 12345678 |
            | tanyajoooe+test3@gmail.com | 12345678 |

    Scenario: approve as user2
        Given visit invite link
        When clicks submit button
        Then approve by user2
            | login                      | password |
            | tanyajoooe@gmail.com       | 12345678 |
            | tanyajoooe+test1@gmail.com | 12345678 |
            | tanyajoooe+test2@gmail.com | 12345678 |
            | tanyajoooe+test3@gmail.com | 12345678 |

    Scenario: approve as user3
        Given visit invite link
        When clicks submit button
        Then approve by user3
            | login                      | password |
            | tanyajoooe@gmail.com       | 12345678 |
            | tanyajoooe+test1@gmail.com | 12345678 |
            | tanyajoooe+test2@gmail.com | 12345678 |
            | tanyajoooe+test3@gmail.com | 12345678 |

    Scenario: start lottery from the box
        Given user logs in with "tanyajoooe@gmail.com" and "12345678"
        When user conducts a draw
        Then the draw is successful

    Scenario: check notification by user1
        When user logs in with "tanyajoooe+test1@gmail.com" and "12345678"
        Then notification exists

    Scenario: check notification by user2
        When user logs in with "tanyajoooe+test2@gmail.com" and "12345678"
        Then notification exists

    Scenario: check notification by user3
        When user logs in with "tanyajoooe+test3@gmail.com" and "12345678"
        Then notification exists
