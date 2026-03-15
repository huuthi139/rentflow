// ============================================
// TYPES - RentFlow SaaS
// ============================================

// --- User Roles ---
export type UserRole =
  | "Admin"
  | "Manager"
  | "Agent"
  | "Maintenance"
  | "Accountant"
  | "Tenant";

// --- Buildings ---
export interface Building {
  id: string;
  name: string;
  address: string;
  city: string;
  floors: number;
  units: number;
  owner: string;
  serviceFee: number;
  image: string;
}

// --- Properties ---
export type PropertyStatus =
  | "Available"
  | "Occupied"
  | "Reserved"
  | "Maintenance"
  | "Inactive";

export interface Property {
  id: string;
  name: string;
  building: string;
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  status: PropertyStatus;
  rentOwner: number;
  rentTenant: number;
  operatingCost: number;
  profit: number;
  image: string;
  furniture: string;
}

// --- Tenants ---
export type TenantStatus =
  | "Active"
  | "Lead"
  | "Overdue"
  | "Former"
  | "Interested"
  | "Viewing";

export type PaymentStatus = "Paid" | "Unpaid" | "Cleared" | "N/A" | "Partial";

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  propertyType: string;
  status: TenantStatus;
  payment: PaymentStatus;
  contractEnd: string;
  avatar: string;
  nationality: string;
  idNumber: string;
}

// --- Contracts ---
export type ContractStatus =
  | "Active"
  | "Ending Soon"
  | "Expired"
  | "Terminated";

export interface Contract {
  id: string;
  tenant: string;
  property: string;
  startDate: string;
  endDate: string;
  rentPrice: number;
  deposit: number;
  paymentCycle: string;
  status: ContractStatus;
}

// --- Payments ---
export type PaymentRecordStatus = "Paid" | "Pending" | "Late" | "Partial";

export interface PaymentRecord {
  id: string;
  tenant: string;
  property: string;
  amount: number;
  dueDate: string;
  paidDate: string | null;
  status: PaymentRecordStatus;
  month: string;
}

// --- Maintenance ---
export type MaintenanceStatus =
  | "Open"
  | "In Progress"
  | "Resolved"
  | "Closed";

export type MaintenancePriority = "Critical" | "High" | "Medium" | "Low";

export interface MaintenanceTicket {
  id: string;
  property: string;
  type: string;
  description: string;
  reportDate: string;
  assignee: string;
  cost: number;
  status: MaintenanceStatus;
  priority: MaintenancePriority;
}

// --- Bookings ---
export type BookingStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled"
  | "No Show";

export interface Booking {
  id: string;
  tenant: string;
  property: string;
  agent: string;
  dateTime: string;
  notes: string;
  status: BookingStatus;
}

// --- Expenses ---
export type ExpenseCategory =
  | "Rent to Owner"
  | "Electric"
  | "Water"
  | "Internet"
  | "Repair"
  | "Cleaning"
  | "Supplies";

export interface Expense {
  id: string;
  property: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  vendor: string;
  receipt: boolean;
}

// --- Leads ---
export type LeadStage =
  | "Lead"
  | "Contacted"
  | "Viewing"
  | "Negotiating"
  | "Signed";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interestedProperty: string;
  budget: number;
  stage: LeadStage;
  source: string;
  assignedAgent: string;
  createdAt: string;
  notes: string;
}

// --- Handover Report ---
export interface HandoverReport {
  id: string;
  property: string;
  tenant: string;
  type: "Check-in" | "Check-out";
  date: string;
  agent: string;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  notes: string;
  photos: string[];
  issues: string[];
  meterReadings: {
    electric: number;
    water: number;
  };
  depositDeductions: number;
  signedByTenant: boolean;
  signedByAgent: boolean;
}

// --- Issue Reports ---
export type IssueSeverity = "Critical" | "Major" | "Minor" | "Cosmetic";

export type IssueCategory =
  | "Structural"
  | "Plumbing"
  | "Electrical"
  | "Appliance"
  | "Cosmetic"
  | "Safety"
  | "Pest"
  | "Other";

export interface IssueReport {
  id: string;
  property: string;
  reportedBy: string;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  reportDate: string;
  resolvedDate: string | null;
  photos: string[];
  status: "Open" | "Investigating" | "Resolved" | "Closed";
  assignedTo: string;
  estimatedCost: number;
}
