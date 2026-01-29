
import React from 'react';

export enum UserRole {
  STUDENT = 'Student',
  DOCTOR = 'Doctor',
  ADMIN = 'Admin'
}

export interface UserProfile {
  fullName: string;
  email: string;
  collegeName: string;
  degree: string;
  year: string;
  role: UserRole;
  phone?: string;
}

export interface NavItem {
  id: string;
  label: string;
  // Fix: Added React import to define React.ReactNode
  icon: React.ReactNode;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
  };
}

export interface Equipment {
  name: string;
  category: string;
  principle: string;
  components: string[];
  uses: string;
  safety: string;
  cost: string;
}
