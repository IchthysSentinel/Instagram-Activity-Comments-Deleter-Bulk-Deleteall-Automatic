# instagram-comment-deleter-bulk-deleteall-automatic
Automatically bulk delete your Instagram comments using a simple browser script.


# Instagram Comment Deleter 🧹

A simple JavaScript tool to help you bulk delete your own comments from Instagram's activity page using Chrome Developer Tools.

> ⚠️ For educational and personal use only. Use responsibly and at your own risk.

---

## 🚀 Features

- Bulk delete your Instagram comments
- Works directly from your browser — no installation required
- Fast and easy to use

---

## 🛠️ How to Use (Chrome Desktop)

1. Go to [https://www.instagram.com/your_activity/interactions/comments](https://www.instagram.com/your_activity/interactions/comments)
2. Make sure you're logged in to your Instagram account( use chrome browser without any extensions running)
3. Press `F12` or right-click and select **Inspect** to open **Developer Tools**
4. Click on the **Console** tab
5. Copy the contents of [`script.js`](./script.js) and paste it into the Console
6. Hit `Enter` and let it run
7. It will automatically:
   - Click the **Select** button
   - Select your comments in batches
   - Delete them with confirmation
   - Repeat until all are gone ✅
  
   -🚨 🚧 ⚠️ I successfully deleted 4,600 comments automatically. To ensure the process runs smoothly, disable all power management settings — including screen dimming, backlight timeout, and screensavers — as they may interrupt the script. If you see an error message like “Something went wrong. There was a problem with your request,” just click OK and wait — the script will continue deleting comments automatically.

---

## 📦 Code 

You can find the full script in [`script.js`](./script.js)

---

## 🧾 License

MIT License — use freely, modify, share. Just don’t abuse it.

---

## 🙋‍♀️ Disclaimer

- This script is **not affiliated with Instagram**
- Use at your own risk — Instagram may temporarily limit your account if you perform actions too quickly
- Always test on a small batch before running on your full history

---

## ❤️ Contributing

Pull requests welcome. If Instagram’s interface changes, feel free to help keep it up to date!

