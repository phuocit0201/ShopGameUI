import './pagination.css';
function Pagination(data) {
  data.links.pop();
  data.links.shift();

  return (
    <nav aria-label="Page navigation example" className="nav-pagination">
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link">Trước</button>
        </li>
        {data.links.map((item, index) => (
          <li key={index} className="page-item">
            <button className={item.active ? 'page-link active' : 'page-link'}>{item.label}</button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link">Sau</button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
