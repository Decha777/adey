import { blogs } from "../../dummy_data";

export default function handleSinglBlog(req, res) {
  const httpMethod = req.method;
  const { blogid } = req.query;
  const blog = blogs.find((b) => b.id == parseInt(blogid));



  
  switch (httpMethod) {
    case "GET":
      res.status(200).json({ blog });
      break;

    case "POST":
      break;

    case "PUT":
      break;

    case "DELETE":
      break;

    default:
      break;
  }
}
