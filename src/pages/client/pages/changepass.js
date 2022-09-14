import LayoutSystem from '../components/layout-system';

function ChangePassword() {
    const title = 'ĐỔI MẬT KHẨU';
    document.title = title;
    return (
        <LayoutSystem title={title}>
            <h1>change password</h1>
        </LayoutSystem>
    );
}

export default ChangePassword;
