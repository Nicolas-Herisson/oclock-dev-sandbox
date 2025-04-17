import { useSignupUser } from '@services/Requests';
import './SignupPage.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function SignupPage() {
  const [serverResponse, setServerResponse] = useState('');
  const navigate = useNavigate();
  const signupUser = useSignupUser();

  function handleSubmit(formData: FormData) {
    setServerResponse('');

    const userInformations = Object.fromEntries(formData.entries());

    async function signup() {
      const response = await signupUser(userInformations);

      if (response !== 'User successfully created') {
        return setServerResponse(getErrorsPathAndMessage(response));
      }

      navigate('/login');
    }
    signup();
  }

  return (
    <div>
      <h1>Signup</h1>
      <form className="signup-form" action={handleSubmit}>
        <label htmlFor="lastname">Nom :</label>
        <input type="text" placeholder="Nom" name="lastname" />
        <label htmlFor="firstname">Prénom :</label>
        <input type="text" placeholder="Prénom" name="firstname" />
        <label htmlFor="email">Email :</label>
        <input type="email" placeholder="Email" name="email" />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" placeholder="Mot de passe" name="password" />
        <button type="submit">S'inscrire</button>
        {serverResponse && (
          <div className="error">
            {serverResponse.split(/\r\n/).map((err) => err && <p>{err}</p>)}
          </div>
        )}
      </form>
    </div>
  );
}

function getErrorsPathAndMessage(errors: string) {
  try {
    //check if contains object
    if (!errors.includes('{')) return errors;

    // Convert the string into a JSON object
    const errorsArray = JSON.parse(errors);

    return errorsArray
      .map(
        (err: { path: string[]; message: string }) =>
          `${err.path.join('.')} : ${err.message}\r\n`,
      )
      .join('');
  } catch (e) {
    return 'Invalid error format.\r\n';
  }
}
