const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;
const bcrypt = require('bcrypt');
const zlib = require('zlib');

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
        },
        // get() {
        //     const rawValue = this.getDataValue('username');
        //     return rawValue.toUpperCase();
        // }
        // set() {

        // }
    },
    password: {
        type: DataTypes.STRING,
        // set(value) {
        //     const salt = bcrypt.genSaltSync(12);
        //     const hash = bcrypt.hashSync(value, salt);
        //     this.setDataValue('password', hash); 
        // }
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21,
        // validate: {
        //     // isOldEnough(value) {
        //     //     if(value < 21) {
        //     //         throw new Error("Too young!!!");
        //     //     }
        //     // }
        //     // isNumeric: {
        //     //     msg: "You must enter a number of age!"
        //     // }
        //     isNumeric: true
        // }
    },
    wittCodeRocks: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    mobile_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING,
        // set(value) {
        //     const compressed = zlib.deflateSync(value).toString('base64');
        //     this.setDataValue('description', compressed);
        // },
        // get() {
        //     const value = this.getDataValue('description');
        //     const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
        //     return uncompressed.toString();
        // }
    },
    aboutUser: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.username} ${this.description}`;
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        validate: {
            myEmailValidator(value) {
                if (value === null) {
                    throw new Error("Please enter an email!!!");
                }
            }
            // isEmail: true
            // isIn: {
            //     args: [['yeasin@gmail.com', 'arafat@gamil.com']],
            //     msg: "The provided email must be one of the following!!!"
            // }
        }
    }
}, {
    freezeTableName: true,
    timestamps: true,
    validate: {
        usernamePassMatch() {
            if (this.username === this.password) {
                throw new Error("Password cat not be your username!")
            }
            else {
                console.log("Yeasin");
            }
        }
    },
    paranoid: true,
    deletedAt: 'timeDestroyed'
});

function myFunction () {
    console.log("RUNNING SQL STATEMENT!");
}

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
        // return User.sum('age', {
        //     where: {
        //         age: 21
        //     }
        // });
        // return User.findAll({
        //     where: {
        //         age: 25
        //     },
        //     raw: true
        // });
        // return User.findOne({
        //     where: {
        //         age: {
        //             [Op.or]: {
        //                 [Op.lt]: 27,
        //                 [Op.eq]: null
        //             }
        //         }
        //     }
        // });
        // return User.findOrCreate({
        //     where: { username: "Rihab" },
        //     defaults: {
        //         age: 56
        //     }
        // })
        // return User.findAndCountAll({
        //     where: { username: "Yeasin" },
        //     raw: true
        // })
        // return User.findOne();
        // return User.create({
        //     username: "Hridoy",
        //     password: "Hridoy",
        //     age: 23
        // });
        // return User.findOne({where: {username: "Hridoy"}})
        // const user = User.build({email: 'tom'});
        // return user.validate();
        // return sequelize.query(`UPDATE user SET age = 22 WHERE username = "Yeasin"`);
        // return sequelize.query(`SELECT * FROM user`, { type: sequelize.QueryTypes.SELECT });
        // return sequelize.query(`UPDATE user SET age = 100 WHERE username = "Yeasin"`, {type: sequelize.QueryTypes.UPDATE});
        // return sequelize.query(`SELECT * FROM user LIMIT 2`, {logging: myFunction});
        // return sequelize.query(`SELECT * FROM user WHERE username LIKE :username`, {
        //     replacements: { username: "Ye%" },
        //     // plain: true
        // })
        // return User.bulkCreate([
        //     {
        //         username: "Mehedi",
        //         password: "123",
        //         description: "This  is long text part"
        //     },
        //     {
        //         username: "Rakib",
        //         password: "4567",
        //         description: "This  is long text part"
        //     },
        //     {
        //         username: "Hello",
        //         password: "123456",
        //         description: "This  is long text part"
        //     }
        // ])
        // return User.destroy({
        //     where: {
        //         user_id: 3
        //     },
        //     // force: true
        // })
        // return User.restore({
        //     where: {
        //         user_id: 3
        //     }
        // })
        // return User.destroy({
        //     where: {
        //         user_id: 1
        //     }
        // })
        // return sequelize.query(`SELECT * FROM user LIMIT 1`);
        return User.findOne({paranoid: false});
    })
    .then((data) => {
        // [result, metadata] = data;
        // console.log(result, "Result is here");
        // console.log(metadata, "Meta data is here")
        console.log(data, "User destroyed here!!!");
        // data.forEach(element => {
        //     console.log(element.toJSON());
        // });
        // const [result, created] = data;
        // console.log(created);
        // const { count, rows } = data;
        // console.log(count);
        // console.log(rows);
        // console.log(data.username);
        // console.log(data.password);
        // console.log(data.description);
        // console.log(data);
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