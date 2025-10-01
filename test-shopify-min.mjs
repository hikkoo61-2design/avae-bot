import 'dotenv/config';
import Shopify from 'shopify-api-node';

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE_URL.replace('.myshopify.com', ''),
  accessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN
});

async function run() {
  try {
    const products = await shopify.product.list({ limit: 5 });
    console.log("✅ Verbonden met Shopify!");
    console.log("Aantal producten gevonden:", products.length);
    products.forEach(p => console.log("-", p.title));
  } catch (err) {
    console.error("❌ Fout bij Shopify API:", err.message);
  }
}

run();
