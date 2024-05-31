const Product = require("../../models/ProductModel");

async function updateProductInventory(orderItems) {
  await Promise.all(
    orderItems.map(async (orderItem) => {
      if (orderItem.variation && orderItem.variation.length > 0) {
        await Promise.all(
          orderItem.variation.map(async (selectedOption) => {
            const optionValues = selectedOption.targetOptionValues;
            const updateCondition = {
              _id: orderItem.id,
              "inventory.stock.optionValues": { $all: optionValues },
            };
            const updateOperation = {
              $inc: { "inventory.stock.$.quantity": -orderItem.quantity },
            };
            await Product.updateOne(updateCondition, updateOperation);
          })
        );
      } else {
        console.error("No selected options found for order item");
      }
    })
  );
}

module.exports = updateProductInventory;
