const Sequelize = require('sequelize');

class Department extends Sequelize.Model {
    // 테이블 정의
    static initiate(sequelize) {
        Department.init({
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            link: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Department',
            tableName: 'departments',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {

    }
}

module.exports = Department;