const fs = require('fs');

    // Explain how to use the CLI app
    if (!process.argv[2]) {
    console.log(`
    Wishlist Tracker CLI

    How to use the CLI app:
    node wishlist.js list | This command shows the items in the list
    node wishlist.js add "Item Name" price "Store" | This command adds an item to the list
    node wishlist.js update id "Item Name" price "Store"
    node wishlist.js delete id

    Examples:
    List items | node wishlist.js list 
    Add item | node wishlist.js add "Phone" 1000 "Siman"
    Update item: node wishlist.js update 1 "Phone" 500 "Ishop"
    Delete item:  node wishlist.js delete 1
    `);
    process.exit();
    }

// Read the json file
const data = fs.readFileSync('wishlist.json', 'utf8');

// Parse json into an array
let wishlist = JSON.parse(data);

// Read cli command
const command = process.argv[2];

// list command similar to a GET request
if (command === 'list')
{
    wishlist.forEach(item => {
        console.log(`${item.id} | ${item.name} | $${item.price} | ${item.store}`);
    });
}

// add command similar to a POST request
if (command === 'add')
{
    let name = process.argv[3];
    let price = Number(process.argv[4]);
    let store = process.argv[5];

    let newItem = {
        id: wishlist.length + 1,
        name,
        price,
        store
    };

    wishlist.push(newItem);
    
    fs.writeFileSync('wishlist.json', JSON.stringify(wishlist, null, 2));
    console.log('Item added');
}

// update command similar to a PUT request
if (command === 'update')
{
    let id = Number(process.argv[3]);
    let name = process.argv[4];
    let price = Number(process.argv[5]);
    let store = process.argv[6];

    let item = wishlist.find(i => i.id === id);

    if (!item) 
    {
        console.log('Item not found');
        return;
    }

    item.name = name;
    item.price = price;
    item.store = store;

    fs.writeFileSync('wishlist.json', JSON.stringify(wishlist, null, 2));
    console.log('Item updated');
}

// delete command similar to a DELETE request
if (command === 'delete')
{
    const id = Number(process.argv[3]);

    const originalLength = wishlist.length;
    wishlist = wishlist.filter(item => item.id !== id);

    if (wishlist.length === originalLength)
    {
        console.log('Item not found');
    }
    else
    {
        fs.writeFileSync('wishlist.json', JSON.stringify(wishlist, null, 2));
        console.log(`Item ${id} deleted`);
    }
}