const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize('learning-sequelize', 'root', '', {
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    }
});

// sequelize.sync({ alter: true });
// sequelize.drop();
// sequelize.drop({ match: /_test$/ });

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 6]
        }
    },
    password: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21
    },
    wittCodeRocks: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true,
    timestamps: false
});

User.sync({ alter: true })
    .then(() => {
        // return User.findAll({
        //     attributes: [['username', 'myName'], ['password', 'pwd']]
        // });
        // return User.findAll({
        //     attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'howOld']]
        // })
        // return User.findAll({
        //     attributes: {
        //         exclude: ['password']
        //     }
        // })
        // return User.findAll({
        //     // attributes: ['age', 'username'],
        //     // // where: { age: 21, username: 'Yeasin' }
        //     // // limit: 5
        //     // order: [['age', 'ASC']]
        //     // attributes: [
        //     //     'username',
        //     //     [sequelize.fn('SUM', sequelize.col('age')), 'sum_age']
        //     // ],
        //     // group: 'username'
        //     // where: {
        //         // username: "Yeasin",
        //         // age: 21

        //         // age: {
        //         //     [Op.or]: {
        //         //         [Op.lt]: 45,
        //         //         [Op.eq]: null
        //         //     }
        //         // }
        //     // }
        //     where: 
        //         sequelize.where(sequelize.fn('char_length', sequelize.col('username')), 6)

        // });
        // return User.update(
        //     {username: 'Shuvo'},
        //     {
        //         where: { age: 75 }
        //     }
        // );
        // return User.destroy({
        //     // where: {
        //     //     username: 'Shuvo'
        //     // }
        //     truncate: true
        // })
        // return User.max('age');
        // return User.bulkCreate([
        //     {
        //         username: "Yeasin",
        //         age: 33
        //     },
        //     {
        //         username: "Forkan",
        //         age: 25
        //     },
        //     {
        //         username: "Emon",
        //         age: 78
        //     },
        // ])
        // return User.max('age');
        return User.sum('age', {
            where: {
                age: 21
            }
        });
    })
    .then((data) => {
        // data.forEach(element => {
        //     console.log(element.toJSON());
        // });
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });



// User.sync({ alter: true })
//     .then(() => {
//         User.build("Yeasin", "123", "22", true);
//     })
//     .catch(() => {
//         console.log("Not synced database......");
//     });

// User.sync({ alter: true }).then(() => {
//     console.log("Users table is created on Sequelize Learning Database!!!");
// }).catch((error) => {
//     console.log("Error", error);
// });

// User.drop();

// console.log(sequelize.models.user);

// const dbConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connected here!!!');
//     } catch (error) {
//         console.log("error", error);
//     }
// }

// dbConnection();

// sequelize.authenticate()
//     .then(() => {
//         console.log('Database connected!!!');
//     })
//     .catch(err => {
//         console.log("Error", err);
//     });

// console.log("Another task is herer!!!");