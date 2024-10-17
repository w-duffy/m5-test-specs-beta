import { test, expect } from "@playwright/test";
import { createSpot, signUpUser } from "./utils";
import { spotTileLocator } from "./contants";
test.describe("Feature: Delete a Spot", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.STUDENT_URL!);
  });

  test('Clicking "Delete" on one of the spot tiles on the spot management page opens a confirmation modal popup that should contain: a Title: "Confirm Delete", a Message: "Are you sure you want to remove this spot?", a Red button: "Yes (Delete Spot)", and a Dark grey button: "No (Keep Spot)".', async ({ page }) => {
    await signUpUser(page);
    await createSpot(page);
    await page.goto(`${process.env.STUDENT_URL}/spots/current`);

    await page.getByTestId("spot-tile").first().getByRole('button', { name: 'Delete' }).click();

    const modal = page.getByTestId('delete-spot-modal');
    await expect(modal).toBeVisible();

    await expect(modal.getByRole('heading', { name: 'Confirm Delete' })).toBeVisible();

    await expect(modal.getByText('Are you sure you want to remove this spot?')).toBeVisible();

    const deleteButton = modal.getByRole('button', { name: 'Yes (Delete Spot)' });
    await expect(deleteButton).toBeVisible();

    const cancelButton = modal.getByRole('button', { name: 'No (Keep Spot)' });
    await expect(cancelButton).toBeVisible();

  });

  test('After a spot is deleted, it should be removed from the spot list in the spot management page without refresh', async ({ page }) => {
    await signUpUser(page);
    await createSpot(page);
      await page.goto(`${process.env.STUDENT_URL}/spots/current`);

    await page.getByTestId("spot-tile").first().getByRole('button', { name: 'Delete' }).click();
    await page.getByTestId('delete-spot-modal').getByRole('button', { name: 'Yes (Delete Spot)' }).click();

    await page.waitForTimeout(1000);

    const finalSpotCount = await page.getByTestId("spot-tile").count();
    expect(finalSpotCount).toBe(0);
  });

  test('After a spot is deleted, it should be removed from the spot list in the landing page without refresh', async ({ page }) => {
    await signUpUser(page);
    await createSpot(page);

    await page.goto(`${process.env.STUDENT_URL}/spots/current`);

    const firstSpot = page.getByTestId(spotTileLocator).first();

    // Using React Router's Link instead of a "div with an onClick + navigate" is ideal
    const linkToSpotPage = await firstSpot.getByTestId("spot-link");
        // spotPath should be the path to your spots like `/spots/1` so that should be href's value here
    const spotPath = await linkToSpotPage.getAttribute("href"); // the href here can be added to your ele that has an onClick if you didn't use Link


    await page.getByTestId("spot-tile").first().getByRole('button', { name: 'Delete' }).click();
    await page.getByTestId('delete-spot-modal').getByRole('button', { name: 'Yes (Delete Spot)' }).click();

    await page.waitForTimeout(1000);

    await page.goto(`${process.env.STUDENT_URL}/`);
    const firstSpotCheck = page.getByTestId(spotTileLocator).first();

        // Using React Router's Link instead of a "div with an onClick + navigate" is ideal
        const linkToSpotPage2 = await firstSpotCheck.getByTestId("spot-link");
                // spotPath should be the path to your spots like `/spots/1` so that should be href's value here

        const spotPath2 = await linkToSpotPage2.getAttribute("href"); // the href here can be added to your ele that has an onClick if you didn't use Link

    await expect(spotPath2).not.toBe(spotPath)
  });

  test('The layout and element positioning is equivalent to the wireframes', async ({ page }) => {
    await signUpUser(page);
    await createSpot(page);
        await page.goto(`${process.env.STUDENT_URL}/spots/current`);

    await page.getByTestId("spot-tile").first().getByRole('button', { name: 'Delete' }).click();

    const modal = page.getByTestId('delete-spot-modal');

    const title = await modal.getByRole('heading', { name: 'Confirm Delete' }).boundingBox();
    const message = await modal.getByText('Are you sure you want to remove this spot?').boundingBox();
    const deleteButton = await modal.getByRole('button', { name: 'Yes (Delete Spot)' }).boundingBox();
    const cancelButton = await modal.getByRole('button', { name: 'No (Keep Spot)' }).boundingBox();

    expect(title?.y).toBeLessThan(message?.y!);
    expect(message?.y).toBeLessThan(deleteButton?.y!);
    expect(deleteButton?.y).toBeLessThan(cancelButton?.y!);

    expect(cancelButton?.x).toBe(deleteButton?.x!);
  });
});
