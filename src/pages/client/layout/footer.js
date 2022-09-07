import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '~/asset/client/css/footer.css';
function Footer() {
    return (
        <footer className="footer container-fluid">
            <div className="container">
                <div className="footer-content row">
                    <div className="about-shop-first col-lg-4">
                        <h3>VỀ SHOPNICKNSO.COM</h3>
                        <p>Chuyên mua bán nick các game... an toàn. Tin cậy nhanh chóng. Giao dịch tự động 24/24</p>
                    </div>
                    <div className="about-shop-center col-lg-4">
                        <h3>VỀ CHÚNG TÔI</h3>
                        <p>
                            Chúng tôi làm việc một cách chuyên nghiệp, uy tín, nhanh chóng và luôn đặt quyền lợi của bạn
                            lên hàng đầu.
                        </p>
                    </div>
                    <div className="about-shop-end col-lg-4">
                        <h3>LIÊN HỆ</h3>
                        <ul>
                            <li>
                                <i class="fas fa-phone-volume"></i>
                                <span>0845151117</span>
                            </li>
                            <li>
                                <i class="fas fa-envelope"></i>
                                <span>huuphuocit0201@gmail.com</span>
                            </li>
                            <li>
                                <i class="fas fa-clock"></i>
                                <span>8h-11h & 13h-22h</span>
                            </li>
                        </ul>
                    </div>
                    <div className="author d-flex justify-content-center">
                        <span>2022 ©</span>
                        <span className="author-name">LE HUU PHUOC</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
