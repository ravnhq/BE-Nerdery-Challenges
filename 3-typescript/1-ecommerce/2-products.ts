import { readJsonFile } from "./utils/read-json.util";
import { Product } from './1-types';

/**
 * Products - Challenge 1: Product Price Analysis
 *
 * Create a function that analyzes pricing information from an array of products.
 *
 * Requirements:
 * - Create a function called `analyzeProductPrices` that accepts an array of Product objects
 * - The function should return an object containing:
 *   - totalPrice: The sum of all product prices
 *   - averagePrice: The average price of all products (rounded to 2 decimal places)
 *   - mostExpensiveProduct: The complete Product object with the highest price
 *   - cheapestProduct: The complete Product object with the lowest price
 *   - onSaleCount: The number of products that are currently on sale
 *   - averageDiscount: The average discount percentage for products on sale (rounded to 2 decimal places)
 * - Prices should be manage in regular prices and not in sale prices
 * - Use proper TypeScript typing for parameters and return values
 * - Implement the function using efficient array methods
 *
 *
 **/

async function analyzeProductPrices(products: Product[]): Promise<{
  totalPrice: number; 
  averagePrice: number; 
  mostExpensiveProduct: Product;
  cheapestProduct: Product;
  onSaleCount: number;
  averageDiscount: number;
}> 
{
  let totalPrice = 0;
  let mostExpensiveProduct = products[0];
  let cheapestProduct = products[0];
  let onSaleCount = 0;
  let totalDiscount = 0;

  for (const currentProduct of products)
  {
    // Calculate sum of all prices
    totalPrice += currentProduct.price;

    // Calculate most expensive product
    if (currentProduct.price > mostExpensiveProduct.price)
    {
      mostExpensiveProduct = currentProduct;
    }
    
    // Calculate cheapest product
    if (currentProduct.price < cheapestProduct.price)
    {
      cheapestProduct = currentProduct;
    }

    if (currentProduct.onSale)
    {
      onSaleCount++;
      totalDiscount += ((currentProduct.price - currentProduct.salePrice) / currentProduct.price) * 100;
    }
  }

    // Calculate average price
    const averagePrice = Number((totalPrice / products.length).toFixed(2));

    // Calculate average discount
    const averageDiscount = Number((totalDiscount / onSaleCount).toFixed(2));

    return { totalPrice, averagePrice, mostExpensiveProduct, cheapestProduct, onSaleCount, averageDiscount };
}



/**
 *  Challenge 2: Build a Product Catalog with Brand Metadata
 *
 * Create a function that takes arrays of Product and Brand, and returns a new array of enriched product entries. Each entry should include brand details embedded into the product, under a new brandInfo property (excluding the id and isActive fields).
 *  e.g
 *  buildProductCatalog(products: Product[], brands: Brand[]): EnrichedProduct[]

  Requirements:
  - it should return an array of enriched product entries with brand details
  - Only include products where isActive is true and their corresponding brand is also active.
  - If a product’s brandId does not match any active brand, it should be excluded.
  - The brandInfo field should include the rest of the brand metadata (name, logo, description, etc.).
 */

async function buildProductCatalog(
  products: unknown[],
  brands: unknown[],
): Promise<unknown[]> {
  return [];
}



/**
 * Challenge 3: One image per product
 *
 * Create a function that takes an array of products and returns a new array of products, each with only one image.
 *
 * Requirements:
 * - The function should accept an array of Product objects.
 * - Each product should have only one image in the images array.
 * - The image should be the first one in the images array.
 * - If a product has no images, it should be excluded from the result.
 * - The function should return an array of Product objects with the modified images array.
 * - Use proper TypeScript typing for parameters and return values.
 */



/**
 * Challenge 3: One image per product
 *
 * Create a function that takes an array of products and returns a new array of products, each with only one image.
 *
 * Requirements:
 * - The function should accept an array of Product objects.
 * - Each product should have only one image in the images array.
 * - The image should be the first one in the images array.
 * - If a product has no images, it should be excluded from the result.
 * - The function should return an array of Product objects with the modified images array.
 * - Use proper TypeScript typing for parameters and return values.
 */

async function filterProductsWithOneImage(products: Product[]): Promise<Product[]> 
{
  const productsWithImages = products.filter(currentProduct => currentProduct.images.length > 0);

  const updatedProducts = productsWithImages.map(currentProduct => {
    return {
      ...currentProduct,
      images: [currentProduct.images[0]]
    };
  });

  return updatedProducts;
}


















// main()
async function main() 
{
  const products = await readJsonFile<Product>('./data/products.json');
  
  const result = await filterProductsWithOneImage(products);

  console.log(result[0].images);
}

main();