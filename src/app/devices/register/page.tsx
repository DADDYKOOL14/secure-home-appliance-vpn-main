"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Shield, Copy, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DeviceRegisterPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [deviceName, setDeviceName] = useState("")
  const [deviceType, setDeviceType] = useState("")
  const [esp32Id, setEsp32Id] = useState("")
  const [generatedId, setGeneratedId] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/login")
      return
    }
    setCurrentUser(JSON.parse(user))
  }, [router])

  const generateUniqueId = () => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    return `ESP32-${timestamp}-${random}`.toUpperCase()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!deviceName.trim() || !deviceType || !esp32Id.trim()) {
      setError("Please fill in all fields")
      return
    }

    const uniqueId = generateUniqueId()
    
    const newDevice = {
      id: uniqueId,
      name: deviceName,
      type: deviceType,
      esp32Id: esp32Id,
      userId: currentUser.id,
      status: false, // off by default
      createdAt: new Date().toISOString()
    }

    // Save device to localStorage
    const devices = JSON.parse(localStorage.getItem("devices") || "[]")
    devices.push(newDevice)
    localStorage.setItem("devices", JSON.stringify(devices))

    setGeneratedId(uniqueId)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  if (!currentUser) {
    return null
  }

  if (generatedId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2">Device Registered!</h2>
          <p className="text-muted-foreground text-center mb-6">
            Your unique device ID has been generated
          </p>
          
          <div className="bg-muted p-4 rounded-lg mb-4">
            <Label className="text-sm mb-2 block">Unique Device ID</Label>
            <div className="flex gap-2">
              <code className="flex-1 bg-background p-3 rounded text-sm font-mono break-all">
                {generatedId}
              </code>
              <Button
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
              >
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-4 rounded-lg mb-6 text-sm">
            <p className="font-semibold mb-2">Important:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Copy this ID to your ESP32 configuration</li>
              <li>Use this ID to authenticate your device</li>
              <li>Keep this ID secure and private</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <Button onClick={goToDashboard} className="w-full">
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setGeneratedId("")
                setDeviceName("")
                setDeviceType("")
                setEsp32Id("")
              }}
              className="w-full"
            >
              Register Another Device
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Private VPN</h1>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2">Register ESP32 Device</h2>
        <p className="text-muted-foreground text-center mb-6">
          Connect your home appliance to the network
        </p>
        
        {error && (
          <div className="bg-destructive/10 text-destructive px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="deviceName">Device Name</Label>
            <Input
              id="deviceName"
              type="text"
              placeholder="e.g., Living Room Light"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="deviceType">Device Type</Label>
            <select
              id="deviceType"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="">Select device type</option>
              <option value="light">Light</option>
              <option value="fan">Fan</option>
              <option value="ac">Air Conditioner</option>
              <option value="heater">Heater</option>
              <option value="door">Smart Door Lock</option>
              <option value="camera">Camera</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="esp32Id">ESP32 MAC Address</Label>
            <Input
              id="esp32Id"
              type="text"
              placeholder="e.g., 30:AE:A4:12:34:56"
              value={esp32Id}
              onChange={(e) => setEsp32Id(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter your ESP32 device MAC address
            </p>
          </div>
          
          <Button type="submit" className="w-full">
            Register Device
          </Button>
        </form>
        
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full mt-4">
            Skip to Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  )
}