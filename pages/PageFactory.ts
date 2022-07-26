import { WebDriver } from "selenium-webdriver";
import { SearchPage } from "./SearchPage";
import { BasePage } from "./BasePage";
import {HomePage } from "./HomePage";
import { CatalogPage } from "./CatalogPage";
import { CurrencyPage } from "./CurrencyPage";

export class PageFactory {
    static getPage(driver: WebDriver, pageName: string) {
        switch (pageName) {
            case "Home":
                return new HomePage(driver);
            case "Catalog":
                return new CatalogPage(driver);
            case "Search":
                return new SearchPage(driver);
            case "Currency":
                return new CurrencyPage(driver);
            default:
                return new BasePage(driver);
        }
    }
}