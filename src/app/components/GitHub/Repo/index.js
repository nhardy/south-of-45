import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';
import Icon from 'app/components/Icon';

import styles from './styles.styl';


export default class GitHubRepo extends Component {
  static propTypes = {
    repo: PropTypes.shape({}),
  };

  render() {
    const {
      repo: {
        name,
        html_url: url,
        description,
        language,
        stargazers_count: stargazersCount,
      },
    } = this.props;

    return (
      <div className={styles.root}>
        <h3 className={styles.name}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></h3>
        <div className={styles.info}>
          <p className={styles.description}>{description || 'This repository has no description yet'}</p>
        </div>
        <div className={styles.meta}>
          <div className={styles.language}>
            <Icon className={styles.icon} name={language.toLowerCase()} />
            <span>{language}</span>
          </div>
          <a className={styles.stargazers} href={`${url}/stargazers`} target="_blank" rel="noopener noreferrer">
            <FontAwesome className={cx(styles.star, 'fa-star')} />
            <span>{stargazersCount}</span>
          </a>
        </div>
      </div>
    );
  }
}
