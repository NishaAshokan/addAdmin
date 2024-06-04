"use client"
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error('All fields are required', {
        position: 'top-center',
      });
      return;
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Admin Registered Successfully', data);
        toast.success('Admin registered successfully', {
          position: 'top-center',
        });
      } else {
        console.error('Admin registration failed:', response.statusText);
        if (response.status === 409) {
          toast.error('Email is already in use', {
            position: 'top-center',
          });
        } else {
          toast.error('Registration failed', {
            position: 'top-center',
          });
        }
      }
    } catch (error) {
      console.error('Error on registration:', error);
      toast.error('Error on registration', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className='formpage'>
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign up</button>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;

// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SignupPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     try {
//       const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         console.log('Admin Registered Successfully', data);
//         toast.success('Admin registered successfully', {
//           position: 'top-center',
//         });
//       } else {
//         console.error('Admin registration failed:', response.statusText);
//         toast.error('Registration failed', {
//           position: 'top-center',
//         });
//       }
//     } catch (error) {
//       console.error('Error on registration:', error);
//       toast.error('Error on registration', {
//         position: 'top-center',
//       });
//     }
//   };

//   return (
//     <div className='formpage'>
//       <input
//         type='text'
//         placeholder='Name'
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type='text'
//         placeholder='Email'
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type='password'
//         placeholder='Password'
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleSignup}>Sign up</button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default SignupPage;

// import React, {useState} from 'react';
// //import '../auth.css';
// import { ToastContainer, toast } from 'react-toastify';


// const SignupPage = () => {
//  const [name , setName]= useState('');
//  const [email, setEmail]= useState('');
 
//  const [password , setPassword]= useState('');
 

// const handleSignup = async() => {
//     try{
//     const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/register', {
//         method: 'POST',
//         mode: 'no-cors',
//         headers : {
//             'Content-Type' : 'application/json',
//         },
//         body: JSON.stringify({name, email, password}),
//         credentials: 'include'
//         }
//     )
//     const data = await response.json();
//     if(data.ok){
       
//         console.log('Admin Registered Successful' , data);

//         toast.success('Admin registered', {
//             position : "top-center",
            
//         });

//     }
//     else{
//         console.error('admin registeration failed', response.statusText);
// toast.error('Registeration failed', {
//     position : "top-center",
// });
//     }
//     }
//     catch (error){
//         console.error("Error on registeration", error);
//         toast.error("error on registeration");
//     }
// }


//   return (
//     <div className='formpage'>
//         <input type="text"
//         placeholder='Name'
//         value={name}
//         onChange={(e) => setName(e.target.value)} />

// <input type="text"
//         placeholder='Email'
//         value={email}
//         onChange={(e) => setEmail(e.target.value)} />
// <input type="text"
//         placeholder='Password'
//         value={password}
//         onChange={(e) => setPassword(e.target.value)} />


// <button onClick={handleSignup}> Sign up</button>

//     </div>
//   )
// }

// export default SignupPage;