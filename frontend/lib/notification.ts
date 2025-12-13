'use client'

import { toast } from '@/hooks/use-toast'
import { CheckCircle2, AlertCircle, Info, XCircle } from 'lucide-react'
import { createElement } from 'react'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

interface NotificationOptions {
  title?: string
  description: string
  type?: NotificationType
  duration?: number
}

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertCircle,
}

const variantMap = {
  success: 'default',
  error: 'destructive',
  info: 'default',
  warning: 'default',
} as const

const iconColorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
}

export function showNotification({
  title,
  description,
  type = 'success',
  duration = 5000,
}: NotificationOptions) {
  const Icon = iconMap[type]
  const iconColor = iconColorMap[type]
  
  console.log('🔔 Notification called:', { title, description, type })
  
  toast({
    title: title || (type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info'),
    description: createElement(
      'div',
      { className: 'flex items-start gap-2' },
      createElement(Icon, { className: `h-5 w-5 mt-0.5 ${iconColor}` }),
      createElement('span', null, description)
    ),
    variant: variantMap[type],
    duration,
  })
  
  console.log('✅ Toast triggered')
}

// Convenience methods
export const notification = {
  success: (description: string, title?: string) =>
    showNotification({ description, title, type: 'success' }),
  error: (description: string, title?: string) =>
    showNotification({ description, title, type: 'error' }),
  info: (description: string, title?: string) =>
    showNotification({ description, title, type: 'info' }),
  warning: (description: string, title?: string) =>
    showNotification({ description, title, type: 'warning' }),
}
