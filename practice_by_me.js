const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize(
    'learning-sequelize',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            freezeTableName: true
        }
    }
);

const Student = sequelize.define(
    'student',
    {
        student_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 20]
            }
        },
        favorite_class: {
            type: DataTypes.STRING(25),
            defaultValue: 'Computer Science'
        },
        school_year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subscribed_to_wittcode: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestamps: false
    }
);

const interactionWithDb = async () => {
    try {
        await Student.sync({ alter: true });

        // const asifInfo = await student.create({
        //     name: 'Asif',
        //     favorite_class: 'Chemistry',
        //     school_year: 2021,
        //     subscribed_to_wittcode: false
        // });

        // const allStudent = await student.bulkCreate([
        //     {
        //         name: 'Arafat',
        //         school_year: 2020,
        //         subscribed_to_wittcode: false
        //     },
        //     // {
        //     //     name: 'Mahir',
        //     //     favorite_class: 'Mathematics',
        //     //     school_year: 2020,
        //     //     subscribed_to_wittcode: false
        //     // },
        //     // {
        //     //     name: 'Forkan',
        //     //     favorite_class: 'Chemistry',
        //     //     school_year: 2019,
        //     //     subscribed_to_wittcode: false
        //     // },
        //     // {
        //     //     name: 'Yeasin',
        //     //     favorite_class: 'Mathematics',
        //     //     school_year: 2019,
        //     //     subscribed_to_wittcode: true
        //     // },
        //     // {
        //     //     name: 'Asif',
        //     //     favorite_class: 'Biology',
        //     //     school_year: 2018,
        //     //     subscribed_to_wittcode: true
        //     // },
        // ], {validate: true})


        // console.log(asifInfo.toJSON());
        // allStudent.forEach(student => console.log(student.toJSON()));

        console.log('Connection has been established successfully');

        // const response = await Student.findAll({
        //     where: {
        //         [Op.or]: {
        //             favorite_class: "Computer Science",
        //             subscribed_to_wittcode: true
        //         }
        //     }
        // });

        // // console.log(response.toJSON());
        // response.forEach((element) => {
        //     console.log(element.toJSON(), "find all here");
        // });

        const response = await Student.findAll({
            attributes: [
                "school_year",
                [sequelize.fn("COUNT", sequelize.col("school_year")), "numberOfSchoolYear"],
            ],
            group: "school_year"
        });

        response.forEach((element) => {
            console.log(element.toJSON());
        })


    } catch (error) {
        console.log('Unable to connect with Database!', error);
    }
}

interactionWithDb();

// const dbConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully!');
//     } catch (error) {
//         console.log('Unable to connect to the database!', error);
//     }
// }

// dbConnection();

// sequelize.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully!');
//     })
//     .catch((error) => {
//         console.log('Unable to connect to the database!', error);
//     });