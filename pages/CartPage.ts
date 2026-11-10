import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  private readonly cartItems: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('[data-test="inventory-item"]');
  }

  async expectProductPresent(productName: string): Promise<void> {
    await expect(
      this.page.getByText(productName, { exact: true })
    ).toBeVisible();
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }
}
