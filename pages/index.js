import Head from "next/head";
import Link from "next/link";
import React, { useState,useEffect } from 'react';
function WideNavBar(props){
  return(
    <div className = "navBar" style={{display:"flex",justifyContent:" space-between",flexDirection: "row"}}>
      <Link href=""><h1 style={{marginLeft:"5%",height:"30px"}}>Polatine</h1></Link>
      <ol>
      <Link href="create">
        <li>Create</li>
        </Link>
        <Link href="mint">
        <li>Explore</li>
        </Link>
        <li>About us</li>
      </ol>
      <ol style={{marginRight:"5%"}}>
      <Link href="profile">
        <li>Account</li>
        </Link>
        <li>Wallet</li>
      </ol>
    </div>
  )
}

const SmallNavBar = () => {
  const [isShow, setShow] = useState(true);
  return(
    <div className = "navBar" style={{display:"flex",justifyContent:" space-between",flexDirection: "row"}}>
      <Link href=""><h1 style={{marginLeft:"5%",height:"30px"}}>Polatine</h1></Link>
      <ol style={{marginRight:"5%"}}>
        
      {isShow ? (
      <li className ="test" onClick={() => setShow(false)}>Hamburger Menu</li>
      ):(<ol>
      <li style={{float:"right"}}onClick={() => setShow(true)}>Hamburger Menu Drop down</li>
      <h1>asdasdasd</h1>
      <h1>asdasdasd</h1>
      <h1>asdasdasd</h1>
      <h1>asdasdasd</h1>
      </ol>
      
      
      
      )
      }

      </ol>
    </div>
  )
}



function BigAssCard(props){
 
return (
<div style={{scrollSnapAlign: "start"}}>

<div>{props.text}</div>
<img style={{width:"100%",height:"100vh", objectFit:"cover"}} src={props.url}/>
 
</div>
)
}


export default function Home() {
  const [isDesktop, setDesktop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1450) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }

    const updateMedia = () => {
      if (window.innerWidth > 1450) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  
  
  
  return (
    <div >
      {isDesktop ? (<WideNavBar/>) : (<SmallNavBar/>)}
      <div style = {{scrollSnapType: "y mandatory",maxHeight: "100vh",overflowY: "scroll", fontSize: 0}}>
        <BigAssCard text={"asdasasdasddasd"} url={"/50.jpg"}/>
        <BigAssCard text={"asdasaasddasd"}  url={"/ar.jpg"}/>
        <BigAssCard text={"asdasdsaddasd"} url={"/mm.jpg"}/>
      </div>
    </div>
  );
}
