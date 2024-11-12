"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Calendar, Heart, LineChart, MoreVertical, Plus, User, Activity, Flame, Moon, Droplet, Zap, Candy, Apple, Dumbbell, Info, Brain, ArrowRight, Wind } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const healthFactors = [
  { icon: Heart, label: "Heart Rate", value: "72 bpm" },
  { icon: Moon, label: "Sleep Quality", value: "85%" },
  { icon: Apple, label: "Diet", value: "Good" },
  { icon: Dumbbell, label: "Exercise", value: "3/5 days" },
  { icon: Activity, label: "Blood Pressure", value: "120/80" },
  { icon: Wind, label: "O2 Levels", value: "98%" },
]

const healthBreakdown = [
  { category: "Nutrition", percentage: 30, color: "bg-green-500" },
  { category: "Fitness", percentage: 25, color: "bg-blue-500" },
  { category: "Mental Well-being", percentage: 20, color: "bg-purple-500" },
  { category: "Hydration", percentage: 15, color: "bg-cyan-500" },
  { category: "Sleep", percentage: 10, color: "bg-indigo-500" },
]

export default function HealthDashboard() {
  const [healthScore, setHealthScore] = useState(72)
  const [trend, setTrend] = useState(0)
  const [activeTimeframe, setActiveTimeframe] = useState("daily")
  const [currentTipIndex, setCurrentTipIndex] = useState(0)

  const healthMetrics = [
    { title: "Steps Today", icon: Activity, value: "8,594", subtext: "85% of daily goal" },
    { title: "Calories Burned", icon: Flame, value: "1,463", subtext: "+201 from yesterday" },
    { title: "Sleep", icon: Moon, value: "7h 12m", subtext: "+32m from last week avg" },
    { title: "Blood Pressure", icon: Activity, value: "120/80", subtext: "Normal" },
    { title: "ECG", icon: Zap, value: "Normal", subtext: "Last checked 2 days ago" },
    { title: "Diabetic Levels", icon: Candy, value: "5.4%", subtext: "HbA1c - Good control" },
  ]

  const healthTips = [
    {
      category: "Hydration",
      icon: Droplet,
      tip: "Try to increase your daily water intake by 500ml",
      progress: 60,
      action: "Set a reminder",
    },
    {
      category: "Mental Wellness",
      icon: Brain,
      tip: "Consider adding a 10-minute meditation to your routine",
      progress: 30,
      action: "Try guided meditation",
    },
    {
      category: "Nutrition",
      icon: Apple,
      tip: "Include more leafy greens in your diet this week",
      progress: 45,
      action: "View healthy recipes",
    },
    {
      category: "Sleep",
      icon: Moon,
      tip: "Your sleep pattern has improved. Keep it up!",
      progress: 80,
      action: "See sleep analysis",
    },
  ]

  useEffect(() => {
    // Simulate score changes over time
    const interval = setInterval(() => {
      setHealthScore(prevScore => {
        const newScore = Math.max(0, Math.min(100, prevScore + Math.floor(Math.random() * 5) - 2))
        setTrend(newScore - prevScore)
        return newScore
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getScoreColor = (score: number) => {
    if (score < 50) return "text-red-500"
    if (score < 75) return "text-yellow-500"
    return "text-green-500"
  }

  const nextTip = useCallback(() => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % healthTips.length)
  }, [healthTips.length])

  const currentTip = healthTips[currentTipIndex]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Health Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LineChart className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Schedule</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-6 space-y-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-2xl">Health Score</CardTitle>
            <CardDescription>Your overall health status and breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="relative w-64 h-64">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <motion.circle
                    className={`${getScoreColor(healthScore)} stroke-current`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: healthScore / 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className={`text-4xl font-bold ${getScoreColor(healthScore)}`}
                    key={healthScore}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {healthScore}
                  </motion.span>
                  <span className="text-sm text-gray-500">out of 100</span>
                  <AnimatePresence>
                    {trend !== 0 && (
                      <motion.span
                        className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Health Factors</h3>
                <div className="grid grid-cols-2 gap-4">
                  {healthFactors.map((factor, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <factor.icon className="h-4 w-4 mr-2" />
                            {factor.label}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{factor.label}: {factor.value}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Health Score Breakdown</h3>
              <Tabs value={activeTimeframe} onValueChange={setActiveTimeframe}>
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTimeframe} className="mt-4">
                  <div className="h-8 w-full flex rounded-full overflow-hidden">
                    {healthBreakdown.map((item, index) => (
                      <motion.div
                        key={item.category}
                        className={`${item.color} h-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between">
                    {healthBreakdown.map((item) => (
                      <div key={item.category} className="text-center">
                        <div className={`w-3 h-3 rounded-full ${item.color} mx-auto`} />
                        <p className="text-xs mt-1">{item.category}</p>
                        <p className="text-xs font-semibold">{item.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {healthMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-2">{metric.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>You had 6 activities this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  { id: 1, title: "Completed 10,000 steps", date: "2023-06-10", time: "11:30 PM" },
                  { id: 2, title: "Logged meal: Grilled Chicken Salad", date: "2023-06-10", time: "1:15 PM" },
                  { id: 3, title: "Completed 30-min Yoga session", date: "2023-06-09", time: "7:00 AM" },
                ].map((activity) => (
                  <div key={activity.id} className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{activity.title[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.date} at {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button className="w-full">
                <LineChart className="mr-2 h-4 w-4" />
                View Health Trends
              </Button>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Log Health Data
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Health Tips</CardTitle>
              <CardDescription>Personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              {currentTip && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <currentTip.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{currentTip.category}</h3>
                      <p className="text-sm text-muted-foreground">{currentTip.tip}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{currentTip.progress}%</span>
                    </div>
                    <Progress value={currentTip.progress} className="w-full" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      {currentTip.action}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={nextTip}>
                      Next Tip
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
