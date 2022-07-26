import { Builder, WebDriver } from "selenium-webdriver";
import Chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";

export class BasePage {
    constructor(protected driver: WebDriver) {}

    async init() {
        const service = await new Chrome.ServiceBuilder(path);
        this.driver = await new Builder().forBrowser("chrome").setChromeService(service).build();
        await this.driver.manage().window().maximize();
        await this.driver.manage().setTimeouts({implicit: 10000, pageLoad: 10000});
    }

    async tearDown() {
        await this.driver.quit();
    }
}