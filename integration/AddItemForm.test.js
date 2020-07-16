// группа тестов, поэтому ключевое слово describe
describe("addItemForm", () => {
    // it аналогичен команде test
    it("base example, visually looks correct", async () => {
        // APIs from jest-puppeteer
        // получаем картинку (snapshot) по адресу
        await page.goto("http://localhost:9009/iframe.html?id=additemform-component--add-item-form-base-example");
        // ожидаем пока будет сделан скриншот
        const image = await page.screenshot();

        // API from jest-image-snapshot
        // сравниваем snapshot, он должен быть таким, каким был до этого
        // при первом прогоне теста картинка фиксируется, как эталонная
        expect(image).toMatchImageSnapshot()
    });
});
