import { expect, type Locator, type Page } from "@playwright/test";

export class ProductsPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.page.getByText("Products", { exact: true })).toBeVisible();
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.productCard(productName);
    await expect(product).toBeVisible();
    await product.getByRole("button", { name: "Add to cart" }).click();
    await expect(product.getByRole("button", { name: "Remove" })).toBeVisible();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const product = this.productCard(productName);
    await expect(product).toBeVisible();
    await product.getByRole("button", { name: "Remove" }).click();
    await expect(product.getByRole("button", { name: "Add to cart" })).toBeVisible();
  }

  async openCart(): Promise<void> {
    await this.page.getByRole("button", { name: /^Cart/ }).click();
  }

  async openMenu(): Promise<void> {
    await this.page.getByRole("button", { name: "Open Menu" }).click();
  }

  async logout(): Promise<void> {
    await this.page.getByRole("button", { name: "Logout" }).click();
  }

  private productCard(productName: string): Locator {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ has: this.page.getByText(productName, { exact: true }) });
  }
}
