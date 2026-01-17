import { readJsonFile } from "./utils/read-json.util";
import { Product } from './1-types';
import { Brand } from './1-types';
/**
 *  Challenge 4: Get Countries with Brands and Amount of Products
 *
 * Create a function that takes an array of brands and products, and returns the countries with the amount of products available in each country.
 *
 * Requirements:
 * - The function should accept an array of Brand objects and an array of Product objects.
 * - Each brand should have a country property.
 * - Each product should have a brandId property that corresponds to the id of a brand.
 * - The function should return an array of objects, each containing a country and the amount of products available in that country.
 * - The amount of products should be calculated by counting the number of products that have a brandId matching the id of a brand in the same country.
 * - The return should be a type that allow us to define the country name as a key and the amount of products as a value.
 */


async function getCountriesWithBrandsAndProductCount(
  brands: Brand[],
  products: Product[],
): Promise<Record<string, number>> {
  const countryCounts: Record<string, number> = {};
  
  for (const brand of brands)
  {
    // Get country from headquarters field
    const parts = brand.headquarters.split(",");
    const country = parts[parts.length - 1].trim();

    // Count products for current brand
    let productCount = 0;

    for (const product of products)
    {
      if (product.brandId === Number(brand.id))  
      {
        productCount++;
      }
    }

    // Add to the hash table
    if (countryCounts[country])
    {
      countryCounts[country] += productCount;
    }
    else
    {
      countryCounts[country] = productCount;
    }
  }

  return countryCounts;
}

/*
Testing 
// main()
async function main() 
{
  // Read brands.json file
  const brands = await readJsonFile<Brand>('./data/brands.json');

  // Read products.json file
  const products = await readJsonFile<Product>('./data/products.json');

  // Get hash table
  let hashTable = await getCountriesWithBrandsAndProductCount(brands, products);

  console.log(hashTable);
}

main();
*/