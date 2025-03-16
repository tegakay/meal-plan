"use client";

import React from "react";

import { signIn } from "next-auth/react";

const Login: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle login logic here (e.g., call your API)
    
  //   // On success, you might redirect the user:
  //   // router.push('/dashboard');
  // };

  return (
    <div className="flex flex-col items-center justify-center py-40 bg-gray-100">
      {/* <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
        >
          Login
        </button>

        
      </form> */}
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <div className="mt-4 max-w-md w-full">
        <button
          onClick={() => signIn("github")}
          className="cursor-pointer w-full bg-[#24292E] text-white py-2 rounded hover:bg-opacity-75 transition duration-200"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
