import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    company,
    skills,
    status,
    user: { avatar, name, _id },
    location,
  },
}) => {
  return (
    <>
      <div className='profile bg-light'>
        <img className='round-img' src={avatar} alt='my-avatar' />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && <span>at {company}</span>}
          </p>
          <p>{location && <span>{location}</span>}</p>
          <Link
            to={{ pathname: '/main-profile', state: { id: _id } }}
            className='btn btn-primary'>
            View Profile
          </Link>

          <ul>
            {skills.slice(0, 4).map((skill, index) => (
              <li className='text-primary' key={index}>
                <i className='fas fa-check'></i> {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
