import { BasePage } from "./BasePage";
import { By, WebDriver } from "selenium-webdriver";

export const elements = {
    search: () => By.css("[data-project=onliner_main]"),
    searchResults: () => By.xpath("//*[@class='product__title']"),
    iframe: () => By.css("[class=modal-iframe]"),
    searchClose: () => By.css("[class=search__close]"),
}

export class SearchPage extends BasePage {
    constructor(protected driver: WebDriver) {
        super(driver);
    }
}