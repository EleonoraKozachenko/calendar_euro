import React from "react";
import styles from "./app.module.scss";
import Table from "../../components/Table";
import Team from "../../components/Team";

// const teams = [
//   { id: 1, name: "Италия", code: "it" },
//   { id: 2, name: "Уэльс", code: "gb-wls" },
//   { id: 3, name: "Швейцария", code: "ch" },
//   { id: 4, name: "Турция", code: "tr" },
//   { id: 5, name: "Бельгия", code: "be" },
//   { id: 6, name: "Дания", code: "dk" },
//   { id: 7, name: "Финляндия", code: "fi" },
//   { id: 8, name: "Россия", code: "ru" },
//   { id: 9, name: "Нидерланды", code: "nl" },
//   { id: 10, name: "Австрия", code: "at" },
//   { id: 11, name: "Украина", code: "ua" },
//   { id: 12, name: "Северная Македония", code: "mk" },
//   { id: 13, name: "Англия", code: "gb-eng" },
//   { id: 14, name: "Хорватия", code: "hr" },
//   { id: 15, name: "Чехия", code: "cz" },
//   { id: 16, name: "Шотландия", code: "gb-sct" },
//   { id: 17, name: "Швеция", code: "se" },
//   { id: 18, name: "Испания", code: "es" },
//   { id: 19, name: "Словакия", code: "sk" },
//   { id: 20, name: "Польша", code: "pl" },
//   { id: 21, name: "Франция", code: "fr" },
//   { id: 22, name: "Германия", code: "de" },
//   { id: 23, name: "Португалия", code: "pt" },
//   { id: 24, name: "Венгрия", code: "hu" },
// ];

// const groups = [
//   {
//     name: "Группа А",
//     teams: [1, 2, 3, 4],
//     matches: [
//       { team1: 4, score1: 0, score2: 3, team2: 1 },
//       { team1: 2, score1: 1, score2: 1, team2: 3 },
//       { team1: 4, score1: 0, score2: 2, team2: 2 },
//       { team1: 1, score1: 3, score2: 0, team2: 3 },
//       { team1: 1, score1: 1, score2: 0, team2: 2 },
//       { team1: 3, score1: 3, score2: 1, team2: 4 },
//     ],
//   },
// ];

// const groups = [
//   {
//     name: "Группа А",
//     teams: [1, 2, 3, 4],
//     matches: [],
//   },
//   {
//     name: "Группа B",
//     teams: [5, 6, 7, 8],
//     matches: [],
//   },
//   {
//     name: "Группа C",
//     teams: [9, 10, 11, 12],
//     matches: [],
//   },
//   {
//     name: "Группа D",
//     teams: [13, 14, 15, 16],
//     matches: [],
//   },
//   {
//     name: "Группа E",
//     teams: [17, 18, 19, 20],
//     matches: [],
//   },
//   {
//     name: "Группа F",
//     teams: [21, 22, 23, 24],
//     matches: [],
//   },
// ];

const teams = JSON.parse(window.localStorage.teams);
const groups = JSON.parse(window.localStorage.groups);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onCalcGames = (group, id) => {
    const games = group.matches.filter(
      (match) => id === match.team1 || id === match.team2
    );
    return games.length;
  };

  onCalcWinnings = (group, id) => {
    const winnings = group.matches.filter(
      (match) =>
        (match.score1 > match.score2 && id === match.team1) ||
        (match.score2 > match.score1 && id === match.team2)
    );
    return winnings.length;
  };

  onCalcDraws = (group, id) => {
    const draws = group.matches.filter(
      (match) =>
        match.score1 === match.score2 &&
        (id === match.team1 || id === match.team2)
    );
    return draws.length;
  };

  onCalcScored = (group, id) => {
    const scored = group.matches
      .filter((match) => match.team1 === id || match.team2 === id)
      .map((item) => (item.team1 === id ? item.score1 : item.score2));
    let sumScored = 0;
    for (let i = 0; i < scored.length; i++) {
      sumScored += +scored[i];
    }

    return sumScored;
  };

  onCalcMissed = (group, id) => {
    const missed = group.matches
      .filter((match) => match.team1 === id || match.team2 === id)
      .map((item) => (item.team1 === id ? item.score2 : item.score1));
    let sumMissed = 0;
    for (let i = 0; i < missed.length; i++) {
      sumMissed += +missed[i];
    }

    return sumMissed;
  };

  onSortTeams = (group) => {
    group.teams.sort((team1, team2) => {
      if (team1.points !== team2.points) {
        return team2.points - team1.points;
      }

      const joinеtGames = group.matches.filter(
        (match) =>
          (team1.id === match.team1 && team2.id === match.team2) ||
          (team2.id === match.team1 && team1.id === match.team2)
      );

      if (
        group.teams.filter((team) => team.points === team1.points).length ===
          2 &&
        joinеtGames.length
      ) {
        const scoresTeam1 =
          team1.id === joinеtGames[0].team1
            ? joinеtGames[0].score1
            : joinеtGames[0].score2;
        const scoresTeam2 =
          team2.id === joinеtGames[0].team1
            ? joinеtGames[0].score1
            : joinеtGames[0].score2;

        if (scoresTeam1 !== scoresTeam2) {
          return scoresTeam2 - scoresTeam1;
        }
      }

      const difference1 = team1.scored - team1.missed;
      const difference2 = team2.scored - team2.missed;
      if (difference1 !== difference2) {
        return difference2 - difference1;
      }

      return team2.scored - team1.scored;
    });
  };

  calculateGroupResults = (groups) => {
    groups.map((group) => {
      group.teams = group.teams.map((teamId) => {
        if (typeof teamId === "object") {
          return teamId;
        }
        const game = this.onCalcGames(group, teamId);
        const win = this.onCalcWinnings(group, teamId);
        const draw = this.onCalcDraws(group, teamId);
        const scored = this.onCalcScored(group, teamId);
        const missed = this.onCalcMissed(group, teamId);
        const defeat = game - win - draw;
        const points = win * 3 + draw;
        const teamObj = teams.filter((team) => team.id === teamId)[0];

        return {
          id: teamId,
          name: teamObj.name,
          code: teamObj.code,
          game: game,
          win: win,
          draw: draw,
          scored: scored,
          missed: missed,
          defeat: defeat,
          points: points,
        };
      });

      this.onSortTeams(group);
      return group;
    });
  };

  onSaveModalData = () => {
    groups.map((group) => {
      group.teams = group.teams.map((team) => {
        return team.id;
      });
      return group;
    });

    window.localStorage.groups = JSON.stringify(groups);
    this.setState({});
  };

  render() {
    // window.localStorage.teams = JSON.stringify(teams);
    // window.localStorage.groups = JSON.stringify(groups);
    // debugger;
    this.calculateGroupResults(groups);
    return (
      <div className={styles.app}>
        <h1 className={styles.app__title}>EURO-2020</h1>
        <div className={styles.calendar}>
          {groups.map((group) => (
            <Table group={group} key={group.name}>
              {group.teams.map((teamObj, index) => (
                <Team
                  onSaveModalData={this.onSaveModalData}
                  item={teamObj}
                  teamsInGroup={group.teams.map(
                    (teamId) => teams.filter((team) => teamId.id === team.id)[0]
                  )}
                  key={teamObj.id}
                  number={index + 1}
                  group={group}
                />
              ))}
            </Table>
          ))}
          ;
        </div>
      </div>
    );
  }
}
