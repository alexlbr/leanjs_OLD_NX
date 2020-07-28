import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'part:@sanity/components/loading/spinner';
import DefaultSelect from 'part:@sanity/components/selects/default';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import client from 'part:@sanity/base/client';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(value));

class UpMentoringVideoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sanityLoading: true,
      sanityData: null,
      sanityError: null,
    };
  }

  componentDidMount() {
    client
      .fetch(
        `*[_type == "video"]{ 
            umVideoId 
        }`
      )
      .then((sanityData) => {
        this.setState({ sanityLoading: false, sanityData });
      })
      .catch((error) => {
        this.setState({ sanityError: error.message, sanityLoading: false });
      });
  }

  render() {
    const { type, value, onChange, disabled, data } = this.props;
    const { sanityLoading, sanityError } = this.state;
    const { loading: graphqlLoading, error: graphqlError } = data;

    if (graphqlLoading || sanityLoading) {
      return <Spinner />;
    }

    if (graphqlError || sanityError) {
      return <h3>Error</h3>;
    }

    const allVideo = data.videos.edges
      .map(({ node: { id, title } }) => ({
        key: id,
        title,
        id,
      }))
      .sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

    const sanityData = this.state.sanityData || [];
    const selectedItem = allVideo.find((video) => video.id === value);
    const items = allVideo.filter(
      (video) =>
        video.id === value ||
        !sanityData.find((doc) => doc.umVideoId === video.id)
    );

    return (
      <div>
        <h2>{type.title}</h2>
        <DefaultSelect
          label="Select a video"
          placeholder="A video is required"
          onChange={(event) => {
            console.log('aaaa event.id', event.id);
            onChange(createPatchFrom(event.id));
          }}
          items={items}
          value={selectedItem}
          disabled={disabled ? true : false}
        />
      </div>
    );
  }
}

UpMentoringVideoInput.defaultProps = {
  type: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default graphql(gql`
  query videos {
    videos {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`)(UpMentoringVideoInput);
