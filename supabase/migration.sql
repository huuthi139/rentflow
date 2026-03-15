-- ============================================
-- RentFlow Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Buildings
CREATE TABLE IF NOT EXISTS buildings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  floors INTEGER NOT NULL DEFAULT 1,
  units INTEGER NOT NULL DEFAULT 0,
  owner TEXT NOT NULL DEFAULT '',
  service_fee NUMERIC NOT NULL DEFAULT 0,
  image TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Properties
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  building TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  area NUMERIC NOT NULL DEFAULT 0,
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms INTEGER NOT NULL DEFAULT 0,
  floor INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available','Occupied','Reserved','Maintenance','Inactive')),
  rent_owner NUMERIC NOT NULL DEFAULT 0,
  rent_tenant NUMERIC NOT NULL DEFAULT 0,
  operating_cost NUMERIC NOT NULL DEFAULT 0,
  profit NUMERIC NOT NULL DEFAULT 0,
  image TEXT NOT NULL DEFAULT '',
  furniture TEXT NOT NULL DEFAULT 'Basic',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tenants
CREATE TABLE IF NOT EXISTS tenants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  property TEXT NOT NULL DEFAULT '',
  property_type TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Lead' CHECK (status IN ('Active','Lead','Overdue','Former','Interested','Viewing')),
  payment TEXT NOT NULL DEFAULT 'N/A' CHECK (payment IN ('Paid','Unpaid','Cleared','N/A','Partial')),
  contract_end TEXT NOT NULL DEFAULT '-',
  avatar TEXT NOT NULL DEFAULT '',
  nationality TEXT NOT NULL DEFAULT '',
  id_number TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contracts
CREATE TABLE IF NOT EXISTS contracts (
  id TEXT PRIMARY KEY,
  tenant TEXT NOT NULL DEFAULT '',
  property TEXT NOT NULL DEFAULT '',
  start_date TEXT NOT NULL DEFAULT '',
  end_date TEXT NOT NULL DEFAULT '',
  rent_price NUMERIC NOT NULL DEFAULT 0,
  deposit NUMERIC NOT NULL DEFAULT 0,
  payment_cycle TEXT NOT NULL DEFAULT 'Monthly',
  status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active','Ending Soon','Expired','Terminated')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  tenant TEXT NOT NULL DEFAULT '',
  property TEXT NOT NULL DEFAULT '',
  amount NUMERIC NOT NULL DEFAULT 0,
  due_date TEXT NOT NULL DEFAULT '',
  paid_date TEXT,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Paid','Pending','Late','Partial')),
  month TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Maintenance
CREATE TABLE IF NOT EXISTS maintenance (
  id TEXT PRIMARY KEY,
  property TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  report_date TEXT NOT NULL DEFAULT '',
  assignee TEXT NOT NULL DEFAULT '',
  cost NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open','In Progress','Resolved','Closed')),
  priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Critical','High','Medium','Low')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Expenses
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  property TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  amount NUMERIC NOT NULL DEFAULT 0,
  date TEXT NOT NULL DEFAULT '',
  vendor TEXT NOT NULL DEFAULT '',
  receipt BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  tenant TEXT NOT NULL DEFAULT '',
  property TEXT NOT NULL DEFAULT '',
  agent TEXT NOT NULL DEFAULT '',
  date_time TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled','Completed','Cancelled','No Show')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  interested_property TEXT NOT NULL DEFAULT '',
  budget NUMERIC NOT NULL DEFAULT 0,
  stage TEXT NOT NULL DEFAULT 'Lead' CHECK (stage IN ('Lead','Contacted','Viewing','Negotiating','Signed')),
  source TEXT NOT NULL DEFAULT '',
  assigned_agent TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY['buildings','properties','tenants','contracts','payments','maintenance','expenses','bookings','leads'])
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON %I', t);
    EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at()', t);
  END LOOP;
END;
$$;

-- Enable Row Level Security (RLS)
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users (adjust later for roles)
CREATE POLICY "Allow all for authenticated" ON buildings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON properties FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON tenants FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON contracts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON payments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON maintenance FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON expenses FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON bookings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for authenticated" ON leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Also allow anon access for now (before auth is fully implemented)
CREATE POLICY "Allow all for anon" ON buildings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON properties FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON tenants FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON contracts FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON payments FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON maintenance FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON expenses FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON bookings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON leads FOR ALL TO anon USING (true) WITH CHECK (true);
