"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export type Locale = 'en' | 'vi'

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Sidebar
    'nav.dashboard': 'Dashboard',
    'nav.buildings': 'Buildings',
    'nav.properties': 'Properties',
    'nav.tenants': 'Tenants',
    'nav.leads': 'Leads',
    'nav.contracts': 'Contracts',
    'nav.bookings': 'Bookings',
    'nav.payments': 'Payments',
    'nav.expenses': 'Expenses',
    'nav.maintenance': 'Maintenance',
    'nav.handovers': 'Handovers',
    'nav.issues': 'Issues',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    'nav.system': 'System',
    'nav.signout': 'Sign out',

    // Header
    'search.placeholder': 'Search tenants, properties, transactions...',
    'theme.light': 'Switch to light mode',
    'theme.dark': 'Switch to dark mode',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Overview of your property portfolio',
    'dashboard.totalProperties': 'Total Properties',
    'dashboard.occupancyRate': 'Occupancy Rate',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.activeTenants': 'Active Tenants',
    'dashboard.pendingPayments': 'Pending Payments',
    'dashboard.maintenanceOpen': 'Maintenance Open',

    // Common
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.export': 'Export CSV',
    'common.search': 'Search',
    'common.filter': 'Filters',
    'common.actions': 'Actions',
    'common.status': 'Status',
    'common.all': 'All',
    'common.confirm_delete': 'Are you sure you want to delete this? This action cannot be undone.',
    'common.no_data': 'No data found',

    // Auth
    'auth.signin': 'Sign In',
    'auth.signup': 'Create Account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.welcome': 'Welcome back',
    'auth.create': 'Create account',
    'auth.no_account': "Don't have an account?",
    'auth.has_account': 'Already have an account?',
    'auth.remember': 'Remember me',
    'auth.forgot': 'Forgot password?',
    'auth.or_email': 'or continue with email',
    'auth.or_register': 'or register with email',
    'auth.signin_desc': 'Sign in to manage your properties',
    'auth.signup_desc': 'Create your account to get started',
    'auth.registered': 'Account created successfully! Check your email to verify, then sign in.',
  },
  vi: {
    // Sidebar
    'nav.dashboard': 'Tổng quan',
    'nav.buildings': 'Tòa nhà',
    'nav.properties': 'Căn hộ',
    'nav.tenants': 'Khách thuê',
    'nav.leads': 'Khách tiềm năng',
    'nav.contracts': 'Hợp đồng',
    'nav.bookings': 'Lịch hẹn',
    'nav.payments': 'Thanh toán',
    'nav.expenses': 'Chi phí',
    'nav.maintenance': 'Bảo trì',
    'nav.handovers': 'Bàn giao',
    'nav.issues': 'Sự cố',
    'nav.analytics': 'Thống kê',
    'nav.settings': 'Cài đặt',
    'nav.system': 'Hệ thống',
    'nav.signout': 'Đăng xuất',

    // Header
    'search.placeholder': 'Tìm khách thuê, căn hộ, giao dịch...',
    'theme.light': 'Chuyển sang sáng',
    'theme.dark': 'Chuyển sang tối',

    // Dashboard
    'dashboard.title': 'Tổng quan',
    'dashboard.subtitle': 'Tổng quan danh mục bất động sản',
    'dashboard.totalProperties': 'Tổng căn hộ',
    'dashboard.occupancyRate': 'Tỷ lệ lấp đầy',
    'dashboard.monthlyRevenue': 'Doanh thu tháng',
    'dashboard.activeTenants': 'Khách đang thuê',
    'dashboard.pendingPayments': 'Chờ thanh toán',
    'dashboard.maintenanceOpen': 'Bảo trì mở',

    // Common
    'common.add': 'Thêm',
    'common.edit': 'Sửa',
    'common.delete': 'Xóa',
    'common.save': 'Lưu',
    'common.cancel': 'Hủy',
    'common.export': 'Xuất CSV',
    'common.search': 'Tìm kiếm',
    'common.filter': 'Bộ lọc',
    'common.actions': 'Thao tác',
    'common.status': 'Trạng thái',
    'common.all': 'Tất cả',
    'common.confirm_delete': 'Bạn có chắc muốn xóa? Hành động này không thể hoàn tác.',
    'common.no_data': 'Không tìm thấy dữ liệu',

    // Auth
    'auth.signin': 'Đăng nhập',
    'auth.signup': 'Tạo tài khoản',
    'auth.email': 'Email',
    'auth.password': 'Mật khẩu',
    'auth.welcome': 'Chào mừng trở lại',
    'auth.create': 'Tạo tài khoản',
    'auth.no_account': 'Chưa có tài khoản?',
    'auth.has_account': 'Đã có tài khoản?',
    'auth.remember': 'Ghi nhớ đăng nhập',
    'auth.forgot': 'Quên mật khẩu?',
    'auth.or_email': 'hoặc đăng nhập bằng email',
    'auth.or_register': 'hoặc đăng ký bằng email',
    'auth.signin_desc': 'Đăng nhập để quản lý bất động sản',
    'auth.signup_desc': 'Tạo tài khoản để bắt đầu',
    'auth.registered': 'Tạo tài khoản thành công! Kiểm tra email để xác thực, sau đó đăng nhập.',
  },
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null
    if (stored && (stored === 'en' || stored === 'vi')) {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
  }, [])

  const t = useCallback((key: string): string => {
    return translations[locale][key] || key
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
