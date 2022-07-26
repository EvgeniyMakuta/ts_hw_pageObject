import { BasePage } from "./BasePage";
import {By, until, WebDriver} from "selenium-webdriver";
import { URL } from "../utils/url";

export const elements = {
    link: () => By.css("[class*=js-currency-widget] [class=b-top-navigation-informers__link]"),
    converter: (option: "in" | "out") => By.id(`converter-${option}`),
}

export class CurrencyPage extends BasePage {
    constructor(protected driver: WebDriver) {
        super(driver);
    }

    async openPage() {
        await this.driver.get(URL.currency);
        await this.driver.wait(until.elementLocated(elements.converter("in")), 5000);
    }
}