import { defineConfig, devices } from "@playwright/test";
import { frameworkConfig } from "./config/config";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: frameworkConfig.baseUrl,
    browserName: "chromium",
    headless: frameworkConfig.headless,
    actionTimeout: frameworkConfig.timeoutMs,
    navigationTimeout: frameworkConfig.timeoutMs,
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  }
});
