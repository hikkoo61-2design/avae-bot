import 'dotenv/config';

const shop  = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_ACCESS_TOKEN;

if (!shop || !token) {
  console.error("❌ Ontbrekende .env waarden.");
  process.exit(1);
}

const url = `https://${shop}/admin/api/2025-01/products.json?limit=5`;

try {
  const res  = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json',
    },
  });

  const body = await res.text();

  if (!res.ok) {
    console.error("❌ HTTP", res.status, res.statusText);
    console.error(body);
    process.exit(1);
  }

  const data = JSON.parse(body);
  console.log("✅ Verbinding gelukt! Aantal producten:", data.products.length);
} catch (e) {
  console.error("❌ Fout:", e.message);
}
