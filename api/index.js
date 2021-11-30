import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import geoip from 'geoip-lite';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true });

const trackImg = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

express().get('/api/:source/:id', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'image/gif', 'Content-Length': trackImg.length }).end(trackImg);
    
    //const vm = process.env.COLUMN_NAMES.split(',');
    const vm ="source,subPath,ip,useragent,lng,geo".split(',');
    
    const o = {};
    ({
        params: { source: o[vm[0]], id: o[vm[1]] },
        socket: { remoteAddress: o[vm[2]] },
        headers: { "user-agent": o[vm[3]], "accept-language": o[vm[4]] }
    } = req);
    
    o[vm[5]] = geoip.lookup(o[vm[2]]);
    
    supabase
        .from(process.env.TABLE_NAME).insert(o)
        .then(results => console.log(results.error))
        .catch(e => console.error(e));
}).listen(process.env.port);
