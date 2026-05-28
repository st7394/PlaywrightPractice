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
  });
});
