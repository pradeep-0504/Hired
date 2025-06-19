import React, { use, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react';
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react';
import { useState } from 'react';
import '../App.css'; 


const Header = () => {
  const[showSignIn, setShowSignIn]=useState(false);
  const handleSignIn = () => {
    setShowSignIn(true);
  };
    const[search,setSearch]=useSearchParams();
    const {user}=useUser();

  useEffect(()=>{
    if(search.get("sign-in")){
      setShowSignIn(true);
    }
  })
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {  //e.target is the element that was clicked, e.currentTarget is the element to which the event handler is attached and blurred
      // If the clicked element is the overlay, close the sign-in modal
      setShowSignIn(false);
      setSearch({})
    }


  }

  return (
    <>
    <nav className='py-5 flex justify-between items-center'>
          <Link to="/">
        <img src="/logo.png" className='h-22' alt="Hired_logo" />
        </Link>
        <div className='flex gap-8 '>
          <SignedOut>
        <Button variant="outline" onClick={handleSignIn}>Login</Button>
        </SignedOut>
        <SignedIn>
          {/* {There should be a cond here that only if u are recruiter only u can see this} */}
          {user?.unsafeMetadata?.role==="recruiter"&&(

            <Link to="/post-job">
            <Button variant="destructive" className="rounded-full">
              <PenBox size={20} className='mr-2'/>
              Post a Job
            </Button>
            </Link>
            
          )}
            <UserButton appearance={{
              elements:{
                avatarBox: "clerk-avatar-box",
              },
            }} >
              <UserButton.MenuItems>
                <UserButton.Link
                label='My Jobs'
                labelIcon={<BriefcaseBusiness size={15}/>}
                href='/my-jobs'
                />
                <UserButton.Link
                label='saved Jobs'
                labelIcon={<Heart size={15}/> }
                href='/saved-jobs'
                />
              </UserButton.MenuItems>
            </UserButton>
        </SignedIn>
        </div>
    </nav>
    {showSignIn && 
    (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50'
        onClick={handleOverlayClick}>
      <SignIn
      signUpForceRedirectUrl="/onboarding"
      fallbackRedirectUrl='/onboarding'
      />
      </div>
    )}
    </>
  );
};

export default Header
