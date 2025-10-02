"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Shield, Plus, LogOut, Lightbulb, Fan, Snowflake, Flame, Lock, Camera, Box } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Device {
  id: string
  name: string
  type: string
  esp32Id: string
  userId: string
  status: boolean
  createdAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [devices, setDevices] = useState<Device[]>([])

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (!user) {
      router.push("/login")
      return
    }
    const parsedUser = JSON.parse(user)
    setCurrentUser(parsedUser)

    // Load user's devices
    const allDevices = JSON.parse(localStorage.getItem("devices") || "[]")
    const userDevices = allDevices.filter((d: Device) => d.userId === parsedUser.id)
    setDevices(userDevices)
  }, [router])

  const toggleDevice = (deviceId: string) => {
    // Update local state
    const updatedDevices = devices.map(device =>
      device.id === deviceId ? { ...device, status: !device.status } : device
    )
    setDevices(updatedDevices)

    // Update localStorage
    const allDevices = JSON.parse(localStorage.getItem("devices") || "[]")
    const updatedAllDevices = allDevices.map((d: Device) =>
      d.id === deviceId ? { ...d, status: !d.status } : d
    )
    localStorage.setItem("devices", JSON.stringify(updatedAllDevices))
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "light":
        return <Lightbulb className="h-8 w-8" />
      case "fan":
        return <Fan className="h-8 w-8" />
      case "ac":
        return <Snowflake className="h-8 w-8" />
      case "heater":
        return <Flame className="h-8 w-8" />
      case "door":
        return <Lock className="h-8 w-8" />
      case "camera":
        return <Camera className="h-8 w-8" />
      default:
        return <Box className="h-8 w-8" />
    }
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Private VPN</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {currentUser.name}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Control Panel</h2>
            <p className="text-muted-foreground">
              Manage your connected devices
            </p>
          </div>
          <Link href="/devices/register">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </Link>
        </div>

        {devices.length === 0 ? (
          <Card className="p-12 text-center">
            <Box className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No Devices Yet</h3>
            <p className="text-muted-foreground mb-6">
              Register your first ESP32 device to get started
            </p>
            <Link href="/devices/register">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Register Device
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((device) => (
              <Card key={device.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-lg ${device.status ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {getDeviceIcon(device.type)}
                  </div>
                  <Switch
                    checked={device.status}
                    onCheckedChange={() => toggleDevice(device.id)}
                  />
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{device.name}</h3>
                <p className="text-sm text-muted-foreground capitalize mb-2">
                  {device.type}
                </p>
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                  <div className={`h-2 w-2 rounded-full ${device.status ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-xs text-muted-foreground">
                    {device.status ? 'Online' : 'Offline'}
                  </span>
                </div>
                
                <div className="mt-2 text-xs text-muted-foreground font-mono">
                  ID: {device.id.substring(0, 20)}...
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {devices.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="p-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Total Devices
              </h4>
              <p className="text-3xl font-bold">{devices.length}</p>
            </Card>
            
            <Card className="p-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Active Devices
              </h4>
              <p className="text-3xl font-bold text-green-500">
                {devices.filter(d => d.status).length}
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Offline Devices
              </h4>
              <p className="text-3xl font-bold text-gray-400">
                {devices.filter(d => !d.status).length}
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}