import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import emailjs from 'emailjs-com';
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const texts = ["Hello", "Just Register"];

export default function Register() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!name || !email || !number || !password) {
      toast.error("All fields are required.");
      return;
    }
  
    const newUser = {
      name,
      email,
      number,
      password,
    };
  
    try {
      const response = await axios.post("http://localhost:8000/api/users/", newUser);
  
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message);
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.error('Error registering:', error);
        toast.error("Registration failed. Please try again.");
      }
    }
  };
  



  return (
    <div className="relative min-h-screen bg-none montserrat-alternates-regular">
      <div className="relative flex flex-col items-center justify-center p-4 pt-36">
        <div className="text-center text-2xl font-bold text-black mb-8 flex">
          <p>_</p> {visible && <span>{texts[currentIndex]}</span>} <p>_</p>
        </div>

        <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-700 bg-white bg-opacity-10">
          <h1 className="text-2xl text-black font-bold mb-6 text-center">Register Form</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              
              <Input  
                label="Full Name"
                type="text" 
                id="name"
                placeholder="Enter Name" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
                aria-label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              
              <Input
              label="Email" 
                type="email" 
                id="email"
                placeholder="Enter Email" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
             
              <Input
              label="Number" 
                type="number" 
                id="number"
                placeholder="Enter Number" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
                aria-label="Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
           
            <div>
             
              <Input
              label="Password" 
                type="password" 
                id="password"
                placeholder="Enter Password" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              
              <Input
              label="Re-Type Password" 
                type="password" 
                id="retype-password"
                placeholder="Re-Type Password" 
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-gray-400"
                aria-label="Password"
              required
              />
            </div>

            <Button type="submit" className="w-full bg-black hover:bg-slate-900 text-white py-3 rounded-lg transition duration-300">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}


