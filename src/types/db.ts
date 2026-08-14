// src/types/db.ts

// 1. Define what a User document looks like in Firestore
export interface UserProfile {
  id?: string;
  displayName: string;
  email: string;
  createdAt: Date;
  role: "admin" | "developer" | "designer";
}

// 2. Define what a Task or Todo document looks like
export interface Task {
  id?: string;
  title: string;
  completed: boolean;
  assignedToUserId: string;
}