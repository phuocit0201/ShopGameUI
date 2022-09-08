import './form.css';
import imgLogin from '~/asset/client/images/logo/login.gif';
function Form({ children }) {
    return (
        <div className="form__container">
            <div className="form__container--content">
                <div className="container__content--img">
                    <img src={imgLogin} alt="" />
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Form;
