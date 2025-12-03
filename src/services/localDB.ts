interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    bloodGroup: string;
    allergies: string[];
    conditions?: string;
    emergencyContact?: {
        name: string;
        relationship: string;
        phone: string;
    };
}

interface Doctor {
    id: string;
    name: string;
    department: string;
    availability: string;
    appointmentsToday: number;
    specialization: string;
    email?: string;
}

interface Appointment {
    id: string;
    patientId: string;
    doctorId: string;
    department: string;
    date: string;
    time: string;
    status: string;
    reason: string;
    createdAt?: string;
}

interface Visit {
    id: string;
    patientId: string;
    doctorId: string;
    department: string;
    date: string;
    time: string;
    status: string;
    reason: string;
    diagnosis?: string;
    symptoms?: string;
    notes?: string;
    labRequests?: string[];
    prescriptions?: any[];
}

interface Database {
    patients: Patient[];
    doctors: Doctor[];
    appointments: Appointment[];
    visits: Visit[];
}

// Initial mock data
const initialData: Database = {
    patients: [
        {
            id: 'p1',
            name: 'John Doe',
            age: 32,
            gender: 'Male',
            bloodGroup: 'B+',
            allergies: ['Penicillin'],
            conditions: 'None',
            emergencyContact: {
                name: 'Jane Doe',
                relationship: 'Wife',
                phone: '+91 91234 56789',
            },
        },
    ],
    doctors: [
        {
            id: 'd1',
            name: 'Dr. Smith',
            department: 'Cardiology',
            availability: 'Online',
            appointmentsToday: 5,
            specialization: 'Cardiology',
        },
        {
            id: 'd2',
            name: 'Dr. Johnson',
            department: 'Pediatrics',
            availability: 'Offline',
            appointmentsToday: 2,
            specialization: 'Pediatrics',
        },
        {
            id: 'd3',
            name: 'Dr. Davis',
            department: 'Orthopedics',
            availability: 'Online',
            appointmentsToday: 4,
            specialization: 'Sports Medicine',
        },
        {
            id: 'd4',
            name: 'Dr. Wilson',
            department: 'Internal Medicine',
            availability: 'Away',
            appointmentsToday: 1,
            specialization: 'Internal Medicine',
        },
        {
            id: 'd5',
            name: 'Dr. Patel',
            department: 'Neurology',
            availability: 'Online',
            appointmentsToday: 3,
            specialization: 'Neurology',
        },
    ],
    appointments: [
        {
            id: 'a1',
            patientId: 'p1',
            doctorId: 'd3',
            department: 'Orthopedics',
            date: '2025-12-12',
            time: '09:45 AM',
            status: 'Upcoming',
            reason: 'Knee pain follow-up',
            createdAt: new Date().toISOString(),
        },
    ],
    visits: [
        {
            id: 'v1',
            patientId: 'p1',
            doctorId: 'd1',
            department: 'Cardiology',
            date: '2025-11-21',
            time: '10:30 AM',
            status: 'Completed',
            reason: 'Chest pain',
            diagnosis: 'Gastritis',
            symptoms: 'Mild discomfort and pressure',
            notes: 'Follow up if pain increases.',
            labRequests: ['CBC', 'Troponin', 'ECG'],
            prescriptions: [
                {
                    id: 'pr1',
                    name: 'Pantoprazole',
                    dose: '40mg',
                    frequency: '1/day',
                    duration: '7 days',
                },
            ],
        },
        {
            id: 'v2',
            patientId: 'p1',
            doctorId: 'd5',
            department: 'Neurology',
            date: '2025-10-18',
            time: '11:00 AM',
            status: 'Completed',
            reason: 'Migraine consultation',
            diagnosis: 'Tension headache',
            symptoms: 'Intermittent throbbing pain',
            notes: 'Prescribed preventive medication.',
            prescriptions: [
                {
                    id: 'pr2',
                    name: 'Propranolol',
                    dose: '40mg',
                    frequency: '2/day',
                    duration: '30 days',
                },
            ],
        },
        {
            id: 'v3',
            patientId: 'p1',
            doctorId: 'd2',
            department: 'Pediatrics',
            date: '2025-09-15',
            time: '2:00 PM',
            status: 'Completed',
            reason: 'Routine physical exam',
            diagnosis: 'Healthy',
            notes: 'All vitals normal. Recommended annual follow-up.',
        },
    ],
};

// Helper functions
const getDB = (): Database => {
    if (typeof window === 'undefined') return initialData;

    const stored = localStorage.getItem('hospitalDB');
    if (!stored) {
        // Initialize DB
        localStorage.setItem('hospitalDB', JSON.stringify(initialData));
        return initialData;
    }

    return JSON.parse(stored);
};

const saveDB = (db: Database): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('hospitalDB', JSON.stringify(db));
    }
};

// Public API
export const LocalDB = {
    // Get all data
    getPatients: (): Patient[] => getDB().patients,
    getDoctors: (): Doctor[] => getDB().doctors,
    getAppointments: (): Appointment[] => getDB().appointments,
    getVisits: (): Visit[] => getDB().visits,

    // Get specific items
    getPatient: (id: string): Patient | undefined =>
        getDB().patients.find(p => p.id === id),

    getDoctor: (id: string): Doctor | undefined =>
        getDB().doctors.find(d => d.id === id),

    getAppointment: (id: string): Appointment | undefined =>
        getDB().appointments.find(a => a.id === id),

    getVisit: (id: string): Visit | undefined =>
        getDB().visits.find(v => v.id === id),

    // Get by patient
    getAppointmentsByPatient: (patientId: string): Appointment[] =>
        getDB().appointments.filter(a => a.patientId === patientId),

    getVisitsByPatient: (patientId: string): Visit[] =>
        getDB().visits.filter(v => v.patientId === patientId),

    getVisitsByDoctor: (doctorId: string): Visit[] =>
        getDB().visits.filter(v => v.doctorId === doctorId),

    getDoctorByName: (name: string): Doctor | undefined =>
        getDB().doctors.find(d => d.name === name),

    // Add/update operations
    addAppointment: (appointment: Omit<Appointment, 'id'>): void => {
        const db = getDB();
        const newAppointment: Appointment = {
            ...appointment,
            id: `a${Date.now()}`,
        };
        db.appointments.push(newAppointment);
        saveDB(db);
    },

    cancelAppointment: (id: string): void => {
        const db = getDB();
        db.appointments = db.appointments.filter(a => a.id !== id);
        saveDB(db);
    },

    updateVisit: (id: string, updates: Partial<Visit>): void => {
        const db = getDB();
        const visitIndex = db.visits.findIndex(v => v.id === id);
        if (visitIndex !== -1) {
            db.visits[visitIndex] = { ...db.visits[visitIndex], ...updates };
            saveDB(db);
        }
    },

    updateVisitStatus: (id: string, newStatus: string): void => {
        const db = getDB();
        const visitIndex = db.visits.findIndex(v => v.id === id);
        if (visitIndex !== -1) {
            db.visits[visitIndex].status = newStatus;
            saveDB(db);
        }
    },

    convertAppointmentToVisit: (appointmentId: string): void => {
        const db = getDB();
        const appointmentIndex = db.appointments.findIndex(a => a.id === appointmentId);
        if (appointmentIndex !== -1) {
            const appointment = db.appointments[appointmentIndex];

            // Create new visit
            const newVisit: Visit = {
                id: `v${Date.now()}`,
                patientId: appointment.patientId,
                doctorId: appointment.doctorId,
                department: appointment.department,
                date: appointment.date || new Date().toISOString().split('T')[0],
                time: appointment.time,
                status: 'In-Progress',
                reason: appointment.reason,
                diagnosis: '',
                symptoms: '',
                notes: '',
                labRequests: [],
                prescriptions: [],
            };

            db.visits.push(newVisit);

            // Remove appointment
            db.appointments.splice(appointmentIndex, 1);

            saveDB(db);
        }
    },

    // Utility functions
    getAvailableDoctorsByDepartment: (department: string): Doctor[] =>
        getDB().doctors.filter(d =>
            d.availability === 'Online' &&
            d.department === department &&
            d.appointmentsToday < 7
        ),

    getDepartments: (): string[] =>
        [...new Set(getDB().doctors.map(d => d.department))],

    // Reset DB (for development)
    resetDB: (): void => {
        localStorage.setItem('hospitalDB', JSON.stringify(initialData));
    },
};
