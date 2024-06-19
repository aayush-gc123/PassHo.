import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef()
  const pass = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])


  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords)
    setpasswordArray(passwords)

  }

  useEffect(() => {
    getPassword()
  }, [])


  const showPassword = () => {

    if (ref.current.src.includes("icons/eye.png")) {
      pass.current.type = "password"
      ref.current.src = "icons/eyeclose.png"
    }
    else {
      ref.current.src = "icons/eye.png"
      pass.current.type = "text"
    }

  }
  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newPassword = { ...form, id: uuidv4() }; // Add id to the new password
      const newPasswordArray = [...passwordArray, newPassword]; // Add the new password to the passwordArray
      setpasswordArray(newPasswordArray); // Update the state
      // localStorage.setItem("passwords", JSON.stringify(newPasswordArray)); // Save to localStorage
      let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPassword)
      });
      console.log(newPasswordArray);
  
      // Clear the inputs
      setform({ site: "", username: "", password: "" });
  
      // Show success toast notification
      toast('🦄 Password saved successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // Show error toast notification
      toast.error('🚫 All fields must be longer than 3 characters!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  




  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const delatePassword = async (id) => {
    // let delate = confirm("Are you sure")?true:false
    // if(delate){
    //   setpasswordArray(passwordArray.filter(item => item.id!==id))
    //   localStorage.setItem("passwords" , JSON.stringify(passwordArray.filter(item => item.id!==id)))  l
    // }

    // another way by aayush

    let delate = confirm("Are you sure")
    if (delate) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
       await fetch("http://localhost:3000/", {
        method: "DELETE",
         headers: {
          "Content-type": "application/json; charset=UTF-8"},
  
          body: JSON.stringify({ id:id})
      })
      toast('🦄 Password deleted succesfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: "Bounce",
      });
    }
  }

  const editPassword = (id) => {
    console.log("edit", id)
    setform(passwordArray.filter(item => item.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))

  }


  const CopyText = (text) => {
    toast('🦄 Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: "Bounce",
    });
    navigator.clipboard.writeText(text)
  }



  return (
    <>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      {/* Same as */}
      <ToastContainer />

      <div className="absolute inset-0 -z-10 h-full w-full080800a_1px,transparent_ bg-green-50 bg-[linear-gradient(to_right,#81px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
      </div></div>

      <div className="container m-auto   my-container">
        <h1 className="font-bold text-2xl  text-center w-18 py-2 border border-white">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">Ho/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg  text-center w-18 py-2 border border-white">Your personal password manager</p>
        <div className=" flex flex-col p-4 text-black gap-8">
          <input name="site" value={form.site} onChange={handleChange} type="text" className="rounded-full border border-green-500 w-full p-4 py-1" placeholder='Enter website URL' />
          <div className="flex w-full gap-8 ">
            <input name="username" value={form.username} onChange={handleChange} type="text" className="rounded-full border border-green-500 w-full p-4 py-1" placeholder='Enter username' />
            <div className="relative">
              <input ref={pass} name="password" value={form.password} onChange={handleChange} type="text" className="rounded-full border border-green-500 w-full p-4 py-1" placeholder='Enter Password' />
              <span className="absolute right-2 top-2 cursor-pointer" onClick={showPassword} >
                <img ref={ref} src="icons/eye.png" width={20} alt="" />
              </span>
            </div>


          </div>
          <button onClick={savePassword} className="flex justify-center items-center bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 m-auto gap-2">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            >

            </lord-icon>
            Add password</button>

        </div>
        <div className="passwords h-full">

          <h2 className="text-xl font-bold py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map(items => {
                  return <tr key={items.username}>
                    < td className=" flex items-center justify-center  text-center w-18 py-2 border border-white"> <a href={items.site} target='_blank'>{items.site}</a>
                      <script src="https://cdn.lordicon.com/lordicon.js"></script>
                      <div className="size-7 flex justify-center items-center cursor-pointer" onClick={() => { CopyText(items.site) }} >
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "padding-Top": "2px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover">
                        </lord-icon>
                      </div>

                    </ td>
                    < td className=" text-center w-18 py-2 border border-white">{items.username}
                      {/* <div className="size-7 flex justify-center items-center cursor-pointer">
                      <lord-icon
                         style={{"width":"25px" , "height":"25px" , "padding-top":"2px"}}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover">
                      </lord-icon>
                      </div> */}
                    </ td>
                    < td className=" flex justify-center w-18 py-2 border border-white">{items.password}

                      <div className="size-7 flex justify-center items-center cursor-pointer " onClick={() => { CopyText(items.password) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "2px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover">
                        </lord-icon>
                      </div>

                    </ td >
                    <td className="w-18 py-2 border border-white">
                      <span className="cursor-pointer" onClick={() => { editPassword(items.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                      <span className="cursor-pointer" onClick={() => { delatePassword(items.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}



              </tbody>
            </table>}
        </div>
      </div>
      
    </>
  )
}

export default Manager
