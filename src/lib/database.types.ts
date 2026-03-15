export type Database = {
  public: {
    Tables: {
      buildings: {
        Row: {
          id: string;
          name: string;
          address: string;
          city: string;
          floors: number;
          units: number;
          owner: string;
          service_fee: number;
          image: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          address?: string;
          city?: string;
          floors?: number;
          units?: number;
          owner?: string;
          service_fee?: number;
          image?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          city?: string;
          floors?: number;
          units?: number;
          owner?: string;
          service_fee?: number;
          image?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          name: string;
          building: string;
          location: string;
          area: number;
          bedrooms: number;
          bathrooms: number;
          floor: number;
          status: string;
          rent_owner: number;
          rent_tenant: number;
          operating_cost: number;
          profit: number;
          image: string;
          furniture: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          building?: string;
          location?: string;
          area?: number;
          bedrooms?: number;
          bathrooms?: number;
          floor?: number;
          status?: string;
          rent_owner?: number;
          rent_tenant?: number;
          operating_cost?: number;
          profit?: number;
          image?: string;
          furniture?: string;
        };
        Update: {
          id?: string;
          name?: string;
          building?: string;
          location?: string;
          area?: number;
          bedrooms?: number;
          bathrooms?: number;
          floor?: number;
          status?: string;
          rent_owner?: number;
          rent_tenant?: number;
          operating_cost?: number;
          profit?: number;
          image?: string;
          furniture?: string;
        };
      };
      tenants: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          property: string;
          property_type: string;
          status: string;
          payment: string;
          contract_end: string;
          avatar: string;
          nationality: string;
          id_number: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email?: string;
          phone?: string;
          property?: string;
          property_type?: string;
          status?: string;
          payment?: string;
          contract_end?: string;
          avatar?: string;
          nationality?: string;
          id_number?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          property?: string;
          property_type?: string;
          status?: string;
          payment?: string;
          contract_end?: string;
          avatar?: string;
          nationality?: string;
          id_number?: string;
        };
      };
      contracts: {
        Row: {
          id: string;
          tenant: string;
          property: string;
          start_date: string;
          end_date: string;
          rent_price: number;
          deposit: number;
          payment_cycle: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          tenant?: string;
          property?: string;
          start_date?: string;
          end_date?: string;
          rent_price?: number;
          deposit?: number;
          payment_cycle?: string;
          status?: string;
        };
        Update: {
          id?: string;
          tenant?: string;
          property?: string;
          start_date?: string;
          end_date?: string;
          rent_price?: number;
          deposit?: number;
          payment_cycle?: string;
          status?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          tenant: string;
          property: string;
          amount: number;
          due_date: string;
          paid_date: string | null;
          status: string;
          month: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          tenant?: string;
          property?: string;
          amount?: number;
          due_date?: string;
          paid_date?: string | null;
          status?: string;
          month?: string;
        };
        Update: {
          id?: string;
          tenant?: string;
          property?: string;
          amount?: number;
          due_date?: string;
          paid_date?: string | null;
          status?: string;
          month?: string;
        };
      };
      maintenance: {
        Row: {
          id: string;
          property: string;
          type: string;
          description: string;
          report_date: string;
          assignee: string;
          cost: number;
          status: string;
          priority: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          property?: string;
          type?: string;
          description?: string;
          report_date?: string;
          assignee?: string;
          cost?: number;
          status?: string;
          priority?: string;
        };
        Update: {
          id?: string;
          property?: string;
          type?: string;
          description?: string;
          report_date?: string;
          assignee?: string;
          cost?: number;
          status?: string;
          priority?: string;
        };
      };
      expenses: {
        Row: {
          id: string;
          property: string;
          category: string;
          description: string;
          amount: number;
          date: string;
          vendor: string;
          receipt: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          property?: string;
          category?: string;
          description?: string;
          amount?: number;
          date?: string;
          vendor?: string;
          receipt?: boolean;
        };
        Update: {
          id?: string;
          property?: string;
          category?: string;
          description?: string;
          amount?: number;
          date?: string;
          vendor?: string;
          receipt?: boolean;
        };
      };
      bookings: {
        Row: {
          id: string;
          tenant: string;
          property: string;
          agent: string;
          date_time: string;
          notes: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          tenant?: string;
          property?: string;
          agent?: string;
          date_time?: string;
          notes?: string;
          status?: string;
        };
        Update: {
          id?: string;
          tenant?: string;
          property?: string;
          agent?: string;
          date_time?: string;
          notes?: string;
          status?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          interested_property: string;
          budget: number;
          stage: string;
          source: string;
          assigned_agent: string;
          notes: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email?: string;
          phone?: string;
          interested_property?: string;
          budget?: number;
          stage?: string;
          source?: string;
          assigned_agent?: string;
          notes?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          interested_property?: string;
          budget?: number;
          stage?: string;
          source?: string;
          assigned_agent?: string;
          notes?: string;
        };
      };
    };
  };
};
