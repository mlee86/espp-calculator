import "./App.css";
import React, { Component } from "react";

class App extends Component {
  state = {
    salary: 100000,
    sharePrice: 300,
    investementPercent: 20,
    discount: 15,
    sharesPurchased: 0,
    profit: 0,
    purchasePrice: 0,
    bonus: 0,
    moneyInvested: 0,
    isSalary: true,
  };

  async componentDidMount() {
    this.calculateEspp();
  }

  handleChange = async (e) => {
    const re = /^[0-9.\b]+$/
    if (e.target.value === "" || re.test(e.target.value)) {
      this.setState(
        {
          [e.target.id]: e.target.value,
        },
        () => {
          this.calculateEspp();
        }
      );
    }
  };

  handleChangePercentage = async (e) => {
    const re = /^[0-9.\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      if (e.target.value <= 20) {
        this.setState(
          {
            [e.target.id]: e.target.value,
          },
          () => {
            this.calculateEspp();
          }
        );
      }
    }
  };

  changeSalary = async (e) => {
    this.setState(
      {
        isSalary: e.target.value.toLowerCase() === "salary" ? true : false,
      },
      () => {
        this.calculateEspp();
      }
    );
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

  calculateEspp() {
    let totalDollarsForHalf = 0;
    let purchasePrice = 0;
    let sharesPurchased = 0;
    let profit = 0;
    let salary = this.state.salary;
    if (!this.state.isSalary) {
      salary = salary * 2080;
    }

    totalDollarsForHalf = (salary / 2) * (this.state.investementPercent / 100);
    purchasePrice = this.state.sharePrice * (1 - this.state.discount / 100);
    sharesPurchased = totalDollarsForHalf / purchasePrice;
    profit = (this.state.sharePrice - purchasePrice) * sharesPurchased;
    let halfBonus = (profit / (salary / 2)) * 100;

    this.setState({
      purchasePrice: this.roundNumbers(purchasePrice),
      sharesPurchased: this.roundNumbers(sharesPurchased),
      bonus: this.roundNumbers(halfBonus),
      profit: this.roundNumbers(profit),
      moneyInvested: this.roundNumbers(totalDollarsForHalf),
    });
  }

  roundNumbers = (num) => {
    return parseFloat(num.toFixed(2));
  };

  render() {
    let salary = this.state.salary;
    let sharePrice = this.state.sharePrice;
    let investementPercent = this.state.investementPercent;
    let discount = this.state.discount;
    let sharesPurchased = this.state.sharesPurchased;
    let profit = this.state.profit;
    let purchasePrice = this.state.purchasePrice;
    let bonus = this.state.bonus;
    let moneyInvested = this.state.moneyInvested;
    const handleChange = this.handleChange;
    const changeSalary = this.changeSalary;
    const numberWithCommas = this.numberWithCommas;
    return (
      <div className="App">
        <div id="head">ESPP Purchase Estimator</div>
        <div id="salaryBox" className="inputDiv">
          <label>
            Salary:
            <input
              id="salary"
              type="text"
              value={salary}
              onChange={(e) => handleChange(e)}
            ></input>
            <select
              id="isSalary"
              name="isSalary"
              onChange={(e) => changeSalary(e)}
            >
              <option value="salary">Salary</option>
              <option value="hourly">Hourly</option>
            </select>
          </label>
        </div>
        <div id="sharePriceBox" className="inputDiv">
          <label>
            Share Price:
            <input
              id="sharePrice"
              type="text"
              value={sharePrice}
              onChange={(e) => handleChange(e)}
            ></input>
          </label>
        </div>
        <div id="investmentPercentBox" className="inputDiv">
          <label>
            Investment:
            <input
              id="investementPercent"
              type="text"
              min="1"
              max="20"
              step=".5"
              value={investementPercent}
              onChange={(e) => this.handleChangePercentage(e)}
            ></input>
          </label>
        </div>
        <div id="discountBox" className="inputDiv">
          <label>
            Discount:
            <input
              id="discount"
              type="text"
              min="1"
              max="20"
              step="1"
              value={discount}
              onChange={(e) => this.handleChangePercentage(e)}
            ></input>
          </label>
        </div>
        <div id="displayDiv">
          <div>Purchase Price: ${numberWithCommas(purchasePrice)}</div>
          <div>Shares bought: {numberWithCommas(sharesPurchased)}</div>
          <div>Total investment: ${numberWithCommas(moneyInvested)}</div>
          <div>Profit: ${numberWithCommas(profit)}</div>
          <div>Bonus: {bonus}%</div>
        </div>
      </div>
    );
  }
}

export default App;
