// ============================================
// MOCK DATA - RentFlow SaaS
// ============================================

import type {
  Booking,
  Expense,
  Lead,
} from "@/lib/types";

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

export const buildings: Building[] = [
  { id: "BLD-001", name: "Landmark Tower", address: "123 Business District", city: "Metropolis", floors: 35, units: 120, owner: "LM Holdings", serviceFee: 5500, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400" },
  { id: "BLD-002", name: "Skyline Heights", address: "456 Downtown Ave", city: "Metro City", floors: 28, units: 95, owner: "Sky Corp", serviceFee: 4800, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400" },
  { id: "BLD-003", name: "Green Valley", address: "789 Park Road", city: "Garden City", floors: 12, units: 48, owner: "Green Dev", serviceFee: 3200, image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400" },
  { id: "BLD-004", name: "Corporate Plaza", address: "321 Commerce St", city: "Business Bay", floors: 20, units: 80, owner: "Plaza Inc", serviceFee: 6000, image: "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=400" },
  { id: "BLD-005", name: "The Meadows", address: "654 Riverside Dr", city: "Riverside", floors: 8, units: 32, owner: "Meadow LLC", serviceFee: 2800, image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400" },
  { id: "BLD-006", name: "Ocean Breeze", address: "987 Coastal Blvd", city: "Seaside", floors: 15, units: 60, owner: "Ocean Properties", serviceFee: 4500, image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400" },
];

// --- Properties ---
export type PropertyStatus = "Available" | "Occupied" | "Reserved" | "Maintenance" | "Inactive";

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

export const properties: Property[] = [
  { id: "RF-1001", name: "Oakwood Apt 4B", building: "Oakwood Heights", location: "New York", area: 75, bedrooms: 2, bathrooms: 1, floor: 4, status: "Available", rentOwner: 1550, rentTenant: 2400, operatingCost: 200, profit: 850, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400", furniture: "Full" },
  { id: "RF-1002", name: "Maple Villa", building: "Downtown Plaza", location: "Chicago", area: 95, bedrooms: 3, bathrooms: 2, floor: 8, status: "Occupied", rentOwner: 1900, rentTenant: 3100, operatingCost: 250, profit: 1200, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400", furniture: "Full" },
  { id: "RF-1003", name: "Pine Studio", building: "North Side", location: "Los Angeles", area: 42, bedrooms: 1, bathrooms: 1, floor: 3, status: "Maintenance", rentOwner: 1050, rentTenant: 1200, operatingCost: 150, profit: -150, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400", furniture: "Basic" },
  { id: "RF-1004", name: "Cedar Suite", building: "West End", location: "Austin", area: 68, bedrooms: 2, bathrooms: 1, floor: 5, status: "Reserved", rentOwner: 1450, rentTenant: 1850, operatingCost: 180, profit: 400, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400", furniture: "Full" },
  { id: "RF-1005", name: "Urban Loft", building: "East Side", location: "Seattle", area: 88, bedrooms: 2, bathrooms: 2, floor: 12, status: "Available", rentOwner: 1950, rentTenant: 2900, operatingCost: 220, profit: 950, image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400", furniture: "Premium" },
  { id: "RF-1006", name: "Sunset Studio", building: "Skyline Heights", location: "Metro City", area: 38, bedrooms: 1, bathrooms: 1, floor: 15, status: "Occupied", rentOwner: 900, rentTenant: 1400, operatingCost: 120, profit: 380, image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400", furniture: "Basic" },
  { id: "RF-1007", name: "Riverside 2BR", building: "The Meadows", location: "Riverside", area: 72, bedrooms: 2, bathrooms: 1, floor: 3, status: "Occupied", rentOwner: 1300, rentTenant: 1900, operatingCost: 160, profit: 440, image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400", furniture: "Full" },
  { id: "RF-1008", name: "Penthouse A", building: "Landmark Tower", location: "Metropolis", area: 150, bedrooms: 4, bathrooms: 3, floor: 35, status: "Available", rentOwner: 4500, rentTenant: 6800, operatingCost: 500, profit: 1800, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400", furniture: "Premium" },
];

// --- Tenants ---
export type TenantStatus = "Active" | "Lead" | "Overdue" | "Former" | "Interested" | "Viewing";
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

export const tenants: Tenant[] = [
  { id: "RF-1092", name: "Sarah Jenkins", email: "sarah.j@email.com", phone: "+1 (555) 012-3456", property: "Skyline Tower A, 402", propertyType: "Premium Studio", status: "Active", payment: "Paid", contractEnd: "Dec 15, 2024", avatar: "", nationality: "US", idNumber: "SSN-***-4567" },
  { id: "RF-1105", name: "Marcus Peterson", email: "m.peterson@email.com", phone: "+1 (555) 987-6543", property: "Green Valley, Villa 12", propertyType: "3 Bedroom Villa", status: "Lead", payment: "N/A", contractEnd: "-", avatar: "", nationality: "US", idNumber: "SSN-***-8901" },
  { id: "RF-0988", name: "Linda Wright", email: "linda.wright@email.com", phone: "+1 (555) 234-5678", property: "Riverview Apt, 10B", propertyType: "2 Bedroom Apt", status: "Overdue", payment: "Unpaid", contractEnd: "Oct 30, 2024", avatar: "", nationality: "UK", idNumber: "PP-***-2345" },
  { id: "RF-0852", name: "David Thompson", email: "david.t@email.com", phone: "+1 (555) 456-7890", property: "Ocean Breeze, Suite 2", propertyType: "Office Space", status: "Former", payment: "Cleared", contractEnd: "Aug 01, 2023", avatar: "", nationality: "CA", idNumber: "SSN-***-6789" },
  { id: "RF-1120", name: "Emily Chen", email: "emily.chen@email.com", phone: "+1 (555) 345-6789", property: "Landmark Tower, 1205", propertyType: "1 Bedroom Apt", status: "Active", payment: "Paid", contractEnd: "Mar 20, 2025", avatar: "", nationality: "CN", idNumber: "PP-***-3456" },
  { id: "RF-1098", name: "James Rodriguez", email: "j.rodriguez@email.com", phone: "+1 (555) 567-8901", property: "Downtown Plaza, 8A", propertyType: "2 Bedroom Apt", status: "Active", payment: "Paid", contractEnd: "Jun 30, 2025", avatar: "", nationality: "MX", idNumber: "PP-***-7890" },
  { id: "RF-1134", name: "Anna Kowalski", email: "anna.k@email.com", phone: "+1 (555) 678-9012", property: "The Meadows, Unit 7", propertyType: "Studio", status: "Interested", payment: "N/A", contractEnd: "-", avatar: "", nationality: "PL", idNumber: "PP-***-0123" },
  { id: "RF-0945", name: "Robert Kim", email: "r.kim@email.com", phone: "+1 (555) 789-0123", property: "Skyline Heights, 1502", propertyType: "3 Bedroom Apt", status: "Active", payment: "Partial", contractEnd: "Sep 15, 2025", avatar: "", nationality: "KR", idNumber: "PP-***-4567" },
];

// --- Contracts ---
export type ContractStatus = "Active" | "Ending Soon" | "Expired" | "Terminated";

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

export const contracts: Contract[] = [
  { id: "CTR-001", tenant: "Sarah Jenkins", property: "Skyline Tower A, 402", startDate: "Jan 01, 2024", endDate: "Dec 15, 2024", rentPrice: 2400, deposit: 4800, paymentCycle: "Monthly", status: "Active" },
  { id: "CTR-002", tenant: "Emily Chen", property: "Landmark Tower, 1205", startDate: "Apr 01, 2024", endDate: "Mar 20, 2025", rentPrice: 1800, deposit: 3600, paymentCycle: "Monthly", status: "Active" },
  { id: "CTR-003", tenant: "Linda Wright", property: "Riverview Apt, 10B", startDate: "Nov 01, 2023", endDate: "Oct 30, 2024", rentPrice: 1500, deposit: 3000, paymentCycle: "Monthly", status: "Ending Soon" },
  { id: "CTR-004", tenant: "James Rodriguez", property: "Downtown Plaza, 8A", startDate: "Jul 01, 2024", endDate: "Jun 30, 2025", rentPrice: 3100, deposit: 6200, paymentCycle: "Monthly", status: "Active" },
  { id: "CTR-005", tenant: "David Thompson", property: "Ocean Breeze, Suite 2", startDate: "Jan 01, 2023", endDate: "Aug 01, 2023", rentPrice: 2200, deposit: 4400, paymentCycle: "Monthly", status: "Expired" },
  { id: "CTR-006", tenant: "Robert Kim", property: "Skyline Heights, 1502", startDate: "Oct 01, 2024", endDate: "Sep 15, 2025", rentPrice: 2900, deposit: 5800, paymentCycle: "Monthly", status: "Active" },
];

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

export const payments: PaymentRecord[] = [
  { id: "PAY-001", tenant: "John Doe", property: "Apt 4B - Skyline Heights", amount: 1200, dueDate: "Oct 01, 2023", paidDate: "Oct 01, 2023", status: "Paid", month: "October 2023" },
  { id: "PAY-002", tenant: "Jane Smith", property: "Suite 12 - Corporate Plaza", amount: 2500, dueDate: "Oct 05, 2023", paidDate: null, status: "Pending", month: "October 2023" },
  { id: "PAY-003", tenant: "Robert Brown", property: "Unit 7 - The Meadows", amount: 950, dueDate: "Sep 28, 2023", paidDate: null, status: "Late", month: "September 2023" },
  { id: "PAY-004", tenant: "Emily Davis", property: "Apt 2A - Green Valley", amount: 1100, dueDate: "Oct 10, 2023", paidDate: null, status: "Pending", month: "October 2023" },
  { id: "PAY-005", tenant: "Sarah Jenkins", property: "Skyline Tower A, 402", amount: 2400, dueDate: "Oct 01, 2023", paidDate: "Sep 30, 2023", status: "Paid", month: "October 2023" },
  { id: "PAY-006", tenant: "Emily Chen", property: "Landmark Tower, 1205", amount: 1800, dueDate: "Oct 01, 2023", paidDate: "Oct 02, 2023", status: "Paid", month: "October 2023" },
  { id: "PAY-007", tenant: "James Rodriguez", property: "Downtown Plaza, 8A", amount: 3100, dueDate: "Oct 01, 2023", paidDate: null, status: "Pending", month: "October 2023" },
  { id: "PAY-008", tenant: "Robert Kim", property: "Skyline Heights, 1502", amount: 2900, dueDate: "Oct 01, 2023", paidDate: "Oct 05, 2023", status: "Partial", month: "October 2023" },
];

// --- Maintenance ---
export type MaintenanceStatus = "Open" | "In Progress" | "Resolved" | "Closed";
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

export const maintenanceTickets: MaintenanceTicket[] = [
  { id: "MT-001", property: "Grand Plaza #102", type: "Plumbing", description: "Water Leak - Kitchen sink pipe leaking", reportDate: "Oct 12, 2023", assignee: "Mike Torres", cost: 350, status: "Open", priority: "High" },
  { id: "MT-002", property: "Pacific Loft #4C", type: "Electrical", description: "Faulty Light Fixture in living room", reportDate: "Oct 12, 2023", assignee: "John Davis", cost: 120, status: "In Progress", priority: "Medium" },
  { id: "MT-003", property: "Skyline Tower A, 402", type: "HVAC", description: "AC unit not cooling properly", reportDate: "Oct 10, 2023", assignee: "Tech Solutions", cost: 800, status: "Open", priority: "High" },
  { id: "MT-004", property: "Green Valley, Villa 12", type: "Lock", description: "Front door lock jammed", reportDate: "Oct 09, 2023", assignee: "SecureLock Co", cost: 200, status: "Resolved", priority: "Critical" },
  { id: "MT-005", property: "Downtown Plaza, 8A", type: "Appliance", description: "Washing machine not draining", reportDate: "Oct 08, 2023", assignee: "ApplianceFix", cost: 250, status: "In Progress", priority: "Medium" },
  { id: "MT-006", property: "Landmark Tower, 1205", type: "Internet", description: "WiFi router needs replacement", reportDate: "Oct 07, 2023", assignee: "NetTech", cost: 100, status: "Closed", priority: "Low" },
  { id: "MT-007", property: "The Meadows, Unit 7", type: "Furniture", description: "Broken wardrobe door hinge", reportDate: "Oct 06, 2023", assignee: "FurniFix", cost: 80, status: "Resolved", priority: "Low" },
  { id: "MT-008", property: "Ocean Breeze, Suite 2", type: "Plumbing", description: "Bathroom faucet dripping", reportDate: "Oct 05, 2023", assignee: "Mike Torres", cost: 150, status: "Closed", priority: "Medium" },
];

// --- Dashboard KPIs ---
export const dashboardKPIs = {
  totalProperties: 1240,
  totalPropertiesChange: 2.1,
  occupied: 1085,
  occupiedChange: 1.5,
  vacant: 155,
  vacantChange: -0.8,
  totalRevenue: 124000,
  revenueChange: 5.4,
  monthlyProfit: 42000,
  profitChange: 3.2,
  maintenanceTickets: 18,
  maintenanceChange: -12,
  occupancyRate: 87.5,
};

// --- Lease Expirations ---
export const leaseExpirations = [
  { tenant: "Sarah Jenkins", property: "Sunset Heights #402", expiryDate: "Oct 24, 2023", daysLeft: 12 },
  { tenant: "David Miller", property: "Oakwood Terrace #12", expiryDate: "Oct 28, 2023", daysLeft: 16 },
  { tenant: "Lisa Wang", property: "Maple Villa #305", expiryDate: "Nov 02, 2023", daysLeft: 21 },
  { tenant: "Carlos Mendez", property: "Pine Studio #8A", expiryDate: "Nov 10, 2023", daysLeft: 29 },
];

// --- Revenue Data (for charts) ---
export const revenueData = [
  { month: "Jan", revenue: 98000, expenses: 62000 },
  { month: "Feb", revenue: 102000, expenses: 58000 },
  { month: "Mar", revenue: 110000, expenses: 65000 },
  { month: "Apr", revenue: 108000, expenses: 60000 },
  { month: "May", revenue: 118000, expenses: 63000 },
  { month: "Jun", revenue: 124000, expenses: 67000 },
];

// --- Tenant Stats ---
export const tenantStats = {
  totalLeads: 124,
  leadsChange: 12,
  activeTenants: 856,
  occupancyRate: 98,
  pendingApps: 42,
  highPriority: 15,
};

// --- Payment Stats ---
export const paymentStats = {
  pendingPayments: 4250,
  pendingChange: 12.5,
  overdue: 1800,
  overdueChange: -5.2,
  totalCollected: 24500,
  collectedChange: 18.3,
};

// --- Bookings ---
export const bookings: Booking[] = [
  { id: "BK-001", tenant: "Sarah Jenkins", property: "Skyline Tower A, 402", agent: "Mike Chen", dateTime: "2024-10-20T10:00:00", notes: "Interested in renewing lease", status: "Scheduled" },
  { id: "BK-002", tenant: "Marcus Peterson", property: "Green Valley, Villa 12", agent: "Lisa Park", dateTime: "2024-10-18T14:30:00", notes: "First viewing, 3BR preferred", status: "Completed" },
  { id: "BK-003", tenant: "Anna Kowalski", property: "The Meadows, Unit 7", agent: "Mike Chen", dateTime: "2024-10-19T11:00:00", notes: "Budget $1200/month, studio ok", status: "Scheduled" },
  { id: "BK-004", tenant: "David Thompson", property: "Ocean Breeze, Suite 2", agent: "Lisa Park", dateTime: "2024-10-15T09:00:00", notes: "Wanted to see office space options", status: "No Show" },
  { id: "BK-005", tenant: "Emily Chen", property: "Landmark Tower, 1205", agent: "Tom Rivera", dateTime: "2024-10-16T16:00:00", notes: "Check-in inspection", status: "Completed" },
  { id: "BK-006", tenant: "James Rodriguez", property: "Downtown Plaza, 8A", agent: "Tom Rivera", dateTime: "2024-10-17T13:00:00", notes: "Maintenance follow-up visit", status: "Cancelled" },
  { id: "BK-007", tenant: "Robert Kim", property: "Skyline Heights, 1502", agent: "Mike Chen", dateTime: "2024-10-21T10:30:00", notes: "Discussing lease extension terms", status: "Scheduled" },
  { id: "BK-008", tenant: "Linda Wright", property: "Riverview Apt, 10B", agent: "Lisa Park", dateTime: "2024-10-14T15:00:00", notes: "Late payment discussion", status: "Completed" },
];

// --- Expenses ---
export const expenses: Expense[] = [
  { id: "EXP-001", property: "Skyline Tower A, 402", category: "Rent to Owner", description: "Monthly rent payment to owner", amount: 2400, date: "Oct 01, 2024", vendor: "LM Holdings", receipt: true },
  { id: "EXP-002", property: "Landmark Tower, 1205", category: "Rent to Owner", description: "Monthly rent payment to owner", amount: 1800, date: "Oct 01, 2024", vendor: "LM Holdings", receipt: true },
  { id: "EXP-003", property: "Downtown Plaza, 8A", category: "Electric", description: "Electricity bill - October", amount: 185, date: "Oct 10, 2024", vendor: "Metro Electric Co", receipt: true },
  { id: "EXP-004", property: "Green Valley, Villa 12", category: "Water", description: "Water utility bill", amount: 95, date: "Oct 08, 2024", vendor: "City Water Dept", receipt: true },
  { id: "EXP-005", property: "Skyline Heights, 1502", category: "Internet", description: "Monthly fiber internet service", amount: 65, date: "Oct 05, 2024", vendor: "NetTech ISP", receipt: true },
  { id: "EXP-006", property: "The Meadows, Unit 7", category: "Repair", description: "Wardrobe door hinge replacement", amount: 80, date: "Oct 06, 2024", vendor: "FurniFix", receipt: true },
  { id: "EXP-007", property: "Ocean Breeze, Suite 2", category: "Cleaning", description: "Deep cleaning after tenant checkout", amount: 350, date: "Oct 03, 2024", vendor: "SparkleClean Co", receipt: true },
  { id: "EXP-008", property: "Riverview Apt, 10B", category: "Supplies", description: "Replacement kitchen utensils set", amount: 120, date: "Oct 07, 2024", vendor: "HomeGoods Store", receipt: false },
  { id: "EXP-009", property: "Skyline Tower A, 402", category: "Electric", description: "Electricity bill - October", amount: 210, date: "Oct 10, 2024", vendor: "Metro Electric Co", receipt: true },
  { id: "EXP-010", property: "Landmark Tower, 1205", category: "Water", description: "Water utility bill", amount: 78, date: "Oct 08, 2024", vendor: "City Water Dept", receipt: true },
  { id: "EXP-011", property: "Downtown Plaza, 8A", category: "Rent to Owner", description: "Monthly rent payment to owner", amount: 3100, date: "Oct 01, 2024", vendor: "Plaza Inc", receipt: true },
  { id: "EXP-012", property: "Skyline Heights, 1502", category: "Repair", description: "AC compressor repair", amount: 650, date: "Oct 12, 2024", vendor: "CoolAir Services", receipt: true },
];

// --- Leads Pipeline ---
export const leads: Lead[] = [
  { id: "LD-001", name: "Michael Torres", email: "m.torres@email.com", phone: "+1 (555) 111-2233", interestedProperty: "Penthouse A, Landmark Tower", budget: 6500, stage: "Negotiating", source: "Website", assignedAgent: "Lisa Park", createdAt: "Oct 01, 2024", notes: "High-end client, flexible on move-in date" },
  { id: "LD-002", name: "Jessica Nguyen", email: "j.nguyen@email.com", phone: "+1 (555) 222-3344", interestedProperty: "Oakwood Apt 4B", budget: 2200, stage: "Viewing", source: "Referral", assignedAgent: "Mike Chen", createdAt: "Oct 03, 2024", notes: "Prefers furnished units, couple with no kids" },
  { id: "LD-003", name: "Brian Patel", email: "b.patel@email.com", phone: "+1 (555) 333-4455", interestedProperty: "Urban Loft, East Side", budget: 2800, stage: "Lead", source: "Facebook Ad", assignedAgent: "Tom Rivera", createdAt: "Oct 10, 2024", notes: "Just submitted inquiry form" },
  { id: "LD-004", name: "Samantha Cole", email: "s.cole@email.com", phone: "+1 (555) 444-5566", interestedProperty: "Sunset Studio", budget: 1300, stage: "Contacted", source: "Walk-in", assignedAgent: "Lisa Park", createdAt: "Oct 08, 2024", notes: "Called back, scheduling viewing" },
  { id: "LD-005", name: "Kevin O'Brien", email: "k.obrien@email.com", phone: "+1 (555) 555-6677", interestedProperty: "Cedar Suite, West End", budget: 1800, stage: "Signed", source: "Website", assignedAgent: "Mike Chen", createdAt: "Sep 20, 2024", notes: "Contract signed, move-in Nov 1" },
  { id: "LD-006", name: "Diana Morales", email: "d.morales@email.com", phone: "+1 (555) 666-7788", interestedProperty: "Riverside 2BR, The Meadows", budget: 1900, stage: "Viewing", source: "Instagram", assignedAgent: "Tom Rivera", createdAt: "Oct 05, 2024", notes: "Visited once, wants second viewing with partner" },
  { id: "LD-007", name: "Alex Yamamoto", email: "a.yamamoto@email.com", phone: "+1 (555) 777-8899", interestedProperty: "Green Valley, Villa 12", budget: 3000, stage: "Lead", source: "Google Ad", assignedAgent: "Lisa Park", createdAt: "Oct 12, 2024", notes: "Relocating from overseas, needs 3BR" },
  { id: "LD-008", name: "Rachel Foster", email: "r.foster@email.com", phone: "+1 (555) 888-9900", interestedProperty: "Maple Villa, Downtown Plaza", budget: 3200, stage: "Contacted", source: "Referral", assignedAgent: "Mike Chen", createdAt: "Oct 09, 2024", notes: "Referred by Emily Chen, looking for family unit" },
  { id: "LD-009", name: "Thomas Grant", email: "t.grant@email.com", phone: "+1 (555) 999-0011", interestedProperty: "Pine Studio, North Side", budget: 1100, stage: "Negotiating", source: "Website", assignedAgent: "Tom Rivera", createdAt: "Sep 28, 2024", notes: "Wants lower deposit, discussing terms" },
  { id: "LD-010", name: "Natalie Brooks", email: "n.brooks@email.com", phone: "+1 (555) 000-1122", interestedProperty: "Ocean Breeze, Suite 2", budget: 2200, stage: "Viewing", source: "Walk-in", assignedAgent: "Lisa Park", createdAt: "Oct 11, 2024", notes: "Interested in office space, small business owner" },
];

// --- Expense Stats ---
export const expenseStats = {
  totalExpenses: 45600,
  rentToOwner: 28000,
  utilities: 8500,
  maintenance: 5200,
  other: 3900,
};
