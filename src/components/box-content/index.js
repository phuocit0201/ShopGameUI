import './box-content.css';
function BoxContent({ children }) {
  return (
    <div className="container content">
      <div className="container__content--item">
        <div className="content__box">{children}</div>
      </div>
    </div>
  );
}

export default BoxContent;
