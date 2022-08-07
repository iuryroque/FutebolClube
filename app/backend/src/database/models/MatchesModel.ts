import { INTEGER } from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  public home_team: number;
  public home_team_goals: number;
  public away_team: number;
  public away_team_goals: number;
  public in_progress: string;
}

Matches.init({
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  home_team: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  home_team_goals: DataTypes.INTEGER,
  away_team: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'matches',
      key: 'id',
    },
  },
  away_team_goals: DataTypes.INTEGER,
  in_progress: DataTypes.STRING,

}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Teams.belongsTo(Matches, { foreignKey: 'home_team', as: 'home_team' });
Teams.belongsTo(Matches, { foreignKey: 'away_team', as: 'away_team' });

export default Matches;