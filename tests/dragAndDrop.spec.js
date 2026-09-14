import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
  const source= await page.locator("//div[@id='column-a']");
  const target= await page.locator("//div[@id='column-b']");
  //Before drag and Drop
  await expect(target).toHaveText('B');
  await expect(source).toHaveText('A');
  await source.dragTo(target);
  //After drag and Drop
  await expect(target).toHaveText('A');
  await expect(source).toHaveText('B');
});


//This is failing in webkit as not getting the text
