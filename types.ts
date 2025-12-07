import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface FuzzingResult {
  mutation: string;
  reaction: string;
  status: 'danger' | 'warning' | 'success' | 'neutral';
}

export interface DosStat {
  parameter: string;
  value: string;
}