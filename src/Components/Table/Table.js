import React, {Component} from 'react';
import classNames from 'classnames';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import _head from 'lodash/head';

import episodes from './../../episodes.json';
import unsortedMajorArcs from './../../major-arcs.json';
import unsortedMinorArcs from './../../minor-arcs.json';

import './Table.css';

const sortedMajorArcs = _sortBy(unsortedMajorArcs, ['name']);
const sortedMinorArcs = _sortBy(unsortedMinorArcs, ['name']);

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFilter: 'all',
      data: episodes,
      majorArc: '',
      minorArc: '',
    };

    this.displayAllEpisodes = this.displayAllEpisodes.bind(this);
    this.displayRecommendedEpisodes = this.displayRecommendedEpisodes.bind(this);
    this.filterEpisodes = this.filterEpisodes.bind(this);
  }

  /**
   * Show all episodes
   */
  displayAllEpisodes() {
    this.setState({
      currentFilter: 'all',
      data: episodes,
      majorArc: '',
      minorArc: '',
    });
  }

  /**
   * Display all episodes
   */
  displayRecommendedEpisodes() {
    this.setState({
      currentFilter: 'recommended',
      data: _filter(episodes, {'recommended': true}),
      majorArc: '',
      minorArc: '',
    });
  }

  /**
   * @param event
   * @param data
   * @param type
   * @returns {*}
   */
  filterEpisodes(event, data, type = null) {
    if (event.target.value === '') {
      return this.displayAllEpisodes();
    }

    const filtered = _head(_filter(data, {'id': parseInt(event.target.value, 10)}));
    const filteredEpisodes = episodes.filter((item) => {
      return filtered.episodes.indexOf(item.id) !== -1;
    });

    this.setState({
      currentFilter: type,
      majorArc: type === 'major' ? event.target.value : '',
      minorArc: type === 'minor' ? event.target.value : '',
      data: filteredEpisodes,
    });
  }

  render() {
    const allEpisodesButtonClasses = classNames('pt-button pt-minimal', {
      'pt-active': this.state.currentFilter === 'all',
    });

    const recommendedButtonClasses = classNames('pt-button pt-minimal', {
      'pt-active': this.state.currentFilter === 'recommended',
    });

    const majorArcsSelectClasses = classNames('pt-select pt-minimal', {
      'pt-active': this.state.currentFilter === 'major',
    });

    const minorArcsSelectClasses = classNames('pt-select pt-minimal', {
      'pt-active': this.state.currentFilter === 'minor',
    });

    return (
      <div className="content">
        <div className="filters">
          <button className={allEpisodesButtonClasses} onClick={this.displayAllEpisodes}>Show All Episodes</button>
          <button className={recommendedButtonClasses} onClick={this.displayRecommendedEpisodes}>Show Recommended
            Episodes
          </button>
          <div className={majorArcsSelectClasses}>
            <select
              onChange={(event) => {
                this.filterEpisodes(event, sortedMajorArcs, 'major')
              }}
              value={this.state.majorArc}
            >
              <option value="">Filter by Major Arc</option>
              {
                sortedMajorArcs.map((item, key) => {
                  return (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  );
                })
              }
            </select>
          </div>
          <div className={minorArcsSelectClasses}>
            <select
              onChange={(event) => {
                this.filterEpisodes(event, sortedMinorArcs, 'minor')
              }}
              value={this.state.minorArc}
            >
              <option value="">Filter by Minor Arc</option>
              {
                sortedMinorArcs.map((item, key) => {
                  return (
                    <option value={item.id} key={item.id}>{item.name}</option>
                  );
                })
              }
            </select>
          </div>
        </div>

        <table className="table pt-table pt-bordered pt-striped">
          <thead>
          <tr>
            <th className="table__se">SE</th>
            <th className="table__ep">EP</th>
            <th className="table__title">Title</th>
            <th>Summary</th>
          </tr>
          </thead>
          <tbody>
          {
            this.state.data.map((item, key) => {
              const classes = classNames(this.props.className, {});
              return (
                <tr key={item.id} className={classes}>
                  <td className="table__se">{item.season}</td>
                  <td className="table__ep">{item.id}</td>
                  <td className="table__title">
                    {item.name}
                  </td>
                  <td className="table__summary">{item.summary}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;