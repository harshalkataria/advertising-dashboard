import LoginForm from '../components/LoginForm';

// Login page following Single Responsibility Principle
const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage; 