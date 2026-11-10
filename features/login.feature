Feature: SauceDemo login and logout
  As a SauceDemo customer
  I want to sign in and out
  So that I can safely access my account

  @smoke
  Scenario: Successful Login
    Given user launches SauceDemo application
    When user enters valid username "standard_user"
    And user enters valid password "secret_sauce"
    And user clicks Login button
    Then user should navigate to Products page

  Scenario: Logout Successfully
    Given user is logged into SauceDemo
    When user opens the menu
    And user clicks Logout
    Then user should be redirected to Login page
