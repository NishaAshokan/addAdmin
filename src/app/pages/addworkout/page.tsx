// "use client";
// import React, { useState, ChangeEvent } from 'react';
// import './addworkout.css';
// import { toast, ToastContainer } from 'react-toastify';

// interface Exercise {
//     name: string;
//     description: string;
//     sets: number;
//     reps: number;
//     imageURL: string;
//     imageFile: File | null;
// }

// interface Workout {
//     name: string;
//     description: string;
//     durationInMinutes: number;
//     exercises: Exercise[];
//     imageURL: string;
//     imageFile: File | null;
// }

// const AddWorkoutPage: React.FC = () => {
//     const [workout, setWorkout] = useState<Workout>({
//         name: '',
//         description: '',
//         durationInMinutes: 0,
//         exercises: [],
//         imageURL: '',
//         imageFile: null,
//     });

//     const [exercise, setExercise] = useState<Exercise>({
//         name: '',
//         description: '',
//         sets: 0,
//         reps: 0,
//         imageURL: '',
//         imageFile: null,
//     });

//     const handleWorkoutChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setWorkout({
//             ...workout,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleExerciseChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         setExercise({
//             ...exercise,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const addExerciseToWorkout = () => {
//         if (exercise.name === '' || exercise.description === '' || exercise.sets === 0 || exercise.reps === 0 || exercise.imageFile === null) {
//             toast.error('Please fill all the fields for the exercise', {
//                 position: 'top-center',
//             });
//             return;
//         }
//         setWorkout({
//             ...workout,
//             exercises: [...workout.exercises, exercise],
//         });
//         setExercise({
//             name: '',
//             description: '',
//             sets: 0,
//             reps: 0,
//             imageURL: '',
//             imageFile: null,
//         });
//     };

//     const deleteExerciseFromWorkout = (index: number) => {
//         setWorkout({
//             ...workout,
//             exercises: workout.exercises.filter((_, i) => i !== index),
//         });
//     };

//     const uploadImage = async (image: File) => {
//         const formData = new FormData();
//         formData.append('myimage', image);

//         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/uploadimage`, {
//             method: 'POST',
//             body: formData,
//             credentials: 'include',
//         });

//         if (response.ok) {
//             const data = await response.json();
//             console.log('Image uploaded successfully:', data);
//             return data.imageUrl;
//         } else {
//             console.error('Failed to upload the image');
//             return null;
//         }
//     };

//     const checkLogin = async () => {
//         const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/checkLogin', {
//             method: 'GET',
//             headers: {
//                 'content-type': 'application/json',
//             },
//             credentials: 'include',
//         });

//         if (!response.ok) {
//             console.log('Admin authentication failed');
//             throw new Error('Not logged in');
//         }
//     };

//     const saveWorkout = async () => {
//         try {
//             await checkLogin();

//             if (workout.name === '' || workout.description === '' || workout.durationInMinutes === 0 || workout.imageFile === null) {
//                 toast.error('Please fill all the fields for the workout', {
//                     position: 'top-center',
//                 });
//                 return;
//             }

//             if (workout.imageFile) {
//                 const imageURL = await uploadImage(workout.imageFile);
//                 if (imageURL) {
//                     setWorkout((prevWorkout) => ({
//                         ...prevWorkout,
//                         imageURL,
//                     }));
//                 }
//             }

//             for (let i = 0; i < workout.exercises.length; i++) {
//                 let tempimg = workout.exercises[i].imageFile;
//                 if (tempimg) {
//                     let imgURL = await uploadImage(tempimg);
//                     workout.exercises[i].imageURL = imgURL;
//                 }
//             }

//             const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
//                 method: 'POST',
//                 headers: {
//                     'content-type': 'application/json',
//                 },
//                 body: JSON.stringify(workout),
//                 credentials: 'include',
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Workout Registered Successfully', data);
//                 toast.success('Workout registered successfully', {
//                     position: 'top-center',
//                 });
//             } else {
//                 console.error('Workout registration failed:', response.statusText);
//                 toast.error('Workout Registration failed', {
//                     position: 'top-center',
//                 });
//             }
//         } catch (error) {
//             console.error('An error occurred:', error);
//             toast.error('An error occurred while saving the workout', {
//                 position: 'top-center',
//             });
//         }
//     };

//     return (
//         <div className='formpage'>
//           <h1 className='title'>Add Workout</h1>
//           <input
//             type="text"
//             placeholder='Workout name'
//             name='name'
//             value={workout.name}
//             onChange={handleWorkoutChange}
//           />
//           <textarea
//             placeholder='Workout Description'
//             name='description'
//             value={workout.description}
//             onChange={handleWorkoutChange}
//             rows={5}
//             cols={50}
//           />
//           <label htmlFor="durationInMinutes">Duration In Minutes</label>
//           <input
//             type="number"
//             placeholder='Workout duration'
//             name='durationInMinutes'
//             value={workout.durationInMinutes}
//             onChange={handleWorkoutChange}
//           />
//           <input
//             type="file"
//             name="Image"
//             placeholder='Workout Image'
//             onChange={(e: ChangeEvent<HTMLInputElement>) => {
//               if (e.target.files) {
//                 setWorkout({
//                   ...workout,
//                   imageFile: e.target.files[0],
//                 });
//               }
//             }}
//           />
//           <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//             <h3 className='title'>Add Exercise to Workout</h3>
//             <input
//               type="text"
//               placeholder='Exercise name'
//               name='name'
//               value={exercise.name}
//               onChange={handleExerciseChange}
//             />
//             <textarea
//               placeholder='Exercise Description'
//               name='description'
//               value={exercise.description}
//               onChange={handleExerciseChange}
//               rows={5}
//               cols={50}
//             />
//             <label htmlFor="sets">Sets</label>
//             <input
//               type="number"
//               placeholder='Sets'
//               name='sets'
//               value={exercise.sets}
//               onChange={handleExerciseChange}
//             />
//             <label htmlFor="reps">Reps</label>
//             <input
//               type="number"
//               placeholder='Reps'
//               name='reps'
//               value={exercise.reps}
//               onChange={handleExerciseChange}
//             />
//             <input
//               type="file"
//               name="exerciseImage"
//               placeholder='Exercise Image'
//               onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                 if (e.target.files) {
//                   setExercise({
//                     ...exercise,
//                     imageFile: e.target.files[0],
//                   });
//                 }
//               }}
//             />
//             <div className='exercises'>
//               <h1 className='title'>Exercises</h1>
//               {workout.exercises.map((exercise, index) => (
//                 <div className='exercise' key={index}>
//                   <h2>{exercise.name}</h2>
//                   <p>{exercise.description}</p>
//                   <p>Sets: {exercise.sets}</p>
//                   <p>Reps: {exercise.reps}</p>
//                   <img src={exercise.imageURL || URL.createObjectURL(exercise.imageFile!)} alt="" />
//                   <button onClick={() => deleteExerciseFromWorkout(index)}>Delete Exercise</button>
//                 </div>
//               ))}
//             </div>
//             <button onClick={addExerciseToWorkout}>Add Exercise</button>
//           </div>
//           <button onClick={saveWorkout}>Add Workout</button>
//           <ToastContainer />
//         </div>
//     );
// };

// export default AddWorkoutPage;

// "use client";
// import React from 'react';
// import './addworkout.css';
// import { toast, ToastContainer } from 'react-toastify';

// interface Workout {
//   name: string;
//   description: string;
//   durationInMinutes: number;
//   exercises: Exercise[];
//   imageURL: string;
//   imageFile: File | null;
// }

// interface Exercise {
//   name: string;
//   description: string;
//   sets: number;
//   reps: number;
//   imageURL: string;
//   imageFile: File | null;
// }

// const AddWorkoutPage = () => {
//   const [workout, setWorkout] = React.useState<Workout>({
//     name: '',
//     description: '',
//     durationInMinutes: 0,
//     exercises: [],
//     imageURL: '',
//     imageFile: null,
//   });

//   const [exercise, setExercise] = React.useState<Exercise>({
//     name: '',
//     description: '',
//     sets: 0,
//     reps: 0,
//     imageURL: '',
//     imageFile: null,
//   });

//   const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setWorkout({
//       ...workout,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setExercise({
//       ...exercise,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const addExerciseToWorkout = () => {
//     if (exercise.name === '' || exercise.description === '' || exercise.sets === 0 || exercise.reps === 0 || exercise.imageFile === null) {
//       toast.error('Please fill all the fields', {
//         position: 'top-center',
//       });
//       return;
//     }

//     setWorkout((prevWorkout) => ({
//       ...prevWorkout,
//       exercises: [...prevWorkout.exercises, exercise],
//     }));

//     setExercise({
//       name: '',
//       description: '',
//       sets: 0,
//       reps: 0,
//       imageURL: '',
//       imageFile: null,
//     });
//   };

//   const deleteExerciseFromWorkout = (index: number) => {
//     setWorkout((prevWorkout) => ({
//       ...prevWorkout,
//       exercises: prevWorkout.exercises.filter((_, i) => i !== index),
//     }));
//   };

//   const uploadImage = async (image: File) => {
//     const formData = new FormData();
//     formData.append('myimage', image);

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/uploadimage`, {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('Image uploaded successfully:', data);
//       return data.imageUrl;
//     } else {
//       console.log('Failed to upload the image');
//       return null;
//     }
//   };

// //   const checkLogin = async () => {
// //     const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/checkLogin', {
// //       method: 'GET',
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //       credentials: 'include',
// //     });

// //     if (!response.ok) {
// //       throw new Error('Admin not authenticated');
// //     }
// //   };
// // const checkLogin = async () => {
// //     try {
// //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/checkLogin`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         credentials: 'include',
// //       });
  
// //       if (response.ok) {
// //         console.log('Admin is authenticated');
// //       } else {
// //         const responseText = await response.text();
// //         console.error('Admin authentication failed:', response.status, responseText);
// //         toast.error('Admin authentication failed. Please log in again.', {
// //           position: 'top-center',
// //         });
// //         // Optional: Redirect to login page or show a login modal
// //         // window.location.href = '/adminauth/login';
// //       }
// //     } catch (error) {
// //       console.error('Error during authentication check:', error);
// //       toast.error('Error during authentication check. Please try again later.', {
// //         position: 'top-center',
// //       });
// //     }
// //   };


// // const checkLogin = async () => {
// //     try {
// //       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/checkLogin`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         credentials: 'include',
// //       });
  
// //       if (response.ok) {
// //         console.log('Admin is authenticated');
// //       } else {
// //         const responseText = await response.text();
// //         console.error('Admin authentication failed:', response.status, responseText);
// //         toast.error('Admin authentication failed. Please log in again.', {
// //           position: 'top-center',
// //         });
// //         // Optional: Handle the failed authentication (e.g., show a message to the user)
// //       }
// //     } catch (error) {
// //       console.error('Error during authentication check:', error);
// //       toast.error('Error during authentication check. Please try again later.', {
// //         position: 'top-center',
// //       });
// //     }
// //   };


//   const checkLogin = async () => {
//     const token = localStorage.getItem('adminAuthToken');
//     if (!token) {
//         throw new Error('Not logged in');
//     }

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/check`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//     });

//     if (!response.ok) {
//         throw new Error('Not logged in');
//     }

//     const data = await response.json();
//     if (!data.loggedIn) {
//         throw new Error('Not logged in');
//     }
// };



// // const saveWorkout = async () => {
// //     try {
// //         await checkLogin();
// //         console.log('Logged in, proceeding to save workout');

// //         if (!workout || !Array.isArray(workout.exercises)) {
// //             toast.error('Invalid workout data', {
// //                 position: 'top-center'
// //             });
// //             return;
// //         }

// //         for (let i = 0; i < workout.exercises.length; i++) {
// //             const exercise = workout.exercises[i];
// //             if (exercise.name === '' || exercise.description === '' || exercise.sets === 0 || exercise.reps === 0 || exercise.imageFile == null) {
// //                 toast.error('Please fill all the fields', {
// //                     position: 'top-center'
// //                 });
// //                 return;
// //             }
// //         }

// //         if (workout.imageFile) {
// //             const imageURL = await uploadImage(workout.imageFile);
// //             if (imageURL) {
// //                 setWorkout({
// //                     ...workout,
// //                     imageURL
// //                 });
// //             }
// //         }

// //         for (let i = 0; i < workout.exercises.length; i++) {
// //             let tempimg = workout.exercises[i].imageFile;
// //             if (tempimg) {
// //                 let imgURL = await uploadImage(tempimg);
// //                 workout.exercises[i].imageURL = imgURL;
// //             }
// //         }

// //         const token = localStorage.getItem('adminAuthToken');

// //         const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 'Authorization': `Bearer ${token}` // Include the auth token
// //             },
// //             body: JSON.stringify(workout),
// //             credentials: 'include'
// //         });

// //         if (response.ok) {
// //             const data = await response.json();
// //             console.log('Workout Registered Successfully', data);
// //             toast.success('Workout registered successfully', {
// //                 position: 'top-center',
// //             });
// //         } else {
// //             const errorText = await response.text();
// //             console.error('Workout registration failed:', errorText);
// //             toast.error(`Workout registration failed: ${response.statusText}`, {
// //                 position: 'top-center',
// //             });
// //         }
// //     } catch (error) {
// //         console.error('An error occurred:', error);
// //         toast.error('An error occurred while saving the workout', {
// //             position: 'top-center',
// //         });
// //     }
// // };


// const saveWorkout = async() => {
  
//     await checkLogin();
//     console.log(workout);

//     if(exercise.name == '' || exercise.description == '' || exercise.sets == 0 || exercise.reps == 0 || exercise.imageFile == null){
//         toast.error('please fill all the feilds', {
//             position : 'top-center'
//         })
//         return;
//     }

// if(workout.imageFile){
//     const imageURL = await uploadImage(workout.imageFile);
//     if(imageURL){
//         setWorkout({
//             ...workout,
//             imageURL
//         })
//     }
// }

// for(let i=0; i <workout.exercises.length; i++){
//     let tempimg = workout.exercises[i].imageFile
//     if(tempimg){
//         let imgURL = await uploadImage(tempimg);
//         workout.exercises[i].imageURL = imgURL;
//     }
// }

// const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
//     method : 'POST',
//     headers : {
//         'content-type' : 'application/json',
//     },
//     body: JSON.stringify(workout),
//     credentials: 'include'

// });

//  if (response.ok) {
//     const data = await response.json();
//   console.log('Workout Registered Successfully', data);
//   toast.success('workout  registered successfully', {
//     position: 'top-center',
//   });
// } else {
//   console.error('workout registration failed:', response.statusText);
//   toast.error(' workout Registration failed', {
//     position: 'top-center',
//   });
// }
// }



//   return (
//     <div className='formpage'>
//       <h1 className='title'>Add Workout</h1>
//       <input
//         type="text"
//         placeholder='Workout name'
//         name='name'
//         value={workout.name}
//         onChange={handleWorkoutChange}
//       />
//       <textarea
//         placeholder='Workout Description'
//         name='description'
//         value={workout.description}
//         onChange={handleWorkoutChange}
//         rows={5}
//         cols={50}
//       />
//       <label htmlFor="durationInMinutes">Duration In Minutes</label>
//       <input
//         type="number"
//         placeholder='Workout duration'
//         name='durationInMinutes'
//         value={workout.durationInMinutes}
//         onChange={handleWorkoutChange}
//       />
//       <input
//         type="file"
//         name="Image"
//         placeholder='Workout Image'
//         onChange={(e) => {
//           setWorkout({
//             ...workout,
//             imageFile: e.target.files![0],
//           });
//         }}
//       />
//       <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
//         <h3 className='title'>Add Exercise to Workout</h3>
//         <input
//           type="text"
//           placeholder='Exercise name'
//           name='name'
//           value={exercise.name}
//           onChange={handleExerciseChange}
//         />
//         <textarea
//           placeholder='Exercise Description'
//           name='description'
//           value={exercise.description}
//           onChange={handleExerciseChange}
//           rows={5}
//           cols={50}
//         />
//         <label htmlFor="sets">Sets</label>
//         <input
//           type="number"
//           placeholder='Sets'
//           name='sets'
//           value={exercise.sets}
//           onChange={handleExerciseChange}
//         />
//         <label htmlFor="reps">Reps</label>
//         <input
//           type="number"
//           placeholder='Reps'
//           name='reps'
//           value={exercise.reps}
//           onChange={handleExerciseChange}
//         />
//         <input
//           type="file"
//           name="exerciseImage"
//           placeholder='Exercise Image'
//           onChange={(e) => {
//             setExercise({
//               ...exercise,
//               imageFile: e.target.files![0],
//             });
//           }}
//         />
//         <div className='exercises'>
//           <h1 className='title'>Exercises</h1>
//           {workout.exercises.map((exercise, index) => (
//             <div className='exercise' key={index}>
//               <h2>{exercise.name}</h2>
//               <p>{exercise.description}</p>
//               <p>Sets: {exercise.sets}</p>
//               <p>Reps: {exercise.reps}</p>
//               <img src={exercise.imageURL || URL.createObjectURL(exercise.imageFile!)} alt="" />
//               <button onClick={() => deleteExerciseFromWorkout(index)}>Delete Exercise</button>
//             </div>
//           ))}
//         </div>
//         <button onClick={addExerciseToWorkout}>Add Exercise</button>
//       </div>
//       <button onClick={saveWorkout}>Add Workout</button>
//       <ToastContainer />
//     </div>
//   );
// };
// //added
// export default AddWorkoutPage;



import React from 'react'
import './addworkout.css'
import { toast } from 'react-toastify';
import { json } from 'node:stream/consumers';

interface Workout {
    name : string;
    description : string;
    durationInMinutes : number;
    exercises : Exercise[];
    imageURL : string;
    imageFile : File | null;
}
interface Exercise {
    name : string;
    description : string;
    sets : number;
    reps : number;
    imageURL : string;
    imageFile : File | null;
}

const page = () => {

    const  [workout , setWorkout] = React.useState<Workout>({
        name : '',
        description : '' ,
        durationInMinutes : 0 ,
        exercises : [],
        imageURL : '',
        imageFile : null
    } 
    );

    const [exercise, setExercise] = React.useState<Exercise>({
        name : '',
        description : '',
        sets : 0,
        reps : 0,
        imageURL :'',
        imageFile : null
    })

const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setWorkout({
        ...workout,
        [e.target.name]:e.target.value
    
    })
}
const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setExercise({
        ...exercise,
        [e.target.name]:e.target.value
    
    })
}


const addExerciseToWorkout = () =>{
    console.log(exercise)
    if(exercise.name == '' || exercise.description == '' || exercise.sets == 0 || exercise.reps == 0 || exercise.imageFile == null){
        toast.error('please fill all the feilds', {
            position : 'top-center'
        })
    }
    setWorkout({
        ...workout,
        exercises : [...workout.exercises, exercise]
    })

    // setExercise({
    //     name : '',
    //     description : '',
    //     sets : 0,
    //     reps : 0,
    //     imageURL :'',
    //     imageFile : null
    // })
}
const deleteExerciseFromWorkout = (index : number) => {
    setWorkout({
        ...workout,
        exercises: workout.exercises.filter((exercise, i) => i !== index) 
    })
}
const uploadImage = async(image : File) => {
const formData = new FormData();
formData.append('myimage', image);

const response = await fetch('${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/uploadimage', {
    method: 'POST',
    body : formData,
});
if(response.ok){
    const data = await response.json();
    console.log('Image upload successfully:' , data);
    return data.imageUrl;
}
else{
    console.log('Failed to upload the image');
    return null;
}
}
const checkLogin = async() => {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/checkLogin', {
        method : 'GET',
        headers : {
            'content-type' : 'application/json',
        },
        credentials: 'include'
    });
    if(response.ok){
        console.log('admin is authenticated');
    }
    else{
        console.log('admin failed');
        window.location.href = '/adminauth/login';
    }
}
const saveWorkout = async() => {
  
    await checkLogin();
    console.log(workout);

    if(exercise.name == '' || exercise.description == '' || exercise.sets == 0 || exercise.reps == 0 || exercise.imageFile == null){
        toast.error('please fill all the feilds', {
            position : 'top-center'
        })
        return;
    }

if(workout.imageFile){
    const imageURL = await uploadImage(workout.imageFile);
    if(imageURL){
        setWorkout({
            ...workout,
            imageURL
        })
    }
}

for(let i=0; i <workout.exercises.length; i++){
    let tempimg = workout.exercises[i].imageFile
    if(tempimg){
        let imgURL = await uploadImage(tempimg);
        workout.exercises[i].imageURL = imgURL;
    }
}

const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
    method : 'POST',
    headers : {
        'content-type' : 'application/json',
    },
    body: JSON.stringify(workout),
    credentials: 'include'

});

 if (response.ok) {
    const data = await response.json();
  console.log('Workout Registered Successfully', data);
  toast.success('workout  registered successfully', {
    position: 'top-center',
  });
} else {
  console.error('workout registration failed:', response.statusText);
  toast.error(' workout Registration failed', {
    position: 'top-center',
  });
}
}




  return (
    <div className='formpage'>
        <h1 className='title'>Add Workout</h1>
        <input type="text"
        placeholder='Workout name'
        name='name'
        value={workout.name}
        onChange={handleWorkoutChange} />


        <textarea 
        placeholder='workout Description'
        name='description'
        value={workout.description}
        onChange={(e) => {
            setWorkout({
                ...workout,
                description : e.target.value
            })
        }}
        rows={5}
        cols={50}
        ></textarea>
        <label htmlFor="durationInMinutes"> Duration In Minutes</label>

        <input type="number"
        placeholder='workout duration'
        name='durationInMinutes'
        value={workout.durationInMinutes}
        onChange={handleWorkoutChange}
        />

        <input type="file"
        name="Image"
        placeholder='workoutImage'
        onChange={(e) => {
            setWorkout({
                ...workout,
                imageFile : e.target.files![0]
            })
        }} 
         />


         <div
         style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        justifyContent: 'center'         }}
         >
            <h3 className='title'>Add Exercise to Workout</h3>
            <input type="text"
        placeholder='Exercise name'
        name='name'
        value={exercise.name}
        onChange={handleExerciseChange} />
<></>
<textarea 

        placeholder='Exercise Description'
        name='description'
        value={exercise.description}
        onChange={(e) => {
            setExercise({
                ...exercise,
                description : e.target.value
            })
        }}
        rows={5}
        cols={50}
        ></textarea>
            

            <label htmlFor="sets">sets</label>

<input type="number"
placeholder='sets'
name='sets'
value={exercise.sets}
onChange={handleExerciseChange}
/>
<label htmlFor="reps"> Reps</label>
<input type="number"
placeholder='reps'
name='reps'
value={exercise.reps}
onChange={handleExerciseChange}
/>

<input 
type="file"
name="exerciseImage"
placeholder='Exercise Image'
onChange={(e) => {
setExercise({
...exercise,
imageFile : e.target.files![0]
})
}} 
/>  
<div className='exercises'>
    <h1 className='title'> Exercises</h1>
    {
        workout.exercises.map((exercises, index) => (
            <div className='exercise'>

                <h2>{exercise.name}</h2>
                <p>{exercise.description}</p> <p>{exercise.sets}</p> <p>{exercise.reps}</p>

                <img src=
                {exercise.imageFile ?
                    URL.createObjectURL(exercise.imageFile) : exercise.imageURL
                }  alt="" />
                <button
                onClick={() => deleteExerciseFromWorkout(index)}>
                    Delete Workout
                </button>
            </div>
        ))
    }
</div>

   <button onClick={(e) => {
    addExerciseToWorkout()
   }}>
   Add Exercise
   </button>

         </div>
         <button
         onClick={(e) =>{
            saveWorkout()
            console.log()
         }}> AddWorkout</button>
    </div>
  )
}
// nothing just for git admin
//added

export default page









// const saveWorkout = async() => {
  
//     await checkLogin();
//     console.log(workout);

//     if(exercise.name == '' || exercise.description == '' || exercise.sets == 0 || exercise.reps == 0 || exercise.imageFile == null){
//         toast.error('please fill all the feilds', {
//             position : 'top-center'
//         })
//         return;
//     }

// if(workout.imageFile){
//     const imageURL = await uploadImage(workout.imageFile);
//     if(imageURL){
//         setWorkout({
//             ...workout,
//             imageURL
//         })
//     }
// }

// for(let i=0; i <workout.exercises.length; i++){
//     let tempimg = workout.exercises[i].imageFile
//     if(tempimg){
//         let imgURL = await uploadImage(tempimg);
//         workout.exercises[i].imageURL = imgURL;
//     }
// }

// const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
//     method : 'POST',
//     headers : {
//         'content-type' : 'application/json',
//     },
//     body: JSON.stringify(workout),
//     credentials: 'include'

// });

//  if (response.ok) {
//     const data = await response.json();
//   console.log('Workout Registered Successfully', data);
//   toast.success('workout  registered successfully', {
//     position: 'top-center',
//   });
// } else {
//   console.error('workout registration failed:', response.statusText);
//   toast.error(' workout Registration failed', {
//     position: 'top-center',
//   });
// }
// }
