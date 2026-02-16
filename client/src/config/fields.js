export const userFields = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        placeholder: 'Enter first name'
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        placeholder: 'Enter last name'
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'Enter email address',
        validation: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? null : 'Invalid email format';
        }
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: 'Enter phone number',
        validation: (value) => {
            const phoneRegex = /^\d{10}$/; // Simple 10 digit validation
            return phoneRegex.test(value) ? null : 'Phone number must be 10 digits';
        }
    }
];
