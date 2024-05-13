const router = require('./routes/admins.js'); 

// Test route paths
expect(router.get('/register')).to.be.undefined; // Should not be a GET route
expect(router.post('/register')).to.be.a('function'); // Should be a POST route
expect(router.post('/login')).to.equal(login); // Should call the login controller

console.log('Admin routes appear to be defined correctly');
