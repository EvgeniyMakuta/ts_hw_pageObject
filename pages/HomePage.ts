import { BasePage } from "./BasePage";
import {By, until, WebDriver, WebElement} from "selenium-webdriver";
import { URL } from "../utils/url";

export const elements = {
    logo: () => By.className("b-top-logo"),
}

export class HomePage extends BasePage {
    constructor(protected driver: WebDriver) {
        super(driver);
    }

    async openPage() {
        await this.driver.get(URL.home);
        await this.driver.wait(until.elementLocated(elements.logo()), 5000);
    }
}

