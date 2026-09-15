import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

class AddToCart {
    constructor(page) {
        this.page = page;
        this.baseUrl = process.env.BASE_URL;
        this.username1= process.env.USERNAME1;
        this.password= process.env.PASSWORD;
        this.usernameInput= page.locator("//input[@id='user-name']");
        this.passwordInput= page.locator("//input[@id='password']");
        this.loginButton= page.getByText("Login");
        this.addToCartButton= page.locator("//button[@data-test='add-to-cart-test-allthethings-tshirt-red']");
        this.addtocartitem= page.locator("//a[@data-test='shopping-cart-link']");
        this.verifyitemname= page.locator("//a[@data-test='inventory-item-name']");
        this.itemname= page.locator("//div[@data-test='inventory-item-name']");
        this.checkoutbutton= page.locator("//a[@data-test='checkout']");
        this.firstname= page.locator("//input[@data-test='firstName']");
        this.lastname= page.locator("//input[@data-test='lastName']");
        this.postalcode= page.locator("//input[@data-test='postalCode']");
        this.continuebutton= page.getByText("Continue");
        this.verifyLabel= page.locator("//div[@data-test='total-label']");
        this.finishbutton= page.locator("//button[@data-test='finish']");
        this.verifyOrderComplete= page.locator("//h2[@data-test='complete-header']");
        this.verifyOrderCompleteText= page.locator("//p[@data-test='complete-text']");
        this.backToProducts= page.locator("//a[@data-test='back-to-products']");
        this.homeurl= process.env.Home_URL;

    }

    async login(url, username, password) {
        await this.page.goto(url || this.baseUrl);
        await this.usernameInput.fill(username || this.username1);
        await this.passwordInput.fill(password || this.password);
        await this.loginButton.click();
    }
    async AddToCartItem() {
        await this.addToCartButton.click();
        await this.addtocartitem.click();

        const expectedtext = await this.verifyitemname.textContent();
        const actualtext = "Test.allTheThings() T-Shirt (Red)";

        expect(expectedtext).toBe(actualtext);
    }
    async GoToCheckoutScreen() {
        await this.checkoutbutton.click();
        await this.firstname.fill(faker.person.firstName());
        await this.lastname.fill(faker.person.lastName());
        await this.postalcode.fill(faker.location.zipCode());
        await this.continuebutton.click();
    }
    async VerifyCartItems() {
        await expect(this.itemname).toHaveText("Test.allTheThings() T-Shirt (Red)")
        await expect(this.verifyLabel).toHaveText("Total: $17.27")
        await this.finishbutton.click();
    }
    async VerifyOrderCompleted() {
        await expect(this.verifyOrderComplete).toHaveText("Thank you for your order!")
        await expect(this.verifyOrderCompleteText).toHaveText("Your order has been dispatched, and will arrive just as fast as the TTA Express pony can get there!")
        await this.backToProducts.click()
    }
    async ValidateHomeScreen() {
        await expect(this.page).toHaveURL(this.homeurl);
    }
}
export default AddToCart