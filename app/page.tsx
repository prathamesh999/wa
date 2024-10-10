'use client'
import React, { useState } from 'react'
import { PlusCircle, Calendar, ShoppingBag, Layers, User, X, LogIn, LogOut, UserPlus, ArrowRight, Check, Tag, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

// Simulated database
interface Outfit {
  id: number
  name: string
  items: string[]
  tags: string[]
}

const initialOutfits: Outfit[] = [
  { id: 1, name: 'Business Formal', items: ['https://ik.imagekit.io/vhveqxqyw/suit.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/white-shirt.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/dress-shoes.jpg?updatedAt=1697303716847'], tags: ['formal', 'work', 'professional'] },
  { id: 2, name: 'Casual Friday', items: ['https://ik.imagekit.io/vhveqxqyw/jeans.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/polo-shirt.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/sneakers.jpg?updatedAt=1697303716847'], tags: ['casual', 'work', 'comfortable'] },
  { id: 3, name: 'Weekend Casual', items: ['https://ik.imagekit.io/vhveqxqyw/chinos.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/t-shirt.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/loafers.jpg?updatedAt=1697303716847'], tags: ['casual', 'weekend', 'comfortable'] },
  { id: 4, name: 'Smart Casual', items: ['https://ik.imagekit.io/vhveqxqyw/blazer.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/dress-shirt.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/chinos.jpg?updatedAt=1697303716847'], tags: ['smart', 'versatile', 'stylish'] },
  { id: 5, name: 'Workout Ready', items: ['https://ik.imagekit.io/vhveqxqyw/sweatpants.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/t-shirt.jpg?updatedAt=1697303716847', 'https://ik.imagekit.io/vhveqxqyw/sneakers.jpg?updatedAt=1697303716847'], tags: ['sporty', 'comfortable', 'athletic'] },
]

const initialItems = [
  { id: 1, name: 'Navy Suit', image: 'https://ik.imagekit.io/vhveqxqyw/suit.jpg?updatedAt=1697303716847', tags: ['formal', 'professional'] },
  { id: 2, name: 'White Dress Shirt', image: 'https://ik.imagekit.io/vhveqxqyw/white-shirt.jpg?updatedAt=1697303716847', tags: ['formal', 'versatile'] },
  { id: 3, name: 'Blue Jeans', image: 'https://ik.imagekit.io/vhveqxqyw/jeans.jpg?updatedAt=1697303716847', tags: ['casual', 'versatile'] },
  { id: 4, name: 'Polo Shirt', image: 'https://ik.imagekit.io/vhveqxqyw/polo-shirt.jpg?updatedAt=1697303716847', tags: ['casual', 'smart'] },
  { id: 5, name: 'Chinos', image: 'https://ik.imagekit.io/vhveqxqyw/chinos.jpg?updatedAt=1697303716847', tags: ['smart', 'versatile'] },
  { id: 6, name: 'T-Shirt', image: 'https://ik.imagekit.io/vhveqxqyw/t-shirt.jpg?updatedAt=1697303716847', tags: ['casual', 'comfortable'] },
  { id: 7, name: 'Blazer', image: 'https://ik.imagekit.io/vhveqxqyw/blazer.jpg?updatedAt=1697303716847', tags: ['smart', 'professional'] },
  { id: 8, name: 'Dress Shoes', image: 'https://ik.imagekit.io/vhveqxqyw/dress-shoes.jpg?updatedAt=1697303716847', tags: ['formal', 'professional'] },
  { id: 9, name: 'Sneakers', image: 'https://ik.imagekit.io/vhveqxqyw/sneakers.jpg?updatedAt=1697303716847', tags: ['casual', 'sporty'] },
  { id: 10, name: 'Loafers', image: 'https://ik.imagekit.io/vhveqxqyw/loafers.jpg?updatedAt=1697303716847', tags: ['smart', 'versatile'] },
]

export default function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [view, setView] = useState<'items' | 'calendar' | 'outfits'>('outfits')
  const [items, setItems] = useState(initialItems)
  const [outfits, setOutfits] = useState<Outfit[]>(initialOutfits)
  const [newItemName, setNewItemName] = useState('')
  const [newItemImage, setNewItemImage] = useState<File | null>(null)
  const [newItemTags, setNewItemTags] = useState('')
  const [outfitsOfTheDay, setOutfitsOfTheDay] = useState<{[key: string]: number}>({})
  const [newOutfitName, setNewOutfitName] = useState('')
  const [newOutfitItems, setNewOutfitItems] = useState<string[]>([])
  const [newOutfitTags, setNewOutfitTags] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Registering with:', { username, email, password })
    alert('Account created successfully! You can now log in.')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setEmail('')
  }

  const handleSkipLogin = () => {
    setIsLoggedIn(true)
    setUsername('Guest')
  }

  const handleAddItem = () => {
    if (newItemName && newItemImage) {
      const newItem = {
        id: items.length + 1,
        name: newItemName,
        image: URL.createObjectURL(newItemImage),
        tags: newItemTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      }
      setItems([...items, newItem])
      setNewItemName('')
      setNewItemImage(null)
      setNewItemTags('')
    }
  }

  const removeTag = (itemId: number, tagToRemove: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, tags: item.tags.filter(tag => tag !== tagToRemove) }
        : item
    ))
  }

  const setOutfitOfTheDay = (date: string, outfitId: number) => {
    setOutfitsOfTheDay(prev => ({...prev, [date]: outfitId}))
  }

  const handleAddOutfit = () => {
    if (newOutfitName && newOutfitItems.length > 0) {
      const newOutfit: Outfit = {
        id: outfits.length + 1,
        name: newOutfitName,
        items: newOutfitItems,
        tags: newOutfitTags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      }
      setOutfits([...outfits, newOutfit])
      setNewOutfitName('')
      setNewOutfitItems([])
      setNewOutfitTags('')
    }
  }

  const renderCalendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    const calendarDays = []
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-24"></div>)
    }
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`
      const outfitOfTheDay = outfitsOfTheDay[date]
      const outfit = outfits.find(o => o.id === outfitOfTheDay)

      calendarDays.push(
        <div key={i} className="border p-1 h-24 relative">
          <div className="text-sm font-semibold">{i}</div>
          {i === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear() && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
          {outfit && (
            <div className="mt-1">
              <img src={outfit.items[0]} alt={outfit.name} className="w-8 h-8 object-cover rounded" />
            </div>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="absolute bottom-1 right-1 h-6 w-6 p-0">
                {outfit ? <Check className="h-4 w-4" /> : <PlusCircle className="h-4 w-4" />}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              <Select onValueChange={(value) => setOutfitOfTheDay(date, parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select outfit" />
                </SelectTrigger>
                <SelectContent>
                  {outfits.map((outfit) => (
                    <SelectItem key={outfit.id} value={outfit.id.toString()}>
                      {outfit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>
        </div>
      )
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map(day => (
            <div key={day} className="text-center font-medium text-sm">{day}</div>
          ))}
          {calendarDays}
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Wardrobe App</CardTitle>
            <CardDescription>Login, create an account, or try as a guest</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs  defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Username</Label>
                    <Input
                      id="login-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleSkipLogin}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Skip Login (Try as Guest)
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} min-h-screen p-4`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Wardrobe App</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">{username}</span>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4" />
          </div>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Today's Outfit</CardTitle>
          <CardDescription>{new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">-3° to +8°</p>
              <p>90% precipitation</p>
            </div>
            <img src={outfits[0].items[0]} alt="Outfit suggestion" className="w-1/3 h-auto rounded-lg shadow-md" />
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <Tabs defaultValue={view} onValueChange={(value) => setView(value as 'items' | 'calendar' | 'outfits')}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="outfits">Outfits</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <TabsContent value="outfits">
            <Card>
              <CardHeader>
                <CardTitle>My Outfits</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-2 gap-4 pr-4">
                    {outfits.map((outfit) => (
                      <Card key={outfit.id}>
                        <CardHeader>
                          <CardTitle>{outfit.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {outfit.items.map((item, index) => (
                              <img key={index} src={item} alt="Outfit item" className="w-12 h-12 object-cover rounded" />
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {outfit.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add New Outfit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Outfit</DialogTitle>
                      <DialogDescription>Create a new outfit by selecting items and adding tags.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="outfit-name">Outfit Name</Label>
                        <Input
                          id="outfit-name"
                          value={newOutfitName}
                          onChange={(e) => setNewOutfitName(e.target.value)}
                          placeholder="Enter outfit name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Select Items</Label>
                        <ScrollArea className="h-32 border rounded">
                          <div className="p-2">
                            {items.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2 mb-2">
                                <input
                                  type="checkbox"
                                  id={`item-${item.id}`}
                                  checked={newOutfitItems.includes(item.image)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setNewOutfitItems([...newOutfitItems, item.image])
                                    } else {
                                      setNewOutfitItems(newOutfitItems.filter(i => i !== item.image))
                                    }
                                  }}
                                />
                                <Label htmlFor={`item-${item.id}`}>{item.name}</Label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="outfit-tags">Tags (comma-separated)</Label>
                        <Input
                          id="outfit-tags"
                          value={newOutfitTags}
                          onChange={(e) => setNewOutfitTags(e.target.value)}
                          placeholder="e.g. casual, summer, work"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddOutfit}>Add Outfit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="items">
            <Card>
              <CardHeader>
                <CardTitle>My Items</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pr-4">
                    {items.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-2">
                          <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2 rounded" />
                          <p className="text-sm font-medium mb-1">{item.name}</p>
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 ml-1"
                                  onClick={() => removeTag(item.id, tag)}
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">Remove tag</span>
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add New Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Item</DialogTitle>
                      <DialogDescription>Add a new item to your wardrobe.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="item-name">Item Name</Label>
                        <Input
                          id="item-name"
                          value={newItemName}
                          onChange={(e) => setNewItemName(e.target.value)}
                          placeholder="Enter item name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-image">Item Image</Label>
                        <Input
                          id="item-image"
                          type="file"
                          onChange={(e) => setNewItemImage(e.target.files?.[0] || null)}
                          accept="image/*"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-tags">Tags (comma-separated)</Label>
                        <Input
                          id="item-tags"
                          value={newItemTags}
                          onChange={(e) => setNewItemTags(e.target.value)}
                          placeholder="e.g. casual, summer, blue"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddItem}>Add Item</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="calendar">
            {renderCalendar()}
          </TabsContent>
        </Tabs>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex justify-around p-2">
        <Button variant="ghost" size="icon" onClick={() => setView('calendar')}>
          <Calendar className="w-6 h-6" />
          <span className="sr-only">Calendar</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setView('items')}>
          <ShoppingBag className="w-6 h-6" />
          <span className="sr-only">Items</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setView('outfits')}>
          <Layers className="w-6 h-6" />
          <span className="sr-only">Outfits</span>
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-6 h-6" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </div>
  )
}