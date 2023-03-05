const Sequelize = require('sequelize');

class Notice extends Sequelize.Model {
    // 테이블 정의
    static initiate(sequelize) {
        Notice.init({
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
                unique: false,
            },
            writer: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            link: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Notice',
            tableName: 'notices',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Notice.hasMany(db.Bookmark, {
            foreignKey: 'notice_id',
            sourceKey: 'id'
        })
    }
}

module.exports = Notice;