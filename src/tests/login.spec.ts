import { test, expect } from "@playwright/test";
import { Loginpage } from "../pages/LoginPage";

test.describe("Login Tests", () => {
  let loginPage: Loginpage;

  test.beforeEach(async ({ page }) => {
    loginPage = new Loginpage(page);
    await loginPage.goto();
  });

  test("Login with valid credentials", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL("/inventory.html");
    await expect(page.getByTestId("inventory-container")).toBeVisible();
    await loginPage.successfulLogout();
    // await loginPage.page.waitForTimeout(5000);
  });

  test("Login with invalid credentials", async ({ page }) => {
    await loginPage.login("invalid_user", "invalid_password");
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("Test with locked user", async ({ page }) => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
