# tinylilpot - Simple email tracking

Tiny email tracker using node.js & express.

- Hosting - [Vercel](https://vercel.com/)
- Database - [Supabase](https://supabase.com/)


## Enviornment variables

`NEXT_PUBLIC_SUPABASE_URL`="YOUR SUPABASE URL"

`SUPABASE_SERVICE_ROLE_KEY`="YOUR SUPABASE SERVICE KEY"

`TABLE_NAME`="SUPABASE TABLE NAME"

`COLUMN_NAMES`="SUPABASE TABLE COLUMNS" **seperated by a ','**

Order should be: "campaign,subPath,ip,useragent,languages,geolocation"

## Usage

Inject `<img src>` tag in email body

Replace `SERVERADDRESS` with your host address e.g. `myemailtracker.vercel.app`.

Set rest of the path as your requirements e.g. `campaign` with `myfirstpot`.
```html

<img src="https://[SERVERADDRESS]/api/[campaign]/[*]" height="1" width="1">
```
