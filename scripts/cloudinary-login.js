const { chromium } = require("playwright");

(async () => {
  const profileDir =
    "C:\\Users\\User\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data";
  const browser = await chromium.launchPersistentContext(profileDir, {
    headless: false,
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    args: [
      "--profile-directory=Default",
      "--disable-blink-features=AutomationControlled",
      "--no-first-run",
      "--no-default-browser-check",
    ],
  });

  const page = browser.pages()[0] || (await browser.newPage());

  const log = (...a) => console.log("[CLOUDINARY]", ...a);

  await page.goto("https://console.cloudinary.com/settings/api-keys", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);
  log("On API Keys page. Looking for an existing API key / create button...");

  await page
    .goto("https://console.cloudinary.com/settings/api-keys", { waitUntil: "domcontentloaded" })
    .catch(() => {});
  await page.waitForTimeout(3000);

  const createSelectors = [
    "text=Create API Key",
    "text=New API Key",
    "text=Generate API Key",
    "button:has-text('Create')",
    "button:has-text('New')",
  ];
  let clicked = false;
  for (const sel of createSelectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.count()) {
        await el.click({ timeout: 5000 });
        clicked = true;
        log("Clicked:", sel);
        break;
      }
    } catch {}
  }
  if (!clicked)
    log("Create button not auto-clicked (key may already exist). Reading credentials from page...");

  await page.waitForTimeout(4000);

  // Find the divya-kc-portfolio row and click its reveal/eye button for the secret
  const row = page.locator("tr:has-text('divya-kc-portfolio')").first();
  const revealBtns = row.locator("button:has-text('Reveal'), button:has-text('Show'), button[aria-label*='reveal' i], button[aria-label*='show' i], button[aria-label*='eye' i]");
  const rc = await revealBtns.count().catch(() => 0);
  log("Reveal buttons in divya row:", rc);
  for (let i = 0; i < rc; i++) {
    try { await revealBtns.nth(i).click({ timeout: 2000 }); } catch {}
  }
  await page.waitForTimeout(1500);

  const dump = await page
    .evaluate(() => {
      const text = document.body.innerText;
      // collect code-like strings
      const codes = Array.from(document.querySelectorAll("code, input, .value, [class*='value']"))
        .map((e) => (e.value || e.textContent || "").trim())
        .filter((s) => s && s.length > 4);
      return { text: text.slice(0, 4000), codes: codes.slice(0, 40) };
    })
    .catch(() => ({ text: "", codes: [] }));
  log("PAGE TEXT:\n", dump.text);
  log("CODE-LIKE VALUES:", JSON.stringify(dump.codes, null, 2));

  await page.screenshot({ path: "cloudinary-apikeys.png", fullPage: true });
  log("Saved screenshot to cloudinary-apikeys.png");

  await page.waitForTimeout(2000);
  await browser.close();
})();
