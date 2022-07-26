import { Builder, until, WebDriver } from "selenium-webdriver";
import Chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver"
import { URL, message } from "../utils/url";
import { HomePage } from "../pages/HomePage";
import { CatalogPage } from "../pages/CatalogPage";
import * as pages from "../pages";

import {BasePage} from "../pages/BasePage";
import {CurrencyPage, elements} from "../pages/CurrencyPage";
import {PageFactory} from "../pages/PageFactory";

describe("Onliner", () => {
    let driver: WebDriver;

    beforeEach(async () => {
        // Why init() is not working this way?
        // await new BasePage(driver).init();
        const service = new Chrome.ServiceBuilder(path);
        driver = await new Builder().forBrowser("chrome").setChromeService(service).build();
        await driver.manage().window().maximize();
        await driver.manage().setTimeouts({implicit: 10000, pageLoad: 10000});
    });
    afterEach(async () => {
        await new BasePage(driver).tearDown();
    });

    it.only(`Open ${URL.home} page`, async () => {
        await (await PageFactory.getPage(driver, "Home") as HomePage).openPage();
        await expect(pages.home.elements.logo()).toBeTruthy();
    });

    it(`Open ${URL.catalog} page`, async () => {
        await (await PageFactory.getPage(driver, "Catalog") as CatalogPage).openPage();
        await expect(pages.home.elements.logo()).toBeTruthy();
        await expect(await driver.findElement(pages.catalog.elements.title()).getText()).toContain("Каталог");
    });

    it('Catalog navigation order', async () => {
        await (await PageFactory.getPage(driver, "Catalog") as CatalogPage).openPage();
        const currentNavOrder = await driver.findElements(pages.catalog.elements.itemsTitle());
            for (let i = 0; i < message.expectedNavOrder.length; i++) {
                await expect(message.expectedNavOrder[i]).toEqual(await currentNavOrder[i].getText())
            }
    });

    it(`Open ${URL.currency} page`, async () => {
       await (await PageFactory.getPage(driver, "Currency") as CurrencyPage).openPage();
    });

    it(`Open ${URL.currency} page by link`, async () => {
        await (await PageFactory.getPage(driver, "Home") as HomePage).openPage();
        await driver.sleep(2000);
        await driver.findElement(await pages.currency.elements.link()).click();
        await driver.wait(until.elementLocated(pages.currency.elements.converter("in")), 5000);
        await expect(await driver.findElement(pages.currency.elements.converter("out"))).toBeTruthy();
        const currentUrl = await driver.getCurrentUrl();
        await expect(URL.currency).toEqual(currentUrl);
    });

    it('Logo returns to the base page', async () => {
        await (await PageFactory.getPage(driver, "Catalog") as CatalogPage).openPage();
        await driver.findElement(pages.home.elements.logo()).click();
        await driver.wait(until.elementLocated(pages.home.elements.logo()), 4000);
        const currentUrl = await driver.getCurrentUrl();
        await expect(URL.home).toEqual(currentUrl);
    });

    it('Search results', async () => {
        await (await PageFactory.getPage(driver, "Home") as HomePage).openPage();
        await driver.findElement(pages.search.elements.search()).sendKeys(message.search);
        await driver.switchTo().frame(await driver.findElement(pages.search.elements.iframe()));
        await expect(await driver.findElement(pages.search.elements.searchResults()).getText()).toContain(message.search);
        await driver.switchTo().parentFrame();
    });

    it('Search close', async () => {
        await (await PageFactory.getPage(driver, "Home") as HomePage).openPage();
        await driver.findElement(pages.search.elements.search()).sendKeys(message.search);
        await driver.switchTo().frame(await driver.findElement(pages.search.elements.iframe()));
        await driver.findElement(pages.search.elements.searchClose()).click();
        await driver.switchTo().parentFrame();
        await expect(await driver.findElement(pages.search.elements.iframe())).toBeTruthy();
    });
})