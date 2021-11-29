import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import requestIp from 'request-ip'
import { createClient } from '@supabase/supabase-js';
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
async function upload(ip, sourc) {
    const { data, error } = await supabase
        .from('trackevents')
        .insert([{ ipaddress: ip, source: sourc }]);
    console.log(error);
}
const trackImg = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
app.get('/api/:campaign/:id', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': trackImg.length
    })
    console.log(`${req.method} ${req.url} - ${req.socket.remoteAddress} - ${req.clientIp}`);
    upload(req.clientIp || req.socket.remoteAddress, req.path);
    res.end(trackImg)
})
app.listen(process.env.port, () => {
    console.log(`listening at http://localhost:${process.env.port}`)
})
