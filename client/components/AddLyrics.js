import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class AddLyrics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }
  handleSubmitClicked(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: { content: this.state.content, songId: this.props.songId }
      })
      .then(() => this.setState({ content: '' }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitClicked.bind(this)}>
          <label htmlFor='lyric'>Add a Lyric</label>
          <input
            name='lyric'
            id='lyric'
            value={this.state.content}
            type='text'
            onChange={(event) => this.setState({ content: event.target.value })}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(AddLyrics);
