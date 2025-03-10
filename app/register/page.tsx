"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "../actions/register"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full bg-[#1a2b4c] hover:bg-[#1f3461] text-white flex items-center justify-center gap-2"
      disabled={pending}
    >
      <UserPlus size={18} />
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  )
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [state, formAction] = useActionState(registerUser, null)
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  useEffect(() => {
    if (state?.success) {
      router.push("/login?registered=true")
    }
  }, [state?.success, router])

  const validatePassword = (value: string) => {
    if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.",
      )
    } else {
      setPasswordError("")
    }
    setPassword(value)
  }

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.")
    } else {
      setConfirmPasswordError("")
    }
    setConfirmPassword(value)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0c] bg-gradient-to-br from-[#0a0a0c] via-[#0d1117] to-[#131c2e] relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0yMCAyMGgyMHYyMEgyMHoiLz48cGF0aCBkPSJNMCAwaDIwdjIwSDB6Ii8+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      <header className="p-4 relative">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="3" fill="white" />
              <circle cx="16" cy="9" r="1.5" fill="white" />
              <circle cx="16" cy="23" r="1.5" fill="white" />
              <circle cx="9" cy="16" r="1.5" fill="white" />
              <circle cx="23" cy="16" r="1.5" fill="white" />
            </svg>
            <span className="text-white text-xl font-semibold">Ada</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">Create Account</h1>
            <p className="mt-2 text-gray-400">Register to start using the platform</p>
          </div>

          <div className="bg-[#0d1117] bg-opacity-50 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-gray-800">
            <form action={formAction} className="space-y-6">
              {state?.error && <div className="bg-red-500 text-white p-3 rounded-md mb-4">{state.error}</div>}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-200">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  className="bg-[#0a0a0c] border-gray-800 text-white placeholder-gray-500 focus:border-gray-700 focus:ring-gray-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  className="bg-[#0a0a0c] border-gray-800 text-white placeholder-gray-500 focus:border-gray-700 focus:ring-gray-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="bg-[#0a0a0c] border-gray-800 text-white placeholder-gray-500 focus:border-gray-700 focus:ring-gray-700 pr-10"
                    required
                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-200">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="bg-[#0a0a0c] border-gray-800 text-white placeholder-gray-500 focus:border-gray-700 focus:ring-gray-700 pr-10"
                    required
                    value={confirmPassword}
                    onChange={(e) => validateConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
              </div>

              <SubmitButton />
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-gray-200 hover:text-white">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 relative">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Ada. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

