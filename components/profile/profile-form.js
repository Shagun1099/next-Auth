import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {

  const newPwdRef = useRef();
  const oldPwdRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const oldPassword = oldPwdRef.current.value;
    const newPassword = newPwdRef.current.value;

    if (!oldPassword || !newPassword) return;

    await props.onChangePassword({
      oldPassword: oldPassword,
      newPassword: newPassword
    });

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPwdRef} type='password' id='new-password' />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input ref={oldPwdRef} type='password' id='old-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;