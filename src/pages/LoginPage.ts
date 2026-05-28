import { type Locator, type Page } from "@playwright/test";

export class Loginpage {
  readonly page: Page;
  readonly textboxUsername: Locator;
  readonly textboxPassword: Locator;
  readonly buttonLogin: Locator;
  readonly errorMessage: Locator;
  readonly menuButton: Locator;
  readonly logoutbutton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.textboxUsername = page.getByTestId("username");
    this.textboxPassword = page.getByTestId("password");
    this.buttonLogin = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
    this.logoutbutton = page.getByRole("link", { name: "Logout" });
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.textboxUsername.fill(username);
    await this.textboxPassword.fill(password);
    await this.buttonLogin.click();
  }

  async successfulLogout() {
    await this.menuButton.click();
    await this.logoutbutton.click();
  }
}
