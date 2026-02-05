import { useState } from "react";

function ResourcesVault() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("top");
  const [showForm, setShowForm] = useState(false);

  const [resources, setResources] = useState([
    {
      title: "Complete React Documentation",
      description:
        "Official React documentation with hooks, components, and best practices.",
      source: "react.dev",
      tags: ["React", "JavaScript", "Frontend"],
      likes: 45
    },
    {
      title: "Coursera Machine Learning Course",
      description:
        "Andrew Ng’s famous ML course for beginners.",
      source: "coursera.org",
      tags: ["Machine Learning", "Beginner"],
      likes: 20
    }
  ]);

  // Add resource state
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    source: "",
    tags: ""
  });

  // FILTER
  let filtered = resources.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // SORT
  if (sort === "top") {
    filtered = [...filtered].sort((a, b) => b.likes - a.likes);
  } else if (sort === "az") {
    filtered = [...filtered].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  // ADD RESOURCE
  const handleAddResource = () => {
    if (!newResource.title || !newResource.description) return;

    setResources([
      {
        ...newResource,
        tags: newResource.tags.split(",").map((t) => t.trim()),
        likes: 0
      },
      ...resources
    ]);

    setNewResource({ title: "", description: "", source: "", tags: "" });
    setShowForm(false);
  };

  return (
    <div className="container">
      {/* HEADER */}
      <div className="resource-header">
        <h1>Resource Vault</h1>
        <p>Discover, share, and upvote the best learning resources together</p>
      </div>

      {/* CONTROLS */}
      <div className="resource-controls">
        <input
          className="resource-search"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="resource-actions">
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="top">Top Rated</option>
            <option value="az">A–Z</option>
          </select>

          <button
            className="add-resource-btn"
            onClick={() => setShowForm(true)}
          >
            + Add Resource
          </button>
        </div>
      </div>

      {/* ADD RESOURCE FORM */}
      {showForm && (
        <div className="card">
          <h3>Add New Resource</h3>

          <input
            placeholder="Title"
            value={newResource.title}
            onChange={(e) =>
              setNewResource({ ...newResource, title: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            value={newResource.description}
            onChange={(e) =>
              setNewResource({
                ...newResource,
                description: e.target.value
              })
            }
          />

          <input
            placeholder="Source (e.g. coursera.org)"
            value={newResource.source}
            onChange={(e) =>
              setNewResource({ ...newResource, source: e.target.value })
            }
          />

          <input
            placeholder="Tags (comma separated)"
            value={newResource.tags}
            onChange={(e) =>
              setNewResource({ ...newResource, tags: e.target.value })
            }
          />

          <button onClick={handleAddResource}>Add</button>
          <button
            style={{ marginLeft: "10px", background: "#475569" }}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* RESOURCE LIST */}
      <div className="resource-list">
        {filtered.map((res, index) => (
          <div className="resource-item" key={index}>
            <div className="resource-content">
              <h3>{res.title}</h3>
              <p>{res.description}</p>

              <div className="resource-tags">
                {res.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="resource-meta">
              <span className="source-badge">{res.source}</span>
              <span className="likes">👍 {res.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesVault;
