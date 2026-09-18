import { test } from "@playwright/test";
import AddToCart from "./PageObjects/addToCart";

test("has title", async ({ page }) => {
  const addtocart = new AddToCart(page);

  await addtocart.login();
  await addtocart.AddToCartItem();
  await addtocart.GoToCheckoutScreen();
  await addtocart.VerifyCartItems();
  await addtocart.VerifyOrderCompleted();
  await addtocart.ValidateHomeScreen();
});
//New commit