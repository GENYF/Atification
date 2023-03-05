const Sequelize = require('sequelize');

class Bookmark extends Sequelize.Model {
    // 테이블 정의
    static initiate(sequelize) {
        Bookmark.init({
            notice_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Bookmark',
            tableName: 'bookmarks',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Bookmark.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
        db.Bookmark.belongsTo(db.Notice, {
            foreignKey: 'notice_id',
            targetKey: 'id'
        });
    }
}

module.exports = Bookmark;