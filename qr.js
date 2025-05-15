const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: prince_junior,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("prince-junior-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function PRINCE_JUNIOR_V2_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_prince_junior = Prince_junior({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_prince_junior.ev.on('creds.update', saveCreds)
			Qr_Code_By_prince_junior.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_prince_junior.sendMessage(Qr_Code_By_prince_junior.user.id, { text: 'IMRAN-MD;;;' + b64data });
	
				   let PRINCE_JUNIOR_V2_TEXT = `

╔════◇
║ *『 WAOW YOU CHOOSE PRINCE JUNIOR V2 』*
║ _You complete first step to making Bot._
╚════════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║ *Owner:* _https://wa.me/+254723245807_
║ *Note :*_Don't provide your SESSION_ID to_
║ _anyone otherwise that can ac`
	 await Qr_Code_By_prince_junior.sendMessage(Qr_Code_By_prince_junior.user.id,{text:PRINCE_JUNIOR_V2_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_prince_junior.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					PRINCE_JUNIOR_V2_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await PRINCE_JUNIOR_V2_QR_CODE()
});
module.exports = router
