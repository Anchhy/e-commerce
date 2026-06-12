import { test, expect } from '@playwright/test';

test('Sorting products', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.locator('.product_sort_container').selectOption('lohi');

  const prices = await page.locator('.inventory_item_price').allInnerTexts();
  const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));
  
  expect(numericPrices[0]).toBe(Math.min(...numericPrices));
});

test('Logout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.getByRole('button', { name: /Open Menu/i }).click();
  await page.locator('#logout_sidebar_link').click();

  await expect(page.locator('#login-button')).toBeVisible();
});
