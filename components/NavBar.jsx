import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const NavBar = () => {
    const searchParam=useSearchParams();
    // console.log(searchParam.get('todos'));
    // to get the query string 
    const query=searchParam.get('todos');
    // console.log(query);

  return (
    <div className='navbar'>
        <Link href="/" className={(query==null)&&"active"}>All</Link>
        <Link href="/?todos=active" className={(query=='active')&&"active"}>Active</Link>
        <Link href="/?todos=completed" className={(query=='completed')&&"active"}>Completed</Link>
    </div>
  )
}

export default NavBar