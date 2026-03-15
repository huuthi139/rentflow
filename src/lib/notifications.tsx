"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface AppNotification {
  id: string
  type: 'payment' | 'maintenance' | 'contract' | 'lead' | 'booking' | 'issue' | 'property' | 'tenant' | 'building' | 'expense' | 'handover' | 'info'
  title: string
  desc: string
  time: string // ISO timestamp
  read: boolean
}

const STORAGE_KEY = 'rentflow_notifications'
const MAX_NOTIFICATIONS = 20

function loadNotifications(): AppNotification[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveNotifications(notifications: AppNotification[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
}

interface NotificationContextType {
  notifications: AppNotification[]
  unreadCount: number
  addNotification: (n: Omit<AppNotification, 'id' | 'time' | 'read'>) => void
  markAllRead: () => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])

  useEffect(() => {
    setNotifications(loadNotifications())
  }, [])

  const addNotification = useCallback((n: Omit<AppNotification, 'id' | 'time' | 'read'>) => {
    setNotifications(prev => {
      const newNotif: AppNotification = {
        ...n,
        id: crypto.randomUUID(),
        time: new Date().toISOString(),
        read: false,
      }
      const updated = [newNotif, ...prev].slice(0, MAX_NOTIFICATIONS)
      saveNotifications(updated)
      return updated
    })
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }))
      saveNotifications(updated)
      return updated
    })
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    saveNotifications([])
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAllRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}
