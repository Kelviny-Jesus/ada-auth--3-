"use server"

import { cookies } from "next/headers"

interface UserResponse {
  id: number
  name: string
  email: string
  password: string
  salt: string
  created_at: string
  session_token: string
}

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const response = await fetch("https://n8n-blue.up.railway.app/webhook/ada/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      return { error: "Error to proceed to login" }
    }

    const userData: UserResponse = await response.json()

    // Verify that we have a session token
    if (!userData.session_token) {
      return { error: "Error to proceed to login" }
    }

    // Set the session token as a cookie
    cookies().set("authToken", userData.session_token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 1296000,
      sameSite: "lax",
    })

    // Return the user data (excluding sensitive information)
    return {
      success: true,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        created_at: userData.created_at,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "Error to proceed to login. Please, try again." }
  }
}

