import{ ref, computed}from  "vue"
import { defineStore } from "pinia"

export const useLegalAidStore = defineStore('legalAid', {
  state: () => ({
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
        { link:'public/documents/The Legal Aid (General) Regulations.pdf'}                                                                                    
      ],
      'Family Law': [
        { title: 'Right to Custody Hearing', content: 'Both parents have the right to a fair custody hearing.' },
        { title: 'Right to Maintenance', content: 'Spouses may be entitled to financial support during separation.' },
        { link:'public/documents/divorce_laws_booklet.pdf'}
      ],
      'Employment Law': [
        { title: 'Right to Fair Wages', content: 'You must be paid at least the legal minimum wage.' },
        { title: 'Right to Safe Workplace', content: 'Employers must provide safe working conditions.' },
        { link:'public/documents/The_Employment_Act_2007.pdf'}
      ],
      'Property Law': [
        { title:'Right to own property', content: 'Anyone can own property provided it is acquired legally.'},
        { title:'Acquire property legally', content:'One must follow the legal procedures when acquiring property.'},
        { link:'public/documents/property_law_booklet.pdf'}
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
        { title: 'Property Rights', description:'Property Rights and Legal Procedures', link: 'public/documents/property_law_booklet.pdf'} 
      ]
    },

    form: {
      caseType: '',
      name: '',
      email: '',
      phone: '',
      date: '',
      description: ''
    }
  }),

  //  instead of "computed", use "getters"
  getters: {
    filteredRights: (state) => state.rightsData,
    filteredLaws: (state) => state.lawsData
  },

//   //  instead of "computed", use "getters"
//   setters: {
//     setRights: (state,data) => state.rightsData = data,
//     setLaws: (state,data) => state.lawsData = data,
//   },

  //  instead of "methods", use "actions"
  actions: {
    submitBooking() {
      console.log('Booking Request:', this.form)
      alert('Your booking request has been submitted. We will contact you soon.')
      this.form = { caseType: '', name: '', email: '', phone: '', date: '', description: '' }
    }
  }
})
