const { chromium } = require('playwright');

const urls = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=14',
  'https://sanand0.github.io/tdsdata/js_table/?seed=15',
  'https://sanand0.github.io/tdsdata/js_table/?seed=16',
  'https://sanand0.github.io/tdsdata/js_table/?seed=17',
  'https://sanand0.github.io/tdsdata/js_table/?seed=18',
  'https://sanand0.github.io/tdsdata/js_table/?seed=19',
  'https://sanand0.github.io/tdsdata/js_table/?seed=20',
  'https://sanand0.github.io/tdsdata/js_table/?seed=21',
  'https://sanand0.github.io/tdsdata/js_table/?seed=22',
  'https://sanand0.github.io/tdsdata/js_table/?seed=23'
];

(async () => {
  let grandTotal = 0;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const url of urls) {
    await page.goto(url);
    // Wait for at least one table to render
    await page.waitForSelector('table');
    const numbers = await page.$$eval('table td', tds => 
      tds.map(td => td.textContent.trim())
         .filter(txt => /^\d+(\.\d+)?$/.test(txt))
         .map(Number)
    );
    const total = numbers.reduce((a, b) => a + b, 0);
    grandTotal += total;
  }
  console.log('Final total:', grandTotal);
  await browser.close();
})();
