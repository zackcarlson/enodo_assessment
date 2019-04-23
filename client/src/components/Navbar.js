import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 0,
      max: 3300000,
      'One Story': false,
      '1.5 - 1.9': false,
      'Two Story': false,
      'Three Story': false,
      'Multi Family': false
    };
    this.handleMinMaxChange = this.handleMinMaxChange.bind(this);
    this.handleResBldgChange = this.handleResBldgChange.bind(this);
    this.handleFilters = this.handleFilters.bind(this);
  }

  handleMinMaxChange(e) {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue)) {
      e.preventDefault();
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  handleResBldgChange() {
    let vals = document.getElementsByTagName('select')[0];
    let options = vals && vals.options;
    let opt;

    for (var i = 0; i < options.length; i++) {
      opt = options[i];
      let value = opt.value;

      if (opt.selected) {
        this.setState({
          [value]: true
        });
      } else {
        this.setState({
          [value]: false
        });
      }
    }
  }

  handleFilters() {
    const { min, max } = this.state;
    let oneStory = this.state['One Story'];
    let oneHalf = this.state['1.5 - 1.9'];
    let twoStory = this.state['Two Story'];
    let threeStory = this.state['Three Story'];
    let multiFam = this.state['Multi Family'];

    this.props.onApplyFilters({min, max, oneStory});
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Enodo</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                  Any Price
              </button>
              <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                  <form className="px-4 py-3">
                    <div className='row'>
                      <div className='col'>
                        <input type='number' className='form-control' placeholder='Min' name='min' onChange={(e) => this.handleMinMaxChange(e)}/>
                      </div>
                      <div className='col'>
                        <input type='number' className='form-control' placeholder='Max' name='max'onChange={(e) => this.handleMinMaxChange(e)}/>
                      </div>
                    </div>
                  </form>
              </div>
            </li>
            <li className="nav-item dropdown">
              <select className='selectpicker' multiple data-selected-text-format='count' onChange={this.handleResBldgChange}>
                <optgroup label='Residential Type'>
                  <option name='resType' value='One Story'>One Story</option>
                  <option name='resType' value='1.5 - 1.9'>1.5 - 1.9</option>
                  <option name='resType' value='Two Story'>Two Story</option>
                  <option name='resType' value='Three Story'>Three Story</option>
                </optgroup>
                <optgroup label='Building Use'>
                  <option name='bldgUse' value='Multi Family'>Multi Family</option>
                </optgroup>
              </select>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.handleFilters}>Apply Filters</button>
            </li>
          </ul>
          
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      );
  }
}

export default Navbar;