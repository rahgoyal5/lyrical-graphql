import React from 'react';
import { graphql } from 'react-apollo';
import fetchSongDetailsQuery from '../queries/fetchSongDetails';
import { Link } from 'react-router';
import AddLyrics from './AddLyrics';
import LyricsList from './LyricsList';

class SongDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data: { song: { title, lyrics } = {}, loading } = {}, params: { id } = {} } = this.props;
    if (loading) {
      return <div>Loading....</div>;
    }
    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>{title}</h3>
        {lyrics && <LyricsList lyrics={lyrics} />}
        <AddLyrics songId={id} />
      </div>
    );
  }
}

export default graphql(fetchSongDetailsQuery, {
  options: (props) => ({ variables: { id: props.params.id } })
})(SongDetails);
