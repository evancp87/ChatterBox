import React from 'react'
import Image from "next/image"
type Props = {}

function page({}: Props) {
  return (
    <section className="chat">
    <nav className="nav">
      <svg width="30px" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z"/>
  </svg>
       <Image width="300" height="300"className="avatar" alt="thing" src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
      <h2> Title</h2>  
      <p>Online 5 hours ago</p>
    </nav>
    <div className="chat-list">
      <div className="message-container mine">
        {/* <Image width="300" height="300"className="avatar" alt="thing" src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg">        <div className="message-bubble-container "> */}
         <div className="message-details">
              <p>Time</p>
         
            </div>
  
        <div className=" message-bubble me"> lorem ipsom lorem ipsom lorem ipsom</div>
        </div>
      </div>
      <div className="message-container sender">
  
        <Image width="300" height="300"className="avatar" alt="thing" src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
        <div className="message-bubble-container">
          <div className="message-details">
              <p>Time</p>
              <p>Name</p>
            </div>
            <div className="message-bubble-container">
  
            <div className=" message-bubble friend"> lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom lorem ipsom </div>
          </div>
        </div>
      </div>
      <input type="text" className="text-box" placeholder="Type something"/>
  </section>
  )
}

export default page