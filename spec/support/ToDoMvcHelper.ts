import { Page } from "playwright";

export class Helpers {
    public static async createCard(page: Page){
        const input = await page.$('input.new-todo');
        await input.click();
        await input.type("new todo");
        await input.press('Enter');
    }

    public static async injectExistingCard(page: Page) {
        const todosListKey = 'todos-backbone';
        const todosListValue = '881768be-c819-70dd-954a-05c831e084ce';
        await page.evaluate(`window.localStorage.setItem(${todosListKey},${todosListValue})`);
        const todoKey = 'todos-backbone-881768be-c819-70dd-954a-05c831e084ce';
        const value = { title: 'todo1', order: 1, completed: false, id: todosListValue };
        const stringifiedToDo = JSON.stringify(value);
        await page.evaluate(`window.localStorage.setItem(${todoKey},${stringifiedToDo})`);
        page.reload();
    }
}