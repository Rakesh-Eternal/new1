// Script for Blog Page Functionality and Animations

// Global variables
let currentCategory = "all";
let currentPage = 1;
const postsPerPage = 9;

// Elements
const blogList = document.querySelector(".blog-list");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const filterButtons = document.querySelectorAll(".filter-btn");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const currentPageSpan = document.getElementById("current-page");
const totalPagesSpan = document.getElementById("total-pages");

// Helper Functions

// Function to fetch blog data from the JSON file
function fetchBlogData() {
  fetch("content/addblogs/blogsadd.json") // Path to the JSON file in the 'content/blogs/' folder
    .then((response) => response.json())
    .then((data) => {
      renderBlogs(data); // Render the blogs once data is loaded
    })
    .catch((error) => console.error("Error loading blogsadd.json:", error));
}

// Function to render the blog posts based on the fetched data
function renderBlogs(blogs) {
  blogList.innerHTML = ""; // Clear the blog list

  // Filter blogs based on category
  const filteredBlogs = blogs.filter(
    (blog) => currentCategory === "all" || blog.category === currentCategory
  );

  // Paginate blogs
  const start = (currentPage - 1) * postsPerPage;
  const paginatedBlogs = filteredBlogs.slice(start, start + postsPerPage);

  // Generate HTML for each blog post
  paginatedBlogs.forEach((blog) => {
    const blogCard = document.createElement("article");
    blogCard.classList.add("blog-card");
    blogCard.setAttribute("data-category", blog.category);
    blogCard.innerHTML = `
            <img src="${blog.image}" alt="Blog Thumbnail">
            <div class="card-content">
                <h2 class="blog-title">${blog.title}</h2>
                <p class="blog-snippet">${blog.snippet}</p>
                <a href="${blog.link}" class="read-more">Read More</a>
                <div class="meta-info">
                    <span class="author">By ${blog.author}</span>
                    <span class="date">${blog.date}</span>
                </div>
            </div>
        `;
    blogList.appendChild(blogCard);

    // Add animation to each blog card
    blogCard.style.opacity = 0;
    setTimeout(() => {
      blogCard.style.opacity = 1;
      blogCard.style.transform = "translateY(0)";
    }, 100);
  });

  // Update pagination info
  updatePagination(filteredBlogs.length);
}

function updatePagination(totalBlogs) {
  const totalPages = Math.ceil(totalBlogs / postsPerPage);
  totalPagesSpan.textContent = totalPages;
  currentPageSpan.textContent = currentPage;

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages || totalBlogs === 0;
}

function handleSearch(event) {
  event.preventDefault();

  const searchTerm = searchInput.value.toLowerCase();
  blogList.innerHTML = ""; // Clear blog list

  fetch("content/blogs/blogsadd.json") // Fetch from JSON again
    .then((response) => response.json())
    .then((data) => {
      const filteredBlogs = data.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm) ||
          blog.snippet.toLowerCase().includes(searchTerm)
      );

      if (filteredBlogs.length > 0) {
        filteredBlogs.forEach((blog) => {
          const blogCard = document.createElement("article");
          blogCard.classList.add("blog-card");
          blogCard.innerHTML = `
                        <img src="${blog.image}" alt="Blog Thumbnail">
                        <div class="card-content">
                            <h2 class="blog-title">${blog.title}</h2>
                            <p class="blog-snippet">${blog.snippet}</p>
                            <a href="${blog.link}" class="read-more">Read More</a>
                            <div class="meta-info">
                                <span class="author">By ${blog.author}</span>
                                <span class="date">${blog.date}</span>
                            </div>
                        </div>
                    `;
          blogList.appendChild(blogCard);
        });
      } else {
        blogList.innerHTML = "<p>No blogs found matching your search.</p>";
      }
    })
    .catch((error) => console.error("Error fetching blog data:", error));
}

function handleFilter(event) {
  currentCategory = event.target.dataset.category;
  currentPage = 1;

  // Highlight active filter button
  filterButtons.forEach((button) => button.classList.remove("active"));
  event.target.classList.add("active");

  fetchBlogData(); // Re-fetch and render with the selected filter
}

function handlePagination(direction) {
  currentPage += direction;
  fetchBlogData(); // Re-fetch and render with updated pagination
}

// Event Listeners
searchForm.addEventListener("submit", handleSearch);

filterButtons.forEach((button) => {
  button.addEventListener("click", handleFilter);
});

prevButton.addEventListener("click", () => handlePagination(-1));
nextButton.addEventListener("click", () => handlePagination(1));

// Initialize Page
fetchBlogData(); // Initial data fetch on page load
