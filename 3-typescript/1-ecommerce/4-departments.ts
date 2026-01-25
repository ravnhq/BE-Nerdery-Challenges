import { readJsonFile } from "./utils/read-json.util";
import { Product } from './1-types';
import { Department } from './1-types';

type DepartmentWithProductCount = {
  id: number;
  name: string;
  productCount: number;
  productsNames: string[];
};

/**
 *  Challenge 5: Get Departments with Product Count
 *
 * Create a function that takes an array of departments and products, and returns a new array of departments with the amount of products available in each department.
 *
 * Requirements:
 * - The function should accept an array of Department objects and an array of Product objects.
 * - Each department should include the quantity of products available in that department.
 * - The department should be idetified just by its name and id other properties should be excluded.
 * - In the information of the department, include the amount of products available in that department and just the name and id of the department.
 * - Add the name of the products in an array called productsNames inside the department object.
 */

async function getDepartmentsWithProductCount(departments: Department[], products: Product[]): Promise<DepartmentWithProductCount[]> 
{
  const result = [];

  for (const department of departments)
  { 
    const productNames: string[] = [];

    // Count products for current department
    let count = 0;

    for (const product of products)
    {
      if (product.departmentId === department.id)
      {
        count++;
        productNames.push(product.name);
      }
    }

    result.push({
      id: department.id,
      name: department.name,
      productCount: count,
      productsNames: productNames,
    });
  }

  return result;
}

// main()
async function main() 
{
  // Read departments.json file
  const departments = await readJsonFile<Department>('./data/departments.json');

  // Read products.json file
  const products = await readJsonFile<Product>('./data/products.json');

  // Get hash table
  let hashTable = await getDepartmentsWithProductCount(departments, products);

  console.log(hashTable);
}

main();