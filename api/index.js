import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import requestIp from 'request-ip'
import { createClient } from '@supabase/supabase-js';
import geoip from 'geoip-lite';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    })
const app = express()
app.use(requestIp.mw())
async function upload(opened) {
    const { data, error } = await supabase
        .from('trackevents')
        .insert([opened]);
    console.log(error);
}
const trackImg = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
app.get('/api/:campaign/:id', (req, res) => {
    const IP = req.clientIp || req.socket.remoteAddress;
    console.log(`${req.method} ${req.url} - ${IP}`);

    const visit = {
        ipaddress: IP, source: req.path,
        client: req.headers["user-agent"],
        lng: req.headers["accept-language"],
    }
    if (IP) {
        const geo = geoip.lookup(IP);
        if (geo)
            visit.geo = JSON.stringify(geo);
    }

    upload(visit);
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': trackImg.length
    })
    res.end(trackImg)
})
app.listen(process.env.port, () => {
    console.log(`listening at http://localhost:${process.env.port}`)
})
