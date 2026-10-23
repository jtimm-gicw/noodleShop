# NoodleShop — PowerShell Live Demo Launch Guide

**Goal:** Run the NoodleShop backend and Expo app from **Windows PowerShell**, then open the app on an Android phone.

> **Important:** Use **Windows PowerShell**, not Ubuntu/WSL, for the commands in this guide. Keep the backend and Expo running in **separate terminal windows**.

## Before class — Quick checklist

- [ ] Windows computer and Android phone are connected to a network that allows them to communicate.
- [ ] PostgreSQL is running in Ubuntu/WSL, with the existing `tuktuk_noodles` database accessible from Windows.
- [ ] `C:\Users\jtimm\mobile-noodle\server\.env` exists and contains working `DATABASE_URL`, `JWT_SECRET`, and `PORT=3001` values. **Never show this file or its secrets to students.**
- [ ] Expo Go is installed on the Android phone.
- [ ] The app's `src\api\client.js` points to the **current Windows Wi-Fi IPv4 address** on port `3001`.

## Step 1 — Open Windows PowerShell

Open **Start → PowerShell**. A Windows prompt looks similar to:

```powershell
PS C:\Users\jtimm>
```

**Do not run the commands in an Ubuntu prompt** such as `➜ mobile-noodle`.

## Step 2 — Confirm your computer's Wi-Fi IP address

In **PowerShell Window 1**, run:

```powershell
ipconfig
```

Under **Wireless LAN adapter Wi-Fi**, find **IPv4 Address**.

- Previously working example: `10.20.217.134`
- **Use the current address**, because it may change between classes.

In VS Code, open `C:\Users\jtimm\mobile-noodle\src\api\client.js`. Confirm the API base URL uses:

```text
http://YOUR_CURRENT_WINDOWS_IP:3001
```

For example, **only if your current IP is still `10.20.217.134`**:

```text
http://10.20.217.134:3001
```

**Teacher note:** Change only the host/IP portion of the existing API configuration; keep the rest of the code as written. Save with **Ctrl + S**.

## Step 3 — Start the backend server

In **PowerShell Window 1**, run:

```powershell
cd C:\Users\jtimm\mobile-noodle\server
npm.cmd run dev
```

**Look for:**

```text
API on port 3001
```

**Keep Window 1 open.** It is running the Express API and connecting to PostgreSQL in WSL.

## Step 4 — Check that the backend is working

Open **PowerShell Window 2** and run:

```powershell
Invoke-RestMethod http://127.0.0.1:3001/health
```

**Expected:** The result shows `ok` as `True`.

Next, on your **Android phone**, open Chrome and visit:

```text
http://YOUR_CURRENT_WINDOWS_IP:3001/health
```

Example if your IP is still `10.20.217.134`:

```text
http://10.20.217.134:3001/health
```

**Expected on the phone:**

```json
{"ok":true}
```

**Teacher note:** This confirms the phone can reach the backend over the network. It does not yet prove that signup/signin works.

## Step 5 — Start Expo

In **PowerShell Window 2**, run:

```powershell
cd C:\Users\jtimm\mobile-noodle
npx.cmd expo start --clear --lan
```

Wait for the Expo QR code and Metro startup message.

**Keep Window 2 open.** It is serving the React Native app.

## Step 6 — Open NoodleShop on Android

1. Make sure the Android phone is connected to the appropriate Wi-Fi network.
2. Open **Expo Go**.
3. Scan the QR code shown in PowerShell Window 2 (or open the project from Expo Go).
4. Wait for the **NoodleShop** screen to appear.

**Teacher note:** If Expo Go opens an old starter project, return to Expo Go and scan the QR code from the **`mobile-noodle`** project again.

## Step 7 — Demonstrate signup and signin

1. Create a **test account** using a non-sensitive demo email and password.
2. Confirm the app completes signup without a network error.
3. Sign out.
4. Sign back in with the test account.
5. Explain the flow:

```text
Android NoodleShop app
        ↓ HTTP requests
Windows Express API (port 3001)
        ↓ Sequelize
PostgreSQL in Ubuntu/WSL (port 5432)
        ↓
User data stored in tuktuk_noodles
```

**Say to students:** “The phone runs our app, Express handles requests, and PostgreSQL stores our data.”

## Step 8 — Stop the demo

When finished:

- In the **Expo PowerShell window**, press **Ctrl + C**.
- In the **backend PowerShell window**, press **Ctrl + C**.

---

## Quick restart — Commands to use next class

**PowerShell Window 1 — Backend:**

```powershell
cd C:\Users\jtimm\mobile-noodle\server
npm.cmd run dev
```

**PowerShell Window 2 — Expo:**

```powershell
cd C:\Users\jtimm\mobile-noodle
npx.cmd expo start --clear --lan
```

**Before scanning:** Check `ipconfig` and confirm `src\api\client.js` has the current Windows IP.

## Troubleshooting — Fast checks

| Problem | What to check |
|---|---|
| `password authentication failed for user "noodle_user"` | Verify the database password in `server\.env` matches the PostgreSQL user's password. Do not show or share it. |
| `DATABASE_URL` is undefined | Confirm `server\.env` exists in the **Windows** project, not only the WSL project. |
| Backend does not show `API on port 3001` | Read the error in PowerShell Window 1; confirm PostgreSQL is running and reachable. |
| `/health` works on Windows but not on Android | Confirm the phone is on the right network, the IP is current, and firewall/network rules permit port `3001`. |
| Android says `Failed to connect to 172.18...:3001` | Replace the old **WSL** IP in `src\api\client.js` with the current **Windows Wi-Fi** IP. |
| Expo Go cannot open the project | Confirm Expo is running from `C:\Users\jtimm\mobile-noodle` and the phone can reach the computer on the network. |
| `npm` is blocked by PowerShell execution policy | Use `npm.cmd` and `npx.cmd`, as shown in this guide. |

**Safety reminder:** Do not commit `server\.env` to GitHub. Keep passwords and JWT secrets off the projector.
