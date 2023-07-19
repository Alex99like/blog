import { Injectable } from "@angular/core";

@Injectable()
export class PersistanceService {
  set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch(e) {
      console.error('Error saving to localStorage')
    }
  }

  get<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : null
    } catch(e) {
      console.log('Error getting data from localStorage', e)
      return null
    }
  }
}
