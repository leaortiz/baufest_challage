import React, { useEffect, useState } from "react";
import "./styles.scss";
import Spinner from "../Common/Spinner";
import { FcPrevious, FcNext } from "react-icons/fc";
import { Button, Modal } from "semantic-ui-react";
import { characterActions } from "../../store/characters/characterSlice";
import { useDispatch, useSelector } from "react-redux";
import getIdFromUrl from "../../utilities/getIdFromUrl";

const randomFromArray = (array) =>
  array[Math.floor(Math.random() * array.length)];

const renderList = (results, children, addCharacter, slice) => {
  if (results === null || results.length === 0) {
    return <div>No records found</div>;
  }

  const childrenWithProps = (item) =>
    React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return (
          React.isValidElement(child) &&
          React.cloneElement(child, {
            data: item,
            addCompareCharacter: addCharacter,
            slice: slice,
          })
        );
      }
      return child;
    });
  return (
    <div className="card-wrapper">
      {results.map((item) => {
        return childrenWithProps(item);
      })}
    </div>
  );
};

const CardList = ({
  data,
  onNextClick,
  onPrevClick,
  children,
  results,
  pagination = true,
}) => {
  const { isLoading, error, info } = data;
  const dispatch = useDispatch();
  return (
    <>
      {pagination && renderPagination(info, onNextClick, onPrevClick)}
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div>there was an error</div>
      ) : (
        results &&
        renderList(
          results,
          children,
          (id) => dispatch(characterActions.addCompareCharacter(id)),
          data
        )
      )}
    </>
  );
};

const renderPagination = ({ pages, next, prev }, onNextClick, onPrevClick) => {
  if (pages === null || pages < 1) return null;

  return (
    <>
      {prev && <FcPrevious onClick={() => onPrevClick(prev)} size={50} />}
      {next && <FcNext onClick={() => onNextClick(next)} size={50} />}
    </>
  );
};

export default CardList;

export const CharacterCard = ({ data, addCompareCharacter }) => {
  return (
    <div key={data.id} className="card">
      <img alt={data.name} src={data.image} />

      <h2>{data.name}</h2>

      <div className="card-details">
        <Button fluid onClick={() => addCompareCharacter({ id: data.id })}>
          Add to Compare
        </Button>
        <hr />
        <p>Gender: {data.gender}</p>
        <p>Location: {data.location.name}</p>
        <span>
          <a href={randomFromArray(data.episode)}>Random Episode</a>
        </span>
      </div>
    </div>
  );
};

export const LocationCard = ({ data }) => {
  return (
    <div key={data.id} className="card">
      <h1>{data.name}</h1>
      <div className="card-details">
        <p>Type: {data.type}</p>
        <p>Dimension: {data.dimension}</p>
        <p>Residents: {data.residents.length}</p>
        <p>Created: {data.created}</p>
      </div>
    </div>
  );
};

export const EpisodeCard = ({
  data,
  setEpisodeIds,
  characters,
}) => {
  const [open, setOpen] = React.useState(false);
  const ids = data.characters.map((c) => getIdFromUrl(c));
  return (
    <div key={data.id} className="card">
      <h1>{data.name}</h1>
      <div className="card-details">
        <p>Air date: {data.air_date}</p>
        <p>Code: {data.id}</p>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button onClick={() => setEpisodeIds(ids)}>+ info</Button>}
        >
          <Modal.Header>Characters for episode: {data.name}</Modal.Header>
          <Modal.Content>
            <p>extra info</p>
            <p>Created: {data.created}</p>
            <p>Episode: {data.episode}</p>
            <p>
              URL: <a href={data.url}>{data.url}</a>
            </p>
            <div className="card-wrapper">
              {characters.map((c) => {
                return (
                  <div key={c.id} className="card">
                    <img alt={c.name} src={c.image} />
                    <hr />
                    <h2>{c.name}</h2>
                  </div>
                );
              })}
            </div>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
};

export const CompareCharacter = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div key={data.id} className="card-wrapper">
      <div className="card">
        <div className="card-details">
          <h2>Name: {data.name}</h2>
          <p>Gender: {data.gender}</p>
          <p>Location: {data.location.name}</p>
          <p>Species: {data.species}</p>
          <p>Status: {data.status}</p>
          <Button
            onClick={() =>
              dispatch(characterActions.removeCompareCharacter({ id: data.id }))
            }
          >
            Remove
          </Button>
          <h2>Shared Episodes:</h2>
          {
            data.sharedEpisodes.map((e) => (
              <p key={"shared-episode-" + e.name}>
                {e.name}: {e.sharedEpisodes}
              </p>
            ))
          }
          <hr />
        </div>
      </div>
    </div>
  );
};
