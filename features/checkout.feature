Feature: SauceDemo checkout
  As a SauceDemo customer
  I want to complete checkout
  So that my selected items can be ordered

  @smoke
  Scenario: Complete Checkout
    Given user is logged into SauceDemo
    When user adds "Sauce Labs Backpack" to cart
    And user proceeds to checkout
    And user enters First Name "John"
    And user enters Last Name "Doe"
    And user enters Postal Code "12345"
    And user completes checkout
    Then user should see "Thank you for your order!"
