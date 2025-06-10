// pages/blog-create.jsx (or any other component)
import BlogEditor from "@/components/BlogEditor";

const BlogCreate = () => {
  const handleSave = (data) => {
    console.log("Saved Data: ", data);
    // send to backend API
  };

  return (
    <div className="container mx-auto p-6">
		<PageHeader title="Create Blog"  />
      <h1 className="text-2xl font-semibold mb-4">Write a Blog</h1>
      <BlogEditor onSave={handleSave} />
    </div>
  );
};

export default BlogCreate;
