import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/UsersModel';

import { Response } from 'superagent';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';


const teams = [
  {
    id: 1,
    teamName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    teamName: 'Bahia',
  },
  {
    id: 3,
    teamName: 'Botafogo',
  },
  {
    id: 4,
    teamName: 'Corinthians',
  },
  {
    id: 5,
    teamName: 'Cruzeiro',
  },
  {
    id: 6,
    teamName: 'Ferroviária',
  },
  {
    id: 7,
    teamName: 'Flamengo',
  },
  {
    id: 8,
    teamName: 'Grêmio',
  },
  {
    id: 9,
    teamName: 'Internacional',
  },
  {
    id: 10,
    teamName: 'Minas Brasília',
  },
  {
    id: 11,
    teamName: 'Napoli-SC',
  },
  {
    id: 12,
    teamName: 'Palmeiras',
  },
  {
    id: 13,
    teamName: 'Real Brasília',
  },
  {
    id: 14,
    teamName: 'Santos',
  },
  {
    id: 15,
    teamName: 'São José-SP',
  },
  {
    id: 16,
    teamName: 'São Paulo',
  },
]





chai.use(chaiHttp);

const { expect } = chai;

describe('Crie um endpoint para o login de pessoas usuárias', () => {

  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
      } as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Response = token', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ 
          email: 'user@user.com',
          password: 'secret_user'
        })

    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body).to.be.string;
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });

// teams

describe('Teste na rota "/teams". método GET', () => {

  before(() => {
    sinon.stub(Teams, 'findAll')
      .resolves(teams as Teams[]) 
  });

  after(() => {
    (Teams.findAll as sinon.SinonStub)
      .restore();
  })

  it('a rota exibe uma lista com todos os times do banco de dados', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(teams); 
  });
});

describe('Teste na rota "/teams/:id". Método GET', () => {

  before(() => {
    sinon.stub(Teams, 'findByPk')
      .resolves(teams[0] as Teams) 
  });

  after(() => {
    (Teams.findByPk as sinon.SinonStub)
      .restore();
  })

  it('busca do time com base no id fornecido', async () => {
    const response = await chai.request(app).get('/teams/:id');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(teams[0]); 
  });
});

describe('Rota /teams/:id: caso de erro', () => {

  before(() => {
    sinon.stub(Teams, 'findByPk')
      .resolves(null) 
  });

  after(() => {
    (Teams.findByPk as sinon.SinonStub)
      .restore();
  })
});


// matches

describe('"/matches" método POST, criando uma partida', () => {
	const newMatch = {
		homeTeam:10,
		awayTeam:8,
		homeTeamGoals: 2,
		awayTeamGoals: 2 
	};

	const result = {
    id: 1,
    homeTeam: 10, 
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  }

	before(() => {
		sinon.stub(Matches, 'create').resolves(result as any)
	});

	after(() => {
		(Matches.create as sinon.SinonStub).restore();
	});

	it('adicionando uma nova partida no banco de dados', async () => {
		const getToken = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin'})
		const response = await chai.request(app).post('/matches').set({"Authorization": getToken.body.token}).send(newMatch);
		expect(response.status).to.be.equal(201);
		expect(response.body).to.be.eql(result);
	});
});

describe('Testando a rota "matches", na rota getAll', () => {
  before(async () => {
      sinon.stub(Matches, "findAll").resolves([{
              "id": 1,
              "homeTeam": 16,
              "homeTeamGoals": 1,
              "awayTeam": 8,
              "awayTeamGoals": 1,
              "inProgress": false,
              "teamHome": {
                  "teamName": "São Paulo"
              },
              "teamAway": {
                  "teamName": "Grêmio"
              }
          }] as unknown as Matches[])
  })
  after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
  })
  it('O retorno da rota getAll - matches, será um array e terá o status "200"', async () =>{
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.eql([{
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "teamHome": {
              "teamName": "São Paulo"
          },
          "teamAway": {
              "teamName": "Grêmio"
          }
      }])
  })
});

describe('O retorno da rota "matches/:id" na rota patch', () => {
  before(async () => {
      sinon.stub(Matches, "update").resolves()
  })
  after(() => {
      (Matches.update as sinon.SinonStub).restore();
  })
  it('o retorno da rota patch - matches/id, será um objeto com a mensagem "Updated', async () => {
      const response = await chai.request(app).patch('/matches/:id');
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.eql({ message: "Invalid token" })
  })
});

// leader board
  describe('O retorno da rota "/leaderboard/home" na rota get', () => {
    before(() => {
        sinon.stub(Matches, 'findAll').resolves([{
            id: 1,
            homeTeam: 1,
            homeTeamGoals: 1,
            awayTeam: 2,
            awayTeamGoals: 2,
            inProgress: false,
            teamHome: {
              teamName: "Avaí/Kindermann"
            },
            teamAway: {
              teamName: "Bahia"
            },
          }] as unknown as Matches[]);
          sinon.stub(Teams, 'findAll').resolves([{
            id: 1,
            teamname: "Avaí/Kindermann"
          }] as unknown as Teams[])
    });

    after(() => {
        (Matches.findAll as sinon.SinonStub).restore();
        (Teams.findAll as sinon.SinonStub).restore();
    })

    it('o retorno da rota get - /leaderboard/home, será um objeto com a chave "totalPoints"', async () => {
        const response = await chai.request(app).get('/leaderboard/home');
        expect(response.status).to.be.equal(200);
        expect(response.body[0]).have.property('totalPoints')
    });
})

describe('O retorno da rota "/leaderboard/away" na rota get', () => {
    before(() => {
        sinon.stub(Matches, 'findAll').resolves([{
            id: 1,
            homeTeam: 1,
            homeTeamGoals: 1,
            awayTeam: 2,
            awayTeamGoals: 2,
            inProgress: false,
            teamHome: {
              teamName: "Avaí/Kindermann"
            },
            teamAway: {
              teamName: "Bahia"
            },
          }] as unknown as Matches[]);
          sinon.stub(Teams, 'findAll').resolves([{
            id: 1,
            teamname: "Avaí/Kindermann"
          }] as unknown as Teams[])
    });

    after(() => {
        (Matches.findAll as sinon.SinonStub).restore();
        (Teams.findAll as sinon.SinonStub).restore();
    })

    it('o retorno da rota get - /leaderboard/away, será um objeto com a chave "totalPoints"', async () => {
        const response = await chai.request(app).get('/leaderboard/away');
        expect(response.status).to.be.equal(200);
        expect(response.body[0]).have.property('totalPoints')
    });
})
});
