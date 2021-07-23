import React from "react";
import styles from "./team.module.scss";
import FlagIcon from "../FlagIcon";
import cn from "classnames";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalUser: false,
      modalTeam1: {},
      modalTeam2: {},
      valueInput1: "",
      valueInput2: "",
    };
  }

  onCalcScore = (id1, id2) => {
    const result = this.props.group.matches.filter(
      (match) =>
        (match.team1 === id1 && match.team2 === id2) ||
        (match.team1 === id2 && match.team2 === id1)
    );

    if (!result.length) {
      return "";
    }

    if (result[0].team1 === id1) {
      return result[0].score1 + " : " + result[0].score2;
    } else {
      return result[0].score2 + " : " + result[0].score1;
    }
  };

  onModalClose = () => {
    this.state.isShowModalUser
      ? this.setState({ isShowModalUser: false })
      : this.setState({ isShowModalUser: true });

    this.setState({ valueInput1: "", valueInput2: "" });
  };

  onModalOpen = (team1, team2) => {
    this.onModalClose();
    this.setState({ modalTeam1: team1, modalTeam2: team2 });

    const result = this.props.group.matches.filter(
      (match) =>
        (match.team1 === team1.id && match.team2 === team2.id) ||
        (match.team1 === team2.id && match.team2 === team1.id)
    );

    if (!result.length) {
      return "";
    }

    if (result[0].team1 === team1.id) {
      this.setState({
        valueInput1: result[0].score1,
        valueInput2: result[0].score2,
      });
    } else {
      this.setState({
        valueInput1: result[0].score2,
        valueInput2: result[0].score1,
      });
    }
  };

  onAddScore = (id, data) => {
    if (id === "input1") {
      this.setState({ valueInput1: data });
    }

    if (id === "input2") {
      this.setState({ valueInput2: data });
    }
  };

  onSaveScore = (team1, team2) => {
    const result = this.props.group.matches.filter(
      (match) =>
        (match.team1 === team1.id && match.team2 === team2.id) ||
        (match.team1 === team2.id && match.team2 === team1.id)
    );

    if (!result.length) {
      this.props.group.matches.push({
        team1: team1.id,
        score1: this.state.valueInput1,
        score2: this.state.valueInput2,
        team2: team2.id,
      });
    } else if (result[0].team1 === team1.id) {
      result[0].score1 = this.state.valueInput1;
      result[0].score2 = this.state.valueInput2;
    } else {
      result[0].score1 = this.state.valueInput2;
      result[0].score2 = this.state.valueInput1;
    }
    this.props.onSaveModalData();
    this.onModalClose();
  };

  render() {
    const { number, group, item, teamsInGroup } = this.props;
    const flag = cn(styles.team__column, styles.team__nameColumn);
    const emptyCol = cn(styles.team__column, styles.team__emptyCol);
    const modalFlag = cn(styles.team__icon, styles.team__modalIconFlag);

    return (
      <div>
        <div
          className={styles.team}
          style={{
            gridTemplateColumns: `20px 200px repeat(${group.teams.length}, 2fr) repeat(7, 1fr)`,
          }}
        >
          <div className={styles.team__column}>
            <p>{number}</p>
          </div>
          <div className={flag}>
            <FlagIcon code={item.code} className={styles.team__icon} />
            <p className={styles.namePadding}>{item.name}</p>
          </div>
          {group.teams.map((teamObj) =>
            teamObj.id === item.id ? (
              <div key={teamObj.id} className={emptyCol}></div>
            ) : (
              <div
                key={teamObj.id}
                className={styles.team__column}
                onClick={() =>
                  this.onModalOpen(
                    item,
                    teamsInGroup.filter((team) => teamObj.id === team.id)[0]
                  )
                }
              >
                <p>{this.onCalcScore(item.id, teamObj.id)}</p>
              </div>
            )
          )}
          <div className={styles.team__column}>
            <p>{item.game}</p>
          </div>
          <div className={styles.team__column}>
            <p>{item.win}</p>
          </div>
          <div className={styles.team__column}>
            <p>{item.draw}</p>
          </div>
          <div className={styles.team__column}>
            <p>{item.defeat}</p>
          </div>
          <div className={styles.team__column}>
            <p>{item.scored}</p>
          </div>
          <div className={styles.team__column}>
            <p>{item.missed}</p>
          </div>
          <div className={styles.team__column}>
            <p>{item.points}</p>
          </div>
        </div>

        {this.state.isShowModalUser && (
          <Modal onModalClose={this.onModalClose}>
            {
              <div className={styles.modal}>
                <div className={styles.modal__row}>
                  <div className={styles.modal__box}>
                    <FlagIcon
                      code={this.state.modalTeam1.code}
                      className={modalFlag}
                      size="3x"
                      squared
                    />
                    <Input
                      type="number"
                      min="0"
                      id="firstTeam"
                      placeholder={this.state.modalTeam1.name}
                      onChange={(value) => this.onAddScore("input1", value)}
                      value={this.state.valueInput1}
                    />
                  </div>
                  <div className={styles.modal__box}>
                    <FlagIcon
                      code={this.state.modalTeam2.code}
                      className={modalFlag}
                      size="3x"
                      squared
                    />
                    <Input
                      type="number"
                      min="0"
                      id="secondTeam"
                      placeholder={this.state.modalTeam2.name}
                      onChange={(value) => this.onAddScore("input2", value)}
                      value={this.state.valueInput2}
                    />
                  </div>
                </div>
                <Button
                  text="save"
                  uppercase
                  onClick={() =>
                    this.onSaveScore(
                      this.state.modalTeam1,
                      this.state.modalTeam2
                    )
                  }
                  color="grey"
                  size="sm"
                />
              </div>
            }
          </Modal>
        )}
      </div>
    );
  }
}
