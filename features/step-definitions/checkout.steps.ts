import { When, Then } from "@cucumber/cucumber";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { ProductsPage } from "../../pages/ProductsPage";
import type { ScenarioWorld } from "./world";

When("user proceeds to checkout", async function (this: ScenarioWorld) {
  await new ProductsPage(this.page).openCart();
  await new CartPage(this.page).proceedToCheckout();
});

When(
  "user enters First Name {string}",
  async function (this: ScenarioWorld, firstName: string) {
    await new CheckoutPage(this.page).enterFirstName(firstName);
  }
);

When(
  "user enters Last Name {string}",
  async function (this: ScenarioWorld, lastName: string) {
    await new CheckoutPage(this.page).enterLastName(lastName);
  }
);

When(
  "user enters Postal Code {string}",
  async function (this: ScenarioWorld, postalCode: string) {
    await new CheckoutPage(this.page).enterPostalCode(postalCode);
  }
);

When("user completes checkout", async function (this: ScenarioWorld) {
  const checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.continueToOverview();
  await checkoutPage.finishCheckout();
});

Then(
  "user should see {string}",
  async function (this: ScenarioWorld, confirmation: string) {
    await new CheckoutPage(this.page).expectOrderComplete(confirmation);
  }
);
