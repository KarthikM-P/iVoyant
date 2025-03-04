
function Articles({ articles }) {
  
  return (
    <div className="card w-50 mx-auto">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((datas,index)=>(
          <tr data-testid="article" key={`${index}`} >
            <td data-testid="article-title">{datas.title}</td>
            <td data-testid="article-upvotes">{datas.upvotes}</td>
            <td data-testid="article-date">{datas.date}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
