import { expect, test } from '@playwright/test';

test('visitors can explore shipments, tracking, maps, and the demo account', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.stack ?? error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('AMF Express | Portfolio Demo');
  await page.getByText('Skip', { exact: true }).click();
  await expect(page.getByRole('tab', { name: /Home/ })).toBeVisible();
  await expect(page.getByText(/Portfolio demo/)).toBeVisible();

  await page.getByRole('tab', { name: /Shipment/ }).click();
  await expect(page.getByText('BN260508000004', { exact: true })).toBeVisible();
  await page.getByText('Completed', { exact: true }).first().click();
  await expect(page.getByText('BN260508000006', { exact: true })).toBeVisible();
  await expect(page.getByText('BN260508000004', { exact: true })).toHaveCount(0);

  await page.getByRole('tab', { name: /Tracking/ }).click();
  await page.getByPlaceholder('Tracking Number').fill('BN260513000001');
  await expect(page.getByText('Completed delivery', { exact: true })).toBeVisible();

  await page.getByRole('tab', { name: /Warehouse/ }).click();
  await expect(page.locator('.leaflet-container')).toBeVisible();
  await expect(page.locator('.amf-map-pin')).toHaveCount(4);
  await page.locator('.amf-map-pin[title="Depo"]').click();
  await expect(page.getByPlaceholder('Search by Branch')).toHaveValue('Depo');

  await page.getByRole('tab', { name: /Account/ }).click();
  await page.getByText('Login', { exact: true }).click();
  await page.getByRole('button', { name: 'Try demo account' }).click();
  await page.getByRole('tab', { name: /Account/ }).click();
  await expect(page.getByText('STANDARD', { exact: true })).toBeVisible();
  await page.getByText('My Address', { exact: true }).click();
  await page.getByText('Add New Address', { exact: true }).click();
  await expect(page.locator('.leaflet-container')).toBeVisible();
  await page.getByText('Tap to open full map', { exact: true }).click();
  await expect(page.getByText('Select Location', { exact: true })).toBeVisible();
  const locationMap = page.locator('.leaflet-container').last();
  await locationMap.click({ position: { x: 90, y: 100 } });
  await page.getByText('Select Address', { exact: true }).click();
  await expect(page.getByText('Select Location', { exact: true })).toHaveCount(0);

  const fitsViewport = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(fitsViewport).toBe(true);
  expect(errors).toEqual([]);
});
