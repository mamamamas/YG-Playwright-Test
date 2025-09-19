# YG-Playwright-Test

📌 Reference
GitHub Repo: YG-Playwright-Test
🛠️ How to Test
 1. Clone the repository (in VS Code Terminal or any terminal)
   git clone <https://github.com/mamamamas/YG-Playwright-Test.git >
then
  cd <repo-folder>
 2. Download the .env file
👉 Download here
- Put it inside the project folder.
- Make sure the .env file is in the root (same level as package.json).

 3.   Install dependencies
- npm ci

 4.   Install Playwright browsers
- npx playwright install --with-deps   

 5.   Run tests
    Run all tests:
       - npx playwright test
       - Run one specific test file (example MultiDayEvent.spec.js):
       - npx playwright test CreateEvents/Google/MultiDayEvent.spec.js
👉 Options:
--headed → run with browser UI (visual).
--headless → run without browser UI (faster).

Example:
   - npx playwright test CreateEvents/Google/MultiDayEvent.spec.js --headed
   - npx playwright test CreateEvents/Google/MultiDayEvent.spec.js --headless

 6.  Check the test report
- npx playwright show-report