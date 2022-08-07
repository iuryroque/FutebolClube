import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  public username: string;
  public email: string;
  public password: string;
  public role: string;
}

Users.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;