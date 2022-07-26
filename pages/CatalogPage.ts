import { BasePage } from "./BasePage";
import {By, until, WebDriver} from "selenium-webdriver";
import { URL } from "../utils/url";

export const elements = {
    title: () => By.css("[class=catalog-navigation__title]"),
    itemsTitle: () => By.className("catalog-navigation-classifier__item-title"),
}

export class CatalogPage extends BasePage {
    constructor(protected driver: WebDriver) {
        super(driver);
    };

    async openPage() {
        await this.driver.get(URL.catalog);
        await this.driver.wait(until.elementLocated(elements.title()), 5000);
    }
}

