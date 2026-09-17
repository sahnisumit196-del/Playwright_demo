import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

class AddToCart {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL;
    this.username1 = process.env.USERNAME1;
    this.password = process.env.PASSWORD;
    this.userNameInputField = page.locator("//input[@id='user-name']");
    this.passwordInputField = page.locator("//input[@id='password']");
    this.loginButton = page.getByText("Login");
    this.addToCartButton = page.locator(
      "//button[@data-test='add-to-cart-test-allthethings-tshirt-red']",
    );
    this.shoppingCartLink = page.locator(
      "//a[@data-test='shopping-cart-link']",
    );
    this.inventoryItemNameLink = page.locator(
      "//a[@data-test='inventory-item-name']",
    );
    this.inventoryItemNameDiv = page.locator(
      "//div[@data-test='inventory-item-name']",
    );
    this.checkoutButton = page.locator("//a[@data-test='checkout']");
    this.firstNameInputField = page.locator("//input[@data-test='firstName']");
    this.lastNameInputField = page.locator("//input[@data-test='lastName']");
    this.postalCodeInputField = page.locator(
      "//input[@data-test='postalCode']",
    );
    this.continueButton = page.getByText("Continue");
    this.verifyLabel = page.locator("//div[@data-test='total-label']");
    this.finishButton = page.locator("//button[@data-test='finish']");
    this.verifyOrderComplete = page.locator(
      "//h2[@data-test='complete-header']",
    );
    this.verifyOrderCompleteText = page.locator(
      "//p[@data-test='complete-text']",
    );
    this.backToProducts = page.locator("//a[@data-test='back-to-products']");
    this.homeUrl = process.env.Home_URL;
  }

  async login(url, username, password) {
    await this.page.goto(url || this.baseUrl);
    await this.userNameInputField.fill(username || this.username1);
    await this.passwordInputField.fill(password || this.password);
    await this.loginButton.click();
  }
  async AddToCartItem() {
    await this.addToCartButton.click();
    await this.shoppingCartLink.click();

    const expectedtext = await this.inventoryItemNameLink.textContent();
    const actualtext = "Test.allTheThings() T-Shirt (Red)";

    expect(expectedtext).toBe(actualtext);
  }
  async GoToCheckoutScreen() {
    await this.checkoutButton.click();
    await this.firstNameInputField.fill(faker.person.firstName());
    await this.lastNameInputField.fill(faker.person.lastName());
    await this.postalCodeInputField.fill(faker.location.zipCode());
    await this.continueButton.click();
  }
  async VerifyCartItems() {
    await expect(this.inventoryItemNameDiv).toHaveText(
      "Test.allTheThings() T-Shirt (Red)",
    );
    await expect(this.verifyLabel).toHaveText("Total: $17.27");
    await this.finishButton.click();
  }
  async VerifyOrderCompleted() {
    await expect(this.verifyOrderComplete).toHaveText(
      "Thank you for your order!",
    );
    await expect(this.verifyOrderCompleteText).toHaveText(
      "Your order has been dispatched, and will arrive just as fast as the TTA Express pony can get there!",
    );
    await this.backToProducts.click();
  }
  async ValidateHomeScreen() {
    await expect(this.page).toHaveURL(this.homeUrl);
  }
}
export default AddToCart;
