-- ============================================
-- RentFlow Seed Data
-- Run this AFTER migration.sql
-- ============================================

-- Buildings
INSERT INTO buildings (id, name, address, city, floors, units, owner, service_fee, image) VALUES
('BLD-001', 'Landmark Tower', '123 Business District', 'Metropolis', 35, 120, 'LM Holdings', 5500, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'),
('BLD-002', 'Skyline Heights', '456 Downtown Ave', 'Metro City', 28, 95, 'Sky Corp', 4800, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'),
('BLD-003', 'Green Valley', '789 Park Road', 'Garden City', 12, 48, 'Green Dev', 3200, 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=400'),
('BLD-004', 'Corporate Plaza', '321 Commerce St', 'Business Bay', 20, 80, 'Plaza Inc', 6000, 'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=400'),
('BLD-005', 'The Meadows', '654 Riverside Dr', 'Riverside', 8, 32, 'Meadow LLC', 2800, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400'),
('BLD-006', 'Ocean Breeze', '987 Coastal Blvd', 'Seaside', 15, 60, 'Ocean Properties', 4500, 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400')
ON CONFLICT (id) DO NOTHING;

-- Properties
INSERT INTO properties (id, name, building, location, area, bedrooms, bathrooms, floor, status, rent_owner, rent_tenant, operating_cost, profit, image, furniture) VALUES
('RF-1001', 'Oakwood Apt 4B', 'Oakwood Heights', 'New York', 75, 2, 1, 4, 'Available', 1550, 2400, 200, 850, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400', 'Full'),
('RF-1002', 'Maple Villa', 'Downtown Plaza', 'Chicago', 95, 3, 2, 8, 'Occupied', 1900, 3100, 250, 1200, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400', 'Full'),
('RF-1003', 'Pine Studio', 'North Side', 'Los Angeles', 42, 1, 1, 3, 'Maintenance', 1050, 1200, 150, -150, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400', 'Basic'),
('RF-1004', 'Cedar Suite', 'West End', 'Austin', 68, 2, 1, 5, 'Reserved', 1450, 1850, 180, 400, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400', 'Full'),
('RF-1005', 'Urban Loft', 'East Side', 'Seattle', 88, 2, 2, 12, 'Available', 1950, 2900, 220, 950, 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400', 'Premium'),
('RF-1006', 'Sunset Studio', 'Skyline Heights', 'Metro City', 38, 1, 1, 15, 'Occupied', 900, 1400, 120, 380, 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400', 'Basic'),
('RF-1007', 'Riverside 2BR', 'The Meadows', 'Riverside', 72, 2, 1, 3, 'Occupied', 1300, 1900, 160, 440, 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400', 'Full'),
('RF-1008', 'Penthouse A', 'Landmark Tower', 'Metropolis', 150, 4, 3, 35, 'Available', 4500, 6800, 500, 1800, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', 'Premium')
ON CONFLICT (id) DO NOTHING;

-- Tenants
INSERT INTO tenants (id, name, email, phone, property, property_type, status, payment, contract_end, avatar, nationality, id_number) VALUES
('RF-1092', 'Sarah Jenkins', 'sarah.j@email.com', '+1 (555) 012-3456', 'Skyline Tower A, 402', 'Premium Studio', 'Active', 'Paid', 'Dec 15, 2024', '', 'US', 'SSN-***-4567'),
('RF-1105', 'Marcus Peterson', 'm.peterson@email.com', '+1 (555) 987-6543', 'Green Valley, Villa 12', '3 Bedroom Villa', 'Lead', 'N/A', '-', '', 'US', 'SSN-***-8901'),
('RF-0988', 'Linda Wright', 'linda.wright@email.com', '+1 (555) 234-5678', 'Riverview Apt, 10B', '2 Bedroom Apt', 'Overdue', 'Unpaid', 'Oct 30, 2024', '', 'UK', 'PP-***-2345'),
('RF-0852', 'David Thompson', 'david.t@email.com', '+1 (555) 456-7890', 'Ocean Breeze, Suite 2', 'Office Space', 'Former', 'Cleared', 'Aug 01, 2023', '', 'CA', 'SSN-***-6789'),
('RF-1120', 'Emily Chen', 'emily.chen@email.com', '+1 (555) 345-6789', 'Landmark Tower, 1205', '1 Bedroom Apt', 'Active', 'Paid', 'Mar 20, 2025', '', 'CN', 'PP-***-3456'),
('RF-1098', 'James Rodriguez', 'j.rodriguez@email.com', '+1 (555) 567-8901', 'Downtown Plaza, 8A', '2 Bedroom Apt', 'Active', 'Paid', 'Jun 30, 2025', '', 'MX', 'PP-***-7890'),
('RF-1134', 'Anna Kowalski', 'anna.k@email.com', '+1 (555) 678-9012', 'The Meadows, Unit 7', 'Studio', 'Interested', 'N/A', '-', '', 'PL', 'PP-***-0123'),
('RF-0945', 'Robert Kim', 'r.kim@email.com', '+1 (555) 789-0123', 'Skyline Heights, 1502', '3 Bedroom Apt', 'Active', 'Partial', 'Sep 15, 2025', '', 'KR', 'PP-***-4567')
ON CONFLICT (id) DO NOTHING;

-- Contracts
INSERT INTO contracts (id, tenant, property, start_date, end_date, rent_price, deposit, payment_cycle, status) VALUES
('CTR-001', 'Sarah Jenkins', 'Skyline Tower A, 402', 'Jan 01, 2024', 'Dec 15, 2024', 2400, 4800, 'Monthly', 'Active'),
('CTR-002', 'Emily Chen', 'Landmark Tower, 1205', 'Apr 01, 2024', 'Mar 20, 2025', 1800, 3600, 'Monthly', 'Active'),
('CTR-003', 'Linda Wright', 'Riverview Apt, 10B', 'Nov 01, 2023', 'Oct 30, 2024', 1500, 3000, 'Monthly', 'Ending Soon'),
('CTR-004', 'James Rodriguez', 'Downtown Plaza, 8A', 'Jul 01, 2024', 'Jun 30, 2025', 3100, 6200, 'Monthly', 'Active'),
('CTR-005', 'David Thompson', 'Ocean Breeze, Suite 2', 'Jan 01, 2023', 'Aug 01, 2023', 2200, 4400, 'Monthly', 'Expired'),
('CTR-006', 'Robert Kim', 'Skyline Heights, 1502', 'Oct 01, 2024', 'Sep 15, 2025', 2900, 5800, 'Monthly', 'Active')
ON CONFLICT (id) DO NOTHING;

-- Payments
INSERT INTO payments (id, tenant, property, amount, due_date, paid_date, status, month) VALUES
('PAY-001', 'John Doe', 'Apt 4B - Skyline Heights', 1200, 'Oct 01, 2023', 'Oct 01, 2023', 'Paid', 'October 2023'),
('PAY-002', 'Jane Smith', 'Suite 12 - Corporate Plaza', 2500, 'Oct 05, 2023', NULL, 'Pending', 'October 2023'),
('PAY-003', 'Robert Brown', 'Unit 7 - The Meadows', 950, 'Sep 28, 2023', NULL, 'Late', 'September 2023'),
('PAY-004', 'Emily Davis', 'Apt 2A - Green Valley', 1100, 'Oct 10, 2023', NULL, 'Pending', 'October 2023'),
('PAY-005', 'Sarah Jenkins', 'Skyline Tower A, 402', 2400, 'Oct 01, 2023', 'Sep 30, 2023', 'Paid', 'October 2023'),
('PAY-006', 'Emily Chen', 'Landmark Tower, 1205', 1800, 'Oct 01, 2023', 'Oct 02, 2023', 'Paid', 'October 2023'),
('PAY-007', 'James Rodriguez', 'Downtown Plaza, 8A', 3100, 'Oct 01, 2023', NULL, 'Pending', 'October 2023'),
('PAY-008', 'Robert Kim', 'Skyline Heights, 1502', 2900, 'Oct 01, 2023', 'Oct 05, 2023', 'Partial', 'October 2023')
ON CONFLICT (id) DO NOTHING;

-- Maintenance
INSERT INTO maintenance (id, property, type, description, report_date, assignee, cost, status, priority) VALUES
('MT-001', 'Grand Plaza #102', 'Plumbing', 'Water Leak - Kitchen sink pipe leaking', 'Oct 12, 2023', 'Mike Torres', 350, 'Open', 'High'),
('MT-002', 'Pacific Loft #4C', 'Electrical', 'Faulty Light Fixture in living room', 'Oct 12, 2023', 'John Davis', 120, 'In Progress', 'Medium'),
('MT-003', 'Skyline Tower A, 402', 'HVAC', 'AC unit not cooling properly', 'Oct 10, 2023', 'Tech Solutions', 800, 'Open', 'High'),
('MT-004', 'Green Valley, Villa 12', 'Lock', 'Front door lock jammed', 'Oct 09, 2023', 'SecureLock Co', 200, 'Resolved', 'Critical'),
('MT-005', 'Downtown Plaza, 8A', 'Appliance', 'Washing machine not draining', 'Oct 08, 2023', 'ApplianceFix', 250, 'In Progress', 'Medium'),
('MT-006', 'Landmark Tower, 1205', 'Internet', 'WiFi router needs replacement', 'Oct 07, 2023', 'NetTech', 100, 'Closed', 'Low'),
('MT-007', 'The Meadows, Unit 7', 'Furniture', 'Broken wardrobe door hinge', 'Oct 06, 2023', 'FurniFix', 80, 'Resolved', 'Low'),
('MT-008', 'Ocean Breeze, Suite 2', 'Plumbing', 'Bathroom faucet dripping', 'Oct 05, 2023', 'Mike Torres', 150, 'Closed', 'Medium')
ON CONFLICT (id) DO NOTHING;

-- Expenses
INSERT INTO expenses (id, property, category, description, amount, date, vendor, receipt) VALUES
('EXP-001', 'Skyline Tower A, 402', 'Rent to Owner', 'Monthly rent payment to owner', 2400, 'Oct 01, 2024', 'LM Holdings', true),
('EXP-002', 'Landmark Tower, 1205', 'Rent to Owner', 'Monthly rent payment to owner', 1800, 'Oct 01, 2024', 'LM Holdings', true),
('EXP-003', 'Downtown Plaza, 8A', 'Electric', 'Electricity bill - October', 185, 'Oct 10, 2024', 'Metro Electric Co', true),
('EXP-004', 'Green Valley, Villa 12', 'Water', 'Water utility bill', 95, 'Oct 08, 2024', 'City Water Dept', true),
('EXP-005', 'Skyline Heights, 1502', 'Internet', 'Monthly fiber internet service', 65, 'Oct 05, 2024', 'NetTech ISP', true),
('EXP-006', 'The Meadows, Unit 7', 'Repair', 'Wardrobe door hinge replacement', 80, 'Oct 06, 2024', 'FurniFix', true),
('EXP-007', 'Ocean Breeze, Suite 2', 'Cleaning', 'Deep cleaning after tenant checkout', 350, 'Oct 03, 2024', 'SparkleClean Co', true),
('EXP-008', 'Riverview Apt, 10B', 'Supplies', 'Replacement kitchen utensils set', 120, 'Oct 07, 2024', 'HomeGoods Store', false),
('EXP-009', 'Skyline Tower A, 402', 'Electric', 'Electricity bill - October', 210, 'Oct 10, 2024', 'Metro Electric Co', true),
('EXP-010', 'Landmark Tower, 1205', 'Water', 'Water utility bill', 78, 'Oct 08, 2024', 'City Water Dept', true),
('EXP-011', 'Downtown Plaza, 8A', 'Rent to Owner', 'Monthly rent payment to owner', 3100, 'Oct 01, 2024', 'Plaza Inc', true),
('EXP-012', 'Skyline Heights, 1502', 'Repair', 'AC compressor repair', 650, 'Oct 12, 2024', 'CoolAir Services', true)
ON CONFLICT (id) DO NOTHING;

-- Bookings
INSERT INTO bookings (id, tenant, property, agent, date_time, notes, status) VALUES
('BK-001', 'Sarah Jenkins', 'Skyline Tower A, 402', 'Mike Chen', '2024-10-20T10:00:00', 'Interested in renewing lease', 'Scheduled'),
('BK-002', 'Marcus Peterson', 'Green Valley, Villa 12', 'Lisa Park', '2024-10-18T14:30:00', 'First viewing, 3BR preferred', 'Completed'),
('BK-003', 'Anna Kowalski', 'The Meadows, Unit 7', 'Mike Chen', '2024-10-19T11:00:00', 'Budget $1200/month, studio ok', 'Scheduled'),
('BK-004', 'David Thompson', 'Ocean Breeze, Suite 2', 'Lisa Park', '2024-10-15T09:00:00', 'Wanted to see office space options', 'No Show'),
('BK-005', 'Emily Chen', 'Landmark Tower, 1205', 'Tom Rivera', '2024-10-16T16:00:00', 'Check-in inspection', 'Completed'),
('BK-006', 'James Rodriguez', 'Downtown Plaza, 8A', 'Tom Rivera', '2024-10-17T13:00:00', 'Maintenance follow-up visit', 'Cancelled'),
('BK-007', 'Robert Kim', 'Skyline Heights, 1502', 'Mike Chen', '2024-10-21T10:30:00', 'Discussing lease extension terms', 'Scheduled'),
('BK-008', 'Linda Wright', 'Riverview Apt, 10B', 'Lisa Park', '2024-10-14T15:00:00', 'Late payment discussion', 'Completed')
ON CONFLICT (id) DO NOTHING;

-- Leads
INSERT INTO leads (id, name, email, phone, interested_property, budget, stage, source, assigned_agent, notes) VALUES
('LD-001', 'Michael Torres', 'm.torres@email.com', '+1 (555) 111-2233', 'Penthouse A, Landmark Tower', 6500, 'Negotiating', 'Website', 'Lisa Park', 'High-end client, flexible on move-in date'),
('LD-002', 'Jessica Nguyen', 'j.nguyen@email.com', '+1 (555) 222-3344', 'Oakwood Apt 4B', 2200, 'Viewing', 'Referral', 'Mike Chen', 'Prefers furnished units, couple with no kids'),
('LD-003', 'Brian Patel', 'b.patel@email.com', '+1 (555) 333-4455', 'Urban Loft, East Side', 2800, 'Lead', 'Facebook Ad', 'Tom Rivera', 'Just submitted inquiry form'),
('LD-004', 'Samantha Cole', 's.cole@email.com', '+1 (555) 444-5566', 'Sunset Studio', 1300, 'Contacted', 'Walk-in', 'Lisa Park', 'Called back, scheduling viewing'),
('LD-005', 'Kevin O''Brien', 'k.obrien@email.com', '+1 (555) 555-6677', 'Cedar Suite, West End', 1800, 'Signed', 'Website', 'Mike Chen', 'Contract signed, move-in Nov 1'),
('LD-006', 'Diana Morales', 'd.morales@email.com', '+1 (555) 666-7788', 'Riverside 2BR, The Meadows', 1900, 'Viewing', 'Instagram', 'Tom Rivera', 'Visited once, wants second viewing with partner'),
('LD-007', 'Alex Yamamoto', 'a.yamamoto@email.com', '+1 (555) 777-8899', 'Green Valley, Villa 12', 3000, 'Lead', 'Google Ad', 'Lisa Park', 'Relocating from overseas, needs 3BR'),
('LD-008', 'Rachel Foster', 'r.foster@email.com', '+1 (555) 888-9900', 'Maple Villa, Downtown Plaza', 3200, 'Contacted', 'Referral', 'Mike Chen', 'Referred by Emily Chen, looking for family unit'),
('LD-009', 'Thomas Grant', 't.grant@email.com', '+1 (555) 999-0011', 'Pine Studio, North Side', 1100, 'Negotiating', 'Website', 'Tom Rivera', 'Wants lower deposit, discussing terms'),
('LD-010', 'Natalie Brooks', 'n.brooks@email.com', '+1 (555) 000-1122', 'Ocean Breeze, Suite 2', 2200, 'Viewing', 'Walk-in', 'Lisa Park', 'Interested in office space, small business owner')
ON CONFLICT (id) DO NOTHING;
