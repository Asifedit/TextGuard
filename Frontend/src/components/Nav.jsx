import React from 'react'
import { Link } from 'react-router-dom'


const Nav = () => {




    return (
      <div className='relative pb-14'>
            
      <nav className=" flex fixed w-screen gap-4 items-center justify-between mb-3 px-3 py-1 bg-lime-300 text-blue shadow-slate-700  shadow-[0px_0px_10px]">
          <ul>
              <Link to={"/"} className="font-R text-[30px] font-thin ">
                  GuardText
              </Link>
          </ul>
          <ul className="flex gap-3 font-R font-thin">
              <li>
                  <i className="fa-brands fa-github font-bold pr-1"></i>
                  GITHUB
              </li>
              <Link to={"/login"}>LOGIN</Link>
          </ul>
      </nav>
      </div>
  );
}

export default Nav