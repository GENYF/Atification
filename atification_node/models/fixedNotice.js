const Sequelize = require('sequelize');

class FixedNotice extends Sequelize.Model {
    // 테이블 정의
    static initiate(sequelize) {
        FixedNotice.init({
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
            modelName: 'FixedNotice',
            tableName: 'fixed_notices',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {

    }
}

module.exports = FixedNotice;