document.addEventListener("DOMContentLoaded", function () {
  // Fetch the JSON file containing the blog posts data
  fetch("content/addblogs/blogsadd.json")
    .then((response) => response.json())
    .then((data) => {
      // Sort the blog posts by date (latest first)
      const sortedBlogs = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // Get the first 2 latest blog posts
      const latestBlogs = sortedBlogs.slice(0, 2);

      // Get the container where the blog posts will be displayed
      const container = document.getElementById("blog-posts-container");

      // Loop through the latest blog posts and create HTML for each
      latestBlogs.forEach((blog) => {
        const blogPostElement = document.createElement("div");
        blogPostElement.classList.add("post");

        // Generate HTML content for each blog post
        blogPostElement.innerHTML = `
            <div class="post-image">
              <img src="${blog.image}" alt="${blog.title}">
            </div>
            <h3><a href="${blog.link}" target="_blank">${blog.title}</a></h3>
            <p class="snippet">${blog.snippet}</p>
            <p class="post-meta">
              <span class="author">By ${blog.author}</span> | 
              <span class="category">${blog.category}</span> | 
              <span class="date">${new Date(
                blog.date
              ).toLocaleDateString()}</span>
            </p>
          `;

        // Append the new blog post element to the container
        container.appendChild(blogPostElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching blog posts:", error);
    });
});
