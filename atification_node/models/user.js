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
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                name: 'createdAt',
                field: 'created_at'
            },
            updatedAt: {
                type: Sequelize.DATE,
                name: 'updatedAt',
                field: 'updated_at'
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
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