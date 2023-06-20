const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const sequelize = new Sequelize('learning-sequelize', 'enthusiast-programmer', 'yeasin-200011', {
    dialect: 'mysql',
    logging: false,
});

const Customer = sequelize.define(
    'customer',
    {
        customerName: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    }
);

const Product = sequelize.define(
    'product',
    {
        productName: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    }
);

const CustomerProduct = sequelize.define(
    'customerproduct',
    {
        customerProductId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        timestamps: false
    }
)

Customer.belongsToMany(Product, {
    through: CustomerProduct,
    // forignKey: 'customer_id'
});
Product.belongsToMany(Customer, {
    through: CustomerProduct,
    // forignKey: 'product_id'
});

let customer, product;
sequelize.sync({ alter: true })
    .then(data => {
        // data executed from here!!!

        // Customer.bulkCreate([
        //     {
        //         customerName: 'Yeasin'
        //     },
        //     {
        //         customerName: 'Forkan'
        //     },
        //     {
        //         customerName: 'Subrina'
        //     },
        //     {
        //         customerName: 'Shifat'
        //     },
        //     {
        //         customerName: 'Dihan'
        //     }
        // ]);
        // Product.bulkCreate([
        //     {
        //         productName: 'Laptop'
        //     },
        //     {
        //         productName: 'Headphones'
        //     },
        //     {
        //         productName: 'Desktop'
        //     },
        //     {
        //         productName: 'Pen'
        //     },
        //     {
        //         productName: 'Microphone'
        //     }
        // ])

        // return Customer.findOne({ where: { customerName: 'Yeasin' }});
        // return Product.findOne({ where: { productName: 'Laptop' }});
        return Customer.destroy({ where: { customerName: 'Yeasin' } });
    })
    .then(data => {
        // customer = data;
        // return Product.findAll({});
        // product = data;
        // return Customer.findAll({});
        console.log(data);
    })
    // .then(data => {
    //     // product = data;
    //     // customer.addProducts(product);
    //     customer = data;
    //     product.addCustomers(customer);
    // })
    .catch(error => {
        console.log(error);
    })