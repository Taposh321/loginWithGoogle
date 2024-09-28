import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '872802556536-p1aquhvqpbpbc2v44g932108quqhf6ba.apps.googleusercontent.com'; // Replace with your actual Client ID

const App = () => {
  const [profilePhoto, setProfilePhoto] = useState('');
  const [isLogged,setIsLogged]=useState(false);
  const [userName,setUserName]=useState(undefined);
  const [userEmail,setUserEmail]=useState(undefined);


  useEffect(() => {
    // Load the Google API client
    const start = () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'profile email', // Request profile and email scope
      });
    };

    // Load the gapi client and then initialize it
    gapi.load('client:auth2', start);
  }, []);

  const handleLogin = () => {
    const auth = gapi.auth2.getAuthInstance();

    auth.signIn().then((user) => {
      const profile = user.getBasicProfile();
      setProfilePhoto(profile.getImageUrl()); // Accessing the profile photo URL
      setUserName(profile.getName())
      setUserEmail( profile.getEmail())
      setIsLogged(true)
    }).catch(error => {
      console.error('Error during sign-in:', error);
    });
  };

  return (
   
    <div className='flex w-full  justify-center items-center h-screen bg-gray-500/5'>
      {
      isLogged?"":<div className='border p-5 bg-white flex flex-col gap-2'>
      <h1>Login</h1>
      <button 
        className='border px-5 py-2 rounded-md hover:bg-blue-600 hover:text-white transition-colors' 
        onClick={handleLogin}
      >
        Sign in with Google
      </button>
    </div>
    }

      {profilePhoto && (
              <div className='w-full h-screen flex items-center justify-center  '>

          <div className=' bg-white w-[20rem] h-[20rem] p-5 flex flex-col gap-5'>
            <div className='text-3xl  text-cenetr '><span className='font-bold'>{userName }</span>, Welcome to the website !</div>
           <div className='w-full flex flex-col items-center gap-2'>
           <img  src={profilePhoto} alt="Profile" className='w-16 h-16 rounded-full' />
           <div>{userName}</div> 
           </div>
           
          </div>
                </div>

        )}
    </div>
  
  );
};

export default App;
