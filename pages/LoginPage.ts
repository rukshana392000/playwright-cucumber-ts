import { expect, type Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Username" }).fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async expectLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/(?:index\.html)?$/);
    await expect(this.page.getByRole("button", { name: "Login" })).toBeVisible();
  }
}
