// import node modules
import fs from "fs";
import path from "path";

export default function singleProductHandler(req, res, next) {
  //   Catching incomming request
  const { productid } = req.query;
  const httpMethod = req.method;

  //   Reading product file  and converting from json to String
  const filepath = path.join(process.cwd(), "data", "product.json");
  const fileData = fs.readFileSync(filepath);
  const data = JSON.parse(fileData);

  // find the product by ID and Index
  const product = data.find((p) => p.id == parseInt(productid));
  const index = data.indexOf(product);

  switch (httpMethod) {
    //   GET /api/product/:id  => Get single product by ID
    case "GET":
      res.status(200).json({
        sucess: true,
        product,
      });
      break;
    //   PUT /api/product/:id  => Update Single Product
    case "PUT":
      const updatedProduct = {
        id: product.id,
        title: req.body.title || product.title,
        desc: req.body.desc || product.desc,
        price: req.body.price || product.price,
        img: req.body.img || product.img,
      };
      //   Check if the product exists
      if (index !== -1) {
        data[index] = updatedProduct;

        res.status(201).json({
          sucess: true,
          message: `Product ${productid} Updated😀😀.`,
          updatedProduct,
        });
      } else {
        res.status(404).json({
          sucess: false,
          message: `Product ${productid} Not Found😡😡.`,
        });
      }
      break;
    //   DELETE /api/products/:id  => Delete product by ID
    case "DELETE":
      // Check if the Product exits first
      if (index !== -1) {
        data.slice(index, 1);
        res.status(200).json({
          sucess: true,
          message: `Product ${productid} Deleted😡😀.`,
        });
      } else {
        res.status(404).json({
          sucess: false,
          message: `Product ${productid} Not Found😡😡.`,
        });
      }
      break;
    //   Unhandled Http Methods
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`${httpMethod} Method Not Allowed 😡.`);
  }
}
