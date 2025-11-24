import React, { useState, useEffect, Fragment } from "react";
import { Check, ChevronDown, Plane, Heart, ChevronUp } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";
import swiss from "../images/swiss.png";
import turkish from "../images/turkish.png";
import wizz from "../images/wizz.png";
import pegasus from "../images/pegasus.png";
import a_jet from "../images/a_jet.png";
import airAlbania from "../images/air_alb.png";
import austrian from "../images/austrian.png";
import ryan_air from "../images/ryan_air.png";
import british from "../images/british.png";
import lufthansa from "../images/lufthansa.png";
import easyJet from "../images/easyJet.png";
import aegean from "../images/aegean.png";

const baseFlights = [
  { id: 1, from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "IST", airline: turkish, validDays: [0, 1, 2, 3, 4, 5, 6], oneWay: { departure: "08:55", arrival: "12:40", duration: "1h 45min", price: 75 }, return: { departure: "16:25", arrival: "16:10", returnTo: "Prishtina", returnToCode: "PRN" } },

  { id: 3, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", airline: british, validDays: [1, 3, 5], oneWay: { departure: "10:30", arrival: "13:35", duration: "3h 05min", price: 191 }, return: { departure: "18:45", arrival: "21:50", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 4, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", airline: wizz, validDays: [0, 1, 3, 5, 6, 7], oneWay: { departure: "10:30", arrival: "11:45", duration: "1h 15min", price: 69 }, return: { departure: "18:20", arrival: "19:35", returnTo: "Prishtina", returnToCode: "PRN" } },

  { id: 6, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", airline: turkish, validDays: [0, 5, 6], oneWay: { departure: "09:00", arrival: "11:10", duration: "2h 10min", price: 181 }, return: { departure: "17:30", arrival: "19:40", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 7, from: "Tirana", fromCode: "TIA", to: "Paris", toCode: "CDG", airline: ryan_air, validDays: [0, 1, 4, 6], oneWay: { departure: "10:30", arrival: "12:45", duration: "2h 15min", price: 75 }, return: { departure: "18:00", arrival: "20:15", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 8, from: "Tirana", fromCode: "TIA", to: "Barcelona", toCode: "BCN", airline: aegean, validDays: [4], oneWay: { departure: "10:05", arrival: "17:50", duration: "7h 45min", price: 134 }, return: { departure: "10:05", arrival: "17:50", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 9, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", airline: austrian, validDays: [0, 6], oneWay: { departure: "08:45", arrival: "11:00", duration: "2h 15min", price: 256 }, return: { departure: "17:00", arrival: "19:15", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 10, from: "Tirana", fromCode: "TIA", to: "Budapest", toCode: "BUD", airline: austrian, validDays: [0, 2, 5], oneWay: { departure: "12:15", arrival: "17:15", duration: "5h 00min", price: 137 }, return: { departure: "12:15", arrival: "17:15", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 11, from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "SAW", airline: pegasus, validDays: [0, 2, 5, 6], oneWay: { departure: "10:20", arrival: "11:55", duration: "1h 35min", price: 30 }, return: { departure: "18:10", arrival: "19:45", returnTo: "Prishtina", returnToCode: "PRN" } },

  { id: 13, from: "Prishtina", fromCode: "PRN", to: "Barcelona", toCode: "BCN", airline: austrian, validDays: [3], oneWay: { departure: "12:25", arrival: "19:45", duration: "7h 20min", price: 261 }, return: { departure: "12:25", arrival: "19:45", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 14, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", airline: ryan_air, validDays: [0, 3, 4, 6], oneWay: { departure: "11:00", arrival: "14:10", duration: "3h 10min", price: 135 }, return: { departure: "19:00", arrival: "22:10", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 15, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", airline: austrian, validDays: [0, 6], oneWay: { departure: "09:00", arrival: "10:20", duration: "1h 20min", price: 99 }, return: { departure: "17:00", arrival: "18:20", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 16, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", airline: wizz, validDays: [0, 5, 6], oneWay: { departure: "09:50", arrival: "11:20", duration: "1h 30min", price: 85 }, return: { departure: "17:10", arrival: "18:40", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 17, from: "Prishtina", fromCode: "PRN", to: "Budapest", toCode: "BUD", airline: austrian, validDays: [0, 6], oneWay: { departure: "12:25", arrival: "17:15", duration: "4h 50min", price: 164 }, return: { departure: "12:25", arrival: "17:15", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 18, from: "Prishtina", fromCode: "PRN", to: "Cairo", toCode: "CAI", airline: pegasus, validDays: [4], oneWay: { departure: "16:10", arrival: "22:45", duration: "5h 35min", price: 189 }, return: { departure: "09:50", arrival: "15:40", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 19, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", airline: lufthansa, validDays: [1, 3, 5], oneWay: { departure: "16:05", arrival: "23:50", duration: "7h 45min", price: 146 }, return: { departure: "16:05", arrival: "23:50", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 20, from: "Prishtina", fromCode: "PRN", to: "London", toCode: "LHR", airline: wizz, validDays: [0, 3, 6], oneWay: { departure: "10:15", arrival: "13:35", duration: "3h 20min", price: 30 }, return: { departure: "18:50", arrival: "22:10", returnTo: "Prishtina", returnToCode: "PRN" } },

  { id: 23, from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "SAW", airline: a_jet, validDays: [0, 1, 5, 6], oneWay: { departure: "09:45", arrival: "11:25", duration: "1h 40min", price: 30 }, return: { departure: "17:30", arrival: "19:10", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 24, from: "Tirana", fromCode: "TIA", to: "Barcelona", toCode: "BCN", airline: lufthansa, validDays: [0, 1, 3, 4, 5, 6], oneWay: { departure: "16:05", arrival: "23:20", duration: "7h 15min", price: 115 }, return: { departure: "16:05", arrival: "23:20", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 25, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", airline: swiss, validDays: [1, 4, 6], oneWay: { departure: "09:00", arrival: "11:10", duration: "2h 10min", price: 256 }, return: { departure: "17:30", arrival: "19:40", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 26, from: "Tirana", fromCode: "TIA", to: "Paris", toCode: "CDG", airline: wizz, validDays: [1, 3, 6], oneWay: { departure: "08:30", arrival: "10:45", duration: "2h 15min", price: 110 }, return: { departure: "18:00", arrival: "20:15", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 27, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", airline: pegasus, validDays: [0, 3, 5, 6], oneWay: { departure: "10:30", arrival: "12:35", duration: "2h 05min", price: 167 }, return: { departure: "18:00", arrival: "20:05", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 28, from: "Tirana", fromCode: "TIA", to: "Rome", toCode: "FCO", airline: wizz, validDays: [0, 1, 3, 5, 6], oneWay: { departure: "07:20", arrival: "08:50", duration: "1h 30min", price: 21 }, return: { departure: "18:40", arrival: "20:10", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 29, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", airline: easyJet, validDays: [2], oneWay: { departure: "10:05", arrival: "20:10", duration: "10h 05min", price: 92 }, return: { departure: "10:05", arrival: "20:10", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 30, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", airline: ryan_air, validDays: [0, 4, 6], oneWay: { departure: "21:25", arrival: "22:55", duration: "1h 30min", price: 30 }, return: { departure: "06:00", arrival: "07:30", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 31, from: "Prishtina", fromCode: "PRN", to: "Rome", toCode: "FCO", airline: lufthansa, validDays: [1, 3, 5, 7], oneWay: { departure: "11:45", arrival: "17:50", duration: "6h 05min", price: 942 }, return: { departure: "11:45", arrival: "17:50", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 32, from: "Tirana", fromCode: "TIA", to: "Barcelona", toCode: "BCN", airline: british, validDays: [2], oneWay: { departure: "13:00", arrival: "22:30", duration: "9h 30min", price: 218 }, return: { departure: "13:00", arrival: "22:30", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 33, from: "Prishtina", fromCode: "PRN", to: "Budapest", toCode: "BUD", airline: wizz, validDays: [2, 6], oneWay: { departure: "12:15", arrival: "18:50", duration: "6h 35min", price: 54 }, return: { departure: "12:15", arrival: "18:50", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 34, from: "Tirana", fromCode: "TIA", to: "Milano", toCode: "MXP", airline: ryan_air, validDays: [1, 3, 5], oneWay: { departure: "12:00", arrival: "14:05", duration: "2h 05min", price: 72 }, return: { departure: "19:00", arrival: "21:05", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 35, from: "Prishtina", fromCode: "PRN", to: "Paris", toCode: "CDG", airline: austrian, validDays: [2, 5], oneWay: { departure: "12:25", arrival: "19:20", duration: "6h 55min", price: 165 }, return: { departure: "12:25", arrival: "19:20", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 36, from: "Prishtina", fromCode: "PRN", to: "London", toCode: "LHR", airline: turkish, validDays: [0, 1, 3, 4, 5, 6], oneWay: { departure: "08:55", arrival: "15:10", duration: "7h 15min", price: 170 }, return: { departure: "11:30", arrival: "19:45", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 37, from: "Tirana", fromCode: "TIA", to: "Budapest", toCode: "BUD", airline: ryan_air, validDays: [0, 2, 5], oneWay: { departure: "08:35", arrival: "10:00", duration: "1h 25min", price: 23 }, return: { departure: "08:35", arrival: "10:00", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 38, from: "Prishtina", fromCode: "PRN", to: "Rome", toCode: "FCO", airline: pegasus, validDays: [1, 3, 5, 7], oneWay: { departure: "02:45", arrival: "10:30", duration: "7h 45min", price: 97 }, return: { departure: "02:45", arrival: "10:30", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 39, from: "Tirana", fromCode: "TIA", to: "Milano", toCode: "MXP", airline: airAlbania, validDays: [0, 3, 6], oneWay: { departure: "09:30", arrival: "11:30", duration: "2h 00min", price: 61 }, return: { departure: "18:00", arrival: "20:00", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 40, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", airline: swiss, validDays: [3], oneWay: { departure: "09:40", arrival: "18:45", duration: "9h 05min", price: 146 }, return: { departure: "09:40", arrival: "18:45", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 41, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "IST", airline: airAlbania, validDays: [0, 6], oneWay: { departure: "10:00", arrival: "11:35", duration: "1h 35min", price: 80 }, return: { departure: "18:00", arrival: "19:35", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 42, from: "Prishtina", fromCode: "PRN", to: "Cairo", toCode: "CAI", airline: turkish, validDays: [1], oneWay: { departure: "20:35", arrival: "03:40", duration: "6h 05min", price: 366 }, return: { departure: "14:25", arrival: "19:45", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 43, from: "Prishtina", fromCode: "PRN", to: "Rome", toCode: "FCO", airline: ryan_air, validDays: [1, 3, 5, 7], oneWay: { departure: "02:45", arrival: "10:15", duration: "7h 30min", price: 115 }, return: { departure: "02:45", arrival: "10:15", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 44, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", airline: wizz, validDays: [3, 5], oneWay: { departure: "17:50", arrival: "21:30", duration: "3h 40min", price: 34 }, return: { departure: "17:50", arrival: "21:30", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 45, from: "Prishtina", fromCode: "PRN", to: "Barcelona", toCode: "BCN", airline: turkish, validDays: [5, 6], oneWay: { departure: "20:35", arrival: "10:30", duration: "13h 55min", price: 198 }, return: { departure: "20:35", arrival: "10:30", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 47, from: "Tirana", fromCode: "TIA", to: "Rome", toCode: "FCO", airline: ryan_air, validDays: [0, 1, 3, 5, 6], oneWay: { departure: "10:20", arrival: "11:50", duration: "1h 30min", price: 29 }, return: { departure: "18:40", arrival: "20:10", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 48, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", airline: pegasus, validDays: [1], oneWay: { departure: "11:00", arrival: "20:00", duration: "9h 00min", price: 94 }, return: { departure: "11:00", arrival: "20:00", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 49, from: "Tirana", fromCode: "TIA", to: "Cairo", toCode: "CAI", airline: austrian, validDays: [1], oneWay: { departure: "12:15", arrival: "18:50", duration: "5h 35min", price: 377 }, return: { departure: "09:15", arrival: "15:50", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 50, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", airline: swiss, validDays: [2, 4, 6], oneWay: { departure: "09:40", arrival: "14:00", duration: "4h 20min", price: 267 }, return: { departure: "09:40", arrival: "14:00", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 51, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "IST", airline: turkish, validDays: [0, 1, 2, 3, 4, 5, 6], oneWay: { departure: "07:00", arrival: "10:40", duration: "1h 40min", price: 117 }, return: { departure: "23:00", arrival: "22:40", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 52, from: "Prishtina", fromCode: "PRN", to: "London", toCode: "LHR", airline: swiss, validDays: [4], oneWay: { departure: "13:45", arrival: "19:50", duration: "5h 05min", price: 153 }, return: { departure: "09:20", arrival: "14:25", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 53, from: "Tirana", fromCode: "TIA", to: "Barcelona", toCode: "BCN", airline: pegasus, validDays: [0, 3], oneWay: { departure: "02:15", arrival: "11:45", duration: "9h 30min", price: 109 }, return: { departure: "02:15", arrival: "11:45", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 54, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", airline: turkish, validDays: [1, 3, 5], oneWay: { departure: "08:55", arrival: "16:25", duration: "7h 30min", price: 168 }, return: { departure: "08:55", arrival: "16:25", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 55, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LON", airline: pegasus, validDays: [1], oneWay: { departure: "03:10", arrival: "09:40", duration: "7h 30min", price: 85 }, return: { departure: "06:10", arrival: "12:40", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 56, from: "Prishtina", fromCode: "PRN", to: "Barcelona", toCode: "BCN", airline: swiss, validDays: [2, 6], oneWay: { departure: "09:40", arrival: "19:00", duration: "9h 20min", price: 347 }, return: { departure: "09:40", arrival: "19:00", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 57, from: "Tirana", fromCode: "TIA", to: "Cairo", toCode: "CAI", airline: aegean, validDays: [4, 0], oneWay: { departure: "10:05", arrival: "20:00", duration: "10h 00min", price: 169 }, return: { departure: "17:55", arrival: "", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 58, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", airline: turkish, validDays: [0, 1, 2, 5, 6], oneWay: { departure: "08:55", arrival: "15:25", duration: "6h 30min", price: 246 }, return: { departure: "08:55", arrival: "15:25", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 59, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", airline: lufthansa, validDays: [1, 2], oneWay: { departure: "16:05", arrival: "20:50", duration: "5h 45min", price: 124 }, return: { departure: "16:30", arrival: "23:15", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 60, from: "Prishtina", fromCode: "PRN", to: "Cairo", toCode: "CAI", airline: swiss, validDays: [3], oneWay: { departure: "10:40", arrival: "19:00", duration: "7h 50min", price: 399 }, return: { departure: "13:00", arrival: "19:35", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 61, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "IST", airline: lufthansa, validDays: [1], oneWay: { departure: "06:30", arrival: "17:00", duration: "10h 30min", price: 159 }, return: { departure: "09:30", arrival: "18:00", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 62, from: "Prishtina", fromCode: "PRN", to: "Barcelona", toCode: "BCN", airline: easyJet, validDays: [3, 4, 5], oneWay: { departure: "10:05", arrival: "15:40", duration: "5h 35min", price: 308 }, return: { departure: "10:05", arrival: "15:40", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 63, from: "Tirana", fromCode: "TIA", to: "Cairo", toCode: "CAI", airline: turkish, validDays: [1], oneWay: { departure: "07:10", arrival: "14:00", duration: "6h 50min", price: 359 }, return: { departure: "", arrival: "", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 64, from: "Prishtina", fromCode: "PRN", to: "Paris", toCode: "CDG", airline: swiss, validDays: [1, 6], oneWay: { departure: "09:40", arrival: "14:10", duration: "4h 30min", price: 189 }, return: { departure: "09:40", arrival: "14:10", returnTo: "Prishtina", returnToCode: "PRN" } },

  { id: 75, from: "Prishtina", fromCode: "PRN", to: "Barcelona", toCode: "BCN", airline: pegasus, validDays: [1, 3, 5], oneWay: { departure: "02:45", arrival: "11:45", duration: "9h 00min", price: 226 }, return: { departure: "02:45", arrival: "11:45", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 76, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", airline: austrian, validDays: [0, 2, 4, 6], oneWay: { departure: "10:15", arrival: "11:45", duration: "1h 30min", price: 201 }, return: { departure: "18:00", arrival: "19:30", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 77, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", airline: wizz, validDays: [2, 4, 6], oneWay: { departure: "09:00", arrival: "12:10", duration: "3h 10min", price: 64 }, return: { departure: "17:30", arrival: "20:40", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 78, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", airline: lufthansa, validDays: [2, 5, 6], oneWay: { departure: "13:20", arrival: "19:30", duration: "6h 10min", price: 217 }, return: { departure: "13:20", arrival: "19:30", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 79, from: "Tirana", fromCode: "TIA", to: "Budapest", toCode: "BUD", airline: wizz, validDays: [0, 2, 5], oneWay: { departure: "06:45", arrival: "13:45", duration: "7h 00min", price: 137 }, return: { departure: "06:45", arrival: "13:45", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 80, from: "Prishtina", fromCode: "PRN", to: "London", toCode: "LGW", airline: easyJet, validDays: [1], oneWay: { departure: "14:50", arrival: "21:00", duration: "7h 10min", price: 95 }, return: { departure: "11:25", arrival: "17:35", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 81, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "IST", airline: aegean, validDays: [1, 3, 4, 5], oneWay: { departure: "10:05", arrival: "15:45", duration: "3h 40min", price: 239 }, return: { departure: "06:30", arrival: "08:10", returnTo: "Tirana", returnToCode: "TIA" } },

  { id: 84, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", airline: pegasus, validDays: [1, 3], oneWay: { departure: "02:55", arrival: "11:45", duration: "8h 50min", price: 110 }, return: { departure: "02:55", arrival: "11:45", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 85, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", airline: pegasus, validDays: [1, 4, 6], oneWay: { departure: "11:40", arrival: "17:15", duration: "5h 35min", price: 277 }, return: { departure: "11:40", arrival: "17:15", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 86, from: "Tirana", fromCode: "TIA", to: "Cairo", toCode: "CAI", airline: lufthansa, validDays: [5, 6], oneWay: { departure: "06:05", arrival: "20:20", duration: "13h 15min", price: 520 }, return: { departure: "10:45", arrival: "23:00", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 87, from: "Prishtina", fromCode: "PRN", to: "Paris", toCode: "CDG", airline: lufthansa, validDays: [1, 3, 5], oneWay: { departure: "11:15", arrival: "18:15", duration: "7h 00min", price: 305 }, return: { departure: "11:15", arrival: "18:15", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 88, from: "Tirana", fromCode: "TIA", to: "Barcelona", toCode: "BCN", airline: turkish, validDays: [3], oneWay: { departure: "07:00", arrival: "13:25", duration: "6h 25min", price: 198 }, return: { departure: "07:00", arrival: "13:25", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 89, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", airline: wizz, validDays: [0, 3, 5, 6], oneWay: { departure: "11:20", arrival: "13:05", duration: "1h 45min", price: 30 }, return: { departure: "19:40", arrival: "21:25", returnTo: "Prishtina", returnToCode: "PRN" } },

  { id: 91, from: "Prishtina", fromCode: "PRN", to: "London", toCode: "LON", airline: lufthansa, validDays: [1, 3, 4], oneWay: { departure: "06:00", arrival: "12:50", duration: "7h 50min", price: 157 }, return: { departure: "08:30", arrival: "17:20", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 92, from: "Tirana", fromCode: "TIA", to: "Milano", toCode: "MXP", airline: wizz, validDays: [2, 5, 6], oneWay: { departure: "14:10", arrival: "16:15", duration: "2h 05min", price: 19 }, return: { departure: "20:45", arrival: "22:50", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 93, from: "Prishtina", fromCode: "PRN", to: "Cairo", toCode: "CAI", airline: lufthansa, validDays: [1], oneWay: { departure: "15:40", arrival: "00:15", duration: "7h 35min", price: 379 }, return: { departure: "10:20", arrival: "17:55", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 94, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", airline: ryan_air, validDays: [1, 3, 5], oneWay: { departure: "17:40", arrival: "00:55", duration: "5h 15min", price: 70 }, return: { departure: "17:40", arrival: "00:55", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 95, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "LIN", airline: lufthansa, validDays: [0, 5], oneWay: { departure: "13:45", arrival: "18:15", duration: "4h 30min", price: 158 }, return: { departure: "11:45", arrival: "16:15", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 96, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "SAW", airline: pegasus, validDays: [0, 2, 4, 5], oneWay: { departure: "08:20", arrival: "09:55", duration: "1h 35min", price: 41 }, return: { departure: "18:10", arrival: "19:45", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 97, from: "Prishtina", fromCode: "PRN", to: "Paris", toCode: "CDG", airline: turkish, validDays: [1, 3, 5], oneWay: { departure: "08:55", arrival: "16:15", duration: "7h 20min", price: 121 }, return: { departure: "08:55", arrival: "16:15", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 98, from: "Tirana", fromCode: "TIA", to: "Barcelona", toCode: "BCN", airline: wizz, validDays: [0, 1, 3, 4, 5, 6], oneWay: { departure: "19:15", arrival: "22:00", duration: "2h 45min", price: 29 }, return: { departure: "19:15", arrival: "22:00", returnTo: "Tirana", returnToCode: "TIA" } },
  { id: 99, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", airline: wizz, validDays: [4], oneWay: { departure: "07:55", arrival: "21:05", duration: "13h 10min", price: 84 }, return: { departure: "07:55", arrival: "21:05", returnTo: "Prishtina", returnToCode: "PRN" } },
  { id: 100, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", airline: wizz, validDays: [0, 1, 4, 6], oneWay: { departure: "14:20", arrival: "15:50", duration: "1h 30min", price: 62 }, return: { departure: "20:00", arrival: "21:30", returnTo: "Tirana", returnToCode: "TIA" } },

];

// Gjenerimi i variantëve me orare të ndryshme
const generateFlightVariants = (flight, count = 5, intervalHours = 2) => {
  if (!flight.oneWay) return [];

  const variants = [];
  for (let i = 0; i < count; i++) {
    const dep = new Date(`1970-01-01T${flight.oneWay.departure}:00`);
    const arr = new Date(`1970-01-01T${flight.oneWay.arrival}:00`);
    dep.setHours(dep.getHours() + i * intervalHours);
    arr.setHours(arr.getHours() + i * intervalHours);

    // One-way flight
    variants.push({
      ...flight,
      id: `${flight.id}-oneWay-${i}`,
      oneWay: {
        departure: dep.toTimeString().slice(0, 5),
        arrival: arr.toTimeString().slice(0, 5),
        duration: flight.oneWay.duration,
        price: flight.oneWay.price
      },
      return: null,
      isReturn: false
    });

    // Return flight
    if (flight.return) {
      const retDep = new Date(`1970-01-01T${flight.return.departure}:00`);
      const retArr = new Date(`1970-01-01T${flight.return.arrival}:00`);
      retDep.setHours(retDep.getHours() + i * intervalHours);
      retArr.setHours(retArr.getHours() + i * intervalHours);

      variants.push({
        ...flight,
        id: `${flight.id}-return-${i}`,
        oneWay: {
          departure: dep.toTimeString().slice(0, 5),
          arrival: arr.toTimeString().slice(0, 5),
          duration: flight.oneWay.duration,
          price: flight.oneWay.price
        },
        return: {
          departure: retDep.toTimeString().slice(0, 5),
          arrival: retArr.toTimeString().slice(0, 5),
          returnTo: flight.return.returnTo,
          returnToCode: flight.return.returnToCode
        },
        isReturn: true
      });
    }
  }
  return variants;
};

// Gjenerojmë të gjitha fluturimet
const flights = baseFlights.flatMap(f => generateFlightVariants(f, 5, 2));

//Bllokim i scroll-it
const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);
};

// Calendar Component
const Calendar = ({ selectedDate, setSelectedDate, minDate, maxDate, availableFlights }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const daysArray = [];

  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));

  const isDisabled = (day) => {
    if (!day) return true;
    if (minDate && day < minDate) return true;
    if (maxDate && day > maxDate) return true;

    // Kontroll për validDays
    const validDays = availableFlights?.[0]?.validDays || [0, 1, 2, 3, 4, 5, 6]; // default: të gjitha ditët
    if (!validDays.includes(day.getDay())) return true;

    return false;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200 transition"
        >
          &lt;
        </button>
        <span className="font-semibold">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200 transition"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} className="font-semibold">{d}</div>
        ))}
        {daysArray.map((day, index) => {
          const disabled = isDisabled(day);
          const isSelected = day && selectedDate && day.toDateString() === selectedDate.toDateString();
          return (
            <button
              key={index}
              onClick={() => !disabled && setSelectedDate(day)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition
                ${disabled ? "text-gray-300 cursor-not-allowed" :
                  isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
            >
              {day ? day.getDate() : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// FlightCard Component
const FlightCard = ({ flight, openModal, favorites = [], setFavorites }) => {
  const isReturn = !!flight.return;
  const price = isReturn ? Math.round(flight.oneWay.price * 1.6) : flight.oneWay.price;
  const displayPrice = `€${price}`;

  const isFavorite = favorites.some(f => f.id === flight.id);

  const toggleFavorite = (flight) => {
    const updated = isFavorite
      ? favorites.filter(f => f.id !== flight.id)
      : [...favorites, flight];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="bg-white relative rounded-3xl shadow-md border border-gray-300 hover:shadow-xl transition-all duration-300 w-full mx-auto">
      {/* Favorite Heart */}
      <div
        className="absolute top-4 right-4 cursor-pointer z-10"
        onClick={(e) => { e.stopPropagation(); toggleFavorite(flight); }}
      >
        <Heart className={`w-6 h-6 transition-all ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"}`} />
      </div>

      <div className="p-3 pb-1">
        <div className="flex items-center justify-between mb-4">
          <img src={flight.airline} alt="Airline Logo" className="w-16 h-16 object-contain" />
        </div>

        {/* One-way segment */}
        <div className="flex items-center justify-between gap-4 -mt-5">
          <div>
            <h3 className="text-2xl font-bold ml-4">{flight.from}</h3>
            <p className="text-gray-400 text-sm ml-4">{flight.fromCode}</p>
            <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">{flight.oneWay.departure}</p>
          </div>

          <div className="flex items-center justify-center w-full relative mt-4">
            <div className="absolute top-1/2 -left-5 right-5 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
            <div className="absolute -left-5 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute right-5 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
              <Plane className="w-6 h-6 text-gray-600 bg-white animate-flight" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold">{flight.to}</h3>
            <p className="text-gray-400 text-sm">{flight.toCode}</p>
            <p className="text-gray-800 font-semibold text-xl mt-1 mr-4">{flight.oneWay.arrival}</p>
          </div>
        </div>

        {/* Return segment */}
        {isReturn && (
          <div className="mt-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold ml-4">{flight.to}</h3>
                <p className="text-gray-400 text-sm ml-4">{flight.toCode}</p>
                <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">{flight.return.departure}</p>
              </div>
              <div className="flex items-center justify-center w-full relative mt-4">
                <div className="absolute top-1/2 -left-5 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                <div className="absolute -left-5 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                  <Plane className="w-6 h-6 text-gray-600 bg-white animate-flight" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold ml-4">{flight.return.returnTo}</h3>
                <p className="text-gray-400 text-sm ml-4">{flight.return.returnToCode}</p>
                <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">{flight.return.arrival}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-semibold">Return Flight</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between px-4">
        <span className="text-sm text-gray-600">Duration: {flight.oneWay.duration}</span>
        <span className="text-blue-600 font-bold text-lg">{displayPrice}</span>
      </div>
      <div className="border-t border-dashed border-gray-300 my-2"></div>
      <div className="p-4 pt-1">
        <button onClick={() => openModal(flight)} className="bg-blue-700 text-white w-full py-2 rounded-xl hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
      {/*circles*/}
      <div className="absolute top-1/2 -left-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-r-full"></div>
      <div className="absolute top-1/2 -right-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-l-full"></div>
    </div>
  );
};

const CustomDropdown = ({ options, selected, setSelected, placeholder }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-40">
        <Listbox.Button className="relative w-full cursor-pointer bg-white border border-gray-300 rounded-lg py-2 px-3 text-left shadow-sm flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span className="truncate">{selected || placeholder}</span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active, selected }) =>
                  `cursor-pointer select-none relative py-2 pl-3 pr-8 ${active ? "bg-blue-100 text-blue-900" : "text-gray-700"
                  } ${selected ? "font-semibold" : ""}`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-semibold" : ""}`}>
                      {option}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                        <Check className="w-5 h-5" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>

  );
};

const FlightsSection = () => {
  const [isReturn, setIsReturn] = useState(false);
  const [modalFlight, setModalFlight] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [favorites, setFavorites] = useState([]);
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate());
  const [showTopButton, setShowTopButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 20;

  // 1. Filtron sipas qytetit
  const filteredFlights = flights.filter(flight =>
    (!fromFilter || flight.from === fromFilter) &&
    (!toFilter || flight.to === toFilter)
  );

  // 2. Ruaj vetëm një fluturim për secilën id bazë
  const uniqueFlights = [];
  const seenIds = new Set();

  filteredFlights.forEach(f => {
    if (!seenIds.has(f.id)) {
      uniqueFlights.push(f);
      seenIds.add(f.id);
    }
  });

  // 3. Filtron fluturimet sipas tipit OneWay / Return
  const flightsByType = uniqueFlights.filter(f => f.isReturn === isReturn);

  // 4. Llogarit pagination mbi fluturimet e filtruar
  const totalPages = Math.ceil(flightsByType.length / flightsPerPage);
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;

  // 5. Bën pagination
  const currentFlights = flightsByType.slice(indexOfFirstFlight, indexOfLastFlight);

  // Funksion për pagination 1 2 3 ... 9
  const getPages = (totalPages, currentPage) => {
    const pages = [];
    if (totalPages <= 7) {
      // Nëse janë pak faqe, i shfaq të gjitha
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Nëse janë më shumë se 7 faqe
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  useBodyScrollLock(!!modalFlight);

  useEffect(() => {
    if (returnDate && departureDate && returnDate < departureDate) {
      setReturnDate(null);
    }
  }, [departureDate]);

  const handleConfirm = () => {
    if (!departureDate) {
      alert("Choose a departure date");
      return;
    }
    if (isReturn && !returnDate) {
      alert("Choose a return date");
      return;
    }
    alert(`Departure: ${departureDate.toDateString()}\nReturn: ${returnDate ? returnDate.toDateString() : "N/A"}`);
  };

  const openModal = (flight) => setModalFlight(flight);
  const closeModal = () => {
    setModalFlight(null);
    setDepartureDate(null);
    setReturnDate(null);
  };

  const fromCities = [...new Set(baseFlights.map(f => f.from))];
  const toCities = [...new Set(baseFlights.map(f => f.to))];

  {
    filteredFlights.map((flight, index) => (
      <FlightCard
        key={flight.id}
        flight={flight}
        isReturn={flight.isReturn}
        openModal={openModal}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    ))
  }

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setFavorites([]);
      }
    }
  }, []);

  const toggleFavorite = (flight) => {
    const exists = favorites.some(f => f.baseId === flight.baseId && f.isReturn === flight.isReturn);
    const updated = exists
      ? favorites.filter(f => !(f.baseId === flight.baseId && f.isReturn === flight.isReturn))
      : [...favorites, flight];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // show button after scrolling 300px
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20 w-full -mt-10 flex flex-col items-center">
      {/* Buttons OneWay/Return */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setIsReturn(false)} className={`px-6 py-2 rounded-xl font-semibold transition ${!isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}>OneWay</button>
        <button onClick={() => setIsReturn(true)} className={`px-6 py-2 rounded-xl font-semibold transition ${isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}>Return</button>
      </div>

      {/* Custom Dropdown Filters */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
        {/* FROM Dropdown */}
        <div className="w-auto min-w-[140px] max-w-[180px]">
          <CustomDropdown
            options={fromCities}
            selected={fromFilter}
            setSelected={(val) => { setFromFilter(val); setCurrentPage(1); }}
            placeholder="From"
          />
        </div>

        {/* TO Dropdown */}
        <div className="w-auto min-w-[140px] max-w-[180px]">
          <CustomDropdown
            options={toCities}
            selected={toFilter}
            setSelected={(val) => { setToFilter(val); setCurrentPage(1); }}
            placeholder="To"
          />
        </div>

        {/* RESET Button */}
        <div className="w-auto">
          <button
            onClick={() => { setFromFilter(""); setToFilter(""); }}
            className="
        px-4 py-2 
        bg-gray-200 text-gray-700 
        rounded-xl 
        hover:bg-gray-300 
        transition-all duration-200 
        shadow-sm
      "
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Shfaqim FlightCards */}
      <div className="w-full max-w-[1400px] px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {currentFlights.map((flight, index) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            isReturn={isReturn}
            openModal={openModal}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {getPages(totalPages, currentPage).map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-1 text-gray-500">...</span>
          ) : (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo(0, 0); // direkt në top
              }}
              className={`px-3 py-1 rounded-lg border transition ${currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
                }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Modal */}
      {modalFlight && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-96 max-h-[90vh] overflow-hidden relative flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">{modalFlight.from} → {modalFlight.to}</h2>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <p className="mb-2 font-semibold">Departure Date</p>
                <Calendar
                  selectedDate={departureDate}
                  setSelectedDate={setDepartureDate}
                  minDate={today}
                  maxDate={maxDate}
                  availableFlights={[modalFlight]}
                />
              </div>

              {modalFlight.return && (
                <div>
                  <p className="mb-2 mt-4 font-semibold">Return Date</p>
                  <Calendar
                    selectedDate={returnDate}
                    setSelectedDate={setReturnDate}
                    minDate={departureDate || today}
                    maxDate={maxDate}
                    availableFlights={[modalFlight]}
                  />
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <div className="text-lg font-semibold">
                Price: €{modalFlight.return ? Math.round(modalFlight.oneWay.price * 1.6) : modalFlight.oneWay.price}
              </div>
              <button
                onClick={() => {
                  if (!departureDate) { alert("Choose departure date"); return; }
                  if (modalFlight.return && !returnDate) { alert("Choose return date"); return; }
                  alert(`Departure: ${departureDate.toDateString()}\nReturn: ${returnDate ? returnDate.toDateString() : "N/A"}\nPrice: €${modalFlight.return ? Math.round(modalFlight.oneWay.price * 1.6) : modalFlight.oneWay.price}`);
                  closeModal();
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg border border-blue-200 hover:bg-blue-600 transition-all"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </section>
  );
};

export default FlightsSection;