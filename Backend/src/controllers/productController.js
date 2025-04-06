const db = require("../config/db");
const { createCanvas, loadImage } = require("canvas");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
// Create a new product

// exports.createProduct = (req, res) => {
//   console.log("Request Body:", req.body);

//   const {
//     name,
//     category, // You may not need this since you are fetching category by name
//     min_rate,
//     max_rate,
//     traded_quantity,
//     city,
//     variety

//     // last_trading_day_rate,
//     // percentage_variation,
//     // highest_rate,
//     // lowest_rate,
//     // price_date,
//     // city_id, // Same as above, may not be needed if fetching city by name
//     // category, // Category name passed in the request
//     // city, // City name passed in the request
//   } = req.body;

//   // const formatDate = (date) => date.toISOString().slice(0, 10);
//   // const finalPriceDate =
//   //   price_date && price_date.trim() !== ""
//   //     ? price_date
//   //     : formatDate(new Date());

//   // const insertProduct = `
//   //   INSERT INTO products (
//   //     id, name, category_id, city_id, price, weight, in_stock,
//   //     updated_at, min_rate, max_rate, traded_quantity,
//   //     last_trading_day_rate, percentage_variation,
//   //     highest_rate, lowest_rate, price_date, category, city
//   //   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   // `;
//   const insertProduct = `
//     INSERT INTO products (
//        product_name, category_name, city_name, min_rate, max_rate, traded_quantity, variety
//      ) VALUES ( ?, ?, ?, ?, ?, ?, ?)
//   `;
//   // Define the SQL query for getting the product details
//   // const getProductDetails = `
//   //   SELECT p.id, p.name, p.category_id, c.name AS category, 
//   //          p.city_id, ci.name AS city, p.price, p.weight, 
//   //          p.in_stock, p.updated_at, p.min_rate, p.max_rate, 
//   //          p.traded_quantity, p.last_trading_day_rate, 
//   //          p.percentage_variation, p.highest_rate, p.lowest_rate, 
//   //          p.price_date 
//   //   FROM products p 
//   //   LEFT JOIN categories c ON p.category_id = c.id 
//   //   LEFT JOIN cities ci ON p.city_id = ci.id 
//   //   WHERE p.id = ?
//   // `;
//   const getProductDetails = `
//  SELECT product_id, product_name, category_name AS category, 
//        city_name AS city, min_rate, max_rate, 
//        traded_quantity, variety
// FROM products
// WHERE product_id = ?;

// `;
//   const getCategoryId = "SELECT category_id FROM categories WHERE category_name = ?";
//   const getCityId = "SELECT city_id FROM cities WHERE city_name = ?";

//   console.log(getCategoryId, getCityId);

//   // Fetch Category ID
//   db.query(getCategoryId, [category], (err, categoryResult) => {
//     if (err) {
//       console.error("Category Query Error:", err);
//       return res.status(500).json({
//         message: "Database error while fetching category",
//         error: err.message,
//       });
//     }

//     if (categoryResult.length === 0) {
//       return res
//         .status(400)
//         .json({ message: `Category '${category}' not found.` });
//     }

//     const categoryId = categoryResult[0].category_id;
//     console.log("Fetched Category ID:", categoryId);

//     // Fetch City ID
//     db.query(getCityId, [city], (err, cityResult) => {
//       if (err) {
//         console.error("City Query Error:", err);
//         return res.status(500).json({
//           message: "Database error while fetching city",
//           error: err.message,
//         });
//       }

//       if (cityResult.length === 0) {
//         return res.status(400).json({ message: `City '${city}' not found.` });
//       }

//       const cityId = cityResult[0].city_id;
//       console.log("Fetched City ID:", cityId);

//       // Prepare values for insert
//       const values = [
//         name,
//         category,
//         city,
//         // new Date(), // Set updated_at to current date/time
//         min_rate,
//         max_rate,
//         traded_quantity,
//         variety
//         // last_trading_day_rate,
//         // percentage_variation,
//         // highest_rate,
//         // lowest_rate,
//         // finalPriceDate,
//         // category, // Insert the category name directly
//         // city, // Insert the city name directly
//       ];

//       // Insert Product into Database
//       db.query(insertProduct, values, (err, result) => {
//         if (err) {
//           console.error("Database Insert Error:", err);
//           return res.status(500).json({
//             message: "Error creating product",
//             error: err.message,
//           });
//         }

//         console.log("Product Inserted with ID:", result.insertId);

//         // Retrieve the inserted product with its category and city details
//         db.query(
//           getProductDetails,
//           [result.insertId],
//           (err, productDetails) => {
//             if (err) {
//               console.error("Product Retrieval Error:", err);
//               return res.status(500).json({
//                 message: "Error fetching product details",
//                 error: err.message,
//               });
//             }

//             if (productDetails.length === 0) {
//               return res
//                 .status(404)
//                 .json({ message: "Product not found after insertion" });
//             }

//             // Respond with the created product details
//             res.status(201).json({
//               message: "Product created successfully",
//               product: productDetails[0],
//             });
//           }
//         );
//       });
//     });
//   });
// };
exports.createProduct = (req, res) => {
  console.log("Request Body:", req.body);

  const {
    name,
    category, // Expecting category_name (not category_id)
    city, // Expecting city_name (not city_id)
    // min_rate,
    // max_rate,
    // traded_quantity,
    variety
  } = req.body;

  // Validate required fields
  if (!name || !category || !city) {
    return res.status(400).json({ message: "Product name, category, and city are required." });
  }

  // Get current timestamp
  const createdAt = new Date(); // Generates current timestamp

  // Insert product using category_name and city_name
  const insertProduct = `
    INSERT INTO products (
       product_name, category_name, city_name, min_rate, max_rate, variety, created_at
     ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  
  const values = [
    name,
    category, // Using category_name directly
    city, // Using city_name directly
    0,
    0,
    // traded_quantity,
    variety,
    createdAt // Adding current timestamp
  ];

  // Insert into database
  db.query(insertProduct, values, (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err);
      return res.status(500).json({
        message: "Error creating product",
        error: err.message,
      });
    }

    console.log("Product Inserted with ID:", result.insertId);

    // Retrieve the inserted product details
    const getProductDetails = `
      SELECT product_id, product_name, category_name AS category, city_name AS city, variety, created_at
      FROM products
      WHERE product_id = ?;
    `;

    db.query(getProductDetails, [result.insertId], (err, productDetails) => {
      if (err) {
        console.error("Product Retrieval Error:", err);
        return res.status(500).json({
          message: "Error fetching product details",
          error: err.message,
        });
      }

      if (productDetails.length === 0) {
        return res.status(404).json({ message: "Product not found after insertion" });
      }

      // Respond with the created product details
      res.status(201).json({
        message: "Product created successfully",
        product: productDetails[0],
      });
    });
  });
};



// Get all products
exports.getProducts = (req, res) => {
  const sql = `
  SELECT * FROM products
  ORDER BY product_id DESC
`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching products", err });
    }
    res.status(200).json(results);
  });
};

// Get a product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT * FROM products WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error fetching product", err });
    if (result.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(result[0]);
  });
};

// Get ProductBycity
exports.getProductByCity = (req, res) => {
  const { city } = req.body; // Retrieve city from the request body
 console.log(city);
  // If no city is provided, fetch products from all cities
  const sql = city
    ? `SELECT * FROM products WHERE city_name = ?;`
    : `SELECT * FROM products;`;

  const queryParams = city ? [city] : [];

  db.query(sql, queryParams, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching products", err });
    }

    if (result.length === 0) {
      const message = city
        ? `No products found for ${city}`
        : "No products available";
      return res.status(200).json({ message, data: [] });
    }

    res.status(200).json(result);
  });
};


exports.downloadProductData = async (req, res) => {
  try {
    const { date, city } = req.body;

    if (!date || !city) {
      return res.status(400).json({ message: "Date and city are required in the request body." });
    }

    const sql = `
      SELECT product_id, product_name, min_rate, max_rate
      FROM product_price_history
      WHERE DATE(updated_at) = ? AND city_name = ?
      ORDER BY product_id DESC
    `;
    const timestampSql = `SELECT MAX(updated_at) AS last_updated FROM product_price_history`;

    db.query(sql, [date, city], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching price history", err });
      }

      if (results.length === 0) {
        return res.status(200).json({
          message: "No price history found for this date",
        });
      }

      db.query(timestampSql, async (err, timestampResult) => {
        if (err) {
          return res.status(500).json({ message: "Error fetching timestamp", err });
        }

        const lastUpdated = timestampResult[0]?.last_updated
          ? new Date(timestampResult[0].last_updated).toISOString().split("T")[0]
          : "N/A";

        const width = 592;
        const rowHeight = 30;
        const tableMargin = 30;
        const timestampHeight = 40;

        const headerImage = await loadImage(path.resolve(__dirname, "header.jpg"));
        const footerImage = await loadImage(path.resolve(__dirname, "footer.jpg"));
        const bgImage = await loadImage(path.resolve(__dirname, "background.jpg"));

        const headerAspectRatio = headerImage.width / headerImage.height;
        const newHeaderHeight = width / headerAspectRatio;

        const footerAspectRatio = footerImage.width / footerImage.height;
        const newFooterHeight = width / footerAspectRatio;

        const tableHeight = (results.length + 1) * rowHeight;
        const height = newHeaderHeight + tableMargin + timestampHeight + tableHeight + newFooterHeight - 8;

        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(bgImage, 0, 0, width, height);
        ctx.drawImage(headerImage, 0, 0, width, newHeaderHeight);

        ctx.fillStyle = "#333";
        ctx.font = "18px Arial";
        ctx.fillText(`Date: ${lastUpdated}`, 50, newHeaderHeight + 30);

        let startX = 45;
        let startY = newHeaderHeight + tableMargin + timestampHeight;

        const columns = ["S.No", "Product Name", "Min Rate", "Max Rate"];
        const columnWidths = [60, 240, 100, 100];

        ctx.fillStyle = "#005e8a";
        ctx.fillRect(startX, startY, width - 2 * startX, rowHeight);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px Arial";
        ctx.textAlign = "center";

        let x = startX;
        columns.forEach((col, index) => {
          ctx.fillText(col, x + columnWidths[index] / 2, startY + rowHeight / 1.6);
          x += columnWidths[index];
        });

        let y = startY + rowHeight;
        ctx.fillStyle = "#000";

        results.forEach((row, rowIndex) => {
          let x = startX;
          ctx.fillStyle = rowIndex % 2 === 0 ? "#ddd" : "#fff";
          ctx.fillRect(startX, y, width - 2 * startX, rowHeight);

          ctx.fillStyle = "#000";
          ctx.font = "16px Arial";

          const rowData = [
            rowIndex + 1,
            row.product_name,
            row.min_rate,
            row.max_rate,
          ];

          rowData.forEach((cell, index) => {
            ctx.fillText(String(cell), x + columnWidths[index] / 2, y + rowHeight / 1.6);
            x += columnWidths[index];
          });

          x = startX;
          rowData.forEach((_, index) => {
            ctx.strokeStyle = "#000";
            ctx.strokeRect(x, y, columnWidths[index], rowHeight);
            x += columnWidths[index];
          });

          y += rowHeight;
        });

        x = startX;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1;
        columns.forEach((_, index) => {
          ctx.beginPath();
          ctx.moveTo(x, startY);
          ctx.lineTo(x, y);
          ctx.stroke();
          x += columnWidths[index];
        });

        ctx.drawImage(footerImage, 0, y, width, newFooterHeight);

        const base64Image = canvas.toBuffer("image/jpeg").toString("base64");

        res.json({ image: `data:image/jpeg;base64,${base64Image}` });
      });
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ message: "Error generating image" });
  }
};



// Get Product Via Date
exports.getProductByDate = (req, res) => {
  const { date } = req.body; // Getting the date from request body

  // Check if date is provided in the body
  if (!date) {
    return res.status(400).json({ message: "Price date is required." });
  }

  // Validate the date format (YYYY-MM-DD)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!datePattern.test(date)) {
    return res
      .status(400)
      .json({ message: "Invalid date format. Expected YYYY-MM-DD." });
  }

  // SQL query to fetch product price history for the given date
  const sql = `
    SELECT id, product_id, product_name, price, min_rate, max_rate, date, updated_at 
    FROM product_price_history 
    WHERE DATE(date) = ?;
  `;

  // Query the database
  db.query(sql, [date], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error fetching product price history by date", err });
    }

    // Check if any product price history is found for the given date
    if (result.length === 0) {
      return res.status(404).json({
        message: "No product price history found for the specified date",
      });
    }

    // Return the found product price history data
    res.status(200).json(result);
  });
};

// Update a product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const allowedFields = [
    "name",
    "category",
    "city",
    // "price",
    // "weight",
    // "in_stock",
    "min_rate",
    "max_rate",
    // "traded_quantity",
    // "last_trading_day_rate",
    // "percentage_variation",
    // "highest_rate",
    // "lowest_rate",
    // "price_date",
  ];

  const updates = [];
  const values = [];

  // Loop through allowed fields and add to updates if present in the body
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  // If no fields to update, return an error
  if (updates.length === 0) {
    return res
      .status(400)
      .json({ message: "No valid fields provided for update." });
  }

  // Add the product ID as the last parameter
  values.push(id);

  const sql = `
    UPDATE products 
    SET ${updates.join(", ")} 
    WHERE product_id = ?
  `;

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating product", err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product updated successfully" });
  });
};

//Update BulkProducts
// exports.updateMultipleProducts = (req, res) => {
//   const products = req.body; // Array of products

//   if (!Array.isArray(products) || products.length === 0) {
//     return res
//       .status(400)
//       .json({ message: "Invalid input, expected a non-empty array." });
//   }

//   let sql = `
//     UPDATE products
//     SET 
//       min_rate = CASE
//   `;
//   const ids = [];
//   const minRateCases = [];
//   const maxRateCases = [];
//   const tradedQuantityCases = [];

//   products.forEach((product) => {
//     const { product_id, min_rate, max_rate, traded_quantity } = product;
//     ids.push(product_id);
//     minRateCases.push(`WHEN product_id = ${product_id} THEN ${min_rate}`);
//     maxRateCases.push(`WHEN product_id = ${product_id} THEN ${max_rate}`);
//     tradedQuantityCases.push(`WHEN product_id = ${product_id} THEN ${traded_quantity}`);
//   });

//   sql += `
//     ${minRateCases.join(" ")} END,
//     max_rate = CASE ${maxRateCases.join(" ")} END,
//     traded_quantity = CASE ${tradedQuantityCases.join(" ")} END
//     WHERE product_id IN (${ids.join(", ")});
//   `;

//   console.log("Generated SQL Query:", sql);

//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err);
//       return res
//         .status(500)
//         .json({ message: "Error updating products", error: err });
//     }

//     console.log("Query result:", result);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         message: "No rows were updated. Check your input data or IDs.",
//       });
//     }

//     // After updating products, handle price history
//     let responses = []; // Store responses to ensure headers are only sent once.

//     products.forEach((product) => {
//       const { product_id, product_name, min_rate, max_rate, traded_quantity } = product;

//       // Fetch product name and price from the `products` table if not provided
//       const getProductDetailsSql = `
//         SELECT product_name, 
//         FROM products
//         WHERE product_id = ?
//       `;

//       db.query(getProductDetailsSql, [product_id], (productErr, productResult) => {
//         if (productErr) {
//           console.error("Error fetching product details:", productErr);
//           responses.push(res.status(500).json({ message: "Error fetching product details", productErr }));
//           return;
//         }

//         if (productResult.length === 0) {
//           responses.push(res.status(404).json({ message: "Product not found" }));
//           return;
//         }

//         // Get product name and price from the database if not passed
//         const productName = product_name || productResult[0].product_name;
//         // const productPrice = price || productResult[0].price;

//         // Check if a price history record exists for the product and today's date
//         const checkHistorySql = `
//           SELECT product_id
//           FROM product_price_history
//           WHERE product_id = ? AND date = CURDATE()
//           LIMIT 1
//         `;

//         db.query(checkHistorySql, [id], (historyErr, historyResult) => {
//           if (historyErr) {
//             console.error("Error checking price history:", historyErr);
//             responses.push(res.status(500).json({ message: "Error checking price history", historyErr }));
//             return;
//           }

//           if (historyResult.length > 0) {
//             // If the price history exists, update it
//             const updateHistorySql = `
//               UPDATE product_price_history
//               SET
//                 product_name = ?, price = ?, min_rate = ?, max_rate = ?, 
//                 updated_at = NOW(), traded_quantity = ?
//               WHERE id = ?
//             `;
//             db.query(
//               updateHistorySql,
//               [
//                 productName,
//                 productPrice,
//                 min_rate,
//                 max_rate,
//                 traded_quantity,
//                 historyResult[0].id // Use the existing price history ID to update
//               ],
//               (updateHistoryErr, updateHistoryResult) => {
//                 if (updateHistoryErr) {
//                   console.error("Error updating price history:", updateHistoryErr);
//                   responses.push(res.status(500).json({ message: "Error updating price history", updateHistoryErr }));
//                   return;
//                 }

//                 console.log("Price history updated successfully");
//               }
//             );
//           } else {
//             // Insert new price history record if it does not exist
//             const insertHistorySql = `
//               INSERT INTO product_price_history
//               (product_id, product_name, price, min_rate, max_rate, date, updated_at, traded_quantity)
//               VALUES (?, ?, ?, ?, ?, CURDATE(), NOW(), ?)
//             `;
//             db.query(
//               insertHistorySql,
//               [
//                 id,
//                 productName,
//                 productPrice,
//                 min_rate,
//                 max_rate,
//                 traded_quantity
//               ],
//               (insertHistoryErr, insertHistoryResult) => {
//                 if (insertHistoryErr) {
//                   console.error("Error inserting price history:", insertHistoryErr);
//                   responses.push(res.status(500).json({ message: "Error inserting price history", insertHistoryErr }));
//                   return;
//                 }

//                 console.log("Price history inserted successfully");
//               }
//             );
//           }
//         });
//       });
//     });

//     // Send the response once all operations are completed.
//     if (responses.length === 0) {
//       res.status(200).json({
//         message: "Products updated and price history processed successfully",
//         updatedRows: result.affectedRows,
//       });
//     }
//   });
// };
exports.updateMultipleProducts = (req, res) => {
  const products = req.body; // Array of products: [{ product_id, min_rate, max_rate, city }, ...]

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input, expected a non-empty array." });
  }

  // Step 1: Update products table
  let sql = `
    UPDATE products
    SET 
      min_rate = CASE
  `;
  const ids = [];
  const minRateCases = [];
  const maxRateCases = [];

  products.forEach((product) => {
    const { product_id, min_rate, max_rate } = product;
    ids.push(product_id);
    minRateCases.push(`WHEN product_id = ${product_id} THEN ${min_rate}`);
    maxRateCases.push(`WHEN product_id = ${product_id} THEN ${max_rate}`);
  });

  sql += `
    ${minRateCases.join(" ")} END,
    max_rate = CASE ${maxRateCases.join(" ")} END
    WHERE product_id IN (${ids.join(", ")});
  `;

  console.log("Generated SQL Query:", sql);

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res
        .status(500)
        .json({ message: "Error updating products", error: err });
    }

    console.log("Query result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "No rows were updated. Check your input data or IDs.",
      });
    }

    // Step 2: Manage price history
    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    let updateHistoryPromises = [];

    products.forEach((product) => {
      const { product_id, min_rate, max_rate, city } = product;

      // Fetch product name from the products table
      const getProductDetailsSql = `
        SELECT product_name
        FROM products
        WHERE product_id = ?
      `;

      const historyPromise = new Promise((resolve, reject) => {
        db.query(getProductDetailsSql, [product_id], (productErr, productResult) => {
          if (productErr) {
            console.error("Error fetching product details:", productErr);
            reject({ message: "Error fetching product details", productErr });
            return;
          }

          if (productResult.length === 0) {
            reject({ message: `Product not found for product_id: ${product_id}` });
            return;
          }

          const productName = productResult[0].product_name;

          // Check if a price history record exists for this product, city, and date
          const checkHistorySql = `
            SELECT id
            FROM product_price_history
            WHERE product_id = ? AND city_name = ? AND DATE(updated_at) = ?
            LIMIT 1
          `;

          db.query(checkHistorySql, [product_id, city, currentDate], (historyErr, historyResult) => {
            if (historyErr) {
              console.error("Error checking price history:", historyErr);
              reject({ message: "Error checking price history", historyErr });
              return;
            }

            if (historyResult.length > 0) {
              // Update existing price history record
              const updateHistorySql = `
                UPDATE product_price_history
                SET
                  product_name = ?, min_rate = ?, max_rate = ?, updated_at = NOW()
                WHERE id = ?
              `;
              db.query(
                updateHistorySql,
                [productName, min_rate, max_rate, historyResult[0].id],
                (updateHistoryErr) => {
                  if (updateHistoryErr) {
                    console.error("Error updating price history:", updateHistoryErr);
                    reject({ message: "Error updating price history", updateHistoryErr });
                    return;
                  }
                  console.log(`Price history updated for product ${product_id}, city ${city} on ${currentDate}`);
                  resolve();
                }
              );
            } else {
              // Insert new price history record
              const insertHistorySql = `
                INSERT INTO product_price_history
                (product_id, product_name, min_rate, max_rate, city_name, updated_at)
                VALUES (?, ?, ?, ?, ?, NOW())
              `;
              db.query(
                insertHistorySql,
                [product_id, productName, min_rate, max_rate, city],
                (insertHistoryErr) => {
                  if (insertHistoryErr) {
                    console.error("Error inserting price history:", insertHistoryErr);
                    reject({ message: "Error inserting price history", insertHistoryErr });
                    return;
                  }
                  console.log(`Price history inserted for product ${product_id}, city ${city} on ${currentDate}`);
                  resolve();
                }
              );
            }
          });
        });
      });

      updateHistoryPromises.push(historyPromise);
    });

    // Wait for all price history updates to complete, then fetch all products
    Promise.all(updateHistoryPromises)
      .then(() => {
        // Fetch all products from the products table
        const fetchAllProductsSql = `
          SELECT product_id, product_name, min_rate, max_rate
          FROM products
        `;

        db.query(fetchAllProductsSql, (fetchErr, fetchResult) => {
          if (fetchErr) {
            console.error("Error fetching all products:", fetchErr);
            return res
              .status(500)
              .json({ message: "Error fetching products after update", error: fetchErr });
          }

          res.status(200).json({
            message: "Products updated and price history processed successfully",
            updatedRows: result.affectedRows,
            products: fetchResult,
          });
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });
};

exports.adminBulkUpdateProducts = (req, res) => {
  const products = req.body; // Array of products

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input, expected a non-empty array." });
  }

  let sql = `
    UPDATE products
    SET 
      product_name = CASE
  `;

  const ids = [];
  const nameCases = [];
  const categoryCases = [];
  const varietyCases = [];
  const cityCases = [];
  const minRateCases = [];
  const maxRateCases = [];

  products.forEach((product) => {
    const { product_id, product_name, category_name, variety, city_name, min_rate, max_rate } = product;
    ids.push(product_id);
    nameCases.push(`WHEN product_id = ${product_id} THEN '${product_name}'`);
    categoryCases.push(`WHEN product_id = ${product_id} THEN '${category_name}'`);
    varietyCases.push(`WHEN product_id = ${product_id} THEN '${variety}'`);
    cityCases.push(`WHEN product_id = ${product_id} THEN '${city_name}'`);
    minRateCases.push(`WHEN product_id = ${product_id} THEN ${min_rate}`);
    maxRateCases.push(`WHEN product_id = ${product_id} THEN ${max_rate}`);
  });

  sql += `
    ${nameCases.join(" ")} END,
    category = CASE ${categoryCases.join(" ")} END,
    variety = CASE ${varietyCases.join(" ")} END,
    city_name = CASE ${cityCases.join(" ")} END,
    min_rate = CASE ${minRateCases.join(" ")} END,
    max_rate = CASE ${maxRateCases.join(" ")} END
    WHERE product_id IN (${ids.join(", ")});
  `;

  console.log("Generated SQL Query:", sql);

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Error updating products", error: err });
    }

    console.log("Query result:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No rows were updated. Check your input data or IDs." });
    }

    res.status(200).json({ message: "Products updated successfully." });
  });
};


exports.adminEditProduct = (req, res) => {
  const { id } = req.params;
  const {
    product_name,
    category_name,
    variety,
    city_name,
  } = req.body;

  // Validate required fields
  if (!product_name || !category_name || !city_name) {
    return res.status(400).json({
      message: "Product name, category name, and city name are required",
    });
  }

  // Check if the product exists
  const sqlCheckProduct = "SELECT * FROM products WHERE product_id = ?";
  db.query(sqlCheckProduct, [id], (err, existingProduct) => {
    if (err) {
      return res.status(500).json({ message: "Error checking product", err });
    }

    if (existingProduct.length === 0) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Update product details
    const sqlUpdateProduct =
      "UPDATE products SET product_name = ?, category_name = ?, variety = ?, city_name = ? WHERE product_id = ?";
    db.query(
      sqlUpdateProduct,
      [product_name, category_name, variety || null, city_name, id],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error updating product", err });
        }

        if (result.affectedRows === 0) {
          return res.status(500).json({
            message: "Failed to update product, no changes made",
          });
        }

        res.status(200).json({
          message: "Product updated successfully",
        });
      }
    );
  });
};

// Delete a product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE product_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err)
      return res.status(500).json({ message: "Error deleting product", err });
    res.status(200).json({ message: "Product deleted successfully" });
  });
};


exports.getPriceHistory = (req, res) => {
  const { date, city } = req.body;
 console.log("Fetch called for history")
  if (!date || !city) {
    return res.status(400).json({ message: "Date and city are required." });
  }

  const sql = `
    SELECT product_id, product_name, min_rate, max_rate, city_name, updated_at
    FROM product_price_history
    WHERE DATE(updated_at) = ? AND city_name = ?
  `;

  db.query(sql, [date, city], (err, result) => {
    if (err) {
      console.error("Error fetching price history:", err);
      return res
        .status(500)
        .json({ message: "Error fetching price history", error: err });
    }

    if (result.length === 0) {

      return res.status(404).json({
        message: `No price history found for ${date} in ${city}.`,
      });
    }
    console.log(result)
    res.status(200).json({
      message: "Price history fetched successfully",
      data: result,
    });
  });
};