// src/stores/legalAid.js
import { defineStore } from 'pinia'
import api from '@/services/api' // your axios instance, baseURL should be http://127.0.0.1:8000/api

export const useLegalAidStore = defineStore('legalAid', {
  state: () => ({
    // UI / static data
    caseTypes: [
      'Criminal Law',
      'Family Law',
      'Civil Litigation',
      'Employment Law',
      'Property Law',
      'Other'
    ],

    rightsData: {
      'Criminal Law': [
        { title: 'Right to Legal Representation', content: 'You have the right to a lawyer during questioning and trial.' },
        { title: 'Right to Remain Silent', content: 'You cannot be forced to incriminate yourself.' },
      ],
      'Family Law': [
        { title: 'Right to Custody Hearing', content: 'Both parents have the right to a fair custody hearing.'},
        { title: 'Right to Maintenance', content: 'Spouses may be entitled to financial support during separation.'},
      ],
      'Employment Law': [
        { title: 'Right to Fair Wages', content: 'You must be paid at least the legal minimum wage.' },
        { title: 'Right to Safe Workplace', content: 'Employers must provide safe working conditions.' },
      ],
      'Property Law': [
        { title:'Right to own property', content: 'Anyone can own property provided it is acquired legally.'},
        { title:'Acquire property legally', content:'One must follow the legal procedures when acquiring property.'},
      ]
    },

    lawsData: {
      'Criminal Law': [
        { title: 'Understanding Criminal Charges', description: 'What to know about criminal procedures and penalties.', link: 'public/documents/The Legal Aid (General) Regulations.pdf' }
      ],
      'Family Law': [
        { title: 'Divorce Process', description: 'Learn the legal steps for ending a marriage.', link: 'public/documents/divorce_laws_booklet.pdf' }
      ],
      'Employment Law': [
        { title: 'Employee Rights', description: 'Know your rights at work and how to claim them.', link: 'public/documents/The_Employment_Act_2007.pdf' }
      ],
      'Property Law': [
        { title: 'Property Rights', description: 'Property Rights and Legal Procedures', link: 'public/documents/property_law_booklet.pdf' }
      ]
    },

    // booking state
    submitting: false,
    submitError: null,

    // admin side
    bookings: [],
    loadingBookings: false,
    bookingsError: null
  }),

  getters: {
    // returns rights for the selected case type: usage store.getRights(caseType)
    getRights: (state) => (caseType) => state.rightsData[caseType] ?? [],
    getLaws: (state) => (caseType) => state.lawsData[caseType] ?? [],
  },

  actions: {
    // Submit a booking (frontend user) — payload keys expected by backend:
    // { caseType, name, email, phone, date, case_description }
    async submitBooking(payload) {
      this.submitting = true
      this.submitError = null
      try {
        // make sure payload uses the backend key: case_description
        const body = {
          caseType: payload.caseType,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          date: payload.date ?? null,
          case_description: payload.case_description ?? payload.description ?? ''
        }

        const res = await api.post('/legalAid', body)
        this.submitting = false
        return res.data
      } catch (err) {
        this.submitting = false
        // save structured error if validation fails
        this.submitError = err.response?.data ?? { message: err.message }
        throw err
      }
    },

    // ADMIN: fetch all bookings (admin panel)
    async fetchBookings() {
      this.loadingBookings = true
      this.bookingsError = null
      try {
        const res = await api.get('/legalAid')
        this.bookings = Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
        return this.bookings
      } catch (err) {
        this.bookings = []
        this.bookingsError = err.response?.data ?? { message: err.message }
        throw err
      } finally {
        this.loadingBookings = false
      }
    },

    // ADMIN: delete a booking by id
    async deleteBooking(id) {
      try {
        await api.delete(`/legalAid/${id}`)
        this.bookings = this.bookings.filter(b => b.id !== id)
      } catch (err) {
        this.bookingsError = err.response?.data ?? { message: err.message }
        throw err
      }
    }
  },

  // optional: persist store between reloads during development
  // persist: true
})
