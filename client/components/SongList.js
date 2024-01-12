import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

const SongList = (props) => {
  const deleleSong = (id) => {
    props
      .mutate({
        variables: {
          id
        }
      })
      .then(() => props.data.refetch());
  };
  const renderSongs = () => {
    return props.data.songs.map(({ id, title }) => {
      return (
        <Link to={`/songs/${id}`} key={id}>
          <li className='collection-item'>
            {title}
            <i className='material-icons' onClick={() => deleleSong(id)}>
              delete
            </i>
          </li>
        </Link>
      );
    });
  };
  if (props.data.loading) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <ul className='collection'>{renderSongs()}</ul>
      <Link to='/songs/new' className='btn-floating btn-large red right'>
        <i className='material-icons'>Add</i>
      </Link>
    </div>
  );
};

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
