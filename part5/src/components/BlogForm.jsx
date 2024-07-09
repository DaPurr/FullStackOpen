const BlogForm = ({
  onTitleChange,
  onAuthorChange,
  onUrlChange,
  handleSubmit,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>create new</h2>
        <div>
          <label>title:</label>
          <input onChange={onTitleChange} />
        </div>
        <div>
          <label>author:</label>
          <input onChange={onAuthorChange} />
        </div>
        <div>
          <label>url:</label>
          <input onChange={onUrlChange} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm
