import { test, expect } from '@playwright/test';

test('user can edit a random todo', async ({ page }) => {
  // 1) Generate random data
  const newName = `Edit-${Date.now()}`;
  const newDesc = `Desc-${Math.random().toString(36).slice(2,8)}`;
  const wantCompleted = Math.random() < 0.5;

  // 2) Load and pick a random card
  await page.goto('/');
  const cards = page.locator('[data-testid="todo-item"]');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  const randomCard = cards.nth(Math.floor(Math.random() * count));

  // 3) Open edit
  await randomCard.getByRole('button', { name: 'Edit' }).click();

  // 4) Fill in new title & description
  await page.getByRole('textbox', { name: 'Todo Name' }).fill(newName);
  await page.getByRole('textbox', { name: 'Description' }).fill(newDesc);

  // 5) In the edit form, toggle only if needed
  const formCheckbox = page.getByRole('checkbox', { name: 'Mark as completed' });
  const isChecked = await formCheckbox.isChecked();
  if (isChecked !== wantCompleted) {
    await page
      .locator('label')
      .filter({ hasText: 'Mark as completed' })
      .locator('div')
      .click();
  }

  // 6) Save changes
  await page.getByRole('button', { name: 'Save Changes' }).click();

  // 7) Locate the edited card
  const edited = page.locator(
    `[data-testid="todo-item"]:has-text("${newName}")`
  );
  await expect(edited).toHaveCount(1);
  await expect(edited.first()).toBeVisible();

  // 8) Verify description
  await expect(
    edited.first().getByText(newDesc, { exact: true })
  ).toBeVisible();

  // 9) Verify completed state via the checkbox inside the card
  const editedCheckbox = edited.first().getByRole('checkbox');
  if (wantCompleted) {
    await expect(editedCheckbox).toBeChecked();
  } else {
    await expect(editedCheckbox).not.toBeChecked();
  }
});
