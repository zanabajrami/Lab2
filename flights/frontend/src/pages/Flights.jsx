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

const baseFlights = [
  { id: 1, from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "IST", oneWayPrice: 75, duration: "1h 45min", airline: turkish, departure: "08:55", arrival: "12:40", returnDeparture: "08:25", returnArrival: "08:05", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 1, 2, 3, 4, 5, 6], isReturn: false },
  { id: 1, from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "IST", oneWayPrice: 75, duration: "1h 45min", airline: turkish, departure: "08:55", arrival: "12:40", returnDeparture: "08:25", returnArrival: "08:05", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 1, 2, 3, 4, 5, 6], isReturn: true },
  { id: 2, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 167, duration: "2h 05min", airline: pegasus, departure: "10:30", arrival: "12:35", returnDeparture: "18:00", returnArrival: "20:05", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 3, 5, 6], isReturn: false },
  { id: 2, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 167, duration: "2h 05min", airline: pegasus, departure: "10:30", arrival: "12:35", returnDeparture: "18:00", returnArrival: "20:05", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 3, 5, 6], isReturn: true },
  { id: 3, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", oneWayPrice: 191, duration: "3h 05min", airline: british, departure: "10:30", arrival: "13:35", returnDeparture: "18:45", returnArrival: "21:50", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 5], isReturn: false },
  { id: 3, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", oneWayPrice: 191, duration: "3h 05min", airline: british, departure: "10:30", arrival: "13:35", returnDeparture: "18:45", returnArrival: "21:50", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 5], isReturn: true },
  { id: 4, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", oneWayPrice: 69, duration: "1h 15min", airline: wizz, departure: "10:30", arrival: "11:45", returnDeparture: "18:20", returnArrival: "19:35", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 1, 3, 5, 6, 7], isReturn: false },
  { id: 4, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", oneWayPrice: 69, duration: "1h 15min", airline: wizz, departure: "10:30", arrival: "11:45", returnDeparture: "18:20", returnArrival: "19:35", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 1, 3, 5, 6, 7], isReturn: true },
  { id: 5, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", oneWayPrice: 62, duration: "1h 30min", airline: wizz, departure: "14:20", arrival: "15:50", returnDeparture: "20:00", returnArrival: "21:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 4, 6], isReturn: false },
  { id: 5, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", oneWayPrice: 62, duration: "1h 30min", airline: wizz, departure: "14:20", arrival: "15:50", returnDeparture: "20:00", returnArrival: "21:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 4, 6], isReturn: true },
  { id: 6, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 181, duration: "2h 10min", airline: turkish, departure: "09:00", arrival: "11:10", returnDeparture: "17:30", returnArrival: "19:40", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 5, 6], isReturn: false },
  { id: 6, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 181, duration: "2h 10min", airline: turkish, departure: "09:00", arrival: "11:10", returnDeparture: "17:30", returnArrival: "19:40", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 5, 6], isReturn: true },
  { id: 7, from: "Tirana", fromCode: "TIA", to: "Paris", toCode: "CDG", oneWayPrice: 75, duration: "2h 15min", airline: ryan_air, departure: "10:30", arrival: "12:45", returnDeparture: "18:00", returnArrival: "20:15", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 4, 6], isReturn: false },
  { id: 7, from: "Tirana", fromCode: "TIA", to: "Paris", toCode: "CDG", oneWayPrice: 75, duration: "2h 15min", airline: ryan_air, departure: "10:30", arrival: "12:45", returnDeparture: "18:00", returnArrival: "20:15", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 4, 6], isReturn: true },
  { id: 8, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", oneWayPrice: 201, duration: "1h 30min", airline: austrian, departure: "10:15", arrival: "11:45", returnDeparture: "18:00", returnArrival: "19:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 2, 4, 6], isReturn: false },
  { id: 8, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", oneWayPrice: 201, duration: "1h 30min", airline: austrian, departure: "10:15", arrival: "11:45", returnDeparture: "18:00", returnArrival: "19:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 3, 5, 6], isReturn: true },
  { id: 9, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 256, duration: "2h 15min", airline: austrian, departure: "08:45", arrival: "11:00", returnDeparture: "17:00", returnArrival: "19:15", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 6], isReturn: false },
  { id: 9, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 256, duration: "2h 15min", airline: austrian, departure: "08:45", arrival: "11:00", returnDeparture: "17:00", returnArrival: "19:15", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 6], isReturn: true },
  { id: 10, from: "Tirana", fromCode: "TIA", to: "Budapest", toCode: "BUD", oneWayPrice: 137, duration: "5h 00min", airline: austrian, departure: "12:15", arrival: "17:15", returnDeparture: "12:15", returnArrival: "17:15", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 2, 5], isReturn: false },
  { id: 10, from: "Tirana", fromCode: "TIA", to: "Budapest", toCode: "BUD", oneWayPrice: 137, duration: "5h 00min", airline: austrian, departure: "12:15", arrival: "17:15", returnDeparture: "12:15", returnArrival: "17:15", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 2, 5], isReturn: true },
  { id: 11, from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "SAW", oneWayPrice: 30, duration: "1h 35min", airline: pegasus, departure: "10:20", arrival: "11:55", returnDeparture: "18:10", returnArrival: "19:45", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 2, 5, 6], isReturn: false },
  { id: 11, from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "SAW", oneWayPrice: 30, duration: "1h 35min", airline: pegasus, departure: "10:20", arrival: "11:55", returnDeparture: "18:10", returnArrival: "19:45", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 2, 5, 6], isReturn: true },
  { id: 12, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "SAW", oneWayPrice: 41, duration: "1h 35min", airline: pegasus, departure: "08:20", arrival: "09:55", returnDeparture: "18:10", returnArrival: "19:45", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 2, 4, 5], isReturn: false },
  { id: 12, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "SAW", oneWayPrice: 41, duration: "1h 35min", airline: pegasus, departure: "08:20", arrival: "09:55", returnDeparture: "18:10", returnArrival: "19:45", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 2, 4, 5], isReturn: true },
  { id: 13, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", oneWayPrice: 135, duration: "3h 10min", airline: ryan_air, departure: "11:00", arrival: "14:10", returnDeparture: "19:00", returnArrival: "22:10", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 3, 4, 6], isReturn: false },
  { id: 13, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", oneWayPrice: 135, duration: "3h 10min", airline: ryan_air, departure: "11:00", arrival: "14:10", returnDeparture: "19:00", returnArrival: "22:10", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 3, 4, 6], isReturn: true },
  { id: 14, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 30, duration: "1h 45min", airline: wizz, departure: "11:20", arrival: "13:05", returnDeparture: "19:40", returnArrival: "21:25", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 3, 5, 6], isReturn: false },
  { id: 14, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 30, duration: "1h 45min", airline: wizz, departure: "11:20", arrival: "13:05", returnDeparture: "19:40", returnArrival: "21:25", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 3, 5, 6], isReturn: true },
  { id: 15, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", oneWayPrice: 99, duration: "1h 20min", airline: austrian, departure: "09:00", arrival: "10:20", returnDeparture: "17:00", returnArrival: "18:20", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 6], isReturn: false },
  { id: 15, from: "Prishtina", fromCode: "PRN", to: "Vienna", toCode: "VIE", oneWayPrice: 99, duration: "1h 20min", airline: austrian, departure: "09:00", arrival: "10:20", returnDeparture: "17:00", returnArrival: "18:20", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 6], isReturn: true },
  { id: 16, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", oneWayPrice: 85, duration: "1h 30min", airline: wizz, departure: "09:50", arrival: "11:20", returnDeparture: "17:10", returnArrival: "18:40", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 5, 6], isReturn: false },
  { id: 16, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", oneWayPrice: 85, duration: "1h 30min", airline: wizz, departure: "09:50", arrival: "11:20", returnDeparture: "17:10", returnArrival: "18:40", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 5, 6], isReturn: true },
  { id: 17, from: "Prishtina", fromCode: "PRN", to: "Budapest", toCode: "BUD", oneWayPrice: 164, duration: "4h 50min", airline: austrian, departure: "12:25", arrival: "17:15", returnDeparture: "12:25", returnArrival: "17:15", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 6], isReturn: false },
  { id: 17, from: "Prishtina", fromCode: "PRN", to: "Budapest", toCode: "BUD", oneWayPrice: 164, duration: "4h 50min", airline: austrian, departure: "12:25", arrival: "17:15", returnDeparture: "12:25", returnArrival: "17:15", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 6], isReturn: true },
  { id: 18, from: "Tirana", fromCode: "TIA", to: "Milano", toCode: "MXP", oneWayPrice: 61, duration: "2h 00min", airline: airAlbania, departure: "09:30", arrival: "11:30", returnDeparture: "18:00", returnArrival: "20:00", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 3, 6], isReturn: false },
  { id: 18, from: "Tirana", fromCode: "TIA", to: "Milano", toCode: "MXP", oneWayPrice: 61, duration: "2h 00min", airline: airAlbania, departure: "09:30", arrival: "11:30", returnDeparture: "18:00", returnArrival: "20:00", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 3, 6], isReturn: true },
  { id: 19, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", oneWayPrice: 146, duration: "7h 45min", airline: lufthansa, departure: "16:05", arrival: "23:50", returnDeparture: "16:05", returnArrival: "23:50", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 5], isReturn: false },
  { id: 19, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", oneWayPrice: 146, duration: "7h 45min", airline: lufthansa, departure: "16:05", arrival: "23:50", returnDeparture: "16:05", returnArrival: "23:50", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 5], isReturn: true },
  { id: 20, from: "Prishtina", fromCode: "PRN", to: "London", toCode: "LHR", oneWayPrice: 30, duration: "3h 20min", airline: wizz, departure: "10:15", arrival: "13:35", returnDeparture: "18:50", returnArrival: "22:10", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 3, 6], isReturn: false },
  { id: 20, from: "Prishtina", fromCode: "PRN", to: "London", toCode: "LHR", oneWayPrice: 30, duration: "3h 20min", airline: wizz, departure: "10:15", arrival: "13:35", returnDeparture: "18:50", returnArrival: "22:10", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 3, 6], isReturn: true },
  { id: 21, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", oneWayPrice: 64, duration: "3h 10min", airline: wizz, departure: "09:00", arrival: "12:10", returnDeparture: "17:30", returnArrival: "20:40", returnTo: "Tirana", returnToCode: "TIA", validDays: [2, 4, 6], isReturn: false },
  { id: 21, from: "Tirana", fromCode: "TIA", to: "London", toCode: "LHR", oneWayPrice: 64, duration: "3h 10min", airline: wizz, departure: "09:00", arrival: "12:10", returnDeparture: "17:30", returnArrival: "20:40", returnTo: "Tirana", returnToCode: "TIA", validDays: [2, 4, 6], isReturn: true },
  { id: 22, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "IST", oneWayPrice: 102, duration: "1h 30min", airline: turkish, departure: "10:15", arrival: "11:45", returnDeparture: "19:00", returnArrival: "20:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 3, 5, 6], isReturn: false },
  { id: 22, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "IST", oneWayPrice: 102, duration: "1h 30min", airline: turkish, departure: "10:15", arrival: "11:45", returnDeparture: "19:00", returnArrival: "20:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 3, 5, 6], isReturn: true },
  { id: 23, from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "SAW", oneWayPrice: 30, duration: "1h 40min", airline: a_jet, departure: "09:45", arrival: "11:25", returnDeparture: "17:30", returnArrival: "19:10", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 1, 5, 6], isReturn: false },
  { id: 23, from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "SAW", oneWayPrice: 30, duration: "1h 40min", airline: a_jet, departure: "09:45", arrival: "11:25", returnDeparture: "17:30", returnArrival: "19:10", returnTo: "Prishtina", returnToCode: "PRN", validDays: [0, 1, 5, 6], isReturn: true },
  { id: 24, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 256, duration: "2h 10min", airline: swiss, departure: "09:00", arrival: "11:10", returnDeparture: "17:30", returnArrival: "19:40", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 4, 6], isReturn: false },
  { id: 24, from: "Prishtina", fromCode: "PRN", to: "Milano", toCode: "MXP", oneWayPrice: 256, duration: "2h 10min", airline: swiss, departure: "09:00", arrival: "11:10", returnDeparture: "17:30", returnArrival: "19:40", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 4, 6], isReturn: true },
  { id: 25, from: "Tirana", fromCode: "TIA", to: "Milano", toCode: "MXP", oneWayPrice: 19, duration: "2h 05min", airline: wizz, departure: "14:10", arrival: "16:15", returnDeparture: "20:45", returnArrival: "22:50", returnTo: "Tirana", returnToCode: "TIA", validDays: [2, 5, 6], isReturn: false },
  { id: 25, from: "Tirana", fromCode: "TIA", to: "Milano", toCode: "MXP", oneWayPrice: 19, duration: "2h 05min", airline: wizz, departure: "14:10", arrival: "16:15", returnDeparture: "20:45", returnArrival: "22:50", returnTo: "Tirana", returnToCode: "TIA", validDays: [2, 5, 6], isReturn: true },
  { id: 26, from: "Tirana", fromCode: "TIA", to: "Paris", toCode: "CDG", oneWayPrice: 110, duration: "2h 15min", airline: wizz, departure: "08:30", arrival: "10:45", returnDeparture: "18:00", returnArrival: "20:15", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 6], isReturn: false },
  { id: 26, from: "Tirana", fromCode: "TIA", to: "Paris", toCode: "CDG", oneWayPrice: 110, duration: "2h 15min", airline: wizz, departure: "08:30", arrival: "10:45", returnDeparture: "18:00", returnArrival: "20:15", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 6], isReturn: true },
  { id: 27, from: "Prishtina", fromCode: "PRN", to: "Paris", toCode: "CDG", oneWayPrice: 189, duration: "4h 30min", airline: swiss, departure: "09:40", arrival: "14:10", returnDeparture: "09:40", returnArrival: "14:10", returnTo: "Prishtina", validDays: [1, 6], returnToCode: "PRN", isReturn: false },
  { id: 27, from: "Prishtina", fromCode: "PRN", to: "Paris", toCode: "CDG", oneWayPrice: 189, duration: "4h 30min", airline: swiss, departure: "09:40", arrival: "14:10", returnDeparture: "09:40", returnArrival: "14:10", returnTo: "Prishtina", validDays: [1, 6], returnToCode: "PRN", isReturn: true },
  { id: 28, from: "Tirana", fromCode: "TIA", to: "Rome", toCode: "FCO", oneWayPrice: 21, duration: "1h 30min", airline: wizz, departure: "07:20", arrival: "08:50", returnDeparture: "18:40", returnArrival: "20:10", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 3, 5, 6], isReturn: false },
  { id: 28, from: "Tirana", fromCode: "TIA", to: "Rome", toCode: "FCO", oneWayPrice: 21, duration: "1h 30min", airline: wizz, departure: "07:20", arrival: "08:50", returnDeparture: "18:40", returnArrival: "20:10", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 3, 5, 6], isReturn: true },
  { id: 29, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 92, duration: "10h 05min", airline: easyJet, departure: "10:05", arrival: "20:10", returnDeparture: "10:05", returnArrival: "20:10", returnTo: "Prishtina", returnToCode: "PRN", validDays: [2], isReturn: false },
  { id: 29, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 92, duration: "10h 05min", airline: easyJet, departure: "10:05", arrival: "20:10", returnDeparture: "10:05", returnArrival: "20:10", returnTo: "Prishtina", returnToCode: "PRN", validDays: [2], isReturn: true },




  { id: 30, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", oneWayPrice: 30, duration: "1h 30min", airline: ryan_air, departure: "21:25", arrival: "22:55", returnDeparture: "06:00", returnArrival: "07:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 4, 6], isReturn: false },
  { id: 30, from: "Tirana", fromCode: "TIA", to: "Vienna", toCode: "VIE", oneWayPrice: 30, duration: "1h 30min", airline: ryan_air, departure: "21:25", arrival: "22:55", returnDeparture: "06:00", returnArrival: "07:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 4, 6], isReturn: true },
  { id: 31, from: "Prishtina", fromCode: "PRN", to: "Rome", toCode: "FCO", oneWayPrice: 942, duration: "6h 05min", airline: lufthansa, departure: "11:45", arrival: "17:50", returnDeparture: "11:45", returnArrival: "17:50", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 3, 5, 7], isReturn: false },
  { id: 31, from: "Prishtina", fromCode: "PRN", to: "Rome", toCode: "FCO", oneWayPrice: 942, duration: "6h 05min", airline: lufthansa, departure: "11:45", arrival: "17:50", returnDeparture: "11:45", returnArrival: "17:50", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 3, 5, 7], isReturn: true },
  { id: 32, from: "Tirana", fromCode: "TIA", to: "Budapest", toCode: "BUD", oneWayPrice: 137, duration: "7h 00min", airline: wizz, departure: "06:45", arrival: "13:45", returnDeparture: "06:45", returnArrival: "13:45", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 2, 5], isReturn: false },
  { id: 32, from: "Tirana", fromCode: "TIA", to: "Budapest", toCode: "BUD", oneWayPrice: 137, duration: "7h 00min", airline: wizz, departure: "06:45", arrival: "13:45", returnDeparture: "06:45", returnArrival: "13:45", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 2, 5], isReturn: true },
  { id: 33, from: "Prishtina", fromCode: "PRN", to: "Budapest", toCode: "BUD", oneWayPrice: 54, duration: "6h 35min", airline: wizz, departure: "12:15", arrival: "18:50", returnDeparture: "12:15", returnArrival: "18:50", returnTo: "Prishtina", returnToCode: "PRN", validDays: [2, 6], isReturn: false },
  { id: 33, from: "Prishtina", fromCode: "PRN", to: "Budapest", toCode: "BUD", oneWayPrice: 54, duration: "6h 35min", airline: wizz, departure: "12:15", arrival: "18:50", returnDeparture: "12:15", returnArrival: "18:50", returnTo: "Prishtina", returnToCode: "PRN", validDays: [2, 6], isReturn: true },
  { id: 34, from: "Tirana", fromCode: "TIA", to: "Milano", toCode: "MXP", oneWayPrice: 72, duration: "2h 05min", airline: ryan_air, departure: "12:00", arrival: "14:05", returnDeparture: "19:00", returnArrival: "21:05", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 5], isReturn: false },
  { id: 34, from: "Tirana", fromCode: "TIA", to: "Milano", toCode: "MXP", oneWayPrice: 72, duration: "2h 05min", airline: ryan_air, departure: "12:00", arrival: "14:05", returnDeparture: "19:00", returnArrival: "21:05", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 5], isReturn: true },
  { id: 35, from: "Prishtina", fromCode: "PRN", to: "Paris", toCode: "CDG", oneWayPrice: 165, duration: "6h 55min", airline: austrian, departure: "12:25", arrival: "19:20", returnDeparture: "12:25", returnArrival: "19:20", returnTo: "Prishtina", returnToCode: "PRN", validDays: [2, 5], isReturn: false },
  { id: 35, from: "Prishtina", fromCode: "PRN", to: "Paris", toCode: "CDG", oneWayPrice: 165, duration: "6h 55min", airline: austrian, departure: "12:25", arrival: "19:20", returnDeparture: "12:25", returnArrival: "19:20", returnTo: "Prishtina", returnToCode: "PRN", validDays: [2, 5], isReturn: true },
  { id: 36, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 84, duration: "13h 10min", airline: wizz, departure: "07:55", arrival: "21:05", returnDeparture: "07:55", returnArrival: "21:05", returnTo: "Prishtina", returnToCode: "PRN", validDays: [4], isReturn: false },
  { id: 36, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 84, duration: "13h 10min", airline: wizz, departure: "07:55", arrival: "21:05", returnDeparture: "07:55", returnArrival: "21:05", returnTo: "Prishtina", returnToCode: "PRN", validDays: [4], isReturn: true },
  { id: 37, from: "Tirana", fromCode: "TIA", to: "Budapest", toCode: "BUD", oneWayPrice: 23, duration: "1h 25min", airline: ryan_air, departure: "08:35", arrival: "10:00", returnDeparture: "08:35", returnArrival: "10:00", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 2, 5], isReturn: false },
  { id: 37, from: "Tirana", fromCode: "TIA", to: "Budapest", toCode: "BUD", oneWayPrice: 23, duration: "1h 25min", airline: ryan_air, departure: "08:35", arrival: "10:00", returnDeparture: "08:35", returnArrival: "10:00", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 2, 5], isReturn: true },
  { id: 38, from: "Prishtina", fromCode: "PRN", to: "Rome", toCode: "FCO", oneWayPrice: 97, duration: "7h 45min", airline: pegasus, departure: "02:45", arrival: "10:30", returnDeparture: "02:45", returnArrival: "10:30", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 3, 5, 7], isReturn: false },
  { id: 38, from: "Prishtina", fromCode: "PRN", to: "Rome", toCode: "FCO", oneWayPrice: 97, duration: "7h 45min", airline: pegasus, departure: "02:45", arrival: "10:30", returnDeparture: "02:45", returnArrival: "10:30", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 3, 5, 7], isReturn: true },
  { id: 39, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", oneWayPrice: 70, duration: "5h 15min", airline: ryan_air, departure: "17:40", arrival: "00:55", returnDeparture: "17:40", returnArrival: "00:55", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 5], isReturn: false },
  { id: 39, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", oneWayPrice: 70, duration: "5h 15min", airline: ryan_air, departure: "17:40", arrival: "00:55", returnDeparture: "17:40", returnArrival: "00:55", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3, 5], isReturn: true },
  { id: 40, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 146, duration: "9h 05min", airline: swiss, departure: "09:40", arrival: "18:45", returnDeparture: "09:40", returnArrival: "18:45", returnTo: "Prishtina", returnToCode: "PRN", validDays: [3], isReturn: false },
  { id: 40, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 146, duration: "9h 05min", airline: swiss, departure: "09:40", arrival: "18:45", returnDeparture: "09:40", returnArrival: "18:45", returnTo: "Prishtina", returnToCode: "PRN", validDays: [3], isReturn: true },
  { id: 41, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "IST", oneWayPrice: 80, duration: "1h 35min", airline: airAlbania, departure: "10:00", arrival: "11:35", returnDeparture: "18:00", returnArrival: "19:35", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 6], isReturn: false },
  { id: 41, from: "Tirana", fromCode: "TIA", to: "Istanbul", toCode: "IST", oneWayPrice: 80, duration: "1h 35min", airline: airAlbania, departure: "10:00", arrival: "11:35", returnDeparture: "18:00", returnArrival: "19:35", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 6], isReturn: true },

  { id: 43, from: "Prishtina", fromCode: "PRN", to: "Rome", toCode: "FCO", oneWayPrice: 115, duration: "7h 30min", airline: ryan_air, departure: "02:45", arrival: "10:15", returnDeparture: "02:45", returnArrival: "10:15", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 3, 5, 7], isReturn: false },
  { id: 43, from: "Prishtina", fromCode: "PRN", to: "Rome", toCode: "FCO", oneWayPrice: 115, duration: "7h 30min", airline: ryan_air, departure: "02:45", arrival: "10:15", returnDeparture: "02:45", returnArrival: "10:15", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 3, 5, 7], isReturn: true },
  { id: 44, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", oneWayPrice: 34, duration: "3h 40min", airline: wizz, departure: "17:50", arrival: "21:30", returnDeparture: "17:50", returnArrival: "21:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [3, 5], isReturn: false },
  { id: 44, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", oneWayPrice: 34, duration: "3h 40min", airline: wizz, departure: "17:50", arrival: "21:30", returnDeparture: "17:50", returnArrival: "21:30", returnTo: "Tirana", returnToCode: "TIA", validDays: [3, 5], isReturn: true },


  { id: 47, from: "Tirana", fromCode: "TIA", to: "Rome", toCode: "FCO", oneWayPrice: 29, duration: "1h 30min", airline: ryan_air, departure: "10:20", arrival: "11:50", returnDeparture: "18:40", returnArrival: "20:10", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 3, 5, 6], isReturn: false },
  { id: 47, from: "Tirana", fromCode: "TIA", to: "Rome", toCode: "FCO", oneWayPrice: 29, duration: "1h 30min", airline: ryan_air, departure: "10:20", arrival: "11:50", returnDeparture: "18:40", returnArrival: "20:10", returnTo: "Tirana", returnToCode: "TIA", validDays: [0, 1, 3, 5, 6], isReturn: true },
  { id: 48, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 94, duration: "9h 00min", airline: pegasus, departure: "11:00", arrival: "20:00", returnDeparture: "11:00", returnArrival: "20:00", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1], isReturn: false },
  { id: 48, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 94, duration: "9h 00min", airline: pegasus, departure: "11:00", arrival: "20:00", returnDeparture: "11:00", returnArrival: "20:00", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1], isReturn: true },

  { id: 51, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", oneWayPrice: 110, duration: "8h 50min", airline: pegasus, departure: "02:55", arrival: "11:45", returnDeparture: "02:55", returnArrival: "11:45", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3], isReturn: false },
  { id: 51, from: "Tirana", fromCode: "TIA", to: "Madrid", toCode: "MAD", oneWayPrice: 110, duration: "8h 50min", airline: pegasus, departure: "02:55", arrival: "11:45", returnDeparture: "02:55", returnArrival: "11:45", returnTo: "Tirana", returnToCode: "TIA", validDays: [1, 3], isReturn: true },


  { id: 54, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 168, duration: "7h 30min", airline: turkish, departure: "08:55", arrival: "16:25", returnDeparture: "08:55", returnArrival: "16:25", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 3, 5], isReturn: false },
  { id: 54, from: "Prishtina", fromCode: "PRN", to: "Madrid", toCode: "MAD", oneWayPrice: 168, duration: "7h 30min", airline: turkish, departure: "08:55", arrival: "16:25", returnDeparture: "08:55", returnArrival: "16:25", returnTo: "Prishtina", returnToCode: "PRN", validDays: [1, 3, 5], isReturn: true },

];

// Gjenerimi i variantëve me orare të ndryshme
const generateFlightVariants = (flight, count = 5, intervalHours = 2, isReturn = false) => {
  const variants = [];
  for (let i = 0; i < count; i++) {
    const dep = new Date(`1970-01-01T${flight.departure}:00`);
    const arr = new Date(`1970-01-01T${flight.arrival}:00`);
    dep.setHours(dep.getHours() + i * intervalHours);
    arr.setHours(arr.getHours() + i * intervalHours);

    let retDep, retArr;
    if (isReturn) {
      retDep = new Date(`1970-01-01T${flight.returnDeparture}:00`);
      retArr = new Date(`1970-01-01T${flight.returnArrival}:00`);
      retDep.setHours(retDep.getHours() + i * intervalHours);
      retArr.setHours(retArr.getHours() + i * intervalHours);
    }

    variants.push({
      ...flight,
      id: `${flight.id}-${i}`,
      baseId: flight.id,
      departure: dep.toTimeString().slice(0, 5),
      arrival: arr.toTimeString().slice(0, 5),
      returnDeparture: isReturn ? retDep.toTimeString().slice(0, 5) : null,
      returnArrival: isReturn ? retArr.toTimeString().slice(0, 5) : null,
      isReturn
    });
  }
  return variants;
};

// Gjenerojmë të gjitha variantet
const oneWayFlights = baseFlights.flatMap(f => generateFlightVariants(f, 5, 2, false));
const returnFlights = baseFlights.flatMap(f => generateFlightVariants(f, 5, 2, true));

const flights = [...oneWayFlights, ...returnFlights];

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
const FlightCard = ({ flight, isReturn, openModal, favorites = [], setFavorites }) => {
  const price = isReturn ? Math.round(flight.oneWayPrice * 1.6) : flight.oneWayPrice;
  const displayPrice = `€${price}`;

  const isFavorite = favorites.some(
    (f) => f.id === flight.id && f.isReturn === isReturn
  );

  const toggleFavorite = (flight, isReturn) => {
    const flightData = { ...flight, isReturn };

    const updated = favorites.some(
      f => f.id === flight.id && f.isReturn === isReturn
    )
      ? favorites.filter(
        f => !(f.id === flight.id && f.isReturn === isReturn)
      )
      : [...favorites, flightData];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="bg-white relative rounded-3xl shadow-md border border-gray-300 hover:shadow-xl transition-all duration-300 w-full mx-auto">
      {/* Favorite Heart */}
      <div
        className="absolute top-4 right-4 cursor-pointer z-10"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(flight, isReturn);
        }}
      >
        <Heart
          className={`w-6 h-6 transition-all ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"
            }`}
        />
      </div>

      <div className="p-3 pb-1">
        <div className="flex items-center justify-between mb-4">
          <img src={flight.airline} alt="Airline Logo" className="w-16 h-16 object-contain" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between -mt-5">
            <div>
              <h3 className="text-2xl font-bold ml-4">{flight.from}</h3>
              <p className="text-gray-400 text-sm ml-4">{flight.fromCode}</p>
              <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">{flight.departure}</p>
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
              <p className="text-gray-800 font-semibold text-xl mt-1 mr-4">{flight.arrival}</p>
            </div>
          </div>

          {isReturn && (
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold ml-4">{flight.to}</h3>
                  <p className="text-gray-400 text-sm ml-4">{flight.toCode}</p>
                  <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">{flight.returnDeparture}</p>
                </div>

                <div className="flex items-center justify-center w-full relative mt-4">
                  <div className="absolute top-1/2 -left-2 right-5 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                  <div className="absolute -left-2 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute right-4 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                    <Plane className="w-6 h-6 text-gray-600 bg-white animate-flight" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mr-4">{flight.returnTo}</h3>
                  <p className="text-gray-400 text-sm">{flight.returnToCode}</p>
                  <p className="text-gray-800 font-semibold text-xl mt-1">{flight.returnArrival}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2 font-semibold">Return Flight</p>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between">
          <span className="text-sm text-gray-600 ml-4">Duration: {flight.duration}</span>
          <span className="text-blue-600 font-bold text-lg mr-5">{displayPrice}</span>
        </div>
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

  // Filtron sipas qytetit dhe tipit të fluturimit
  const filteredFlights = flights.filter(flight =>
    (!fromFilter || flight.from === fromFilter) &&
    (!toFilter || flight.to === toFilter)
  );

  // Ruaj vetëm një fluturim për secilën id bazë
  const uniqueFlights = [];
  const seenIds = new Set();

  filteredFlights.forEach(f => {
    if (!seenIds.has(f.id)) {
      uniqueFlights.push(f);
      seenIds.add(f.id);
    }
  });

  // Llogarit pagination
  const totalPages = Math.ceil(uniqueFlights.length / flightsPerPage);
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = uniqueFlights.slice(indexOfFirstFlight, indexOfLastFlight);

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
            key={index}
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
                  availableFlights={[modalFlight]} // këtu i japim fluturimin aktual
                />
              </div>

              {isReturn && (
                <div>
                  <p className="mb-2 mt-4 font-semibold">Return Date</p>
                  <Calendar
                    selectedDate={returnDate}
                    setSelectedDate={setReturnDate}
                    minDate={departureDate || today}
                    maxDate={maxDate}
                    availableFlights={[modalFlight]} // edhe për kthim e përdorim të njëjtën listë
                  />
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-between items-center">
              <div className="text-lg font-semibold">
                Price: €{isReturn ? Math.round(modalFlight.oneWayPrice * 1.6) : modalFlight.oneWayPrice}
              </div>
              <button
                onClick={() => {
                  if (!departureDate) { alert("You didn't choose a departure date"); return; }
                  if (isReturn && !returnDate) { alert("You didn't choose a return date"); return; }
                  alert(`Departure: ${departureDate.toDateString()}\nReturn: ${returnDate ? returnDate.toDateString() : "N/A"}\nPrice: €${isReturn ? Math.round(modalFlight.oneWayPrice * 1.6) : modalFlight.oneWayPrice}`);
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