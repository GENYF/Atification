const Sequelize = require('sequelize');

class Keyword extends Sequelize.Model {
    // 테이블 정의
    static initiate(sequelize) {
        Keyword.init({
            category: {
                type: Sequelize.ENUM('학사', '비교과', '장학', '학술', '교내', '교외', '취업', '사무', '기타', '행사', '파란학기제', '학사일정'),
                allowNull: true,
                unique: false,
            },
            word: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: false,
            },
            user_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: true,
            modelName: 'Keyword',
            tableName: 'keywords',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Keyword.belongsTo(db.User, {
            foreignKey: 'user_id',
            targetKey: 'id'
        });
    }
}

module.exports = Keyword;