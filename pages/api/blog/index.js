// Import node modules
import fs from "fs";
import path from "path";

export default function HandleBlog(req, res, next) {
  // Getting Method from request
  const httpMethod = req.method;

  const filepath = path.join(process.cwd(), "Data", "blog.json");
  const fileData = fs.readFileSync(filepath);
  const data = JSON.parse(fileData);

  switch (httpMethod) {
    case "GET":
      // GET api/blog  => Get All blogs
      res.status(200).json({
        sucess: true,
        blogs: data,
      });
      break;

    case "POST":
      // POST api/blog  => Create a new blog

      // catch incomming data
      const { title, category, image, content, author } = req.body;
      // creating new blog
      const newblog = {
        id: Date.now(),
        title,
        category,
        image,
        content,
        author,
      };
      data.push(newblog);

      // returning the new blog
      res.status(200).json({
        sucess: true,
        blog: newblog,
      });

      // overwritting the blog
      fs.writeFileSync(filepath, JSON.stringify(data));
      break;

    case "PUT":
      // PUT api/blog   => Update a blog
      // the same with POST
      break;
    case "DELETE":
      // DELETE api/blog  => Delete a blog
      break;
    default:
      // Unhandled Methods
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`${httpMethod} Method Not Allowed`);
  }
}
