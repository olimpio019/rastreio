export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tracking {
  id: string;
  code: string;
  status: string;
  recipient: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  events: TrackingEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface TrackingEvent {
  id: string;
  status: string;
  location: string;
  description: string;
  trackingId: string;
  createdAt: string;
}

export interface TrackingSummary {
  total: number;
  byStatus: {
    [key: string]: number;
  };
  recent: Tracking[];
} 