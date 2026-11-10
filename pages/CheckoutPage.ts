import { expect, type Page } from "@playwright/test";

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async enterInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "First Name" }).fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Last Name" }).fill(lastName);
  }

  async enterPostalCode(postalCode: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Zip/Postal Code" }).fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.page.getByRole("button", { name: "Continue" }).click();
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
  }

  async finishCheckout(): Promise<void> {
    await this.page.getByRole("button", { name: "Finish" }).click();
  }

  async expectOrderComplete(confirmation: string): Promise<void> {
    await expect(
      this.page.getByRole("heading", { name: confirmation, exact: true })
    ).toBeVisible();
  }
}
