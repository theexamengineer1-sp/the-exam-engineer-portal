# THE EXAM ENGINEER — Online Test Portal

A free, responsive, dark-themed portal for organising GitHub-hosted practice tests by examination and subject, with search and separate English/Hindi links.

## Files

- `index.html` — portal structure
- `styles.css` — dark, mobile-friendly design
- `tests.js` — **the only file you normally need to edit when adding tests**
- `app.js` — search, filters and test-card rendering

## 1. Add or update test links

Open `tests.js`. Each test is one object, for example:

```js
{
  exam: "RRB JE CBT-2",
  subject: "Environment",
  title: "Air Pollution — Test 02",
  description: "Questions on sources, effects and control of air pollution.",
  language: "Both",
  englishUrl: "https://your-english-test-link",
  hindiUrl: "https://your-hindi-test-link"
}
```

Replace the example URLs with your actual GitHub test URLs. If you have only one language version, leave the other URL empty (`""`). To add another test, copy one complete object, paste it inside the `TESTS` array (separated by a comma), and edit its details.

Supported language values: `"Both"`, `"English"`, or `"Hindi"`.

## 2. Publish free using GitHub Pages

1. Sign in to GitHub.
2. Create a **new public repository** named `the-exam-engineer-portal`.
3. Upload all five files from this folder to the repository's root.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then click **Save**.
7. Wait a few minutes. GitHub will show your live website address in the Pages section. It will look like:
   `https://YOUR-GITHUB-USERNAME.github.io/the-exam-engineer-portal/`

## 3. Share with aspirants

Pin the website link in your Telegram channel. The portal is public, so anyone with the link can open it. You can add or update tests later by editing `tests.js` on GitHub; the live portal will update after GitHub Pages redeploys.

## Important

- The links in the supplied `tests.js` are placeholders. Replace them before announcing the portal.
- The portal does not host test content; it links out to your existing GitHub tests.
- Public GitHub Pages sites are visible to everyone. Do not put private answer keys or restricted material in this repository.
- Google Fonts is used for typography; the page remains usable if the font service is unavailable.
