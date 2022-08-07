import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  public team_name: string;
}

Teams.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  team_name: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;