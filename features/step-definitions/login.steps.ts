import { Given, Then, When } from "@cucumber/cucumber";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { frameworkConfig } from "../../config/config";
import { credentials } from "../../utils/constants";
import type { ScenarioWorld } from "./world";

Given("user launches SauceDemo application", async function (this: ScenarioWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto(frameworkConfig.baseUrl);
});

When(
  "user enters valid username {string}",
  async function (this: ScenarioWorld, username: string) {
    await new LoginPage(this.page).enterUsername(username);
  }
);

When(
  "user enters valid password {string}",
  async function (this: ScenarioWorld, password: string) {
    await new LoginPage(this.page).enterPassword(password);
  }
);

When("user clicks Login button", async function (this: ScenarioWorld) {
  await new LoginPage(this.page).clickLogin();
});

Then("user should navigate to Products page", async function (this: ScenarioWorld) {
  await new ProductsPage(this.page).expectLoaded();
});

Given("user is logged into SauceDemo", async function (this: ScenarioWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto(frameworkConfig.baseUrl);
  await loginPage.login(credentials.username, credentials.password);
  await new ProductsPage(this.page).expectLoaded();
});

When("user opens the menu", async function (this: ScenarioWorld) {
  await new ProductsPage(this.page).openMenu();
});

When("user clicks Logout", async function (this: ScenarioWorld) {
  await new ProductsPage(this.page).logout();
});

Then("user should be redirected to Login page", async function (this: ScenarioWorld) {
  await new LoginPage(this.page).expectLoginPage();
});
