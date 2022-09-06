import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav1 = () => {
    return (
        <div>
            <div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal p-0">
    
      <li>
      <NavLink to='/Home'>Home</NavLink>
      <NavLink to='/About'>About</NavLink>
        
      </li>
      
    </ul>
  </div>
</div>
        </div>
    );
};

export default Nav1;