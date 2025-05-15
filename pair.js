const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Junior_Ezed,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("prince-junior-baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function PRINCE_JUNIOR_V2_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Code_By_Prince_Junior = Prince_Junior({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "", ""]
             });
             if(!Pair_Code_By_Prince_Junior.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_prince_Junior.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_prince_Junior.ev.on('creds.update', saveCreds)
            Pair_Code_By_prince_Junior.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               let session = await Pair_Code_By_Prince_Junior.sendMessage(Pair_Code_By_Prince_Junior.user.id, { text: 'IMRAN-MD;;;' + b64data });

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
 await Pair_Code_By_Prince_Junior..sendMessage(Pair_Code_By_Prince_Junior.user.id,{text:PRINCE_JUNIOR_V2_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Code_By_Prince_Junior.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    PRINCE_JUNIOR_V2_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await PRINCE_JUNIOR_V2_PAIR_CODE()
});
module.exports = router
