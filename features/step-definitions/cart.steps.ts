import { Given, Then, When } from "@cucumber/cucumber";
import { CartPage } from "../../pages/CartPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { productNames } from "../../utils/constants";
import type { ScenarioWorld } from "./world";

Given(
  "user adds {string} to cart",
  async function (this: ScenarioWorld, productName: string) {
    await new ProductsPage(this.page).addProductToCart(productName);
  }
);

When("user removes the product", async function (this: ScenarioWorld) {
  await new ProductsPage(this.page).removeProductFromCart(productNames.backpack);
});

When("user opens cart", async function (this: ScenarioWorld) {
  await new ProductsPage(this.page).openCart();
});

Then(
  "cart should contain {string}",
  async function (this: ScenarioWorld, productName: string) {
    await new CartPage(this.page).expectProductPresent(productName);
  }
);

Then("cart should be empty", async function (this: ScenarioWorld) {
  await new CartPage(this.page).expectCartEmpty();
});
