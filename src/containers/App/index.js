import React from "react";
import styles from "./app.module.scss";
import Table from "../../components/Table";
import Team from "../../components/Team";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import iconAdd from "../../images/iconAdd.png";
import iconAddDark from "../../images/iconAddDark.png";
import iconBinDark from "../../images/iconBinDark.png";
import iconBin from "../../images/iconBin.png";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const teams = [
  { id: 1, name: "Австрия", code: "at" },
  { id: 2, name: "Азербайджан", code: "az" },
  { id: 3, name: "Албания", code: "al" },
  { id: 4, name: "Англия", code: "gb-eng" },
  { id: 5, name: "Андорра", code: "ad" },
  { id: 6, name: "Армения", code: "am" },
  { id: 7, name: "Беларусь", code: "by" },
  { id: 8, name: "Бельгия", code: "be" },
  { id: 9, name: "Болгария", code: "bg" },
  { id: 10, name: "Босния и Герцеговина", code: "ba" },
  { id: 11, name: "Венгрия", code: "hu" },
  { id: 12, name: "Германия", code: "de" },
  { id: 13, name: "Гибралтар", code: "gi" },
  { id: 14, name: "Греция", code: "gr" },
  { id: 15, name: "Грузия", code: "ge" },
  { id: 16, name: "Дания", code: "dk" },
  { id: 17, name: "Израиль", code: "il" },
  { id: 18, name: "Ирландия", code: "ie" },
  { id: 19, name: "Исландия", code: "is" },
  { id: 20, name: "Испания", code: "es" },
  { id: 21, name: "Италия", code: "it" },
  { id: 22, name: "Казахстан", code: "kz" },
  { id: 23, name: "Кипр", code: "cy" },
  { id: 24, name: "Косово", code: "xk" },
  { id: 25, name: "Латвия", code: "lv" },
  { id: 26, name: "Литва", code: "lt" },
  { id: 27, name: "Лихтенштейн", code: "li" },
  { id: 28, name: "Люксембург", code: "lu" },
  { id: 29, name: "Мальта", code: "mt" },
  { id: 30, name: "Молдова", code: "md" },
  { id: 31, name: "Нидерланды", code: "nl" },
  { id: 32, name: "Норвегия", code: "no" },
  { id: 33, name: "Польша", code: "pl" },
  { id: 34, name: "Португалия", code: "pt" },
  { id: 35, name: "Россия", code: "ru" },
  { id: 36, name: "Румыния", code: "ro" },
  { id: 37, name: "Сан-Марино", code: "sm" },
  { id: 38, name: "Северная Ирландия", code: "gb-nir" },
  { id: 39, name: "Северная Македония", code: "mk" },
  { id: 40, name: "Сербия", code: "rs" },
  { id: 41, name: "Словакия", code: "sk" },
  { id: 42, name: "Словения", code: "si" },
  { id: 43, name: "Турция", code: "tr" },
  { id: 44, name: "Украина", code: "ua" },
  { id: 45, name: "Уэльс", code: "gb-wls" },
  { id: 46, name: "Фарерские острова", code: "fo" },
  { id: 47, name: "Финляндия", code: "fi" },
  { id: 48, name: "Франция", code: "fr" },
  { id: 49, name: "Хорватия", code: "hr" },
  { id: 50, name: "Черногория", code: "me" },
  { id: 51, name: "Чехия", code: "cz" },
  { id: 52, name: "Швейцария", code: "ch" },
  { id: 53, name: "Швеция", code: "se" },
  { id: 54, name: "Шотландия", code: "gb-sct" },
  { id: 55, name: "Эстония", code: "ee" },
];

let options = [...teams];
let newOptions = [];

let groups = JSON.parse(window.localStorage.groups || "[]");

let oneEigth = JSON.parse(window.localStorage.oneEigth || "[]");

let YEAR = window.localStorage.year
  ? JSON.parse(window.localStorage.year)
  : 2020;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      year: YEAR,
      isShowModalYear: false,
      isShowModalGroup: false,
      isShowModalTeam: false,
      isShowModalOneEight: false,
      groupName: "",
      teamId: "",
      currentGroup: "",
      finalCard: {
        team1: { id: 46, name: "Фарерские острова", code: "fo" },
        score1: 0,
        score2: 0,
        team2: { id: 34, name: "Португалия", code: "pt" },
      },
    };
  }

  onModalClose = () => {
    this.setState({
      isShowModalYear: false,
      isShowModalGroup: false,
      isShowModalTeam: false,
      isShowModalOneEight: false,
      groupName: "",
      teamId: "",
    });
    newOptions = [];
  };

  getOptions = () => {
    options = [...teams];

    groups.forEach((group) =>
      group.teams.forEach(
        (team) =>
          (options = options.filter(
            (item) => item.id !== team && item.id !== team.id
          ))
      )
    );
  };

  onAddData = (value, type) => {
    if (type === "year") {
      this.setState({ year: value });
    }
    if (type === "group") {
      this.setState({ groupName: value });
    }
    if (type === "team") {
      this.setState({ teamId: +value });
    }
  };

  onStoreGroups = () => {
    window.localStorage.groups = JSON.stringify(groups);
  };

  onSaveData = (type) => {
    if (type === "year") {
      window.localStorage.year = JSON.stringify(this.state.year);
      this.onModalClose();
      window.location.reload();
    }
    if (type === "group") {
      groups.push({
        id: groups.length + 1,
        name: this.state.groupName,
        teams: [],
        matches: [],
      });
      this.onStoreGroups();
      this.onModalClose();
    }
    if (type === "team") {
      groups.map((group) => {
        if (group.id === this.state.currentGroup) {
          group.teams.push(this.state.teamId);
        }
        return group;
      });
      this.onStoreGroups();

      options = options.filter((team) => team.id !== +this.state.teamId);

      this.onModalClose();
    }
  };

  onModalOpen = (type, groupId) => {
    if (type === "year") {
      this.setState({ isShowModalYear: true });
    }
    if (type === "group") {
      this.setState({ isShowModalGroup: true });
    }
    if (type === "team") {
      this.setState({ isShowModalTeam: true, currentGroup: +groupId });
    }
    if (type === "1/8") {
      this.setState({ isShowModalOneEight: true });
      this.calculateNewOptions();
    }
  };

  onDelete = (type, groupId, teamId) => {
    if (type === "group") {
      groups = groups.filter((group) => group.id !== groupId);
    }

    if (type === "team") {
      groups.map((group) => {
        if (group.id === groupId) {
          group.teams = group.teams.filter((team) => team.id !== teamId);
          group.matches = group.matches.filter(
            (match) => match.team1 !== teamId && match.team2 !== teamId
          );
        }

        return group;
      });
    }

    this.onStoreGroups();
    this.getOptions();
    this.onModalClose();
  };

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

      const joinеdGames = group.matches.filter(
        (match) =>
          (team1.id === match.team1 && team2.id === match.team2) ||
          (team2.id === match.team1 && team1.id === match.team2)
      );

      if (
        group.teams.filter((team) => team.points === team1.points).length ===
          2 &&
        joinеdGames.length
      ) {
        const scoresTeam1 =
          team1.id === joinеdGames[0].team1
            ? joinеdGames[0].score1
            : joinеdGames[0].score2;
        const scoresTeam2 =
          team2.id === joinеdGames[0].team1
            ? joinеdGames[0].score1
            : joinеdGames[0].score2;

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

  onSaveScoresData = () => {
    groups.map((group) => {
      group.teams = group.teams.map((team) => {
        return team.id;
      });
      return group;
    });

    this.onStoreGroups();
    this.setState({});
  };

  onCheckToggle = (value) => {
    this.setState({ checked: value });
  };

  calculateNewOptions = () => {
    groups.forEach((group) => {
      if (group.teams[0] && group.teams[1] && group.teams[2]) {
        newOptions.push(group.teams[0], group.teams[1], group.teams[2]);
      } else if (group.teams[0] && group.teams[1]) {
        newOptions.push(group.teams[0], group.teams[1]);
      } else if (group.teams[0]) {
        newOptions.push(group.teams[0]);
      }
    });
  };

  render() {
    this.getOptions();
    this.calculateGroupResults(groups);

    return (
      <div>
        <Header>
          <div className={styles.toggle__wrapper}>
            {this.state.checked ? (
              <p className={styles.toggle__title}>Вернуться к таблицам</p>
            ) : (
              <p className={styles.toggle__title}>
                Включить режим конструктора
              </p>
            )}

            <Toggle onChange={(e) => this.onCheckToggle(e.target.checked)} />
          </div>
        </Header>

        <section className={styles.hero}>
          <div className={styles.hero__row}>
            <h1 className={styles.hero__title}>{`EURO-${YEAR}`}</h1>
            {this.state.checked && (
              <div className={styles.hero__button}>
                <Button
                  size="smRound"
                  color="whiteRound"
                  icon={iconAdd}
                  onClick={() => this.onModalOpen("year")}
                />
              </div>
            )}
          </div>
          <h2 className={styles.hero__subtitle}>calendar</h2>
          {/* модалка для редактирования года  */}
          {this.state.isShowModalYear && (
            <Modal onModalClose={this.onModalClose}>
              {
                <div>
                  <p className={styles.modal__title}>
                    Введите год проведения чемпионата
                  </p>
                  <div className={styles.modal__row}>
                    <Input
                      type="number"
                      minValue="2020"
                      size="sm"
                      align="center"
                      placeholder={this.state.year}
                      onChange={(value) => this.onAddData(value, "year")}
                      value={this.state.year}
                    />
                    {this.state.year.length > 0 ? (
                      <Button
                        text="Сохранить"
                        color="gray"
                        size="sm"
                        onClick={() => this.onSaveData("year")}
                      />
                    ) : (
                      <Button
                        disabled
                        text="Сохранить"
                        color="gray"
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              }
            </Modal>
          )}
        </section>

        {/* отображение таблиц */}
        <section className={styles.tables}>
          <p className={styles.title}>Таблицы</p>
          <div className={styles.tables__main}>
            {groups.map((group) => (
              <div className={styles.tables__table} key={group.id}>
                <div className={styles.tables__tableRow}>
                  {group.teams.length === 0 ? (
                    <Table empty group={group} />
                  ) : (
                    <Table group={group}>
                      {group.teams.map((teamObj, index) => (
                        <div
                          className={styles.tables__teamWrapper}
                          key={teamObj.id}
                        >
                          <Team
                            onSaveScoresData={this.onSaveScoresData}
                            item={teamObj}
                            teamsInGroup={group.teams.map(
                              (teamId) =>
                                teams.filter((team) => teamId.id === team.id)[0]
                            )}
                            key={teamObj.id}
                            number={index + 1}
                            group={group}
                          />
                          {this.state.checked && (
                            <div className={styles.tables__deleteTeam}>
                              <Button
                                icon={iconBinDark}
                                color="white"
                                size="sm"
                                onClick={() =>
                                  this.onDelete("team", group.id, teamObj.id)
                                }
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </Table>
                  )}
                  {this.state.checked && (
                    <div className={styles.tables__deleteGroup}>
                      <Button
                        icon={iconBin}
                        color="gray"
                        size="sm"
                        onClick={() => this.onDelete("group", group.id)}
                      />
                    </div>
                  )}

                  {/* кнопка добавления команды  */}
                  {this.state.checked && (
                    <div className={styles.tables__addTeam}>
                      <Button
                        size="smRound"
                        color="grayRound"
                        icon={iconAddDark}
                        onClick={() => this.onModalOpen("team", group.id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* кнопка добавления группы  */}
            {this.state.checked && (
              <div className={styles.tables__addGroup}>
                <Button
                  size="lgRound"
                  color="grayRound"
                  icon={iconAddDark}
                  onClick={() => this.onModalOpen("group")}
                />
              </div>
            )}

            {/* модалка для названия группы  */}
            {this.state.isShowModalGroup && (
              <Modal onModalClose={this.onModalClose}>
                <div>
                  <p className={styles.modal__title}>Введите название группы</p>
                  <div className={styles.modal__row}>
                    <Input
                      size="sm"
                      align="center"
                      placeholder="Группа"
                      onChange={(value) => this.onAddData(value, "group")}
                      value={this.state.groupName}
                    />
                    {this.state.groupName ? (
                      <Button
                        text="Сохранить"
                        color="gray"
                        size="sm"
                        onClick={() => this.onSaveData("group")}
                      />
                    ) : (
                      <Button
                        disabled
                        text="Сохранить"
                        color="gray"
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              </Modal>
            )}

            {/* модалка для команд  */}
            {this.state.isShowModalTeam && (
              <Modal onModalClose={this.onModalClose}>
                <div>
                  <p className={styles.modal__title}>Выберите команду</p>
                  <div className={styles.modal__row}>
                    <Dropdown
                      controlClassName={styles.myControlClassName}
                      options={options.map(
                        (team) => new Option(team.name, team.id)
                      )}
                      onChange={(item) => this.onAddData(item.value, "team")}
                      placeholder="Страна"
                    />
                    {this.state.teamId ? (
                      <Button
                        text="Сохранить"
                        color="gray"
                        size="sm"
                        onClick={() => this.onSaveData("team")}
                      />
                    ) : (
                      <Button
                        disabled
                        text="Сохранить"
                        color="gray"
                        size="sm"
                      />
                    )}
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </section>

        {/* <section className={styles.oneEigth}>
          <p className={styles.title}>1/8 Финала</p>

          <div className={styles.oneEigth__row}>
            <FinalCard match={this.state.finalCard} />
          </div>

          
          {this.state.checked && (
            <Button
              size="mdRound"
              color="grayRound"
              icon={iconAddDark}
              onClick={() => this.onModalOpen("1/8")}
            />
          )}

          {this.state.isShowModalOneEight && (
            <Modal onModalClose={this.onModalClose}>
              <div>
                <p className={styles.modal__title}>Выберите команду</p>
                <div className={styles.modal__row}>
                  <Dropdown
                    controlClassName={styles.myControlClassName}
                    options={newOptions.map(
                      (team) => new Option(team.name, team.id)
                    )}
                    // onChange={(item) => this.onAddData(item.value, "team")}
                    placeholder="Страна"
                  />
                  {this.state.teamId ? (
                    <Button
                      text="Сохранить"
                      color="gray"
                      size="sm"
                      // onClick={() => this.onSaveData("team")}
                    />
                  ) : (
                    <Button disabled text="Сохранить" color="gray" size="sm" />
                  )}
                </div>
              </div>
            </Modal>
          )}
        </section> */}
      </div>
    );
  }
}
