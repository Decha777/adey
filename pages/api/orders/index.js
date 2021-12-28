// import node modules
import fs from "fs";
import path from "path";

export default function allOrdersHandler(req, res, next) {
  // Catch Incomming Request
  const httpMethod = req.method;
  const {
    shippingInfo,
    user,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
  } = req.body;

  //   Read  order file
  const filePath = path.join(process.cwd(), "data", "orders.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  switch (httpMethod) {
    //   GET /api/orders  => Get all orders
    case "GET":
      res.status(200).json({
        success: true,
        orders: data,
      });
      break;
    //   POST  /api/orders/  ==> Create new Order
    case "POST":
      const newOrder = {
        id: Date.now(),
        shippingInfo,
        user,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus,
        paidAt: Date.now(),
      };
      //   Append the new order
      data.push(newOrder);
      res.status(201).json({
        success: true,
        order: newOrder,
      });
      //   Store the new Order
      fs.writeFileSync(filePath, JSON.stringify(data));
      break;
    //   Unhandled HTTP Methods
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`${httpMethod} Method Not Allowed!.`);
  }
}
