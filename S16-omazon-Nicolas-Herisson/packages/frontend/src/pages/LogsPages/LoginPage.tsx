import { Link } from 'react-router';
import './LoginPage.scss';
import { useNavigate } from 'react-router';
import { useContext, useState } from 'react';
import { userContext } from '@contexts/UserContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser, user } = useContext(userContext);
  const [error, setError] = useState(false);

  function handleSubmit(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    async function login() {
      await loginUser(email, password);

      setError(false);
      navigate('/');
    }

    login();
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <form action={handleSubmit}>
        <input type="text" placeholder="Email" name="email" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Login</button>
      </form>
      {error && <p>Invalid email or password</p>}
      <p>
        Si vous n'êtes pas inscrit,{' '}
        <Link to="/signup">
          <span>créez un compte</span>
        </Link>
      </p>
    </div>
  );
}
