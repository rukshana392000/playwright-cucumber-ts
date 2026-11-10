Feature: SauceDemo shopping cart
  As a SauceDemo customer
  I want to manage products in my cart
  So that I can review what I intend to buy

  @smoke
  Scenario: Add Single Product to Cart
    Given user is logged into SauceDemo
    When user adds "Sauce Labs Backpack" to cart
    And user opens cart
    Then cart should contain "Sauce Labs Backpack"

  Scenario: Remove Product from Cart
    Given user is logged into SauceDemo
    When user adds "Sauce Labs Backpack" to cart
    And user removes the product
    And user opens cart
    Then cart should be empty
