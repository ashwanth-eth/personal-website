# ashwanthsamuel.com

My personal website. It's plain HTML and CSS with no build step, hosted on Vercel.

## Run it locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Deploy

```bash
npx vercel deploy --prod --scope ashwanth-personal
```

`vercel.json` redirects the old About, Contact, and Writing pages to their new homes.
