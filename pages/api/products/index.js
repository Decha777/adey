// node modules
import fs from "fs";
import path from "path";

export default function handleProducts(req, res) {
  // selecting file
  const filePath = path.join(process.cwd(), "data", "product.json");

  // read and retrun  file
  const readDummyFile = () => {
    const fileData = fs.readFileSync(filePath);
    // parse json to String
    const data = JSON.parse(fileData);
    return data;
  };

  // Catch Request Methods
  const httpMethod = req.method;

  switch (httpMethod) {
    case "GET":
      // getting data from file
      const data = readDummyFile();

      // responding all the file products
      res.status(200).json({
        success: true,
        products: data,
      });
      break;
    case "POST":
      // destructuring incoming data
      const { title, desc, price, img } = req.body;

      // creating new product => Es6
      const newproduct = {
        id: Date.now(),
        title,
        desc,
        price,
        img,
      };

      // getting old data from file.
      const newData = readDummyFile();

      // appending new product to old file at end.
      newData.push(newproduct);

      // writting the new product to file
      fs.writeFileSync(filePath, JSON.stringify(newData));

      // responsing the new product
      res.status(201).json({
        success: true,
        product: newproduct,
      });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`${httpMethod} Method Not Allowed🤢.`);
  }
}
