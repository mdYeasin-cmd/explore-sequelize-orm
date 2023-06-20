const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize('enthusiast-programmer', 'yeasin-200011', '', {
    dialect: 'mysql'
});

const Student = sequelize.define(
    'studnet',
    {
        student_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
            defaultValue: "Computer Science"
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
        freezeTableName: true,
        timestamps: false
    }
);

Student.sync({alter: true}).then(() => {
    console.log("Database is synced successfully!!!");

    // return Student.bulkCreate([
    //     // {
    //     //     name: "Wittcode2",
    //     //     school_year: 12
    //     // },
    //     // {
    //     //     name: "Michael",
    //     //     school_year: 11,
    //     //     favorite_class: "Basket Weaving",
    //     //     subscribed_to_wittcode: false
    //     // },
    //     // {
    //     //     name: "Fareddie",
    //     //     school_year: 10,
    //     //     favorite_class: "Math",
    //     //     subscribed_to_wittcode: true
    //     // },
    //     // {
    //     //     name: "Bruce",
    //     //     school_year: 9,
    //     //     favorite_class: "Histroy",
    //     //     subscribed_to_wittcode: false
    //     // },
    //     // {
    //     //     name: "Spencer",
    //     //     school_year: 6,
    //     //     favorite_class: "Music",
    //     //     subscribed_to_wittcode: false
    //     // }
    // ], {
    //     validate: true
    // });

    return Student.findAll({
        attributes: [
            "school_year",
            [sequelize.fn("COUNT", sequelize.col("school_year")), "num_of_schoolYear"],
        ],
        group: "school_year"
        // where: {
        //     [Op.or]: {
        //         favorite_class: "Computer Science",
        //         subscribed_to_wittcode: true
        //     }
        // }
    });

}).then((data) => {
    data.forEach((d) => {
        console.log(d.toJSON());
    })
}).catch((error) => {
    console.log(error, "Database syced failed!!!");
});