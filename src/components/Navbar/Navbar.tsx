"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from './logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const checkAdminAuthenticated = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/checklogin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
      }
    } catch (err) {
      console.error(err);
      setIsAdminAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAdminAuthenticated();
  }, []);

  return (
    <div className='navbar'>
      <Image src={logo} alt='logo' width={100} className='logo' />
      <div className='adminlinks'>
        { isAdminAuthenticated ? (
          <>
            <Link href='/pages/addworkout'> AddWorkout </Link>
          </>
        ) : (
          <>
            <Link href='/adminauth/login'> Login </Link>
            <Link href='/adminauth/register'> Signup </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// import React, { useEffect, useState } from 'react'
// import Image from 'next/image';
// import Link from 'next/link';
// import logo from './logo.png'
// import './Navbar.css'

// const Navbar = () => {
//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

//   const checkAdminAAuthenticated = async () => {
//     try{
//       const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/checklogin', {
//         method: 'GET',
//         headers : {
//             'Content-Type' : 'application/json',
//         },
//         credentials: 'include'
//         }
//       );
//       if(response.ok){
//         setIsAdminAuthenticated(true);
//       }
//       else{
//         setIsAdminAuthenticated(false);
//       }
//     }
//     catch(err){
//       console.error(err);
//       setIsAdminAuthenticated(false);
//     }
  
//   }

// useEffect(() =>{
//   checkAdminAAuthenticated();
// }, []);







//   return (
//     <div className='navbar'>

//       <Image src={logo} alt='logo' width={100} className='logo'/>
//       <div className='adminlinks'>
//         {isAdminAuthenticated?(
//           <>
//         <Link href='/pages/addworkout'> AddWorkout</Link>
//         </>

//         ) : (
//           <>
//           <Link href='/adminauth/login'> login </Link>
//           <Link href='/adminauth/register'> Signup </Link>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Navbar