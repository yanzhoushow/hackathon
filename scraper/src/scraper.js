const chrome = require("chrome-aws-lambda");
const S3Client = require("aws-sdk/clients/s3");

// const { addExtra } = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
//
// const puppeteerExtra = addExtra(chrome.puppeteer);
// puppeteerExtra.use(StealthPlugin());

const s3 = new S3Client({ region: process.env.S3_REGION });

// default browser viewport size
const defaultViewport = {
  width: 1440,
  height: 1080
};

exports.handler = async event => {
  const request = JSON.parse(event.body)
  const url = request.url

  console.log("url: "+url)

  // launch a headless browser
  const browser = await chrome.puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    defaultViewport
  });

  // open a new tab
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(() => {
	  const newProto = navigator.__proto__
	  delete newProto.webdriver
	  navigator.__proto__ = newProto
  });

  await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36");
  await page.setJavaScriptEnabled(true);
  await page.setDefaultNavigationTimeout(0);

  await page.goto(url);
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  await page.waitForSelector('#cc-username');
  await page.waitForSelector('#cc-user-password');

  await page.type('#cc-username', '<username>');
  await page.type('#cc-user-password', '<password>');
  await page.click('#shared-login-container > form > button')

  // take a screenshot
  const buffer = await page.screenshot()

  // upload the image using the current timestamp as filename
  const result = await s3
    .upload({
      Bucket: process.env.S3_BUCKET,
      Key: `${Date.now()}.png`,
      Body: buffer,
      ContentType: "image/png",
      ACL: "public-read"
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Scraper executed successfully!',
        url: result.Location,
      },
      null,
      2
    ),
  };
};
