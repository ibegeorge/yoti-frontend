import { test, expect } from "@playwright/test";

test("student can submit a fictional report, inspect it and resets on refresh", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Share a concern/ }).click();
  await expect(
    page.getByRole("button", { name: "Continue to details" }),
  ).toBeDisabled();
  await page.getByRole("radio", { name: "Bullying", exact: true }).check();
  await page.getByRole("button", { name: /Anonymous report/ }).click();
  await page.getByRole("button", { name: "Continue to details" }).click();
  await page
    .getByLabel("What happened?")
    .fill("Fictional demo: a student needs support during group activities.");
  await page.getByLabel("When did it happen? (optional)").fill("2026-11-01");
  await page.getByLabel("Where? (optional)").fill("Fictional library");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Submit demo report" }).click();
  await expect(
    page.getByRole("heading", { name: "You’ve taken a first step." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "View my reports" }).click();
  const row = page.getByRole("row").filter({ hasText: "YT-DEMO-" });
  await expect(row).toContainText("Anonymous");
  await row.getByRole("button", { name: "View", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("Fictional library");
  await expect(page.getByRole("dialog")).toContainText("1 Nov 2026");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("row").filter({ hasText: "YT-DEMO-" }),
  ).toHaveCount(0);
});

test("appointment request, duplicate slot protection, and cancellation", async ({
  page,
}) => {
  await page.goto("/#/appointments");
  await expect(
    page.getByRole("button", { name: "Request a demo appointment" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Next dates" }).click();
  await expect(
    page.locator('.date-options button[aria-pressed="true"]'),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "Previous dates" }).click();
  await expect(
    page.locator('.date-options button[aria-pressed="true"]'),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "09:00", exact: true }).click();
  await page.getByRole("button", { name: "Online", exact: true }).click();
  await page
    .getByRole("button", { name: "Request a demo appointment" })
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "Demo appointment requested",
  );
  await page.getByRole("button", { name: "Back to my appointments" }).click();
  await expect(
    page.getByRole("button", { name: "09:00 Unavailable" }),
  ).toBeDisabled();
  const request = page
    .locator(".appointment-item")
    .filter({ hasText: "09:00" });
  await request.getByRole("button", { name: "Cancel request" }).click();
  await page
    .getByRole("button", { name: "Cancel appointment", exact: true })
    .click();
  await expect(request).toContainText("Cancelled");
  await expect(
    page.getByRole("button", { name: "09:00", exact: true }),
  ).toBeEnabled();
});

test("counsellor can manage a case and confirm a pending session", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Demo role").selectOption("counsellor");
  await page.getByRole("link", { name: "Manage cases", exact: true }).click();
  await page
    .getByRole("row")
    .filter({ hasText: "YT-2026-043" })
    .getByRole("button", { name: "View", exact: true })
    .click();
  await page.getByLabel("Update case status").selectOption("resolved");
  await expect(
    page.getByRole("dialog").locator(".detail-heading"),
  ).toContainText("Resolved");
  await page.keyboard.press("Escape");
  await page.getByRole("link", { name: "Counselling", exact: true }).click();
  await page.getByRole("button", { name: "Confirm", exact: true }).click();
  await expect(
    page.locator(".appointment-item").filter({ hasText: "AP-002" }),
  ).toContainText("Confirmed");
});

test("language switch changes navigation, form labels and feedback", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to French" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(
    page.getByRole("heading", { name: /Bonjour, Alex/ }),
  ).toBeVisible();
  await page.getByRole("link", { name: /Partager une préoccupation/ }).click();
  await page.getByRole("radio", { name: "Intimidation", exact: true }).check();
  await page.getByRole("button", { name: "Continuer", exact: true }).click();
  await expect(page.getByLabel("Que s’est-il passé ?")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Envoyer le signalement fictif" }),
  ).toBeVisible();
});

test("admin sees aggregates, period filtering and can export CSV", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("Demo role").selectOption("admin");
  await expect(
    page.getByRole("heading", { name: "A clearer picture of wellbeing." }),
  ).toBeVisible();
  await expect(page.locator("main")).not.toContainText("YT-2026-");
  await page.getByLabel("Reporting period").selectOption("month");
  await expect(
    page.locator(".metric").filter({ hasText: "Total reports" }),
  ).toContainText("02");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export insights" }).click();
  expect((await download).suggestedFilename()).toBe(
    "yoti-demo-aggregated-insights.csv",
  );
});

test("resources search, empty state, article and missing route", async ({
  page,
}) => {
  await page.goto("/#/resources");
  await page.getByRole("textbox", { name: "Search resources" }).fill("zzzz");
  await expect(
    page.getByText("No resources match. Try another search."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page
    .getByRole("link")
    .filter({ hasText: "A little less pressure, one step at a time" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "A little less pressure, one step at a time",
    }),
  ).toBeVisible();
  await page.goto("/#/missing");
  await expect(
    page.getByRole("heading", { name: "Let’s find your way back." }),
  ).toBeVisible();
});

for (const width of [360, 390, 768, 1440]) {
  test(`navigation and no horizontal overflow at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const route of [
      "/",
      "/reports",
      "/reports/new",
      "/appointments",
      "/resources",
      "/insights",
    ]) {
      await page.goto("/#" + route);
      await expect(page.locator("h1")).toBeVisible();
      if (route === "/")
        await page.screenshot({
          path: testInfo.outputPath("overview.png"),
          fullPage: true,
        });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
    }
    await page.goto("/");
    if (width <= 760)
      await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("link", { name: "Wellbeing resources", exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: "A little care for your mind." }),
    ).toBeVisible();
    expect(errors).toEqual([]);
  });
}
