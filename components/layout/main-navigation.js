import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import classes from './main-navigation.module.css';

function MainNavigation() {

  const { session, status } = useSession();

  async function logoutHandler() {
    await signOut();
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {status !== "authenticated" && <li>
            <Link href='/auth'>Login</Link>
          </li>}
          {status === "authenticated" && <li>
            <Link href='/profile'>Profile</Link>
          </li>}
          {status === "authenticated" && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;