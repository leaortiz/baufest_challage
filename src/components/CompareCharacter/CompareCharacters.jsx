import React from "react";
import CardList, { CompareCharacter } from "../CardList/CardList";

export default function CompareCharacters({ data }) {
  const computeSharedEpisodes = () => {
    return data.compareCharacters.map((c) => {
      return {
        ...c,
        sharedEpisodes: copyWithEpisodeIds(c.id, c.episode, data),
      };
    });
  };

  const computedResults = computeSharedEpisodes();


  return (
    <div>
      <h1>Compare Characters (up to 3):</h1>
      <CardList data={data} results={computedResults} pagination={false}>
        <CompareCharacter />
      </CardList>
    </div>
  );
}

const copyWithEpisodeIds = (id, episode, data) => {

  const compareWith = data.compareCharacters.filter((c) => c.id !== id);

  const getSharedEpisodes = (firstArray, secondArray) => {
    return firstArray?.filter((o) => secondArray.some((i) => o === i));
  };

  return compareWith?.map((c) => {
    const sharedEpisodes = getSharedEpisodes(c.episode, episode);
    return {
      name: c.name,
      sharedEpisodes: sharedEpisodes?.length,
      episodes: sharedEpisodes,
    };
  });
};
