/**
 * Prints the public HTTPS URL from a running ngrok agent (local API :4040).
 * Run after: ngrok http 3000
 */
const API = "http://127.0.0.1:4040/api/tunnels";

async function main() {
  let res;
  try {
    res = await fetch(API, { signal: AbortSignal.timeout(3000) });
  } catch {
    console.error(
      "Could not reach ngrok API at 127.0.0.1:4040.\n" +
        "Start a tunnel first: ngrok http 3000",
    );
    process.exit(1);
  }

  if (!res.ok) {
    console.error(`ngrok API returned ${res.status}. Is ngrok running?`);
    process.exit(1);
  }

  const data = await res.json();
  const tunnels = data.tunnels ?? [];
  const https = tunnels.find((t) => t.proto === "https");

  if (!https?.public_url) {
    console.error(
      "No HTTPS tunnel found. Check ngrok output or http://127.0.0.1:4040",
    );
    process.exit(1);
  }

  console.log(https.public_url);
}

main();
