import "jasmine";
import * as p from "playwright";
import { Page, Browser } from "playwright";
import { Helpers } from "./support/ToDoMvcHelper";

let browser: Browser;
let page: Page;

describe('Using ToDo cards', () => {

    beforeEach(async () => {
    browser = await p['chromium'].launch( { headless: false });
    page = await browser.newPage();
    await page.goto('http://todomvc.com/examples/backbone/');
    });

    afterEach(async () => {
        page.screenshot( { path: `./${jasmine.getEnv().currentSpec.description}.jpeg`, type: 'jpeg' } );
        browser.close();
    });

    it('Creates a new card', async () => {
        Helpers.createCard(page);
        expect((await page.$$('.todo-list .view')).length === 1);
        expect((await page.$('.todo-count strong')).innerText().then((x) => x == '1'));
    });

    it('Created cards are remembered', async () => {
        Helpers.createCard(page);
        await page.reload();
        expect((await page.$$('.todo-list .view')).length === 1);
        expect((await page.$('.todo-count strong')).innerText().then((x) => x == '1'));
    });

    it('Can mark done cards', async () => {
        Helpers.injectExistingCard(page);
        const checkbox = await page.$(".todo-list .view [type='checkbox']")
        await checkbox.check();
        expect((await page.$$('.todo-list .view')).length === 1);
        expect((await page.$('.todo-count strong')).innerText().then((x) => x == '0'));
    });

    it('Cards marked done are under completed', async () => {
        Helpers.injectExistingCard(page);
        const checkbox = await page.$(".todo-list .view [type='checkbox']")
        await checkbox.check();
        await page.click("a[href*='completed']");
        expect((await page.$$('.todo-list .view')).length === 1);
        expect((await page.$('.todo-count strong')).innerText().then((x) => x == '1'));
    }); 
});