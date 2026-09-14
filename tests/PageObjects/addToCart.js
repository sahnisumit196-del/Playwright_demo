import { page, expect } from '@playwright/test';

class AddToCart {
    constructor(page) {
        this.page = page;
    }

    async login(url, username, password) {
        await this.page.goto(url || process.env.BASE_URL);
        await this.page.locator("//input[@id='user-name']").fill(username || process.env.USERNAME1);
        await this.page.locator("//input[@id='password']").fill(password || process.env.PASSWORD);
        await this.page.getByText("Login").click();
    }
    async AddToCartItem() {
        await this.page.locator("//button[@data-test='add-to-cart-test-allthethings-tshirt-red']").click();
        await this.page.locator("//a[@data-test='shopping-cart-link']").click();
        const expectedtext = await this.page.locator("//a[@data-test='inventory-item-name']").textContent();
        const actualtext = "Test.allTheThings() T-Shirt (Red)";
        await expect(expectedtext).toBe(actualtext);
    }
    async GoToCheckoutScreen() {
        await this.page.locator("//a[@data-test='checkout']").click();
        await this.page.locator("//input[@data-test='firstName']").fill("Test");
        await this.page.locator("//input[@data-test='lastName']").fill("User");
        await this.page.locator("//input[@data-test='postalCode']").fill("0000")
        await this.page.getByText("Continue").click();
    }
    async VerifyCartItems() {
        await expect(this.page.locator("//div[@data-test='inventory-item-name']")).toHaveText("Test.allTheThings() T-Shirt (Red)")
        await expect(this.page.locator("//div[@data-test='total-label']")).toHaveText("Total: $17.27")
        await this.page.locator("//button[@data-test='finish']").click();
    }
    async VerifyOrderCompleted() {
        await expect(this.page.locator("//h2[@data-test='complete-header']")).toHaveText("Thank you for your order!")
        await expect(this.page.locator("//p[@data-test='complete-text']")).toHaveText("Your order has been dispatched, and will arrive just as fast as the TTA Express pony can get there!")
        await this.page.locator("//a[@data-test='back-to-products']").click()
    }
    async ValidateHomeScreen() {
        await expect(this.page).toHaveURL("https://app.thetestingacademy.com/playwright/ttacart/inventory");
    }
}
export default AddToCart