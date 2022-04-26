import React, { useEffect, useState } from "react";
import { Grid, Tab } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import CardList, {
  CharacterCard,
  EpisodeCard,
  LocationCard,
} from "./CardList/CardList";
import {
  getCharacterPage,
  getCharactersToCompare,
} from "../store/characters/characterSlice";
import { getLocationPage } from "../store/locations/locationSlice";
import { getEpisodePage, getEpisodeCharacters } from "../store/episodes/episodeSlice";
import CompareCharacters from "./CompareCharacter/CompareCharacters";

export default function () {
  const charactersSlice = useSelector((state) => state.characters);
  const locationsSlice = useSelector((state) => state.locations);
  const episodesSlice = useSelector((state) => state.episodes);

  const dispatch = useDispatch();

  const [ episodeIds, setEpisodeIds ] = useState(null);

  useEffect(() => {
    dispatch(getCharactersToCompare(charactersSlice.compareCharactersIds));
  }, [JSON.stringify(charactersSlice.compareCharactersIds)]);

  useEffect(() => {
    dispatch(getEpisodeCharacters(episodeIds));
  }, [JSON.stringify(episodeIds)]);

  const showCompareCharacters = charactersSlice.compareCharactersIds.length > 0;
  const panes = [
    {
      menuItem: "Episodes",
      render: () => (
        <Tab.Pane attached={false}>
          <CardList
            data={episodesSlice}
            results={episodesSlice.results}
            onPrevClick={(prev) => dispatch(getEpisodePage(prev))}
            onNextClick={(next) => dispatch(getEpisodePage(next))}
          >
            <EpisodeCard setEpisodeIds={setEpisodeIds} characters={episodesSlice.charactersEpisode}/>
          </CardList>
        </Tab.Pane>
      ),
      size: "massive",
    },
    {
      menuItem: "Characters",
      render: () => (
        <Tab.Pane attached={false}>
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={showCompareCharacters ? 10 : 16}>
                <CardList
                  data={charactersSlice}
                  results={charactersSlice.results}
                  onPrevClick={(prev) => dispatch(getCharacterPage(prev))}
                  onNextClick={(next) => dispatch(getCharacterPage(next))}
                >
                  <CharacterCard />
                </CardList>
              </Grid.Column>
              {showCompareCharacters && (
                <Grid.Column width={6}>
                  <CompareCharacters data={charactersSlice} />
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </Tab.Pane>
      ),
      size: "massive",
    },
    {
      menuItem: "Locations",
      render: () => (
        <Tab.Pane attached={false}>
          <CardList
            data={locationsSlice}
            results={locationsSlice.results}
            onPrevClick={(prev) => dispatch(getLocationPage(prev))}
            onNextClick={(next) => dispatch(getLocationPage(next))}
          >
            <LocationCard />
          </CardList>
        </Tab.Pane>
      ),
      size: "massive",
    },
  ];

  return (
    <div>
      <Tab
        defaultActiveIndex={1}
        grid={{ paneWidth: 12, tabWidth: 4 }}
        menu={{ pointing: true }}
        panes={panes}
      />
    </div>
  );
}
