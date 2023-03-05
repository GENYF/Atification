const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    // 테이블 정의
    static initiate(sequelize) {
        User.init({
            id: {
                primaryKey: true,
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Keyword, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });
        db.User.hasMany(db.Bookmark, {
            foreignKey: 'user_id',
            sourceKey: 'id'
        });
    }
}

module.exports = User;