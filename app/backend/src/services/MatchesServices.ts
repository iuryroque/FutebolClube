import { ICreateMatches } from '../interfaces';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';
import { Op } from 'sequelize';

const getAllMatches = async () => {
  const teams = await Matches.findAll({
    include: [
      {
        model: Teams, as: 'teamHome', attributes: { exclude: ['id']}
      },
      {
        model: Teams, as: 'teamAway', attributes: { exclude: ['id']}
      },
    ]
  });

  return teams;
}

const getMatchesByProgress = async (inProgress: any) => {
  const isTrue = inProgress === 'true';
  
  const matches = await Matches.findAll({
    where: {
      in_progress: isTrue,
    },
    include: [
      {
        model: Teams, as: 'teamHome', attributes: { exclude: ['id']}
      },
      {
        model: Teams, as: 'teamAway', attributes: { exclude: ['id']}
      },
    ]
  });
  
  return matches;
}

const createMatches = async (body: ICreateMatches) => {
  const matchObject = { ...body, inProgress: true }

  const { count } = await Teams.findAndCountAll({
    where: {
      [Op.or]: [
        {id: body.homeTeam},
        {id: body.awayTeam},
      ]
    }
  });

  if (count !== 2) return false;

  const match = await Matches.create(matchObject);

  return match;
}

const finish = async (params: any) => {
  const { id } = params
  await Matches.update(
    {
      inProgress: false,
    },
    { where: {
      id
    }
  });
}

const alterMatches = async (req: any) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { id } = req.params;

  await Matches.update(
    {
      homeTeamGoals,
      awayTeamGoals,
    },
    { where: {
      id
    }
  });
}

export default {
  getAllMatches,
  getMatchesByProgress,
  createMatches,
  finish,
  alterMatches,
};