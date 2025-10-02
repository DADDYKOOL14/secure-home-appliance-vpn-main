"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Wifi, Smartphone } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Private VPN</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Control Your Home Appliances
          <br />
          <span className="text-primary">Securely & Remotely</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Access and control your home devices from anywhere with enterprise-grade security. 
          Built on ESP32 technology for reliable, encrypted connections.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">
              Start Free Trial
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose Private VPN?</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h4 className="text-xl font-semibold mb-2">Secure Access</h4>
            <p className="text-muted-foreground">
              Military-grade encryption protects your connection and data
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h4 className="text-xl font-semibold mb-2">Private Network</h4>
            <p className="text-muted-foreground">
              Your own isolated network for complete privacy
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Wifi className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h4 className="text-xl font-semibold mb-2">ESP32 Powered</h4>
            <p className="text-muted-foreground">
              Reliable IoT connectivity with low power consumption
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <Smartphone className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h4 className="text-xl font-semibold mb-2">Remote Control</h4>
            <p className="text-muted-foreground">
              Control your devices from anywhere in the world
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-muted/50 rounded-lg">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex gap-4 items-start">
            <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Create Your Account</h4>
              <p className="text-muted-foreground">
                Sign up for free and get instant access to your secure dashboard
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Register Your ESP32 Device</h4>
              <p className="text-muted-foreground">
                Connect your ESP32 and home appliances to generate a unique secure ID
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Control Remotely</h4>
              <p className="text-muted-foreground">
                Access your control panel and manage all your devices with a single click
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 text-center text-muted-foreground">
        <p>&copy; 2024 Private VPN. All rights reserved.</p>
      </footer>
    </div>
  )
}