// import node modules
import fs from "fs";
import path from "path";

export default function handleSinglBlog(req, res, next) {
  // Catch incomming params
  const httpMethod = req.method;
  const { blogid } = req.query;

  // Reading file from './data/blog.json  and converting from json to String
  const filepath = path.join(process.cwd(), "data", "blog.json");
  const filedata = fs.readFileSync(filepath);
  const data = JSON.parse(filedata);

  // Findding the requested blog and it's index
  const Blog = data.find((b) => b.id == parseInt(blogid));
  const index = data.indexOf(Blog);

  switch (httpMethod) {
    // GET /api/blog/:id  => Get single blog
    case "GET":
      res.status(200).json({ Blog });
      break;

    //  PUT /api/blog:id   => Update single blog
    case "PUT":
      const updatedBlog = {
        id: Blog.id,
        title: req.body.title || Blog.title,
        category: req.body.category || Blog.category,
        image: req.body.image || Blog.image,
        content: req.body.content || Blog.content,
        author: req.body.author || Blog.author,
      };
      // Check if the blog exist and update
      if (index !== -1) {
        data[index] = updatedBlog;
        res.status(200).json({
          success: true,
          message: `Blog ${blogid} Updated.`,
          updatedBlog,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Blog ${blogid} Not Found.`,
        });
      }
      // Write the Updated blog back to file
      fs.writeFileSync(filepath, JSON.stringify(data));
      break;

    // DELETE /api/blog:id    => Delete a single blog
    case "DELETE":
      if (index !== -1) {
        data.splice(index, 1);
        res.status(200).json({
          success: true,
          message: `Blog ${blogid} Deleted.`,
          data,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Blog ${blogid} Not Found.`,
        });
      }
      // Write the remaining blogs back
      fs.writeFileSync(filepath, JSON.stringify(data));
      break;
    // Undefined Http Methods
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`${httpMethod} Method Not Allowed.`);
  }
}
