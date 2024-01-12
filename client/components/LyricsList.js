import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleLikeButtonClicked(lyricId, likes) {
    this.props.mutate({
      variables: { id: lyricId },
      // optimistic response will make our UI changes visible to user fast, then actual response will be inserted, no worries if we guessed wrong response
      optimisticResponse: {
        _typename: 'Mutation',
        likeLyric: {
          id: lyricId,
          _typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i className='material-icons' onClick={() => this.handleLikeButtonClicked(id, likes)}>
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }

  render() {
    return <ul className='collection'>{this.props.lyrics && this.props.lyrics.length && this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricsList);
