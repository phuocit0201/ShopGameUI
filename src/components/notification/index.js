import parse from 'html-react-parser';
import './notification.css';
import $ from 'jquery';
function Notification({ children, title }) {
  const closeNotification = () => {
    $('.notification').css({ opacity: 0, 'pointer-events': 'none' });
    $('#notification').css('transform', 'translateY(-200%)');
  };
  return (
    <div className="notification">
      <div className="notification-container">
        <div id="notification" className="notification-container__content">
          <div className="notification__content--title">
            <h3>{parse(title)}</h3>
            <i onClick={closeNotification} className="fas fa-window-close"></i>
          </div>
          <div className="notification__content--box">
            <div className="notification__box--content">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
