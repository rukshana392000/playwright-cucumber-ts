function readBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
}

function readPositiveInteger(value: string | undefined, defaultValue: number): number {
  if (value === undefined) {
    return defaultValue;
  }

  const parsedValue = Number(value);
  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    throw new Error(`Expected a positive integer but received "${value}".`);
  }

  return parsedValue;
}

const baseUrl = process.env.BASE_URL ?? "https://www.saucedemo.com";

export const frameworkConfig = {
  baseUrl: baseUrl.replace(/\/+$/, ""),
  headless: readBoolean(process.env.HEADLESS, true),
  timeoutMs: readPositiveInteger(process.env.PLAYWRIGHT_TIMEOUT_MS, 15_000),
  browser: "chromium" as const
};
