import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import ThemeContext from '../Context/ThemeContext';

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header
      className={`flex justify-between ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-black'
      } items-center p-5 px-4 md:px-40`}
    >
      {/* Logo */}
      <div className="flex items-center text-2xl logo">
        <Link to={'/'}>
          <BsGithub className="text-2xl md:text-3xl" />
        </Link>
        <h1 className="mx-3 text-sm md:text-2xl">
          <Link to={'/'}>Github Profile Finder</Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
