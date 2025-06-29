import { test, expect } from '@playwright/test';

test('user can add a todo', async ({ page }) => {
  // pick a truly unique title
  const uniqueTitle = `Todo-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;

  // 1. load the app
  await page.goto('/');

  // 2. focus the input and type every character so your React listeners fire
  const input = page.getByPlaceholder('What needs to be done?');
  await input.click();
  await input.pressSequentially(uniqueTitle);

  // 3. submit with Enter
  await input.press('Enter');

  // 4. wait for the new element to appear (give it up to 10 s in case network is slow)
  const selector = `[data-testid="todo-item"]:has-text("${uniqueTitle}")`;
  await page.waitForSelector(selector, { timeout: 10_000 });

  // 5. assert exactly one such card exists and is visible
  const newCard = page.locator(selector);
  await expect(newCard).toHaveCount(1, { timeout: 10_000 });
  await expect(newCard).toBeVisible();
});
