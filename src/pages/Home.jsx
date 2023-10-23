import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  return (
    <div className=' w-full min-h-[80vh]'>
        <div className=' md:w-8/12 mx-auto h-full'>
          <div className=' text-center mt-4'>
          <h1 className="bg-gradient-to-r from-blue-300 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text text-3xl mt-4 md:mt-0 md:text-6xl  font-semibold  ">Todo WebApp.</h1>
          </div>
          <div className=' mt-[6vw] w-10/12 mx-auto  space-y-10 opacity-75'>
              <h1>
              Our application is built using React.js, a powerful and popular JavaScript library for building user interfaces. We have integrated advanced features including user authentication and team collaboration functionalities to provide a seamless and secure experience.
              </h1>
              <h1>
              With our To-Do Application, you can easily organize and manage your tasks, set priorities, and track your progress effortlessly. Utilizing the intuitive interface, you can create, update, and delete tasks, ensuring you stay on top of your daily goals.
              </h1>
              <h1>
              In addition to personal task management, our application allows you to collaborate with your team members. You can invite and manage team members, assign tasks, and work together to achieve common objectives. This collaborative feature enhances productivity and fosters a more efficient workflow within your team.
              </h1>
              <h1>
              We have employed Appwrite's robust cloud service to host and manage the backend of our application, ensuring data security and reliable performance. With the combination of React.js and Appwrite, our application provides a seamless user experience while maintaining the highest standards of data protection.
              </h1>
              <h1>
              Feel free to explore our To-Do Application, and experience a new level of task management and team collaboration that will streamline your work and enhance productivity.
              </h1>
            </div>  
        </div>
        
    </div>
  )
}

export default Home