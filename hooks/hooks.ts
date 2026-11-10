import { After, Before, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { frameworkConfig } from "../config/config";
import type { ScenarioWorld } from "../features/step-definitions/world";

setDefaultTimeout(Math.max(frameworkConfig.timeoutMs * 2, 30_000));

Before(async function (this: ScenarioWorld) {
  mkdirSync("reports", { recursive: true });

  this.browser = await chromium.launch({
    headless: frameworkConfig.headless
  });
  this.context = await this.browser.newContext({
    baseURL: frameworkConfig.baseUrl,
    viewport: { width: 1440, height: 900 }
  });
  this.page = await this.context.newPage();
  this.page.setDefaultTimeout(frameworkConfig.timeoutMs);
  this.page.setDefaultNavigationTimeout(frameworkConfig.timeoutMs);
});

After(async function (this: ScenarioWorld, scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, "image/png");
    }
  } finally {
    await this.context?.close();
    await this.browser?.close();
  }
});
