"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sendResetCode, verifyResetCode, resetPassword } from "@/app/actions/reset-password"

interface ResetPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResetPasswordModal({ isOpen, onClose }: ResetPasswordModalProps) {
  const [email, setEmail] = useState("")
  const [state, sendResetCodeAction] = useActionState(sendResetCode, null)
  const [showVerifyPopup, setShowVerifyPopup] = useState(false)
  const [code, setCode] = useState("")
  const [verifyState, verifyResetCodeAction] = useActionState(verifyResetCode, null)
  const [showResetPopup, setShowResetPopup] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetState, resetPasswordAction] = useActionState(resetPassword, null)

  // Abre o popup de verificação após envio bem-sucedido
  if (state?.success && !showVerifyPopup) {
    setShowVerifyPopup(true)
  }

  // Abre o popup de redefinição após verificação bem-sucedida
  if (verifyState?.success && !showResetPopup) {
    setShowResetPopup(true)
  }

  const handleVerifySubmit = (formData: FormData) => {
    formData.append("email", state?.email || email)
    verifyResetCodeAction(formData)
  }

  const handleResetSubmit = (formData: FormData) => {
    formData.append("email", verifyState?.email || state?.email || email)
    resetPasswordAction(formData)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Modal principal de envio do e-mail */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#0d1117] rounded-lg p-8 w-full max-w-md relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
          <form action={sendResetCodeAction} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-[#0a0a0c] border-gray-800 text-white placeholder-gray-500 focus:border-gray-700 focus:ring-gray-700"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#1a2b4c] hover:bg-[#1f3461] text-white">
              Send Reset Code
            </Button>
          </form>
          {state?.error && <p className="mt-4 text-red-500">{state.error}</p>}
          {state?.success && (
            <p className="mt-4 text-green-500">Reset code sent successfully. Please check your email.</p>
          )}
        </div>
      </div>

      {/* Popup de verificação do código */}
      {showVerifyPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0d1117] rounded-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowVerifyPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Verify Reset Code</h2>
            <form action={handleVerifySubmit} className="space-y-4">
              <div>
                <Label htmlFor="code" className="text-gray-200">
                  Enter 6-digit Code
                </Label>
                <Input
                  id="code"
                  name="code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.slice(0, 6))}
                  placeholder="123456"
                  className="bg-[#0a0a0c] border-gray-800 text-white placeholder-gray-500 focus:border-gray-700 focus:ring-gray-700"
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#1a2b4c] hover:bg-[#1f3461] text-white">
                Verify Code
              </Button>
            </form>
            {verifyState?.error && <p className="mt-4 text-red-500">{verifyState.error}</p>}
            {verifyState?.success && (
              <p className="mt-4 text-green-500">Code verified successfully!</p>
            )}
          </div>
        </div>
      )}

      {/* Popup de redefinição de senha */}
      {showResetPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0d1117] rounded-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowResetPopup(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Set New Password</h2>
            <form action={handleResetSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-gray-200">
                  New Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="bg-[#0a0a0c] border-gray-800 text-white placeholder-gray-500 focus:border-gray-700 focus:ring-gray-700"
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-200">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="bg-[#0a0a0c] border-gray-800 text-white placeholder-gray-500 focus:border-gray-700 focus:ring-gray-700"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#1a2b4c] hover:bg-[#1f3461] text-white">
                Reset Password
              </Button>
            </form>
            {resetState?.error && <p className="mt-4 text-red-500">{resetState.error}</p>}
            {resetState?.success && (
              <p className="mt-4 text-green-500">Password reset successfully!</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}