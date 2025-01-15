// app/components/DelhiGuide.tsx
'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Clock, Train, Utensils, ArrowRight, Camera, Ticket, Coffee, Sun, Moon, ShoppingBag } from 'lucide-react'

interface Recommendation {
  title: string
  description: string
  timing?: string
  cost?: string
  icon: keyof typeof iconMapping
}

interface ItineraryItem {
  time: string
  location: string
  activity: string
  duration: string
  details: string
  type: 'transit' | 'food' | 'attraction' | 'shopping'
  metroInstructions?: {
    fromLine?: string
    toLine?: string
    exitGate?: string
    platformInfo?: string
    details?:string
    changes?: string[]
  }
  recommendations?: Recommendation[]
}

const iconMapping = {
  camera: Camera,
  ticket: Ticket,
  coffee: Coffee,
  sun: Sun,
  moon: Moon,
  shopping: ShoppingBag
}

const touristItinerary: ItineraryItem[] = [
    {
      time: "10:00 AM",
      location: "Tilak Nagar Metro Station",
      activity: "Start Journey",
      duration: "25 mins",
      details: "Board Blue Line metro towards Noida City Centre",
      type: "transit",
      metroInstructions: {
        fromLine: "Blue Line",
        platformInfo: "Platform 2 (Towards Noida/Vaishali)",
      }
    },
    {
      time: "10:25 AM",
      location: "Supreme Court Metro Station",
      activity: "Visit India Gate",
      duration: "1 hour 30 mins",
      details: "15 mins auto ride to location. Recommended activities: Walk through the lawns, photography, view the eternal flame. Best for morning photos.",
      type: "attraction",
      metroInstructions: {
        fromLine: "Blue Line",
        exitGate: "Gate 3",
        platformInfo: "Get off at Platform 1",
      }
    },
    {
      time: "12:00 PM",
      location: "Central Secretariat",
      activity: "Visit Rashtrapati Bhavan",
      duration: "1 hour",
      details: "15 mins auto ride. View the magnificent presidential residence and Mughal Gardens (if open). Photography allowed from designated points.",
      type: "attraction",
      metroInstructions: {
        fromLine: "Blue Line",
        toLine: "Yellow Line",
        changes: [
          "At Rajiv Chowk, transfer to Yellow Line (towards Samaypur Badli)",
          "Take escalator to Yellow Line platform",
          "One stop to Central Secretariat"
        ],
        exitGate: "Gate 1"
      }
    },
    {
      time: "1:15 PM",
      location: "Connaught Place",
      activity: "Lunch at Pandara Road",
      duration: "1 hour",
      details: "Famous for North Indian cuisine. Recommended: Have Dal Makhani, Butter Chicken at Gulati's or Pindi Restaurant. Walking distance from station.",
      type: "food",
      metroInstructions: {
        fromLine: "Yellow Line",
        toLine: "Blue Line",
        changes: [
          "Return to Central Secretariat station",
          "Take Yellow Line to Rajiv Chowk",
          "Exit from Gate 7 for direct access to Connaught Place"
        ]
      }
    },
    {
      time: "2:30 PM",
      location: "Rajiv Chowk",
      activity: "Visit Jama Masjid & Red Fort",
      duration: "2 hours 30 mins",
      details: "20 mins auto ride. Start with Jama Masjid (45 mins), then walk to Red Fort (1 hour 45 mins). Remember to dress modestly for the mosque.",
      type: "attraction",
      metroInstructions: {
        exitGate: "Gate 5",
        details: "Auto stand available right outside Gate 5"
      }
    },
    {
      time: "5:15 PM",
      location: "Kalkaji Mandir",
      activity: "Visit Lotus Temple",
      duration: "1 hour",
      details: "10 mins walk from station. Perfect for evening visit. Meditation hall requires silence.",
      type: "attraction",
      metroInstructions: {
        fromLine: "Blue Line",
        toLine: "Violet Line",
        changes: [
          "At Mandi House, transfer to Violet Line",
          "Follow signs for Violet Line platform",
          "Take train towards Badarpur Border"
        ],
        exitGate: "Gate 2",
        platformInfo: "Temple is visible from station exit"
      }
    },
    {
      time: "6:30 PM",
      location: "Qutub Minar",
      activity: "Visit Qutub Minar",
      duration: "1 hour",
      details: "Last entry by 5:30 PM. Beautiful evening views. Explore the ancient ruins and iron pillar.",
      type: "attraction",
      metroInstructions: {
        fromLine: "Violet Line",
        toLine: "Yellow Line",
        changes: [
          "Return to Central Secretariat",
          "Take Yellow Line towards HUDA City Centre",
          "Get down at Qutub Minar station"
        ],
        exitGate: "Gate 2",
        platformInfo: "Follow signage for Qutub Minar complex"
      }
    },
    {
      time: "7:45 PM",
      location: "Journey End",
      activity: "Return Journey",
      duration: "30 mins",
      details: "Board Blue Line metro back to Tilak Nagar",
      type: "transit",
      metroInstructions: {
        fromLine: "Yellow Line",
        toLine: "Blue Line",
        changes: [
          "Take Yellow Line to Rajiv Chowk",
          "Transfer to Blue Line platform (follow signs)",
          "Take train towards Dwarka"
        ]
      }
    }
  ]

const shoppingItinerary: ItineraryItem[] = [
  {
    time: "10:00 AM",
    location: "Tilak Nagar Metro Station",
    activity: "Start Journey",
    duration: "20 mins",
    details: "Board Blue Line metro towards Noida City Centre",
    type: "transit",
    metroInstructions: {
      fromLine: "Blue Line",
      platformInfo: "Platform 2 (Towards Noida/Vaishali)",
    }
  },
  {
    time: "10:30 AM",
    location: "Karol Bagh",
    activity: "Karol Bagh Market",
    duration: "2 hours",
    details: "Famous for traditional Indian wear, electronics, and accessories",
    type: "shopping",
    metroInstructions: {
      fromLine: "Blue Line",
      exitGate: "Gate 1",
      platformInfo: "Follow signs to Ajmal Khan Road"
    },
    recommendations: [
      {
        title: "Ajmal Khan Road",
        description: "Main shopping street with clothing stores",
        timing: "10 AM - 9 PM",
        icon: "shopping"
      },
      {
        title: "Gaffar Market",
        description: "Electronics and gadgets market",
        timing: "11 AM - 8 PM",
        icon: "shopping"
      }
    ]
  },
  {
    time: "12:45 PM",
    location: "Rajiv Chowk",
    activity: "Janpath Market",
    duration: "1 hour 30 mins",
    details: "Street shopping paradise with clothing, accessories, and souvenirs",
    type: "shopping",
    metroInstructions: {
      fromLine: "Blue Line",
      exitGate: "Gate 7",
      platformInfo: "Direct access to Janpath"
    },
    recommendations: [
      {
        title: "Tibetan Market",
        description: "Handicrafts and winter wear",
        timing: "11 AM - 7:30 PM",
        icon: "shopping"
      },
      {
        title: "Street Shopping",
        description: "Bargain for clothes and accessories",
        timing: "Best before 6 PM",
        icon: "shopping"
      }
    ]
  },
  {
    time: "2:30 PM",
    location: "INA",
    activity: "Dilli Haat",
    duration: "2 hours",
    details: "Cultural shopping complex with handicrafts and food stalls",
    type: "shopping",
    metroInstructions: {
      fromLine: "Yellow Line",
      toLine: "Pink Line",
      changes: ["Change at INA station", "Follow signs to Dilli Haat"],
      exitGate: "Gate 3"
    },
    recommendations: [
      {
        title: "Handicrafts Shopping",
        description: "State-wise handicraft stalls",
        timing: "11 AM - 9 PM",
        cost: "Entry: ₹30",
        icon: "shopping"
      },
      {
        title: "Food Court",
        description: "Traditional food from different states",
        timing: "Lunch recommended",
        icon: "coffee"
      }
    ]
  },
  {
    time: "4:45 PM",
    location: "Lajpat Nagar",
    activity: "Lajpat Nagar Central Market",
    duration: "2 hours",
    details: "Popular for clothing, cosmetics, and wedding shopping",
    type: "shopping",
    metroInstructions: {
      fromLine: "Pink Line",
      exitGate: "Gate 4",
      platformInfo: "5-minute walk to market"
    },
    recommendations: [
      {
        title: "Central Market",
        description: "Traditional wear and accessories",
        timing: "11 AM - 8 PM",
        icon: "shopping"
      },
      {
        title: "Street Food",
        description: "Famous for chaat and snacks",
        timing: "Evening recommended",
        icon: "coffee"
      }
    ]
  },
  {
    time: "7:00 PM",
    location: "Green Park",
    activity: "Sarojini Nagar Market",
    duration: "1 hour 30 mins",
    details: "Budget shopping paradise for export surplus clothing",
    type: "shopping",
    metroInstructions: {
      fromLine: "Yellow Line",
      exitGate: "Gate 2",
      platformInfo: "Take auto to market"
    },
    recommendations: [
      {
        title: "Export Surplus",
        description: "Branded clothes at bargain prices",
        timing: "Best before closing",
        icon: "shopping"
      },
      {
        title: "Bargaining Tips",
        description: "Start at 40% of quoted price",
        icon: "ticket"
      }
    ]
  },
  {
    time: "8:45 PM",
    location: "Journey End",
    activity: "Return Journey",
    duration: "30 mins",
    details: "Board Blue Line metro back to Tilak Nagar",
    type: "transit",
    metroInstructions: {
      fromLine: "Yellow Line",
      toLine: "Blue Line",
      changes: [
        "Take Yellow Line to Rajiv Chowk",
        "Transfer to Blue Line platform",
        "Take train towards Dwarka"
      ]
    }
  }
]

export default function DelhiGuide() {
  const [selectedDay, setSelectedDay] = useState<'tuesday' | 'wednesday'>('tuesday')

  const getIconByType = (type: ItineraryItem['type']) => {
    switch(type) {
      case 'food': return <Utensils className="w-6 h-6 text-orange-500" />
      case 'transit': return <Train className="w-6 h-6 text-blue-500" />
      case 'attraction': return <MapPin className="w-6 h-6 text-red-500" />
      case 'shopping': return <ShoppingBag className="w-6 h-6 text-pink-500" />
      default: return <Clock className="w-6 h-6 text-gray-500" />
    }
  }

  const RecommendationIcon = ({ name }: { name: keyof typeof iconMapping }) => {
    const IconComponent = iconMapping[name]
    return <IconComponent className="w-5 h-5" />
  }

  const currentItinerary = selectedDay === 'tuesday' ? shoppingItinerary : touristItinerary

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">Delhi Guide</h1>
      
      {/* Day Selection Tabs */}
      <div className="flex flex-col sm:flex-row justify-center mb-8 space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={() => setSelectedDay('tuesday')}
          className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto ${
            selectedDay === 'tuesday'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Tuesday - Shopping
        </button>
        <button
          onClick={() => setSelectedDay('wednesday')}
          className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto ${
            selectedDay === 'wednesday'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Wednesday - Tourist Spots
        </button>
      </div>

      <div className="relative">
        {/* Timeline line - Adjust position for mobile */}
        <div className="absolute left-6 sm:left-24 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        {currentItinerary.map((item, index) => (
          <div key={index} className="relative mb-8">
            {/* Time - Adjust position and size for mobile */}
            <div className="absolute left-0 w-12 sm:w-20 text-xs sm:text-sm font-semibold text-gray-600">
              {item.time}
            </div>
            
            {/* Icon - Adjust position for mobile */}
            <div className="absolute left-[20px] sm:left-[88px] bg-white rounded-full p-1.5 sm:p-2">
              {getIconByType(item.type)}
            </div>
            
            {/* Content Card - Adjust margin and padding for mobile */}
            <Card className="ml-16 sm:ml-36 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">{item.activity}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{item.location}</p>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {item.duration}
                  </div>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-gray-600">{item.details}</p>
                
                {item.recommendations && (
                  <div className="mt-3 sm:mt-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      {selectedDay === 'tuesday' ? 'Shopping Tips:' : 'Recommended Activities:'}
                    </h4>
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                      {item.recommendations.map((rec, idx) => (
                        <div 
                          key={idx}
                          className="bg-gray-50 rounded-lg p-2 sm:p-3 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <div className="p-1.5 sm:p-2 bg-white rounded-full shadow-sm">
                              <RecommendationIcon name={rec.icon} />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-sm sm:text-base text-gray-900">{rec.title}</h5>
                              <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">{rec.description}</p>
                              {(rec.timing || rec.cost) && (
                                <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                                  {rec.timing && (
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {rec.timing}
                                    </div>
                                  )}
                                  {rec.cost && (
                                    <div className="flex items-center text-xs text-gray-500">
                                      <Ticket className="w-3 h-3 mr-1" />
                                      {rec.cost}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {item.metroInstructions && (
                  <div className="mt-3 sm:mt-4 bg-blue-50 p-2 sm:p-3 rounded-md">
                    <p className="text-xs sm:text-sm font-semibold text-blue-800 mb-1 sm:mb-2">Metro Navigation:</p>
                    {item.metroInstructions.fromLine && (
                      <div className="flex items-center text-xs sm:text-sm text-blue-700">
                        <Train className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {item.metroInstructions.fromLine}
                        {item.metroInstructions.toLine && (
                          <>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1" />
                            {item.metroInstructions.toLine}
                          </>
                        )}
                      </div>
                    )}
                    {item.metroInstructions.platformInfo && (
                      <p className="text-xs sm:text-sm text-blue-700 mt-1">
                        {item.metroInstructions.platformInfo}
                      </p>
                    )}
                    {item.metroInstructions.exitGate && (
                      <p className="text-xs sm:text-sm text-blue-700 mt-1">
                        Exit from: {item.metroInstructions.exitGate}
                      </p>
                    )}
                    {item.metroInstructions.changes && (
                      <ul className="mt-1 space-y-0.5 sm:space-y-1">
                        {item.metroInstructions.changes.map((change, i) => (
                          <li key={i} className="text-xs sm:text-sm text-blue-700 flex items-start">
                            <span className="mr-2">•</span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-lg text-xs sm:text-sm text-gray-600">
        <p className="font-semibold mb-2">Important Notes:</p>
        <ul className="list-disc pl-4 space-y-1">
          {selectedDay === 'tuesday' ? (
            <>
              <li>Most markets are closed on Mondays</li>
              <li>Carry cash for better bargaining</li>
              <li>Best bargaining time is early morning or late evening</li>
              <li>Avoid carrying large bags while shopping</li>
              <li>Keep your belongings safe in crowded markets</li>
              <li>Take photos of items before bargaining</li>
            </>
          ) : (
            <>
              <li>Buy a full-day Tourist Metro Card to save time and money</li>
              <li>Keep Google Maps downloaded offline as backup</li>
              <li>During peak hours (9-11 AM & 5-7 PM), stations might be crowded</li>
              <li>Carry sufficient water and wear comfortable shoes</li>
              <li>Always check the direction of the train before boarding</li>
              <li>Keep metro card handy to avoid queues</li>
              <li>Take photos of station maps for reference</li>
              <li>Carry cash for auto rides and entry tickets</li>
              <li>Consider weather conditions and adjust timings accordingly</li>
            </>
          )}
        </ul>
      </div>


      {selectedDay === 'tuesday' && (
        <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-pink-50 rounded-lg text-xs sm:text-sm text-gray-600">
          <p className="font-semibold mb-2 text-pink-800">Shopping Tips:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Bargaining is expected - start at 40-50% of quoted price</li>
            <li>Morning hours are best for serious shopping</li>
            <li>Weekday shopping means less crowds</li>
            <li>Carry eco-friendly shopping bags</li>
            <li>Compare prices across shops before buying</li>
            <li>Check for quality and defects before purchasing</li>
            <li>Keep small currency notes handy for bargaining</li>
            <li>Try clothes before buying as returns aren&apos;t usually accepted</li>
          </ul>
        </div>
      )}
    </div>
  )
}