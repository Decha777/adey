// import node modules
import fs from "fs";
import path from "path";

export default function allUsesrHandler(req, res, next) {
  //   catch incomming Request
  const httpMethod = req.method;

  //   Read User file
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  switch (httpMethod) {
    case "GET":
      // GET /api/users  ==> Get all users
      res.status(200).json({
        success: true,
        users: data,
      });

      break;
    //   POST /api/users ==> Create new User
    case "POST":
      const { userName, firstName, lastName, age, avator } = req.body;
      const newUser = {
        id: Date.now(),
        userName,
        firstName,
        lastName,
        age,
        avator,
      };
      data.push(newUser);
      res.status(201).json({
        success: true,
        message: ` New user ${newUser.userName} created.`,
        newUser,
      });
      //   Store the new create user
      fs.writeFileSync(filePath, JSON.stringify(data));
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`${httpMethod} Method Not Allowed!.`);
  }
}
