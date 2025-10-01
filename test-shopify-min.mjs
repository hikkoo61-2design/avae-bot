cat > test-shopify-min.mjs << 'EOF'
import 'dotenv/config';

const shop  = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_ACCESS_TOKEN;

if (!shop || !token) {
  console.error("❌ Ontbrekende .env waarden.");
  console.error("   SHOPIFY_STORE_DOMAIN =", shop);
  console.error("   SHOPIFY_ACCESS_TOKEN  =", token ? "(aanwezig)" : "(LEEG)");
  console.error("→ Vul .env in, bv:\nSHOPIFY_STORE_DOMAIN=t4ddwk-gc.myshopify.com\nSHOPIFY_ACCESS_TOKEN=shpat_...");
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
  const count = Array.isArray(data.products) ? data.products.length : 0;
  console.log("✅ Verbinding gelukt! Aantal producten:", count);
} catch (e) {
  console.error("❌ Fout:", e.message);
  console.error("Tips:");
  console.error("- Domein exact als myshopify-domein zonder https://");
  console.error("- Token begint met shpat_ en app is geïnstalleerd met read_products");
}
EOF
