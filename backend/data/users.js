import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'adin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }, 

    {
        name: 'John Doe',
        email: 'adddmin@example.com',
        password: bcrypt.hashSync('123456', 10),
        
    },   
    {
        name: 'Fitsum Legesse',
        email: 'admggin@example.com',
        password: bcrypt.hashSync('123456', 10),
        
    }

]

export default users