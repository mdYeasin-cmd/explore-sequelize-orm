const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const sequelize = new Sequelize('learning-sequelize', 'root', '', {
    dialect: 'mysql',
    // define: {
    //     freezeTableName: true,
    // }
});

const User = sequelize.define(
    'user',
    {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    }
);

const Post = sequelize.define(
    'post',
    {
        message: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    }
);

User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User, { onDelete: "CASCADE" });

let user, posts;

sequelize.sync({ alter: true })
    .then(data => {
        // Work with updated table from here
        // User.bulkCreate([
        //     {
        //         username: "Yeasin",
        //         password: "123456",
        //     },
        //     {
        //         username: "Asif",
        //         password: "123"
        //     },
        //     {
        //         username: "Nahiyan",
        //         password: "123456"
        //     },
        //     {
        //         username: "Shifat",
        //         password: "2345"
        //     }
        // ]);

        // Post.bulkCreate([
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        //     {
        //         message: "This was amazing post!!!"
        //     },
        // ]);
        // return User.destroy({ where: { username: "Yeasin" } });
        return User.findOne();
    })
    .then(data => {
        user = data;
        // return user.countPosts();
        return Post.findOne();
    })
    .then(data => {
        posts = data;
        // return user.addPosts(posts);
        // console.log(data);
        posts.setUser(user);
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log(error, "Error here!!!"));