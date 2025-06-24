'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('admin', 'true') // Simpan status login
      router.push('/mithazis') // Ganti ke dashboard admin
    } else {
      setError(data.error || 'Login gagal')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Login Admin</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}
