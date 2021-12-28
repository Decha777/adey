// import node modules
import fs from "fs";
import path from "path";

export default function singleUserHandler(req, res, next) {
  //   Catch Incomming Request
  const httpMethod = req.method;
  const { userid } = req.query;
  const { userName, firstName, lastName, age, avator } = req.body;

  //   Read Users from file
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  //   Finding User by ID
  const user = data.find((u) => u.id === parseInt(userid));
  const indexOfUser = data.indexOf(user);

  switch (httpMethod) {
    //   GET /api/users/:id     => Get User By ID
    case "GET":
      res.status(200).json({
        success: true,
        user: user,
      });
      break;
    //   PUT  /api/users/:id    => Update a User
    case "PUT":
      const updatedUser = {
        id: user.id,
        userName: userName || user.userName,
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        age: age || user.age,
        avator: avator || user.avator,
      };
      if (indexOfUser !== -1) {
        data[indexOfUser] = updatedUser;

        res.status(201).json({
          success: true,
          message: `User ${userid} Updated.`,
          updatedUser,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `User ${userid} Not Found!.`,
        });
      }

      //   Store the remaining Users
      fs.writeFileSync(filePath, JSON.stringify(data));
      break;
    //  DELETE  /api/users/:id  Delete User by ID
    case "DELETE":
      if (indexOfUser !== -1) {
        data.splice(indexOfUser, 1);

        res.status(200).json({
          success: true,
          message: `User ${userid} Deleted!.`,
          users: data,
        });
      } else {
        res.status(404).json({
          success: true,
          message: `User ${userid} Not Found!`,
        });
      }
      //   Store the remaining Users
      fs.writeFileSync(filePath, JSON.stringify(data));
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`${httpMethod} Method Not Allowed!.`);
  }
}
