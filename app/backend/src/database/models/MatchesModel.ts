import { INTEGER } from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

class Matches extends Model {
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Matches.init({
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,

}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeMatches' })
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayMatches' })

export default Matches;