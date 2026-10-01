import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/checkboxes");
  const checkbox1 = page.locator("//input[@type='checkbox']").first();
  const checkbox2 = page.locator("//input[@type='checkbox']").nth(1);

  await checkbox1.click();
  await checkbox2.click();
  await expect(checkbox2).not.toBeChecked();
  await expect(checkbox1).toBeChecked();
  await checkbox2.click();
  await checkbox1.click();
  await expect(checkbox1).not.toBeChecked();
  await expect(checkbox2).toBeChecked();
});

//This is failing in webkit as not getting the text
