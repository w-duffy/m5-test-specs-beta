export function createUniqueUser() {
  return {
    firstName: "Fakey",
    lastName: "McFakeFake",
    email: `${generateUniqueUsername()}@test.com`,
    username: generateUniqueUsername(),
    password: "secret password",
  };
}
function generateUniqueUsername() {
  const letters = Array.from({ length: 6 }, () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  ).join("");
  const numbers = Math.floor(Math.random() * 9000) + 1000;
  const timestamp = Date.now();
  return `${letters}${numbers}${timestamp}`;
}


export async function signUpUser(page) {
  const user = createUniqueUser();
  await page.goto(process.env.STUDENT_URL!);
  await page.getByTestId("user-menu-button").click();
  await page.getByText("Sign Up").click();
  await page.getByTestId("first-name-input").click();
  await page.getByTestId("first-name-input").fill(user.firstName);
  await page.getByTestId("first-name-input").press("Tab");
  await page.getByTestId("last-name-input").fill(user.lastName);
  await page.getByTestId("last-name-input").press("Tab");
  await page.getByTestId("email-input").fill(user.email);
  await page.getByTestId("email-input").press("Tab");
  await page.getByTestId("username-input").fill(user.username);
  await page.getByTestId("username-input").press("Tab");
  await page.getByTestId("password-input").fill("password");
  await page.getByTestId("password-input").press("Tab");
  await page.getByTestId("confirm-password-input").fill("password");
  await page.getByTestId("form-sign-up-button").click();
}


export async function createSpot(page) {
  const dummyData = createUniqueUser();

  await page.getByRole("link", { name: "Create a New Spot" }).click();
  await page.getByPlaceholder("Country").click();
  await page.getByPlaceholder("Country").fill("Middle Earth");
  await page.getByPlaceholder("Street Address").click();
  await page
    .getByPlaceholder("Street Address")
    .fill(`Fake Street ${dummyData.username}`);
  await page.getByPlaceholder("City").click();
  await page.getByPlaceholder("City").fill("Fake City");
  await page.getByPlaceholder("State").click();
  await page.getByPlaceholder("State").fill("Texas");
  await page.getByPlaceholder("Please write at least 30").click();
  await page
    .getByPlaceholder("Please write at least 30")
    .fill("This is a great fake spot for testing reviews");
  await page.getByPlaceholder("Name of your spot").click();
  await page
    .getByPlaceholder("Name of your spot")
    .fill(`Fake Spot ${dummyData.username}`);
  await page.getByPlaceholder("Price per night (USD)").click();
  await page.getByPlaceholder("Price per night (USD)").fill("100");
  await page.getByPlaceholder("Preview Image URL").click();
  await page
    .getByPlaceholder("Preview Image URL")
    .fill(
      "https://www.jamesedition.com/stories/wp-content/uploads/2022/03/mansions_main_fin.jpg"
    );
  await page.getByPlaceholder("Image URL").nth(1).click();
  await page
    .getByPlaceholder("Image URL")
    .nth(1)
    .fill(
      "https://www.jamesedition.com/stories/wp-content/uploads/2022/03/mansions_main_fin.jpg"
    );
  await page.getByPlaceholder("Image URL").nth(2).click();
  await page
    .getByPlaceholder("Image URL")
    .nth(2)
    .fill(
      "https://www.jamesedition.com/stories/wp-content/uploads/2022/03/mansions_main_fin.jpg"
    );
  await page.getByPlaceholder("Image URL").nth(3).click();
  await page
    .getByPlaceholder("Image URL")
    .nth(3)
    .fill(
      "https://www.jamesedition.com/stories/wp-content/uploads/2022/03/mansions_main_fin.jpg"
    );
  await page.getByPlaceholder("Image URL").nth(4).click();
  await page
    .getByPlaceholder("Image URL")
    .nth(4)
    .fill(
      "https://www.jamesedition.com/stories/wp-content/uploads/2022/03/mansions_main_fin.jpg"
    );
  await page.getByRole("button", { name: "Create Spot" }).click();
}


export async function logOutUser(page) {
  await page.getByTestId("user-menu-button").click();
  await page.getByRole("button", { name: "Log Out" }).click();
}


export async function loginDemoUser(page) {
  await page.getByTestId("user-menu-button").click();

  await page.getByText("Log in").click();
  await page.getByTestId("credential-input").fill("demo@user.io");
  await page.getByTestId("password-input").fill("password");
  await page.getByTestId("login-button").click();
}


export async function clearSession(page) {
  await page.context().clearCookies();
  await page.context().clearPermissions();
  await page.evaluate(() => localStorage.clear());
}
