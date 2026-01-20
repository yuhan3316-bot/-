
export type TabType = 'schedule' | 'bookings' | 'expense' | 'planning';

// Added Member interface to resolve "has no exported member 'Member'" errors
export interface Member {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface TravelDate {
  date: string;
  label: string;
  weather?: 'sunny' | 'rainy' | 'cloudy';
  temp?: number;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  category: 'sightseeing' | 'food' | 'transport' | 'accommodation';
  note?: string;
  mapUrl?: string;
}

export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'ticket';
  title: string;
  price: number;
  currency: string;
  details: {
    from?: string;
    to?: string;
    flightNo?: string;
    time?: string;
    seat?: string;
    gate?: string;
    address?: string;
    checkIn?: string;
    checkOut?: string;
    note?: string;
  };
}

export interface Expense {
  id: string;
  amount: number;
  currency: 'JPY' | 'TWD';
  category: string;
  payer: string;
  paymentMethod: string;
  note: string;
  date: string;
  // Added splitWith to resolve property errors in constants.tsx
  splitWith?: string[];
}

export interface PlanningTask {
  id: string;
  title: string;
  type: 'todo' | 'packing' | 'shopping';
  completed: boolean;
  // Added assignedTo to resolve property errors in constants.tsx
  assignedTo?: string;
}
