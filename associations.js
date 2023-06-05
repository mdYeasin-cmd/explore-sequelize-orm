const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const sequelize = new Sequelize('learning-sequelize', 'root', '', {
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    }
});

const Country = sequelize.define(
    'country',
    {
        countryName: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        timestamps: false
    }
);

const Capital = sequelize.define(
    'capital',
    {
        capitalName: {
            type: DataTypes.STRING,
            unique: true
        }
    },
    {
        timestamps: false
    }
);

Country.hasOne(Capital, {
    // foreignKey: 'country_id'
    // foreignKey: {
    //     name: "country_id",
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
    onDelete: "CASCADE"
});
Capital.belongsTo(Country, {
    // foreignKey: 'country_id'
    // foreignKey: {
    //     name: "country_id",
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
    onDelete: "CASCADE"
});

let country, capital;

sequelize.sync({ alter: true })
    .then(() => {
        // working with update table here
        // Country.bulkCreate([
        //     {
        //         countryName: "Spain"
        //     },
        //     {
        //         countryName: "France"
        //     },
        //     {
        //         countryName: "Germany"
        //     },
        //     {
        //         countryName: "England"
        //     },
        //     {
        //         countryName: "Bangladesh"
        //     }
        // ]);

        // Capital.bulkCreate([
        //     {
        //         capitalName: "London"
        //     },
        //     {
        //         capitalName: "Madrid"
        //     },
        //     {
        //         capitalName: "Paris"
        //     },
        //     {
        //         capitalName: "Berlin"
        //     }
        // ])

        // return Capital.findOne({ where: { capitalName: "Madrid" } });
        // return Country.findOne({ where: { countryName: "Spain" } });
        // return Country.create({
        //     countryName: "USA"
        // })
        // return Country.findOne({ where: { countryName: "France" } });
        // return Country.destroy({ where: { countryName: "Spain" } });
        return Country.findOne({ where: { countryName: 'France' } });
    })
    .then((data) => {
        // capital = data;
        // return Country.findOne({ where: { countryName: "Spain" } });
        // country = data;
        // console.log(data);
        // return country.getCapital();
        // return country.createCapital({
        //     capitalName: "Washington D.C."
        // })
        // return Capital.findOne({where: {capitalName: "Paris"}});
        country = data;
        return Capital.findOne({ where: { capitalName: 'Paris' } });
    })
    .then((data) => {
        // country = data;
        // country.setCapital(capital);
        // console.log(data.toJSON());
        capital = data;
        return capital.setCountry(country);
    })
    .then((data) => {
        console.log(data.toJSON());
    })
    .catch((error) => {
        console.log(error, "Error from catch block");
    });