import express from 'express'
import requestIp from 'request-ip'
const app = express()
app.use(requestIp.mw())

const trackImg = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
const port = 80;
app.get('/api/:campaign/:id', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'image/gif',
        'Content-Length': trackImg.length
    })
    console.log(`${req.method} ${req.url} - ${req.socket.remoteAddress} - ${req.clientIp}`);
    res.end(trackImg)
})
app.get('*', (req, res) => {
    res.redirect('https://www.google.com');
});
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
