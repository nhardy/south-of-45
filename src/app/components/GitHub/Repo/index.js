import React, { PropTypes } from 'react';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';
import Icon from 'app/components/Icon';
import styles from './styles.styl';


const GitHubRepo = ({ repo }) => {
  const {
    name,
    html_url: url,
    owner: {
      avatar_url: avatarUrl,
      login: username,
      html_url: profileUrl,
    },
    description,
    language,
    stargazers_count: stargazersCount,
  } = repo;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h3 className={styles.name}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></h3>
        <a className={styles.profile} href={profileUrl} target="_blank" rel="noopener noreferrer">
          <img src={avatarUrl} alt={username} />
        </a>
      </div>
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
};

GitHubRepo.propTypes = {
  repo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default GitHubRepo;
