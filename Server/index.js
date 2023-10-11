const server = require('./src/app');
const sequelize = require('./src/db');

const PORT = 3001;

sequelize.sync({force: true}).then(()=>{
    server.listen(PORT, ()=>{
        console.log('Server listening on port:'+PORT);
    });
});