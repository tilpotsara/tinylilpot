import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import requestIp from 'request-ip'
import { createClient } from '@supabase/supabase-js';
import geoip from 'geoip-lite';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true });
const trackImg = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

const app = express();
app.use(requestIp.mw());
app.get('/api/:source/:id', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'image/gif', 'Content-Length': trackImg.length,
        'Cache-Control': 's-max-age=1, stale-while-revalidate=5'
    }).end(trackImg);
    const vm = process.env.COLUMN_NAMES.split(',');
    const o = {
        [vm[0]]: req.params.source,
        [vm[1]]: req.params.id,
        [vm[2]]: req.clientIp,
        [vm[3]]: req.headers["user-agent"],
        [vm[4]]: req.headers["accept-language"],
        [vm[5]]: geoip.lookup(req.clientIp)
    };

    supabase
        .from(process.env.TABLE_NAME).insert(o)
        .then(results => console.log(results.error))
        .catch(e => console.error(e));
});
export default app;
