import type { NextApiRequest, NextApiResponse } from 'next';

async function getBrowser() {
  const isVercel = Boolean(process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV);
  if (isVercel) {
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteerCore = (await import('puppeteer-core')).default;

    return await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    const puppeteer = (await import('puppeteer')).default;
    return await puppeteer.launch({ headless: true });
  }
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  const body = request.body as {
    resumeData?: Record<string, unknown>;
    templateId?: string;
  } & Record<string, unknown>;
  const resumeData = body.resumeData ?? body;
  const templateId = body.templateId ?? 'modern';
  const protocolHeader = request.headers['x-forwarded-proto'];
  const protocol = Array.isArray(protocolHeader) ? protocolHeader[0] : protocolHeader;
  const baseUrl = `${protocol || 'http'}://${request.headers.host || 'localhost:3000'}`;
  const browser = await getBrowser();

  try {
    const page = await browser.newPage();
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 1,
    });

    await page.evaluateOnNewDocument((selectedTemplateId) => {
      localStorage.setItem('selectedTemplateId', selectedTemplateId);
    }, templateId);

    await page.goto(`${baseUrl}/builder`, {
      waitUntil: 'networkidle0',
    });

    await page.evaluate((data) => {
      window.postMessage({ type: 'LOAD_RESUME_DATA', payload: data }, '*');
    }, resumeData);

    await new Promise((resolve) => setTimeout(resolve, 500));

    await page.addStyleTag({
      content: `
        html, body, #__next {
          width: 210mm !important;
          min-width: 210mm !important;
          height: auto !important;
          min-height: 296mm !important;
          overflow: visible !important;
          margin: 0 !important;
        }
        #__next > div,
        main,
        main > div,
        main > div > div {
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }
      `,
    });

    await page.evaluate(async () => {
      const waitForFonts = Promise.race([
        document.fonts.ready,
        new Promise<void>((resolve) => setTimeout(resolve, 5000)),
      ]);
      await waitForFonts;

      await Promise.all(
        Array.from(document.images)
          .filter((image) => !image.complete)
          .map(
            (image) =>
              new Promise<void>((resolve) => {
                const finish = () => resolve();
                image.addEventListener('load', finish, { once: true });
                image.addEventListener('error', finish, { once: true });
                setTimeout(finish, 5000);
              })
          )
      );
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
    await page.emulateMediaType('print');

    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      printBackground: true,
      preferCSSPageSize: true,
    });

    response.setHeader('Content-Type', 'application/pdf');
    response.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    response.setHeader('Content-Length', pdf.length.toString());

    response.status(200).end(pdf);
  } finally {
    await browser.close();
  }
}
