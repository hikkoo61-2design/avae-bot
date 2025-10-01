import 'dotenv/config';
import fetch from "node-fetch";

const shopifyUrl = `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2023-10/products.json`;
const token = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

async function testShopify() {
  try {
    const response = await fetch(shopifyUrl, {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Fout: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Verbinding gelukt, producten:", data.products?.length ?? 0);
  } catch (err) {
    console.error("❌ Shopify fout:", err.message);
  }
}

testShopify();

