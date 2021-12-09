import bcrypt from 'bcrypt';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10), 
        isAdmin: true
    },
    {
        name: 'John Deo',
        email: 'John@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Jane Deo',
        email: 'Jane@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
]

export default users