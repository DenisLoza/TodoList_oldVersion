module.exports = {
    preset: "jest-puppeteer",
    // в тестах будут задействованны только файлы в папке integration
    testRegex: "./*\\.test\\.js$",
    setupFilesAfterEnv: ["./setupTests.js"]
}
